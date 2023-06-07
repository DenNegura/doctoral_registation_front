class DateParser {
    constructor(format, delimiter) {
        this.format = format;
        this.delimiter = delimiter;
    }

    toString(date) {
        const day = String(date.getDate()).padStart(this.format.D, '0');
        const month = String(date.getMonth() + 1).padStart(this.format.M, '0');
        const year = String(date.getFullYear());
        return this.format.TO
            .replace('d', day + this.delimiter)
            .replace('m', month + this.delimiter)
            .replace('y', year);
    }

    toDate(string) {
        const date = string.split(this.delimiter);
        const day = Number(date[this.format.TO.indexOf('d')]);
        const month = Number(date[this.format.TO.indexOf('m')]) - 1;
        const year = Number(date[this.format.TO.indexOf('y')]);
        return new Date(year, month, day)
    }

    static FORMAT = {
        DD_MM_YYYY: {D: 2, M: 2, TO: 'dmy'},
        MM_DD_YYYY: {D: 2, M: 2, TO: 'mdy'},
        YYYY_MM_DD: {D: 2, M: 2, TO: 'ymd'},
    }

    static DELIMITER = {
        SPACE: ' ',
        SLASH: '/',
        POINT: '.',
        DASH: '-',
    }
}

export default DateParser;