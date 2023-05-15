import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const MyDashboardPage = () => {
  return localStorage.getItem("role") === "ADMIN" ? (
    <AdminDashboard></AdminDashboard>
  ) : localStorage.getItem("role") === "STUDENT" ? (
    <StudentDashboard></StudentDashboard>
  ) : (
    <Container>
      <Row>
        <Col>My dashboard</Col>
      </Row>
    </Container>
  );
};

export default MyDashboardPage;
