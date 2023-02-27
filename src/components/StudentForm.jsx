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
import DateSelect from "./DateSelect";


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
    orderDate: yup.date(),
    beginDate: yup.date(),
    endDate: yup.date(),
    registration: yup.string(),
    studyType: yup.string(),
    financing: yup.string(),
    orderType: yup.number(),
    orderSubtype: yup.number(),
    speciality: yup.array(),
    supervisors: yup.array(),
    steeringCommittee: yup.array(),
    searchTopic: yup.string(),
});

const StudentForm = ({student, setStudent, countries, orders, schools, specialities, supervisors}) => {

    const MAX_SELECTED_SPECIALITIES = 1;

    const MAX_SELECTED_SUPERVISORS = 2;

    const MAX_STEERING_COMMITTEE = 3;

    const MIN_SIZE_AREA = 3;

    const years = Array.from(new Array(50),
        (val, index) => ((new Date()).getFullYear()) - 15 - index);

    const [sortedSpecialityValue, setSortedSpecialityValue] = useState('');

    const [sortedSupervisorValue, setSortedSupervisorValue] = useState('');

    const [sortedSteeringCommitteeValue, setSortedSteeringCommitteeValue] = useState('');

    const [selectedSpecialities, setSelectedSpecialities] = useState([]);

    const [selectedSupervisors, setSelectedSupervisors] = useState([]);

    const [selectedSteeringCommittee, setSelectedSteeringCommittee] = useState([]);

    const [sizeArea, setSizeArea] = useState(MIN_SIZE_AREA);

    const [orderDate, setOrderDate] = useState(new Date());

    const [beginDate, setBeginDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [order, setOrder] = useState(orders.at(0));

    const [schoolId, setSchoolId] = useState('0');

    const [orderErrorInput, setOrderErrorInput] = useState('')

    const [orderInput, setOrderInput] = useState(
        {number: '', date: orderDate, type: {value: ''}, subtype: {id: ''}})

    const orderValidator = (order) => {
        setOrderErrorInput('')
        if(order.number === '') {
            setOrderErrorInput('Order number not be empty')
            return false;
        } else if(order.date === '') {
            setOrderErrorInput('Order date not be empty')
            return false;
        }
        return true;
    }

    const saveOrder = () => {
        console.log(orderInput)
        orderInput.date = orderDate;
        orderInput.type = order;
        // orderInput.subtype =
        if(orderValidator(orderInput) === false) {
            return false;
        }
    }
    const setSubtypeOrder = (event) => {
        setOrder(orders.filter(order => order.id.toString() === event.target.value).at(0));
    }


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
                .filter(item => !selectedSupervisors.includes(item) &&
                    !selectedSteeringCommittee.includes(item));
        },
        [selectedSupervisors, selectedSteeringCommittee, schoolId, sortedSupervisorValue, supervisors.items])

    const sortedSteeringCommittee = useMemo(() => {
            if (schoolId === '0') return [];
            return supervisors.items
                .filter(item => item.value.toLowerCase()
                    .includes(sortedSteeringCommitteeValue.toLowerCase()))
                .filter(item => !selectedSupervisors.includes(item) &&
                    !selectedSteeringCommittee.includes(item));
        },
        [selectedSupervisors, selectedSteeringCommittee, schoolId, sortedSteeringCommitteeValue, supervisors.items])

    const transferSpeciality = (itemId) => {
        itemId = Number(itemId)
        if (selectedSpecialities.length < MAX_SELECTED_SPECIALITIES) {
            setSelectedSpecialities(selectedSpecialities
                .concat(specialities.items.filter(item => item.id === itemId)));
        }
    }

    const transferSupervisor = (itemId) => {
        itemId = Number(itemId)
        if (selectedSupervisors.length < MAX_SELECTED_SUPERVISORS) {
            setSelectedSupervisors(selectedSupervisors
                .concat(supervisors.items.filter(item => item.id === itemId)));
        }
    }

    const transferSteeringCommittee= (itemId) => {
        itemId = Number(itemId)
        if (selectedSteeringCommittee.length < MAX_STEERING_COMMITTEE) {
            setSelectedSteeringCommittee(selectedSteeringCommittee
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

    const removeSteeringCommittee = (itemId) => {
        itemId = Number(itemId);
        setSelectedSteeringCommittee(selectedSteeringCommittee.filter(item => item.id !== itemId))
    }

    const resizeArea = (value) => {
        let size = 0;
        let position = 0;
        while(true) {
            if((position = value.indexOf('\n', position)) !== -1) {
                position += 1;
                size += 1;
                continue;
            }
            break;
        }
        size += 1;
        if(MIN_SIZE_AREA > size) {
            setSizeArea(MIN_SIZE_AREA)
        } else {
            setSizeArea(size);
        }
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
                orderDate: '',
                beginDate: '',
                endDate: '',
                registration: 'ENROLLED',
                studyType: 'FREQUENCY',
                financing: 'BUDGET',
                orderType: '1',
                orderSubtype: '1',
                speciality: [],
                supervisors: [],
                steeringCommittee: [],
                searchTopic: '',
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
                    values.steeringCommittee = selectedSteeringCommittee;
                    values.orderDate = orderDate;
                    values.beginDate = beginDate;
                    values.endDate = endDate;
                    if (e.nativeEvent.submitter.name !== "submitBtn") {
                        e.preventDefault();
                    } else {
                        handleSubmit(e);
                    }
                }}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Date personale</Card.Title>
                        </Card.Header>
                        <Card.Body>
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
                        <Card.Header>
                            <Card.Title>Inamatriculare</Card.Title>
                        </Card.Header>
                        <Card.Body>
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
                                <Col>
                                    <Form.Group md="4" controlId={"formStudy"}>
                                        <Form.Label>Anul de studii</Form.Label>
                                        <Form.Select
                                            name={"study"}
                                            value={values.study}
                                            onChange={handleChange}
                                            isValid={touched.study && !errors.study}
                                        >
                                            <option value="I">Anul I</option>
                                            <option value="II">Anul II</option>
                                            <option value="III">Anul III</option>
                                            <option value="IV">Anul IV</option>
                                            <option value="EXTRA_I">Grație I-II</option>
                                            <option value="EXTRA_II">Grație II</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br/>
                            <hr/>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Inceputul studiilor</Form.Label>
                                        <DateSelect
                                            setDate={setBeginDate}
                                            maxAge={(new Date()).getFullYear() + 2}
                                            count={5}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Finalizarea studiilor</Form.Label>
                                        <DateSelect
                                            setDate={setEndDate}
                                            maxAge={(new Date()).getFullYear() + 5}
                                            count={10}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header>
                            <Card.Title>Ordin</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Group md={"4"} controlId={"formOrderNumber"}>
                                                <InputGroup>
                                                    <InputGroup.Text>Ordin numar</InputGroup.Text>
                                                    <Form.Control
                                                        type={"text"}
                                                        onChange={e => {
                                                            let order = orderInput;
                                                            order.number = e.target.value;
                                                            setOrderInput(order);
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <DateSelect
                                                setDate={setOrderDate}
                                                count={5}
                                            />
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
                                                        //name={"orderSubtype"}
                                                        //value={values.orderSubtype}
                                                        onChange={e => {
                                                            let order = orderInput;
                                                            order.subtype.id = e.target.value;
                                                            setOrderInput(order)
                                                        }}
                                                        //isValid={touched.orderSubtype && !errors.orderSubtype}
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
                            <br/>
                            <Row>
                                <Col style={{width: "100%"}}>
                                    {orderErrorInput === '' ? '' :
                                        <label style={{color: "red"}}>⚠️ {orderErrorInput}</label>}
                                </Col>
                                <Col md={"auto"}>
                                    <Row>
                                        <Col md={"auto"}>
                                            <Button
                                                variant="outline-primary"
                                                onClick={saveOrder}
                                            >Salvează ordin</Button>
                                        </Col>
                                        <Col md={"auto"}>
                                            <Button variant="outline-danger">Sterge ordin</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <ScrollList
                                        items={[]}
                                        height={"10em"}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header>
                            <Card.Title>Școala doctorală</Card.Title>
                        </Card.Header>
                        <Card.Body>
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
                                <Card.Header>
                                    <Card.Title>Specialitatea</Card.Title>
                                </Card.Header>
                                <Card.Body>
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
                                <Card.Header>
                                    <Card.Title>Conducător de doctorat</Card.Title>
                                </Card.Header>
                                <Card.Body>
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
                    <Card>
                        <Card.Header>
                            <Card.Title>Membrii comisiei de îndrumare</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <ItemFilter
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
                                        height={"10em"}
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
                                            height={"10em"}
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
                    <br/>
                    <Card>
                        <Card.Header>
                            <Card.Title>Tema de cercetare</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group md="4" controlId={"formSearchTopic"}>
                                        <Form.Control
                                            name={"searchTopic"}
                                            value={values.searchTopic}
                                            onChange={e => {
                                                resizeArea(e.target.value);
                                                handleChange(e);
                                            }}
                                            isValid={touched.searchTopic && !errors.searchTopic}
                                            isInvalid={!!errors.searchTopic}
                                            as={"textarea"}
                                            rows={sizeArea}
                                        />
                                        <Form.Control.Feedback type={"invalid"}>
                                            {errors.searchTopic}
                                        </Form.Control.Feedback>
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
}

export default StudentForm;