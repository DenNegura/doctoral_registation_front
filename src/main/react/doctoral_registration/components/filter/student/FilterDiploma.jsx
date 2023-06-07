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
        if ((FilterUtils.isDiplomaSeries(value) || FilterUtils.isDiplomaNumber(value)) &&
            !FilterUtils.includes(diploma, item)) {
            setDiploma(diploma => {
                const items = [...diploma, item];
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
                allItems={diploma}
                onActiveItems={getSelectItems}
                addOption={addDiploma}
                addTooltipOption={['Introduceți seria ALII/AMP sau numar.']}/>
            <br/>
        </div>
    );
};

export default FilterDiploma;