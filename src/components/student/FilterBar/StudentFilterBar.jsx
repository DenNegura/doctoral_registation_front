import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import classes from "../StudentStyles.module.css";

const StudentFilterBar = ({schools}) => {

    const LABEL = "warning"

    const SIZE = "sm"

    const USED = "success"

    const NOT_USED = "outline-secondary"

    const [colorSchoolDefault, setColorSchoolDefault] = useState(USED)

    const [colorsSchool, setColorsSchool] = useState(Array
        .from({length: schools.length}, () => NOT_USED))

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
        <Container fluid>
            <Row xs={"auto"}>
                <Col className={classes.colFilterBar}>
                    <Button variant={LABEL} disabled size={SIZE}>Scoala :</Button>
                </Col>
                <Col className={classes.colFilterBar}>
                    <Button
                        variant={colorSchoolDefault}
                        size={SIZE}
                        onClick={e => selectDefault(colorsSchool, setColorSchoolDefault, setColorsSchool)}>
                        Toate
                    </Button>
                </Col>
                {schools.map((school, index) => {
                    return <Col key={index} className={classes.colFilterBar}>
                        <Button
                            variant={colorsSchool[index]}
                            size={SIZE}
                            onClick={e => select(index, colorsSchool, setColorSchoolDefault, setColorsSchool)}>
                            {school.name}
                        </Button>
                    </Col>
                })}
            </Row>

        </Container>
    );
};

export default StudentFilterBar;