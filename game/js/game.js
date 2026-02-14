// need to uncomment when publishing to github
import { Player } from './classes/Player.js';
import { Character } from './classes/Character.js';
import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import * as combat from './combat.js';

const player = new Player(10, 10, 5, 5, 3, 3, 3, null, [], []); // hp, maxHp, sp, maxSp, atk, def, gold, deck, decks, hand
const enemy = new Character(15, 15, 5, 5, 3, 2, 1, null, []);

// Note: Combos require a 'spacebar' press at the end!!!
const testCard1 = new Card("A", "Adds an extra 2 damage to your attack this turn", "buff", "ArrowUp,ArrowRight, ", 2, 3) // name, desc, type (TBC to action), comboId (if any), value (+/- action), cost (SP)
const testCard2 = new Card("B", "Instantly heals you for 2 HP", "selfheal", "'ArrowUp','ArrowDown','ArrowDown',' '", 2, 2)
const testCard3 = new Card("C", "Adds an extra 2 damage to your attack this turn", "buff", "'ArrowUp','ArrowRight',' '", 2, 3)
const testCard4 = new Card("D", "Instantly heals you for 2 HP", "selfheal", "'ArrowUp','ArrowDown','ArrowDown',' '", 2, 2)
const playerDeck = new Deck("Player Test Deck", "For testing only!", []);
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
console.log(" Cards in player's hand: " + player.getHandCount());

// Loop to go through hand and display each card in hand[] onscreen
// TODO: Make a way to have the carvds be clickable
// TODO: Add a way to track cards (ID?)
for (let i = 0; i < player.getHandCount(); i++) {
    let card = player.getCardFromHand(i)
    console.log(" Looping through Player hand: "+i);
    document.getElementById('action-cards').innerHTML += 
    "<td value='"+ i +"'class='action-card' data-action='" + card.getType() + "'><b>Card: " + card.getName() +
    "</b><br><br>Cost: " + card.getCost() + "<br><br>" + card.getDescription() + "</td>";
}

console.log("");
console.log("As enemy...")
// TODO
// console.log(" Shuffling deck")
console.log(" Drawing top card and adding to enemy hand")
drawnCard = enemy.getDeck().drawCard();
console.log(" Drawn card name: " + drawnCard.getName())
enemy.addCardToHand(drawnCard);
console.log(" Cards in enemy's deck: " + enemy.getDeck().getCardCount())
console.log(" Cards in enemy's hand: " + enemy.getHandCount())

document.getElementById('player-hp').innerHTML = player.getHp();
document.getElementById('player-sp').innerHTML = player.getSp();
document.getElementById('player-atk').innerHTML = player.getAtk();
document.getElementById('player-def').innerHTML = player.getDef();
document.getElementById('enemy-hp').innerHTML = enemy.getHp();
document.getElementById('player-gold').innerHTML = player.getGold();

// Will be filled with the selected card from hand (on website)
let card;

console.log("");
// For action-cards and picking a card
// Must be done after the cards have been drawn on screen
// TODO: Fix so you can click on the <b> part too :(
// TODO: Calculation so player doesn't just select everything. Only let them select up to their current SP
const cardWrapper = document.getElementById('action-cards');
cardWrapper.addEventListener('click', (event) => {
    if (event.target.nodeName === 'TD' && event.target.hasAttribute('data-action')) {
        
        // TODO: Loop through this and blah blah
        // To reset selected card (if there is one)
        let actionCards = document.getElementsByClassName('action-card');
        for (const actionCard of actionCards) {
            actionCard.style = "background-color: none;"; 
        }
        let actionType = event.target.getAttribute('data-action');
        
        // So we know which card to actually grab from the hand
        let cardIndex = event.target.getAttribute('value');
        console.log("Selected card ID: "+ cardIndex)

        if (actionType == "buff") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Buff card selected");
            // TODO: Don't pull the card out of array yet. Just get a reference
        } else if (actionType == "selfheal") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Self heal card selected");
        } 
        // console.log("  Card Input String: "+ card.getInput());
        event.target.style = "background-color: rgb(211, 234, 255);";    
    } else {
        console.log("Nope");
        return;
    }
})

// For combo related tests in the Admin Center
const adminWrapper = document.getElementById('admin-center');
adminWrapper.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON' && event.target.hasAttribute('data-action')) {
        let actionType = event.target.getAttribute('data-action');
        if (actionType == "sff") {
            combat.simulateFightLoop(player, enemy);
        } else if (actionType == "safb") {
            combat.simulateAttackFromBoth(player, enemy);
        } else if (actionType == "safp") {
            combat.simulateAttackFromPlayer(player, enemy);
        } else if (actionType == "attack") {
            combat.simulateAttackFromPlayer(player, enemy);
        } else if (actionType == "awc") {
            // Make sure they've selected a card for this test!
            if (card) {
                let c = new AbortController();
                combat.simulateBuffCardComboAttackFromPlayer(player, enemy, c, card)
            } else {
                alert("No card selected!");
                return;
            }
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
    enemy.receiveHp(15);
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