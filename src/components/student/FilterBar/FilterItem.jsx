import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "../StudentStyles.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";

const FilterItem = ({label, labelTitle, allItemValue, allItems,
                        activeColor, disableColor, labelColor,
                        sizeButton, isActiveScroll, onActiveItems}) => {

    const [isScroll, setScroll] = useState(isActiveScroll);

    const [allItemColor, setAllItemColor] = useState(activeColor);

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([...allItems])
        if(containsActiveItems(allItems)) {
            setAllItemColor(disableColor);
        } else {
            setAllItemColor(activeColor);
        }
    }, [activeColor, allItems, disableColor])


    const changeScroll = () => {
        if(isScroll) {
            setScroll(false);
        } else {
            setScroll(true);
        }
    }

    const selectAll = () => {
        setAllItemColor(activeColor);
        let newItems = [...items]
        newItems.forEach(item => item.setActive(false));
        setItems(newItems);
        onActiveItems(label, [])
    }

    const select = (item, index) => {
        let newItems = [...items]
        if(item.isActive) {
            item.setActive(false);
        } else {
            item.setActive(true);
        }

        newItems[index] = item;
        setItems(newItems);
        onActiveItems(label, getActiveItems(newItems));

        if(containsActiveItems(newItems)) {
            setAllItemColor(disableColor);
        } else {
            setAllItemColor(activeColor);
        }
    }

    const getActiveItems = (items) => {
        let activeItems = []
        items.forEach(item => {
            if(item.isActive) {
                activeItems.push(item);
            }
        })
        return activeItems;
    }

    const containsActiveItems = (items) => {
        for(let i = 0; i < items.length; i++) {
            if(items[i].isActive) {
                return true;
            }
        }
        return false;
    }

    return (
        <Card>
            <div className={isScroll ? `${classes.activeScrollFromFilterItem} ${classes.divScrollFilterItem}`
                : classes.divScrollFilterItem}>
                <Row xs={"auto"} className={isScroll ? "flex-nowrap" : ''}>
                    <Col className={classes.colFilterBar}>
                        <Button
                            variant={labelColor}
                            size={sizeButton}
                            onClick={() => changeScroll()}>
                            {labelTitle}
                        </Button>
                    </Col>
                    <Col className={classes.colFilterBar}>
                        <Button
                            variant={allItemColor}
                            size={sizeButton}
                            onClick={() => selectAll()}>
                            {allItemValue}
                        </Button>
                    </Col>
                    {items.map((item, index) => {
                        if(item.isVisible) {
                            return <Col key={item.id} className={classes.colFilterBar}>
                                <Button
                                    variant={item.color()}
                                    size={sizeButton}
                                    onClick={() => select(item, index)}>
                                    {item.value}
                                </Button>
                            </Col>
                        }
                        return <div key={item.id} style={{display: "none"}}></div>
                    })}
                </Row>
            </div>
        </Card>
    );
};

export default FilterItem;