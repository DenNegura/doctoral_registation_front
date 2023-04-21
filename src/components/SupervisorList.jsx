import React from 'react';
import {Card, Table} from "react-bootstrap";

const SupervisorList = ({supervisors, title, onSelectedSupervisor}) => {

    const selectSupervisor = (row) => {
        if(isNaN(row)) return;
        const supervisor = supervisors.filter((supervisor, index) => index === row)[0];
        onSelectedSupervisor(supervisor);
    }

    return (
        <Card>
            <Card.Header>
                {title === undefined ?
                    <Card.Title>Lista profesorilor</Card.Title> :
                    <Card.Title>{title}</Card.Title> }
            </Card.Header>
            <Card.Body style={{padding: "0%"}}>
                <Table hover responsive={"xl"} onClick={e => selectSupervisor(parseInt(e.target.parentElement.id))}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Numele</th>
                        <th>Prenumele</th>
                        <th>Post</th>
                        <th>Specialitatea</th>
                    </tr>
                    </thead>
                    <tbody>
                    {supervisors.map((supervisor, index) => {
                        return <tr key={index} id={index}>
                            <td>{index + 1}</td>
                            <td>{supervisor.firstName}</td>
                            <td>{supervisor.lastName}</td>
                            <td>{supervisor.post}</td>
                            <td>{supervisor.speciality}</td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default SupervisorList;