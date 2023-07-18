import React, {useEffect, useRef, useState} from 'react';
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {Card, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import Student from "../../domains/Student";
import * as yup from "yup";
import DateSelect from "../../dateselect/DateSelect";
import CardHeader from "../components/cardheader/CardHeader";
import InputBox from "../components/fields/InputBox";
import Images from "../../../../../resources/settings/Images";

const schema = yup.object().shape({
    diplomaSeries: yup.string()
        .matches(/^(ALII|AMP)\d{11}$/, ({value}) => 'Seria incorecta')
        .required('Introduceți seria'),
    diplomaNumber: yup.string()
        .matches(/^\d{11}$/, ({value}) => 'Numar incorect')
        .required('Introduceți numar'),
    corporateEmail:  yup.string().email('Email este incorect').required('Introduceți email'),
    registration: yup.string(),
    studyType: yup.string(),
    financing: yup.string(),
    yearStudy: yup.string(),
});

const MatriculationForm = ({visible, student, setStudent, autoValidate, setStatus}) => {

    const [beginDate, setBeginDate] =
        useState(student.beginStudies ? student.beginStudies : new Date());

    const [endDate, setEndDate] =
        useState(student.endStudies ? student.endStudies : new Date());

    const [invalidMsgBeginDate, setInvalidMsgBeginDate] = useState(null);

    const [invalidMsgEndDate, setInvalidMsgEndDate] = useState(null);

    const form = useRef();

    useEffect(() => {
        if(autoValidate) {
            validation(form.current.values);
            form.current.handleSubmit();
        }
    }, [autoValidate])

    const save = (values) => {
        setStudent(student => Student
            .fromObject({...student, ...values, beginStudies: beginDate, endStudies: endDate}))
    }

    const validation = (values) => {
        if (!isValidForm(values)) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }

    const validateDate = () => {
        let isValid = true;
        if(beginDate >= endDate) {
            setInvalidMsgBeginDate('Data de început este mai mare decât data de încheiere');
            setInvalidMsgEndDate(null);
            isValid = false;
        } else {
            setInvalidMsgBeginDate(null);
            setInvalidMsgEndDate(null);
        }
        return isValid;
    }

    const isValidForm = values => {
        let isValid = true;
        try {
            schema.validateSync(values, {abortEarly: false});
        } catch (err) {
            isValid = false;
        }
        if(!validateDate()) {
            isValid = false;
        }
        return isValid;
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
                    diplomaSeries: student.diplomaSeries,
                    diplomaNumber: student.diplomaNumber,
                    corporateEmail: student.corporateEmail,
                    registration: student.registration ? student.registration : Student.getConstants().REGISTRATION[0].id,
                    studyType: student.studyType ? student.studyType : Student.getConstants().STUDY_TYPE[0].id,
                    financing: student.financing ? student.financing : Student.getConstants().FINANCING[0].id,
                    yearStudy: student.yearStudy ? student.yearStudy : Student.getConstants().YEAR_STUDY[0].id,
                    beginDate: student.beginDate,
                    endDate: student.endDate,
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
                                        <CardHeader title={'Inmatriculare'}/>
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
                                                        <label style={{fontSize: "18px"}}>Diploma la înmatriculare</label>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Input
                                                            label={'Seria numar'}
                                                            name={'diplomaSeries'}
                                                            placeholder={"ALII/AMP00000000000"}
                                                            onChange={handleChange}
                                                            value={values.diplomaSeries}
                                                            touched={touched.diplomaSeries}
                                                            errors={errors.diplomaSeries}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Input
                                                            label={'Numar de inregistrare'}
                                                            name={'diplomaNumber'}
                                                            placeholder={"00000000000"}
                                                            onChange={handleChange}
                                                            value={values.diplomaNumber}
                                                            touched={touched.diplomaNumber}
                                                            errors={errors.diplomaNumber}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <InputBox
                                                            label={'E-mail corporativ'}
                                                            name={'corporateEmail'}
                                                            value={values.corporateEmail}
                                                            onChange={handleChange}
                                                            touched={touched.corporateEmail}
                                                            errors={errors.corporateEmail}
                                                            children={[<Image src={Images.CORPORATE_EMAIL} alt={'e-mail'}
                                                                              width={20}/>]}
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
                                                        <label style={{fontSize: "18px"}}>Studii</label>
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
                                                                invalid={invalidMsgBeginDate}
                                                                valid={touched.beginDate && !invalidMsgBeginDate}
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
                                                                invalid={invalidMsgEndDate}
                                                                valid={touched.endDate && !invalidMsgEndDate}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Select
                                                            label={'Tip inamatriculare'}
                                                            name={'registration'}
                                                            onChange={handleChange}
                                                            value={values.registration}
                                                            touched={touched.registration}
                                                            errors={errors.registration}
                                                            listOption={Student.getConstants().REGISTRATION}
                                                            keyMapOption={(item) => item.id}
                                                            valueMapOption={(item) => item.value}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Select
                                                            label={'Studii'}
                                                            name={'studyType'}
                                                            onChange={handleChange}
                                                            value={values.studyType}
                                                            touched={touched.studyType}
                                                            errors={errors.studyType}
                                                            listOption={Student.getConstants().STUDY_TYPE}
                                                            keyMapOption={(item) => item.id}
                                                            valueMapOption={(item) => item.value}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Select
                                                            label={'Finanțare'}
                                                            name={'financing'}
                                                            onChange={handleChange}
                                                            value={values.financing}
                                                            touched={touched.financing}
                                                            errors={errors.financing}
                                                            listOption={Student.getConstants().FINANCING}
                                                            keyMapOption={(item) => item.id}
                                                            valueMapOption={(item) => item.value}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Select
                                                            label={'Anul de studii'}
                                                            name={'study'}
                                                            onChange={handleChange}
                                                            value={values.yearStudy}
                                                            touched={touched.yearStudy}
                                                            errors={errors.yearStudy}
                                                            listOption={Student.getConstants().YEAR_STUDY}
                                                            keyMapOption={(item) => item.id}
                                                            valueMapOption={(item) => item.value}
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

export default MatriculationForm;