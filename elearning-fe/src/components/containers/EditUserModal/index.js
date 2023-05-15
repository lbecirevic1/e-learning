import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";

const EditUserModal = ({
  className,
  isOpen,
  toggle,
  editUserAction,
  data,
  updateData,
}) => {
  const typeOfUser = [
    {
      value: "Select type",
      disable: true,
    },
    {
      roleId: 1,
      value:"ADMIN",
      disable:false
    },
    {
      roleId: 3,
      value: "STUDENT",
      disable: false,
    },
    {
      roleId: 2,
      value: "PROFESSOR",
      disable: false,
    },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={className} scrollable>
      <ModalHeader>Edit user</ModalHeader>
      <ModalBody className="p-4">
        <Form>
          <FormGroup controlId="type">
            <FormLabel>Type</FormLabel>
            <FormSelect
            // value={data.role_id === this.props.roleId ? "selected" : ""}
              onChange={(e) => {
                updateData("roleName", e.target.value);
              }}
            >
              {typeOfUser.map((element,index) => {
                return (
                  <option
                  key={`${index}__${element.value}`}
                    className="my-2"
                    value={element.value}
                  >
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
              defaultValue={data.name}
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
              defaultValue={data.surname}
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
              defaultValue={data.phone}
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
              defaultValue={data.email}
              onChange={(e) => {
                updateData("email", e.target.value);
              }}
            ></FormControl>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={editUserAction}>
          Edit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUserModal;
