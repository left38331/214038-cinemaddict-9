import {configFilters, configAllCard} from "./data";

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Sorting = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createElement = (template) => {
  let newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const defineRank = () => {
  const count = configFilters[2].count;
  let rank;

  if (count === 0) {
    rank = ``;
  } else if (count > 0 && count <= 10) {
    rank = `novice`;
  } else if (count > 10 && count <= 20) {
    rank = `fan`;
  } else {
    rank = `movie buff`;
  }

  return rank;
};

const defineMostValues = (config, type) => {
  const supportArray = [];
  const arrayValues = [];
  const arrayMostValue = [];

  config.map((item, i) => supportArray.push({i, [type]: item[type].toString()}));
  supportArray.map((item) => arrayValues.push(item[type]));

  let twoMostValueElements = arrayValues.sort().splice(-2, 2).sort();
  const [one, two] = twoMostValueElements;

  supportArray.map((item, i) => {
    if (two.indexOf(item[type]) !== -1) {
      arrayMostValue.push(i);
    }
  });

  supportArray.map((item, i) => {
    if (one.indexOf(item[type]) !== -1) {
      arrayMostValue.push(i);
    }
  });

  return arrayMostValue;
};

const defineMostValuesCards = (value) => {
  const arrayMost = defineMostValues(configAllCard, value);

  return configAllCard.slice(arrayMost[0], arrayMost[0] + 1).concat(configAllCard.slice(arrayMost[1], arrayMost[1] + 1));
};

export {Position, Sorting, createElement, render, unrender, defineRank, defineMostValuesCards};
