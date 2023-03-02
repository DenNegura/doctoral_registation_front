import React from 'react';
import {Card, Container, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentPrint = ({student}) => {
    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Date personale</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Table  bordered={false} striped={false} size={"2sm"}>
                                <tbody>
                                <tr>
                                    <th>Numele</th>
                                    <td>{student.firstName}</td>
                                </tr>
                                <tr>
                                    <th>Prenumele</th>
                                    <td>{student.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Patronimic</th>
                                    <td>{student.patronymicName}</td>
                                </tr>
                                <tr>
                                    <th>Gen</th>
                                    <td>
                                        {student.gender === 'M' ? 'Masculin' : 'Feminin'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Anul nașterii</th>
                                    <td>{student.yearBirth}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table bordered={false} striped={false} size={"2sm"}>
                                <tbody>
                                <tr>
                                    <th>Cetățenia</th>
                                    <td>{student.citizenship.country}</td>
                                </tr>
                                <tr>
                                    <th>IDNP</th>
                                    <td>{student.identNumber}</td>
                                </tr>
                                <tr>
                                    <th>Personal email</th>
                                    <td>{student.personalEmail}</td>
                                </tr>
                                <tr>
                                    <th>Telefon</th>
                                    <td>{student.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <th>Corporativ email</th>
                                    <td>{student.corporateEmail}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentPrint;