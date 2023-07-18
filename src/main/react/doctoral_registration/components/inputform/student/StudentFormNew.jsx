import React, {useState} from 'react';
import PersonalDataForm from "./PersonalDataForm";
import StepsBrowser, {Label} from "../../stepsbrowser/StepsBrowser";
import Separator from "../../separator/Separator";
import MatriculationForm from "./MatriculationForm";
import ScienceSchoolForm from "./ScienceSchoolForm";
import OrderForm from "./OrderForm";
import ScienceTopicForm from "./ScienceTopicForm";
import SaveForm from "./SaveForm";
import Student from "../../domains/Student";

const StudentFormNew = ({student, setStudent}) => {

    const [studentBox, setStudentBox] = useState(() => {
        if (student) {
            return Student.fromObject(student);
        } else {
            return new Student();
        }
    });

    const [labels, setLabels] = useState([
        new Label('Date personale',
            () => setOpenForm(() => PERSONAL_DATA_FORM), true),
        new Label('Inmatriculare',
            () => setOpenForm(() => MATRICULATION_FORM)),
        new Label('Scoala doctorala',
            () => setOpenForm(() => SCHOOL_FORM)),
        new Label('Ordin',
            () => setOpenForm(() => ORDER_FORM)),
        new Label('Tema de cercetare',
            () => setOpenForm(() => SCIENCE_TOPIC_FORM)),
        new Label('Confirare',
            () => setOpenForm(() => SAVE_FORM)),
    ]);

    const PERSONAL_DATA_FORM = 1;

    const MATRICULATION_FORM = 2;

    const SCHOOL_FORM = 3;

    const ORDER_FORM = 4;

    const SCIENCE_TOPIC_FORM = 5;

    const SAVE_FORM = 6;

    const [openForm, setOpenForm] = useState(MATRICULATION_FORM);

    const [isAutoValidate, setAutoValidate] = useState(0);

    const changeStatus = (status, label) => {
        const updateLabels = (label, status) => {
            return labels.map(item => {
                if (item.label === label.label) {
                    item.status = status;
                    return item;
                }
                return item;
            })
        }

        if (status === false) {
            setLabels(updateLabels(label, Label.ERROR));
        } else if (status === true) {
            setLabels(updateLabels(label, Label.SUCCESS))
        } else if (status === undefined) {
            setLabels(updateLabels(label, Label.EXCLAMATION))
        }
    }

    return (
        <div>
            <StepsBrowser labels={labels}/>
            <Separator height={"2em"}/>
            <PersonalDataForm
                visible={openForm === PERSONAL_DATA_FORM}
                student={studentBox}
                setStudent={setStudentBox}
                autoValidate={isAutoValidate}
                setStatus={(status) => changeStatus(status, labels[0])}
            />
            <MatriculationForm
                visible={openForm === MATRICULATION_FORM}
                student={studentBox}
                setStudent={setStudentBox}
                autoValidate={isAutoValidate}
                setStatus={(status) => changeStatus(status, labels[1])}
            />
            <ScienceSchoolForm
                visible={openForm === SCHOOL_FORM}
                student={studentBox}
                setStudent={setStudentBox}
                autoValidate={isAutoValidate}
                setStatus={(status) => changeStatus(status, labels[2])}
            />
            <OrderForm
                visible={openForm === ORDER_FORM}
                student={studentBox}
                setStudent={setStudentBox}
                autoValidate={isAutoValidate}
                setStatus={(status) => changeStatus(status, labels[3])}
            />
            <ScienceTopicForm
                visible={openForm === SCIENCE_TOPIC_FORM}
                student={studentBox}
                setStudent={setStudentBox}
                autoValidate={isAutoValidate}
                setStatus={(status) => changeStatus(status, labels[4])}
            />
            <SaveForm
                visible={openForm === SAVE_FORM}
                labels={labels}
                student={studentBox}
                setStudent={setStudentBox}
                setOpenForm={setOpenForm}
                autoValidate={isAutoValidate}
                setAutoValidate={setAutoValidate}
                setStatus={(status) => changeStatus(status, labels[5])}
            />
        </div>
    );
};

export default StudentFormNew;