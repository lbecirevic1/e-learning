import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SubjectList = ({ items }) => {
  return items?.map((item, index) => {
    const subjectPath = `/subject/${item.id}`;
    return (
      <Row className="pb-1" key={`${index}-${item.name}`}>
        <Col>
          <Link  to={subjectPath}>{item.name}</Link>
        </Col>
      </Row>
    );
  });
};

SubjectList.propTypes = {
  items: PropTypes.array,
};

export default SubjectList;
