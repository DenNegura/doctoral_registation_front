import './App.css';
import React, {useState} from "react";
import {Nav} from "react-bootstrap";
import StudentFilterPage from "./main/react/doctoral_registration/pages/StudentFilterPage";
import SupervisorPage from "./main/react/doctoral_registration/pages/SupervisorPage";
import StudentFormPage from "./main/react/doctoral_registration/pages/StudentFormPage";
import classes from "./main/resources/styles/Pages.module.css"

function App() {

    const [filter, setFilter] = useState(false)
    const [add, setAdd] = useState(true)
    const [superv, setSuperv] = useState(false)

    const openFilter = () => {
        if (!filter) {
            setAdd(false)
            setSuperv(false)
            setFilter(true)
        }
    }

    const openAdd = () => {
        if (!add) {
            setFilter(false)
            setSuperv(false)
            setAdd(true)
        }
    }

    const openSuperv = () => {
        if (!superv) {
            setFilter(false)
            setAdd(false)
            setSuperv(true)
        }
    }

    const onSelect = (key) => {
        if (key === 'filter') {
            openFilter();
        }
        if (key === 'add') {
            openAdd();
        }
        if (key === 'superv') {
            openSuperv()
        }
    }
    return (
        <div className={classes.fonts}>
            <Nav
                activeKey="/home"
                onSelect={onSelect}
            >
                <Nav.Item>
                    <Nav.Link eventKey={"filter"}>Filter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="add">Inregistrarea Studentului</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="superv">Professori</Nav.Link>
                </Nav.Item>
            </Nav>
            <div style={{"margin": "40px 5%"}}>
                {filter ? <StudentFilterPage/> : <></>}
                {add ? <StudentFormPage/> : <></>}
                {superv ? <SupervisorPage/> : <></>}
            </div>
        </div>
    );
}

export default App;
