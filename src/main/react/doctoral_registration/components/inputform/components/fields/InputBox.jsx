import React from 'react';
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

const InputBox = ({label, name, value, placeholder, onChange,
                      type = 'text', touched, errors, children=[]}) => {
    return (
        <Form.Group md={"4"} controlId={name + 'Form'}>
            <Form.Label>{label}</Form.Label>
            <InputGroup hasValidation>
                <InputGroup.Text id={name + 'Form'}>
                    {children ?
                        React.Children.map(children, (child, index) => (
                            <div key={index}>{child}</div>
                        )) : <></>
                    }
                </InputGroup.Text>
                <Form.Control
                    aria-describedby={name + 'Form'}
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
            </InputGroup>
        </Form.Group>
    );
};

export default InputBox;