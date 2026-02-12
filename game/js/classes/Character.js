export class Character {
    constructor(hp, maxHp, sp, maxSp, atk, def, gold) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.maxSp = maxSp;
        this.sp = sp;
        this.atk = atk;
        this.def = def;
        this.gold = gold;
    }

    getHp() {
        return this.hp;
    }

    getSp() {
        return this.sp;
    }

    getAtk() {
        return this.atk;
    }

    getDef() {
        return this.def;
    }

    getGold() {
        return this.gold;
    }

    // Just for testing
    setHp(hp) {
        this.hp = hp;
    }

    receiveHp(amount) {
        if ((this.hp + amount) > this.maxHp) {
            this.hp = this.maxHp;
        } else {
            this.hp = this.hp + amount;
        }
    }

    receiveDamage(damage) {

        // Damage calculation
        if (this.hp - damage >= 0) {
            // Take damage
            this.hp = this.hp - damage;
        } else {
            // Receiving unit dies
            this.hp = 0;
        }
    }

}