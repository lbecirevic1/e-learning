import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../../hooks/useAuth";

function Navbar() {
  const [showInNavbar, setShowInNavbar] = useState(false);
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    if(auth) {
      setShowInNavbar(true)
    } else {
      setShowInNavbar(false)

    }
  }, [auth]);


  // useEffect(()=> {
  //   console.log('test')
  // }, [showInNavbar]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role"); 
    localStorage.clear();
    setAuth(null);
    setShowInNavbar(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-bg navbar-text">
      <div className="container-fluid">
        <Container>
          <Row>
            <Col>
              <div className="navbar-collapse">
                <ul className="navbar-nav me-auto align-content-center d-contents">
                  <li className="nav-item active">
                    <Link className="nav-link navlink-text" to="/">
                      <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                    </Link>
                  </li>
                  {!showInNavbar && (
                    <li className="nav-item">
                      <Link className="nav-link navlink-text" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  {showInNavbar && (
                    <li className="nav-item">
                      <Link className="nav-link navlink-text" to="/dashboard">
                        Courseware
                      </Link>
                    </li>
                  )}
                  {showInNavbar && (
                    <li className="nav-item">
                      <Link className="nav-link navlink-text" to="/mydashboard">
                        My dashboard
                      </Link>
                    </li>
                  )}
                  {(
                    <li className="nav-item">
                      <Link className="nav-link navlink-text" to="/about">
                        About
                      </Link>
                    </li>
                  )}
                  {showInNavbar && (
                    <li className="nav-item ms-auto">
                      <Link className="nav-link navlink-text" to="/login" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
