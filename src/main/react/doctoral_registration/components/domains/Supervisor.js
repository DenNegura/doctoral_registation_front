class Supervisor {

    constructor(id, firstName, lastName, post, speciality, scienceSchoolId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.post = post;
        this.speciality = speciality;
        this.scienceSchoolId = scienceSchoolId;
    }

    static fromObject(object) {
        return new Supervisor(object.id, object.firstName, object.lastName,
            object.post, object.speciality, object.scienceSchoolId);
    }

    copy(s) {
        this.id = s.id;
        this.firstName = s.firstName;
        this.lastName = s.lastName;
        this.post = s.post;
        this.speciality = s.speciality;
        this.scienceSchoolId = s.scienceSchoolId;
    }
}

export default Supervisor;