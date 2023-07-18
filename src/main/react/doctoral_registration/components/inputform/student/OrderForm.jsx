import React, {useEffect, useMemo, useState} from 'react';
import {Card, Container, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateSelect from "../../dateselect/DateSelect";
import scrollList from "../../scrolllist/ScrollList.module.css";
import forms from "./Forms.module.css";
import DateParser from "../../../utils/DateParser";
import Server from "../../../server/Server";
import OrderType from "../../domains/OrderType";
import CardHeader from "../components/cardheader/CardHeader";

const OrderForm = ({visible, student, setStudent ,autoValidate , setStatus}) => {

    const [orderTypes, setOrderTypes] = useState([]);

    const [newOrders, setNewOrders] = useState([]);

    // AUTO VALIDATE FORM
    useEffect(() => {
        if(autoValidate) {
            formValidation();
            formSave();
        }
    }, [autoValidate])

    useEffect(() => {
        Server.get(Server.GET_ALL.ORDER_TYPES, setOrderTypes)
            .map(OrderType.fromObject).build();
    }, [])

    // <== BOXING ORDERS OF STUDENTS IN ORDER_BOXES ==>
    useEffect(() => {
        if (student) {
            setOrderBoxes(() => student.orders
                .map((order, index) => {
                    return {id: index, order: order}
                }))
        }
    }, [student])

    // <== CONSTANTS ==>

    const ORDER_BOX_SCHEME = {
        id: null,
        order: {
            id: null,
            number: '',
            orderTypeId: 1,
            orderSubtypeId: 1,
            date: new Date(),
        }
    }

    const ERROR_SCHEME = {
        numberInv: false,
        numberMsg: '',
    };

    const LIST_SIZE_DEFAULT = 22;

    const LIST_SIZE_STEP = 1.5;

    const EDIT_MESSAGE = (num, date) => `Ordin: ${num} ${date}`;

    // <== VARIABLES ==>

    const [orderBoxes, setOrderBoxes] = useState([]);

    const dateParser =
        new DateParser(DateParser.FORMAT.DD_MM_YYYY, DateParser.DELIMITER.SLASH);

    const [selectOrderBox, setSelectOrderBox] = useState(ORDER_BOX_SCHEME);

    const [listSize, setListSize] = useState(LIST_SIZE_DEFAULT);

    const [error, setError] = useState(ERROR_SCHEME);

    const [isEdit, setIsEdit] = useState(false);

    const [message, setMessage] = useState('');

    const [stateOrdersTable, setStateOrderTable] = useState(true);

    // <== WHEN A NEW TYPE OF ORDER IS CHOSEN, THE FIRST SUBTYPE IS ASSIGNED ==>

    const setSubtypeOrdersOfOrder = useMemo(() => {
        if (orderTypes) {
            const order = orderTypes.filter(order => order.id === selectOrderBox.order.orderTypeId).at(0);
            if (order && order.orderSubtypes.find(sub => sub.id === selectOrderBox.order.orderSubtypeId) === undefined) {
                setSelectOrderBox({
                    ...selectOrderBox, order: {
                        ...selectOrderBox.order,
                        orderSubtypeId: order.orderSubtypes.at(0).id,
                        orderSubtype: order.orderSubtypes.at(0).order
                    }
                });
            }
            return order;
        }
        return [];
    }, [orderTypes, selectOrderBox.order.orderTypeId])

    // <== SET SELECTED ORDER BOX IN REDACTOR ==>

    const setOrderInRedactor = (orderBoxId) => {
        if (!isNaN(orderBoxId)) {
            const orderBox = orderBoxes
                .filter(order => order.id === Number(orderBoxId)).at(0);
            setSelectOrderBox(orderBox);
            setIsEdit(true);
            setMessage(EDIT_MESSAGE(orderBox.order.number, dateParser.toString(orderBox.order.date)));
        }
    }

    // <== VALIDATION PROCESS ==>

    const validation = () => {
        let isErrors = false;
        setError({...error, numberInv: false});
        if (selectOrderBox.order.number === '') {
            isErrors = true;
            setError({...error, numberInv: true, numberMsg: 'Introduceti numarul ordenului'});
        }
        return !isErrors;
    }

    useEffect(() => {
        let size = LIST_SIZE_DEFAULT;
        if (error.numberInv) {
            size += LIST_SIZE_STEP;
        }
        setListSize(() => size);
    }, [error])

    /// <== SAVE PROCESS ==>

    const signOrderType = (orderBoxToSave) => {
        const orderType = orderTypes
            .filter(order => order.id === orderBoxToSave.order.orderTypeId)[0];
        const orderSubtype = orderType.orderSubtypes
            .filter(order => order.id === orderBoxToSave.order.orderSubtypeId)[0];
        orderBoxToSave.order.orderType = orderType.order;
        orderBoxToSave.order.orderSubtype = orderSubtype.order;
    }

    const save = () => {
        if (validation() === false) {
            return;
        }
        let orderBoxToSave = {...selectOrderBox};
        signOrderType(orderBoxToSave);
        if (orderBoxToSave.id !== null) {
            let index = orderBoxes
                .findIndex(order => order.id === orderBoxToSave.id);
            orderBoxes[index] = orderBoxToSave;
        } else {
            orderBoxes.unshift({id: orderBoxes.length, order: orderBoxToSave.order})
        }
        setNewOrders(() => orderBoxes.map(orderBox => orderBox.order));
        setIsEdit(false);
        setMessage('')
        setSelectOrderBox(ORDER_BOX_SCHEME);
        setStatus(false);
        setStateOrderTable(false);
    }

    const remove = () => {
        let orderBoxToRemove = {...selectOrderBox};
        if (selectOrderBox.id !== null) {
            let index = orderBoxes
                .findIndex(order => order.id === orderBoxToRemove.id);
            orderBoxes.splice(index, 1);
        }
        setNewOrders(() => orderBoxes.map(orderBox => orderBox.order));
        setIsEdit(false);
        setMessage('')
        setSelectOrderBox(ORDER_BOX_SCHEME);
        setStatus(false);
        setStateOrderTable(false);
    }

    const formValidation = () => {
        setStatus(true);
        setStateOrderTable(true);
    }

    const formSave = () => {
        setStudent(student =>{return {...student, orders: newOrders}})
    }

    return (
        <div style={!visible ? {display: "none"} : {}}>
            <Form noValidate onSubmit={e => {
                e.preventDefault();
                formValidation();
                formSave();
            }}>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <Card>
                                <CardHeader title={'Ordin'}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card style={{height: "100%"}}>
                                <Card.Body>
                                    <Container>
                                        <Row className={"mb-3"}>
                                            <Col>
                                                <Form.Group md={"4"} controlId={"formOrderNumber"}>
                                                    <Form.Label>Ordin numar</Form.Label>
                                                    <Form.Control
                                                        type={"text"}
                                                        value={selectOrderBox.order.number}
                                                        onChange={e =>
                                                            setSelectOrderBox(
                                                                {
                                                                    ...selectOrderBox,
                                                                    order: {
                                                                        ...selectOrderBox.order,
                                                                        number: e.target.value
                                                                    }
                                                                })}
                                                        isInvalid={error.numberInv}
                                                    />
                                                    <Form.Control.Feedback type={"invalid"}>
                                                        {'Introduceti numarul ordinului'}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={"mb-3"}>
                                            <Col>
                                                <Form.Group md={"4"} controlId={"formOrderDate"}>
                                                    <Form.Label>Data inregistarii</Form.Label>
                                                    <DateSelect
                                                        setDate={date => setSelectOrderBox(
                                                            {
                                                                ...selectOrderBox,
                                                                order: {...selectOrderBox.order, date: date}
                                                            })}
                                                        defaultDate={selectOrderBox.order.date}
                                                        count={10}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={"mb-3"}>
                                            <Col>
                                                <Form.Group md="4" controlId={"formOrderType"}>
                                                    <Form.Label>Tip ordin</Form.Label>
                                                    <Form.Select
                                                        value={selectOrderBox.order.orderTypeId}
                                                        onChange={e => {
                                                            setSelectOrderBox({
                                                                ...selectOrderBox,
                                                                order: {
                                                                    ...selectOrderBox.order,
                                                                    orderTypeId: Number(e.target.value)
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        {orderTypes ?
                                                            orderTypes.map(order => {
                                                                return <option key={order.id}
                                                                               value={order.id}>
                                                                    {order.order}
                                                                </option>
                                                            }) :
                                                            <option/>
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={"mb-3"}>
                                            <Form.Group md="4" controlId={"formOrderSubtype"}>
                                                <Form.Label>Subtip ordin</Form.Label>
                                                <Form.Select
                                                    value={selectOrderBox.order.orderSubtypeId}
                                                    onChange={e => setSelectOrderBox({
                                                        ...selectOrderBox,
                                                        order: {
                                                            ...selectOrderBox.order,
                                                            orderSubtypeId: Number(e.target.value)
                                                        }
                                                    })}
                                                >
                                                    {setSubtypeOrdersOfOrder && setSubtypeOrdersOfOrder.orderSubtypes ?
                                                        setSubtypeOrdersOfOrder.orderSubtypes.map(orderSubtype => {
                                                            return <option key={orderSubtype.id}
                                                                           value={orderSubtype.id}>
                                                                {orderSubtype.order}
                                                            </option>
                                                        })
                                                        :
                                                        <option/>
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Row>
                                        <Row className={"mb-3"}>
                                            <Col>
                                                <Row>
                                                    <Col md={"auto"}>
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={save}
                                                        >{isEdit ? "Editează ordin" : "Salvează ordin"}</Button>
                                                    </Col>
                                                    {isEdit ?
                                                        <Col md={"auto"}>
                                                            <Button
                                                                variant="outline-danger"
                                                                onClick={remove}
                                                            >Sterge ordin</Button>
                                                        </Col> : <></>
                                                    }
                                                    {isEdit ?
                                                        <Col>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder={message}
                                                                disabled
                                                                readOnly
                                                            />
                                                        </Col> : <></>
                                                    }
                                                </Row>
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
                                        <Row className={"mb-3"}>
                                            <Col>
                                                <Form.Label>Lista ordinelor</Form.Label>
                                                <Card className={stateOrdersTable ? forms.resolvedOrderStatus : forms.unresolvedOrderStatus}>
                                                    <div className={scrollList.scrollList}
                                                         style={{height: listSize + "em"}}>
                                                        <Table hover bordered responsive={"xl"}
                                                               onClick={e => setOrderInRedactor(parseInt(e.target.parentElement.id))}>
                                                            <thead>
                                                            <tr style={{borderTop: "0"}}>
                                                                <th style={{border: "0"}}>Numar</th>
                                                                <th>Data</th>
                                                                <th>Tip</th>
                                                                <th style={{border: "0"}}>Subtip</th>
                                                            </tr>
                                                            </thead>
                                                            {orderBoxes ?
                                                                <tbody>
                                                                {orderBoxes.map(orderBox => {
                                                                    return <tr key={orderBox.id} id={orderBox.id}>
                                                                        <td>{orderBox.order.number}</td>
                                                                        <td>{dateParser.toString(orderBox.order.date)}</td>
                                                                        <td>{orderBox.order.orderType}</td>
                                                                        <td style={{borderRight: '0'}}>{orderBox.order.orderSubtype}</td>
                                                                    </tr>
                                                                })}
                                                                </tbody> :
                                                                <tbody/>
                                                            }
                                                        </Table>
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

export default OrderForm;