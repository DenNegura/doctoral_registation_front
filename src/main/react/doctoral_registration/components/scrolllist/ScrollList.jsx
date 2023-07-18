import React from 'react';
import {Card, Image, ListGroup} from "react-bootstrap";
import classes from "./ScrollList.module.css";
import Images from "../../../../resources/settings/Images";

const ScrollList = ({items, height, invalid, valid, onChange, getValue, getKey}) => {
    return (
        <Card style={{"height": height}}
              className={(invalid ? classes.invalid : '') + (valid ? classes.valid: '')}>
            {invalid ?
                <Image
                    className={classes.invalidImage}
                    src={Images.INVALID}
                    alt={'invalid'}/>
                : <></>
            }
            <div style={{"height": height}} className={classes.scrollList}>
                <ListGroup variant={"flush"}>
                    {items ?
                        items.map(item => {
                            return <ListGroup.Item
                                action
                                type={"button"}
                                id={getKey(item)}
                                value={getKey(item)}
                                key={getKey(item)}
                                onClick={onChange}
                            >
                                {getValue(item)}
                            </ListGroup.Item>
                        }) : <ListGroup.Item/>
                    }
                </ListGroup>
            </div>
            {invalid ?
                <label className={classes.invalidMessage}>
                    {invalid}
                </label> : <></>
            }
        </Card>
    );
};

export default ScrollList;