export default class ModelMovie {
  constructor(data) {
    this.id = data[`id`];
    this.text = data[`film_info`][`description`];
    this.rating = data[`film_info`][`total_rating`];
    this.name = data[`film_info`][`title`];
    this.posters = data[`film_info`][`poster`];
    this.premiere = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.watchingDate = data[`user_details`][`watching_date`];
    this.customerRate = data[`user_details`][`personal_rating`];
    this.ratingSystem = data[`film_info`][`age_rating`];
    this.genre = data[`film_info`][`genre`];
    this.favorite = data[`user_details`][`favorite`];
    this.watched = data[`user_details`][`already_watched`];
    this.watchlist = data[`user_details`][`watchlist`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.alternatveTitle = data[`film_info`][`alternative_title`];

    this.comments = data[`comments`].length;
    this.commentsId = data[`comments`];
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'description': this.text,
        'total_rating': this.rating,
        'title': this.name,
        'alternative_title': this.alternatveTitle,
        'poster': this.posters,
        'age_rating': this.ratingSystem,
        'release': {
          'date': this.premiere,
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': this.genre,
        'director': this.director,
        'writers': [...this.writers],
        'actors': [...this.actors]
      },
      'user_details': {
        'personal_rating': this.customerRate,
        'watchlist': this.watchlist,
        'already_watched': this.watched,
        'watching_date': `2019-05-11T16:12:32.554Z`,
        'favorite': this.favorite,
      },
      'comments': this.commentsId
    };
  }
}
