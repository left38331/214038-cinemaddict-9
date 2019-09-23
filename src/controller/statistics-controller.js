import Statistics from "../components/statistics";
import {render} from "../utils";

export default class StatisticsController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._countWatced = 0;
    this._duration = 0;
  }

  init() {
    this._countAllparametrs();
    this._statistics = new Statistics(this._countWatced, this._duration);
    render(this._container, this._statistics.getElement());
  }

  _countAllparametrs() {
    let arrayWathced = [];

    this._data.forEach((item) => {
      if (item.watched) {
        arrayWathced.push(item);
      }
    });

    this._countWatced = arrayWathced.length;
    arrayWathced.forEach((item) => {
      this._duration += item.duration;
    });
  }
}
