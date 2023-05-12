import React, {useState} from 'react';
import FilterAccordion from "../components/filter/student/FilterAccordion";
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const StudentFilterPage = () => {

    const SERVER = 'http://localhost:8080'

    async function getSchools() {
        const response = await axios.get(SERVER + '/api/sciences/schools')
        return response.data;
    }

    async function getDomains(schoolId) {
        const response = await axios.get(SERVER + '/api/sciences/domains/school/' + schoolId)
        return response.data;
    }

    async function getCountries() {
        const response = await axios.get(SERVER + '/api/countries')
        return response.data;
    }

    async function getSupervisorsBySchoolId(id) {
        const response = await axios.get(SERVER + '/api/supervisors/schools/' + id)
        return response.data;
    }

    const [requestMap, setRequestMap] = useState(new Map());

    const prepareMapToRequest = () => {
        let request = "?";
        requestMap.forEach((values, key) => {
            let list = values.join(',');
            request += key + "=" + list + "&";
        })
        request = request.slice(0, -1);
        console.log(request);
        return request;
    }

    return (
        <div>
            <FilterAccordion
                getSchools={getSchools}
                getDomains={getDomains}
                getSupervisors={getSupervisorsBySchoolId}
                getCountries={getCountries}
                setRequestMap={setRequestMap}>
            </FilterAccordion>
            <br/>
            <ButtonToolbar>
                <ButtonGroup className="me-2">
                    <Button onClick={prepareMapToRequest}>Lista</Button>
                    <Button>Excel</Button>
                </ButtonGroup>
                <div style={{width: "1em"}}></div>
                <ButtonGroup className="me-2">
                    <Button variant={"danger"}>Sterge filter</Button>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    );
};

export default StudentFilterPage;