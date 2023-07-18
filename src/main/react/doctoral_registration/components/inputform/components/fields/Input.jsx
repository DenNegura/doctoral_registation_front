import React from 'react';
import Form from "react-bootstrap/Form";

const Input = ({label, name, value, type="text", onChange, touched, errors, placeholder}) => {
    return (
        <Form.Group md="4" controlId={name + 'Form'}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                required={true}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                isValid={touched && !errors}
                isInvalid={!!errors}
            />
            <Form.Control.Feedback type={"invalid"}>
                {errors}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default Input;