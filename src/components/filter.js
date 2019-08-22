import {createElement} from "../utils";
import {unrender} from "../utils";

export default class Filter {
  constructor({name, count}) {
    this._name = name;
    this._count = count;
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
    return `<a href="#${this._name}" class="main-navigation__item ${this._name === `all` ? `main-navigation__item--active` : ``} ">${this._name === `all` ? `All movies` : this._name[0].toUpperCase() + this._name.substring(1)}${this._name === `all` ? `` : ` <span class="main-navigation__item-count">${this._count}</span>`}</a>`;
  }
}
