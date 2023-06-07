import React, {useMemo, useState} from 'react';
import {Card, Table} from "react-bootstrap";
import FilterBox from "../../filterbox/FilterBox";

const SupervisorList = ({supervisors, onSelectedSupervisor}) => {

    const [sortedValue, setSortedValue] = useState('');

    const selectSupervisor = (row) => {
        if (isNaN(row)) return;
        const supervisor = supervisors.filter((supervisor, index) => index === row)[0];
        onSelectedSupervisor(supervisor);
    }

    const getFilteredSupervisors = useMemo(() => {
        const compare = (str) => {
            return str.replace(' ', '')
                .toLowerCase().includes(sortedValue
                    .toLowerCase().replace(' ', ''));
        }
        if (sortedValue !== '') {
            return [...supervisors].filter(s =>
                compare(s.firstName + s.lastName + s.post + s.speciality))
        } else {
            return supervisors;
        }
    }, [sortedValue, supervisors])

    return (
        <Card>
            <Card.Header>
                <Card.Title>Lista profesorilor</Card.Title>
            </Card.Header>
            <Card.Body>
                <FilterBox
                    onChange={setSortedValue}
                    placeholder={"Căutați"}/>
                <Table hover responsive={"xl"} onClick={
                    e => selectSupervisor(parseInt(e.target.parentElement.id))}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Numele</th>
                        <th>Prenumele</th>
                        <th>Post</th>
                        <th>Specialitatea</th>
                    </tr>
                    </thead>
                    {supervisors !== null ?
                        <tbody>
                        {getFilteredSupervisors.map((supervisor, index) => {
                            return <tr key={index} id={index}>
                                <td>{index + 1}</td>
                                <td>{supervisor.firstName}</td>
                                <td>{supervisor.lastName}</td>
                                <td>{supervisor.post}</td>
                                <td>{supervisor.speciality}</td>
                            </tr>
                        })}
                        </tbody> :
                        <tbody>
                        </tbody>
                    }

                </Table>
            </Card.Body>
        </Card>
    );
};

export default SupervisorList;