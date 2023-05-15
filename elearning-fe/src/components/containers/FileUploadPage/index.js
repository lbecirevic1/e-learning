import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const FileUploadPage = () => {

    const [selectedType, setSelectedType] = useState("Choose file type");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    function handleFile(e) {
        setFile(e.target.files[0]);
    }

    async function onSubmitClick(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.append('subjectId', localStorage.getItem('currSubjectId'));
        formData.append('type', selectedType);
        try {
            await axios({
                url: 'http://localhost:8080/upload',
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: formData
            });
            navigate("/submitted");
        }
        catch (err) {

        }
    }

    return (
        <div>
            <input type={"file"} onChange={(e) => handleFile(e)}/>
            <Dropdown onSelect={(eventKey) => setSelectedType(eventKey)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item id={"lecture"} eventKey={"Lecture"}>Lecture</Dropdown.Item>
                    <Dropdown.Item id={"tutorial"} eventKey={"Tutorial"}>Tutorial</Dropdown.Item>
                    {/*<Dropdown.Item id={"excercise"} eventKey={"Excercise"}>Exercise</Dropdown.Item>*/}
                    {/*<Dropdown.Item id={"student_excercise"} eventKey={"Homework"}>Homework</Dropdown.Item>*/}
                </Dropdown.Menu>
            </Dropdown>
            <button className="custom-btn" onClick={event => onSubmitClick(event)}>Submit</button>
        </div>
    );
};

export default FileUploadPage;