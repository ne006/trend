let WithMethodLag = {
	queueMethodFor: function(methodName, method, lag/*, ...arguments*/){
		let _instance = this;

		if(!methodName){
			throw "Method name is required"
		}

		if(!method){
			throw "Method function is required"
		}

		if(!lag){
			throw "Lag time in ms is required"
		}

		if(!this.methodQueue){
			this.methodQueue = {};
		}

		if(this.methodQueue[methodName]){
			clearTimeout(this.methodQueue[methodName])
			this.methodQueue[methodName] = null;
		}

		this.methodQueue[methodName] = setTimeout(
			function(){
				method.apply(
					_instance,
					Array.from(arguments).slice(3)
				)
			},
			lag
		)
	}
}

export default WithMethodLag;
