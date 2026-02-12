// TODO: Move combat logic to here :)

function attack(player, enemy, damage) {
    // while (fightLoop) { // While enemy and player are still alive
        if (enemy.getHp() > 0 && player.getHp() > 0) { // Check if everyone is alive
        // alert("Turn: " + turnCount)
        chance = Math.random();
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
    // }
}