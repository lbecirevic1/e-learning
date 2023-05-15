import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../services/AdminService";
import { Alert, Button } from "reactstrap";

import { Table } from "react-bootstrap";
import DataService from "../../../services/DataService";
import AddSubject from "../AddSubject";

const AdminDashboardSubjects = () => {
  const [successfullyMessage, setSuccessfullyMessage] = useState({
    message: null,
  });
  const [error, setError] = useState(null);
  const [actionSubject, setActionSubject] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [addSubjectModal, setAddSubjectModal] = useState(false);

  useEffect(() => {
    DataService.getAllSubjects().then((res) => setSubjects(res));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccessfullyMessage({ message: null });
    }, 6000);
    DataService.getAllSubjects().then((res) => setSubjects(res));
  }, [successfullyMessage.message]);

  const openAddSubjectModal = () => {
    setAddSubjectModal(!addSubjectModal);
  };

  const handleOnAddSubject = () => {
    openAddSubjectModal();
  };

  const handleOnEditSubject = () => {};
  const handleOnDeleteSubject = () => {};

  const addSubjectAction = (res) => {
      if (res?.data?.error) {
        setError(res.data.error);
      }
      if (res.status === 200) {
        setAddSubjectModal(false);
        setSuccessfullyMessage({
          message: `Successfully added subject ${res.data.name}`,
        });
        setActionSubject({});
      }
  };

  return (
    <div className="py-3">
{successfullyMessage.message && (
        <Alert color="success">{successfullyMessage.message}</Alert>
      )}
      <AddSubject isOpen={addSubjectModal} toggle={openAddSubjectModal} addSubjectAction={addSubjectAction} ></AddSubject>

      <div className="d-flex justify-content-end pb-3">
        <Button className="custom-btn" onClick={handleOnAddSubject}>
          Add subject
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => {
            return (
              <tr key={`${index}__${subject.name}_${subject.surname}`}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{`/`}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => handleOnEditSubject(subject)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleOnDeleteSubject(subject)}
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

export default AdminDashboardSubjects;
