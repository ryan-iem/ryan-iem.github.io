// TODO: Figure out a way to determine buff cards from debuff cards..
// TODO: Add an ID to each card?
// TODO: Update 'type' to 'action' and keep 'type' for element or something in the future
export class Card {
    constructor(id, name, description, type, input, value, cost, costStat, hitCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.input = input;
        this.value = value; // how much the attack will deal/heal
        this.cost = cost; // STAT COST (how much it costs)
        this.costStat = costStat; // STAY TO PAY (from what it costs)
        this.hitCount = hitCount;  // how many times this will "hit" (activate)
    }

    getId() {
        return this.id;
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

    getCostStat() {
        return this.costStat;
    }

    getHitCount() {
        return this.hitCount;
    }

    setValue(value) {
        this.value = value;
    }

    setHitCount(hitCount) {
        this.hitCount = hitCount;
    }

}