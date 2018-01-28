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
    )
}

let canvas = document.getElementById("graph");

let chart = Highcharts.chart(
  "graph",
  {
    chart: {
      type: "scatter",
      events: {
        click: function(e){
          console.log(e.xAxis[0].value,e.yAxis[0].value)
        }
      }
    },
    title: {
      text: "Trend"
    },
    series: [
      {
        data: data
      }
    ]
  }
)
