import AbstractComponent from "./abstract-components";

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list">
                <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                <div class="films-list__container">
                </div>
              </section>
    `;
  }
}
