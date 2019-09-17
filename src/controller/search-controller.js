import {render, Position} from "../utils";
import SearchResult from "../components/search-result";
import CardListController from "./cardListController";
import SearchNoResult from "../components/search-no-result";

export default class SearchController {
  constructor(container, search) {
    this._container = container;
    this._search = search;

    this._filmsList = document.querySelector(`.films-list`);

    this._searchResult = new SearchResult({});
    this._searchNoResult = new SearchNoResult();
    this._cardListController = new CardListController(this._filmsList, this._onDataChange.bind(this));

    this._onDataChange = this._onDataChange.bind(this);
  }

  show(cards) {
    const inputSearch = this._search.getElement().querySelector(`input`);

    inputSearch.addEventListener(`keyup`, (evt) => {
      if (inputSearch.value.length >= 3) {
        const value = evt.target.value;

        this.showResults(cards, value);
      }
    });
  }

  showResults(cards, value) {
    const navigation = document.querySelector(`.main-navigation`);
    const sort = document.querySelector(`.sort`);
    const extraFilms = document.querySelectorAll(`.films-list--extra`);
    const filmsListContainer = document.querySelector(`.films-list__container`);
    const filmsList = document.querySelector(`.films-list`);
    const showMoreBtn = document.querySelector(`.films-list__show-more`);
    const searchFilms = cards.filter((card) => card.name.toLowerCase().includes(value.toLowerCase()));

    if (showMoreBtn !== null) {
      showMoreBtn.remove();
    }

    navigation.classList.add(`visually-hidden`);
    sort.classList.add(`visually-hidden`);
    extraFilms.forEach((block) => block.classList.add(`visually-hidden`));

    if (searchFilms.length > 0) {
      this._searchNoResult.removeElement();
      filmsListContainer.classList.remove(`visually-hidden`);
      filmsListContainer.innerHTML = ``;
      this._cardListController.setCards(searchFilms);
    } else {
      filmsListContainer.classList.add(`visually-hidden`);
      render(filmsList, this._searchNoResult.getElement(), Position.AFTERBEGIN);
    }

    this._searchResult.removeElement();
    this._searchResult = new SearchResult(searchFilms.length);
    render(this._container, this._searchResult.getElement(), Position.AFTERBEGIN);
  }

  hideResult() {
    const navigation = document.querySelector(`.main-navigation`);
    const sort = document.querySelector(`.sort`);
    const extraFilms = document.querySelectorAll(`.films-list--extra`);
    const filmsListContainer = document.querySelector(`.films-list__container`);

    navigation.classList.remove(`visually-hidden`);
    sort.classList.remove(`visually-hidden`);
    filmsListContainer.classList.remove(`visually-hidden`);
    extraFilms.forEach((block) => block.classList.remove(`visually-hidden`));
    this._searchResult.removeElement();
    this._searchNoResult.removeElement();
  }

  _onDataChange() {

  }
}
