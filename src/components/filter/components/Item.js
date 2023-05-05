import Settings from "./settings";

class Item {

    static activeColor = Settings.ACTIVE_COLOR;

    static disableColor = Settings.DISABLE_COLOR;

    static mouseEnterColor = Settings.MOUSE_ENTER_COLOR;

    constructor(id, value, parentId = null, isActive = false,
                isVisible = true, isMouseEnter = false) {
        this.id = id;
        this.value = value;
        this.parentId = parentId;
        this.isActive = isActive;
        this.isVisible = isVisible;
        this.isMouseEnter = isMouseEnter;
    }

    color() {
        return this.isMouseEnter ? Item.mouseEnterColor :
            this.isActive ? Item.activeColor : Item.disableColor;
    }

    setActive(isActive) {
        this.isActive = isActive;
    }

    setVisible(isVisible) {
        this.isVisible = isVisible;
        if (this.isVisible === false) {
            this.setActive(false);
        }
    }

    setMouseEnter(isMouseEnter) {
        this.isMouseEnter = isMouseEnter;
    }

    equals(item) {
        return this.id === item.id && this.value === item.value;
    }

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
}

export default Item;