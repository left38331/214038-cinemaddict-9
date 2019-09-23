import {render, defineMostValuesCards, Sorting, getAllFiltersConfig, Position} from "../utils";
import FilmsContainer from "../components/films-container";
import FilmsList from "../components/films-list";
import TopRatedContainer from "../components/top-rated-films";
import TopCommentedContainer from "../components/most-commented-films";
import ButtonShowMore from "../components/button-show-more";
import NoFilms from "../components/no-films";
import SortingContainer from "../components/sortiing-container";
import Filter from "../components/filter";
import NavigationContainer from "../components/filter-container";

import CardListController from "./cardListController";
import ChartJs from "./chart";

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sort = new SortingContainer();
    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();
    this._topRatedContainer = new TopRatedContainer();
    this._topCommentedContainer = new TopCommentedContainer();
    this._navigationContainer = new NavigationContainer();

    this._cardListController = new CardListController(this._filmsList.getElement(), this._onDataChange.bind(this));
    this._cardRatingListController = new CardListController(this._topRatedContainer.getElement(), this._onDataChange.bind(this));
    this._cardCommentedListController = new CardListController(this._topCommentedContainer.getElement(), this._onDataChange.bind(this));

    this._CARDS_IN_ROW = 5;
    this._countShownCard = 5;

    this._allFilmsCard = [];
    this._constCardsConfig = [];
    this._currentlyCardsConfig = [];

    this._filterStatus = `all`;
    this._onDataChange = this._onDataChange.bind(this);
    this._init();
  }

  _init() {
    render(this._container, this._navigationContainer.getElement(), Position.AFTERBEGIN);
    render(this._container, this._sort.getElement());
    render(this._container, this._filmsContainer.getElement());
    render(this._filmsContainer.getElement(), this._filmsList.getElement());
    render(this._filmsContainer.getElement(), this._topRatedContainer.getElement());
    render(this._filmsContainer.getElement(), this._topCommentedContainer.getElement());
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._identifierSwitchMenu();
  }

  _renderFilmsContainer(films, count = 5) {
    const btnShowMore = document.querySelector(`.films-list__show-more`);

    if (btnShowMore !== null) {
      btnShowMore.remove();
    }

    this._navigationContainer.getElement().innerHTML = `<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`;
    this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._topRatedContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    this._topCommentedContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    getAllFiltersConfig(this._constCardsConfig).reverse().forEach((filter) => this._renderFilters(this._navigationContainer.getElement(), filter));

    this._cardRatingListController.setCards(defineMostValuesCards(`rating`, this._constCardsConfig));
    this._cardCommentedListController.setCards(defineMostValuesCards(`comments`, this._constCardsConfig));
    this._cardListController.setCards(films.slice(0, count));

    if (films.length > count) {
      this._renderShowMore(films);
    }
  }

  show(films) {
    this._allFilmsCard = films;
    this._constCardsConfig = films;
    this._currentlyCardsConfig = films;
    this._renderFilmsContainer(films);
  }

  _renderFilters(container, data) {
    const filter = new Filter(data, this._filterStatus);

    render(container, filter.getElement(), Position.AFTERBEGIN);
  }

  _onDataChange(newData, oldData) {
    this._allFilmsCard[this._allFilmsCard.findIndex((it) => it === oldData)] = newData;
    this._constCardsConfig[this._allFilmsCard.findIndex((it) => it === oldData)] = newData;
    this._renderFilmsContainer(this._allFilmsCard.slice(), this._countShownCard);
  }

  _renderShowMore(films) {
    const buttonShowMore = new ButtonShowMore();

    buttonShowMore.getElement().addEventListener(`click`, () => {
      this._cardListController.addCards(films.slice(this._countShownCard, this._countShownCard + this._CARDS_IN_ROW));
      this._countShownCard += this._CARDS_IN_ROW;

      if (this._countShownCard >= films.length) {
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
        this._allFilmsCard = this._allFilmsCard.slice().sort((a, b) => b.premiere - a.premiere);
        this._renderFilmsContainer(this._allFilmsCard, this._countShownCard);
        evt.target.classList.add(`sort__button--active`);
        break;
      case Sorting.RATING:
        this._allFilmsCard = this._allFilmsCard.slice().sort((a, b) => b.rating - a.rating);
        this._renderFilmsContainer(this._allFilmsCard, this._countShownCard);
        evt.target.classList.add(`sort__button--active`);
        break;
      case Sorting.DEFAULT:
        this._renderFilmsContainer(this._currentlyCardsConfig, this._countShownCard);
        evt.target.classList.add(`sort__button--active`);
        break;
    }
  }

  _switchActiveStatus(linkValue) {
    const allHref = document.querySelectorAll(`.main-navigation a`);

    allHref.forEach((link) => link.classList.remove(`main-navigation__item--active`));
    document.querySelector(`[href="#${linkValue}"]`).classList.add(`main-navigation__item--active`);
  }

  _switchDefaultSortStatus() {
    document.querySelectorAll(`.sort a`).forEach((link) => link.classList.remove(`sort__button--active`));
    document.querySelector(`[data-sort="default"]`).classList.add(`sort__button--active`);
  }

  _renderAllMovie() {
    this._currentlyCardsConfig = this._constCardsConfig.slice();
    this._allFilmsCard = this._constCardsConfig.slice();
    this._countShownCard = this._CARDS_IN_ROW;
    this._renderFilmsContainer(this._constCardsConfig.slice(), this._countShownCard);
  }

  _renderAllSelected(linkValue, type) {
    const allSelectedFilms = [];

    this._switchDefaultSortStatus();
    this._constCardsConfig.slice().forEach((card) => {
      if (card[type] === true) {
        allSelectedFilms.push(card);
      }
    });

    this._currentlyCardsConfig = allSelectedFilms;
    this._allFilmsCard = allSelectedFilms;
    this._countShownCard = this._CARDS_IN_ROW;
    this._renderFilmsContainer(this._allFilmsCard.slice());
    this._switchActiveStatus(linkValue);
  }

  _showStatistics() {
    const statistic = document.querySelector(`.statistic`);
    const sort = document.querySelector(`.sort`);
    const films = document.querySelector(`.films`);
    const selector = document.querySelector(`.statistic__chart`);
    const chart = new ChartJs(selector);

    statistic.classList.remove(`visually-hidden`);
    sort.classList.add(`visually-hidden`);
    films.classList.add(`visually-hidden`);
    chart.showChart();
  }

  _hideStatistics() {
    const statistic = document.querySelector(`.statistic`);
    const sort = document.querySelector(`.sort`);
    const films = document.querySelector(`.films`);

    statistic.classList.add(`visually-hidden`);
    sort.classList.remove(`visually-hidden`);
    films.classList.remove(`visually-hidden`);
  }

  _identifierSwitchMenu() {
    const siteMenu = document.querySelector(`.main-navigation`);

    siteMenu.addEventListener(`click`, (evt) => {
      let linkValue;

      if (evt.target.tagName === `SPAN`) {
        linkValue = evt.target.closest(`a`).href.split(`#`)[1];
      } else if (evt.target.tagName === `A`) {
        linkValue = evt.target.href.split(`#`)[1];
      } else {
        return;
      }

      this._filterStatus = linkValue;
      this._switchMenuSite(linkValue);
    });
  }

  _switchMenuSite(linkValue) {
    switch (linkValue) {
      case `stats`:
        this._showStatistics();
        this._switchActiveStatus(linkValue);
        break;
      case `all`:
        this._hideStatistics();
        this._switchDefaultSortStatus();
        this._renderAllMovie();
        break;
      case `watchlist`:
        this._hideStatistics();
        this._renderAllSelected(linkValue, `watchlist`);
        break;
      case `history`:
        this._hideStatistics();
        this._renderAllSelected(linkValue, `watched`);
        break;
      case `favorites`:
        this._hideStatistics();
        this._renderAllSelected(linkValue, `favorite`);
        break;
    }
  }
}
