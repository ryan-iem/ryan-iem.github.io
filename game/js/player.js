class Player {
    constructor(hp, sp, gold) {
        this.hp = hp;
        this.sp = sp;
        this.gold = gold;
    }

    getHp() {
        return this.hp();
    }

    getSp() {
        return this.sp();
    }

    getGold() {
        return this.gold();
    }

    setHp(hp) {
        this.hp = hp;
    }

    setSp(sp) {
        this.sp = sp;
    }

    setHp(hp) {
        this.gold = gold;
    }

}

export { Player };