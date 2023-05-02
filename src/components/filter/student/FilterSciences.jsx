import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";


import FilterItem, {Item} from "../FilterItem";

const LABELS = ["school", "domain", "branch", "profile", "speciality"];

const LABELS_TITLE = ["Scoala", "Domen", "Branch", "Profile", "Specialitatea"];

const FilterSciences = ({selectedPanels, getSchools, getDomains, getBranches, getProfiles, getSpecialities}) => {

    const [schools, setSchools] = useState(null);

    const [loadedSchools, setLoadedSchools] = useState(null);

    const [domains, setDomains] = useState(null);

    const [branches, setBranches] = useState(null);

    const [profiles, setProfiles] = useState(null);

    const [specialities, setSpecialities] = useState(null);

    const [supervisors, setSupervisors] = useState(null);

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

    useEffect(() => {
        if(selectedPanels.includes(LABELS[0])) {
            lazyLoadSciences();
        }
        if(selectedPanels.includes(LABELS[1])) {
            lazyLoadSupervisors();
        }
    }, [selectedPanels])

    // const getSchools = (idSchool) => {
    //
    // }

    const loadSciences = (schoolId) => {
        let loadedDomains = getDomains(schoolId).then(domains => domains.map(domain =>
                new Item(domain.id, domain.number + ' ' + domain.name, domain.scienceSchoolId)));
        setDomains([...domains, loadedDomains])
    }
    const lazyLoadSciences = () => {
        let activeSchools = Item.getActiveItems(schools);
        if(activeSchools.length === 0) {

        } else {
            loadedSchools.forEach(school => {
                if(!loadedSchools.includes(school.id)) {
                    loadSciences(school.id);
                    loadedSchools.push(school.id);
                }
            })
        }
    }
    
    const lazyLoadSupervisors = () => {
        
    }

    const onSelectedItems = (label, items) => {

        const getItems = (targetItems, setTargetItems, parentItems) => {
            let selectedParentItems = [];
            parentItems.forEach(item => {
                if (item.isActive) {
                    selectedParentItems.push(item);
                }
            });
            let items;
            if (selectedParentItems.length === 0) {
                items = getVisibleItems(targetItems, parentItems);
            } else {
                items = getVisibleItems(targetItems, selectedParentItems);
            }
            setTargetItems([...targetItems]);
            return items;
        }

        const getVisibleItems = (targetItems, parentItems) => {
            let items = []
            targetItems.forEach(targetItem => {
                let isActive = targetItem.isActive;
                targetItem.setVisible(false);
                for (let i = 0; i < parentItems.length; i++) {
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
                    if (targetItem.parentId === parentItem.id) {
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
        } else if (LABELS[1] === label) {
            let hoverBranches = mouseEnter(branches, setBranches, [item]);
            let hoverProfiles = mouseEnter(profiles, setProfiles, hoverBranches);
            mouseEnter(specialities, setSpecialities, hoverProfiles);
        } else if (LABELS[2] === label) {
            let hoverProfiles = mouseEnter(profiles, setProfiles, [item]);
            mouseEnter(specialities, setSpecialities, hoverProfiles);
        } else if (LABELS[3] === label) {
            mouseEnter(specialities, setSpecialities, [item]);
        }
    }

    const onMouseLeave = (label) => {

        const mouseLeave = (targetItems, setTargetItems) => {
            targetItems.forEach(item => item.setMouseEnter(false));
            setTargetItems([...targetItems]);
        }
        if (LABELS[0] === label) {
            mouseLeave(domains, setDomains);
            mouseLeave(branches, setBranches);
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if (LABELS[1] === label) {
            mouseLeave(branches, setBranches);
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if (LABELS[2] === label) {
            mouseLeave(profiles, setProfiles);
            mouseLeave(specialities, setSpecialities);
        } else if (LABELS[3] === label) {
            mouseLeave(specialities, setSpecialities);
        }
    }

    return (
        <>
            <Accordion.Item eventKey={LABELS[0]}>
                <Accordion.Header>Școli doctorale</Accordion.Header>
                <Accordion.Body>
                    <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                        {schools ?
                            <div>
                                <FilterItem
                                    label={LABELS[0]}
                                    labelTitle={LABELS_TITLE[0]}
                                    allItems={schools}
                                    onActiveItems={onSelectedItems}
                                    onMouseEnterItem={onMouseEnter}
                                    onMouseLeaveItem={onMouseLeave}/>
                                <br/>
                            </div> : <></>}
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={LABELS[2]}>
                <Accordion.Header>Specialititati</Accordion.Header>
                <Accordion.Body>
                    <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                        {domains ?
                            <div>
                                <FilterItem
                                    label={LABELS[1]}
                                    labelTitle={LABELS_TITLE[1]}
                                    allItems={domains}
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
                                    allItems={branches}
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
                                    allItems={profiles}
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
                                    allItems={specialities}
                                    onActiveItems={onSelectedItems}
                                    onMouseEnterItem={onMouseEnter}
                                    onMouseLeaveItem={onMouseLeave}/>
                            </div> : <></>}
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={2}>
                <Accordion.Header>Professori</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};

export default FilterSciences;