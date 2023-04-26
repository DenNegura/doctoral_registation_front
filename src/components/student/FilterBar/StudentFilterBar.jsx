import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";

import FilterItem from "./FilterItem";
import {set} from "react-hook-form";

const ALL_VALUE = "Toate";

const LABEL_COLOR = "warning";

const SIZE_BUTTON = "sm";

const ACTIVE_COLOR = "success";

const DISABLE_COLOR = "outline-secondary";

const MOUSE_ENTER_COLOR = "secondary";

const LABELS = ["school", "domain", "branch", "profile", "Speciality"];

const LABELS_TITLE = ["Scoala", "Domen", "Branch", "Profile", "Specialitatea"];

const IS_ACTIVE_SCROLL = false;

class Item {

    static activeColor = ACTIVE_COLOR;

    static disableColor = DISABLE_COLOR;

    static mouseEnterColor = MOUSE_ENTER_COLOR;

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

}


const StudentFilterBar = ({getSchools, getDomains, getBranches, getProfiles, getSpecialities}) => {

    const [schools, setSchools] = useState(null);

    const [domains, setDomains] = useState(null);

    const [branches, setBranches] = useState(null);

    const [profiles, setProfiles] = useState(null);

    const [specialities, setSpecialities] = useState(null);

    useEffect(() => {
            getSchools().then(schools =>
                setSchools(schools.map(school =>
                    new Item(school.id, school.name, null))));
            getDomains().then(domains =>
                setDomains(domains.map(domain =>
                    new Item(domain.id, domain.number + ' ' + domain.name, domain.scienceSchoolId))));
            getBranches().then(branches =>
                setBranches(branches.map(branch =>
                    new Item(branch.id, branch.id + ' ' + branch.name, branch.scienceDomainId))));
            getProfiles().then(profiles =>
                setProfiles(profiles.map(profile =>
                    new Item(profile.id, profile.id + ' ' + profile.name, profile.scienceBranchId))));
            getSpecialities().then(specialities =>
                setSpecialities(specialities.map(speciality =>
                    new Item(speciality.id, speciality.id + ' ' + speciality.name, speciality.scienceProfileId))));
        },
        [getSchools, getDomains, getBranches, getProfiles, getSpecialities])


    const onSelectedItems = (label, items) => {
        console.log(items)

        const getItems = (targetItems, setTargetItems, parentItems) => {
            let selectedParentItems = [];
            parentItems.forEach(item => {
                if(item.isActive) {
                    selectedParentItems.push(item);
                }
            });
            console.log(selectedParentItems)
            let items;
            if(selectedParentItems.length === 0) {
                items = getVisibleItems(targetItems, parentItems);
            } else {
                items = getVisibleItems(targetItems, selectedParentItems);
            }
            setTargetItems([...targetItems]);
            console.log('getItems  -> ', items);
            return items;
        }

        const getVisibleItems = (targetItems, parentItems) => {
            let items = []
            targetItems.forEach(targetItem => {
                console.log('getVisible  -> ', targetItem);
                let isActive = targetItem.isActive;
                targetItem.setVisible(false);
                for(let i = 0; i < parentItems.length; i++) {
                    if (parentItems[i].id === targetItem.parentId) {
                        targetItem.setVisible(true);
                        if (isActive) {
                            targetItem.setActive(true);
                        }
                        items.push(targetItem);
                        break;
                    }
                }
            });
            return items;
        }

        if (LABELS[0] === label) { // schools
            let selectDomains = getItems(domains, setDomains, items);
            let selectBranches = getItems(branches, setBranches, selectDomains);
            let selectProfiles = getItems(profiles, setProfiles, selectBranches);
            getItems(specialities, setSpecialities, selectProfiles);
        } else if (LABELS[1] === label) { // domains
            let selectBranches = getItems(branches, setBranches, items);
            let selectProfiles = getItems(profiles, setProfiles, selectBranches);
            getItems(specialities, setSpecialities, selectProfiles);
        } else if (LABELS[2] === label) { // branches
            let selectProfiles = getItems(profiles, setProfiles, items);
            getItems(specialities, setSpecialities, selectProfiles);
        } else if (LABELS[3] === label) { // profiles
            getItems(specialities, setSpecialities, items);
        }
    }

    const onMouseEnter = (label, item) => {
        const mouseEnter = (targetItems, setTargetItems, parentItems) => {
            let hoverItems = [];
            targetItems.forEach(targetItem => {
                parentItems.forEach(parentItem => {
                    if(targetItem.parentId === parentItem.id) {
                        targetItem.setMouseEnter(true);
                        hoverItems.push(targetItem)
                    }
                })
            });
            setTargetItems([...targetItems]);
            return hoverItems;
        }

        if (LABELS[0] === label) {
            let hoverDomains = mouseEnter(domains, setDomains, [item]);
            let hoverBranches = mouseEnter(branches, setBranches, hoverDomains);
            let hoverProfiles = mouseEnter(profiles, setProfiles, hoverBranches);
            mouseEnter(specialities, setSpecialities, hoverProfiles);
        } else if(LABELS[1] === label) {
            let hoverBranches = mouseEnter(branches, setBranches, [item]);
            let hoverProfiles = mouseEnter(profiles, setProfiles, hoverBranches);
            mouseEnter(specialities, setSpecialities, hoverProfiles);
        } else if(LABELS[2] === label) {
            let hoverProfiles = mouseEnter(profiles, setProfiles, [item]);
            mouseEnter(specialities, setSpecialities, hoverProfiles);
        } else if(LABELS[3] === label) {
            mouseEnter(specialities, setSpecialities, [item]);
        }
    }

    const onMouseLeave = (label) => {

        const mouseLeave = (targetItems, setTargetItems) => {
            targetItems.forEach(item => item.setMouseEnter(false));
            setTargetItems([...targetItems]);
        }
        if(LABELS[0] === label) {
            mouseLeave(domains, setDomains);
            mouseLeave(branches, setBranches);
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if(LABELS[1] === label) {
            mouseLeave(branches, setBranches);
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if(LABELS[2] === label) {
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if(LABELS[3] === label) {
            mouseLeave(specialities, setSpecialities);
        }
    }

        return (
            <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                {schools ?
                    <div>
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
                            onMouseLeaveItem={onMouseLeave}/>
                        <br/>
                    </div> : <></>}
                {domains ?
                    <div>
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
                            onMouseLeaveItem={onMouseLeave}/>
                        <br/>
                    </div> : <></>}
                {branches ?
                    <div>
                        <FilterItem
                            label={LABELS[2]}
                            labelTitle={LABELS_TITLE[2]}
                            allItemValue={ALL_VALUE}
                            allItems={branches}
                            activeColor={ACTIVE_COLOR}
                            disableColor={DISABLE_COLOR}
                            labelColor={LABEL_COLOR}
                            sizeButton={SIZE_BUTTON}
                            isActiveScroll={IS_ACTIVE_SCROLL}
                            onActiveItems={onSelectedItems}
                            onMouseEnterItem={onMouseEnter}
                            onMouseLeaveItem={onMouseLeave}/>
                        <br/>
                    </div> : <></>}
                {profiles ?
                    <div>
                        <FilterItem
                            label={LABELS[3]}
                            labelTitle={LABELS_TITLE[3]}
                            allItemValue={ALL_VALUE}
                            allItems={profiles}
                            activeColor={ACTIVE_COLOR}
                            disableColor={DISABLE_COLOR}
                            labelColor={LABEL_COLOR}
                            sizeButton={SIZE_BUTTON}
                            isActiveScroll={IS_ACTIVE_SCROLL}
                            onActiveItems={onSelectedItems}
                            onMouseEnterItem={onMouseEnter}
                            onMouseLeaveItem={onMouseLeave}/>
                        <br/>
                    </div> : <></>}
                {specialities ?
                    <div>
                        <FilterItem
                            label={LABELS[4]}
                            labelTitle={LABELS_TITLE[4]}
                            allItemValue={ALL_VALUE}
                            allItems={specialities}
                            activeColor={ACTIVE_COLOR}
                            disableColor={DISABLE_COLOR}
                            labelColor={LABEL_COLOR}
                            sizeButton={SIZE_BUTTON}
                            isActiveScroll={IS_ACTIVE_SCROLL}
                            onActiveItems={onSelectedItems}
                            onMouseEnterItem={onMouseEnter}
                            onMouseLeaveItem={onMouseLeave}/>
                    </div> : <></>}
            </Container>
        );
};

export {Item};
export default StudentFilterBar;