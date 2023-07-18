import React from 'react';
import classes from "./StepsBrowser.module.css";
import {Image} from "react-bootstrap";
import Images from "../../../../resources/settings/Images";

class Label {

    static SUCCESS = Images.SUCCESS;

    static ERROR = Images.ERROR;

    static EXCLAMATION = Images.EXCLAMATION;

    constructor(label, onClick, isActive = false, status = Label.EXCLAMATION) {
        this.label = label;
        this.onClick = onClick;
        this.isActive = isActive;
        this.status = status;
    }

    toSuccess() {
        this.status = Label.SUCCESS;
    }

    toError() {
        this.status = Label.ERROR;
    }

    toExclamation() {
        this.status = Label.EXCLAMATION;
    }

}

const StepsBrowser = ({labels}) => {

    return (
        <div className={classes.container}>
            {labels.map((label, index) => {
                return <div key={label.label} className={classes.box}>
                    <button className={classes.labelBox + ' ' + (label.isActive ? classes.select : '')}
                            onClick={() => {
                                labels.map(label => label.isActive = false);
                                label.isActive = true;
                                label.onClick();
                            }}>
                        <Image src={label.status} alt={'status'} className={classes.status}/>
                        <label>
                            {label.label}
                        </label>
                    </button>
                    {index + 1 !== labels.length ? <div className={classes.line}/> : <></>}
                </div>
            })}
        </div>
    );
};

export {Label};
export default StepsBrowser;