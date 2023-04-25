import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "../StudentStyles.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";

const FilterItem = ({label, labelTitle, allItemValue, items,
                        activeColor, disableColor, labelColor,
                        sizeButton, isActiveScroll, onActiveItems}) => {


    const [selectedItems, setSelectedItems] = useState([])

    const [isScroll, setScroll] = useState(isActiveScroll);

    const [allItemColor, setAllItemColor] = useState(activeColor)

    const [colors, setColors] = useState(Array
        .from({length: items.length}, () => disableColor))

    const [isLoaded, setLoaded] = useState(true);

    useEffect(() => {
        // setLoaded(false);
        let newColors = Array
            .from({length: items.length}, () => disableColor);
        if(selectedItems.length !== 0) {
            let newSelectedItems = [];
            selectedItems.forEach(sItem => {
                if(items.includes(sItem)) {
                    newSelectedItems = [...newSelectedItems, sItem];
                }
            })
            newSelectedItems.forEach((item, index) => {
                newColors[index] = activeColor;
            })
            setSelectedItems(newSelectedItems);
            console.log(newSelectedItems)
        }
        console.log(newColors)
        setColors(newColors);
    }, [items])

    // useEffect(() => {
    //     setLoaded(true);
    // }, [colors])

    const changeScroll = () => {
        if(isScroll) {
            setScroll(false);
        } else {
            setScroll(true);
        }
    }

    const selectDefault = () => {
        const newColors = Array.from({length: colors.length}, () => disableColor);
        setColors(newColors);
        setAllItemColor(activeColor);
        setSelectedItems([]);
        onActiveItems(label, [])
    }

    const select = (index) => {
        const newColors = [...colors]
        if(newColors[index] === activeColor) {
            newColors[index] = disableColor;
            let newSelectedItems = selectedItems
                .filter(item => item !== items[index]);
            setSelectedItems(newSelectedItems);
            onActiveItems(label, newSelectedItems)
        } else {
            newColors[index] = activeColor;
            let newSelectedItems = [...selectedItems, items[index]]
            setSelectedItems(newSelectedItems)
            onActiveItems(label, newSelectedItems);
        }
        setColors(newColors);
        if(newColors.includes(activeColor)) {
            setAllItemColor(disableColor)
        } else {
            setAllItemColor(activeColor);
        }
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
                            onClick={() => selectDefault()}>
                            {allItemValue}
                        </Button>
                    </Col>
                    {isLoaded ? <> {items.map((item, index) => {
                        return <Col key={index} className={classes.colFilterBar}>
                            <Button
                                variant={colors[index]}
                                size={sizeButton}
                                onClick={() => select(index)}>
                                {item.name}
                            </Button>
                        </Col>
                    })} </> : <></>}
                </Row>
            </div>
        </Card>
    );
};

export default FilterItem;