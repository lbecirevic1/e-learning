import { Col, Container, Row } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

const SubjectPage = (props) => {

    let subjectFilesPath = baseUrl + "/files/bySubjectId/" + localStorage.getItem('currSubjectId') + "/";

    const [lectures, setLectures] = useState(null);
    const [tutorials, setTutorials] = useState(null);
    const [excercises, setExcercises] = useState(null);
    const [student_excercises, setStudent_excercises] = useState(null);
    const [events, setEvents] = useState(null);

    const navigate = useNavigate();
    localStorage.setItem("currSubjectId", props.id);

    async function getFilesForSubjectType(type) {
        try {
            let response = await axios.get(subjectFilesPath + type, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            let files = response?.data.map(item => {
                return {"id": item.id, "name": item.name.slice(11)}
            });
            return files;
        } catch (err) {

        }
    }

    async function getSubjectEvents() {
        try {
            const response = await axios.get(baseUrl + "/events/" + localStorage.getItem("currSubjectId"), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return response?.data;
        }
        catch (err) {

        }
    }

    useEffect(() => {
         getFilesForSubjectType("excercise").then(r => {
             setExcercises(r);
         });
        getFilesForSubjectType("lecture").then(r => {
            setLectures(r);
        });
        getFilesForSubjectType("student_excercise").then(r => {
            setStudent_excercises(r);
        });
        getFilesForSubjectType("tutorial").then(r => {
            setTutorials(r);
        });
        getSubjectEvents().then(r => {
            setEvents(r);
        });
    }, []);


    function newEventClick(e) {
        e.preventDefault();
        navigate('/createEvent');
    }

    function uploadFileToSubject(e) {
        e.preventDefault();
        navigate('/fileUpload');
    }

    async function downloadFile(id, name) {
        try {
            let response = await axios.get("http://localhost:8080/download/file/" + id,  {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
        catch (err) {

        }
    }

    return (
    <Container className="py-5">
      <Row>
        <Col>

            {localStorage.getItem("role") === "PROFESSOR" ? <button className="mt-3 custom-btn" onClick={e => uploadFileToSubject(e)}>Upload new file</button>: <div/>}

            <h1 className="mt-5">{props.subjectName}</h1>

            <h2 className="mt-5">Subject information</h2>
           { /*<a href={"meet.google.com"}>Link za predavanja<br/></a>
            <a href={"meet.google.com"}>Link za vježbe<br/></a>
            <p>Konsultacije su u ponedjeljkom od 09:00 do 12:00.</p>
            <p>Termin predavanja je tad i tad.</p>*/}

            <h2 className="mt-5">Lectures</h2>
            {lectures?.map((item, index) => {
                return (
                <Row className="pb-1" key={`${index}-${item.name}`}>
                <Col>
                <Link to={"#"} onClick={() => {downloadFile(item.id, item.name)}}>{item.name}</Link>
                </Col>
                </Row>
                );
            })}

            <h2 className="mt-5">Tutorials</h2>
            {tutorials?.map((item, index) => {
                return (
                    <Row className="pb-1" key={`${index}-${item.name}`}>
                        <Col>
                            <Link to={"#"} onClick={() => {downloadFile(item.id, item.name)}}>{item.name}</Link>
                        </Col>
                    </Row>
                );
            })}

            {/*<h2 className="mt-5">Excercises</h2>*/}
            {/*{excercises?.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <Row className="pb-1" key={`${index}-${item.name}`}>*/}
            {/*            <Col>*/}
            {/*                <Link to={"#"} onClick={() => {downloadFile(item.id, item.name)}}>{item.name}</Link>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    );*/}
            {/*})}*/}

            <h2 className="mt-5">Homework</h2>
            {localStorage.getItem("role") === "PROFESSOR" ? <button className="mt-3 custom-btn" onClick={e => newEventClick(e)}>Create event</button>: <div/>}
            {events?.map((item, index) => {
                return (
                    <Row className="pb-1" key={`${index}-${item.name}`}>
                        <Col>
                            {localStorage.getItem("role") === "PROFESSOR" ? <Link to={"#"} onClick={() => {downloadFile(item.file.id, item.file.name.slice(11))}}>{item.name}</Link> :
                            <Link to={"/homework/" + item.id + "/" + item.file.id}>{item.name}</Link>}
                        </Col>
                    </Row>
                );
            })}

            {localStorage.getItem("role") === "PROFESSOR" ?
                <><h2 className="mt-5">Student Homeworks</h2>
                    {student_excercises?.map((item, index) => {
                    return (
                        <Row className="pb-1" key={`${index}-${item.name}`}>
                            <Col>
                                 <Link to={"#"} onClick={() => {downloadFile(item.id, item.name)}}>{item.name}</Link>
                            </Col>
                        </Row>
                    );
                })}</> : null}

        </Col>
      </Row>
    </Container>
  );
};

export default SubjectPage;
