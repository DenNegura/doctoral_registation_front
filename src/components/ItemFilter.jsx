import React from 'react';
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ItemFilter = ({onChange, placeholder}) => {
    return (
        <Form.Group md="4">
            <InputGroup>
                <InputGroup.Text>🔎</InputGroup.Text>
                <Form.Control
                    onChange={e => onChange(e.target.value)}
                    type="search"
                    placeholder={placeholder}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default ItemFilter;