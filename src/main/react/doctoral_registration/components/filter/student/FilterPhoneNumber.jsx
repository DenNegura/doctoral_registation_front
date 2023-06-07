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
        if (FilterUtils.isPhoneNumber(value) && !FilterUtils.includes(phoneNumber, item)) {
            setPhoneNumber(phoneNumber => {
                const items = [...phoneNumber, item];
                getSelectItems(LABEL, items);
                return items;
            });
        }
    }

    const getSelectItems = (label, items) => {
        const activeItems = FilterUtils.getActiveItems(items);
        if (!activeItems.length) {
            onSelectItems(label, items, 0);
        } else {
            onSelectItems(label, activeItems, 0);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={phoneNumber}
                onActiveItems={getSelectItems}
                addOption={addPhoneNumber}
                addTooltipOption={['Introduceți numarul de telefon.']}/>
            <br/>
        </div>
    );
};

export default FilterPhoneNumber;