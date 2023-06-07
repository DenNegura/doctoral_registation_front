import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterIdentNumber = ({onSelectItems}) => {

    const LABEL = 'ident_number';

    const LABEL_TITLE = 'Numărul de identitate';

    const [identNumber, setIdentNumber] = useState([])

    const addIdentNumber = (value) => {
        let item = new Item(value, value, null, true);
        if (FilterUtils.isIdentificationNumber(value) && !FilterUtils.includes(identNumber, item)) {
            setIdentNumber(identNumber => {
                const items = [...identNumber, item];
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
                allItems={identNumber}
                onActiveItems={getSelectItems}
                addOption={addIdentNumber}
                addTooltipOption={['Introduceți numarul de identitate.']}/>
            <br/>
        </div>
    );
};

export default FilterIdentNumber;