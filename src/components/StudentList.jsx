import React from 'react';
import {Card, Table} from "react-bootstrap";

const StudentList = ({students, title, onSelectedStudent}) => {

    const selectStudent = (row) => {
        if(isNaN(row)) return;
        const student = students.filter((student, index) => index === row)[0];
        onSelectedStudent(student);
    }


    return (
        <Card>
            <Card.Header>
                {title === undefined ?
                    <Card.Title>Lista studentelor</Card.Title> :
                    <Card.Title>{title}</Card.Title> }
            </Card.Header>
            <Card.Body style={{padding: "0%"}}>
                {/*previousSibling.id*/}
                <Table hover responsive={"xl"} onClick={e => selectStudent(parseInt(e.target.parentElement.id))}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Numele</th>
                        <th>Prenumele</th>
                        <th>Anul</th>
                        <th>Specialitatea</th>
                        <th>Scoala</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student, index) => {
                        return <tr key={index} id={index}>
                            <td>{index + 1}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>
                                {
                                    student.yearStudy === 'EXTRA_I' ? 'Grație I-II' :
                                        student.yearStudy === 'EXTRA_II' ? 'Grație II' : student.yearStudy}
                            </td>
                            <td>{student.speciality.id} {student.speciality.name}</td>
                            <td>{student.speciality.scienceSchool}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default StudentList;