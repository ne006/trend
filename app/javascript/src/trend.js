import Dataset from './dataset.js';
import HypothesisGraph from './hypothesis_graph.js';

class Trend {
  constructor(){
		this.dataset = new Dataset();
		this.graph = new HypothesisGraph();

		this.dataset.on("change", (data)=>this.graph.updateData([data]));
		this.dataset.on("process", (hypothesis)=>this.graph.updateData([false, hypothesis]))

		this.graph.on("newPoint", (p)=>this.dataset.addPoint(p));
	}


}

export default Trend;
