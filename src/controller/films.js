import {render, defineMostValuesCards, Sorting} from "../utils";
import FilmsContainer from "../components/films-container";
import FilmsList from "../components/films-list";
import TopRatedContainer from "../components/top-rated-films";
import TopCommentedContainer from "../components/most-commented-films";
import ButtonShowMore from "../components/button-show-more";
import Card from "../components/film-card";
import CardPopup from "../components/film-detais";
import NoFilms from "../components/no-films";
import SortingContainer from "../components/sortiing-container";
import {configAllCard} from "../data";

export default class PageController {
  constructor(container, cards) {
    this._container = container;
    this._allCards = cards.slice();
    this._firstPartCards = cards.splice(0, 5);
    this._sort = new SortingContainer();
    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();
    this._topRatedContainer = new TopRatedContainer();
    this._topCommentedContainer = new TopCommentedContainer();
  }

  init() {
    render(this._container, this._sort.getElement());
    render(this._container, this._filmsContainer.getElement());

    if (this._firstPartCards.length === 0) {
      render(this._container, this._noFilms.getElement());
    } else {
      render(this._filmsContainer.getElement(), this._filmsList.getElement());
      render(this._filmsContainer.getElement(), this._topRatedContainer.getElement());
      render(this._filmsContainer.getElement(), this._topCommentedContainer.getElement());
      this._firstPartCards.forEach((film) => this._renderCards(film));
      defineMostValuesCards(`rating`).forEach((film) => this._renderCards(film, this._topRatedContainer.getElement()));
      defineMostValuesCards(`countComments`).forEach((film) => this._renderCards(film, this._topCommentedContainer.getElement()));

      if (this._allCards.length > 8) {
        this._renderShowMore(this._allCards);
      }

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  _renderCards(film, container = this._filmsList.getElement()) {
    const card = new Card(film);
    const cardPopup = new CardPopup(film);

    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        cardPopup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onClickClose = (e) => {
      if (e.target.classList.contains(`film-details__close-btn`)) {
        cardPopup.removeElement();
      }
    };

    card.getElement().addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`film-card__poster`) || e.target.classList.contains(`film-card__title`) || e.target.classList.contains(`film-card__comments`)) {
        render(document.querySelector(`body`), cardPopup.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
        document.addEventListener(`click`, onClickClose);

        const commentInput = cardPopup.getElement().querySelector(`.film-details__comment-input`);

        commentInput.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeyDown));
        commentInput.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeyDown));
      }
    });

    render(container.querySelector(`.films-list__container`), card.getElement());
  }

  _renderShowMore() {
    const buttonShowMore = new ButtonShowMore();

    buttonShowMore.getElement().addEventListener(`click`, () => {
      const newCards = configAllCard.splice(0, 5);

      newCards.forEach((film) => this._renderCards(film));

      if (configAllCard.length < 1) {
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

    this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case Sorting.DATE:
        this._firstPartCards.slice().sort((a, b) => b.premiere - a.premiere).forEach((film) => this._renderCards(film));
        break;
      case Sorting.RATING:
        this._firstPartCards.slice().sort((a, b) => b.rating - a.rating).forEach((film) => this._renderCards(film));
        break;
      case Sorting.DEFAULT:
        this._firstPartCards.forEach((film) => this._renderCards(film));
        break;
    }
  }
}
