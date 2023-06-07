import React from 'react';
import {Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ButtonBox = ({image, onClick}) => {
    return (
        <Button variant={"light"} onClick={onClick}>
            <Image src={image} alt={"add"}/>
        </Button>
    );
};

export default ButtonBox;