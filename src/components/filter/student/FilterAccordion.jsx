import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import FilterSciences from "./FilterSciences";
import FilterProperties from "./FilterProperties";

const FilterAccordion = ({getSchools, getDomains, getSupervisors, getCountries}) => {

    const [selectedPanels, setSelectedPanels] = useState([]);

    const onSelectedPanels = (eventKey) => {
        setSelectedPanels(eventKey);
    }

    return (
        <Accordion defaultActiveKey={["school"]} alwaysOpen onSelect={onSelectedPanels}>
            <FilterSciences
                selectedPanels={selectedPanels}
                getSchools={getSchools}
                getDomains={getDomains}
                getSupervisors={getSupervisors}/>
            <FilterProperties
                getCountries={getCountries}/>
        </Accordion>
    );
};

export default FilterAccordion;