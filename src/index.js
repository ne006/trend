import './style.css';
import Trend from './trend.js';

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

new Trend();
