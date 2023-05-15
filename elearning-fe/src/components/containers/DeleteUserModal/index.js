import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteUserModal = ({ isOpen, toggle, deleteUserAction, user }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable>
      <ModalHeader>Delete user</ModalHeader>
      <ModalBody className="p-4">
        {`Are you sure you want to remove user `}
        <b>{`${user.name} ${user.surname}`}</b>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={deleteUserAction}>
          Yes
        </Button>
        <Button color="secondary" onClick={toggle}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUserModal;
