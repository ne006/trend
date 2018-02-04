import Dataset from './dataset.js';
import Graph from './graph.js';

class Trend {
  constructor(){
		this.dataset = new Dataset();
		this.graph = new Graph();

		this.graph.on("newPoint", (e)=>console.log(e));
	}


}

export default Trend;
