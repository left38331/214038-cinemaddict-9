import AbstractComponent from "./abstract-components";

export default class SearchNoResult extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">
              There is no movies for your request.
            </div>`;
  }
}
