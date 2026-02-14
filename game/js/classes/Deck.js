// TODO: Figure out a way to determine buff cards from debuff cards..
export class Deck {
    // Note: cards is an array
    constructor(name, description, cards) {
        this.name = name;
        this.description = description;
        this.cards = [];
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    // TODO: Replace with draw card.. right?
    // getCards() {
    //     return this.cards;
    // }

    getCardCount() {
        return this.cards.length;
    }

    // TODO. To be done after all cards are added (or on certain triggers)
    // shuffle() {

    // }

    // Draw top card
    drawCard() {
        if (this.cards.length > 0) {
            // Grabs first element in deck (top card)
            return this.cards.shift();
            // Grabs last element in deck (technically the bottom card)
            // return this.cards.pop();
        } else {
            // TODO: Logic to not allow you to draw?
            return null;
        }
    }

    addCard(card) {
        this.cards.push(card);
    }

    shuffle() {
        let currentIndex = this.cards.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex], this.cards[currentIndex]];
        }
    }

}