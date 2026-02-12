// TODO: Figure out a way to determine buff cards from debuff cards..
export class Card {
    constructor(name, description, type, value, cost) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.value = value;
        this.cost = cost;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    getCost() {
        return this.cost;
    }

}