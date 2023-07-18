import React from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import classes from './CardHeader.module.css'

const CardHeader = ({title, isBorderBottom}) => {

    return (
        <Card.Header className={isBorderBottom ? '' : classes.header}>
            <Card.Title className={classes.title}>
                <h3>{title}</h3>
                <Button type="submit" name={"buttonSubmit"}>Salveaza</Button>
            </Card.Title>
        </Card.Header>
    );
};

export default CardHeader;