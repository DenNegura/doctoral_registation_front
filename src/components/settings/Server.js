import axios from "axios";
import Supervisor from "../domains/Supervisor";

class Server {

    static SERVER_URL = "http://localhost:8080";

    static GET_SCHOOLS_URL = this.SERVER_URL + '/api/sciences/schools';

    static GET_SUPERVISORS_URL = this.SERVER_URL + '/api/supervisors';

    static GET_SUPERVISORS_BY_SCHOOL_URL = this.GET_SUPERVISORS_URL + '/schools/';

    // static GET_DOMAINS_URL = this.SERVER_URL + '/api/';

    static async getSchools() {
        console.log("App -> all schools");
        const response = await axios.get(this.GET_SCHOOLS_URL);
        return response.data;
    }

    static async getSupervisors() {
        console.log("App -> load supervisors");
        const response = await axios.get(this.GET_SUPERVISORS_URL);
        return response.data;
    }

    static async getSupervisorsBySchoolId(id) {
        console.log("App -> load supervisors by school: " + id);
        const response = await axios
            .get(this.GET_SUPERVISORS_BY_SCHOOL_URL + id);
        return response.data;
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

export default Server;