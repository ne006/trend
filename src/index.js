import Highcharts from 'highcharts';
import './style.css';

let data = [
  {x: 5, y: 6},
  {x: 3, y: 7},
  {x: 4, y: 4}
]

let trend = function(data) {
  return data.
    filter(
      (p) => Math.min(...data.map((p)=>p.x)) == p.x || Math.max(...data.map((p)=>p.x)) == p.x
    ).sort(function(a, b){return a.x - b.x})
}

let canvas = document.getElementById("graph");

let chart = Highcharts.chart(
  "graph",
  {
    chart: {
      type: "scatter",
      events: {
        click: function(e){
          data.push({x: e.xAxis[0].value, y: e.yAxis[0].value});
          chart.series[0].setData(data);
          chart.series[1].setData(trend(data));
        }
      }
    },
    title: {
      text: "Trend"
    },
    series: [
      {
        data: data
      },
      {
        type: "line",
        data: trend(data)
      }
    ],
    xAxis: {
      softMin: trend(data)[0].x - 2,
      softMax: trend(data)[1].x + 2,
    }
  }
)
