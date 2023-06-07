import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import {Formik} from "formik";
import React, {useEffect, useMemo, useState} from "react";
import {Card, Container, InputGroup} from "react-bootstrap";
import ScrollList from "../../scrolllist/ScrollList";
import FilterBox from "../../filterbox/FilterBox";
import DateSelect from "../../dateselect/DateSelect";
import OrderCardForm from "./OrderCardForm";
import Student from "../../domains/Student";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import Supervisor from "../../domains/Supervisor";

const schema = yup.object().shape({
    firstName: yup.string().required('Introduceți numele'),
    lastName: yup.string().required("Introduceți prenume"),
    patronymicName: yup.string().required("Introduceți patronimic"),
    gender: yup.string(),
    identNumber: yup.string().required('Introduceți IDNP'),
    yearBirth: yup.string().required(),
    citizenship: yup.string().required(),
    personalEmail: yup.string().email('Email este incorect').required('Introduceți email'),
    phoneNumber: yup.string().required('Introduceți numarul de telefon'),
    diplomaSeries: yup.string()
        .matches(/^(ALII|AMP)\d{11}$/, ({value}) => 'Seria incorecta')
        .required('Introduceți seria'),
    diplomaNumber: yup.string()
        .matches(/^\d{11}$/, ({value}) => 'Numar incorect')
        .required('Introduceți numar'),
    registration: yup.string(),
    studyType: yup.string(),
    financing: yup.string(),
    yearStudy: yup.string(),
    scienceTopic: yup.string().required('Introduceți tema de cercetare'),
});

