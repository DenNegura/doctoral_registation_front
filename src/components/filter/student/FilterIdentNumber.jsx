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
        if(FilterUtils.isIdentificationNumber(value) && !FilterUtils.includes(identNumber, item)) {
            setIdentNumber(identNumber => [...identNumber, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={identNumber}
                onActiveItems={onSelectItems}
                addOption={addIdentNumber}
                addTooltipOption={['Introduceți numarul de identitate.']}/>
            <br/>
        </div>
    );
};

export default FilterIdentNumber;