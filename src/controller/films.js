import {render, defineMostValuesCards, Sorting} from "../utils";
import FilmsContainer from "../components/films-container";
import FilmsList from "../components/films-list";
import TopRatedContainer from "../components/top-rated-films";
import TopCommentedContainer from "../components/most-commented-films";
import ButtonShowMore from "../components/button-show-more";
import NoFilms from "../components/no-films";
import SortingContainer from "../components/sortiing-container";
import MovieController from "./movie";

export default class PageController {
  constructor(container, cards) {
    this._container = container;
    this._allCards = cards.slice();
    this._cardsForShowMore = cards.slice().splice(5);
    this._firstPartCards = cards.slice(0, 5);
    this._sort = new SortingContainer();
    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();
    this._topRatedContainer = new TopRatedContainer();
    this._topCommentedContainer = new TopCommentedContainer();

    this._allRenderCards = this._allRenderCards();
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement());
    render(this._container, this._filmsContainer.getElement());

    if (this._allRenderCards.length === 0) {
      render(this._container, this._noFilms.getElement());
    } else {
      render(this._filmsContainer.getElement(), this._filmsList.getElement());
      render(this._filmsContainer.getElement(), this._topRatedContainer.getElement());
      render(this._filmsContainer.getElement(), this._topCommentedContainer.getElement());
      this._allRenderCards.forEach((film) => this._renderCards(film));
      defineMostValuesCards(`rating`).forEach((film) => this._renderCards(film, this._topRatedContainer.getElement()));
      defineMostValuesCards(`comments`).forEach((film) => this._renderCards(film, this._topCommentedContainer.getElement()));

      if (this._allCards.length > 8) {
        this._renderShowMore(this._allCards);
      }

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  _renderFilmsContainer(films) {
    this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._topRatedContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._topCommentedContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    films.forEach((film) => this._renderCards(film));
    defineMostValuesCards(`rating`, this._allCards).forEach((film) => this._renderCards(film, this._topRatedContainer.getElement()));
    defineMostValuesCards(`comments`, this._allCards).forEach((film) => this._renderCards(film, this._topCommentedContainer.getElement()));
  }

  _renderCards(data, container = this._filmsList.getElement()) {
    return new MovieController(container, data, this._onDataChange);
  }

  _onDataChange(newData, oldData) {
    this._allRenderCards[this._allRenderCards.findIndex((it) => it === oldData)] = newData;
    this._allCards[this._allRenderCards.findIndex((it) => it === oldData)] = newData;
    this._renderFilmsContainer(this._allRenderCards);
  }

  _renderShowMore() {
    const buttonShowMore = new ButtonShowMore();

    buttonShowMore.getElement().addEventListener(`click`, () => {
      const newCards = this._cardsForShowMore.splice(0, 5);

      this._allRenderCards = this._allRenderCards.concat(newCards);
      newCards.forEach((film) => this._renderCards(film));

      if (this._cardsForShowMore.length < 1) {
        buttonShowMore.removeElement();
      }
    });

    render(this._filmsList.getElement(), buttonShowMore.getElement());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const allLinkSort = this._sort.getElement().querySelectorAll(`.sort__button`);

    allLinkSort.forEach((link) => link.classList.remove(`sort__button--active`));
    this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case Sorting.DATE:
        this._allRenderCards.slice().sort((a, b) => b.premiere - a.premiere).forEach((film) => this._renderCards(film));
        evt.target.classList.add(`sort__button--active`);
        break;
      case Sorting.RATING:
        this._allRenderCards.slice().sort((a, b) => b.rating - a.rating).forEach((film) => this._renderCards(film));
        evt.target.classList.add(`sort__button--active`);
        break;
      case Sorting.DEFAULT:
        this._allRenderCards.forEach((film) => this._renderCards(film));
        evt.target.classList.add(`sort__button--active`);
        break;
    }
  }

  _allRenderCards() {
    return this._firstPartCards;
  }
}
