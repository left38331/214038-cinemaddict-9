import MovieController from "./movie";

export default class CardListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._cards = [];

    this._onDataChange = onDataChange.bind(this);
  }

  setCards(cards) {
    this._cards = cards;
    this._cards.forEach((film) => this._renderCards(film));
  }

  _renderCards(data) {
    return new MovieController(this._container, data, this._onDataChange);
  }

  addCards(cards) {
    cards.forEach((card) => this._renderCards(card));
    this._cards = this._cards.concat(cards);
  }
}
