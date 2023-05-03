import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";


import FilterItem, {Item} from "../FilterItem";

const LABELS_ACCORDION = ["school", "domain", "supervisor"]

const LABELS = ["school", "domain", "branch", "profile", "speciality", "role" , "supervisor"];

const LABELS_TITLE = ["Scoala", "Domen", "Branch", "Profile", "Specialitatea", "În rolul de", "Professor"];

const FilterSciences = ({selectedPanels, getSchools, getDomains, getSupervisors}) => {

    const [schools, setSchools] = useState([]);

    const [loadedDomains, setLoadedDomains] = useState([]);

    const [domains, setDomains] = useState([]);

    const [branches, setBranches] = useState([]);

    const [profiles, setProfiles] = useState([]);

    const [specialities, setSpecialities] = useState([]);

    const roleSupervisors = [
        new Item(1, "Conducator", null, true),
        new Item(2, "Memru comisiei", null)];

    const [loadedSupervisors, setLoadedSupervisors] = useState([]);

    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
            getSchools().then(schools =>
                setSchools(schools.map(school =>
                    new Item(school.id, school.name, null))));
        },
        [getSchools])

    useEffect(() => lazyLoad(), [selectedPanels])


    const lazyLoad = () => {
        if (isOpenAccordionItem(LABELS_ACCORDION[1])) {
            lazyLoadDomains();
        }
        if (isOpenAccordionItem(LABELS_ACCORDION[2])) {
            lazyLoadSupervisors();
        }
    }

    const isOpenAccordionItem = (label) => {
        return selectedPanels.includes(label);
    }

    const loadDomains = (schoolId) => {
        getDomains(schoolId).then(domainsList => {
            let loadedDomains = domainsList.map(domain =>
                new Item(domain.id, domain.number + ' ' + domain.name, domain.scienceSchoolId));
            setDomains(domains => Item.sort([...domains, ...loadedDomains]));
            domainsList.forEach(domain => {
                let branchesList = domain.scienceBranches;
                let loadedBranches = branchesList.map(branch =>
                    new Item(branch.id, branch.id + ' ' + branch.name, branch.scienceDomainId));
                setBranches(branches => Item.sort([...branches, ...loadedBranches]));
                branchesList.forEach(branch => {
                    let profilesList = branch.scienceProfiles;
                    let loadedProfiles = profilesList.map(profile =>
                        new Item(profile.id, profile.id + ' ' + profile.name, profile.scienceBranchId));
                    setProfiles(profiles => Item.sort([...profiles, ...loadedProfiles]));
                    profilesList.forEach(profile => {
                        let specialitiesList = profile.specialities;
                        let loadedSpecialities = specialitiesList.map(speciality =>
                            new Item(speciality.id, speciality.id + ' ' + speciality.name, speciality.scienceProfileId));
                        setSpecialities(specialities => Item.sort([...specialities, ...loadedSpecialities]));
                    })
                })
            })
        });
    }
    const lazyLoadDomains = () => {
        let activeSchools = Item.getActiveItems(schools);
        if (activeSchools.length === 0) {
            schools.forEach(school => {
                if (!loadedDomains.includes(school.id)) {
                    loadDomains(school.id);
                    setLoadedDomains(loadedDomains => [...loadedDomains, school.id]);
                }
            });
        } else {
            activeSchools.forEach(school => {
                if (!loadedDomains.includes(school.id)) {
                    loadDomains(school.id);
                    setLoadedDomains(loadedDomains => [...loadedDomains, school.id]);
                }
            });
        }
    }

    const loadSupervisors = (schoolId) => {
        getSupervisors(schoolId).then(supervisorList => {
            let loadedSupervisors = supervisorList.map(supervisor =>
                new Item(supervisor.id, supervisor.firstName + ' ' + supervisor.lastName, supervisor.scienceSchoolId));
            setSupervisors(supervisors => Item.sort([...supervisors, ...loadedSupervisors]));
        });
    }
    const lazyLoadSupervisors = () => {
        let activeSchools = Item.getActiveItems(schools);
        if (activeSchools.length === 0) {
            schools.forEach(school => {
                if(!loadedSupervisors.includes(school.id)) {
                    loadSupervisors(school.id);
                    setLoadedSupervisors(loadSupervisors => [...loadSupervisors, school.id]);
                }
            });
        } else {
            activeSchools.forEach(school => {
                if(!loadedSupervisors.includes(school.id)) {
                    loadSupervisors(school.id);
                    setLoadedSupervisors(loadSupervisors => [...loadSupervisors, school.id]);
                }
            });
        }
    }

    const onSelectedItems = (label, items) => {
        lazyLoad();
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
            if(isOpenAccordionItem(LABELS_ACCORDION[1])) {
                let selectDomains = getItems(domains, setDomains, items);
                let selectBranches = getItems(branches, setBranches, selectDomains);
                let selectProfiles = getItems(profiles, setProfiles, selectBranches);
                getItems(specialities, setSpecialities, selectProfiles);
            }
            if(isOpenAccordionItem(LABELS_ACCORDION[2])) {
                getItems(supervisors, setSupervisors, items);
            }
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
            if(isOpenAccordionItem(LABELS_ACCORDION[1])) {
                let hoverDomains = mouseEnter(domains, setDomains, [item]);
                let hoverBranches = mouseEnter(branches, setBranches, hoverDomains);
                let hoverProfiles = mouseEnter(profiles, setProfiles, hoverBranches);
                mouseEnter(specialities, setSpecialities, hoverProfiles);
            }
            if(isOpenAccordionItem(LABELS_ACCORDION[2])) {
                mouseEnter(supervisors, setSupervisors, [item]);
            }
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
            if(isOpenAccordionItem(LABELS_ACCORDION[1])) {
                mouseLeave(domains, setDomains);
                mouseLeave(branches, setBranches);
                mouseLeave(profiles, setProfiles);
                mouseLeave(specialities, setSpecialities);
            }
            if(isOpenAccordionItem(LABELS_ACCORDION[2])) {
                mouseLeave(supervisors, setSupervisors)
            }
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
            <Accordion.Item eventKey={LABELS_ACCORDION[0]}>
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
            <Accordion.Item eventKey={LABELS_ACCORDION[1]}>
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
            <Accordion.Item eventKey={LABELS_ACCORDION[2]}>
                <Accordion.Header>Professori</Accordion.Header>
                <Accordion.Body>
                    <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                        <div>
                            <FilterItem
                                label={LABELS[5]}
                                labelTitle={LABELS_TITLE[5]}
                                allItems={roleSupervisors}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}
                                defaultSelectItem={roleSupervisors[0]}
                                isMultipleSelect={false}/>
                            <br/>
                        </div>
                        {schools ?
                            <div>
                                <FilterItem
                                    label={LABELS[6]}
                                    labelTitle={LABELS_TITLE[6]}
                                    allItems={supervisors}
                                    onActiveItems={onSelectedItems}
                                    onMouseEnterItem={onMouseEnter}
                                    onMouseLeaveItem={onMouseLeave}/>
                                <br/>
                            </div> : <></>}
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};

export default FilterSciences;