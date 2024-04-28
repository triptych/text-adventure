document.addEventListener('DOMContentLoaded', () => {
    const character = JSON.parse(localStorage.getItem('character'));
    const playerGoldElement = document.getElementById('player-gold');
    const storeItemsElement = document.getElementById('store-items');
    const playerInventoryElement = document.getElementById('player-inventory');
  
    playerGoldElement.textContent = character.gold;
  
    let items = []; // Declare items variable outside the fetch callback
  
    fetch('items.json')
      .then(response => response.json())
      .then(data => {
        items = data; // Assign the fetched data to the items variable
  
        items.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');
          itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
            <p>Description: ${item.description}</p>
            <p>Price: ${item.price}</p>
            <button class="buy-button" data-item-id="${item.id}">Buy</button>
          `;
          storeItemsElement.appendChild(itemElement);
        });
  
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemId = parseInt(button.dataset.itemId);
            const item = items.find(item => item.id === itemId); // Use the items variable
  
            if (character.gold >= item.price) {
              character.gold -= item.price;
              character.inventory.push(item);
              localStorage.setItem('character', JSON.stringify(character));
              updatePlayerInfo();
              alert(`You bought ${item.name}!`);
            } else {
              alert("You don't have enough gold to buy this item.");
            }
          });
        });
  
        updatePlayerInfo();
      })
      .catch(error => {
        console.error('Error loading store items:', error);
      });
  
    function updatePlayerInfo() {
      playerGoldElement.textContent = character.gold;
  
      playerInventoryElement.innerHTML = '';
      character.inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>Type: ${item.type}</p>
          <p>Effect: ${item.effect || 'N/A'}</p>
          <button class="sell-button">Sell</button>
        `;
        playerInventoryElement.appendChild(itemElement);
  
        const sellButton = itemElement.querySelector('.sell-button');
        sellButton.addEventListener('click', () => {
          const itemIndex = character.inventory.findIndex(invItem => invItem.id === item.id);
          if (itemIndex !== -1) {
            let sellPrice = item.price;
  
            // Check against items array if the price is not defined
            if (!sellPrice) {
              const itemData = items.find(itemData => itemData.name === item.name);
              if (itemData) {
                sellPrice = Math.floor(itemData.price * 0.5);
              }
            }
  
            if (sellPrice) {
              character.inventory.splice(itemIndex, 1);
              character.gold += sellPrice;
              localStorage.setItem('character', JSON.stringify(character));
              updatePlayerInfo();
              alert(`You sold ${item.name} for ${sellPrice} gold.`);
            } else {
              alert(`Unable to sell ${item.name}. Price not found.`);
            }
          }
        });
      });
    }
  });