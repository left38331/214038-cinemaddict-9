export const createCardFilmLayout = ({name, posters, text, rating, premiere, duration, genre, countComments, watchlist, watched, favorite}) => `
    <article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${premiere.getFullYear()}</span>
        <span class="film-card__duration">${Math.floor(duration / 60) >= 1 ? Math.floor(duration / 60) : ``}h ${duration < 60 ? duration : duration % 60}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${posters}" alt="" class="film-card__poster">
      <p class="film-card__description">${text}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>
`;
