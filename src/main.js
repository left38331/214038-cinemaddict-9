import {createSearchLayout} from "./components/search";
import {createProfileLayout} from "./components/profile";
import {createNavagationLayout} from "./components/filter-container";
import {createFilterLayout} from "./components/filter";
import {createFiltersLayout} from "./components/sortiing-container";
import {createFilmsContainerLayout} from "./components/films-container";
import {createTopRatedLayout} from "./components/top-rated-films";
import {createMostCommentedLayout} from "./components/most-commented-films";
import {createCardFilmLayout} from "./components/film-card";
import {createShowMoreLayout} from "./components/button-show-more";
import {createFilmDetails} from "./components/film-detais";
import {createFooterStatisticLayout} from "./components/footer-statistic";
import {configAllCard} from "./data";
import {configFilters} from "./data";

const fullConfigCards = configAllCard.slice();
const firstPartCards = configAllCard.splice(0, 5);

const renderComponent = (container, layout, position = `beforeend`) => {
  container.insertAdjacentHTML(position, layout);
};

const renderFirstFilmCards = (container) => {
  renderComponent(container, firstPartCards.map(createCardFilmLayout).join(``));
};

const renderRestFilmCards = (array, container, button) => {
  const newCards = array.splice(0, 5);
  renderComponent(container, newCards.splice(0, 5).map(createCardFilmLayout).join(``));

  if (array.length < 1) {
    button.remove();
  }
};

const renderFilter = () => {
  const filtersContainer = document.querySelector(`.main-navigation`);

  renderComponent(filtersContainer, configFilters.map(createFilterLayout).join(``), `afterbegin`);
};

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

const renderPopupDetails = () => {
  const footer = document.querySelector(`footer`);

  renderComponent(footer, createFilmDetails(fullConfigCards[0]), `afterend`);
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

const renderMostValuesCards = (value, itemSelector) => {
  const filmsExtraBlocks = document.querySelectorAll(`.films-list--extra .films-list__container`);
  const arrayMost = defineMostValues(fullConfigCards, value);
  const mostValueItems = fullConfigCards.slice(arrayMost[0], arrayMost[0] + 1).concat(fullConfigCards.slice(arrayMost[1], arrayMost[1] + 1));

  renderComponent(filmsExtraBlocks[itemSelector], mostValueItems.map(createCardFilmLayout).join(``));
};

const renderFilmsComponents = () => {
  const filmsContainer = document.querySelector(`.films`);
  const films = filmsContainer.querySelector(`.films-list`);
  const filmList = filmsContainer.querySelector(`.films-list .films-list__container`);

  renderFirstFilmCards(filmList);
  renderComponent(films, createShowMoreLayout());
  renderComponent(filmsContainer, createTopRatedLayout());
  renderComponent(filmsContainer, createMostCommentedLayout());
  renderMostValuesCards(`rating`, 0);
  renderMostValuesCards(`countComments`, 1);
};

const renderAllComponents = () => {
  const header = document.querySelector(`.header`);
  const main = document.querySelector(`.main`);
  const footer = document.querySelector(`.footer`);

  renderComponent(header, createSearchLayout());
  renderComponent(header, createProfileLayout(defineRank()));
  renderComponent(main, createNavagationLayout());
  renderFilter();
  renderComponent(main, createFiltersLayout());
  renderComponent(main, createFilmsContainerLayout());
  renderComponent(footer, createFooterStatisticLayout(configFilters[0][`count`]));
  renderPopupDetails();
  renderFilmsComponents();
};

renderAllComponents();

const loadMoreButton = document.querySelector(`.films-list__show-more`);
const closePopupBtn = document.querySelector(`.film-details__close-btn`);

loadMoreButton.addEventListener(`click`, function () {
  renderRestFilmCards(configAllCard, document.querySelector(`.films-list .films-list__container`), loadMoreButton);
});

closePopupBtn.addEventListener(`click`, function () {
  document.querySelector(`.film-details`).remove();
});
