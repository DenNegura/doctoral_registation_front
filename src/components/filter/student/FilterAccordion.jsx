import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import FilterSciences from "./FilterSciences";

const FilterAccordion = ({getSchools, getDomains, getSupervisors}) => {

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
        </Accordion>
    );
};

export default FilterAccordion;