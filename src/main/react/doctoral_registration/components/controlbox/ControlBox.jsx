import React from 'react';
import classes from "./ControlBox.module.css";

const ControlBox = (props) => {
    return (
        <div className={classes.controlButtons}>
            {React.Children.map(props.children, (child, index) => (
                <div key={index}>{child}</div>
            ))}
        </div>
    );
};

export default ControlBox;