import React, {useState} from 'react';
import FilterItem from "../components/FilterItem";
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";

const FilterBeginStudy = ({onSelectedItems}) => {

    const LABEL = 'year_begin';

    const LABEL_TITLE = 'Data începerii studiilor';

    const [yearBegin, setYearBegin] = useState([])

    const addYearBegin = (value) => {
        value = value.replace(/[./]/g, () => '/')
        let item = new Item(value, value, null, true);
        if(FilterUtils.isDate(value) && !FilterUtils.includes(yearBegin, item)) {
            setYearBegin(yearBegin => [...yearBegin, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={yearBegin}
                onActiveItems={onSelectedItems}
                addOption={addYearBegin}
                addTooltipOption={['Introduceți data in format: dd.mm.yyyy sau dd/mm/yyyy']}/>
            <br/>
        </div>
    );
};

export default FilterBeginStudy;