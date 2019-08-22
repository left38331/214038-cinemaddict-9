import {createElement} from "../utils";
import {unrender} from "../utils";

export default class NavigationContainer {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), `firstElement`);
    }

    return this._element;
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<nav class="main-navigation">
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
  }
}
