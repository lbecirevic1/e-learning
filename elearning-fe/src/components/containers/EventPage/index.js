import {Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { DateTimePicker } from '@mui/x-date-pickers-pro';
import {useState} from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const EventPage = () => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const [eventName, setEventName] = useState(null);
    const [file, setFile] = useState(null);

    function toIsoString(date) {
        let pad = function(num) {
                return (num < 10 ? '0' : '') + num;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds())
    }


    async function onSubmitClick(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.append('subjectId', localStorage.getItem('currSubjectId'));
        formData.append('type', "excercise");
        try {
            let response = await axios({
                url: 'http://localhost:8080/upload',
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: formData
            });
            let fileId = response?.data?.id;
            await axios.post('http://localhost:8080/event',
                {"subject": {"id": localStorage.getItem("currSubjectId")},
                    "name": eventName,
                    "dateTime": toIsoString(startDate),
                    "deadline": toIsoString(deadline),
                    "file": {
                        "id": fileId
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
            navigate('/submitted');
        } catch (err) {

        }
    }

    function handleFile(e) {
        setFile(e.target.files[0]);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h4>Create Homework</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3 py-4 px-5" lg={{ offset: 2, span: 8 }}>
                        <Form>
                            <FormGroup className="mt-3" controlId="name">
                                <FormLabel>Event name</FormLabel>
                                <FormControl type="text" placeholder="Name" onChange={(e) => {
                                    setEventName(e.target.value);
                                }}/>
                            </FormGroup>

                            <FormGroup className="mt-3" controlId="name">
                                <FormLabel>Pick start date and time</FormLabel>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3" controlId="name">
                                <FormLabel>Pick deadline</FormLabel>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={deadline}
                                    onChange={setDeadline}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3" controlId="name">
                                <FormLabel>Choose file to upload</FormLabel>
                                <input type={"file"} onChange={(e) => handleFile(e)}/>

                            </FormGroup>


                            <div className="d-flex justify-content-between mt-3">
                                <button className="custom-btn">Cancel</button>
                                <button className="custom-btn" onClick={event => onSubmitClick(event)}>Submit</button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </LocalizationProvider>
    );
};

export default EventPage;