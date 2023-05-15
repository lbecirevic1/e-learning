import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const HomeworkPage = (props) => {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    async function downloadFile(id) {
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
            link.setAttribute('download', "Homework.pdf");
            document.body.appendChild(link);
            link.click();
        }
        catch (err) {

        }
    }

    async function onSubmitClick(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.append('subjectId', localStorage.getItem('currSubjectId'));
        formData.append('type', 'student_excercise');
        try {
            const response = await axios({
                url: 'http://localhost:8080/upload',
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: formData
            });
            let newFileId = response?.data?.id;
            await axios.post("http://localhost:8080/userEvent/finishEvent", {
                "userId": localStorage.getItem("userId"),
                "eventId": props.eventId,
                "fileId": newFileId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            navigate("/submitted");
        }
        catch (err) {

        }
    }

    function handleFile(e) {
        setFile(e.target.files[0]);
    }

    return (
        <div>
            <button onClick={() => downloadFile(props.fileId)}>Download homework file</button>
            <input type={"file"} onChange={(e) => handleFile(e)}/>
            <button onClick={(e) => onSubmitClick(e)}>Finish homework</button>
        </div>
    );
};

export default HomeworkPage;