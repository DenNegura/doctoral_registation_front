class FilterUtils {

    static sort(items) {
        return items.sort((a, b) => a.id > b.id);
    }

    static includes(list, item) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].equals(item)) {
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

    static isNumber(str) {
        return /^\d+$/.test(str);
    }

    static isYear(str) {
        return /^[12]\d{3}$/.test(str);
    }

    static parseToList(str) {
        let from = str.slice(0, 4);
        let to = str.slice(str.length - 4);
        if(this.isYear(from) && this.isYear(to)) {
            from = Number.parseInt(from);
            to = Number.parseInt(to);
            let array = [];
            for(; from < to; from++) {
                array.push(from);
            }
            return array;
        }
        return [];
    }
}

export default FilterUtils;