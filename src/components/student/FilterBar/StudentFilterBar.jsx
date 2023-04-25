import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";

import FilterItem from "./FilterItem";

const ALL_VALUE = "Toate"

const LABEL_COLOR = "warning"

const SIZE_BUTTON = "sm"

const ACTIVE_COLOR = "success"

const DISABLE_COLOR = "outline-secondary"

const MOUSE_ENTER_COLOR = "secondary";

const LABELS = ["school", "domain"]

const LABELS_TITLE = ["Scoala", "Domen"]

const IS_ACTIVE_SCROLL = false

class Item {

    static activeColor = ACTIVE_COLOR

    static disableColor = DISABLE_COLOR

    static mouseEnterColor = MOUSE_ENTER_COLOR

    constructor(id, value, parentId, isActive=false,
                isVisible=true, isMouseEnter=false) {
        this.id = id;
        this.value = value;
        this.parentId = parentId;
        this.isActive = isActive;
        this.isVisible = isVisible;
        this.isMouseEnter = isMouseEnter;
    }

    color() {
        return this.isMouseEnter ? Item.mouseEnterColor :
            this.isActive ? Item.activeColor : Item.disableColor;
    }

    setActive(isActive) {
        this.isActive = isActive;
    }

    setVisible(isVisible) {
        this.isVisible = isVisible;
        if (this.isVisible === false) {
            this.setActive(false);
        }
    }

    setMouseEnter(isMouseEnter) {
        this.isMouseEnter = isMouseEnter;
    }

    static toVisible(items, isVisible) {
        items.forEach(item => item.setVisible(isVisible));
        return items;
    }
}


const StudentFilterBar = ({getSchools, getDomains}) => {

    const [schools, setSchools] = useState(null)

    const [domains, setDomains] = useState(null)


    useEffect(() => {
            getSchools().then(schools =>
                setSchools(schools.map(school =>
                    new Item(school.id, school.name, null))))
            getDomains().then(domains =>
                setDomains(domains.map(domain =>
                    new Item(domain.id, domain.name, domain.scienceSchoolId))))
        },
        [getDomains, getSchools])


    const onSelectedItems = (label, items) => {
        if (LABELS[0] === label) {
            if (items.length === 0) {
                Item.toVisible(domains, true);
            } else {
                domains.forEach(domain => {
                    let isActive = domain.isActive;
                    domain.setVisible(false);
                    items.forEach(item => {
                        if (item.id === domain.parentId) {
                            domain.setVisible(true);
                            if (isActive) {
                                domain.setActive(true);
                            }
                        }
                    })
                })
            }
            setDomains([...domains]);
        }
    }

    const onMouseEnter = (label, item) => {
        if (LABELS[0] === label) {
            domains.forEach(domain => {
                if(domain.parentId === item.id) {
                    domain.setMouseEnter(true);
                }
            });
            setDomains([...domains]);
        }
    }

    const onMouseLeave = (label) => {
        if(LABELS[0] === label) {
            domains.forEach(domain => domain.setMouseEnter(false));
            setDomains([...domains]);
        }
    }

    if (schools && domains) {
        return (
            <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                <FilterItem
                    label={LABELS[0]}
                    labelTitle={LABELS_TITLE[0]}
                    allItemValue={ALL_VALUE}
                    allItems={schools}
                    activeColor={ACTIVE_COLOR}
                    disableColor={DISABLE_COLOR}
                    labelColor={LABEL_COLOR}
                    sizeButton={SIZE_BUTTON}
                    isActiveScroll={IS_ACTIVE_SCROLL}
                    onActiveItems={onSelectedItems}
                    onMouseEnterItem={onMouseEnter}
                    onMouseLeaveItem={onMouseLeave}
                />
                <br/>
                <FilterItem
                    label={LABELS[1]}
                    labelTitle={LABELS_TITLE[1]}
                    allItemValue={ALL_VALUE}
                    allItems={domains}
                    activeColor={ACTIVE_COLOR}
                    disableColor={DISABLE_COLOR}
                    labelColor={LABEL_COLOR}
                    sizeButton={SIZE_BUTTON}
                    isActiveScroll={IS_ACTIVE_SCROLL}
                    onActiveItems={onSelectedItems}
                    onMouseEnterItem={onMouseEnter}
                    onMouseLeaveItem={onMouseLeave}
                />
            </Container>
        );
    } else {
        return <></>
    }
};

export {Item};
export default StudentFilterBar;