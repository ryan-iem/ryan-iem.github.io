// import { Hand } from './Hand.js';

export class Player {
    constructor(hp, maxHp, sp, maxSp, atk, def, gold, deck, decks, hand) {
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
        this.hand = hand;
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

    // getHand() {
    //     return this.hand;
    // }

    // TODO: Not just return value, but shift/pop this mf out too?
    // TODO: Make playCard(i)
    getCardFromHand(i) {
        // Returns just a reference (for listing cards)
        return this.hand[i];
        // return this.hand.shift([i]);
    }

    getHandCount() {
        return this.hand.length;
    }

    addDeck(deck) {
        this.deck = deck;
    }

    addCardToHand(card) {
        this.hand.push(card)
    }
    
    // Find first match of ID and remove that!
    removeCardFromHand(cardId) {
        for (let i = 0; i < this.hand.length - 1; i++) {
            let card = this.hand[i];
            if (card.getId() == cardId) {
                this.hand.splice(i, 1);
                return; // stop loop once card is removed
            }
        }
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