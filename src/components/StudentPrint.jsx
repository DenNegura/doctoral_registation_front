import React from 'react';
import {Card, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
                            <Table bordered={false} striped={false} size={"2sm"}>
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
                                    <th>Telefon</th>
                                    <td>{student.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <th>Personal email</th>
                                    <td>{student.personalEmail}</td>
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
            <br/>
            <Card>
                <Card.Header>
                    <Card.Title>Inamatriculare</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Table bordered={false} striped={false} size={"2sm"}>
                                <tbody>
                                <tr>
                                    <th>Diploma. Seria numar</th>
                                    <td>{student.diplomaSeries}</td>
                                </tr>
                                <tr>
                                    <th>Diploma. Numar de inregistrare</th>
                                    <td>{student.diplomaNumber}</td>
                                </tr>
                                <tr>
                                    <th>Tip inamatriculare</th>
                                    <td>
                                        {student.registration === 'ENROLLED' ? 'Inmatriculat' :
                                            student.registration === 'TRANSFERRED' ? 'Transferat' : 'Restabilit'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Studii</th>
                                    <td>
                                        {student.studyType === 'FREQUENCY' ? 'Frecvență' : 'Frecvență redusă'}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Finanțare</th>
                                    <td>{student.financing === 'BUDGET' ? 'Budget' : 'Taxă'}</td>
                                </tr>
                                <tr>
                                    <th>Anul de studii</th>
                                    <td>
                                        {
                                            student.yearStudy === 'EXTRA_I' ? 'Grație I-II' :
                                                student.yearStudy === 'EXTRA_II' ? 'Grație II' : student.yearStudy}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Inceputul studiilor</th>
                                    <td>{student.beginStudies}</td>
                                </tr>
                                <tr>
                                    <th>Finalizarea studiilor</th>
                                    <td>{student.endStudies}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table bordered={false} striped={false} size={"2sm"}>
                                <tbody>
                                <tr>
                                    <th>Școala doctorală</th>
                                    <td>{student.speciality.scienceSchool}</td>
                                </tr>
                                <tr>
                                    <th>Domeniul științific</th>
                                    <td>{student.speciality.scienceDomain}</td>
                                </tr>
                                <tr>
                                    <th>Ramura științifică</th>
                                    <td>{student.speciality.scienceBranch}</td>
                                </tr>
                                <tr>
                                    <th>Profilul știițific</th>
                                    <td>{student.speciality.scienceProfile}</td>
                                </tr>
                                <tr>
                                    <th>Codul specialității</th>
                                    <td>{student.speciality.id}</td>
                                </tr>
                                <tr>
                                    <th>Specialitatea</th>
                                    <td>{student.speciality.name}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Header>
                    <Card.Title>Ordin</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Table bordered={false} striped={false} size={"2sm"}>
                                <tbody>
                                <tr>
                                    <th>Numar</th>
                                    <th>Data</th>
                                    <th>Tip</th>
                                    <th>Subtip</th>
                                </tr>
                                {
                                    student.orders.map(order => {
                                        return <tr>
                                            <td>{order.number}</td>
                                            <td>{order.date}</td>
                                            <td>{order.orderSubtype}</td>
                                            <td>{order.orderType}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Header>
                    <Card.Title>Conducător de doctorat și Membrii comisiei de îndrumare</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table bordered={false} striped={false} size={"2sm"}>
                        <Row>
                            <Col>
                                <Table bordered={false} striped={false} size={"2sm"}>
                                    <tbody>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Numele</th>
                                        <th>Prenumele</th>
                                        <th>Post</th>
                                        <th>Specialitatea</th>
                                    </tr>
                                    <tr>
                                        <th>Cond.</th>
                                        <td>{student.supervisor.firstName}</td>
                                        <td>{student.supervisor.lastName}</td>
                                        <td>{student.supervisor.post}</td>
                                        <td>{student.supervisor.speciality}</td>
                                    </tr>
                                    {
                                        student.steeringCommittee.map(supervisor => {
                                            return <tr>
                                                <th>Mem.</th>
                                                <td>{supervisor.firstName}</td>
                                                <td>{supervisor.lastName}</td>
                                                <td>{supervisor.post}</td>
                                                <td>{supervisor.speciality}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Table>
                </Card.Body>
            </Card>
            <br/>
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
            <br/>
            <Button variant="primary">Redactarea datelor</Button>
        </div>
    );
};

export default StudentPrint;