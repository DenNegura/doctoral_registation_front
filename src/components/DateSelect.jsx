import React, {useMemo, useState} from 'react';
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const DateSelect = ({count, setDate, minAge = null, maxAge = (new Date()).getFullYear()}) => {

    count = Number(count)

    if(minAge == null) {
        if(count) {
            minAge = maxAge - count;
        } else {
            minAge = maxAge - 10;
        }
    }

    const defaultYear = maxAge > (new Date()).getFullYear() ? (new Date()).getFullYear() : maxAge;

    const defaultMouth = (new Date()).getMonth();

    const defaultDay = (new Date()).getDate();

    const getLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    const years = Array.from(new Array(maxAge - minAge), (val, index) => maxAge - index);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const months = [
        {id: 0, name: 'Ianuarie', size: 31},
        {id: 1, name: 'Februarie', size: 29},
        {id: 2, name: 'Martie', size: 31},
        {id: 3, name: 'Aprilie', size: 30},
        {id: 4, name: 'Mai', size: 31},
        {id: 5, name: 'Iunie', size: 30},
        {id: 6, name: 'Iulie', size: 31},
        {id: 7, name: 'August', size: 31},
        {id: 8, name: 'Septembrie', size: 30},
        {id: 9, name: 'Octombrie', size: 31},
        {id: 10, name: 'Noiembrie', size: 30},
        {id: 11, name: 'Decembrie', size: 31}];


    const [year, setYear] = useState(defaultYear);

    const [month, setMonth] = useState(defaultMouth);

    const [day, setDay] = useState(defaultDay);

    const days = useMemo(() => {
            const selectedMonth = months.filter(m => m.id === month).at(0);
            let size;
            if (selectedMonth.id === 1) {
                if (getLeapYear(year)) {
                    size = 29;
                } else {
                    size = 28;
                }
            } else {
                size = selectedMonth.size;
            }
            return Array.from(new Array(size), (val, index) => size - index);
        },
        [month, months, year])

    return (
        <Form.Group md={"4"}>
            <InputGroup>
                <InputGroup.Text>An</InputGroup.Text>
                <Form.Select
                    defaultValue={defaultYear}
                    onChange={e => {
                        const value = Number(e.target.value);
                        setYear(value);
                        setDate(new Date(value, month, day));
                    }}
                >
                    {
                        years.map(year => {
                            return <option key={year} value={year}>
                                {year}
                            </option>
                        })
                    }
                </Form.Select>
                <InputGroup.Text>Luna</InputGroup.Text>
                <Form.Select
                    defaultValue={defaultMouth}
                    onChange={e => {
                        const value = Number(e.target.value);
                        setMonth(value);
                        setDate(new Date(year, value, day));
                    }}
                >
                    {
                        months.map(month => {
                            return <option key={month.id} value={month.id}>
                                {month.id + 1 + '. ' + month.name}
                            </option>
                        })
                    }
                </Form.Select>
                <InputGroup.Text>Zi</InputGroup.Text>
                <Form.Select
                    defaultValue={defaultDay}
                    onChange={e => {
                        const value = Number(e.target.value);
                        setDay(value);
                        setDate(new Date(year, month, value));
                    }}
                >
                    {
                        days.map(day => {
                            return <option key={day} value={day}>
                                {day}
                            </option>
                        })
                    }
                </Form.Select>
            </InputGroup>
        </Form.Group>
    );
};

export default DateSelect;