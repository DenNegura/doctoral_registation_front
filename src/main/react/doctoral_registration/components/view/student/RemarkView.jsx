import React from 'react';
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RemarkView = ({student}) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Note aditionale</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {student.remark}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RemarkView;