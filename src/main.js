import {createSearchLayout} from "./components/search";
import {createProfileLayout} from "./components/profile";
import {createNavagationLayout} from "./components/navigation";
import {createFiltersLayout} from "./components/filters";
import {createFilmsContainerLayout} from "./components/films-container";
import {createTopRatedLayout} from "./components/top-rated-films";
import {createMostCommentedLayout} from "./components/most-commented-films";
import {createCardFilmLayout} from "./components/film-card";
import {createShowMoreLayout} from "./components/button-show-more";
import {createFilmDetails} from "./components/film-detais";

const renderComponent = (container, position, layout) => {
  container.insertAdjacentHTML(position, layout);
};

const renderFilmsComponents = () => {
  const filmsContainer = document.querySelector(`.films`);
  const films = filmsContainer.querySelector(`.films-list`);
  const filmList = filmsContainer.querySelector(`.films-list .films-list__container`);

  renderComponent(filmList, `beforeend`, createCardFilmLayout());
  renderComponent(filmList, `beforeend`, createCardFilmLayout());
  renderComponent(filmList, `beforeend`, createCardFilmLayout());
  renderComponent(filmList, `beforeend`, createCardFilmLayout());
  renderComponent(filmList, `beforeend`, createCardFilmLayout());
  renderComponent(films, `beforeend`, createShowMoreLayout());
  renderComponent(filmsContainer, `beforeend`, createTopRatedLayout());
  renderComponent(filmsContainer, `beforeend`, createMostCommentedLayout());

  const filmsExtraBlocks = filmsContainer.querySelectorAll(`.films-list--extra .films-list__container`);

  renderComponent(filmsExtraBlocks[0], `beforeend`, createCardFilmLayout());
  renderComponent(filmsExtraBlocks[0], `beforeend`, createCardFilmLayout());
  renderComponent(filmsExtraBlocks[1], `beforeend`, createCardFilmLayout());
  renderComponent(filmsExtraBlocks[1], `beforeend`, createCardFilmLayout());
};

const renderAllComponents = () => {
  const header = document.querySelector(`.header`);
  const main = document.querySelector(`.main`);
  const footer = document.querySelector(`footer`);

  renderComponent(header, `beforeend`, createSearchLayout());
  renderComponent(header, `beforeend`, createProfileLayout());
  renderComponent(main, `beforeend`, createNavagationLayout());
  renderComponent(main, `beforeend`, createFiltersLayout());
  renderComponent(main, `beforeend`, createFilmsContainerLayout());
  renderComponent(footer, `afterend`, createFilmDetails());
  renderFilmsComponents();
};

renderAllComponents();
