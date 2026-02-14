// TODO: Move combat logic to here :)

let keyCount = 0;

// TODO: Move to a combo .json or something
// Match the combo[number] with card ComboId
const combo0 = ["ArrowUp", "ArrowRight", " ", "4"]; // +1 atk buff
const combo1 = ["ArrowUp", "ArrowDown", "ArrowDown", " ", "5"]; // heal for 2
const combo2 = ["ArrowUp", "ArrowUp", "ArrowRight", "ArrowRight", " ", "6"];

// TODO: Move ALL into a combo.js file?

export function simulateFightLoop(player, enemy) {
    let fightLoop = true;
    let turnCount = 1;
    while (fightLoop) { // While enemy and player are still alive
        if (enemy.getHp() > 0 && player.getHp() > 0) { // Check if everyone is alive
        alert("Turn: " + turnCount)
        let chance = Math.random();
            // Player attacks first (for now)
            if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

                enemy.receiveDamage(player.getAtk());
                alert("The enemy takes " + player.getAtk() + " damage!")
                // alert("The enemy has " + enemy.getHp() + " HP remaining!")

                if (enemy.getHp() > 0) { // If enemy is still alive after being attacked
                    
                    alert("The enemy has " + enemy.getHp() + " HP remaining!")
                    let chance = Math.floor(Math.random() * 2);

                    if (chance == 1) { // Enemy chance to attack
                        player.receiveDamage(enemy.getAtk());
                        alert("You take " + enemy.getAtk() + " damage!")
                    } else {
                        alert("The enemy attack misses!")
                    }

                } // else do nothing!

            } else { // Enemy has chance to attack back even if player misses attack
                alert("Your attack misses!")

                // Enemy's turn to attack
                let chance = Math.floor(Math.random() * 2);
                if (chance == 1) {
                        player.receiveDamage(enemy.getAtk());
                        alert("You take " + enemy.getAtk() + " damage!")
                    } else {
                        alert("The enemy attack misses too!")
                    }
            }

        } else { 
            // Check to see who exactly is dead
            if (enemy.getHp() == 0) {
                alert("The enemy has been slain!")
                fightLoop = false
            } else if (player.getHp() == 0) {
                alert("YOU HAVE BEEN SLAIN")
                fightLoop = false
            }
        }

        // player.attack(enemy);
        // alert("The enemy has " + enemy.getHp() + " HP remaining!")
        // player.attack(enemy);
        // alert("The enemy has " + enemy.getHp() + " HP remaining!")
        document.getElementById('player-hp').innerHTML = player.getHp();
        document.getElementById('enemy-hp').innerHTML = enemy.getHp();
        turnCount++;
    }
}

// COMBO CODES ---
export function simulateBuffCardComboAttackFromPlayer(player, enemy, c, card) {
    // This is really strange and only exists so we can pass parameters into the combo system too (custom arrows/dmg/etc.)
    let signal = c.signal;

    // Turn combo string into array (separated by ',')
    // let rawComboString = card.getInput();
    // let comboString = rawComboString.split(",");

    console.log("Combo Tracking ON");
    console.log("Required comboString: "+card.getInput());
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', (event) => {
        simulateBuffCardComboAttack(player, enemy, c, card);
    }, { signal: signal })
}
// Simulate keyboard combo feature (for simulateComboAttackFromPlayer)
export function simulateBuffCardComboAttack(player, enemy, c, card) {
    let comboString = card.getInput().split(",");  // The last value is the DMG value
    let keyCountLimit = card.getInput().split(",").length;  // The last value is the DMG value
    console.log(event.key);

    if (event.key == comboString[keyCount]) {
            keyCount++;
            let key = event.key;

            if (key == "ArrowUp") {
                key = "↑";
            } else if (key == "ArrowDown") {
                key = "↓";
            } else if (key == "ArrowLeft") {
                key = "←";
            } else if (key == "ArrowRight") {
                key = "→";
            } else if (key == " ") {
                key = "Space";
            }

            document.getElementById('combo-display').innerHTML += key + " ";
            if (keyCount == keyCountLimit) {
                keyCount = 0;
                let cardId = card.getId();
                console.log("Combo Executed!")
                console.log("")
                c.abort();

                // Since we are simulating usage of a buff card, append buff value to base ATK
                attack(player, enemy, player.getAtk()+card.getValue());

                // TODO: Remove card from hand after this
                // If multiple copies of one card, find first hit and just delete that
                console.log("  Card to remove: "+ card.getName())
                console.log("  Card to remove ID: "+ cardId)

                //TODO check for value of cardId
                // Select all elements with the class 'action-card'
                let htmlCards = document.querySelectorAll('.action-card');
                // Iterate over the elements to check their value
                for (const htmlCard of htmlCards) {
                    console.log(" Looping through cards in HTML")
                    // If card ID in the HTML matches the selected card's ID
                    if (htmlCard.getAttribute('data-id') === cardId) {
                        console.log("  Removed card from HTML");
                        htmlCard.remove();

                        player.removeCardFromHand(cardId);
                        console.log("  Removed from hand");
                        return; // so that we dont remove all cards with same id!
                    }
                }
            }
    } else {
            keyCount = 0;
            let cardId = card.getId();
            console.log("Incorrect key pressed. Combo Failed!")
            c.abort();
            // document.removeEventListener('keydown', simulateComboAttack(player, enemy));
            document.getElementById('combo-display').innerHTML = "&nbsp;";

            console.log("  Card to remove: "+ card.getName())
            console.log("  Card to remove ID: "+ cardId)

            // Remove used card
            let htmlCards = document.querySelectorAll('.action-card');
            // Iterate over the elements to check their value
            for (const htmlCard of htmlCards) {
                    console.log(" Looping through cards in HTML")
                    // If card ID in the HTML matches the selected card's ID
                    if (htmlCard.getAttribute('data-id') === cardId) {
                        console.log("  Removed card from HTML");
                        htmlCard.remove();

                        player.removeCardFromHand(cardId);
                        console.log("  Removed from hand");
                        return; // so that we dont remove all cards with same id!
                    }
                }
            
            // attack(player, enemy, "-1"); // -1 for failed combo attacks
            // TODO: Remove card from hand after this
    //TODO: Completely fix this lol
    player.removeCardFromHand(cardId);
    console.log("  Removed card from hand");
    console.log("  Cards in player's hand: " + player.getHandCount());
    }
}

