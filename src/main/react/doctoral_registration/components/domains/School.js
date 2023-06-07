class School {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromFields(id, name) {
        return new School(id, name);
    }

    static fromObject(object) {
        return new School(object.id, object.name);
    }
}

export default School;