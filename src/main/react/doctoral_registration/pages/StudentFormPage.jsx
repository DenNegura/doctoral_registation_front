import React, {useEffect, useState} from 'react';
import ControlBox from "../components/controlbox/ControlBox";
import ButtonUp from "../components/controlbox/ButtonUp";
import StudentFormNew from "../components/inputform/student/StudentFormNew";
import Server from "../server/Server";
import Student from "../components/domains/Student";

const StudentFormPage = () => {

        const [student, setStudent] = useState();

        useEffect(() => {
            Server.get(Server.GET_BY_ID.STUDENT, setStudent).params(21).map((data) => {
                console.log(data);
                return Student.fromServer(data);
            }).build();
        }, [])

        if(!student) {
            return;
        }
        return (
            <>
                <StudentFormNew
                    student={student}
                    setStudent={setStudent}
                />
                <ControlBox>
                    <ButtonUp/>
                </ControlBox>
            </>
        );
    }
;

export default StudentFormPage;