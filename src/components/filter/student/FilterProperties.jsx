import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";
import STUDENT_PROPERTIES from "../../student/properties";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils"
import FilterItem from "../components/FilterItem";

const LABELS_ACCORDION = ["property"]

const LABELS = ["country", "year_birth", "gender", "year_study",
    "registration", "study_type", "financing", "status", "age_birth"]

const LABELS_TITLE = ["Cetățenie", "Data nasterei", "Gen", "Anul de studii",
    "Tip inamatriculare", "Studii", "Finanțare", "status", "Anul nașterii"]

const FilterProperties = ({getCountries}) => {

    const [countries, setCountries] = useState([]);

    const gender = STUDENT_PROPERTIES.GENDER
        .map(item => new Item(item.id, item.value));

    const registration = STUDENT_PROPERTIES.REGISTRATION
        .map(item => new Item(item.id, item.value));

    const yearStudy = STUDENT_PROPERTIES.YEAR_STUDY
        .map(item => new Item(item.id, item.value));

    const financing = STUDENT_PROPERTIES.FINANCING
        .map(item => new Item(item.id, item.value));

    const studyType = STUDENT_PROPERTIES.STUDY_TYPE
        .map(item => new Item(item.id, item.value));

    const status = STUDENT_PROPERTIES.STATUS
        .map(item => new Item(item.id, item.value));

    const [ageBirth, setAgeBirth] = useState([]);


    useEffect(() => {
        getCountries().then(countriesList => {
            setCountries(() => 
                countriesList.map(country => 
                    new Item(country.id, country.country, null)));
        })
    }, [getCountries])


    const onSelectedItems = () => {
    }

    const onMouseEnter = () => {
    }

    const onMouseLeave = () => {
    }

    const addAgeBirth = (value) => {
        let array = [];
        let item = null;
        if(FilterUtils.isYear(value)) {
            item = new Item(value, value);
            item.setActive(true);
            if(FilterUtils.includes(ageBirth, item)) {
                return;
            } else {
                setAgeBirth(ageBirth => [...ageBirth, item]);
            }
        } else {
            array = FilterUtils.parseToList(value);
            if(array !== []) {
                array = array.map(item => new Item(item, item, null, true));
                array = array.filter(item => !FilterUtils.includes(ageBirth, item));
            } else {
                return;
            }
        }
        if(FilterUtils.isYear(value) && !FilterUtils.includes(ageBirth, item)) {
            setAgeBirth(ageBirth => [...ageBirth, item]);
        }
    }

    const searchAgeBirth = (value) => {

    }

    return (
        <>
            <Accordion.Item eventKey={LABELS_ACCORDION[0]}>
                <Accordion.Header>Proprietățile studentului</Accordion.Header>
                <Accordion.Body>
                    <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                        {countries ?
                            <div>
                                <FilterItem
                                    label={LABELS[0]}
                                    labelTitle={LABELS_TITLE[0]}
                                    allItems={countries}
                                    onActiveItems={onSelectedItems}
                                    onMouseEnterItem={onMouseEnter}
                                    onMouseLeaveItem={onMouseLeave}/>
                                <br/>
                            </div> : <></>}
                        <div>
                            <FilterItem
                                label={LABELS[2]}
                                labelTitle={LABELS_TITLE[2]}
                                allItems={gender}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[3]}
                                labelTitle={LABELS_TITLE[3]}
                                allItems={yearStudy}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[4]}
                                labelTitle={LABELS_TITLE[4]}
                                allItems={registration}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[5]}
                                labelTitle={LABELS_TITLE[5]}
                                allItems={studyType}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[6]}
                                labelTitle={LABELS_TITLE[6]}
                                allItems={financing}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[7]}
                                labelTitle={LABELS_TITLE[7]}
                                allItems={status}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}/>
                            <br/>
                        </div>
                        <div>
                            <FilterItem
                                label={LABELS[8]}
                                labelTitle={LABELS_TITLE[8]}
                                allItems={ageBirth}
                                onActiveItems={onSelectedItems}
                                onMouseEnterItem={onMouseEnter}
                                onMouseLeaveItem={onMouseLeave}
                                addOption={addAgeBirth}
                                addTooltipOption={['Pentru listă, introduceți de la ... până la']}/>
                            <br/>
                        </div>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};

export default FilterProperties;