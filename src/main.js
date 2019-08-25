import {configAllCard} from "./data";
import {configFilters} from "./data";
import {render, Position, defineRank} from "./utils";
import Search from "./components/search";
import Profile from "./components/profile";
import FilterContainer from "./components/filter-container";
import Filter from "./components/filter";
import SortingContainer from "./components/sortiing-container";
import FooterStatistic from "./components/footer-statistic";
import PageController from "./controller/films";

const renderSearch = (container) => {
  const search = new Search();

  render(container, search.getElement());
};

const renderProfile = (container) => {
  const profile = new Profile(defineRank());

  render(container, profile.getElement());
};

const renderFilterContainer = (container) => {
  const filterContainer = new FilterContainer();

  render(container, filterContainer.getElement());
};

const renderFilters = (container, filter) => {
  const oneFilter = new Filter(filter);

  render(container, oneFilter.getElement(), Position.AFTERBEGIN);
};

const renderSortingContainer = (container) => {
  const sortingContainer = new SortingContainer();

  render(container, sortingContainer.getElement());
};

const renderFooterStatistic = (container) => {
  const footerStatistic = new FooterStatistic(configFilters[0][`count`]);

  render(container, footerStatistic.getElement());
};

const renderAllComponents = () => {
  const header = document.querySelector(`.header`);
  const main = document.querySelector(`.main`);
  const footer = document.querySelector(`.footer`);

  renderSearch(header);
  renderProfile(header);
  renderFilterContainer(main);
  renderSortingContainer(main);
  renderFooterStatistic(footer);

  const filtersContainer = main.querySelector(`.main-navigation`);

  configFilters.reverse().forEach((filter) => renderFilters(filtersContainer, filter));
};

renderAllComponents();

const main = document.querySelector(`.main`);
const pageController = new PageController(main, configAllCard);

pageController.init();
