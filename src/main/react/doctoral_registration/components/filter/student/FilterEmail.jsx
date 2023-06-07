import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterEmail = ({onSelectItems}) => {

    const LABEL = 'email';

    const LABEL_TITLE = 'Email';

    const [email, setEmail] = useState([])

    const addEmail = (value) => {
        let item = new Item(value, value, null, true);
        if (FilterUtils.isEmail(value) && !FilterUtils.includes(email, item)) {
            setEmail(email => {
                const items = [...email, item];
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
                allItems={email}
                onActiveItems={getSelectItems}
                addOption={addEmail}
                addTooltipOption={['Introduceți email corporativ sau personal.']}/>
            <br/>
        </div>
    );
};

export default FilterEmail;