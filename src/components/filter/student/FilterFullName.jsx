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
        if(FilterUtils.isFullName(value) && !FilterUtils.includes(fullName, item)) {
            setFullName(fullName => [...fullName, item]);
        }
    }

    return (
        <div>
          <FilterItem
              label={LABEL}
              labelTitle={LABEL_TITLE}
              allItems={fullName}
              onActiveItems={onSelectItems}
              addOption={addFullName}
              addTooltipOption={['Introduceți numele, prenumele, al doilea prenume.']}/>
            <br/>
        </div>
    );
};

export default FilterFullName;