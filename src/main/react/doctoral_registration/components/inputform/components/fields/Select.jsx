import React from 'react';
import Form from "react-bootstrap/Form";

const Select = ({
                    label, name, value, onChange, onSelect, touched, errors,
                    listOption, keyMapOption, valueMapOption
                }) => {
    return (
        <Form.Group md="4" controlId={name + 'Form'}>
            {label ? <Form.Label>{label}</Form.Label> : <></>}
            <Form.Select
                required={true}
                name={name}
                value={value}
                onSelect={onSelect}
                onChange={onChange}
                isValid={touched && !errors}
                isInvalid={!!errors}
            >
                {listOption ?
                    listOption.map(item => {
                        return <option key={keyMapOption(item)}
                                       value={keyMapOption(item)}>
                            {valueMapOption(item)}
                        </option>
                    }) : <></>
                }
            </Form.Select>
            <Form.Control.Feedback type={"invalid"}>
                {errors}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default Select;