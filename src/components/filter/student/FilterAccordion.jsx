import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import FilterSciences from "./FilterSciences";

const FilterAccordion = ({getSchools, getDomains, getBranches, getProfiles, getSpecialities}) => {

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
                getBranches={getBranches}
                getProfiles={getProfiles}
                getSpecialities={getSpecialities}/>
        </Accordion>
    );
};

export default FilterAccordion;