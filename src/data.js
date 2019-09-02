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
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
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
  rating: (Math.random() * (9 - 1) + 1).toFixed(1),
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
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random())),
  directors: new Set([
    `Бондарчук Старший`,
    `Стивен Спилберг`,
    `Бондарчук Младший`,
    `Кэмерон мужик`,
    `Михалков старик`
  ]),
  writers: new Set([
    `Донцова Даша`,
    `Роулинг тетя`,
    `Пехов писатель`,
    `Андерсон сказочник`,
    `Перумов Ник`
  ]),
  actors: new Set([
    `Моника Белуччи`,
    `Кира Найтли`,
    `Натали Портман`,
    `Брэд Питт`,
    `Джони Депп`
  ]),
  country: new Set([
    `USA`,
    `Russia`,
    `Belarus`,
    `UK`,
    `China`
  ])
});

const comments = () => ({
  text: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
  ],
  emotion: new Set([
    `smile.png`,
    `sleeping.png`,
    `puke.png`,
    `angry.png`
  ]),
  author: new Set([
    `Бондарчук Старший`,
    `Стивен Спилберг`,
    `Бондарчук Младший`,
    `Кэмерон мужик`,
    `Михалков старик`
  ])
});

const getRandomComments = (config) => {
  const countComments = Math.floor(Math.random() * 5);
  const commentsConfig = [];

  for (let i = 0; i <= countComments; i++) {
    commentsConfig.push({
      text: config.text[Math.floor(Math.random() * 3)],
      emotion: [...config.emotion][Math.floor(Math.random() * 4)],
      author: [...config.author][Math.floor(Math.random() * 5)],
      date: new Date(new Date(1925, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1925, 0, 1).getTime()))
    });
  }

  return commentsConfig;
};

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
      comments: getRandomComments(comments()),
      watchlist: config.watchlist,
      watched: config.watched,
      favorite: config.favorite,
      director: [...config.directors][Math.floor(Math.random() * 5)],
      writers: [...config.writers].sort(() => 0.5 - Math.random()).slice(0, Math.random() * (1 - 4) + 4).join(`, `),
      actors: [...config.actors].sort(() => 0.5 - Math.random()).slice(0, Math.random() * (1 - 4) + 4).join(`, `),
      country: [...config.country][Math.floor(Math.random() * 5)]
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

export {configAllCard, configFilters};
