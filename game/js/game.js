// need to uncomment when publishing to github
import { Player } from './classes/Player.js';
import { Character } from './classes/Character.js';
import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import * as combat from './combat.js';

// TODO: Remove DEF?
const player = new Player(10, 10, 5, 5, 2, 3, 3, null, [], [], 0); // hp, maxHp, sp, maxSp, atk, def, gold, deck, decks, hand, buffAtk
const enemy = new Character(15, 15, 5, 5, 3, 2, 1, null, [], 0); // hp, maxHp, sp, maxSp, atk, def, gold, deck, hand, buffAtk

// IDEA: Weapon has set cards based on type. Then, player can add their own cards (magic, buffs, etc?)
// Note: Combos require a 'spacebar' press at the end!!!
// IDEA: INFINITE BUFF CARD USAGE BUT ONLY ONE ATTACK CARD USAGE
// IDEA: Always have a normal basic attack available 
// id, name, desc, type (TBC to action), input (if any), value (how much it will X), STAT COST, STAT TO PAY (HP, SP, GOLD, etc), hitCount (how many times it will hit)
// Attacks
const testCard = new Card("1", "Friendship Punch", "Like a normal punch, only.. friendlier..", "Attack", "ArrowUp,ArrowRight, ", 0, 0, "", 1)
const testCard1 = new Card("2", "Friendship Kick", "Your definition of friendship is really, REALLY weird..", "Attack", "ArrowRight,ArrowRight, ", 0, 0, "", 1) // id, name, desc, type (TBC to action), comboId (if any), value (+/- action), cost (SP)

// Heals
const testCard2 = new Card("3", "Heel", "I got a bone to pick with you!! (geddit??)", "Heal", "ArrowUp,ArrowDown,ArrowDown, ", 2, 1, "SP", 1)
const testCard4 = new Card("3", "Heel", "I got a bone to pick with you!! (geddit??)", "Heal", "ArrowUp,ArrowDown,ArrowDown, ", 2, 1, "SP", 1)

// Skills
// Deal 1xGOLD damage
const testCard3 = new Card("5", "Finger Guns", "pew pew pew!", "Skill", "ArrowRight,ArrowRight,ArrowRight, ", 2, 1, "GOLD", 0)

// Buffs
const testCard5 = new Card("4", "Focus 😣", "the time is <b>now</b>", "BuffAtk", "ArrowUp,ArrowDown,ArrowLeft,ArrowRight, ", 3, 2, "SP", 0)

const playerDeck = new Deck("Player Test Deck", "For testing only!", []);
const enemyDeck = new Deck("Enemy Test Deck", "For testing only!", []);

// Adding cards to deck
console.log("Adding 7 cards to player deck");
console.log("Adding 4 cards to enemy deck");
playerDeck.addCard(testCard);
playerDeck.addCard(testCard1);
playerDeck.addCard(testCard1);
playerDeck.addCard(testCard2);
playerDeck.addCard(testCard2);
playerDeck.addCard(testCard5);
playerDeck.addCard(testCard3);
enemyDeck.addCard(testCard3);
enemyDeck.addCard(testCard3);
enemyDeck.addCard(testCard4);
enemyDeck.addCard(testCard4);
player.addDeck(playerDeck);
enemy.addDeck(enemyDeck);

// Shuffle player and enemy deck
console.log("");
console.log("Shuffling everyone's deck before gameplay...");
console.log("");
player.getDeck().shuffle();
enemy.getDeck().shuffle();

// player.getHp();
// alert(player.getHp());
// console.log("Card count: " + deck.getCardCount())
console.log("As player...")
console.log(" Drawing three cards")
for (let i = 0; i < 3; i++) {
    let drawnCard = player.getDeck().drawCard();
    console.log(" Drawn card name: " + drawnCard.getName())
    player.addCardToHand(drawnCard);
}
console.log(" Cards in player's deck: " + player.getDeck().getCardCount())
console.log(" Cards in player's hand: " + player.getHandCount());

drawHtmlCards();

// Loop to go through hand and display each card in hand[] onscreen
// TODO: Make a way to have the carvds be clickable
// TODO: Add a way to track cards (ID?)
function drawHtmlCards() {
    for (let i = 0; i < player.getHandCount(); i++) {
        let card = player.getCardFromHand(i);
        let cardValueSummary = null;
        console.log(" Looping through Player hand: "+i);

        // if card is basic attack (attached to equipped weapon?) then set dmg to that value too
        if (card.getType() == "Attack") {
            card.setValue(player.getAtk()+player.getBuffAtk());
            cardValueSummary = "<i>Deal " + parseInt(card.getValue()+player.getBuffAtk()) + " damage</i>" + "<br>Basic Attack</td>";
        } else if (card.getType() == "Heal") {
            cardValueSummary = "<i>Heal for " + card.getValue() + "</i>" + "<br>Cost: " + card.getCost() + 
            " " + card.getCostStat() + "</td>";
        } else if (card.getType() == "BuffAtk") {
            cardValueSummary = "<i>Add " + card.getValue() + " ATK to your next Basic Attack</i>" + "<br>Cost: " + card.getCost() + 
            " " + card.getCostStat() + "</td>";
        } else if (card.getType() == "Skill") {
            cardValueSummary = "<i>Deal " + card.getValue() + " DMG per " + card.getCost() + " "+ card.getCostStat() + "</i>" + "<br></td>";
        }

        document.getElementById('action-cards').innerHTML += 
        "<td data-id='" + card.getId() +"'index='"+ i +"'class='action-card' data-action='" + 
        card.getType() + "'><b>" + card.getName() + "</b><br><br>" + card.getDescription() + 
        "<br><br>" + cardValueSummary;
    }
}

console.log("");
console.log("As enemy...")
// TODO
// console.log(" Shuffling deck")
console.log(" Drawing one card")
for (let i = 0; i < 1; i++) {
    let drawnCard = enemy.getDeck().drawCard();
    console.log(" Drawn card name: " + drawnCard.getName())
    enemy.addCardToHand(drawnCard);
}
console.log(" Cards in enemy's deck: " + enemy.getDeck().getCardCount())
console.log(" Cards in enemy's hand: " + enemy.getHandCount())

updatePageValues();

// Will be filled with the selected card from hand (on website)
let card = null;

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
        let cardIndex = event.target.getAttribute('index');
        console.log("Selected card index in hand: "+ cardIndex)


        // TODO: Fix to match new types
        if (actionType == "Attack") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Attack card selected");
            // TODO: Don't pull the card out of array yet. Just get a reference
        } else if (actionType == "Heal") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Heal card selected");
        } else if (actionType == "Skill") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Skill card selected");
        } else if (actionType == "BuffAtk") {
            card = player.getCardFromHand(cardIndex);
            console.log("  Buff card selected");
        } 
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
        } else if (actionType == "awc") {
            // Make sure they've selected a card for this test!
            if (card) {
                let c = new AbortController();
                combat.simulateCardComboFromPlayer(player, enemy, c, card)
            } else {
                // Heal, focus, friendship kick (use focus first)
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

// To update the HTML values
function updatePageValues() {
    document.getElementById('player-hp').innerHTML = player.getHp();
    document.getElementById('player-sp').innerHTML = player.getSp();

    if (player.getBuffAtk() == 0) {
        document.getElementById('player-atk').innerHTML = player.getAtk();
    } else {
        document.getElementById('player-atk').innerHTML = player.getAtk() + " (+" + player.getBuffAtk() + ")";
    }

    document.getElementById('player-def').innerHTML = player.getDef();
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();
    document.getElementById('player-gold').innerHTML = player.getGold();

}