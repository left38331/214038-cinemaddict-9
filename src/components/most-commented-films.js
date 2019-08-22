import {createElement} from "../utils";
import {unrender} from "../utils";

export default class TopCommentedContainer {
  constructor() {
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
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
          
              <div class="films-list__container">
                
              </div>
            </section>`;
  }
}
