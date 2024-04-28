Text-Based Adventure Game Project Summary

1. Overview:
   - This project is a text-based adventure game built using HTML, CSS, and JavaScript.
   - The game allows players to create a character, go on adventures, fight monsters, find items and gold, and manage their inventory.
   - The game data is stored in the browser's local storage.

2. Project Structure:
   - index.html: The main page of the game, displaying the character creation button or the "View Character" button if a character already exists.
   - character-creation.html: The page for creating a new character, including fields for name, gender, and class.
   - character-sheet.html: The page displaying the character's information, including name, gender, class, level, XP, gold, hit points, and inventory.
   - adventure.html: The page where players can go on adventures, encounter monsters, find items and gold, and engage in combat.
   - store.html: The page where players can buy and sell items using their gold.
   - styles.css: The CSS file containing the styles for all the game pages.
   - adventure.js: The JavaScript file handling the adventure system, including monster encounters, item finds, gold rewards, and combat.
   - character-creation.js: The JavaScript file handling the character creation process and storing the character data in local storage.
   - character-sheet.js: The JavaScript file handling the character sheet display, including level up logic and hit points restoration.
   - store.js: The JavaScript file handling the store functionality, including buying and selling items.
   - items.json: The JSON file containing the list of available items in the game, including their attributes such as name, type, description, price, and effect.
   - adventure.json: The JSON file containing the list of available adventures, including their title, description, monster encounter, item find, and gold reward probabilities.

3. Character Creation:
   - Players can create a new character by providing a name, gender, and class.
   - The character data is stored in local storage as a JSON object.
   - The character object includes properties such as name, gender, class, level, XP, gold, hit points, and inventory.

4. Character Sheet:
   - The character sheet displays the character's information, including name, gender, class, level, XP, gold, hit points, and inventory.
   - When the character levels up, their level is updated in local storage and displayed on the character sheet.
   - If the character's hit points are below the maximum, a countdown timer is displayed showing the time until the next hit point restoration.

5. Adventure System:
   - Players can go on adventures by clicking the "Go on an Adventure" button.
   - Each adventure is randomly selected from the adventure.json file.
   - Adventures can include monster encounters, item finds, and gold rewards based on predefined probabilities.
   - If a monster is encountered, players can choose to fight or run away.
   - During combat, the player and monster take turns attacking each other until one of them is defeated.
   - If the player wins the combat, they are awarded XP and redirected to the character sheet.
   - If the player loses the combat, they are knocked out and redirected to the character sheet.
   - If the player chooses to run away, they may lose a random item from their inventory.

6. Store System:
   - The store page displays a list of available items that players can buy using their gold.
   - Players can also sell items from their inventory for gold.
   - When buying an item, the player's gold is decreased by the item's price, and the item is added to their inventory.
   - When selling an item, the player's gold is increased by half of the item's price, and the item is removed from their inventory.
   - If an item in the player's inventory doesn't have a defined price, the store system checks against the items.json file to determine the sell price.

7. Item System:
   - Items in the game are defined in the items.json file.
   - Each item has attributes such as name, type, description, price, and effect.
   - When an item is added to the player's inventory, it is stored as an object with all its attributes.
   - The character sheet and store pages display the item's attributes when showing the player's inventory.

8. JSON Data:
   - The game uses two JSON files: items.json and adventure.json.
   - items.json contains the list of available items in the game, including their attributes.
   - adventure.json contains the list of available adventures, including their details and encounter probabilities.

9. Local Storage:
   - The game uses the browser's local storage to persist the character data across sessions.
   - The character object is stored in local storage as a JSON string.
   - Whenever the character data is updated (e.g., leveling up, buying/selling items), the local storage is updated accordingly.

10. UI and Styling:
    - The game pages are structured using HTML and styled using CSS.
    - The store page uses CSS flexbox to display the store items on the left and the player inventory on the right.
    - Buttons and item containers are styled for a consistent and visually appealing look.

Code Snippets:
- Refer to the individual JavaScript files (adventure.js, character-creation.js, character-sheet.js, store.js) for the complete code implementation of each system.
- Refer to the HTML files (index.html, character-creation.html, character-sheet.html, adventure.html, store.html) for the structure and layout of each game page.
- Refer to the CSS file (styles.css) for the styling of the game pages.

Note: Make sure to include the necessary HTML, CSS, and JavaScript files, as well as the JSON data files (items.json and adventure.json) in your project directory.

Feel free to ask any questions or provide further details about specific parts of the project!
