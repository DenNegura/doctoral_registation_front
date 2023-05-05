import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "../FilterStyles.module.css";
import Button from "react-bootstrap/Button";
import Settings from "./settings";
import Form from "react-bootstrap/Form";

const FilterOption = (label, sizeButton = Settings.SIZE_BUTTON) => {

    const [isVisible, setVisible] = useState(false);

    const changeVisible = () => {
        if(isVisible) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }

    return (
        <>

            <Col className={classes.colFilterBar}>
                <Button
                    variant={Settings.OPTION_COLOR}
                    size={sizeButton}
                    onClick={changeVisible}>
                    {'🔎'}
                </Button>
            </Col> : <></>

            {isVisible ?
                <Col className={classes.colFilterBar}>
                    <Form onSubmit={submitSearchOption}>
                        <Form.Group>
                            <Form.Control type={"text"} size={sizeButton} onChange={changeSearchOption}/>
                        </Form.Group>
                    </Form>
                </Col> : <></>
            }
        </>
    );
};

export default FilterSearchOption;