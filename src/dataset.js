import Observable from './observable.js';

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
					return (function(data) {
					  return data.
					    filter(
					      (p) => Math.min(...data.map((p)=>p.x)) == p.x || Math.max(...data.map((p)=>p.x)) == p.x
					    ).sort(function(a, b){return a.x - b.x})
					})(this.data)
					//throw response;
			}
		).
		//Process response
		then(
			(response)=>{
				this.setHypothesis(response);
			}
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
