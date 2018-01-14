import Chart from 'chart.js';

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
let chart = new Chart(
  canvas,
  {
    type: "line",
    data: {
      datasets: [
        {
          type: "scatter",
          data: data,
          label: "Original points",
          showLine: false,
          pointBackgroundColor: "#000",
          backgroundColor: "#000"
        },
        {
          label: "Trend",
          data: trend(data),
          fill: false,
          borderColor: "#888",
          borderWidth: 0.5,
          backgroundColor: "#888"
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "linear",
            position: "bottom"
          }
        ]
      }
    }
  }
)
