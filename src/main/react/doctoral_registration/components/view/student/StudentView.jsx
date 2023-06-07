import React from 'react';
import {Card, Container, Spinner, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateParser from "../../../utils/DateParser";
import Student from "../../domains/Student";

const StudentView = ({student}) => {

    const dateParser =
        new DateParser(DateParser.FORMAT.DD_MM_YYYY, DateParser.DELIMITER.SLASH);

    if (student) {
        return (
            <Container>
                <Row className={"mb-3"}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>Date personale</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered={false} striped={false}>
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
                                    <tr>
                                        <th>Cetățenia</th>
                                        <td>{student.citizenship ? student.citizenship.country : ''}</td>
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
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>Inamatriculare</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <Table bordered={false} striped={false} size={"2sm"}>
                                    <tbody>
                                    <tr>
                                        <th>Corporativ email</th>
                                        <td>{student.corporateEmail}</td>
                                    </tr>
                                    <tr>
                                        <th>Diploma. Seria</th>
                                        <td>{student.diplomaSeries}</td>
                                    </tr>
                                    <tr>
                                        <th>Diploma. Numar</th>
                                        <td>{student.diplomaNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Tip inamatriculare</th>
                                        <td>
                                            {Student.getConstants().getByConstId(
                                                Student.getConstants().REGISTRATION, student.registration).value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Studii</th>
                                        <td>
                                            {Student.getConstants().getByConstId(
                                                Student.getConstants().STUDY_TYPE, student.studyType).value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Finanțare</th>
                                        <td>
                                            {Student.getConstants().getByConstId(
                                                Student.getConstants().FINANCING, student.financing).value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Anul de studii</th>
                                        <td>
                                            {Student.getConstants().getByConstId(
                                                Student.getConstants().YEAR_STUDY, student.yearStudy).value}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Inceputul studiilor</th>
                                        <td>{dateParser.toString(student.beginStudies)}</td>
                                    </tr>
                                    <tr>
                                        <th>Finalizarea studiilor</th>
                                        <td>{dateParser.toString(student.endStudies)}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>Școala doctorală</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered={false} striped={false} size={"2sm"}>
                                    <tbody>
                                    <tr>
                                        <th>Școala doctorală</th>
                                        {student.speciality ?
                                            <td>{student.speciality.scienceSchool}</td> : <td/>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Domeniul științific</th>
                                        {student.speciality ?
                                            <td>{student.speciality.scienceDomain}</td> : <td/>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Ramura științifică</th>
                                        {student.speciality ?
                                            <td>{student.speciality.scienceBranch}</td> : <td/>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Profilul știițific</th>
                                        {student.speciality ?
                                            <td>{student.speciality.scienceProfile}</td> : <td/>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Codul specialității</th>
                                        {student.speciality ?
                                            <td>{student.speciality.id}</td> : <td/>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Specialitatea</th>
                                        {student.speciality ?
                                            <td>{student.speciality.name}</td> : <td/>
                                        }
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>Ordin</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Table bordered={false} striped={false} size={"2sm"}>
                                            <thead>
                                            <tr>
                                                <th>Numar</th>
                                                <th>Data</th>
                                                <th>Tip</th>
                                                <th>Subtip</th>
                                            </tr>
                                            </thead>
                                            {student.orders ?
                                                <tbody>
                                                {
                                                    student.orders.map(order => {
                                                        return <tr key={order.id}>
                                                            <td>{order.number}</td>
                                                            <td>{dateParser.toString(order.date)}</td>
                                                            <td>{order.orderSubtype}</td>
                                                            <td>{order.orderType}</td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody> :
                                                <tbody/>
                                            }
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title>Conducător de doctorat și Membrii comisiei de îndrumare</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered={false} striped={false} size={"2sm"}>
                                    <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Numele</th>
                                        <th>Prenumele</th>
                                        <th>Post</th>
                                        <th>Specialitatea</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {student.supervisor ?
                                        <tr>
                                            <th>Cond.</th>
                                            <td>{student.supervisor.firstName}</td>
                                            <td>{student.supervisor.lastName}</td>
                                            <td>{student.supervisor.post}</td>
                                            <td>{student.supervisor.speciality}</td>
                                        </tr> :
                                        <tr>
                                        </tr>
                                    }
                                    {student.steeringCommittee ?
                                        student.steeringCommittee.map(supervisor => {
                                            return <tr key={supervisor.id}>
                                                <th>Mem.</th>
                                                <td>{supervisor.firstName}</td>
                                                <td>{supervisor.lastName}</td>
                                                <td>{supervisor.post}</td>
                                                <td>{supervisor.speciality}</td>
                                            </tr>
                                        }) :
                                        <tr>
                                        </tr>
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
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
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <Button variant="primary">Redactarea datelor</Button>
                    </Col>
                </Row>
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