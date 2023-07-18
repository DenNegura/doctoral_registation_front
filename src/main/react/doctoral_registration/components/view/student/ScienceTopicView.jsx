import React from 'react';
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ScienceTopicView = ({student}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Tema de cercetare</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {student.scienceTopic}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ScienceTopicView;