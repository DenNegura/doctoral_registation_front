import DateParser from "../../utils/DateParser";

class Order {
    id;

    number;

    date;

    orderSubtypeId;

    orderTypeId;

    orderSubtype;

    orderType;

    static fromObject(object) {
        const order = new Order();
        Object.assign(order, object);
        return order;
    }
}

class Speciality {
    id;

    name;

    scienceProfile;

    scienceBranch;

    scienceDomain;

    scienceSchoolId;

    scienceSchool;

    static fromObject(object) {
        const speciality = new Speciality();
        Object.assign(speciality, object)
        return speciality;
    }
}

class Student {

    static Order = Order;

    static Speciality = Speciality;

    id;

    corporateEmail;

    firstName;

    lastName;

    patronymicName;

    yearBirth;

    identNumber;

    gender;

    citizenship;

    diplomaSeries;

    diplomaNumber;

    personalEmail;

    phoneNumber;

    status;

    registration;

    yearStudy;

    beginStudies;

    endStudies;

    studyType;

    financing;

    remark;

    scienceTopic;

    supervisor;

    orders = [];

    speciality;

    steeringCommittee = [];

    static fromServer(object) {
        const student = Student.fromObject(object);
        const dateParser =
            new DateParser(DateParser.FORMAT.YYYY_MM_DD, DateParser.DELIMITER.DASH);
        student.orders = student.orders.map(order => {
            return {...order, date: dateParser.toDate(order.date)}
        });
        student.beginStudies = dateParser.toDate(student.beginStudies);
        student.endStudies = dateParser.toDate(student.endStudies);
        return student;
    }

    static toServer(object) {
        return Student.fromObject(object);
    }
    static fromObject(object) {
        const student = new Student();
        Object.assign(student, object);
        return student;
    }

    static getConstants() {
        return {
            REGISTRATION: [
                {id: 'ENROLLED', value: 'Inmatriculat'},
                {id: 'TRANSFERRED', value: 'Transferat'},
                {id: 'REINSTATED', value: 'Restabilit'},
            ],
            GENDER: [
                {id: 'M', value: 'Masculin'},
                {id: 'F', value: 'Feminin'},
            ],
            FINANCING: [
                {id: 'BUDGET', value: 'Budget'},
                {id: 'CONTRACT', value: 'Taxă'},
            ],
            STUDY_TYPE: [
                {id: 'FREQUENCY', value: 'Frecvență'},
                {id: 'LOW_FREQUENCY', value: 'Frecvență redusă'},
            ],
            YEAR_STUDY: [
                {id: 'I', value: 'Anul I'},
                {id: 'II', value: 'Anul II'},
                {id: 'III', value: 'Anul III'},
                {id: 'IV', value: 'Anul IV'},
                {id: 'EXTRA_I', value: 'Grație I-II'},
                {id: 'EXTRA_II', value: 'Grație II'},
            ],
            STATUS: [
                {id: 'ACTIVE', value: 'Active'},
                {id: 'INACTIVE', value: 'Inactive'},
            ],

            getByConstId: (constanta, property) => {
                if(property) {
                    const e = constanta.filter(e => e.id === property);
                    if(e.length) {
                        return e[0];
                    }
                }
                return '';
            }
        }
    }
}

export default Student;