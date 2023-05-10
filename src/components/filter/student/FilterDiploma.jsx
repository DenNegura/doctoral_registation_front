import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterDiploma = ({onSelectItems}) => {

    const LABEL = "diploma";

    const LABEL_TITLE = "Diploma seria/numar";

    const [diploma, setDiploma] = useState([]);

    const addDiploma = (value) => {
        value = value.trim();
        let item = new Item(value, value, null, true);
        if((FilterUtils.isDiplomaSeries(value) || FilterUtils.isDiplomaNumber(value)) &&
            !FilterUtils.includes(diploma, item)) {
            setDiploma(diploma => [...diploma, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={diploma}
                onActiveItems={onSelectItems}
                addOption={addDiploma}
                addTooltipOption={['Introduceți seria ALII/AMP sau numar.']}/>
            <br/>
        </div>
    );
};

export default FilterDiploma;