import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

import DataService from "../../../services/DataService";
import {
  createSubject,
  getAllDepartments,
  getAllSemesters,
} from "../../../services/Routes";
import { Request } from "../../../services/Request";
import { useNavigate } from "react-router-dom";
import {} from "lodash/seq";
import { Button, ModalHeader, Modal, ModalBody, ModalFooter } from "reactstrap";

const AddSubject = ({ isOpen, toggle, addSubjectAction}) => {
  const [departments, setDepartments] = useState(null);
  const [semesters, setSemesters] = useState(null);
  const [data, setData] = useState({ name: "", department: "", semester: "" });

  const [selectedDepartment, setSelectedDepertment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const updateData = (field, value) => {
    data[field] = value;
    setData({ ...data });
  };

  useEffect(() => {
    Request(getAllDepartments, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    })
      .then((res) => {
        setDepartments(res.data);
        if (res.status === 200) {
          setSelectedDepertment(res.data[0]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Request(getAllSemesters, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    })
      .then((res) => {
        setSemesters(res.data);
        if (res.status === 200) {
          setSelectedSemester(res.data[0]);
        }
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addSubject = async (e) => {
    e.preventDefault();

    console.log(selectedSemester);
    console.log(selectedDepartment);

    const data = {
      name: name,
      department_id:selectedDepartment.id,
      semester_id:selectedSemester.id
    }
    try {
      Request(
        createSubject,
        "POST",
        data,
        { Authorization: "Bearer " + localStorage.getItem("accessToken") }
      ).then((res) => {
        addSubjectAction(res)
        //navigate("/mydashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable>
      <ModalHeader>Add subject</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup controlId="type">
            <FormLabel>Semester</FormLabel>
            <FormSelect
              onChange={(e) => {
                setSelectedSemester(
                  semesters.filter((s) => {
                    if (s.name === e.target.value) return s;
                  })[0]
                );
              }}
            >
              {semesters != null ? (
                semesters.map((element) => {
                  return (
                    <option className="my-2" value={element.name}>
                      {element.name}
                    </option>
                  );
                })
              ) : (
                <option className="my-2">Loading</option>
              )}
            </FormSelect>
          </FormGroup>
          <FormGroup className={"mt-2"} controlId="type">
            <FormLabel>Department</FormLabel>
            <FormSelect
              onChange={(e) => {
                setSelectedDepertment(
                  departments.filter((d) => {
                    if (d.name === e.target.value) return d;
                  })[0]
                );
              }}
            >
              {departments != null ? (
                departments.map((element) => {
                  return (
                    <option className="my-2" value={element.name}>
                      {element.name}
                    </option>
                  );
                })
              ) : (
                <option className="my-2">Loading</option>
              )}
            </FormSelect>
          </FormGroup>
          <FormGroup className="mt-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></FormControl>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="custom-btn" onClick={addSubject}>
          Submit
        </Button>
        <Button className="custom-btn" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddSubject;
