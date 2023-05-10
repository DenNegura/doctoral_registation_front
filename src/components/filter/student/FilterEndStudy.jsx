import React, {useState} from 'react';
import Item from "../components/Item";
import FilterUtils from "../components/FilterUtils";
import FilterItem from "../components/FilterItem";

const FilterEndStudy = ({onSelectItems}) => {

    const LABEL = 'year_end';

    const LABEL_TITLE = 'Data închierii studiilor';

    const [yearEnd, setYearEnd] = useState([])

    const addYearEnd = (value) => {
        value = value.replace(/[./]/g, () => '/')
        let item = new Item(value, value, null, true);
        if(FilterUtils.isDate(value) && !FilterUtils.includes(yearEnd, item)) {
            setYearEnd(yearEnd => [...yearEnd, item]);
        }
    }

    return (
        <div>
            <FilterItem
                label={LABEL}
                labelTitle={LABEL_TITLE}
                allItems={yearEnd}
                onActiveItems={onSelectItems}
                addOption={addYearEnd}
                addTooltipOption={['Introduceți data in format: dd.mm.yyyy sau dd/mm/yyyy.']}/>
            <br/>
        </div>
    );
};

export default FilterEndStudy;