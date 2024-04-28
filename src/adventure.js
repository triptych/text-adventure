let currentAdventure;

document.addEventListener('DOMContentLoaded', () => {
  const goAdventureButton = document.getElementById('go-adventure');
  const adventureResult = document.getElementById('adventure-result');
  const adventureTitle = document.getElementById('adventure-title');
  const adventureDescription = document.getElementById('adventure-description');
  const monsterEncounter = document.getElementById('monster-encounter');
  const itemFind = document.getElementById('item-find');
  const goldReward = document.getElementById('gold-reward');
  const monsterActions = document.getElementById('monster-actions');
  const fightMonsterButton = document.getElementById('fight-monster');
  const runAwayButton = document.getElementById('run-away');

  goAdventureButton.addEventListener('click', () => {
    fetch('adventure.json')
      .then(response => response.json())
      .then(data => {
        currentAdventure = data[Math.floor(Math.random() * data.length)];

        adventureTitle.textContent = currentAdventure.title;
        adventureDescription.textContent = currentAdventure.description;

        const character = JSON.parse(localStorage.getItem('character'));

        const monsterRoll = Math.random();
        if (monsterRoll < currentAdventure.monster.probability) {
          monsterEncounter.textContent = `You encounter a ${currentAdventure.monster.type}!`;
          monsterActions.style.display = 'block';
        } else {
          monsterEncounter.textContent = '';
          monsterActions.style.display = 'none';
        }

        const itemRoll = Math.random();
        if (itemRoll < currentAdventure.item.probability) {
          const item = {
            id: Date.now(),
            name: currentAdventure.item.name,
            type: currentAdventure.item.type,
            effect: currentAdventure.item.effect
          };
          itemFind.textContent = `You find a ${item.name}!`;
          character.inventory.push(item);
          localStorage.setItem('character', JSON.stringify(character));
        } else {
          itemFind.textContent = '';
        }

        const goldRoll = Math.random();
        if (goldRoll < currentAdventure.gold.probability) {
          goldReward.textContent = `You find ${currentAdventure.gold.amount} gold!`;
          character.gold += currentAdventure.gold.amount;
          localStorage.setItem('character', JSON.stringify(character));
        } else {
          goldReward.textContent = '';
        }

        adventureResult.style.display = 'block';
      })
      .catch(error => {
        console.error('Error loading adventure data:', error);
      });
  });

  fightMonsterButton.addEventListener('click', () => {
    const character = JSON.parse(localStorage.getItem('character'));
    const monster = currentAdventure.monster;

    const combatLog = document.createElement('div');
    combatLog.id = 'combat-log';
    adventureResult.appendChild(combatLog);

    const healthDisplay = document.createElement('div');
    healthDisplay.id = 'health-display';
    healthDisplay.style.position = 'fixed';
    healthDisplay.style.top = '0';
    healthDisplay.style.left = '0';
    healthDisplay.style.width = '100%';
    healthDisplay.style.padding = '10px';
    healthDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    healthDisplay.style.color = 'white';
    healthDisplay.style.zIndex = '9999';
    document.body.appendChild(healthDisplay);

    const updateHealthDisplay = () => {
      healthDisplay.innerHTML = `
        <p>Player Health: ${character.hitPoints} / ${character.maxHitPoints}</p>
        <p>Monster Health: ${monster.health} / ${monster.maxHealth}</p>
      `;
    };

    updateHealthDisplay();

    const combat = setInterval(() => {
      const playerDamage = calculateDamage(character);
      const monsterDamage = calculateDamage(monster);

      monster.health -= playerDamage;
      character.hitPoints -= monsterDamage;

      combatLog.innerHTML += `<p>You hit ${monster.type} for ${playerDamage} points.</p>`;
      combatLog.innerHTML += `<p>The ${monster.type} hits you for ${monsterDamage} points.</p>`;

      updateHealthDisplay();

      if (monster.health <= 0) {
        clearInterval(combat);
        character.xp += monster.xpReward;
        localStorage.setItem('character', JSON.stringify(character));
        combatLog.innerHTML += `<p>You defeated the ${monster.type}!</p>`;
        setTimeout(() => {
          healthDisplay.remove();
          window.location.href = 'character-sheet.html';
        }, 3000);
      } else if (character.hitPoints <= 0) {
        clearInterval(combat);
        character.hitPoints = 0;
        localStorage.setItem('character', JSON.stringify(character));
        combatLog.innerHTML += '<p>You were defeated!</p>';
        setTimeout(() => {
          healthDisplay.remove();
          window.location.href = 'character-sheet.html';
        }, 3000);
      }
    }, 3000);
  });

  runAwayButton.addEventListener('click', () => {
    const confirmRunAway = confirm('You will lose a random item when you flee. OK?');

    if (confirmRunAway) {
      const character = JSON.parse(localStorage.getItem('character'));

      if (character.inventory.length > 0) {
        const randomIndex = Math.floor(Math.random() * character.inventory.length);
        const lostItem = character.inventory.splice(randomIndex, 1)[0];

        localStorage.setItem('character', JSON.stringify(character));

        alert(`You lost ${lostItem.name} while running away from the monster!`);
      } else {
        alert('You managed to run away without losing any items!');
      }

      setTimeout(() => {
        window.location.href = 'adventure.html';
      }, 3000);
    }
  });
});

function calculateDamage(entity) {
  // Implement your damage calculation logic here based on character/monster stats
  // This is a simple example, you can enhance it further
  return Math.floor(Math.random() * 10) + 1;
}