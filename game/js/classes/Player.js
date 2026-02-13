import { Hand } from './Hand.js';

export class Player {
    constructor(hp, maxHp, sp, maxSp, atk, def, gold, deck, decks) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.maxSp = maxSp;
        this.sp = sp;
        this.atk = atk;
        this.def = def;
        this.gold = gold;
        // Change to array?
        this.deck = deck;
        this.decks = decks;
        this.hand = new Hand();
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

    getDeck() {
        return this.deck;
    }

    getDecks() {
        return this.decks;
    }

    getHand() {
        return this.hand;
    }

    addDeck(deck) {
        this.deck = deck;
    }

    addCardToHand(card) {
        this.hand.addCard(card)
    }

    // Just for testing (remove on launch)
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