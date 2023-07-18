import React, {useEffect, useMemo, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Card, Container, Tab, Tabs} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "../components/fields/Select";
import School from "../../domains/School";
import CardHeader from "../components/cardheader/CardHeader";
import classes from './Forms.module.css'
import Server from "../../../server/Server";
import Supervisor from "../../domains/Supervisor";
import EntityListForm from "./EntityListForm";
import Speciality from "../../domains/Speciality";
import Student from "../../domains/Student";

const ScienceSchoolForm = ({visible, student, setStudent, autoValidate, setStatus}) => {

    // CONSTANTS
    const MAX_SELECT_SPECIALITIES = 1;

    const MAX_SELECT_SUPERVISORS = 1;

    const MAX_SELECT_COMMITTEE = 3;


    // ENTITIES
    const [schools, setSchools] = useState([]);

    const [specialities, setSpecialities] = useState([]);

    const [supervisors, setSupervisors] = useState([]);


    // SELECT
    const [school, setSchool] = useState(School.fromObject({id: 0, name: ''}));

    const [selectSpecialities, setSelectSpecialities] = useState([]);

    const [selectSupervisors, setSelectSupervisors] = useState([]);

    const [selectCommittee, setSelectCommittee] = useState([]);


    // ERRORS
    const [invalidMsgSpecialities, setInvalidMsgSpecialities] = useState(null);

    const [invalidMsgSupervisors, setInvalidMsgSupervisors] = useState(null);

    const [invalidMsgCommittee, setInvalidMsgCommittee] = useState(null);

    const [submitFormStatus, setSubmitFormStatus] = useState(false);

    const changeSchool = (id) => {
        const list = schools.filter(s => s.id === id);
        if (list.length) {
            const selectSchool = list[0];
            if(school.id !== selectSchool.id) {
                console.log("load from server")
                Server.get(Server.GET_BY_ID.SPECIALITIES_BY_SCHOOL, setSpecialities)
                    .params(selectSchool.id).map(Speciality.fromObject).build();
                Server.get(Server.GET_BY_ID.SUPERVISORS_BY_SCHOOL, setSupervisors)
                    .params(selectSchool.id).map(Supervisor.fromObject).build();
                setSelectSupervisors(() => []);
                setSelectSpecialities(() => []);
                setSelectCommittee(() => []);
                setSchool(() => selectSchool);
            }
        }
    }
    // validate form
    useEffect(() => {
        if(autoValidate) {
            validation();
        }
    }, [autoValidate])

    // load schools from server
    useEffect(() => {
        if (visible && schools.length === 0) {
            Server.get(Server.GET_ALL.SCHOOLS, setSchools)
                .map(School.fromObject).build();
        }
    }, [schools.length, visible])

    // use default school or properties of student
    // todo возможно, speciality и другие можно добавить сразу в useState
    useEffect(() => {
        if(student.speciality && student.supervisor && student.steeringCommittee) {
            const speciality = student.speciality;
            const supervisor = student.supervisor;
            const committee = student.steeringCommittee;
            if(speciality.id) {
                changeSchool(speciality.scienceSchoolId);
                console.log(committee.map(Supervisor.fromObject))
                setSelectSpecialities(() => [Speciality.fromObject(speciality)])
                setSelectSupervisors(() => [Supervisor.fromObject(supervisor)])
                setSelectCommittee(() => committee.map(Supervisor.fromObject))
            }
        } else if (schools.length && school.id === 0) {
            changeSchool(schools[0].id);
        }
    }, [student.speciality, student.supervisor, student.steeringCommittee, schools])

    // useEffect(() => {
    //     if (schools.length && school.id === 0) {
    //         changeSchool(schools[0].id);
    //     }
    // }, [schools])

    // FILTER SUPERVISORS & COMMITTEE

    const filteredSupervisors = useMemo(() => {
        let selectItems = supervisors;
        if (selectSupervisors.length) {
            selectItems = selectItems
                .filter(item => !selectSupervisors
                    .some(selectItem => selectItem.id === item.id));
        }
        if (selectCommittee.length) {
            selectItems = selectItems
                .filter(item => !selectCommittee
                    .some(selectItem => selectItem.id === item.id));
        }
        return selectItems;
    }, [changeSchool, selectSupervisors, selectCommittee])



    const save = () => {
        const speciality = Student
            .Speciality.fromObject(selectSpecialities[0]);
        speciality.scienceSchool = school.name;
        setStudent(student => Student
            .fromObject({...student,
                speciality: speciality,
                supervisor: selectSupervisors[0],
                steeringCommittee: selectCommittee}));
    }

    const validation = () => {
        if (!isValidForm()) {
            setStatus(false);
        } else {
            setStatus(true);
            save();
        }
    }

    const isValidForm = () => {
        if(!submitFormStatus) {
            setSubmitFormStatus(true);
        }
        let isValid = true;
        const invalidItem = (items, msg, setMsg) => {
            if (!items.length) {
                setMsg(msg);
                isValid = false;
            } else {
                setMsg(null);
            }
        }

        invalidItem(selectSpecialities, 'Selectati specialitatea', setInvalidMsgSpecialities);
        invalidItem(selectSupervisors, 'Selectati conducator', setInvalidMsgSupervisors);
        invalidItem(selectCommittee, 'Selectati un profesor', setInvalidMsgCommittee);
        return isValid;
    };

    return (
        <div style={!visible ? {display: "none"} : {}}>
            <Form noValidate onSubmit={e => {
                e.preventDefault();
                validation();
            }}>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <Card>
                                <CardHeader title={'Școala doctorală'} isBorderBottom={true}/>
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Select
                                                    name={'school'}
                                                    onChange={e => changeSchool(Number(e.target.value))}
                                                    value={school.id}
                                                    onSelect={console.log}
                                                    listOption={schools}
                                                    keyMapOption={(item) => item.id}
                                                    valueMapOption={(item) => item.name}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className={classes.tabContainer}>
                                <Tabs defaultActiveKey={0} justify={true}>
                                    <Tab
                                        eventKey={0}
                                        title={'Specialitatea'}
                                        tabClassName={classes.leftTab}>
                                        <EntityListForm
                                            placeholder={'Cautarea specialitatii'}
                                            label={'Specialitati selectate:'}
                                            items={specialities}
                                            selectItems={selectSpecialities}
                                            setSelectItems={setSelectSpecialities}
                                            getKey={item => item.id}
                                            getValue={item => item.id + ' ' + item.name}
                                            equal={(item1, item2) => item1.id === item2.id}
                                            maxSelectItems={MAX_SELECT_SPECIALITIES}
                                            invalidMessage={invalidMsgSpecialities}
                                            isValid={submitFormStatus && !invalidMsgSpecialities}/>
                                    </Tab>
                                    <Tab
                                        eventKey={1}
                                        title={'Conducator'}
                                        tabClassName={classes.centerTab}>
                                        <EntityListForm
                                            placeholder={'Cautarea profesorului'}
                                            label={'Profesori selectati'}
                                            items={filteredSupervisors}
                                            selectItems={selectSupervisors}
                                            setSelectItems={setSelectSupervisors}
                                            getKey={item => item.id}
                                            getValue={item => item.firstName + ' ' + item.lastName}
                                            equal={(item1, item2) => item1.id === item2.id}
                                            maxSelectItems={MAX_SELECT_SUPERVISORS}
                                            invalidMessage={invalidMsgSupervisors}
                                            isValid={submitFormStatus && !invalidMsgSupervisors}/>
                                    </Tab>
                                    <Tab
                                        eventKey={2}
                                        title={'Comisia'}
                                        tabClassName={classes.rightTab}>
                                        <EntityListForm
                                            placeholder={'Cautarea profesorului'}
                                            label={'Profesori selectati'}
                                            items={filteredSupervisors}
                                            selectItems={selectCommittee}
                                            setSelectItems={setSelectCommittee}
                                            getKey={item => item.id}
                                            getValue={item => item.firstName + ' ' + item.lastName}
                                            equal={(item1, item2) => item1.id === item2.id}
                                            maxSelectItems={MAX_SELECT_COMMITTEE}
                                            invalidMessage={invalidMsgCommittee}
                                            isValid={submitFormStatus && !invalidMsgCommittee}/>
                                    </Tab>
                                </Tabs>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default ScienceSchoolForm;