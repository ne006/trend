import Highcharts from 'highcharts';
import Observable from './observable.js';

class HypothesisGraph {
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
}

Object.assign(HypothesisGraph.prototype, Observable);

export default HypothesisGraph;
