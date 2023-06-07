import React from 'react';
import {Spinner} from "react-bootstrap";
import classes from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
    return (
        <div className={classes.LoadingSpinner}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;