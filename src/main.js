import {configAllCard} from "./data";
import {configFilters} from "./data";
import {render} from "./utils";
import {Position} from "./utils";
import Search from "./components/search";
import Profile from "./components/profile";
import FilterContainer from "./components/filter-container";
import Filter from "./components/filter";
import SortingContainer from "./components/sortiing-container";
import FilmsContainer from "./components/films-container";
import Card from "./components/film-card";
import CardPopup from "./components/film-detais";
import ButtonShowMore from "./components/button-show-more";
import TopRatedContainer from "./components/top-rated-films";
import TopCommentedContainer from "./components/most-commented-films";
import FooterStatistic from "./components/footer-statistic";

const fullConfigCards = configAllCard.slice();
const firstPartCards = configAllCard.splice(0, 5);

const defineRank = () => {
  const count = configFilters[2].count;
  let rank;

  if (count === 0) {
    rank = ``;
  } else if (count > 0 && count <= 10) {
    rank = `novice`;
  } else if (count > 10 && count <= 20) {
    rank = `fan`;
  } else {
    rank = `movie buff`;
  }

  return rank;
};

const defineMostValues = (config, type) => {
  const supportArray = [];
  const arrayValues = [];
  const arrayMostValue = [];

  config.map((item, i) => supportArray.push({i, [type]: item[type].toString()}));
  supportArray.map((item) => arrayValues.push(item[type]));

  let twoMostValueElements = arrayValues.sort().splice(-2, 2).sort();
  const [one, two] = twoMostValueElements;

  supportArray.map((item, i) => {
    if (two.indexOf(item[type]) !== -1) {
      arrayMostValue.push(i);
    }
  });

  supportArray.map((item, i) => {
    if (one.indexOf(item[type]) !== -1) {
      arrayMostValue.push(i);
    }
  });

  return arrayMostValue;
};

const defineMostValuesCards = (value) => {
  const arrayMost = defineMostValues(fullConfigCards, value);

  return fullConfigCards.slice(arrayMost[0], arrayMost[0] + 1).concat(fullConfigCards.slice(arrayMost[1], arrayMost[1] + 1));
};

const renderSearch = (container) => {
  const search = new Search();

  render(container, search.getElement(), Position.BEFOREEND);
};

const renderProfile = (container) => {
  const profile = new Profile(defineRank());

  render(container, profile.getElement(), Position.BEFOREEND);
};

const renderFilterContainer = (container) => {
  const filterContainer = new FilterContainer(defineRank());

  render(container, filterContainer.getElement(), Position.BEFOREEND);
};

const renderFilters = (container, filter) => {
  const oneFilter = new Filter(filter);

  render(container, oneFilter.getElement(), Position.AFTERBEGIN);
};

const renderSortingContainer = (container) => {
  const sortingContainer = new SortingContainer(defineRank());

  render(container, sortingContainer.getElement(), Position.BEFOREEND);
};

const renderFilmsContainer = (container) => {
  const filmsContainer = new FilmsContainer(defineRank());

  render(container, filmsContainer.getElement(), Position.BEFOREEND);
};

const renderCards = (container, film) => {
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
      render(document.querySelector(`body`), cardPopup.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      document.addEventListener(`click`, onClickClose);
    }
  });

  render(container, card.getElement(), Position.BEFOREEND);
};

const renderShowMore = (container, listFilms) => {
  const buttonShowMore = new ButtonShowMore();

  buttonShowMore.getElement().addEventListener(`click`, () => {
    const newCards = configAllCard.splice(0, 5);

    if (newCards.length < 1) {
      buttonShowMore.removeElement();
    }

    newCards.forEach((film) => renderCards(listFilms, film));
  });

  render(container, buttonShowMore.getElement(), Position.BEFOREEND);
};

const renderTopRatedContainer = (container) => {
  const topRatedContainer = new TopRatedContainer();

  render(container, topRatedContainer.getElement(), Position.BEFOREEND);
};

const renderTopCommentedContainer = (container) => {
  const topCommentedContainer = new TopCommentedContainer();

  render(container, topCommentedContainer.getElement(), Position.BEFOREEND);
};

const renderFooterStatistic = (container) => {
  const footerStatistic = new FooterStatistic(configFilters[0][`count`]);

  render(container, footerStatistic.getElement(), Position.BEFOREEND);
};

const renderAllComponents = () => {
  const header = document.querySelector(`.header`);
  const main = document.querySelector(`.main`);
  const footer = document.querySelector(`.footer`);

  renderSearch(header);
  renderProfile(header);
  renderFilterContainer(main);
  renderSortingContainer(main);
  renderFilmsContainer(main);
  renderFooterStatistic(footer);

  const filtersContainer = main.querySelector(`.main-navigation`);
  const filmsContainer = main.querySelector(`.films`);
  const films = main.querySelector(`.films-list`);
  const filmList = main.querySelector(`.films-list .films-list__container`);

  configFilters.reverse().forEach((filter) => renderFilters(filtersContainer, filter));
  firstPartCards.forEach((film) => renderCards(filmList, film));
  renderShowMore(films, filmList);
  renderTopRatedContainer(filmsContainer);
  renderTopCommentedContainer(filmsContainer);

  const filmsExtraBlocks = main.querySelectorAll(`.films-list--extra .films-list__container`);

  defineMostValuesCards(`rating`).forEach((film) => renderCards(filmsExtraBlocks[0], film));
  defineMostValuesCards(`countComments`).forEach((film) => renderCards(filmsExtraBlocks[1], film));
};

renderAllComponents();
