import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
    id: yup.number(),
    firstName: yup.string().required("is empty"),
    lastName: yup.string().required("is empty"),
    post: yup.string().required("is empty"),
    speciality: yup.string().required("is empty"),
});
const SupervisorForm = ({supervisor, setSupervisor, getSchools}) => {


    const [newSupervisor, setNewSupervisor] = useState({...supervisor});

    const [scienceSchoolId, setScienceSchoolId] =
        useState(supervisor ? supervisor.scienceSchoolId : 1);

    const [schools, setSchools] = useState([])

    useEffect(() => {
        getSchools().then(schoolsList => {
            setSchools(schoolsList.map(
                school => {return {id: school.id, value: school.name}}))
        })
        setSchools([
            {id: 1, value: "school 1"},
            {id: 2, value: "school 2"},
            {id: 3, value: "school 3"},
        ])
    }, [])
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                id: supervisor ? supervisor.id : null,
                firstName: supervisor ? supervisor.firstName : '',
                lastName: supervisor ? supervisor.lastName : '',
                post: supervisor ? supervisor.post : '',
                speciality: supervisor ? supervisor.speciality : '',
                academician: supervisor ? supervisor.academician : '',
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
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
                                                      {school.value}
                                                  </option>})
                                              }
                                          </Form.Select>
                                      </Form.Group>
                                  </Col>
                              </Row>
                          </Card.Body>
                      </Card>
                      <br/>
                      <Button type="submit" name={"submitBtn"}>Submit form</Button>
                  </Form>
            )}
        </Formik>
    );
};

export default SupervisorForm;