import Highcharts from 'highcharts';
import Observable from './observable.js';

class HypothesisGraph {
	constructor(options = {
		elId: "graph",
		minWidth: 200,
		minHeight: 200
	}){
		let { elId, minWidth, minHeight } = options;

		this.elId = elId;
		this.minWidth = minWidth;
		this.minHeight = minHeight;

		let graph = this;
		let el = document.getElementById(this.elId);

		window.onload = ()=>{
			this.chart = Highcharts.chart(
				elId,
				{
					chart: {
						type: "scatter",
						events: {
							click: (e)=>graph.emit("newPoint", {x: e.xAxis[0].value, y: e.yAxis[0].value})
						},
						width: Math.max(el && el.offsetWidth, this.minWidth),
						height: Math.max(el && el.offsetHeight, this.minHeight)
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
							data: [],
							marker: {
								enabled: false
							}
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

			this.setupListeners();
		}
	}

	//pass data to series
	updateData(data){
		data.forEach(
			(series, seriesIndex)=>{
				if(series)
					this.chart.series[seriesIndex].setData(series)
			}
		)
		this.chart.xAxis[0].setExtremes(
			(this.chart.xAxis[0].getExtremes().dataMin || this.chart.xAxis[0].getExtremes().min) - 2,
			(this.chart.xAxis[0].getExtremes().dataMax || this.chart.xAxis[0].getExtremes().max) + 2
		);
		this.chart.yAxis[0].setExtremes(
			(this.chart.yAxis[0].getExtremes().dataMin || this.chart.yAxis[0].getExtremes().min) - 2,
			(this.chart.yAxis[0].getExtremes().dataMax || this.chart.yAxis[0].getExtremes().max) + 2
		);
	}

	//setup listeners for browser events like resize
	setupListeners(){
		window.onresize = (e)=>{
			let el = document.getElementById(this.elId);
			this.chart.setSize(
				Math.max(el.offsetWidth, this.minWidth),
				Math.max(el.offsetHeight, this.minHeight)
			);
		}
	}
}

Object.assign(HypothesisGraph.prototype, Observable);

export default HypothesisGraph;
