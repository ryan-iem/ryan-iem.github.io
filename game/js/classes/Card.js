// TODO: Figure out a way to determine buff cards from debuff cards..
// TODO: Add an ID to each card?
// TODO: Update 'type' to 'action' and keep 'type' for element or something in the future
export class Card {
    constructor(name, description, type, input, value, cost) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.input = input;
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

    getInput() {
        return this.input;
    }

    getValue() {
        return this.value;
    }

    getCost() {
        return this.cost;
    }

}