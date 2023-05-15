import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navbar from "../../patterns/organisms/Navbar";


import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AdminService from "../../../services/AdminService";
import {Request} from "../../../services/Request";
import {useNotification} from "../../../context/NotificationProvider";
import axios from "axios";

const LoginPage = () => {

  const[data, setData] = useState({ email: "", password: "" });
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [data.email, data.password]);

  const dispatch = useNotification();

  const handleNewNotification = (status, message) => {
    dispatch({
      type: status,
      message: message,
    })
  }

  const updateData = (field, value) => {
    data[field] = value;
    setData({ ...data });
  };

  async function getUserIdByEmail(email) {
    const response = await axios.get("http://localhost:8080/user/userIdByEmail?email=" + email, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    localStorage.setItem("userId", response?.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AdminService.login(data);


      const accessToken = response?.data?.token;
      const decodedToken = jwt_decode(accessToken);
      const roles = decodedToken.role;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", roles);
      await getUserIdByEmail(data.email);

      setAuth({ data, roles, accessToken });
      setData({ email: "", password: "" });

      console.log(localStorage.getItem("role"));

      if (localStorage.getItem("role") === "ADMIN") {
        navigate("/mydashboard");
      } else if (localStorage.getItem("role") === "STUDENT" || localStorage.getItem("role") === "PROFESSOR") {
        navigate("/dashboard")
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      handleNewNotification("ERROR", "Incorrect email or password")
    }
  };


  return (
    <div className="login pt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <h3>Login</h3>
          </Col>
        </Row>
        <Row>
          <Col
            className="custom-border mt-3 py-4 px-5"
            lg={{ offset: 3, span: 6 }}
          >
            <Form>
              <FormGroup>
                <FormLabel>Email address</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    updateData("email", e.target.value);
                  }}
                ></FormControl>
              </FormGroup>

              <FormGroup className="mt-2">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    updateData("password", e.target.value);
                  }}
                ></FormControl>
              </FormGroup>
              <div className={"mt-1"}>
                <Link to={"/forgotPassword"}>Forgot password ?</Link>
              </div>
              <button
                className="mt-3 custom-btn"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
