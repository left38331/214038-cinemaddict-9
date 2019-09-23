import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default class ChartJs {
  constructor(selector) {
    this._selector = selector;
  }

  showChart() {
    return new Chart(this._selector, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
        datasets: [{
          data: [20, 15, 10, 5, 5],
          backgroundColor: [`#ffe125`, `#ffe125`, `#ffe125`, `#ffe125`, `#ffe125`]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        title: {
          display: true,
          text: `DONE BY: TAGS`,
          fontSize: 26,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }
}

