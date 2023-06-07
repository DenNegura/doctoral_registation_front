import React, {useMemo, useState} from 'react';
import {Card, Table} from "react-bootstrap";
import FilterBox from "../../filterbox/FilterBox";

const StudentList = ({students, title, onSelectedStudent}) => {

    const [sortedValue, setSortedValue] = useState(
        {firstName: '', lastName: '', yearStudy: '', speciality: '', school: ''});

    const selectStudent = (row) => {
        if (isNaN(row)) return;
        const student = students.filter((student, index) => index === row)[0];
        onSelectedStudent(student);
    }

    const getFilteredStudents = useMemo(() => {
        let studentsList = students;
        let value = sortedValue.firstName.trim();
        if (value !== '') {
            studentsList = studentsList
                .filter(student => student.firstName.includes(value));
        }
        value = sortedValue.lastName.trim();
        if (value !== '') {
            studentsList = studentsList
                .filter(student => student.lastName.includes(value));
        }
        value = sortedValue.yearStudy.trim();
        if (value !== '') {
            studentsList = studentsList
                .filter(student => student.yearStudy.includes(value));
        }
        value = sortedValue.speciality.trim();
        if (value !== '') {
            studentsList = studentsList
                .filter(student => (student.speciality.id + ' ' + student.speciality.name).includes(value));
        }
        value = sortedValue.school.trim();
        if (value !== '') {
            studentsList = studentsList
                .filter(student => student.speciality.scienceSchool.includes(value));
        }
        return studentsList;
    }, [sortedValue, students])

    return (
        <Card>
            <Card.Header>
                {title === undefined ?
                    <Card.Title>Lista studentelor</Card.Title> :
                    <Card.Title>{title}</Card.Title>}
            </Card.Header>
            <Card.Body style={{padding: "0%"}}>
                <Table hover bordered responsive={"xl"} onClick={e =>
                    selectStudent(parseInt(e.target.parentElement.id))}>
                    <thead>
                    <tr>
                        <th>Numele</th>
                        <th>Prenumele</th>
                        <th>Anul</th>
                        <th>Specialitatea</th>
                        <th>Scoala</th>
                    </tr>
                    <tr>
                        <td><FilterBox
                            image={false}
                            placeholder={"Numele"}
                            onChange={(value) => setSortedValue({...sortedValue, firstName: value})}
                        />
                        </td>
                        <td><FilterBox
                            image={false}
                            placeholder={"Prenumele"}
                            onChange={(value) => setSortedValue({...sortedValue, lastName: value})}
                        />
                        </td>
                        <td><FilterBox
                            image={false}
                            placeholder={"Anul"}
                            onChange={(value) => setSortedValue({...sortedValue, yearStudy: value})}
                        />
                        </td>
                        <td><FilterBox
                            image={false}
                            placeholder={"Specialitatea"}
                            onChange={(value) => setSortedValue({...sortedValue, speciality: value})}
                        />
                        </td>
                        <td><FilterBox
                            image={false}
                            placeholder={"Scoala"}
                            onChange={(value) => setSortedValue({...sortedValue, school: value})}
                        />
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {getFilteredStudents.map((student, index) => {
                        return <tr key={index} id={index}>
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