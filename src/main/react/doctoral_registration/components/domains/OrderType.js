class OrderType {

    constructor(id, order, orderSubtypes) {
        this.id = id;
        this.order = order;
        if(orderSubtypes instanceof OrderSubtype) {
            this.orderSubtypes = orderSubtypes;
        } else {
            this.orderSubtypes = orderSubtypes
                .map(order => OrderSubtype.fromObject(order))
        }
    }

    static fromFields(id, order, orderSubtypes) {
        return new OrderType(id, order, orderSubtypes);
    }

    static fromObject(object) {
        return new OrderType(object.id, object.order, object.orderSubtypes);
    }
}

class OrderSubtype {
    constructor(id, order, orderTypeId) {
        this.id = id;
        this.order = order;
        this.orderTypeId  = orderTypeId;
    }

    static fromFields(id, order, orderTypeId) {
        return new OrderSubtype(id, order, orderTypeId);
    }

    static fromObject(object) {
        return new OrderSubtype(object.id, object.order, object.orderTypeId);
    }
}

export {OrderSubtype};
export default OrderType;