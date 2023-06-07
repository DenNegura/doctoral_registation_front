import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import classes from "./ScrollList.module.css";


class ItemsParser {

    static toItems(type, entities) {
        return entities.map(entity => type(entity));
    }

    static toItem(type, entity) {
        return type(entity);
    }

    static ENTITY = {
        SPECIALITY: item => {
            return {id: item.id, value: item.id + ' ' + item.name}
        },
        SUPERVISOR: item => {
            return {
                id: item.id,
                value: item.firstName + ' ' + item.lastName + ', ' + item.post + ', ' + item.speciality
            }
        }
    }
}

const ScrollList = ({items, height, onChange}) => {

    return (
        <Card>
            <div style={{"height": height}} className={classes.scrollList}>
                <ListGroup variant={"flush"}>
                    {items ?
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
                        }) : <ListGroup.Item/>
                    }
                </ListGroup>
            </div>
        </Card>
    );
};

export {ItemsParser};
export default ScrollList;