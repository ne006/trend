import Observable from './observable.js';
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

	//send data to server to determine a hypothesis
	process(){
		if(this.data.length < 2) return;

		let dataset = this;

		//Submit dataset
		fetch(
			"hypothesis/new",
			{
				method: "POST",
				body: JSON.stringify(this.data),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}
		).
		//Check response
		then(
			(response)=>{
				if(response.ok)
					return response.json()
				else
					//mock
					return {
						0: 5,
						1: 1
					}
					//throw response;
			}
		).
		//Process response
		then(
			MathFunction.build
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

export default Dataset;
