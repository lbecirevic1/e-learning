import React from 'react';
import "./index.css";
import {useNavigate} from "react-router-dom";

const SubmittedPage = () => {

    const navigate = useNavigate();

    function onOkClick(event) {
        event.preventDefault();
        navigate('/dashboard');
    }

    return (
        <div className={"centered"}>
            <h1>Successfuly submitted!</h1>
            <button className="mt-3 custom-btn centeredBtn" onClick={event => onOkClick(event)}>Ok</button>
        </div>
    );
};

export default SubmittedPage;