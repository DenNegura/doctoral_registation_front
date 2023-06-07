import Settings from "../../../../../resources/settings/Settings";

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
}

export default Item;