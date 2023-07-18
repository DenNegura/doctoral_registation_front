import React from 'react';
import {Container, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MatriculationView from "./MatriculationView";
import ScienceSchoolView from "./ScienceSchoolView";
import OrderView from "./OrderView";
import SupervisorView from "./SupervisorView";
import ScienceTopicView from "./ScienceTopicView";
import PersonalDataView from "./PersonalDataView";
import RemarkView from "./RemarkView";

const StudentView = ({student, isEditButton = true}) => {

    if (student) {
        return (
            <Container>
                <Row className={"mb-3"}>
                    <Col>
                        <PersonalDataView student={student}/>
                    </Col>
                    <Col>
                        <MatriculationView student={student}/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <ScienceSchoolView student={student}/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <OrderView student={student}/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <SupervisorView student={student}/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <ScienceTopicView student={student}/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <RemarkView student={student}/>
                    </Col>
                </Row>
                {isEditButton ?
                    <Row className={"mb-3"}>
                        <Col>
                            <Button variant="primary">Redactarea datelor</Button>
                        </Col>
                    </Row> : <></>
                }
            </Container>
        );
    } else {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
};

export default StudentView;