const StudentForm = ({
                         student, setStudent, countries, orderTypes,
                         schools, specialities, getSpecialities, supervisors, getSupervisors
                     }) => {

    const MAX_SELECTED_SPECIALITIES = 1;

    const MAX_SELECTED_SUPERVISORS = 2;

    const MAX_STEERING_COMMITTEE = 3;

    const MIN_SIZE_AREA = 3;

    const SIZE_SCROLL_LIST = "15em";

    const SIZE_SELECT_SCROLL_LIST = "8em";

    const years = Array.from(new Array(50),
        (val, index) => ((new Date()).getFullYear()) - 15 - index);

    const [sortedSpecialityValue, setSortedSpecialityValue] = useState('');

    const [sortedSupervisorValue, setSortedSupervisorValue] = useState('');

    const [sortedSteeringCommitteeValue, setSortedSteeringCommitteeValue] = useState('');

    const [selectedSpecialities, setSelectedSpecialities] = useState([]);

    const [selectedSupervisors, setSelectedSupervisors] = useState([]);

    const [selectedSteeringCommittee, setSelectedSteeringCommittee] = useState([]);

    const [sizeArea, setSizeArea] = useState(MIN_SIZE_AREA);

    const [beginDate, setBeginDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [schoolId, setSchoolId] = useState(0);


    useEffect(() => {
        if (student) {
            setBeginDate(student.beginStudies);
            setEndDate(student.endStudies);
            setSchoolId(student.speciality.scienceSchoolId);
            setSpecialitiesAndSupervisors(student.speciality.scienceSchoolId);
        }
    }, [student])

    useEffect(() => {
        if (student && specialities && !selectedSpecialities.length) {
            transferSpeciality(student.speciality.id);
        }
    }, [student, specialities])

    useEffect(() => {
        if (student && supervisors) {
            if (!selectedSupervisors.length) {
                transferSupervisor(student.supervisor.id);
            }
            if (!selectedSteeringCommittee.length) {
                student.steeringCommittee.forEach(supervisor =>
                    transferSteeringCommittee(supervisor.id));
            }
        }
    }, [student, supervisors])

    const setSpecialitiesAndSupervisors = (id) => {
        if (id !== 0 && schoolId !== id) {
            getSpecialities(id);
            getSupervisors(id);
            setSchoolId(id);
            setSelectedSpecialities([]);
            setSelectedSupervisors([]);
            setSelectedSteeringCommittee([]);
        } else if (id === 0) {
            setSchoolId(0)
        }
    }

    const sortedSpecialities = useMemo(() => {
            if (specialities) {
                if (schoolId === 0) return [];

                return specialities
                    .filter(item => item.value.toLowerCase()
                        .includes(sortedSpecialityValue.toLowerCase()))
                    .filter(item => !selectedSpecialities.includes(item));
            }
        },
        [selectedSpecialities, schoolId, sortedSpecialityValue, specialities])

    const sortedSupervisors = useMemo(() => {
            if (supervisors) {
                if (schoolId === 0) return [];
                return supervisors
                    .filter(item => item.value.toLowerCase()
                        .includes(sortedSupervisorValue.toLowerCase()))
                    .filter(item => !selectedSupervisors.includes(item) &&
                        !selectedSteeringCommittee.includes(item));
            }
        },
        [selectedSupervisors, selectedSteeringCommittee, schoolId, sortedSupervisorValue, supervisors])

    const sortedSteeringCommittee = useMemo(() => {
            if (supervisors) {
                if (schoolId === 0) return [];
                return supervisors
                    .filter(item => item.value.toLowerCase()
                        .includes(sortedSteeringCommitteeValue.toLowerCase()))
                    .filter(item => !selectedSupervisors.includes(item) &&
                        !selectedSteeringCommittee.includes(item));
            }
        },
        [selectedSupervisors, selectedSteeringCommittee, schoolId, sortedSteeringCommitteeValue, supervisors])

    const transferSpeciality = (itemId) => {
        itemId = Number(itemId)
        if (selectedSpecialities.length < MAX_SELECTED_SPECIALITIES) {
            setSelectedSpecialities(items => items
                .concat(specialities.filter(item => item.id === itemId)));
        }
    }

    const transferSupervisor = (itemId) => {
        itemId = Number(itemId)
        if (selectedSupervisors.length < MAX_SELECTED_SUPERVISORS) {
            setSelectedSupervisors(items => items
                .concat(supervisors.filter(item => item.id === itemId)));
        }
    }

    const transferSteeringCommittee = (itemId) => {
        itemId = Number(itemId)
        if (selectedSteeringCommittee.length < MAX_STEERING_COMMITTEE) {
            setSelectedSteeringCommittee(items => items
                .concat(supervisors.filter(item => item.id === itemId)));
        }
    }
    const removeSpeciality = (itemId) => {
        itemId = Number(itemId)
        setSelectedSpecialities(selectedSpecialities.filter(item => item.id !== itemId));
    }

    const removeSupervisor = (itemId) => {
        itemId = Number(itemId)
        setSelectedSupervisors(selectedSupervisors.filter(item => item.id !== itemId));
    }

    const removeSteeringCommittee = (itemId) => {
        itemId = Number(itemId);
        setSelectedSteeringCommittee(selectedSteeringCommittee.filter(item => item.id !== itemId))
    }

    const resizeArea = (value) => {
        let size = 0;
        let position = 0;
        while (true) {
            if ((position = value.indexOf('\n', position)) !== -1) {
                position += 1;
                size += 1;
                continue;
            }
            break;
        }
        size += 1;
        if (MIN_SIZE_AREA > size) {
            setSizeArea(MIN_SIZE_AREA)
        } else {
            setSizeArea(size);
        }
    }

    const save = (e) => {
        const speciality = Student.Speciality.fromObject({id: selectedSpecialities[0].id});
        const supervisor = Supervisor.fromObject({id: selectedSupervisors[0].id})
        const steeringCommittee = selectedSteeringCommittee
            .map(item => Supervisor.fromObject({id: item.id}));

        const student = Student.toServer(
            {
                ...e,
                beginStudies: beginDate,
                endDate: endDate,
                speciality: speciality,
                supervisor: supervisor,
                steeringCommittee: steeringCommittee,
            });
        console.log(student)
    }

    if (student) {
        return (
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={schema}
                onSubmit={save}
                initialValues={{
                    firstName: student.firstName,
                    lastName: student.lastName,
                    patronymicName: student.patronymicName,
                    gender: student.gender,
                    identNumber: student.identNumber,
                    yearBirth: student.yearBirth,
                    citizenship: student.citizenship.id,
                    personalEmail: student.personalEmail,
                    phoneNumber: student.phoneNumber,
                    diplomaSeries: student.diplomaSeries,
                    diplomaNumber: student.diplomaNumber,
                    registration: student.registration,
                    studyType: student.studyType,
                    financing: student.financing,
                    yearStudy: student.yearStudy,
                    scienceTopic: student.scienceTopic,
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors,
                  }) => (
                    <Form noValidate onSubmit={e => {
                        if (e.nativeEvent.submitter.name !== "submitBtn") {
                            e.preventDefault();
                        } else {
                            handleSubmit(e);
                        }
                    }}>
                        <Container>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Header style={{borderBottom: "none"}}>
                                            <Card.Title><h1>Inregistratea studentului</h1></Card.Title>
                                        </Card.Header>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card style={{height: "100%"}}>
                                        <Card.Header>
                                            <Card.Title>Date personale</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formFirstName">
                                                            <Form.Label>Numele</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="firstName"
                                                                value={values.firstName}
                                                                onChange={handleChange}
                                                                isValid={touched.firstName && !errors.firstName}
                                                                isInvalid={!!errors.firstName}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.firstName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formLastName">
                                                            <Form.Label>Prenumele</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="lastName"
                                                                value={values.lastName}
                                                                onChange={handleChange}
                                                                isValid={touched.lastName && !errors.lastName}
                                                                isInvalid={!!errors.lastName}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.lastName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formPatronymicName">
                                                            <Form.Label>Patronimic</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="patronymicName"
                                                                value={values.patronymicName}
                                                                onChange={handleChange}
                                                                isValid={touched.patronymicName && !errors.patronymicName}
                                                                isInvalid={!!errors.patronymicName}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.patronymicName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formGender"}>
                                                            <Form.Label>Gen</Form.Label>
                                                            <Form.Select
                                                                aria-label="gender"
                                                                name={"gender"}
                                                                value={values.gender}
                                                                onChange={handleChange}
                                                                isValid={touched.gender && !errors.gender}
                                                                isInvalid={!!errors.gender}
                                                            >
                                                                {Student.getConstants()
                                                                    .GENDER.map(type => {
                                                                        return <option key={type.id}
                                                                                       value={type.id}>{type.value}</option>
                                                                    })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formIdentNumber">
                                                            <Form.Label>IDNP</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="identNumber"
                                                                value={values.identNumber}
                                                                onChange={handleChange}
                                                                isValid={touched.identNumber && !errors.identNumber}
                                                                isInvalid={!!errors.identNumber}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.identNumber}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formDateBirth"}>
                                                            <Form.Label>Anul nașterii</Form.Label>
                                                            <Form.Select
                                                                aria-label="yearBirth"
                                                                name={"yearBirth"}
                                                                value={values.yearBirth}
                                                                onChange={handleChange}
                                                                isValid={touched.yearBirth && !errors.yearBirth}
                                                            >
                                                                {
                                                                    years.map((year, index) => {
                                                                        return <option key={index}
                                                                                       value={year}>{year}</option>
                                                                    })
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formCitizenship"}>
                                                            <Form.Label>Cetățenia</Form.Label>
                                                            <Form.Select
                                                                aria-label="citizenship"
                                                                name={"citizenship"}
                                                                value={values.citizenship}
                                                                onChange={handleChange}
                                                                isValid={touched.citizenship && !errors.citizenship}
                                                            >
                                                                {countries ?
                                                                    countries.map((country, index) => {
                                                                        return <option key={index} value={country.id}>
                                                                            {country.country}
                                                                        </option>
                                                                    }) :
                                                                    <option/>
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md={"4"} controlId={"formPersonalEmail"}>
                                                            <Form.Label>E-mail</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text>✉️</InputGroup.Text>
                                                                <Form.Control
                                                                    type="email"
                                                                    name={"personalEmail"}
                                                                    value={values.personalEmail}
                                                                    onChange={handleChange}
                                                                    isValid={touched.personalEmail && !errors.personalEmail}
                                                                    isInvalid={!!errors.personalEmail}
                                                                />
                                                                <Form.Control.Feedback type={"invalid"}>
                                                                    {errors.personalEmail}
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md={"4"} controlId={"formPersonalPhone"}>
                                                            <Form.Label>Telefon</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text>📞</InputGroup.Text>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={"phoneNumber"}
                                                                    value={values.phoneNumber}
                                                                    onChange={handleChange}
                                                                    isValid={touched.phoneNumber && !errors.phoneNumber}
                                                                    isInvalid={!!errors.phoneNumber}
                                                                />
                                                                <Form.Control.Feedback type={"invalid"}>
                                                                    {errors.phoneNumber}
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{height: "100%"}}>
                                        <Card.Header>
                                            <Card.Title>Inmatriculare</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row className="mb-3">
                                                    <Card.Subtitle>Diploma la înmatriculare</Card.Subtitle>
                                                </Row>
                                                <hr/>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formDiplomaSeries">
                                                            <Form.Label>Seria numar</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name={"diplomaSeries"}
                                                                placeholder={"ALII/AMP00000000000"}
                                                                value={values.diplomaSeries}
                                                                onChange={handleChange}
                                                                isValid={touched.diplomaSeries && !errors.diplomaSeries}
                                                                isInvalid={!!errors.diplomaSeries}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.diplomaSeries}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId="formDiplomaNumber">
                                                            <Form.Label>Numar de inregistrare</Form.Label>
                                                            <Form.Control
                                                                type={"text"}
                                                                name={"diplomaNumber"}
                                                                placeholder={"00000000000"}
                                                                value={values.diplomaNumber}
                                                                onChange={handleChange}
                                                                isValid={touched.diplomaNumber && !errors.diplomaNumber}
                                                                isInvalid={!!errors.diplomaNumber}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.diplomaNumber}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formRegistration"}>
                                                            <Form.Label>Tip inamatriculare</Form.Label>
                                                            <Form.Select
                                                                name={"registration"}
                                                                value={values.registration}
                                                                onChange={handleChange}
                                                                isValid={touched.registration && !errors.registration}
                                                            >
                                                                {Student.getConstants()
                                                                    .REGISTRATION.map(type => {
                                                                        return <option key={type.id}
                                                                                       value={type.id}>{type.value}</option>
                                                                    })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formStudyType"}>
                                                            <Form.Label>Studii</Form.Label>
                                                            <Form.Select
                                                                name={"studyType"}
                                                                value={values.studyType}
                                                                onChange={handleChange}
                                                                isValid={touched.studyType && !errors.studyType}
                                                            >
                                                                {Student.getConstants()
                                                                    .STUDY_TYPE.map(type => {
                                                                        return <option key={type.id}
                                                                                       value={type.id}>{type.value}</option>
                                                                    })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formFinancing"}>
                                                            <Form.Label>Finanțare</Form.Label>
                                                            <Form.Select
                                                                name={"financing"}
                                                                value={values.financing}
                                                                onChange={handleChange}
                                                                isValid={touched.financing && !errors.financing}
                                                            >
                                                                {Student.getConstants()
                                                                    .FINANCING.map(type => {
                                                                        return <option key={type.id}
                                                                                       value={type.id}>{type.value}</option>
                                                                    })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formYearStudy"}>
                                                            <Form.Label>Anul de studii</Form.Label>
                                                            <Form.Select
                                                                name={"study"}
                                                                value={values.yearStudy}
                                                                onChange={handleChange}
                                                                isValid={touched.yearStudy && !errors.yearStudy}
                                                            >
                                                                {Student.getConstants()
                                                                    .YEAR_STUDY.map(type => {
                                                                        return <option key={type.id}
                                                                                       value={type.id}>{type.value}</option>
                                                                    })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Inceputul studiilor</Form.Label>
                                                            <DateSelect
                                                                setDate={setBeginDate}
                                                                maxAge={new Date().getFullYear() + 2}
                                                                defaultDate={beginDate}
                                                                count={8}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Finalizarea studiilor</Form.Label>
                                                            <DateSelect
                                                                setDate={setEndDate}
                                                                maxAge={(new Date()).getFullYear() + 5}
                                                                defaultDate={endDate}
                                                                count={10}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <OrderCardForm
                                        orderTypes={orderTypes}
                                        student={student}
                                        setStudent={setStudent}/>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Școala doctorală</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formSchool"}>
                                                            <Form.Select
                                                                name={"school"}
                                                                // onChange={handleChange}
                                                                value={schoolId}
                                                                onChange={e =>
                                                                    setSpecialitiesAndSupervisors(Number(e.target.value))}
                                                                // isValid={touched.school && !errors.school}
                                                            >
                                                                {schoolId === 0 ?
                                                                    <option value={0} key={0}></option> : <></>}
                                                                {schools ?
                                                                    schools.map(school => {
                                                                        return <option value={school.id}
                                                                                       key={school.id}>
                                                                            {school.name}
                                                                        </option>
                                                                    }) :
                                                                    <option/>
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Specialitatea</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <FilterBox
                                                        onChange={setSortedSpecialityValue}
                                                        placeholder={"Cautarea specialitatii"}
                                                    />
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <Col>
                                                    <ScrollList
                                                        items={sortedSpecialities}
                                                        height={SIZE_SCROLL_LIST}
                                                        onChange={e => transferSpeciality(e.target.id)}
                                                    />
                                                </Col>
                                            </Row>
                                            <br/>
                                            <hr/>
                                            <Row>
                                                <Col>
                                                    <Form.Group md="4" controlId={"formSpeciality"}>
                                                        <Form.Control
                                                            name={"speciality"}
                                                            value={values.speciality}
                                                            onChange={handleChange}
                                                            isValid={touched.speciality && !errors.speciality}
                                                            isInvalid={!!errors.speciality}
                                                            hidden={true}
                                                        />
                                                        <Form.Label>Specialitati selectate:</Form.Label>
                                                        <ScrollList
                                                            items={selectedSpecialities}
                                                            height={SIZE_SELECT_SCROLL_LIST}
                                                            onChange={e => removeSpeciality(e.target.id)}
                                                        />
                                                        <Form.Control.Feedback type={"invalid"}>
                                                            {errors.speciality}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Conducător de doctorat</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <FilterBox
                                                        onChange={setSortedSupervisorValue}
                                                        placeholder={"Cautarea persoanei"}
                                                    />
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <Col>
                                                    <ScrollList
                                                        items={sortedSupervisors}
                                                        height={SIZE_SCROLL_LIST}
                                                        onChange={e => transferSupervisor(e.target.id)}
                                                    />
                                                </Col>
                                            </Row>
                                            <br/>
                                            <hr/>
                                            <Row>
                                                <Col>
                                                    <Form.Group md="4" controlId={"formSupervisors"}>
                                                        <Form.Label>Persoane selectate:</Form.Label>
                                                        <Form.Control
                                                            name={"supervisors"}
                                                            value={values.supervisors}
                                                            onChange={handleChange}
                                                            isValid={touched.supervisors && !errors.supervisors}
                                                            isInvalid={!!errors.supervisors}
                                                            hidden={true}
                                                        />
                                                        <ScrollList
                                                            items={selectedSupervisors}
                                                            height={SIZE_SELECT_SCROLL_LIST}
                                                            onChange={e => removeSupervisor(e.target.id)}
                                                        />
                                                        <Form.Control.Feedback type={"invalid"}>
                                                            {errors.supervisors}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Membrii comisiei de îndrumare</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <FilterBox
                                                        onChange={setSortedSteeringCommitteeValue}
                                                        placeholder={"Cautarea persoanei"}
                                                    />
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <Col>
                                                    <ScrollList
                                                        items={sortedSteeringCommittee}
                                                        height={SIZE_SCROLL_LIST}
                                                        onChange={e => transferSteeringCommittee(e.target.id)}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Group md="4" controlId={"formSteeringCommittee"}>
                                                        <Form.Control
                                                            name={"steeringCommittee"}
                                                            value={values.steeringCommittee}
                                                            onChange={handleChange}
                                                            isValid={touched.steeringCommittee && !errors.steeringCommittee}
                                                            isInvalid={!!errors.steeringCommittee}
                                                            hidden={true}
                                                        />
                                                        <ScrollList
                                                            items={selectedSteeringCommittee}
                                                            height={SIZE_SCROLL_LIST}
                                                            onChange={e => removeSteeringCommittee(e.target.id)}
                                                        />
                                                        <Form.Control.Feedback type={"invalid"}>
                                                            {errors.steeringCommittee}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Tema de cercetare</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <Form.Group md="4" controlId={"formSearchTopic"}>
                                                        <Form.Control
                                                            name={"scienceTopic"}
                                                            value={values.scienceTopic}
                                                            onChange={e => {
                                                                resizeArea(e.target.value);
                                                                handleChange(e);
                                                            }}
                                                            isValid={touched.scienceTopic && !errors.scienceTopic}
                                                            isInvalid={!!errors.scienceTopic}
                                                            as={"textarea"}
                                                            rows={sizeArea}
                                                        />
                                                        <Form.Control.Feedback type={"invalid"}>
                                                            {errors.scienceTopic}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className={"mb-3"}>
                                <Col>
                                    <Button type="submit" name={"submitBtn"}>Submit form</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                )}
            </Formik>
        );
    } else {
        return <LoadingSpinner/>
    }
}

export default StudentForm;