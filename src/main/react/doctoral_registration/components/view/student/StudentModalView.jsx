import React from 'react';
import {Modal} from "react-bootstrap";
import StudentView from "./StudentView";

const StudentModalView = ({isVisible, onHide, student}) => {
    if (student && isVisible) {
        return (
            <Modal
                size={"xl"}
                centered
                show={isVisible}
                onHide={onHide}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        {student.firstName + ' ' + student.lastName + ' ' + student.patronymicName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentView student={student}/>
                </Modal.Body>
            </Modal>
        );
    } else {
        return <></>
    }
};

export default StudentModalView;