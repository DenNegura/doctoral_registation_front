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
        return /^20\d{2}$/.test(str);
    }
}

export default FilterUtils;