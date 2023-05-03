import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "./FilterStyles.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import Settings from "./settings";

class Item {

    static activeColor = Settings.ACTIVE_COLOR;

    static disableColor = Settings.DISABLE_COLOR;

    static mouseEnterColor = Settings.MOUSE_ENTER_COLOR;

    constructor(id, value, parentId, isActive = false,
                isVisible = true, isMouseEnter = false) {
        this.id = id;
        this.value = value;
        this.parentId = parentId;
        this.isActive = isActive;
        this.isVisible = isVisible;
        this.isMouseEnter = isMouseEnter;
    }

    color() {
        return this.isMouseEnter ? Item.mouseEnterColor :
            this.isActive ? Item.activeColor : Item.disableColor;
    }

    setActive(isActive) {
        this.isActive = isActive;
    }

    setVisible(isVisible) {
        this.isVisible = isVisible;
        if (this.isVisible === false) {
            this.setActive(false);
        }
    }

    setMouseEnter(isMouseEnter) {
        this.isMouseEnter = isMouseEnter;
    }

    equals(item) {
        return this.id === item.id;
    }
    
    static getActiveItems(items) {
        return items.filter(item => item.isActive);
    }

    static sort(items) {
        return items.sort((a, b) => a.id > b.id);
    }
    
}

const FilterItem = ({label, labelTitle, allItems,
                        allItemValue = Settings.ALL_VALUE,
                        activeColor = Settings.ACTIVE_COLOR,
                        disableColor = Settings.DISABLE_COLOR,
                        labelColor = Settings.LABEL_COLOR,
                        sizeButton = Settings.SIZE_BUTTON,
                        isActiveScroll = Settings.IS_ACTIVE_SCROLL,
                        onActiveItems, onMouseEnterItem, onMouseLeaveItem,
                        defaultSelectItem = null,
                        isMultipleSelect = true}) => {

    const [isScroll, setScroll] = useState(isActiveScroll);

    const [allItemColor, setAllItemColor] = useState(activeColor);

    const [items, setItems] = useState([]);
    
    const [defaultItem, setDefaultItem] = useState(null);

    useEffect(() => {
        setItems([...allItems])
        if(isMultipleSelect) {
            if(containsActiveItems(allItems)) {
                setAllItemColor(disableColor);
            } else {
                setAllItemColor(activeColor);
            }   
        } else {
            let item = allItems.filter(item =>
                item.equals(defaultSelectItem))[0];
            if(!item) {
                item = allItems[0];
            }
            setDefaultItem(item);
        }
    }, [activeColor, allItems, defaultSelectItem, disableColor, isMultipleSelect])


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
        onActiveItems(label, getVisibleItems(newItems))
    }

    const multipleSelect = (item, index) => {
        let newItems = [...items]
        if(item.isActive) {
            item.setActive(false);
        } else {
            item.setActive(true);
        }

        newItems[index] = item;
        setItems(newItems);

        if(containsActiveItems(newItems)) {
            setAllItemColor(disableColor);
            onActiveItems(label, getActiveItems(newItems));
        } else {
            setAllItemColor(activeColor);
            onActiveItems(label, getVisibleItems(newItems));
        }
    }

    const onlySelect = (item, index) => {
        let newItems = [...items]
        let activeItem;
        if(item.isActive) {
            item.setActive(false);
            defaultItem.setActive(true);
            activeItem = defaultItem;
        } else {
            newItems.forEach(item => item.setActive(false))
            item.setActive(true);
            activeItem = item;
        }
        newItems[index] = item;
        setItems(newItems);
        onActiveItems(label, [activeItem]);
    }
    const select = (item, index) => {
        if(isMultipleSelect) {
            multipleSelect(item, index);
        } else {
            onlySelect(item, index);
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

    const getVisibleItems = (items) => {
        let visibleItems = []
        items.forEach(item => {
            if(item.isVisible) {
                visibleItems.push(item);
            }
        })
        return visibleItems;
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
                    {isMultipleSelect ?
                        <Col className={classes.colFilterBar}>
                            <Button
                                variant={allItemColor}
                                size={sizeButton}
                                onClick={() => selectAll()}>
                                {allItemValue}
                            </Button>
                        </Col> :
                        <></>
                    }
                    {items.map((item, index) => {
                        if(item.isVisible) {
                            return <Col key={item.id} className={classes.colFilterBar}>
                                <Button
                                    variant={item.color()}
                                    size={sizeButton}
                                    onClick={() => select(item, index)}
                                    onMouseEnter={() => onMouseEnterItem(label, item)}
                                    onMouseLeave={() => onMouseLeaveItem(label)}>
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

export {Item};

export default FilterItem;