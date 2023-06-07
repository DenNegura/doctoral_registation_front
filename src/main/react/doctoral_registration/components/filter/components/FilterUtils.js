class FilterUtils {

    static sort(items) {
        return items.sort((a, b) => a.id > b.id);
    }

    static includes(list, item) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].equals(item)) {
                return true;
            }
        }
        return false;
    }

    static getVisibleItems(list) {
        return list.filter(item => item.isVisible);
    }

    static getActiveItems(list) {
        return list.filter(item => item.isActive);
    }

    static capitalize(str) {
        return str.toLowerCase()
            .replace(/\b\w/g, (match) => match.toUpperCase());
    }

    static isNumber(str) {
        return /^\d+$/.test(str);
    }

    static isDay(str) {
        if (this.isNumber(str)) {
            let num = Number.parseInt(str);
            console.log(num)
            if (num > 0 && num < 32) {
                return true;
            }
        }
        return false;
    }

    static isMouth(str) {
        if (this.isNumber(str)) {
            let num = Number.parseInt(str);
            if (num > 0 && num < 13) {
                return true;
            }
        }
        return false;
    }

    static isYear(str) {
        if (this.isNumber(str)) {
            let num = Number.parseInt(str);
            if (num > 1940 && num < new Date().getFullYear() - 15) {
                return true;
            }
        }
        return false;
    }

    static isFullName(str) {
        return /^([A-Za-z-]+ )*[A-Za-z-]+$/.test(str);
    }

    static isDate(str) {
        let date = str.split(/([./])\s*/);
        console.log(date)
        if (date.length === 5) {
            if (this.isDay(date[0]) &&
                this.isMouth(date[2]) &&
                this.isYear(date[4])) {
                return true;
            }
        }
        return false;
    }

    static isEmail(str) {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(str);
    }

    static isIdentificationNumber(str) {
        return true;
    }

    static isDiplomaNumber(str) {
        return true;
    }

    static isDiplomaSeries(str) {
        return true;
    }

    static isPhoneNumber(str) {
        return true;
    }
}

export default FilterUtils;