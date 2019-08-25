import AbstractComponent from "./abstract-components";

export default class FooterStatistic extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return `<section class="footer__statistics">
              <p>${this._count} movies inside</p>
            </section>`;
  }
}
