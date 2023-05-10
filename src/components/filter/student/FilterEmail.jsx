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
        if(FilterUtils.isEmail(value) && !FilterUtils.includes(email, item)) {
            setEmail(email => [...email, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={email}
                onActiveItems={onSelectItems}
                addOption={addEmail}
                addTooltipOption={['Introduceți email corporativ sau personal.']}/>
            <br/>
        </div>
    );
};

export default FilterEmail;