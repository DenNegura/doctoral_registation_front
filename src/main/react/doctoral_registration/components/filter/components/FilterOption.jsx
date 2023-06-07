import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import classes from "../FilterStyles.module.css";
import Button from "react-bootstrap/Button";
import Settings from "../../../../../resources/settings/Settings";
import Form from "react-bootstrap/Form";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const FilterOption = ({
                          label, onSubmit, onChange, tooltip,
                          sizeButton = Settings.SIZE_BUTTON
                      }) => {

    const [isVisible, setVisible] = useState(false);

    const [value, setValue] = useState('');

    const changeVisible = () => {
        if (isVisible) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }

    const onSubmitFunction = (e) => {
        e.preventDefault()
        setValue(value);
        if (onSubmit !== undefined) {
            onSubmit(value.trim());
        }
        setValue('')
    }

    const onChangeFunction = (value) => {
        setValue(value);
        if (onChange !== undefined) {
            onChange(value.trim());
        }
    }

    return (
        <>
            <Col className={classes.colFilterBar}>
                {tooltip ?
                    <OverlayTrigger overlay={
                        <Tooltip>
                            {tooltip.map((info, index) => {
                                return <div key={index}>{info}</div>
                            })}
                        </Tooltip>}>
                        <Button
                            variant={Settings.OPTION_COLOR}
                            size={sizeButton}
                            onClick={changeVisible}>
                            {label}
                        </Button>
                    </OverlayTrigger> :
                    <Button
                        variant={Settings.OPTION_COLOR}
                        size={sizeButton}
                        onClick={changeVisible}>
                        {label}
                    </Button>
                }
            </Col>
            {isVisible ?
                <Col className={classes.colFilterBar}>
                    <Form onSubmit={onSubmitFunction}>
                        <Form.Group>
                            <Form.Control
                                type={"text"}
                                size={sizeButton}
                                value={value}
                                onChange={e => onChangeFunction(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Col> : <></>
            }
        </>
    );
};

export default FilterOption;