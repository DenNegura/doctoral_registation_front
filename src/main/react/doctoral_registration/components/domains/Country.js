class Country {

    id;

    country;

    static fromObject(object) {
        const country = new Country();
        Object.assign(country, object)
        return country;
    }
}

export default Country;