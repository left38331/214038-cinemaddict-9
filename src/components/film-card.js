import AbstractComponent from "./abstract-components";

export default class Card extends AbstractComponent {
  constructor({name, posters, text, rating, premiere, duration, genre, countComments, watchlist, watched, favorite}) {
    super();
    this._name = name;
    this._posters = posters;
    this._text = text;
    this._rating = rating;
    this._premiere = premiere;
    this._duration = duration;
    this._genre = genre;
    this._countComments = countComments;
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
  }

  getTemplate() {
    return `<article class="film-card">
              <h3 class="film-card__title">${this._name}</h3>
              <p class="film-card__rating">${this._rating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${this._premiere.getFullYear()}</span>
                <span class="film-card__duration">${Math.floor(this._duration / 60) >= 1 ? Math.floor(this._duration / 60) : ``}h ${this._duration < 60 ? this._duration : this._duration % 60}m</span>
                <span class="film-card__genre">${this._genre}</span>
              </p>
              <img src="./images/posters/${this._posters}" alt="" class="film-card__poster">
              <p class="film-card__description">${this._text}</p>
              <a class="film-card__comments">${this._countComments} comments</a>
              <form class="film-card__controls">
                <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite ${this._favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
              </form>
            </article>`;
  }
}
