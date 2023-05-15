import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import AdminService from "../../../../services/AdminService";

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  
  const onClick = () => {
    AdminService.login(data).then((res) => {
      setToken(res.data.token);
      navigate("/");
    });
  };

  const updateData = (field, value) => {
    data[field] = value;
    setData({ ...data });
  };

  return (
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
            <button
              className="mt-3 custom-btn"
              onClick={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              Submit
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func,
};

export default LoginForm;
