import React from 'react';
import {Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ButtonBox = ({image, size, variant, onClick}) => {
    return (
        <Button variant={variant ? variant : "light"} onClick={onClick}>
            <Image src={image} alt={"add"} width={size} height={size}/>
        </Button>
    );
};

export default ButtonBox;