export function testComboSystem() {
    console.log("Combo Tracking ON");
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', comboChecker);
}
// Simulate keyboard combo feature (for testComboSystem)
export function comboChecker() {
        let keyCountLimit = combo1.length - 1;  // The last value is the DMG value
        console.log(event.key);
        if (event.key == combo1[keyCount]) {
            keyCount++;
            let key = event.key;

            if (key == "ArrowUp") {
                key = "↑";
            } else if (key == "ArrowDown") {
                key = "↓";
            } else if (key == "ArrowLeft") {
                key = "←";
            } else if (key == "ArrowRight") {
                key = "→";
            } else if (key == " ") {
                key = "Space";
            }

            document.getElementById('combo-display').innerHTML += key + " ";
            if (keyCount == keyCountLimit) {
                console.log("Combo Executed!")
                keyCount = 0;
                document.removeEventListener('keydown', comboChecker);
            }
        } else {
            console.log("Incorrect key pressed. Combo Failed!")
            keyCount = 0;
            document.removeEventListener('keydown', comboChecker);
            document.getElementById('combo-display').innerHTML = "&nbsp;";
        }
}

// ---

export function simulateComboAttackFromPlayer(player, enemy, c) {
    // This is really strange and only exists so we can pass parameters into the combo system too (custom arrows/dmg/etc.)
    let signal = c.signal;

    console.log("Combo Tracking ON");
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', (event) => {
        simulateComboAttack(player, enemy, c);
    }, { signal: signal })
}
// Simulate keyboard combo feature (for simulateComboAttackFromPlayer)
export function simulateComboAttack(player, enemy, c) {
        let keyCountLimit = combo1.length - 1;  // The last value is the DMG value
        console.log(event.key);
        if (event.key == combo1[keyCount]) {
            keyCount++;
            let key = event.key;

            if (key == "ArrowUp") {
                key = "↑";
            } else if (key == "ArrowDown") {
                key = "↓";
            } else if (key == "ArrowLeft") {
                key = "←";
            } else if (key == "ArrowRight") {
                key = "→";
            } else if (key == " ") {
                key = "Space";
            }

            document.getElementById('combo-display').innerHTML += key + " ";
            if (keyCount == keyCountLimit) {
                keyCount = 0;
                console.log("Combo Executed!")
                c.abort();
                // document.removeEventListener('keydown', simulateComboAttack(player, enemy));
                attack(player, enemy, combo1[keyCountLimit]);
            }
        } else {
            keyCount = 0;
            console.log("Incorrect key pressed. Combo Failed!")
            c.abort();
            // document.removeEventListener('keydown', simulateComboAttack(player, enemy));
            document.getElementById('combo-display').innerHTML = "&nbsp;";
            // attack(player, enemy, "-1"); // -1 for failed combo attacks
        }
}
// COMBO CODES ---

