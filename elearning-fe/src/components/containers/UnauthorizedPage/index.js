import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container className="py-5">
      <section>
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <Button className={"custom-btn"} onClick={goBack}>
            Go Back
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default UnauthorizedPage;
