
export const yearList = (count, skipDate = 0, lastDate = (new Date()).getFullYear()) => {
    lastDate = lastDate - skipDate;
    return Array.from(new Array(count), (val, index) => lastDate - index);
};


export const days = Array.from(new Array(31), (val, index) => 31 - index);

export const months = ['Ianuarie', 'Februarie', 'Martie', ' Aprilie', 'Mai',
    'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

export const isValidDate = (year, month, day) => {
    return !isNaN(Date.parse(year = '/' + month + '/' + day));
}

export const searchSpeciality = () => {

}