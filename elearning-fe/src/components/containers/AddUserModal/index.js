import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
} from "reactstrap";

const typeOfUser = [
  {
    value: "Select type",
    disable: true,
  },
  {
    value: "STUDENT",
    disable: false,
  },
  {
    value: "PROFESSOR",
    disable: false,
  },
  {
    value: "ADMIN",
    disable: false,
  },
];

const AddUserModal = ({
  error,
  isOpen,
  toggle,
  addUserAction,
  data,
  updateData,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable>
      <ModalHeader>Add user</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form className="">
          <FormGroup controlId="type">
            <FormLabel>Type</FormLabel>
            <FormSelect
              onChange={(e) => {
                updateData("roleName", e.target.value);
              }}
            >
              {typeOfUser.map((element,index) => {
                return (
                  <option key={`${index}___${element.value}`} className="my-2" value={element.value}>
                    {element.value}
                  </option>
                );
              })}
            </FormSelect>
          </FormGroup>

          <FormGroup className="mt-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Name"
              onChange={(e) => {
                updateData("name", e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          <FormGroup className="mt-3" controlId="lastname">
            <FormLabel>Lastname</FormLabel>
            <FormControl
              type="text"
              placeholder="Lastname"
              onChange={(e) => {
                updateData("surname", e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          <FormGroup className="mt-3" controlId="phone">
            <FormLabel>Phone</FormLabel>
            <FormControl
              type="text"
              placeholder="E.g. +123 45 678 912"
              onChange={(e) => {
                updateData("phone", e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          <FormGroup className="mt-3" controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              placeholder="E.g. namelastname@email.com"
              onChange={(e) => {
                updateData("email", e.target.value);
              }}
            ></FormControl>
          </FormGroup>

          <FormGroup className="mt-3" controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={(e) => {
                updateData("password", e.target.value);
              }}
            ></FormControl>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="custom-btn" onClick={addUserAction}>
          Submit
        </Button>
        <Button className="custom-btn" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUserModal;
