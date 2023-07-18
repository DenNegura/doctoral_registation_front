import React from 'react';
import {Card, Table} from "react-bootstrap";

const SupervisorView = ({student}) => {
    return (
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
    );
};

export default SupervisorView;