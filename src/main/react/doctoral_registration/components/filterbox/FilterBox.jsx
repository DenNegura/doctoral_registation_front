import React from 'react';
import {Image, InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Images from "../../../../resources/settings/Images";
import classes from "./FilterBox.module.css";

const FilterBox = ({image = Images.SEARCH, onChange, placeholder}) => {
    return (
        <Form.Group md="4">
            <InputGroup>
                {image ?
                    <InputGroup.Text className={classes.filterBox}>
                        <Image src={image} alt={'search'}/>
                    </InputGroup.Text>
                    : <></>
                }
                <Form.Control
                    onChange={e => onChange(e.target.value)}
                    type="search"
                    placeholder={placeholder}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default FilterBox;