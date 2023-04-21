import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "../StudentStyles.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const FilterItem = ({items, defaultItemValue, usedColor, notUsedColor, label, size, getActiveItems}) => {

    const LABEL = label;

    const SIZE = size;

    const USED = usedColor;

    const NOT_USED = notUsedColor;

    const [colorDefault, setColorDefault] = useState(USED)

    const [colors, setColors] = useState(Array
        .from({length: items.length}, () => NOT_USED))

    const selectDefault = (colors, setColorDefault, setColors) => {
        const newColors = Array.from({length: colors.length}, () => NOT_USED);
        setColors(newColors);
        setColorDefault(USED);
    }
    const select = (index, colors, setColorDefault, setColors, ) => {
        const newColors = [...colors]
        if(newColors[index] === USED) {
            newColors[index] = NOT_USED;
        } else {
            newColors[index] = USED;
        }
        setColors(newColors);
        if(newColors.includes(USED)) {
            setColorDefault(NOT_USED)
        } else {
            setColorDefault(USED);
        }
    }

    return (
        <Row xs={"auto"}>
            <Col className={classes.colFilterBar}>
                <Button variant={LABEL} disabled size={SIZE}>{defaultItemValue}</Button>
            </Col>
            <Col className={classes.colFilterBar}>
                <Button
                    variant={colorDefault}
                    size={SIZE}
                    onClick={e => selectDefault(colors, setColorDefault, setColors)}>
                    Toate
                </Button>
            </Col>
            {schools.map((school, index) => {
                return <Col key={index} className={classes.colFilterBar}>
                    <Button
                        variant={colors[index]}
                        size={SIZE}
                        onClick={e => select(index, colors, setColorDefault, setColors)}>
                        {school.name}
                    </Button>
                </Col>
            })}
        </Row>
    );
};

export default FilterItem;