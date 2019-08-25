import AbstractComponent from "./abstract-components";

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
