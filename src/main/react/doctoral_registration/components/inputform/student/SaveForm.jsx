import React, {useEffect, useState} from 'react';
import {Card, Container, Image, ListGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CardHeader from "../components/cardheader/CardHeader";
import Col from "react-bootstrap/Col";
import {Label} from "../../stepsbrowser/StepsBrowser";
import classes from "./Forms.module.css";
import Button from "react-bootstrap/Button";
import scrollList from "../../scrolllist/ScrollList.module.css";
import StudentFormNew from "./StudentFormNew";
import StudentView from "../../view/student/StudentView";
import Separator from "../../separator/Separator";
import Images from "../../../../../resources/settings/Images";
import ButtonBox from "../../controlbox/ButtonBox";

const SaveForm = ({visible, labels, student, setStudent, setOpenForm,
                      autoValidate, setAutoValidate, setStatus}) => {

    const DEFAULT_HEIGHT_VIEW = "18.7em";

    const MAX_HEIGHT_VIEW = "100%";

    const OPEN_VIEW = Images.DOWN_ARROW;

    const CLOSE_VIEW = Images.UP_ARROW;

    const [imageArrow, setImageArrow] = useState(OPEN_VIEW);

    const [heightView, setHeightView] = useState(DEFAULT_HEIGHT_VIEW);

    useEffect(() => {
        if(autoValidate) {
            validate();
        }
    }, [autoValidate])

    const openView = () => {
        if(imageArrow === OPEN_VIEW) {
            setHeightView(MAX_HEIGHT_VIEW);
            setImageArrow(CLOSE_VIEW);
        } else {
            setHeightView(DEFAULT_HEIGHT_VIEW);
            setImageArrow(OPEN_VIEW);
        }
    }

    const save = () => {
        // todo Передать классу Server студента для сохранения.
    }

    const validate = () => {
        if (!isValidForm()) {
            setStatus(false);
        } else {
            setStatus(true);
            save();
        }
    }

    const isValidForm = () => {
        let isValid = true;
        for(let i = 0; i < labels.length - 1; i++) {
            if (labels[i].status === Label.ERROR) {
                isValid = false;
            }
        }
        return isValid;
    }

    return (
        <div style={!visible ? {display: "none"} : {}}>
            <Form noValidate onSubmit={e => {
                e.preventDefault();
                setAutoValidate((i) => i + 1);
                validate();
            }}>
                <Container>
                    <Row className={"mb-3"}>
                        <Col>
                            <Card>
                                <CardHeader title={'Confirmare'}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={"mb-3"}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Container>
                                        <Row className={'mb-3'}>
                                            <Col md={"auto"}>
                                                <ListGroup
                                                    key={'description'}
                                                    horizontal={'xxl'}
                                                    className={'my-2'}>
                                                    <ListGroup.Item
                                                        className={classes.labelHeader}>
                                                        Denumirea
                                                    </ListGroup.Item>
                                                    <ListGroup.Item
                                                        className={classes.labelHeader}
                                                        style={{width: "6em"}}>
                                                        Status
                                                    </ListGroup.Item>
                                                </ListGroup>
                                                {labels.map((label, index) => {
                                                    return index + 1 !== labels.length ?
                                                        <ListGroup
                                                            key={label.label}
                                                            horizontal={'xxl'}
                                                            className={'my-2'}>
                                                            <ListGroup.Item
                                                                className={classes.labelColumn}>
                                                                {label.label}
                                                            </ListGroup.Item>
                                                            <ListGroup.Item
                                                                className={classes.labelColumn}
                                                                style={{width: "6em"}}>
                                                                <Image
                                                                    src={label.status}
                                                                    alt={'status'}
                                                                    width={'25px'}
                                                                    height={'25px'}/>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                        : <></>
                                                })}
                                            </Col>
                                            <Col>
                                                <Card className={classes.previewCard}>
                                                    <Button
                                                        variant={"outline-secondary"}
                                                        className={classes.previewButton}
                                                        onClick={openView}>
                                                        <Image
                                                            src={imageArrow} alt={"add"}
                                                            className={classes.previewImage}/>
                                                    </Button>
                                                    <div className={scrollList.scrollList} style={{height: heightView}}>
                                                        <Separator height={'0.7em'}/>
                                                        <StudentView student={student} isEditButton={false}/>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default SaveForm;