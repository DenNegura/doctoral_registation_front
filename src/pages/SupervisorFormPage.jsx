import React, {useEffect, useState} from 'react';
import {Offcanvas} from "react-bootstrap";
import SupervisorForm from "../components/SupervisorForm";
import Server from "../components/settings/Server";
import SupervisorList from "../components/SupervisorList";
import Supervisor from "../components/domains/Supervisor";
import ControlButtons from "../components/ControlButtons/ControlButtons";

const SupervisorFormPage = () => {

    const [supervisors, setSupervisors] = useState([]);

    const [schools, setSchools] = useState([]);

    const [supervisor, setSupervisor] = useState(null);

    const [isVisible, setVisible] = useState(false);

    const [title, setTitle] = useState();

    const CREATE = 'Inregistratea';

    const UPDATE = 'Editarea datelor';

    useEffect(() => {
        Server.getSupervisors().then(supervisorsList => {
            setSupervisors(supervisorsList.map(
                supervisor => Supervisor.create(supervisor)));
        })
    }, [])

    useEffect(() => {
        Server.getSchools().then(schoolsList => {
            setSchools(schoolsList.map(
                school => {
                    return {id: school.id, value: school.name}
                }))
        })
    }, []);

    const onSelect = (s) => {
        s === null ? setTitle(CREATE) : setTitle(UPDATE);
        setSupervisor(() => s);
        setVisible(true);
    }

    const onSave = (s) => {
        if (s.id !== null) {
            Server.updateSupervisor(s).then(s => {
                let supervisor = supervisors
                    .filter(supervisor => supervisor.id === s.id)[0];
                supervisor.copy(s);
                setSupervisors(() => supervisors);
            });
        } else {
            Server.createSupervisor(s).then(s => {
                setSupervisors(supervisors => [s, ...supervisors]);
            });
        }
        setVisible(false);
    }

    return (
        <div>
            <SupervisorList
                supervisors={supervisors}
                onSelectedSupervisor={onSelect}/>
            <Offcanvas
                show={isVisible}
                onHide={() => setVisible(false)}
                placement={'start'}
                name={'form'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SupervisorForm
                        supervisor={supervisor}
                        setSupervisor={onSave}
                        schools={schools}/>
                </Offcanvas.Body>
            </Offcanvas>
            <ControlButtons
                addFun={() => onSelect(null)}/>
        </div>
    );
};

export default SupervisorFormPage;