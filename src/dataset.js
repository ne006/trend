import Observable from './observable.js';

class Dataset{
	constructor({data: data} = {}){
		this.data = data || [];
		this.hypothesis = null;
	}

	//Add one point
	addPoint(point){
		this.data.push(point);
		this.publish();
	}

	//Set dataset
	setData(data){
		this.data = data;
		this.publish();
	}
}

Object.assign(Dataset.prototype, Observable);

export default Dataset;
