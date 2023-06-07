import React from 'react';
import {Image} from "react-bootstrap";
import Images from "../../../../resources/settings/Images";
import Button from "react-bootstrap/Button";

const ButtonUp = () => {

    const upToPage = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <Button variant={"light"} onClick={upToPage}>
            <Image src={Images.UP_ARROW} alt={"up"}/>
        </Button>
    );
};

export default ButtonUp;