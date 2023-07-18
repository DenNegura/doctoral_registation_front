import React from 'react';
import {Card, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateParser from "../../../utils/DateParser";

const OrderView = ({student}) => {

    const dateParser =
        new DateParser(DateParser.FORMAT.DD_MM_YYYY, DateParser.DELIMITER.SLASH);

    return (
        <Card>
            <Card.Header>
                <Card.Title>Ordin</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Table bordered={false} striped={false} size={"2sm"}>
                            <thead>
                            <tr>
                                <th>Numar</th>
                                <th>Data</th>
                                <th>Tip</th>
                                <th>Subtip</th>
                            </tr>
                            </thead>
                            {student.orders ?
                                <tbody>
                                {
                                    student.orders.map(order => {
                                        return <tr key={order.id}>
                                            <td>{order.number}</td>
                                            <td>{dateParser.toString(order.date)}</td>
                                            <td>{order.orderSubtype}</td>
                                            <td>{order.orderType}</td>
                                        </tr>
                                    })
                                }
                                </tbody> :
                                <tbody/>
                            }
                        </Table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderView;