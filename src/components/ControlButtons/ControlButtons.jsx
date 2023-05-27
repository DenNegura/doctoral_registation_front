import React from 'react';
import Button from "react-bootstrap/Button";
import {Image} from "react-bootstrap";
import Images from "../../resources/Images";
import classes from "./ControlButtons.module.css";

const ControlButtons = ({addFun}) => {

    const upToPage = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div className={classes.controlButtons}>
            <Button variant={"light"} onClick={addFun}>
                <Image src={Images.ADD} alt={"add"}/>
            </Button>
            <Button variant={"light"} onClick={upToPage}>
                <Image src={Images.UP_ARROW} alt={"up"}/>
            </Button>
        </div>
    );
};

export default ControlButtons;