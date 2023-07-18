import React, {useEffect, useMemo, useState} from 'react';
import classes from "./Forms.module.css";
import {Card, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBox from "../../filterbox/FilterBox";
import ButtonBox from "../../controlbox/ButtonBox";
import ScrollList from "../../scrolllist/ScrollList";
import Images from "../../../../../resources/settings/Images";

const EntityListForm = ({
                            placeholder, label, items, selectItems, setSelectItems,
                            getKey, getValue, equal, maxSelectItems, invalidMessage, isValid
                        }) => {

    // CONSTANTS
    const DEFAULT_SIZE_LIST = '10em';

    const MAX_SIZE_LIST = '100%';

    const OPEN_LIST = Images.DOWN_ARROW;

    const CLOSE_LIST = Images.UP_ARROW;


    // LIST HEIGHT
    const [height, setHeight] = useState(DEFAULT_SIZE_LIST);

    const [imageArrow, setImageArrow] = useState(OPEN_LIST);


    // FILTER VALUE
    const [filterValue, setFilterValue] = useState('');

    // FUNCTIONS
    // open list of entities
    const openList = () => {
        if (height === DEFAULT_SIZE_LIST) {
            setHeight(() => MAX_SIZE_LIST);
            setImageArrow(() => CLOSE_LIST)
        } else {
            setHeight(() => DEFAULT_SIZE_LIST);
            setImageArrow(() => OPEN_LIST);
        }
    }

    // remove item from select items list
    const remove = (id) => {
        setSelectItems(items =>
            items.filter(item => item.id !== id));
    }

    // transfer item from all items list to select items list
    const transfer = (id) => {
        if (selectItems.length < maxSelectItems) {
            const select = filterItems.filter(item => item.id === id);
            if (select.length) {
                const item = select[0];
                setSelectItems(items => [...items, item]);
            }
        }
    }

    // FILTER LIST
    const filterItems = useMemo(() => {
        let itemsList = items;
        if (filterValue) {
            itemsList = itemsList.filter(item =>
                getValue(item).toLowerCase().includes(filterValue.toLowerCase()));
        }
        if (selectItems.length) {
            itemsList = itemsList
                .filter(item => !selectItems
                    .some(selectItem => equal(selectItem, item)));
        }
        return itemsList;
    }, [filterValue, selectItems, items]);


    return (
        <Card className={classes.tabCard}>
            <Card.Body>
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <Row>
                                <Col>
                                    <FilterBox
                                        onChange={setFilterValue}
                                        placeholder={placeholder}
                                    />
                                </Col>
                                <Col md={'auto'}>
                                    <ButtonBox
                                        image={imageArrow}
                                        size={'20px'}
                                        onClick={openList}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={classes.labelCol}>
                            <label>
                                {label}
                            </label>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <ScrollList
                                items={filterItems}
                                height={height}
                                onChange={e => transfer(Number(e.target.value))}
                                getValue={getValue}
                                getKey={getKey}
                            />
                        </Col>
                        <Col>
                            <ScrollList
                                items={selectItems}
                                height={height}
                                onChange={e => remove(Number(e.target.value))}
                                getValue={getValue}
                                getKey={getKey}
                                invalid={invalidMessage}
                                valid={isValid}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default EntityListForm;