class Supervisor {

    constructor(id, firstName, lastName, post, speciality, scienceSchoolId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.post = post;
        this.speciality = speciality;
        this.scienceSchoolId = scienceSchoolId;
    }

    static create(e) {
        return new Supervisor(e.id, e.firstName, e.lastName,
            e.post, e.speciality, e.scienceSchoolId);
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