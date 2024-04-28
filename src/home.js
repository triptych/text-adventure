document.addEventListener('DOMContentLoaded', () => {
    const characterButton = document.getElementById('character-button');
  
    const character = JSON.parse(localStorage.getItem('character'));
  
    if (character) {
      characterButton.textContent = 'View Character';
      characterButton.href = 'character-sheet.html';
    } else {
      characterButton.textContent = 'Create Character';
      characterButton.href = 'character-creation.html';
    }
  });