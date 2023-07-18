import React, {useEffect, useRef, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Card, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Formik} from "formik";
import * as yup from "yup";
import CardHeader from "../components/cardheader/CardHeader";
import Student from "../../domains/Student";

const schema = yup.object().shape({
    scienceTopic: yup.string()
        .required('Introduceți tema de cercetare'),
});

const ScienceTopicForm = ({visible, student, setStudent, autoValidate, setStatus}) => {

    const MAX_LENGTH_SCIENCE_TOPIC = 500;

    const MAX_LENGTH_REMARK = 300;

    const DEFAULT_SCIENCE_TOPIC_LINES = 3;

    const DEFAULT_REMARK_LINES = 2;

    const [scienceTopicLines, setScienceTopicLines] = useState(DEFAULT_SCIENCE_TOPIC_LINES);

    const [remarkLines, setRemarkLines] = useState(DEFAULT_REMARK_LINES);

    const form = useRef();

    useEffect(() => {
        if(autoValidate) {
            validation(form.current.values);
            form.current.handleSubmit();
        }
    }, [autoValidate])

    const resize = (value, min, setLines) => {
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
        if (min > size) {
            setLines(min);
        } else {
            setLines(size);
        }
    }

    const save = (values) => {
        console.log(values)
        setStudent(student => Student.fromObject({...student, ...values}))
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
                    scienceTopic: student.scienceTopic,
                    remark: student.remark,
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
                                        <CardHeader title={'Tema de cercetare'}/>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Container>
                                                <Row className={'mb-3'}>
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formSearchTopic"}>
                                                            <Form.Label>Tema de cercetare</Form.Label>
                                                            <Form.Control
                                                                name={"scienceTopic"}
                                                                type={'text'}
                                                                value={values.scienceTopic}
                                                                onChange={e => {
                                                                    resize(e.target.value, DEFAULT_SCIENCE_TOPIC_LINES, setScienceTopicLines);
                                                                    handleChange(e);
                                                                }}
                                                                isValid={touched.scienceTopic && !errors.scienceTopic}
                                                                isInvalid={!!errors.scienceTopic}
                                                                as={"textarea"}
                                                                maxLength={MAX_LENGTH_SCIENCE_TOPIC}
                                                                rows={scienceTopicLines}
                                                            />
                                                            <Form.Control.Feedback type={"invalid"}>
                                                                {errors.scienceTopic}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className={'mb-3'}>
                                                    <Col>
                                                        <Form.Group md="4" controlId={"formRemark"}>
                                                            <Form.Label>Note aditionale</Form.Label>
                                                            <Form.Control
                                                                name={"remark"}
                                                                type={'text'}
                                                                value={values.remark}
                                                                onChange={e => {
                                                                    resize(e.target.value, DEFAULT_REMARK_LINES, setRemarkLines);
                                                                    handleChange(e);
                                                                }}
                                                                as={"textarea"}
                                                                maxLength={MAX_LENGTH_REMARK}
                                                                rows={remarkLines}
                                                            />
                                                        </Form.Group>
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

export default ScienceTopicForm;