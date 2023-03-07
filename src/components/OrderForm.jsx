import React, {useMemo, useState} from 'react';
import {Card, InputGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ScrollList from "./ScrollList/ScrollList";
import DateSelect from "./DateSelect";

const OrderForm = ({orders, studentOrders}) => {

    const DATE_FORMAT = 'yyyy-MM-dd';

    // const DEFAULT_SELECTED_ORDER = {
    //     id: '', number: '', date: new Date(),
    //     orderSubtype: {
    //         id: 1, orderType: {id: 1}
    //     }
    // }

    const DEFAULT_SELECTED_ORDER = {
        id: '', number: '', date: new Date(),
        orderSubtypeId: 1,
        orderSubtype: '',
        orderTypeId: 1,
        orderType: '',
    }

    studentOrders.map(order => order.date = new Date(order.date));
    const dateToString = date => DATE_FORMAT
        .replace('yyyy', date.getFullYear())
        .replace('MM', date.getMonth() > 9 ?
            date.getMonth() + 1 : '0' + String(date.getMonth() + 1))
        .replace('M', String(date.getMonth() + 1))
        .replace('dd', date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
        .replace('d', date.getDate());

    const [orderError, setOrderError] = useState('');

    const [selectedOrder, setSelectedOrder] = useState(DEFAULT_SELECTED_ORDER);

    const [orderInfo, setOrderInfo] = useState('');

    // const setSubtypeOrdersOfOrder = useMemo(() => {
    //     const order = orders.filter(order => order.id === selectedOrder.orderSubtype.orderType.id).at(0);
    //     if(order.orderSubtypes.find(sub => sub.id === selectedOrder.orderSubtype.id) === undefined) {
    //         setSelectedOrder({
    //             ...selectedOrder,
    //             orderSubtype: {...selectedOrder.orderSubtype, id: order.orderSubtypes.at(0).id}
    //         });
    //     }
    //     return order;
    // }, [orders, selectedOrder.orderSubtype.orderType.id])

    const setSubtypeOrdersOfOrder = useMemo(() => {
        const order = orders.filter(order => order.id === selectedOrder.orderTypeId).at(0);
        if(order.orderSubtypes.find(sub => sub.id === selectedOrder.orderSubtypeId) === undefined) {
            setSelectedOrder({
                ...selectedOrder,
                orderSubtypeId: order.orderSubtypes.at(0).id,
                orderSubtype: order.orderSubtypes.at(0).order
            });
        }
        return order;
    }, [orders, selectedOrder.orderTypeId])

    const setStudentOrderInRedactor = (studentOrderId) => {
        console.log(studentOrderId)
        setOrderError('')
        const order = studentOrders.filter(order => order.id === Number(studentOrderId)).at(0);

        setSelectedOrder(order)
        setOrderInfo('Editare ordin nr. ' + order.number + ' din ' + dateToString(order.date))
    }

    const validator = () => {
        if (selectedOrder.number === '') {
            setOrderError('Order number not be empty');
            return false;
        }
        setOrderError('')
        return true;
    }

    const save = () => {
        if (validator() === false) {
            return;
        }

        const saveOrder = selectedOrder;
        saveOrder.orderSubtype.orderType.order = setSubtypeOrdersOfOrder.order;
        saveOrder.orderSubtype.order = setSubtypeOrdersOfOrder
            .orderSubtypes.filter(sub => sub.id === selectedOrder.orderSubtype.id).at(0).order;

        const index = studentOrders.findIndex(order => order.id === selectedOrder.id);
        if(index === -1) {
            studentOrders.splice(0, 0, saveOrder);
        } else {
            studentOrders.splice(index, 1, saveOrder);
        }

        setSelectedOrder(DEFAULT_SELECTED_ORDER);
        setOrderError('')
        setOrderInfo('')

    }

    return (
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
                                            value={selectedOrder.number}
                                            onChange={e =>
                                                setSelectedOrder({...selectedOrder, number: e.target.value})}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <DateSelect
                                    setDate={date => setSelectedOrder({...selectedOrder, date: date})}
                                    defaultDate={selectedOrder.date}
                                    count={10}
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
                                            value={selectedOrder.orderSubtypeId}
                                            onChange={e => {
                                                setSelectedOrder({
                                                    ...selectedOrder,
                                                    orderSubtype: {
                                                        ...selectedOrder.orderSubtype,
                                                        orderType: {
                                                            id: Number(e.target.value)
                                                        }
                                                    }
                                                })
                                            }}
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
                                            value={selectedOrder.orderSubtype.id}
                                            onChange={e => setSelectedOrder({
                                                ...selectedOrder,
                                                orderSubtype: {
                                                    ...selectedOrder.orderSubtype,
                                                    id: Number(e.target.value)
                                                }
                                            })}
                                        >
                                            {
                                                setSubtypeOrdersOfOrder.orderSubtypes.map(orderSubtype => {
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
                        {orderInfo !== '' ?
                        <Button
                            variant={"outline-success"}
                            disabled={true}
                        >
                            {orderInfo}
                        </Button>
                        : ''
                        }
                        {orderInfo !== '' ? <label>&nbsp;&nbsp;</label> : ''}
                        {orderError !== '' ?
                            <Button
                                variant={"outline-warning"}
                                disabled={true}
                            >⚠️ {orderError}</Button>
                            : ''}
                    </Col>
                    <Col md={"auto"}>
                        <Row>
                            <Col md={"auto"}>
                                <Button
                                    variant="outline-primary"
                                    onClick={save}
                                >Salvează ordin</Button>
                            </Col>
                            <Col md={"auto"}>
                                <Button variant="outline-danger"
                                        onClick={e => console.log(selectedOrder)}
                                >Sterge ordin</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ScrollList
                            onChange={e => setStudentOrderInRedactor(e.target.id)}
                            items={studentOrders.map(order => {
                                return {
                                    id: order.id,
                                    value: order.number + ' , ' +
                                        dateToString(order.date) + ' , ' +
                                        order.orderType + ' , ' +
                                        order.orderSubtype
                                }
                            })}
                            height={"10em"}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderForm;