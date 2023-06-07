import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterBeginStudy = ({onSelectItems}) => {

    const LABEL = 'year_begin';

    const LABEL_TITLE = 'Data începerii studiilor';

    const [yearBegin, setYearBegin] = useState([])

    const addYearBegin = (value) => {
        value = value.replace(/[./]/g, () => '/')
        let item = new Item(value, value, null, true);
        if (FilterUtils.isDate(value) && !FilterUtils.includes(yearBegin, item)) {
            setYearBegin(yearBegin => {
                const items = [...yearBegin, item];
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
                allItems={yearBegin}
                onActiveItems={getSelectItems}
                addOption={addYearBegin}
                addTooltipOption={['Introduceți data in format: dd.mm.yyyy sau dd/mm/yyyy.']}/>
            <br/>
        </div>
    );
};

export default FilterBeginStudy;