// Simulate an attack (Player -> enemy)
export function simulateAttackFromPlayer(player, enemy) {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        let chance = Math.random();
        if (chance > 0.33) { // 33% chance to miss and 66% chance to hit

            enemy.receiveDamage(player.getAtk());
            // alert("The enemy has " + enemy.getHp() + " HP remaining!")

            if (enemy.getHp() > 0 && player.getHp() > 0) { // for later logic involving self-damaging attacks
                alert("The enemy takes " + player.getAtk() + " damage!")
                alert("The enemy has " + enemy.getHp() + " HP remaining!")

            } else {
                alert("The enemy takes " + player.getAtk() + " damage!")
                alert("You have slain the enemy!")
                // TODO: Logic to remove enemy? Rewards?
            }
        } else {
            alert("Your attack misses!")
        }

    } else {
        if (enemy.getHp() == 0) {
            alert("The enemy is already dead!")
        } else {
            alert("You are dead!")
        }
    }

    // player.attack(enemy);
    // alert("The enemy has " + enemy.getHp() + " HP remaining!")
    // player.attack(enemy);
    document.getElementById('player-hp').innerHTML = player.getHp();
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();

}

// Simulate a battle (attacking one another) with set damage value (for skills)
export function attack(player, enemy, damage) {
    // while (fightLoop) { // While enemy and player are still alive
        if (enemy.getHp() > 0 && player.getHp() > 0) { // Check if everyone is alive
        // alert("Turn: " + turnCount)
        let chance = Math.random();
            // Player attacks first (for now)
            if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

                enemy.receiveDamage(damage);
                alert("The enemy takes " + damage + " damage!")
                // alert("The enemy has " + enemy.getHp() + " HP remaining!")

                if (enemy.getHp() > 0) { // If enemy is still alive after being attacked
                    
                    alert("The enemy has " + enemy.getHp() + " HP remaining!")
                    chance = Math.floor(Math.random() * 2);

                    if (chance == 1) { // Enemy chance to attack
                        player.receiveDamage(enemy.getAtk());
                        alert("You take " + enemy.getAtk() + " damage!")
                    } else {
                        alert("The enemy attack misses!")
                    }

                } // else do nothing!

            } else { // Enemy has chance to attack back even if player misses attack
                alert("Your attack misses!")

                // Enemy's turn to attack
                let chance = Math.floor(Math.random() * 2);
                if (chance == 1) {
                        player.receiveDamage(enemy.getAtk());
                        alert("You take " + enemy.getAtk() + " damage!")
                    } else {
                        alert("The enemy attack misses too!")
                    }
            }

        } else { 
            // Check to see who exactly is dead
            if (enemy.getHp() == 0) {
                alert("The enemy has been slain!")
                fightLoop = false
            } else if (player.getHp() == 0) {
                alert("YOU HAVE BEEN SLAIN")
                fightLoop = false
            }
        }

        // player.attack(enemy);
        // alert("The enemy has " + enemy.getHp() + " HP remaining!")
        // player.attack(enemy);
        // alert("The enemy has " + enemy.getHp() + " HP remaining!")
        document.getElementById('player-hp').innerHTML = player.getHp();
        document.getElementById('enemy-hp').innerHTML = enemy.getHp();
    // }
}

// Simulate a battle (attacking one another) with basic attack
export function simulateAttackFromBoth(player, enemy) {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        let chance = Math.random();
        if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

            enemy.receiveDamage(player.getAtk());
            // alert("The enemy has " + enemy.getHp() + " HP remaining!")

            if (enemy.getHp() > 0 && player.getHp() > 0) {

                alert("The enemy takes " + player.getAtk() + " damage!")
                alert("The enemy has " + enemy.getHp() + " HP remaining!")
                let chance = Math.floor(Math.random() * 2);

                if (chance == 1) {
                    player.receiveDamage(enemy.getAtk())
                    alert("You take " + enemy.getAtk() + " damage!")
                    if (player.getHp() <= 0) {
                        alert("YOU HAVE BEEN SLAIN")
                    }
                } else {
                    alert("The enemy attack misses!")
                }

            } else {
                alert("The enemy takes " + player.getAtk() + " damage!")
                alert("You have slain the enemy!")
                // TODO: Logic to remove enemy? Rewards?
            }
        } else {
            alert("Your attack misses!")

            // Enemy's turn to attack
            let chance = Math.floor(Math.random() * 2);
            if (chance == 1) {
                    player.receiveDamage(enemy.getAtk())
                    alert("You take " + enemy.getAtk() + " damage!")
                    if (player.getHp() <= 0) {
                        alert("YOU HAVE BEEN SLAIN")
                    }
                } else {
                    alert("The enemy attack misses!")
                }

        }

    } else {
        if (enemy.getHp() == 0) {
            alert("The enemy is already dead!")
        } else {
            alert("You are dead!")
        }
    }

    // player.attack(enemy);
    // alert("The enemy has " + enemy.getHp() + " HP remaining!")
    // player.attack(enemy);
    // alert("The enemy has " + enemy.getHp() + " HP remaining!")
    document.getElementById('player-hp').innerHTML = player.getHp();
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();

}