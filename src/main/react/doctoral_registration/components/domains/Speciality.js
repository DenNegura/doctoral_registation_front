class Speciality {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromFields(id, name) {
        return new Speciality(id, name);
    }

    static fromObject(object) {
        return new Speciality(object.id, object.name);
    }
}

export default Speciality;