import React from 'react';
import HomeworkPage from "../components/containers/HomeworkPage";
import {useParams} from "react-router-dom";

const Homework = () => {

    const {eventId, fileId} = useParams();


    return (
        <div>
            <HomeworkPage eventId={eventId} fileId={fileId}/>
        </div>
    );
};

export default Homework;