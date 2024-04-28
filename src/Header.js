export class HeaderComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <header>
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="character-creation.html">Character Creation</a></li>
              <li><a href="adventure.html">Adventure</a></li>
              <li><a href="character-sheet.html">Character Sheet</a></li>
              <li><a href="store.html">Store</a></li>
            </ul>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', HeaderComponent);