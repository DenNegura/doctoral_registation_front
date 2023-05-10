import React, {useState} from 'react';
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";
import FilterItem from "../components/FilterItem";

const FilterAgeBirth = ({onSelectItems}) => {

    const LABEL = "age_birth";

    const LABEL_TITLE = "Anul nașterii";

    const [ageBirth, setAgeBirth] = useState([]);

    const addAgeBirth = (value) => {
        value = value.trim();
        let item = new Item(value, value, null, true);
        if(FilterUtils.isYear(value) && !FilterUtils.includes(ageBirth, item)) {
            setAgeBirth(ageBirth => [...ageBirth, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={ageBirth}
                onActiveItems={onSelectItems}
                addOption={addAgeBirth}
                addTooltipOption={['Introduceți anul.']}/>
            <br/>
        </div>
    );
};

export default FilterAgeBirth;