import {createElement} from "../utils";
import {unrender} from "../utils";

export default class NoFilms {
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
    return `<div class="no-result">
              There are no movies in our database
            </div>`;
  }
}
