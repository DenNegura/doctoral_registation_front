import React, {useEffect, useState} from 'react';
import {Accordion, Container} from "react-bootstrap";
import Item from "../components/Item";
import FilterItem from "../components/FilterItem";
import FilterAgeBirth from "./FilterAgeBirth";
import FilterFullName from "./FilterFullName";
import FilterBeginStudy from "./FilterBeginStudy";
import FilterEndStudy from "./FilterEndStudy";
import FilterEmail from "./FilterEmail";
import FilterIdentNumber from "./FilterIdentNumber";
import FilterPhoneNumber from "./FilterPhoneNumber";
import FilterDiploma from "./FilterDiploma";
import Student from "../../domains/Student";

const LABELS_ACCORDION = ["property", "select_property", "input_property"]

const LABELS = ["country", "year_birth", "gender", "year_study",
    "registration", "study_type", "financing", "status"]

const LABELS_TITLE = ["Cetățenie", "Data nasterei", "Gen", "Anul de studii",
    "Tip inamatriculare", "Studii", "Finanțare", "status"]

const FilterProperties = ({getCountries, onSelectItems}) => {

    const [countries, setCountries] = useState([]);

    const gender = Student.getConstants().GENDER
        .map(item => new Item(item.id, item.value));

    const registration = Student.getConstants().REGISTRATION
        .map(item => new Item(item.id, item.value));

    const yearStudy = Student.getConstants().YEAR_STUDY
        .map(item => new Item(item.id, item.value));

    const financing = Student.getConstants().FINANCING
        .map(item => new Item(item.id, item.value));

    const studyType = Student.getConstants().STUDY_TYPE
        .map(item => new Item(item.id, item.value));

    const status = Student.getConstants().STATUS
        .map(item => new Item(item.id, item.value));


    useEffect(() => {
        getCountries().then(countriesList => {
            setCountries(() =>
                countriesList.map(country =>
                    new Item(country.id, country.country, null)));
        })
    }, [getCountries])

    return (
        <>
            <Accordion.Item eventKey={LABELS_ACCORDION[0]}>
                <Accordion.Header>Studenti</Accordion.Header>
                <Accordion.Body>
                    <Accordion defaultActiveKey={LABELS_ACCORDION[1]} alwaysOpen>
                        <Accordion.Item eventKey={LABELS_ACCORDION[1]}>
                            <Accordion.Header>Proprietăți de selectat</Accordion.Header>
                            <Accordion.Body>
                                <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                                    {countries ?
                                        <div>
                                            <FilterItem
                                                label={LABELS[0]}
                                                labelTitle={LABELS_TITLE[0]}
                                                allItems={countries}
                                                onActiveItems={onSelectItems}/>
                                            <br/>
                                        </div> : <></>}
                                    <div>
                                        <FilterItem
                                            label={LABELS[2]}
                                            labelTitle={LABELS_TITLE[2]}
                                            allItems={gender}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                    <div>
                                        <FilterItem
                                            label={LABELS[3]}
                                            labelTitle={LABELS_TITLE[3]}
                                            allItems={yearStudy}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                    <div>
                                        <FilterItem
                                            label={LABELS[4]}
                                            labelTitle={LABELS_TITLE[4]}
                                            allItems={registration}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                    <div>
                                        <FilterItem
                                            label={LABELS[5]}
                                            labelTitle={LABELS_TITLE[5]}
                                            allItems={studyType}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                    <div>
                                        <FilterItem
                                            label={LABELS[6]}
                                            labelTitle={LABELS_TITLE[6]}
                                            allItems={financing}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                    <div>
                                        <FilterItem
                                            label={LABELS[7]}
                                            labelTitle={LABELS_TITLE[7]}
                                            allItems={status}
                                            onActiveItems={onSelectItems}/>
                                        <br/>
                                    </div>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={LABELS_ACCORDION[2]}>
                            <Accordion.Header>Proprietăți de introducere</Accordion.Header>
                            <Accordion.Body>
                                <Container fluid style={{paddingLeft: "0", paddingRight: "0"}}>
                                    <FilterIdentNumber
                                        onSelectItems={onSelectItems}/>
                                    <FilterFullName
                                        onSelectItems={onSelectItems}/>
                                    <FilterAgeBirth
                                        onSelectItems={onSelectItems}/>
                                    <FilterEmail
                                        onSelectItems={onSelectItems}/>
                                    <FilterPhoneNumber
                                        onSelectItems={onSelectItems}/>
                                    <FilterDiploma
                                        onSelectItems={onSelectItems}/>
                                    <FilterBeginStudy
                                        onSelectItems={onSelectItems}/>
                                    <FilterEndStudy
                                        onSelectItems={onSelectItems}/>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};

export default FilterProperties;