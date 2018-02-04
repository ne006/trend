import Highcharts from 'highcharts';
import Observable from './observable.js';

class Graph {
	constructor(){
		let graph = this;

		this.chart = Highcharts.chart(
			"graph",
			{
				chart: {
					type: "scatter",
					events: {
						click: (e)=>graph.emit("newPoint", {x: e.xAxis[0].value, y: e.yAxis[0].value})
					}
				},
				title: {
					text: "Trend"
				},
				series: [
					{
						data: []
					},
					{
						type: "line",
						data: []
					}
				],
				xAxis: {
					min: -10,
					max: 10
				},
				yAxis: {
					min: -10,
					max: 10
				}
			}
		)
	}
}

Object.assign(Graph.prototype, Observable);

export default Graph;
