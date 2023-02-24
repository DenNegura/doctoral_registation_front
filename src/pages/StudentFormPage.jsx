import React, {useEffect, useState} from 'react';
import axios from "axios";
import StudentForm from "../components/StudentForm";

const StudentFormPage = () => {

    const [countries, setCountries] = useState([{id: 0, country: ""}]);

    const [schools, setSchools] = useState([{id: 0, name: ""}]);

    const [orders, setOrders] = useState([{id: 0, order: "", orderSubtypes:[{id: 0, order: ""}]}])

    const [specialities, setSpecialities] = useState();

    const [supervisors, setSupervisors] = useState();

    const [student, setStudent] = useState();



    useEffect(() => {
        console.log("StudentForm ---> load counties")
        console.log("StudentForm ---> load schools")
        console.log("StudentForm ---> load orders")
        async function getData() {
            let response = await axios.get('http://localhost:8080/api/countries');
            setCountries(response.data);
            response = await axios.get('http://localhost:8080/api/sciences/schools');
            setSchools(response.data);
            response = await axios.get('http://localhost:8080/api/orders/types');
            setOrders(response.data);
        }
        getData();
    }, [])


    async function getSpecialitiesBySchoolId(id) {
        console.log("StudentForm ---> load specialities")
        const response = await axios.get('http://localhost:8080/api/sciences/specialities/schools/' + id)
        setSpecialities(response.data.map(item => {
            return {id: item.id, value: item.id + ' ' + item.name}
        }));
    }

    async function getSupervisorsBySchoolId(id) {
        console.log("StudentForm ---> load supervisors")
        const response = await axios.get('http://localhost:8080/api/supervisors/schools/' + id)
        setSupervisors(response.data.map(item => {
            return {
                id: item.id,
                value: item.firstName + ' ' + item.lastName + ', ' + item.post + ', ' + item.speciality
            }
        }));
    }


    return (
        <StudentForm
            student={student}
            setStudent={setStudent}
            countries={countries}
            orders={orders}
            schools={schools}
            specialities={{items: specialities, get: getSpecialitiesBySchoolId}}
            supervisors={{items: supervisors, get: getSupervisorsBySchoolId}}
        />
    );
};

export default StudentFormPage;