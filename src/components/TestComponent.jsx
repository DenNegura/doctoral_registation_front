import React, {useState} from 'react';
import {Card, ListGroup} from "react-bootstrap";
import classes from "./ScrollList/ScrollList.module.css";

const TestComponent = ({orders}) => {

    const [order, setOrder] = useState(orders.at(0));

    const setOrderSub = (e) => {
        console.log(orders.filter(order => order.id.toString() === e.target.value).at(0));
        setOrder(orders.filter(order => order.id.toString() === e.target.value).at(0));
    }

    return (
        <Card>
            <div className={classes.scrollList}>
                <ListGroup variant={"flush"}>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
        </Card>
    );
};

export default TestComponent;