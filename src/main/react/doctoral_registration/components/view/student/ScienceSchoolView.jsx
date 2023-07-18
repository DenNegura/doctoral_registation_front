import React from 'react';
import {Card, Table} from "react-bootstrap";

const ScienceSchoolView = ({student}) => {
    return (
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
    );
};

export default ScienceSchoolView;