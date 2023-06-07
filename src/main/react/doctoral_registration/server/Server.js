import axios from "axios";


class Server {

    static SERVER_URL = "http://localhost:8081/api";

    static SCIENCES_URL = Server.SERVER_URL + '/sciences';

    static GET_ALL = {
        SCHOOLS: this.SCIENCES_URL + '/schools',
        DOMAINS: this.SCIENCES_URL + '/domains',
        SPECIALITIES: this.SCIENCES_URL + '/specialities', 
        COUNTRIES: this.SERVER_URL + '/countries', 
        SUPERVISORS: this.SERVER_URL + '/supervisors', 
        ORDER_TYPES: this.SERVER_URL + '/orders/types', 
        STUDENTS: this.SERVER_URL + '/students', 
    }

    static GET_BY_ID = {
        SUPERVISORS_BY_SCHOOL: this.GET_ALL.SUPERVISORS + '/schools/',
        SPECIALITIES_BY_SCHOOL: this.GET_ALL.SPECIALITIES + '/schools/',
        DOMAINS_BY_SCHOOL: this.GET_ALL.DOMAINS + '/school/',
        STUDENT: this.GET_ALL.STUDENTS + '/',
    }

    static FILTER = {
        STUDENTS: this.GET_ALL.STUDENTS + '/filter',
    }

    static STRATEGY = {
        WRITE: 1,
        ADD: 2,
    }

    static POSITION = {
        START: 1,
        END: 2,
    }

    static async request(path) {
        const response = await axios.get(path);
        return response.data;
    }

    static get(path, setEntities) {
        return new RequestBuilder(path, setEntities);
    }

    static async updateSupervisor(s) {
        return {
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            post: s.post,
            speciality: s.speciality,
            scienceSchoolId: s.scienceSchoolId,
        };
    }

    static async createSupervisor(s) {
        return {
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            post: s.post,
            speciality: s.speciality,
            scienceSchoolId: s.scienceSchoolId,
        };
    }
}

class RequestBuilder {

    constructor(path, setEntities) {
        this._path = path;
        this._strategy = Server.STRATEGY.WRITE;
        this._position = Server.POSITION.END;
        this._set = setEntities;
        this._fun = undefined;
    }

    params(params) {
        this._path += params;
        return this;
    }

    strategy(strategy, position = Server.POSITION.END) {
        this._strategy = strategy;
        if(this._strategy === Server.STRATEGY.ADD) {
            this._position = position;
        }
        return this;
    }

    map(fun) {
        this._fun = fun;
        return this;
    }


    build() {
        const useMap = (list) =>
            this._fun ? Array.isArray(list) ? list.map(this._fun) : this._fun(list) : list;

        const usePosition = (items, list) =>
            // eslint-disable-next-line react-hooks/rules-of-hooks
            this._position === Server.POSITION.END ? [...items, ...useMap(list)] : [...list, useMap(list)];

        Server.request(this._path).then(list => {
            // eslint-disable-next-line default-case
            switch (this._strategy) {
                case Server.STRATEGY.WRITE: {
                    this._set(() => useMap(list));
                    break;
                }
                case Server.STRATEGY.ADD: {
                    this._set(items => usePosition(items, list))
                }
            }
        });
    }
}

export default Server;