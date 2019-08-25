import AbstractComponent from "./abstract-components";

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">
              There are no movies in our database
            </div>`;
  }
}
