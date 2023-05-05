
class STUDENT_PROPERTIES {
    static REGISTRATION = [
        {id: 'ENROLLED', value: 'Inmatriculat'},
        {id: 'TRANSFERRED', value: 'Transferat'},
        {id: 'REINSTATED', value: 'Restabilit'},
    ]

    static GENDER = [
        {id: 'M', value: 'Masculin'},
        {id: 'F', value: 'Feminin'},
    ]

    static FINANCING = [
        {id: 'BUDGET', value: 'Budget'},
        {id: 'CONTRACT', value: 'Taxă'},
    ]

    static STUDY_TYPE = [
        {id: 'FREQUENCY', value: 'Frecvență'},
        {id: 'LOW_FREQUENCY', value: 'Frecvență redusă'},
    ]

    static YEAR_STUDY = [
        {id: 'I', value: 'Anul I'},
        {id: 'II', value: 'Anul II'},
        {id: 'III', value: 'Anul III'},
        {id: 'IV', value: 'Anul IV'},
        {id: 'EXTRA_I', value: 'Grație I-II'},
        {id: 'EXTRA_II', value: 'Grație II'},
    ]

    static STATUS = [
        {id: 'ACTIVE', value: 'Active'},
        {id: 'INACTIVE', value: 'Inactive'},
    ]
}

export default STUDENT_PROPERTIES;