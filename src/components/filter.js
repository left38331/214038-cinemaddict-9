import AbstractComponent from "./abstract-components";

export default class Filter extends AbstractComponent {
  constructor({name, count}, status) {
    super();
    this._name = name;
    this._count = count;
    this._status = status;
  }

  getTemplate() {
    return `<a href="#${this._name}" class="${this._status} main-navigation__item ${this._name === this._status ? `main-navigation__item--active` : ``} ">${this._name === `all` ? `All movies` : this._name[0].toUpperCase() + this._name.substring(1)}${this._name === `all` ? `` : ` <span class="main-navigation__item-count">${this._count}</span>`}</a>`;
  }
}
