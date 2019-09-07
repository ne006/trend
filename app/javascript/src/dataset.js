import Observable from './observable.js';
import WithMethodLag from './with_method_lag';
import MathFunction from './math_function.js';

class Dataset{
	constructor({data: data} = {}){
		this.data = data || [];
		this.hypothesis = [];
	}

	//Add one point
	addPoint(point){
		this.data.push(point);
		this.emit("change", this.data);
		this.process();
	}

	//Set data
	setData(data){
		this.data = data;
		this.emit("change", this.data);
		this.process();
	}

	//Get extermes along x axis
	getXExtremes(){
		let xAxis = this.data.map((p)=>p.x);
		return {
			min: Math.min(...xAxis),
			max: Math.max(...xAxis)
		}
	}

	//Get extermes along y axis
	getYExtremes(){
		let yAxis = this.data.map((p)=>p.y);
		return {
			min: Math.min(...yAxis),
			max: Math.max(...yAxis)
		}
	}

	//Set hypothesis
	setHypothesis(data){
		this.hypothesis = data;
		this.emit("process", this.hypothesis)
	}

	//queued wrapper around process_real()
	process(){
		this.queueMethodFor("process", this.process_real, 1000, arguments)
	}

	//send data to server to determine a hypothesis
	process_real(){
		if(this.data.length < 2) return;

		let dataset = this;

		//Submit dataset
		fetch(
			document.location.pathname+(document.location.pathname.endsWith("/") ? "" : "/")+"hypotheses",
			{
				method: "POST",
				body: JSON.stringify({points: this.data}),
				headers: new Headers({
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			}
		).
		//Check response
		then(
			(response)=>{
				if(response.ok){
					let respJson = response.json()
					return respJson
				}else{
					//mock
					/*return {
						0: 5,
						1: 1
					}*/
					throw response;
				}
			}
		).
		//Process response
		then(
			(response)=>MathFunction.build(response.hypothesis)
		).
		then(
			(mathFunc)=>{
				let xExtremes = this.getXExtremes();
				return MathFunction.seriesFor(
					mathFunc,
					xExtremes.min,
					xExtremes.max,
					(xExtremes.max - xExtremes.min)/100
				)
			}
		).
		then(
			(data)=>this.setHypothesis(data)
		).
		//Error handling
		catch(
			(error)=>{
				console.log(error);
				return Promise.reject(error);
			}
		)
	}
}

Object.assign(Dataset.prototype, Observable);
Object.assign(Dataset.prototype, WithMethodLag);

export default Dataset;
