import {configAllCard} from "./data";
import {render, defineRank, getAllFiltersConfig, AUTHORIZATION, END_POINT} from "./utils";
import Search from "./components/search";
import Profile from "./components/profile";
import FooterStatistic from "./components/footer-statistic";
import PageController from "./controller/films";
import SearchController from "./controller/search-controller";
import StatisticsController from "./controller/statistics-controller";
import {API} from "./server";
import MovieController from "./controller/movie";

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

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const onDataChange = (actionType, update, renderComments = null) => {
  switch (actionType) {
    case `delete`:
      api.deleteComment({id: update})
        .then(() => api.getFilms())
        .then((films) => pageController.show(films))
        .then(() =>{
          if (renderComments) {
            renderComments();
          }
        });
      break;
    case `update`:
      api.updateFilm({
        id: update.id,
        data: update.toRAW()
      })
        .then(() => api.getFilms())
        .then((films) => pageController.show(films));
      break;
  }
};

const pageController = new PageController(main, onDataChange);

api.getFilms().then((films) => pageController.show(films));

// const searchController = new SearchController(main, search);
// searchController.show(configAllCard);
//
// const inputSearch = search.getElement().querySelector(`input`);
//
// inputSearch.addEventListener(`keyup`, () => {
//   if (inputSearch.value.length === 0) {
//     searchController.hideResult();
//     pageController.show(configAllCard);
//   }
// });
//
// search.getElement().querySelector(`.search__reset`).addEventListener(`click`, () => {
//   searchController.hideResult();
//   pageController.show(configAllCard);
// });
