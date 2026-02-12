// need to uncomment when publishing to github
import { Player } from './classes/Player.js';
import { Character } from './classes/Character.js';
import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import * as combat from './combat.js';

const player = new Player(10, 10, 5, 5, 3, 3, 3, null); // hp, maxHp, sp, maxSp, atk, def, gold
const enemy = new Character(10, 10, 5, 5, 2, 2, 1, null);

const testCard1 = new Card("A", "Adds extra amage to your attack", "buff", 1, 3)
const testCard2 = new Card("B", "Heals you", "selfheal", 2, 2)
const playerDeck = new Deck("Player Deck", "For testing only!", []);
const enemyDeck = new Deck("Test Deck", "For testing only!", []);
playerDeck.addCard(testCard1);
playerDeck.addCard(testCard2);
enemyDeck.addCard(testCard1);
enemyDeck.addCard(testCard2);
player.addDeck(playerDeck);
enemy.addDeck(enemyDeck);

// CHECKING/PRINTING DATA
// player.getHp();
// alert(player.getHp());
// console.log("Card count: " + deck.getCardCount())
console.log("As player...")
console.log(" Drawing top card")
let drawnCard = player.getDeck().drawCard();
console.log(" Drawn card name: " + drawnCard.getName())
console.log(" Cards in player's deck: " + player.getDeck().getCardCount())

console.log("As enemy...")
// TODO
// console.log(" Shuffling deck")
console.log(" Drawing top card")
drawnCard = enemy.getDeck().drawCard(); // BUG: This is drawing from the same deck as player..?
console.log(" Drawn card name: " + drawnCard.getName())
console.log(" Cards in enemy's deck: " + enemy.getDeck().getCardCount())

document.getElementById('player-hp').innerHTML = player.getHp();
document.getElementById('player-sp').innerHTML = player.getSp();
document.getElementById('player-atk').innerHTML = player.getAtk();
document.getElementById('player-def').innerHTML = player.getDef();
document.getElementById('enemy-hp').innerHTML = enemy.getHp();
// document.getElementById('player-gold').innerHTML = player.getGold();

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