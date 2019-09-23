import {configAllCard} from "./data";
import {render, defineRank, getAllFiltersConfig} from "./utils";
import Search from "./components/search";
import Profile from "./components/profile";
import FooterStatistic from "./components/footer-statistic";
import PageController from "./controller/films";
import SearchController from "./controller/search-controller";
import StatisticsController from "./controller/statistics-controller";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const search = new Search();
const profile = new Profile(defineRank());
const footerStatistic = new FooterStatistic(getAllFiltersConfig(configAllCard)[0][`count`]);

render(header, search.getElement());
render(header, profile.getElement());
render(footer, footerStatistic.getElement());

const statisticsController = new StatisticsController(main, configAllCard);
statisticsController.init();

const pageController = new PageController(main, configAllCard);
pageController.show(configAllCard);

const searchController = new SearchController(main, search);
searchController.show(configAllCard);

const inputSearch = search.getElement().querySelector(`input`);

inputSearch.addEventListener(`keyup`, () => {
  if (inputSearch.value.length === 0) {
    searchController.hideResult();
    pageController.show(configAllCard);
  }
});

search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
  searchController.hideResult();
  pageController.show(configAllCard);
});
