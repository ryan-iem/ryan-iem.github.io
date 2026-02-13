// need to uncomment when publishing to github
import { Player } from './classes/Player.js';
import { Character } from './classes/Character.js';
import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import * as combat from './combat.js';

const player = new Player(10, 10, 5, 5, 3, 3, 3, null, [], []); // hp, maxHp, sp, maxSp, atk, def, gold, deck, decks, hand
const enemy = new Character(10, 10, 5, 5, 2, 2, 1, null, []);

const testCard1 = new Card("A", "Adds an extra 1 damage to your attack this turn", "buff", 1, 3)
const testCard2 = new Card("B", "Instantly heals you for 2 HP", "selfheal", 2, 2)
const testCard3 = new Card("C", "Adds an extra 1 damage to your attack this turn", "buff", 1, 3)
const testCard4 = new Card("D", "Instantly heals you for 2 HP", "selfheal", 2, 2)
const playerDeck = new Deck("Player Test eck", "For testing only!", []);
const enemyDeck = new Deck("Enemy Test Deck", "For testing only!", []);
playerDeck.addCard(testCard1);
playerDeck.addCard(testCard2);
enemyDeck.addCard(testCard3);
enemyDeck.addCard(testCard4);
player.addDeck(playerDeck);
enemy.addDeck(enemyDeck);

// CHECKING/PRINTING DATA
// player.getHp();
// alert(player.getHp());
// console.log("Card count: " + deck.getCardCount())
console.log("As player...")
console.log(" Drawing two cards and adding to player hand")
let drawnCard = player.getDeck().drawCard();
console.log(" Drawn card name: " + drawnCard.getName())
player.addCardToHand(drawnCard);
drawnCard = player.getDeck().drawCard();
console.log(" Drawn card name: " + drawnCard.getName())
player.addCardToHand(drawnCard);
player.addCardToHand(drawnCard); // THIS NEEDS TO BE REMOVED LATER
console.log(" Cards in player's deck: " + player.getDeck().getCardCount())
console.log(" Cards in player's hand: " + player.getHand().getHandCount());

// Loop to go through hand and display each card in hand[] onscreen
// TODO: Make a way to have the cards be clickable
let playerHand = player.getHand();
for (let i = 0; i < playerHand.getHandCount(); i++) {
    let card = playerHand.getCard(i);
    console.log(" Looping through Player hand: "+i);
    document.getElementById('action-cards').innerHTML += 
    "<td><a data-action:'" + card.getType() + "'>Card: " + card.getName() +
    "<br><br>Description: " + card.getDescription() + "</a></td>";
}

console.log("As enemy...")
// TODO
// console.log(" Shuffling deck")
console.log(" Drawing top card and adding to enemy hand")
drawnCard = enemy.getDeck().drawCard();
console.log(" Drawn card name: " + drawnCard.getName())
enemy.addCardToHand(drawnCard);
console.log(" Cards in enemy's deck: " + enemy.getDeck().getCardCount())
console.log(" Cards in enemy's hand: " + enemy.getHand().getHandCount())

document.getElementById('player-hp').innerHTML = player.getHp();
document.getElementById('player-sp').innerHTML = player.getSp();
document.getElementById('player-atk').innerHTML = player.getAtk();
document.getElementById('player-def').innerHTML = player.getDef();
document.getElementById('enemy-hp').innerHTML = enemy.getHp();
document.getElementById('player-gold').innerHTML = player.getGold();

// For combo related tests in the Admin Center
const wrapper = document.getElementById('admin-center');
wrapper.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON' && event.target.hasAttribute('data-action')) {
        const actionType = event.target.getAttribute('data-action');
        if (actionType == "sff") {
            combat.simulateFightLoop(player, enemy);
        } else if (actionType == "safb") {
            combat.simulateAttackFromBoth(player, enemy);
        } else if (actionType == "safp") {
            combat.simulateAttackFromPlayer(player, enemy);
        } else if (actionType == "tcs") {
            combat.testComboSystem();
        } else if (actionType == "sca") {
            let c = new AbortController();
            combat.simulateComboAttackFromPlayer(player, enemy, c)
        } else if (actionType == "rp") {
            resetPlayer();
        } else if (actionType == "re") {
            resetEnemy();
        } else if (actionType == "p1hp") {
            player1Hp();
        } else if (actionType == "e1hp") {
            enemy1Hp();
        } 
    } else {
        return;
    }
})

function resetPlayer() {
    player.receiveHp(100);
    document.getElementById('player-hp').innerHTML = player.getHp();
}

function resetEnemy() {
    enemy.receiveHp(10);
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();
}

function player1Hp() {
    player.setHp(1);
    document.getElementById('player-hp').innerHTML = player.getHp();
}

function enemy1Hp() {
    enemy.setHp(1);
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();
}