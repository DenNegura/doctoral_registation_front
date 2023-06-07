import React, {useState} from 'react';
import * as yup from "yup";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Supervisor from "../../domains/Supervisor";

const schema = yup.object().shape({
    firstName: yup.string().required("Introduceți numele"),
    lastName: yup.string().required("Introduceți prenumele"),
    post: yup.string().required("Introduceți post"),
    speciality: yup.string().required("Introduceți specialitatea"),
});
const SupervisorForm = ({supervisor, setSupervisor, schools}) => {

    const [scienceSchoolId, setScienceSchoolId] =
        useState(supervisor ? supervisor.scienceSchoolId : 1);

    const id = supervisor ? supervisor.id : null;

    const submitSupervisor = (e) => {
        let supervisor = Supervisor.fromObject(e);
        supervisor.id = id;
        supervisor.scienceSchoolId = scienceSchoolId;
        setSupervisor(supervisor);
    }

    return (
        <Formik
            onSubmit={submitSupervisor}
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
                firstName: supervisor ? supervisor.firstName : '',
                lastName: supervisor ? supervisor.lastName : '',
                post: supervisor ? supervisor.post : '',
                speciality: supervisor ? supervisor.speciality : '',
                academician: supervisor ? supervisor.academician : '',
            }}>
            {({
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  values,
                  touched,
                  isValid,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Date personale</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className={"mb-3"}>
                                <Col>
                                    <Form.Group md={"4"} controlId={"formFirstName"}>
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
                            <Row className={"mb-3"}>
                                <Col>
                                    <Form.Group md={"4"} controlId={"formLastName"}>
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
                            <Row className={"mb-3"}>
                                <Col>
                                    <Form.Group md={"4"} controlId={"formPostName"}>
                                        <Form.Label>Post</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="post"
                                            value={values.post}
                                            onChange={handleChange}
                                            isValid={touched.post && !errors.post}
                                            isInvalid={!!errors.post}
                                        />
                                        <Form.Control.Feedback type={"invalid"}>
                                            {errors.post}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={"mb-3"}>
                                <Col>
                                    <Form.Group md={"4"} controlId={"formSpecialityName"}>
                                        <Form.Label>Specialitatea</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="speciality"
                                            value={values.speciality}
                                            onChange={handleChange}
                                            isValid={touched.speciality && !errors.speciality}
                                            isInvalid={!!errors.speciality}
                                        />
                                        <Form.Control.Feedback type={"invalid"}>
                                            {errors.speciality}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={"mb-3"}>
                                <Col>
                                    <Form.Group md="4" controlId={"formSchool"}>
                                        <Form.Label>Scoala doctorala</Form.Label>
                                        <Form.Select
                                            name="school"
                                            value={scienceSchoolId}
                                            onChange={e => setScienceSchoolId(e.target.value)}
                                        >
                                            {
                                                schools.map(school => {
                                                    return <option value={school.id} key={school.id}>
                                                        {school.name}
                                                    </option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={"mb-3"}>
                                <Col>
                                    <br/>
                                    <Button type="submit" name={"submitBtn"}>Confirma</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default SupervisorForm;