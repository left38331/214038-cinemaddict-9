const getCartData = () => ({
  name: new Set([
    `Побег из Шоушенка`,
    `Крестный отец`,
    `Темный рыцарь`,
    `Крестный отец 2`,
    `Властелин колец: Возвращение короля`,
    `Криминальное чтиво `,
    `Список Шиндлера`,
    `12 разгневанных мужчин `,
    `Начало `,
    `Властелин колец: Братство кольца`,
    `Форрест Гамп`,
    `Хороший, плохой, злой`,
    `Властелин колец: Две крепости`,
    `Матрица`,
    `Славные парни`
  ]),
  posters: new Set([
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ]),
  text: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ],
  rating: (Math.random() * (10 - 1) + 1).toFixed(1),
  premiere: new Date(new Date(1925, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1925, 0, 1).getTime())),
  duration: Math.round(Math.random() * (240 - 90) + 90),
  genre: new Set([
    `Western`,
    `Drama`,
    `Action`,
    `Comedy`,
    `Cartoon`,
    `Musical`,
    `Mystery`
  ]),
  countComments: Math.round(Math.random() * (10 - 1) + 1),
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random()))
});

const getConfigAllCard = () => {
  const arrayConfig = [];

  for (let name of getCartData().name) {
    const config = getCartData();

    arrayConfig.push({
      name,
      posters: [...config.posters][Math.floor(Math.random() * config.posters.size)],
      text: config.text.sort(() => 0.5 - Math.random()).slice(0, Math.random() * (1 - 4) + 4).join(` `),
      rating: config.rating,
      premiere: config.premiere,
      duration: config.duration,
      genre: [...config.genre][Math.floor(Math.random() * config.genre.size)],
      countComments: config.countComments,
      watchlist: config.watchlist,
      watched: config.watched,
      favorite: config.favorite
    });
  }

  return arrayConfig.sort(() => 0.5 - Math.random());
};

const configAllCard = getConfigAllCard();

const getCountFilmsOptions = (config) => {
  const countAllFilters = new Set();
  let countWathlist = 0;
  let countWatced = 0;
  let countFavorite = 0;

  config.forEach(({watchlist, watched, favorite}) => {
    if (watchlist) {
      countWathlist++;
    }

    if (watched) {
      countWatced++;
    }

    if (favorite) {
      countFavorite++;
    }
  });

  countAllFilters.all = config.length;
  countAllFilters.watchlist = countWathlist;
  countAllFilters.history = countWatced;
  countAllFilters.favorites = countFavorite;

  return countAllFilters;
};

const getAllFiltersConfig = () => {
  const arrayFilters = [];
  const nameFilters = new Set([
    `all`,
    `watchlist`,
    `history`,
    `favorites`
  ]);
  const countAllFilters = getCountFilmsOptions(configAllCard);

  for (let name of nameFilters) {
    arrayFilters.push({name, count: countAllFilters[name]});
  }

  return arrayFilters;
};

const configFilters = getAllFiltersConfig();

const getPopupConfig = () => {
  const randomCardConfig = configAllCard[Math.floor(Math.random() * configAllCard.length)];
  const {name, posters, text, rating, premiere, duration, genre, countComments, watchlist, watched, favorite} = randomCardConfig;

  const randomPopupConfig = {
    name,
    posters,
    text,
    rating,
    premiere: premiere.getDay() + ` ` + premiere.toLocaleString(`en`, {month: `long`}) + ` ` + premiere.getFullYear(),
    runtime: duration,
    genre,
    countComments,
    watchlist,
    watched,
    favorite,
    original: name,
    directors: [...new Set([
      `Бондарчук Старший`,
      `Стивен Спилберг`,
      `Бондарчук Младший`,
      `Кэмерон мужик`,
      `Михалков старик`
    ])][Math.floor(Math.random() * 5)],
    writers: [...new Set([
      `Донцова Даша`,
      `Роулинг тетя`,
      `Пехов писатель`,
      `Андерсон сказочник`,
      `Перумов Ник`
    ])].sort(() => 0.5 - Math.random()).slice(0, Math.random() * (1 - 4) + 4).join(`, `),
    actors: [...new Set([
      `Моника Белуччи`,
      `Кира Найтли`,
      `Натали Портман`,
      `Брэд Питт`,
      `Джони Депп`
    ])].sort(() => 0.5 - Math.random()).slice(0, Math.random() * (1 - 4) + 4).join(`, `),
    country: [...new Set([
      `USA`,
      `Russia`,
      `Belarus`,
      `UK`,
      `China`
    ])][Math.floor(Math.random() * 5)]
  };

  return randomPopupConfig;
};

const configPopup = getPopupConfig();

export {configAllCard, configFilters, configPopup};
