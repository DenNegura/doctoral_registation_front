import React, {useEffect, useRef, useState} from 'react';
import * as yup from "yup";
import Student from "../../domains/Student";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Card, Container, Image} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Formik} from "formik";
import Images from "../../../../../resources/settings/Images";
import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import InputBox from "../components/fields/InputBox";
import CardHeader from "../components/cardheader/CardHeader";
import Server from "../../../server/Server";
import Country from "../../domains/Country";

const schema = yup.object().shape({
    firstName: yup.string().required('Introduceți numele'),
    lastName: yup.string().required("Introduceți prenume"),
    patronymicName: yup.string().required("Introduceți patronimic"),
    gender: yup.string(),
    identNumber: yup.string().required('Introduceți IDNP'),
    yearBirth: yup.string(),
    citizenship: yup.string().required(),
    personalEmail: yup.string().email('Email este incorect').required('Introduceți email'),
    phoneNumber: yup.number().required('Introduceți numarul de telefon'),
});

const PersonalDataForm = ({visible, student, setStudent, autoValidate, setStatus}) => {

    const [countries, setCountries] = useState([]);

    const form = useRef();

    useEffect(() => {
        if (autoValidate) {
            validation(form.current.values);
            form.current.handleSubmit();
        }
    }, [autoValidate])

    useEffect(() => {
        if (visible && countries.length === 0) {
            Server.get(Server.GET_ALL.COUNTRIES, setCountries)
                .map(Country.fromObject).build();
        }
    }, [countries.length, visible])

    const years = Array.from(new Array(50),
        (val, index) => ((new Date()).getFullYear()) - 15 - index);

    const save = (values) => {
        const selectCountryId = Number(values.citizenship)
        const country = countries.filter(country => country.id === selectCountryId)[0];
        setStudent(student => Student.fromObject({...student, ...values, citizenship: country}));
    }

    const validation = (values) => {
        if (!isValidForm(values)) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }
    const isValidForm = values => {
        try {
            schema.validateSync(values, {abortEarly: false});
            return true;
        } catch (err) {
            return false;
        }
    };

    return (
        <div style={!visible ? {display: "none"} : {}}>
            <Formik
                innerRef={form}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={schema}
                onSubmit={save}
                initialValues={{
                    firstName: student.firstName,
                    lastName: student.lastName,
                    patronymicName: student.patronymicName,
                    gender: student.gender ? student.gender : Student.getConstants().GENDER[0].id,
                    identNumber: student.identNumber,
                    yearBirth: student.yearBirth ? student.yearBirth : (new Date()).getFullYear(),
                    citizenship: student.citizenship ? student.citizenship.id: {id: 1},
                    personalEmail: student.personalEmail,
                    phoneNumber: student.phoneNumber,
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                  }) => (
                    <Form noValidate onSubmit={e => {
                        e.preventDefault();
                        validation(values);
                        handleSubmit();
                    }}>
                        <Container>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <CardHeader title={'Date personale'}/>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card style={{height: "100%"}}>
                                        <Card.Body>
                                            <Container>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Input
                                                            label={'Numele'}
                                                            name={'firstName'}
                                                            onChange={handleChange}
                                                            value={values.firstName}
                                                            touched={touched.firstName}
                                                            errors={errors.firstName}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Input
                                                            label={'Prenumele'}
                                                            name={'lastName'}
                                                            onChange={handleChange}
                                                            value={values.lastName}
                                                            touched={touched.lastName}
                                                            errors={errors.lastName}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Input
                                                            label={'Patronimic'}
                                                            name={'patronymicName'}
                                                            onChange={handleChange}
                                                            value={values.patronymicName}
                                                            touched={touched.patronymicName}
                                                            errors={errors.patronymicName}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Select
                                                            label={'Gen'}
                                                            name={'gender'}
                                                            onChange={handleChange}
                                                            value={values.gender}
                                                            touched={touched.gender}
                                                            errors={errors.gender}
                                                            listOption={Student.getConstants().GENDER}
                                                            keyMapOption={(item) => item.id}
                                                            valueMapOption={(item) => item.value}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Select
                                                            label={'Anul nașterii'}
                                                            name={'yearBirth'}
                                                            value={values.yearBirth}
                                                            onChange={handleChange}
                                                            touched={touched.yearBirth}
                                                            errors={errors.yearBirth}
                                                            listOption={years}
                                                            keyMapOption={(year) => year}
                                                            valueMapOption={(year) => year}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{height: "100%"}}>
                                        <Card.Body>
                                            <Container>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Input
                                                            label={'IDNP'}
                                                            name={'identNumber'}
                                                            onChange={handleChange}
                                                            value={values.identNumber}
                                                            touched={touched.identNumber}
                                                            errors={errors.identNumber}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Select
                                                            label={'Cetățenia'}
                                                            name={'citizenship'}
                                                            value={values.citizenship}
                                                            onChange={handleChange}
                                                            touched={touched.citizenship}
                                                            errors={errors.citizenship}
                                                            listOption={countries}
                                                            keyMapOption={(country) => country.id}
                                                            valueMapOption={(country) => country.country}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <InputBox
                                                            label={'E-mail'}
                                                            name={'personalEmail'}
                                                            value={values.personalEmail}
                                                            onChange={handleChange}
                                                            touched={touched.personalEmail}
                                                            errors={errors.personalEmail}
                                                            children={[<Image src={Images.EMAIL} alt={'e-mail'}
                                                                              width={20}/>]}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <InputBox
                                                            label={'Telefon'}
                                                            name={'phoneNumber'}
                                                            type={'number'}
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            touched={touched.phoneNumber}
                                                            errors={errors.phoneNumber}
                                                            children={[<Image src={Images.PHONE} alt={'phone'}
                                                                              width={20}/>]}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PersonalDataForm;