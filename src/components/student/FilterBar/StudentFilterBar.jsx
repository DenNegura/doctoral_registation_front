import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";

import FilterItem from "./FilterItem";

const StudentFilterBar = ({getSchools, getDomains}) => {

    const LABELS = ["school", "domain"]

    const LABELS_TITLE = ["Scoala", "Domen"]

    const ALL_VALUE = "Toate"

    const LABEL_COLOR = "warning"

    const SIZE_BUTTON = "sm"

    const ACTIVE_COLOR = "success"

    const DISABLE_COLOR = "outline-secondary"

    const IS_ACTIVE_SCROLL = false

    const [schools, setSchools] = useState(null)

    const [domainsAll, setDomainsAll] = useState(null)

    const [domains, setDomains] = useState(null)

    useEffect(() => {
        getSchools().then(schools =>
            setSchools(schools.map((school, index) => {
                    return {id: school.id, name: school.name, parentId: null}})))
        getDomains().then(domains => {
            let domainsList = domains.map((domain, index) => {
                return {id: domain.id, name: domain.name, parentId: domain.scienceSchoolId}})
            setDomainsAll(domainsList)
            setDomains([...domainsList]);
        })
    }, [getDomains, getSchools])


    const onSelectedItems = (label, items) => {
        if(LABELS[0] === label) {
            let array = []
            if(items.length === 0) {
                array = [...domainsAll];
            } else {
                items.forEach(item => {
                    array = [...array, ...domainsAll.filter(domain => domain.parentId === item.id)];
                })
            }
            setDomains(array);
        }
    }

    if(schools && domains) {
        return (
            <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                <FilterItem
                    label={LABELS[0]}
                    labelTitle={LABELS_TITLE[0]}
                    allItemValue={ALL_VALUE}
                    items={schools}
                    activeColor={ACTIVE_COLOR}
                    disableColor={DISABLE_COLOR}
                    labelColor={LABEL_COLOR}
                    sizeButton={SIZE_BUTTON}
                    isActiveScroll={IS_ACTIVE_SCROLL}
                    onActiveItems={onSelectedItems}
                />
                <br/>
                <FilterItem
                    label={LABELS[1]}
                    labelTitle={LABELS_TITLE[1]}
                    allItemValue={ALL_VALUE}
                    items={domains}
                    activeColor={ACTIVE_COLOR}
                    disableColor={DISABLE_COLOR}
                    labelColor={LABEL_COLOR}
                    sizeButton={SIZE_BUTTON}
                    isActiveScroll={IS_ACTIVE_SCROLL}
                    onActiveItems={onSelectedItems}
                />
            </Container>
        );
    } else {
        return <></>
    }
};

export default StudentFilterBar;