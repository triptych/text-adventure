document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('character-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const gender = document.getElementById('gender').value;
      const characterClass = document.getElementById('class').value;
  
      const character = {
        name,
        gender,
        class: characterClass,
        level: 1,
        xp: 0,
        gold: 0,
        hitPoints: 100, // Add default hit points
        maxHitPoints: 100, // Add maximum hit points
        inventory: []
      };
  
      localStorage.setItem('character', JSON.stringify(character));
  
      window.location.href = 'character-sheet.html';
    });
  });