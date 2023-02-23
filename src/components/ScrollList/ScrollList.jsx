import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import classes from "./ScrollList.module.css";

const ScrollList = ({items, height, onChange}) => {

    return (
        <Card>
            <div style={{"height": height}} className={classes.scrollList}>
                <ListGroup variant={"flush"}>
                    {
                        items.map(item => {
                            return <ListGroup.Item
                                action
                                id={item.id}
                                value={item.value}
                                key={item.id}
                                onClick={onChange}
                            >
                                {item.value}
                            </ListGroup.Item>
                        })
                    }
                </ListGroup>
            </div>
        </Card>
    );
};

export default ScrollList;