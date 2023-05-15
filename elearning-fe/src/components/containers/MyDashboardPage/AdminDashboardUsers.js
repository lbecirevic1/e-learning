import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../services/AdminService";
import { Alert, Button } from "reactstrap";

import { Table } from "react-bootstrap";
import DeleteUserModal from "../DeleteUserModal";
import EditUserModal from "../EditUserModal";
import AddUserModal from "../AddUserModal";

const AdminDashboardUsers = () => {
  const [successfullyMessage, setSuccessfullyMessage] = useState({
    message: null,
  });
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [actionUser, setActionUser] = useState({});
  const [addUserModal, setAddUserModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("role") === "ADMIN") {
      AdminService.getUsers().then((res) => {
        setUsers(res);
      });
    } else if (localStorage.getItem("role") === "STUDENT") {
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccessfullyMessage({ message: null });
    }, 6000);
    AdminService.getUsers().then((res) => {
      setUsers(res);
    });
  }, [successfullyMessage.message]);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 6000);
  }, [error]);

  const openEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const openAddUserModal = () => {
    setAddUserModal(!addUserModal);
  };
  const handleOnEditUser = (user) => {
    openEditModal();
    setActionUser(user);
  };

  const handleOnDeleteUser = (user) => {
    openDeleteModal();
    setActionUser(user);
  };

  const handleOnAddUser = () => {
    openAddUserModal();
  };

  const editUserAction = () => {
    AdminService.editUser(actionUser).then((res) => {
      if (res.status === 200) {
        setActionUser({});
        setEditModalOpen(false);
        setSuccessfullyMessage({
          message: `Account details for user '${res.data.name} ${res.data.surname}' have been saved.`,
        });
      }
    });
  };

  const deleteUserAction = () => {
    AdminService.deleteUser(actionUser).then((res) => {
      if (res.status === 200) {
        setDeleteModalOpen(false);
        setSuccessfullyMessage({
          message: `Account '${actionUser.name} ${actionUser.surname}' have been successfully removed.`,
        });
        setActionUser({});
      }
    });
  };

  const addUserAction = () => {
    AdminService.addUser(actionUser).then((res) => {
      if (res?.data?.error) {
        setError(res.data.error);
      }
      if (res.status === 200) {
        setAddUserModal(false);
        setSuccessfullyMessage({
          message: `Successfully added user ${res.data.name} ${res.data.surname}`,
        });
        setActionUser({});
      }
    });
  };

  const updateActionUserData = (field, value) => {
    actionUser[field] = value;
    setActionUser({ ...actionUser });
  };

  return (
    <div className="py-3">
      {successfullyMessage.message && (
        <Alert color="success">{successfullyMessage.message}</Alert>
      )}

      <AddUserModal
        error={error}
        isOpen={addUserModal}
        toggle={openAddUserModal}
        addUserAction={addUserAction}
        data={actionUser}
        updateData={updateActionUserData}
      ></AddUserModal>

      <DeleteUserModal
        isOpen={deleteModalOpen}
        toggle={openDeleteModal}
        user={actionUser}
        deleteUserAction={deleteUserAction}
      ></DeleteUserModal>

      <EditUserModal
        isOpen={editModalOpen}
        toggle={openEditModal}
        editUserAction={editUserAction}
        data={actionUser}
        updateData={updateActionUserData}
      ></EditUserModal>

      <div className="d-flex justify-content-end pb-3">
        <Button className="custom-btn" onClick={handleOnAddUser}>
          Add user
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={`${index}__${user.name}_${user.surname}`}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => handleOnEditUser(user)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleOnDeleteUser(user)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboardUsers;
