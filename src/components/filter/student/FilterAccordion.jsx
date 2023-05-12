import React, {useEffect, useState} from 'react';
import {Accordion} from "react-bootstrap";
import FilterSciences from "./FilterSciences";
import FilterProperties from "./FilterProperties";

const FilterAccordion = ({getSchools, getDomains, getSupervisors, getCountries, setRequestMap}) => {

    const [selectedPanels, setSelectedPanels] = useState([]);

    const [params, setParams] = useState(new Map());

    const onSelectedPanels = (eventKey) => {
        setSelectedPanels(eventKey);
    }

    const onSelectItems = (label, items, totalItems) => {
        if(items.length === totalItems || items.length === 0) {
            if(params.has(label)) {
                params.delete(label);
            }
        } else {
            params.set(label, items.map(item => item.id));
        }
        setRequestMap(params);
    }

    return (
        <Accordion defaultActiveKey={["school"]} alwaysOpen onSelect={onSelectedPanels}>
            <FilterSciences
                selectedPanels={selectedPanels}
                getSchools={getSchools}
                getDomains={getDomains}
                getSupervisors={getSupervisors}
                onSelectItems={onSelectItems}/>
            <FilterProperties
                getCountries={getCountries}
                onSelectItems={onSelectItems}/>
        </Accordion>
    );
};

export default FilterAccordion;