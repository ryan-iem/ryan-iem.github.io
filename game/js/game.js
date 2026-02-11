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