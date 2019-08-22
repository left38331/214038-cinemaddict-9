import {createElement} from "../utils";
import {unrender} from "../utils";

export default class FooterStatistic {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), `firstElement`);
    }

    return this._element;
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<section class="footer__statistics">
              <p>${this._count} movies inside</p>
            </section>`;
  }
}
