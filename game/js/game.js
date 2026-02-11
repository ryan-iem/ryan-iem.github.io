// need to uncomment when publishing to github
// import { Player } from '/player.js';

const player = new Character(10, 10, 3, 3, 3); // hp, sp, atk, def, gold
const enemy = new Character(10, 10, 2, 2, 1);

// Test to print player data
// player.getHp();
// alert(player.getHp());

document.getElementById('player-hp').innerHTML = player.getHp();
document.getElementById('player-sp').innerHTML = player.getSp();
document.getElementById('player-atk').innerHTML = player.getAtk();
document.getElementById('player-def').innerHTML = player.getDef();
document.getElementById('enemy-hp').innerHTML = enemy.getHp();
// document.getElementById('player-gold').innerHTML = player.getGold();

// COMBO CODES ---
keyCount = 0;
const combo1 = ["ArrowUp", "ArrowRight", " ", "4"]; // Slash
const combo2 = ["ArrowUp", "ArrowRight", "ArrowRight", " ", "5"]; // Double slash (costs SP)
const combo3 = ["ArrowUp", "ArrowUp", "ArrowRight", "ArrowRight", " ", "6"]; // Heavy slash (costs SP)

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
function simulateComboAttackFromPlayer() {
    keyCountLimit = combo1.length - 1; // The last value is the DMG value
    console.log("Combo Tracking ON");
    document.getElementById('combo-display').innerHTML = "&nbsp;";
    document.addEventListener('keydown', simulateComboAttack);
}
// COMBO CODES ---

// Simulate an attack (Player -> enemy)
// TODO: Change attack() to take a value and not an object
// function simulateComboAttackFromPlayer() {

//     if (enemy.getHp() > 0 && player.getHp() > 0) {
//         chance = Math.random();
//         if (chance > 0.33) { // 33% chance to miss and 66% chance to hit

//             player.attack(enemy);
//             // alert("The enemy has " + enemy.getHp() + " HP remaining!")

//             if (enemy.getHp() > 0 && player.getHp() > 0) {

//                 alert("The enemy takes " + player.getAtk() + " damage!")
//                 alert("The enemy has " + enemy.getHp() + " HP remaining!")

//             } else {
//                 alert("The enemy takes " + player.getAtk() + " damage!")
//                 alert("You have slain the enemy!")
//                 // TODO: Logic to remove enemy? Rewards?
//             }
//         } else {
//             alert("Your attack misses!")
//         }

//     } else {
//         if (enemy.getHp() == 0) {
//             alert("The enemy is already dead!")
//         } else {
//             alert("You are dead!")
//         }
//     }

//     // player.attack(enemy);
//     // alert("The enemy has " + enemy.getHp() + " HP remaining!")
//     // player.attack(enemy);
//     // alert("The enemy has " + enemy.getHp() + " HP remaining!")
//     document.getElementById('player-hp').innerHTML = player.getHp();
//     document.getElementById('enemy-hp').innerHTML = enemy.getHp();

// }

// Simulate an attack (Player -> enemy)
function simulateAttackFromPlayer() {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        chance = Math.random();
        if (chance > 0.33) { // 33% chance to miss and 66% chance to hit

            player.attack(enemy);
            // alert("The enemy has " + enemy.getHp() + " HP remaining!")

            if (enemy.getHp() > 0 && player.getHp() > 0) {

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
    // alert("The enemy has " + enemy.getHp() + " HP remaining!")
    document.getElementById('player-hp').innerHTML = player.getHp();
    document.getElementById('enemy-hp').innerHTML = enemy.getHp();

}

// Simulate a battle (attacking one another)
function simulateAttackFromBoth() {

    if (enemy.getHp() > 0 && player.getHp() > 0) {
        chance = Math.random();
        if (chance > 0.25) { // 25% chance to miss and 75% chance to hit

            player.attack(enemy);
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