import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DataService from "../../../services/DataService";
import SubjectList from "../../patterns/organisms/SubjectList";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    DataService.getAllSubjects().then((subjects) => setData(subjects));
  }, []);
  return (
    <Container className="py-5">
      <Row className="pb-3">
        <Col>
          <h2>Courseware</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <SubjectList items={data}></SubjectList>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
