export class Hand {
    // Note: hands is an array
    constructor(hand) {
        this.hand = [];
    }

    getHand() {
        return this.hand;
    }

    getHandCount() {
        return this.hand.length;
    }

    getCard(i) {
        return this.hand[i];
    }

    addCard(card) {
        this.hand.push(card)
    }

}

