import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterPhoneNumber = ({onSelectItems}) => {

    const LABEL = "telephone_number";

    const LABEL_TITLE = "Număr de telefon";

    const [phoneNumber, setPhoneNumber] = useState([]);

    const addPhoneNumber = (value) => {
        value = value.trim();
        let item = new Item(value, value, null, true);
        if(FilterUtils.isPhoneNumber(value) && !FilterUtils.includes(phoneNumber, item)) {
            setPhoneNumber(phoneNumber => [...phoneNumber, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={phoneNumber}
                onActiveItems={onSelectItems}
                addOption={addPhoneNumber}
                addTooltipOption={['Introduceți numarul de telefon.']}/>
            <br/>
        </div>
    );
};

export default FilterPhoneNumber;