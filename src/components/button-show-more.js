import AbstractComponent from "./abstract-components";

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
