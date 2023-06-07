import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import FilterUtils from "../components/FilterUtils";
import Item from "../components/Item";

const FilterFullName = ({onSelectItems}) => {

    const LABEL = "full_name";

    const LABEL_TITLE = "Numele complet";

    const [fullName, setFullName] = useState([])

    const addFullName = (value) => {
        value = FilterUtils.capitalize(value);
        let item = new Item(value, value, null, true);
        if (FilterUtils.isFullName(value) && !FilterUtils.includes(fullName, item)) {
            setFullName(fullName => {
                const items = [...fullName, item];
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
                allItems={fullName}
                onActiveItems={getSelectItems}
                addOption={addFullName}
                addTooltipOption={['Introduceți numele, prenumele, al doilea prenume.']}/>
            <br/>
        </div>
    );
};

export default FilterFullName;