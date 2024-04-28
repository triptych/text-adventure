document.addEventListener('DOMContentLoaded', () => {
  const character = JSON.parse(localStorage.getItem('character'));

  if (character) {
    document.getElementById('name').textContent = character.name;
    document.getElementById('gender').textContent = character.gender;
    document.getElementById('class').textContent = character.class;
    document.getElementById('level').textContent = character.level;
    document.getElementById('xp').textContent = character.xp;
    document.getElementById('gold').textContent = character.gold;
    document.getElementById('hit-points').textContent = character.hitPoints;
    document.getElementById('max-hit-points').textContent = character.maxHitPoints;

    const inventoryList = document.getElementById('inventory');
    character.inventory.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h4>${item.name}</h4>
        <p>Type: ${item.type}</p>
        <p>Effect: ${item.effect || 'N/A'}</p>
      `;
      inventoryList.appendChild(listItem);
    });

    if (character.hitPoints < character.maxHitPoints) {
      let countdownInterval;

      const restoration = setInterval(() => {
        character.hitPoints += 1;
        if (character.hitPoints >= character.maxHitPoints) {
          character.hitPoints = character.maxHitPoints;
          clearInterval(restoration);
          clearInterval(countdownInterval);
          document.getElementById('restoration-timer').textContent = '';
        } else {
          character.lastHealTime = Date.now();
          localStorage.setItem('character', JSON.stringify(character));
          startCountdownTimer();
        }
        document.getElementById('hit-points').textContent = character.hitPoints;
      }, 60000); // Restore 1 HP every minute (60000 milliseconds)

      const countdownTimer = document.createElement('div');
      countdownTimer.id = 'restoration-timer';
      document.getElementById('character-info').appendChild(countdownTimer);

      const updateCountdown = () => {
        const remainingTime = 60 - Math.floor((Date.now() - character.lastHealTime) / 1000);
        if (remainingTime > 0) {
          countdownTimer.textContent = `Next HP heal in: ${remainingTime} seconds`;
        } else {
          // Timer has gone negative, reset lastHealTime to current time
          character.lastHealTime = Date.now();
          localStorage.setItem('character', JSON.stringify(character));
          countdownTimer.textContent = 'Next HP heal in: 60 seconds';
        }
      };

      const startCountdownTimer = () => {
        clearInterval(countdownInterval);
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
      };

      if (character.lastHealTime) {
        startCountdownTimer();
      } else {
        character.lastHealTime = Date.now();
        localStorage.setItem('character', JSON.stringify(character));
        startCountdownTimer();
      }
    }

    const previousLevel = character.level;
    const newLevel = calculateLevel(character.xp);
    if (newLevel > previousLevel) {
      character.level = newLevel;
      localStorage.setItem('character', JSON.stringify(character));
      document.getElementById('level').textContent = character.level;
      alert(`You have levelled up! You are now level ${character.level}`);
    }
  } else {
    document.getElementById('character-info').innerHTML = '<p>No character found. Please create a character first.</p>';
  }
});

function calculateLevel(xp) {
  // Implement your level calculation logic here based on XP
  // This is a simple example, you can enhance it further
  return Math.floor(xp / 100) + 1;
}