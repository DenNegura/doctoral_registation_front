import './App.css';
import axios from "axios";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import SupervisorList from "./components/SupervisorList";
import FilterSciences from "./components/filter/student/FilterSciences";
import StudentForm from "./components/StudentForm";
import FilterAccordion from "./components/filter/student/FilterAccordion";
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import StudentFilterPage from "./pages/StudentFilterPage";
import SupervisorForm from "./components/SupervisorForm";

function App() {

    const SERVER = 'http://localhost:8080'

    // const [orders, setOrders] = useState([])

    let countries = [
        {id: 1, country: 'Republica Moldova'},
        {id: 2, country: 'România'},
        {id: 3, country: 'Georgia'},
        {id: 4, country: 'Grecia'},
        {id: 5, country: 'Israel'},
        {id: 6, country: 'Polonia'},
    ]

    // async function getOrderTypes() {
    //     const response = await axios.get('http://localhost:8080/api/order/types')
    //     console.log(response.data)
    //     setOrders(response.data);
    // }

    async function getData(url) {
        const response = await axios.get(url)
        //     console.log(response.data)
        return response;
    }

    const ordersJson = "[{\"id\":1,\"order\":\"Inmatriculat in anul I\",\"orderSubtypes\":[{\"id\":1,\"order\":\"Înmatriculare\"},{\"id\":2,\"order\":\"Aprobarea conducătorului\"},{\"id\":3,\"order\":\"Schimbarea conducătorului\"},{\"id\":4,\"order\":\"Aprobarea membrilor comisiei de îndrumare\"},{\"id\":5,\"order\":\"Modificarea componenței comisie de îndrumare\"},{\"id\":6,\"order\":\"Modificarea specialității\"},{\"id\":7,\"order\":\"Trasfer forma de învățământ\"},{\"id\":8,\"order\":\"Concediu academic\"},{\"id\":9,\"order\":\"Concediu boală\"},{\"id\":10,\"order\":\"Mobilitatea academică\"},{\"id\":11,\"order\":\"Exmatriculare\"},{\"id\":12,\"order\":\"Restabilire\"},{\"id\":13,\"order\":\"Promovare în anul II\"},{\"id\":14,\"order\":\"Transfer din altă instituție\"}]},{\"id\":2,\"order\":\"Inmatriculat in anul II\",\"orderSubtypes\":[{\"id\":15,\"order\":\"Înmatriculare/trasfer din altă instituție\"},{\"id\":16,\"order\":\"Aprobarea conducătorului\"},{\"id\":17,\"order\":\"Schimbarea conducătorului\"},{\"id\":18,\"order\":\"Aprobarea membrilor comisiei de îndrumare\"},{\"id\":19,\"order\":\"Modificarea componenței comisie de îndrumare\"},{\"id\":20,\"order\":\"Modificarea specialității\"},{\"id\":21,\"order\":\"Trasfer forma de învățământ\"},{\"id\":22,\"order\":\"Concediu academic\"},{\"id\":23,\"order\":\"Concediu boală\"},{\"id\":24,\"order\":\"Mobilitatea academică\"},{\"id\":25,\"order\":\"Exmatriculare\"},{\"id\":26,\"order\":\"Restabilire\"},{\"id\":27,\"order\":\"Promovare în anul III\"}]},{\"id\":3,\"order\":\"Inmatriculat in anul III\",\"orderSubtypes\":[{\"id\":28,\"order\":\"Înmatriculare/trasfer din altă instituție\"},{\"id\":29,\"order\":\"Aprobarea conducătorului\"},{\"id\":30,\"order\":\"Schimbarea conducătorului\"},{\"id\":31,\"order\":\"Aprobarea membrilor comisiei de îndrumare\"},{\"id\":32,\"order\":\"Modificarea componenței comisie de îndrumare\"},{\"id\":33,\"order\":\"Modificarea specialității\"},{\"id\":34,\"order\":\"Trasfer forma de învățământ\"},{\"id\":35,\"order\":\"Concediu academic\"},{\"id\":36,\"order\":\"Concediu boală\"},{\"id\":37,\"order\":\"Mobilitatea academică\"},{\"id\":38,\"order\":\"Exmatriculare\"},{\"id\":39,\"order\":\"Restabilire\"},{\"id\":40,\"order\":\"Promovare în anul IV\"},{\"id\":41,\"order\":\"Promovat în perioada de grație\"},{\"id\":42,\"order\":\"Susținerea publică a tezei de doctorat\"}]},{\"id\":4,\"order\":\"Inmatriculat in anul IV\",\"orderSubtypes\":[{\"id\":43,\"order\":\"Înmatriculare/trasfer din altă instituție\"},{\"id\":44,\"order\":\"Aprobarea conducătorului\"},{\"id\":45,\"order\":\"Schimbarea conducătorului\"},{\"id\":46,\"order\":\"Aprobarea membrilor comisiei de îndrumare\"},{\"id\":47,\"order\":\"Modificarea componenței comisie de îndrumare\"},{\"id\":48,\"order\":\"Modificarea specialității\"},{\"id\":49,\"order\":\"Trasfer forma de învățământ\"},{\"id\":50,\"order\":\"Concediu academic\"},{\"id\":51,\"order\":\"Concediu boală\"},{\"id\":52,\"order\":\"Mobilitatea academică\"},{\"id\":53,\"order\":\"Exmatriculare\"},{\"id\":54,\"order\":\"Restabilire\"},{\"id\":55,\"order\":\"Promovat în perioada de grație\"},{\"id\":56,\"order\":\"Susținerea publică a tezei de doctorat\"}]},{\"id\":5,\"order\":\"Exmatriculat\",\"orderSubtypes\":[{\"id\":57,\"order\":\"Pentru restanțe academice\"},{\"id\":58,\"order\":\"Din propria inițiativă\"},{\"id\":59,\"order\":\"Nerevenire din concediu academic\"},{\"id\":60,\"order\":\"Pentru neachitarea taxei\"},{\"id\":61,\"order\":\"Susținerea tezei înainte de termen\"},{\"id\":62,\"order\":\"Finalizarea perioadei de studii\"},{\"id\":63,\"order\":\"Alte motive\"}]},{\"id\":6,\"order\":\"Transfer\",\"orderSubtypes\":[{\"id\":64,\"order\":\"la alta specialitate\"},{\"id\":65,\"order\":\"forma de studii frecvență\"},{\"id\":66,\"order\":\"forma de studii frecvență redusă\"}]},{\"id\":7,\"order\":\"Schimbare datele personale\",\"orderSubtypes\":[{\"id\":67,\"order\":\"Numele de familie\"},{\"id\":68,\"order\":\"Prenumele\"},{\"id\":69,\"order\":\"Patronimicul\"}]},{\"id\":8,\"order\":\"Revocare\",\"orderSubtypes\":[{\"id\":70,\"order\":\"Revocare ordin\"}]}]";
    // const schoolsJson =
    const orders = JSON.parse(ordersJson);
    //console.log(orders)

    const schoolsJson = "[{\"id\":1,\"name\":\"Științe Biologice, Geonomice, Chimice și Tehnologice\",\"scienceDomains\":[{\"id\":1,\"number\":1,\"name\":\"Științe ale naturii\",\"scienceSchoolId\":1,\"scienceBranches\":[{\"id\":14,\"name\":\"Ştiinţe chimice\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":141,\"name\":\"Chimie anorganică\",\"scienceBranchId\":14,\"specialities\":[{\"id\":141.01,\"name\":\"Chimie anorganică\",\"scienceProfileId\":141,\"students\":[]},{\"id\":141.02,\"name\":\"Chimie coordinativă\",\"scienceProfileId\":141,\"students\":[]}]},{\"id\":143,\"name\":\"Chimie organică\",\"scienceBranchId\":14,\"specialities\":[{\"id\":143.01,\"name\":\"Chimie organică\",\"scienceProfileId\":143,\"students\":[]},{\"id\":143.04,\"name\":\"Chimie bioorganică ,chimia compușilor naturali și filozofic activi\",\"scienceProfileId\":143,\"students\":[]}]},{\"id\":145,\"name\":\"Chimie ecologică\",\"scienceBranchId\":14,\"specialities\":[{\"id\":145.01,\"name\":\"Chimie ecologică\",\"scienceProfileId\":145,\"students\":[]}]}]},{\"id\":15,\"name\":\"Științe geonomice\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":153,\"name\":\"Geografie\",\"scienceBranchId\":15,\"specialities\":[{\"id\":153.05,\"name\":\"Meteorologie, climatologie, agroclimatologi\",\"scienceProfileId\":153,\"students\":[]}]},{\"id\":155,\"name\":\"Pedologie\",\"scienceBranchId\":15,\"specialities\":[{\"id\":155.01,\"name\":\"Pedologie\",\"scienceProfileId\":155,\"students\":[]}]}]},{\"id\":16,\"name\":\"Ştiinţe biologice\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":162,\"name\":\"Genetică\",\"scienceBranchId\":16,\"specialities\":[{\"id\":162.01,\"name\":\"Genetică vegetal\",\"scienceProfileId\":162,\"students\":[]}]},{\"id\":163,\"name\":\"Biologie celulară\",\"scienceBranchId\":16,\"specialities\":[{\"id\":163.01,\"name\":\"Biologie molecular\",\"scienceProfileId\":163,\"students\":[]},{\"id\":163.04,\"name\":\"Microbiologie\",\"scienceProfileId\":163,\"students\":[]}]},{\"id\":164,\"name\":\"Biologie vegetală\",\"scienceBranchId\":16,\"specialities\":[{\"id\":164.01,\"name\":\"Botanică\",\"scienceProfileId\":164,\"students\":[]},{\"id\":164.02,\"name\":\"Fiziologie vegetală\",\"scienceProfileId\":164,\"students\":[]}]},{\"id\":165,\"name\":\"Biologia omului și animalelor\",\"scienceBranchId\":16,\"specialities\":[{\"id\":165.01,\"name\":\"Fiziologia omului și animalelor\",\"scienceProfileId\":165,\"students\":[]},{\"id\":165.02,\"name\":\"Zoologie\",\"scienceProfileId\":165,\"students\":[]},{\"id\":165.03,\"name\":\"Ihtiologie\",\"scienceProfileId\":165,\"students\":[]},{\"id\":165.04,\"name\":\"Entomologie\",\"scienceProfileId\":165,\"students\":[]}]},{\"id\":166,\"name\":\"Ecologia și protecția mediului\",\"scienceBranchId\":16,\"specialities\":[{\"id\":166.01,\"name\":\"Ecologie\",\"scienceProfileId\":166,\"students\":[]},{\"id\":166.02,\"name\":\"Protecţia mediului şi folosirea raţională a resurselor naturale\",\"scienceProfileId\":166,\"students\":[]}]},{\"id\":167,\"name\":\"Biotehnologie\",\"scienceBranchId\":16,\"specialities\":[{\"id\":167.01,\"name\":\"Biotehnologie, bionanotehnologie\",\"scienceProfileId\":167,\"students\":[]}]}]},{\"id\":11,\"name\":\"Matematică\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":111,\"name\":\"Matematică pură\",\"scienceBranchId\":11,\"specialities\":[{\"id\":111.03,\"name\":\"Logică matematică, algebră și teoria numerelor\",\"scienceProfileId\":111,\"students\":[]}]},{\"id\":112,\"name\":\"Matematică aplicată\",\"scienceBranchId\":11,\"specialities\":[{\"id\":112.03,\"name\":\"Cibernetică matematică și cercetări operaționale\",\"scienceProfileId\":112,\"students\":[]}]}]},{\"id\":12,\"name\":\"Ştiinţa informaţiei\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":121,\"name\":\" Informatică teoretică\",\"scienceBranchId\":12,\"specialities\":[{\"id\":121.03,\"name\":\"Programarea calculatoarelor\",\"scienceProfileId\":121,\"students\":[]},{\"id\":122.03,\"name\":\"Modelare, metode matematice, produse program\",\"scienceProfileId\":121,\"students\":[]}]}]},{\"id\":13,\"name\":\"Ştiinţe fizice\",\"scienceDomainId\":1,\"scienceProfiles\":[{\"id\":131,\"name\":\"Fizică teoretic\",\"scienceBranchId\":13,\"specialities\":[{\"id\":131.03,\"name\":\"Fizică statistică și cinetică\",\"scienceProfileId\":131,\"students\":[]}]},{\"id\":133,\"name\":\"Fizica sistemelor macroscopice\",\"scienceBranchId\":13,\"specialities\":[{\"id\":133.04,\"name\":\"Fizica stării solide\",\"scienceProfileId\":133,\"students\":[]}]},{\"id\":134,\"name\":\"Ecologia și protecția mediului\",\"scienceBranchId\":13,\"specialities\":[{\"id\":134.01,\"name\":\"Fizica și tehnologia materialelor\",\"scienceProfileId\":134,\"students\":[]}]}]}]}]},{\"id\":2,\"name\":\"Științe Fizice, Matematice, ale Informației și Inginerești\",\"scienceDomains\":[{\"id\":2,\"number\":1,\"name\":\"Științe ale naturii\",\"scienceSchoolId\":2,\"scienceBranches\":[{\"id\":23,\"name\":\"Inginerie electronică și a informației\",\"scienceDomainId\":2,\"scienceProfiles\":[{\"id\":232,\"name\":\"Calculatoare și tehnologii informaționale\",\"scienceBranchId\":23,\"specialities\":[{\"id\":232.02,\"name\":\"Tehnologii, produse și sisteme informațional\",\"scienceProfileId\":232,\"students\":[]}]}]}]},{\"id\":3,\"number\":2,\"name\":\"Științe inginerești și tehnologii \",\"scienceSchoolId\":2,\"scienceBranches\":[]}]},{\"id\":3,\"name\":\"Științe Economice\",\"scienceDomains\":[{\"id\":4,\"number\":5,\"name\":\"Științe sociale și economice\",\"scienceSchoolId\":3,\"scienceBranches\":[{\"id\":52,\"name\":\"Ştiinţe economice\",\"scienceDomainId\":4,\"scienceProfiles\":[{\"id\":521,\"name\":\"Economie, business, administrar\",\"scienceBranchId\":52,\"specialities\":[{\"id\":521.01,\"name\":\"Teorie economică și politici economice\",\"scienceProfileId\":521,\"students\":[]},{\"id\":521.02,\"name\":\"Economie mondială; relații economice internaționale\",\"scienceProfileId\":521,\"students\":[]},{\"id\":521.03,\"name\":\"Economie și management în domeniul de activitate\",\"scienceProfileId\":521,\"students\":[]},{\"id\":521.04,\"name\":\"Marketing și logistică\",\"scienceProfileId\":521,\"students\":[]}]},{\"id\":522,\"name\":\"Finanțe, contabilitate, analiză economică\",\"scienceBranchId\":52,\"specialities\":[{\"id\":522.01,\"name\":\"Finanțe\",\"scienceProfileId\":522,\"students\":[]},{\"id\":522.02,\"name\":\"Contabilitate; audit; analiză economică\",\"scienceProfileId\":522,\"students\":[]}]}]}]}]},{\"id\":4,\"name\":\"Științe Juridice\",\"scienceDomains\":[{\"id\":5,\"number\":5,\"name\":\"Științe sociale și economice\",\"scienceSchoolId\":4,\"scienceBranches\":[{\"id\":55,\"name\":\"Ştiinţe juridice\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":551,\"name\":\"Economie, business, administrar\",\"scienceBranchId\":55,\"specialities\":[{\"id\":551.01,\"name\":\"Teoria generală a dreptului\",\"scienceProfileId\":551,\"students\":[]}]},{\"id\":552,\"name\":\"Drept public\",\"scienceBranchId\":55,\"specialities\":[{\"id\":552.01,\"name\":\"Drept constituțional\",\"scienceProfileId\":552,\"students\":[]},{\"id\":552.02,\"name\":\"Drept administrativ\",\"scienceProfileId\":552,\"students\":[]},{\"id\":552.03,\"name\":\"Drept financiar (bancar, fiscal, vamal)\",\"scienceProfileId\":552,\"students\":[]},{\"id\":552.07,\"name\":\"Drept contravenţional\",\"scienceProfileId\":552,\"students\":[]},{\"id\":552.08,\"name\":\"Drept internațional și european public\",\"scienceProfileId\":552,\"students\":[]}]},{\"id\":553,\"name\":\"Drept privat\",\"scienceBranchId\":55,\"specialities\":[{\"id\":553.01,\"name\":\"Drept civil\",\"scienceProfileId\":553,\"students\":[]},{\"id\":553.02,\"name\":\"Dreptul afacerilor\",\"scienceProfileId\":553,\"students\":[]},{\"id\":553.03,\"name\":\"Drept procesual civil\",\"scienceProfileId\":553,\"students\":[]},{\"id\":553.04,\"name\":\"Dreptul familiei\",\"scienceProfileId\":553,\"students\":[]},{\"id\":553.05,\"name\":\"Dreptul muncii și protecției sociale\",\"scienceProfileId\":553,\"students\":[]},{\"id\":553.06,\"name\":\"Drept internațional și european privat\",\"scienceProfileId\":553,\"students\":[]}]},{\"id\":554,\"name\":\"Drept penal\",\"scienceBranchId\":55,\"specialities\":[{\"id\":554.01,\"name\":\"Drept penal şi execuţional penal\",\"scienceProfileId\":554,\"students\":[]},{\"id\":554.02,\"name\":\"Criminologie\",\"scienceProfileId\":554,\"students\":[]},{\"id\":554.03,\"name\":\"Drept procesual penal\",\"scienceProfileId\":554,\"students\":[]},{\"id\":554.04,\"name\":\"Criminalistică, expertiza judiciară, investigații operative\",\"scienceProfileId\":554,\"students\":[]}]}]},{\"id\":51,\"name\":\"Psihologie\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":511,\"name\":\"Drept penal\",\"scienceBranchId\":51,\"specialities\":[{\"id\":511.01,\"name\":\"Psihologie generală\",\"scienceProfileId\":511,\"students\":[]}]}]},{\"id\":53,\"name\":\"Științe ale educației\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":531,\"name\":\"Pedagogie generală\",\"scienceBranchId\":53,\"specialities\":[{\"id\":531.01,\"name\":\"Teoria generală a educației\",\"scienceProfileId\":531,\"students\":[]}]},{\"id\":533,\"name\":\"Pedagogie profesională\",\"scienceBranchId\":53,\"specialities\":[{\"id\":533.01,\"name\":\"Pedagogie universitară\",\"scienceProfileId\":533,\"students\":[]},{\"id\":533.03,\"name\":\"Pedagogia adulţilor\",\"scienceProfileId\":533,\"students\":[]}]}]},{\"id\":54,\"name\":\"Sociologie\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":541,\"name\":\"Sociologie\",\"scienceBranchId\":54,\"specialities\":[{\"id\":541.01,\"name\":\"Teoria și metodologia sociologiei\",\"scienceProfileId\":541,\"students\":[]},{\"id\":541.02,\"name\":\"Structură socială, instituții și procese sociale\",\"scienceProfileId\":541,\"students\":[]}]},{\"id\":542,\"name\":\"Asistență socială\",\"scienceBranchId\":54,\"specialities\":[{\"id\":542.01,\"name\":\"Teoria și practica asistenței sociale\",\"scienceProfileId\":542,\"students\":[]}]}]},{\"id\":56,\"name\":\"Științe politice\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":561,\"name\":\"Politologie\",\"scienceBranchId\":56,\"specialities\":[{\"id\":561.01,\"name\":\"Teoria, metodologia și istoria politologiei; instituții și procese politice\",\"scienceProfileId\":561,\"students\":[]}]},{\"id\":562,\"name\":\"Relații internaționale\",\"scienceBranchId\":56,\"specialities\":[{\"id\":562.01,\"name\":\"Teoria și metodologia relațiilor internaționale și a diplomației\",\"scienceProfileId\":562,\"students\":[]},{\"id\":562.02,\"name\":\"Istoria relaţiilor internaţionale şi politicii externe\",\"scienceProfileId\":562,\"students\":[]},{\"id\":562.03,\"name\":\"Probleme și strategii ale dezvoltării globale și regionale\",\"scienceProfileId\":562,\"students\":[]}]},{\"id\":563,\"name\":\"Ştiinţe administrative\",\"scienceBranchId\":56,\"specialities\":[{\"id\":563.01,\"name\":\"Teoria, metodologia administraţiei publice\",\"scienceProfileId\":563,\"students\":[]},{\"id\":563.02,\"name\":\"Organizarea şi dirijarea în instituţiile administraţiei publice; servicii publice\",\"scienceProfileId\":563,\"students\":[]}]}]},{\"id\":57,\"name\":\"Media şi comunicare\",\"scienceDomainId\":5,\"scienceProfiles\":[{\"id\":571,\"name\":\"Jurnalism şi comunicare\",\"scienceBranchId\":57,\"specialities\":[{\"id\":571.01,\"name\":\"Jurnalism şi procese mediatice\",\"scienceProfileId\":571,\"students\":[]},{\"id\":571.02,\"name\":\"Comunicare și relații publice\",\"scienceProfileId\":571,\"students\":[]},{\"id\":611.02,\"name\":\"Istoria românilor (pe perioade)\",\"scienceProfileId\":571,\"students\":[]},{\"id\":611.07,\"name\":\"Istoria științei și tehnicii (pe domenii)\",\"scienceProfileId\":571,\"students\":[]}]},{\"id\":572,\"name\":\"Științe ale informării și documentări\",\"scienceBranchId\":57,\"specialities\":[{\"id\":572.02,\"name\":\"Infodocumentare; biblioteconomie și știința informării\",\"scienceProfileId\":572,\"students\":[]}]}]}]}]},{\"id\":5,\"name\":\"Științe Sociale și ale Educației\",\"scienceDomains\":[{\"id\":6,\"number\":5,\"name\":\"Științe sociale și economice\",\"scienceSchoolId\":5,\"scienceBranches\":[{\"id\":61,\"name\":\"Istorie şi arheologie\",\"scienceDomainId\":6,\"scienceProfiles\":[{\"id\":611,\"name\":\"Istorie\",\"scienceBranchId\":61,\"specialities\":[]},{\"id\":612,\"name\":\"Etnologie\",\"scienceBranchId\":61,\"specialities\":[{\"id\":612.01,\"name\":\"Etnologie\",\"scienceProfileId\":612,\"students\":[]}]},{\"id\":613,\"name\":\"Arheologie\",\"scienceBranchId\":61,\"specialities\":[{\"id\":613.01,\"name\":\"Arheologie\",\"scienceProfileId\":613,\"students\":[]}]}]},{\"id\":62,\"name\":\"Filologie\",\"scienceDomainId\":6,\"scienceProfiles\":[{\"id\":621,\"name\":\"Științe ale limbajului\",\"scienceBranchId\":62,\"specialities\":[{\"id\":621.03,\"name\":\"Fonetică şi fonologie; dialectologie; istoria limbii; sociolingvistică; etnolingvistică (cu specificarea limbii după caz)\",\"scienceProfileId\":621,\"students\":[]},{\"id\":621.04,\"name\":\"Lexicologie şi lexicografie; terminologie şi limbaje specializate; traductologie (cu specificarea limbii după caz)\",\"scienceProfileId\":621,\"students\":[]},{\"id\":621.05,\"name\":\"Semiotică; semantică; pragmatică (cu specificarea limbii după caz)\",\"scienceProfileId\":621,\"students\":[]},{\"id\":621.06,\"name\":\"Teoria textului; analiza discursului; stilistică (cu specificarea limbii, după caz – limba franceză)\",\"scienceProfileId\":621,\"students\":[]}]},{\"id\":622,\"name\":\"Literatură\",\"scienceBranchId\":62,\"specialities\":[{\"id\":622.01,\"name\":\"Literatura română\",\"scienceProfileId\":622,\"students\":[]},{\"id\":622.03,\"name\":\"Teoria literaturii\",\"scienceProfileId\":622,\"students\":[]},{\"id\":622.04,\"name\":\"Folcloristică\",\"scienceProfileId\":622,\"students\":[]}]}]},{\"id\":63,\"name\":\"Filosofie\",\"scienceDomainId\":6,\"scienceProfiles\":[{\"id\":631,\"name\":\"Filosofie\",\"scienceBranchId\":63,\"specialities\":[{\"id\":631.01,\"name\":\"Ontologie și gnoseologie\",\"scienceProfileId\":631,\"students\":[]},{\"id\":631.02,\"name\":\"Filosofie istorică\",\"scienceProfileId\":631,\"students\":[]},{\"id\":631.05,\"name\":\"Filosofie socială, antropologie filosofică și filosofia culturii\",\"scienceProfileId\":631,\"students\":[]}]}]}]}]},{\"id\":6,\"name\":\"Științe Umanistice\",\"scienceDomains\":[{\"id\":7,\"number\":6,\"name\":\"Științe umaniste\",\"scienceSchoolId\":6,\"scienceBranches\":[]}]}]";

    // const schools = JSON.parse(schoolsJson);

    const [specialities, setSpecialities] = useState([]);

    const [supervisors, setSupervisors] = useState(null);

    const [student, setStudent] = useState();

    async function getSpecialitiesBySchoolId(id) {
        console.log("StudentForm ---> load specialities")
        const response = await axios.get( SERVER+'/api/sciences/specialities/schools/' + id)
        setSpecialities(response.data.map(item => {
            return {id: item.id, value: item.id + ' ' + item.name}
        }));
    }


    const [schools, setSchools] = useState([])

    const [domains, setDomains] = useState([])

    async function getSchools() {
        console.log("App -> all schools")
        const response = await axios.get(SERVER + '/api/sciences/schools')
        // setSchools(response.data);
        return response.data;
    }

    // async function getDomains(schoolId) {
    //     console.log("App -> all domains")
    //     const response = await axios.get(SERVER + '/api/sciences/domains')
    //     //setDomains(response.data);
    //     return response.data;
    // }
    async function getDomains(schoolId) {
        console.log("App -> all domains")
        const response = await axios.get(SERVER + '/api/sciences/domains/school/' + schoolId)
        //setDomains(response.data);
        return response.data;
    }

    async function getCountries() {
        console.log("App -> all countries")
        const response = await axios.get(SERVER + '/api/countries')
        return response.data;
    }

    async function getSupervisorsBySchoolId(id) {
        console.log("App -> load supervisors")
        const response = await axios.get(SERVER + '/api/supervisors/schools/' + id)
        // setSupervisors(response.data.map(item => {
        //     return {
        //         id: item.id,
        //         value: item.firstName + ' ' + item.lastName + ', ' + item.post + ', ' + item.speciality
        //     }
        // }));
        return response.data;
    }

    const [studentPrint, setStudentPrint] = useState(null);

    async function getStudentById(id) {
        console.log("StudentForm ---> load student " + id)
        const response = await axios.get(SERVER + '/api/students/' + id)
        console.log(response.data);
        setStudentPrint(response.data);
    }


    return (
        <div style={{"margin": "40px 10%"}}>
            {/*<StudentFilterPage/>*/}
            <SupervisorForm getSchools={getSchools}/>
        </div>
    );
}

export default App;
