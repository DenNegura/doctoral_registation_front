import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import FilterSciences from "./FilterSciences";
import FilterProperties from "./FilterProperties";

const FilterAccordion = (
    {getSchools, getDomains, getSupervisors, getCountries, requestMap, setRequestMap}) => {

    const [selectedPanels, setSelectedPanels] = useState([]);

    const onSelectedPanels = (eventKey) => {
        setSelectedPanels(eventKey);
    }

    const onSelectItems = (label, items, totalItems) => {
        if (items.length === totalItems || items.length === 0) {
            if (requestMap.has(label)) {
                requestMap.delete(label);
            }
        } else {
            requestMap.set(label, items.map(item => item.id));
        }
        setRequestMap(() => requestMap);
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