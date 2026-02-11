class Character {
    constructor(hp, sp, atk, def, gold) {
        this.hp = hp;
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

    setHp(hp) {
        this.hp = hp;
    }

    setSp(sp) {
        this.sp = sp;
    }

    setAtk(atk) {
        this.atk = atk;
    }

    setDef(def) {
        this.def = def;
    }

    setGold(gold) {
        this.gold = gold;
    }

    // I feel like an object shouldn't be able to edit another object's values - should the object should do it itself..? 
    // Look into OOP Encapsulation (changes should be done by ONE'S OWN methods, etc.)
    attack(enemy) {
        // Damage calculation
        let atk = this.atk;
        let enemyHp = enemy.getHp();
        let calculation = enemyHp - atk;

        if (calculation >= 0) {
            // alert("The enemy takes "+atk+" damage!")
            enemy.receiveAttack(atk);
            // return atk;
        } else {
            enemy.setHp(0);
        }
    }

    receiveAttack(damage) {
        this.hp = this.hp - damage;
    }

}