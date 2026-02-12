// need to uncomment when publishing to github
// import { Player } from '/player.js';

const player = new Character(10, 10, 3, 3, 3); // hp, sp, atk, def, gold
const enemy = new Character(10, 10, 2, 2, 1);
playerHp = player.getHp();
enemyHp = enemy.getHp();

// Test to print player data
// player.getHp();
// alert(player.getHp());

document.getElementById('player-hp').innerHTML = player.getHp();
document.getElementById('player-sp').innerHTML = player.getSp();
document.getElementById('player-atk').innerHTML = player.getAtk();
document.getElementById('player-def').innerHTML = player.getDef();
document.getElementById('enemy-hp').innerHTML = enemy.getHp();
// document.getElementById('player-gold').innerHTML = player.getGold();

function simulateFightLoop(player, enemy) {
    fightLoop = true;
    turnCount = 1;
    while (fightLoop) { // While enemy and player are still alive
        if (enemy.getHp() > 0 && player.getHp() > 0) { // Check if everyone is alive
        alert("Turn: " + turnCount)
        chance = Math.random();
            // Player attacks first (for now)
            if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

                enemy.receiveDamage(player.getAtk());
                alert("The enemy takes " + player.getAtk() + " damage!")
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
                chance = Math.floor(Math.random() * 2);
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
// Simulate keyboard combo feature (for testComboSystem)
function comboChecker() {
        console.log(event.key);
        if (event.key == combo1[keyCount]) {
            keyCount++;
            key = event.key;

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
function testComboSystem() {

    keyCountLimit = combo1.length - 1;  // The last value is the DMG value

    console.log("Combo Tracking ON");
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', comboChecker);
}

// Simulate keyboard combo feature (for simulateComboAttackFromPlayer)
function simulateComboAttack() {
        console.log(event.key);
        if (event.key == combo1[keyCount]) {
            keyCount++;
            key = event.key;

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
                document.removeEventListener('keydown', simulateComboAttack);
                attack(player, enemy, combo1[keyCountLimit]);
            }
        } else {
            keyCount = 0;
            console.log("Incorrect key pressed. Combo Failed!")
            document.removeEventListener('keydown', simulateComboAttack);
            document.getElementById('combo-display').innerHTML = "&nbsp;";
            // attack(player, enemy, "-1"); // -1 for failed combo attacks
        }
}
function simulateComboAttackFromPlayer() {
    keyCountLimit = combo1.length - 1; // The last value is the DMG value
    console.log("Combo Tracking ON");
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', simulateComboAttack);
}
// COMBO CODES ---

// Simulate an attack (Player -> enemy)
function simulateAttackFromPlayer() {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        chance = Math.random();
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

// Simulate a battle (attacking one another)
function simulateAttackFromBoth() {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        chance = Math.random();
        if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

            enemy.receiveDamage(player.getAtk());
            // alert("The enemy has " + enemy.getHp() + " HP remaining!")

            if (enemy.getHp() > 0 && player.getHp() > 0) {

                alert("The enemy takes " + player.getAtk() + " damage!")
                alert("The enemy has " + enemy.getHp() + " HP remaining!")
                chance = Math.floor(Math.random() * 2);

                if (chance == 1) {
                    enemy.attack(player)
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
            chance = Math.floor(Math.random() * 2);
            if (chance == 1) {
                    enemy.attack(player)
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

function resetPlayer() {
    player.setHp(10);
    document.getElementById('player-hp').innerHTML = player.getHp();
}

function resetEnemy() {
    enemy.setHp(10);
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