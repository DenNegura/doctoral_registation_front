import React from 'react';
import {Card, Table} from "react-bootstrap";
import Student from "../../domains/Student";

const PersonalDataView = ({student}) => {
    return (
        <Card style={{height: "100%"}}>
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
                            {Student.getConstants().getByConstId(
                                Student.getConstants().GENDER, student.gender).value}
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
    );
};

export default PersonalDataView;