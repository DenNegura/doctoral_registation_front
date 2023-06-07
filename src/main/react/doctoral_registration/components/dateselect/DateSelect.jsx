import React, {useMemo} from 'react';
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const DateSelect = ({
                        count, setDate, defaultDate,
                        minAge = null, maxAge = (new Date()).getFullYear()
                    }) => {

    count = Number(count)

    if (!(defaultDate instanceof Date && !isNaN(defaultDate))) {
        defaultDate = new Date();
    }

    if (minAge === null) {
        if (count) {
            minAge = maxAge - count;
        } else {
            minAge = maxAge - 10;
        }
    }

    if (minAge > defaultDate.getFullYear()) {
        minAge = defaultDate.getFullYear() - 2;
    }


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


    const days = useMemo(() => {
            const selectedMonth =
                months.filter(m => m.id === defaultDate.getMonth()).at(0);
            let size;
            if (selectedMonth.id === 1) {
                if (getLeapYear(defaultDate.getFullYear())) {
                    size = 29;
                } else {
                    size = 28;
                }
            } else {
                size = selectedMonth.size;
            }
            return Array.from(new Array(size), (val, index) => size - index);
        },
        [months, defaultDate])

    return (
        <Form.Group md={"4"}>
            <InputGroup>
                <Form.Select
                    value={defaultDate.getDate()}
                    onChange={e =>
                        setDate(new Date(defaultDate.getFullYear(), defaultDate.getMonth(), Number(e.target.value)))}
                >
                    {
                        days.map(day => {
                            return <option key={day} value={day}>
                                {day}
                            </option>
                        })
                    }
                </Form.Select>
                <Form.Select
                    value={defaultDate.getMonth()}
                    onChange={e =>
                        setDate(new Date(defaultDate.getFullYear(), Number(e.target.value), defaultDate.getDate()))}
                >
                    {
                        months.map(month => {
                            return <option key={month.id} value={month.id}>
                                {month.id + 1 + '. ' + month.name}
                            </option>
                        })
                    }
                </Form.Select>
                <Form.Select
                    value={defaultDate.getFullYear()}
                    onChange={e =>
                        setDate(new Date(Number(e.target.value), defaultDate.getMonth(), defaultDate.getDate()))}
                >
                    {
                        years.map(year => {
                            return <option key={year} value={year}>
                                {year}
                            </option>
                        })
                    }
                </Form.Select>
            </InputGroup>
        </Form.Group>
    );
};

export default DateSelect;