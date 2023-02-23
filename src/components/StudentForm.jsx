import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import {Formik} from "formik";
import React, {useMemo, useState} from "react";
import {Card, InputGroup} from "react-bootstrap";
import * as tools from './utils/FormTools';
import ScrollList from "./ScrollList/ScrollList";
import ItemFilter from "./ItemFilter";


const schema = yup.object().shape({
    firstName: yup.string().required("is empty"),
    lastName: yup.string().required("is empty"),
    patronymicName: yup.string().required("is empty"),
    gender: yup.string().required(),
    identNumber: yup.string(),
    yearBirth: yup.string().required(),
    citizenship: yup.string().required(),
    personalEmail: yup.string().required(),
    personalPhone: yup.string().required(),
    diplomaSeries: yup.string(),
    diplomaNumber: yup.string(),
    orderNumber: yup.string(),
    orderDateYear: yup.string(),
    orderDateMonth: yup.string(),
    orderDateDay: yup.string(),
    registration: yup.string(),
    studyType: yup.string(),
    financing: yup.string(),
    orderType: yup.number(),
    orderSubtype: yup.number(),
    speciality: yup.array(),
    supervisors: yup.array(),
});

const StudentForm = ({countries, orders, schools, specialities, supervisors}) => {

    const maxSelectedSpecialities = 1;

    const maxSelectedSupervisors = 2;

    const years = tools.yearList(50, 15);

    const orderYears = tools.yearList(5);

    const [order, setOrder] = useState(orders.at(0));

    const setSubtypeOrder = (event) => {
        setOrder(orders.filter(order => order.id.toString() === event.target.value).at(0));
    }

    const [schoolId, setSchoolId] = useState('0');

    const setSpecialitiesAndSupervisors = (event) => {
        let id = event.target.value;
        if (id !== '0' && schoolId !== id) {
            specialities.get(id);
            supervisors.get(id);
            setSchoolId(id);
        } else if (id === '0') {
            setSchoolId('0')
        }
    }

    const [sortedSpecialityValue, setSortedSpecialityValue] = useState('');

    const [sortedSupervisorValue, setSortedSupervisorValue] = useState('');

    const [selectedSpecialities, setSelectedSpecialities] = useState([]);

    const [selectedSupervisors, setSelectedSupervisors] = useState([]);

    const sortedSpecialities = useMemo(() => {
            if (schoolId === '0') return [];
            return specialities.items
                .filter(item => item.value.toLowerCase()
                    .includes(sortedSpecialityValue.toLowerCase()))
                .filter(item => !selectedSpecialities.includes(item));
        },
        [selectedSpecialities, schoolId, sortedSpecialityValue, specialities.items])

    const sortedSupervisors = useMemo(() => {
            if (schoolId === '0') return [];
            return supervisors.items
                .filter(item => item.value.toLowerCase()
                    .includes(sortedSupervisorValue.toLowerCase()))
                .filter(item => !selectedSupervisors.includes(item));
        },
        [selectedSupervisors, schoolId, sortedSupervisorValue, supervisors.items])

    const transferSpeciality = (itemId) => {
        itemId = Number(itemId)
        if (selectedSpecialities.length < maxSelectedSpecialities) {
            setSelectedSpecialities(selectedSpecialities
                .concat(specialities.items.filter(item => item.id === itemId)));
        }
    }

    const transferSupervisor = (itemId) => {
        itemId = Number(itemId)
        if (selectedSupervisors.length < maxSelectedSupervisors) {
            setSelectedSupervisors(selectedSupervisors
                .concat(supervisors.items.filter(item => item.id === itemId)));
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


    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                firstName: 'Denis',
                lastName: 'Negura',
                patronymicName: 'Aleksander',
                gender: 'M',
                identNumber: '',
                yearBirth: years.at(0).toString(),
                citizenship: countries.at(0).id.toString(),
                personalEmail: 'denis.negura@gmail.com',
                personalPhone: '068618833',
                diplomaSeries: '',
                diplomaNumber: '',
                orderNumber: '',
                orderDateYear: (new Date()).getFullYear().toString(),
                orderDateMonth: (new Date()).getMonth() + 1 + '',
                orderDateDay: (new Date()).getDate().toString(),
                registration: 'ENROLLED',
                studyType: 'FREQUENCY',
                financing: 'BUDGET',
                orderType: '1',
                orderSubtype: '1',
                speciality: [],
                supervisors: [],
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
                    values.speciality = selectedSpecialities;
                    values.supervisors = selectedSupervisors;
                    if (e.nativeEvent.submitter.name !== "submitBtn") {
                        e.preventDefault();
                    } else {
                        handleSubmit(e);
                    }
                }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Date personale</Card.Title>
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
                            <Row>
                                <Col>
                                    <Form.Group md="4" controlId={"formGender"}>
                                        <Form.Label>Gen</Form.Label>
                                        <Form.Select
                                            aria-label="gender"
                                            name={"gender"}
                                            value={values.gender}
                                            onChange={handleChange}
                                            isValid={touched.gender && !errors.gender}
                                        >
                                            <option value="M">Masculin</option>
                                            <option value="F">Feminin</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
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
                                                    return <option key={index} value={year}>{year}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
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
                                            {
                                                countries.map((country, index) => {
                                                    return <option key={index} value={country.id}>
                                                        {country.country}
                                                    </option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
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
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group md={"4"} controlId={"formPersonalPhone"}>
                                        <Form.Label>Telefon</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>📞</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                name={"personalPhone"}
                                                value={values.personalPhone}
                                                onChange={handleChange}
                                                isValid={touched.personalPhone && !errors.personalPhone}
                                                isInvalid={!!errors.personalPhone}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title>Inamatriculare</Card.Title>
                            <Row>
                                <Col>
                                    <Form.Label>Diploma la înmatriculare</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Group md={"4"} controlId={"formDiplomaSeries"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Seria numar</InputGroup.Text>
                                                    <Form.Control
                                                        type={"text"}
                                                        name={"diplomaSeries"}
                                                        placeholder={"ALII/AMP00000000000"}
                                                        value={values.diplomaSeries}
                                                        onChange={handleChange}
                                                        isValid={touched.diplomaSeries && !errors.diplomaSeries}
                                                        isInvalid={!!errors.diplomaSeries}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group md={"4"} controlId={"formDiplomaNumber"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Numar de inregistrare</InputGroup.Text>
                                                    <Form.Control
                                                        type={"text"}
                                                        name={"diplomaNumber"}
                                                        placeholder={"00000000000"}
                                                        value={values.diplomaNumber}
                                                        onChange={handleChange}
                                                        isValid={touched.diplomaNumber && !errors.diplomaNumber}
                                                        isInvalid={!!errors.diplomaNumber}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Group md="4" controlId={"formRegistration"}>
                                        <Form.Label>Tip inamatriculare</Form.Label>
                                        <Form.Select
                                            name={"registration"}
                                            value={values.registration}
                                            onChange={handleChange}
                                            isValid={touched.registration && !errors.registration}
                                        >
                                            <option value="ENROLLED">Inmatriculat</option>
                                            <option value="TRANSFERRED">Transferat</option>
                                            <option value="REINSTATED">Restabilit</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group md="4" controlId={"formStudyType"}>
                                        <Form.Label>Studii</Form.Label>
                                        <Form.Select
                                            name={"studyType"}
                                            value={values.studyType}
                                            onChange={handleChange}
                                            isValid={touched.studyType && !errors.studyType}
                                        >
                                            <option value="FREQUENCY">Frecvență</option>
                                            <option value="LOW_FREQUENCY">Frecvență redusă</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group md="4" controlId={"formFinancing"}>
                                        <Form.Label>Finanțare</Form.Label>
                                        <Form.Select
                                            name={"financing"}
                                            value={values.financing}
                                            onChange={handleChange}
                                            isValid={touched.financing && !errors.financing}
                                        >
                                            <option value="BUDGET">Budget</option>
                                            <option value="CONTRACT">Taxă</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br/>
                            <hr/>
                            <Row>
                                <Col>
                                    <Form.Label>Ordin înmatriculare</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Group md={"4"} controlId={"formOrderNumber"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Ordin numar</InputGroup.Text>
                                                    <Form.Control
                                                        type={"text"}
                                                        name={"orderNumber"}
                                                        value={values.orderNumber}
                                                        onChange={handleChange}
                                                        isValid={touched.orderNumber && !errors.orderNumber}
                                                        isInvalid={!!errors.orderNumber}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group md={"4"} controlId={"formOrderDate"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Data</InputGroup.Text>
                                                    <InputGroup.Text>An</InputGroup.Text>
                                                    <Form.Select
                                                        name={"orderDateYear"}
                                                        value={values.orderDateYear}
                                                        onChange={handleChange}
                                                        isValid={touched.orderDateYear && !errors.orderDateYear}
                                                    >
                                                        {
                                                            orderYears.map((year, index) => {
                                                                return <option key={index} value={year}>
                                                                    {year}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                    <InputGroup.Text>Luna</InputGroup.Text>
                                                    <Form.Select
                                                        name={"orderDateMonth"}
                                                        value={values.orderDateMonth}
                                                        onChange={handleChange}
                                                        isValid={touched.orderDateMonth && !errors.orderDateMonth}
                                                    >
                                                        {
                                                            tools.months.map((month, index) => {
                                                                return <option key={index + 1} value={index + 1}>
                                                                    {index + 1 + '. ' + month}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                    <InputGroup.Text>Zi</InputGroup.Text>
                                                    <Form.Select
                                                        name={"orderDateDay"}
                                                        value={values.orderDateDay}
                                                        onChange={handleChange}
                                                        isValid={touched.orderDateDay && !errors.orderDateDay}
                                                    >
                                                        {
                                                            tools.days.map(day => {
                                                                return <option key={day} value={day}>
                                                                    {day}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Form.Group md="4" controlId={"formOrderType"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Tip</InputGroup.Text>
                                                    <Form.Select
                                                        name={"orderType"}
                                                        value={values.orderType}
                                                        onChange={handleChange}
                                                        onClick={setSubtypeOrder}
                                                        isValid={touched.orderType && !errors.orderType}
                                                    >
                                                        {
                                                            orders.map(order => {
                                                                return <option key={order.id}
                                                                               value={order.id}>
                                                                    {order.order}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group md="4" controlId={"formOrderSubtype"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Subtip</InputGroup.Text>
                                                    <Form.Select
                                                        name={"orderSubtype"}
                                                        value={values.orderSubtype}
                                                        onChange={handleChange}
                                                        isValid={touched.orderSubtype && !errors.orderSubtype}
                                                    >
                                                        {
                                                            order.orderSubtypes.map(orderSubtype => {
                                                                return <option key={orderSubtype.id}
                                                                               value={orderSubtype.id}>
                                                                    {orderSubtype.order}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title>Școala doctorală</Card.Title>
                            <Row>
                                <Col>
                                    <Form.Group md="4" controlId={"formSchool"}>
                                        <Form.Select
                                            name={"school"}
                                            value={values.school}
                                            onChange={handleChange}
                                            onClick={setSpecialitiesAndSupervisors}
                                            isValid={touched.school && !errors.school}
                                        >
                                            <option value={0} key={0}></option>
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
                        </Card.Body>
                    </Card>
                    <br/>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Specialitatea</Card.Title>
                                    <Row>
                                        <Col>
                                            <ItemFilter
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
                                                height={"10em"}
                                                onChange={e => transferSpeciality(e.target.id)}
                                            />
                                            {/*<Form.Group md="4" controlId={"formSpeciality"}>*/}
                                            {/*    <Form.Select*/}
                                            {/*        name={"speciality"}*/}
                                            {/*        value={values.speciality}*/}
                                            {/*        onChange={handleChange}*/}
                                            {/*        isValid={touched.speciality && !errors.speciality}*/}
                                            {/*        disabled={isDisabled}*/}
                                            {/*    >*/}
                                            {/*        {*/}
                                            {/*            sortedSpecialities.map(item => {*/}
                                            {/*                return <option key={item.id} value={item.id}>*/}
                                            {/*                    {item.value}*/}
                                            {/*                </option>*/}
                                            {/*            })*/}
                                            {/*        }*/}
                                            {/*    </Form.Select>*/}
                                            {/*</Form.Group>*/}
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
                                                    height={"5em"}
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
                                <Card.Body>
                                    <Card.Title>Conducător de doctorat</Card.Title>
                                    <Row>
                                        <Col>
                                            <ItemFilter
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
                                                height={"10em"}
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
                                                    height={"5em"}
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
                    <br/>
                    <Button type="submit" name={"submitBtn"}>Submit form</Button>
                </Form>
            )}
        </Formik>
    );
}

// render(<FormExample />);
export default StudentForm;