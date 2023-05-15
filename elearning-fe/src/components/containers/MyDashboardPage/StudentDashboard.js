import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const StudentDashboard = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2>Welcome</h2>
        </Col>
      </Row>
      <Row>
        <Col>My subjects</Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
