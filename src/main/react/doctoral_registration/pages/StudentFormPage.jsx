import React, {useEffect, useState} from 'react';
import StudentForm from "../components/inputform/student/StudentForm";
import Server from "../server/Server";
import Country from "../components/domains/Country";
import School from "../components/domains/School";
import OrderType from "../components/domains/OrderType";
import Student from "../components/domains/Student";
import ControlBox from "../components/controlbox/ControlBox";
import ButtonUp from "../components/controlbox/ButtonUp";
import {ItemsParser} from "../components/scrolllist/ScrollList";

const StudentFormPage = () => {

    const [countries, setCountries] = useState(null);

    const [schools, setSchools] = useState(null);

    const [orderTypes, setOrdersTypes] = useState(null)

    const [specialities, setSpecialities] = useState();

    const [supervisors, setSupervisors] = useState();

    const [student, setStudent] = useState(null);

    // const [visible, setVisible] = useState(false);

    useEffect(() => {
        Server.get(Server.GET_BY_ID.STUDENT, setStudent).params(22).map(Student.fromServer).build();
    }, [])

    useEffect(() => {
        Server.get(Server.GET_ALL.COUNTRIES, setCountries).map(Country.fromObject).build();
        Server.get(Server.GET_ALL.SCHOOLS, setSchools).map(School.fromObject).build();
        Server.get(Server.GET_ALL.ORDER_TYPES, setOrdersTypes).map(OrderType.fromObject).build();
    }, [])


    async function getSpecialitiesBySchoolId(id) {
        Server.get(Server.GET_BY_ID.SPECIALITIES_BY_SCHOOL, setSpecialities)
            .params(id).map(item => ItemsParser.toItem(ItemsParser.ENTITY.SPECIALITY, item)).build();
    }

    async function getSupervisorsBySchoolId(id) {
        Server.get(Server.GET_BY_ID.SUPERVISORS_BY_SCHOOL, setSupervisors)
            .params(id).map(item => ItemsParser.toItem(ItemsParser.ENTITY.SUPERVISOR, item)).build();
    }

    // const hideViewWindow = () => {
    //     setVisible(false);
    // }
    // const openViewWindow = () => {
    //     if (student) {
    //         setVisible(true);
    //     }
    // }

    return (
        <>
            <StudentForm
                student={student}
                setStudent={setStudent}
                countries={countries}
                orderTypes={orderTypes}
                schools={schools}
                specialities={specialities}
                getSpecialities={getSpecialitiesBySchoolId}
                supervisors={supervisors}
                getSupervisors={getSupervisorsBySchoolId}
            />
            {/*<StudentModalView*/}
            {/*    isVisible={visible}*/}
            {/*    onHide={hideViewWindow}*/}
            {/*    student={student}*/}
            {/*/>*/}
            <ControlBox>
                {/*<ButtonBox*/}
                {/*    image={Images.VIEW}*/}
                {/*    onClick={openViewWindow}/>*/}
                <ButtonUp/>
            </ControlBox>
        </>
    );
};

export default StudentFormPage;