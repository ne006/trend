let Observable = {
	//subscribe to an event
	on: function(eventName, callback){
		if(typeof callback == 'function'){
			this._subs = this._subs || {};
			this._subs[eventName] = this._subs[eventName] || [];

			if(!this._subs[eventName].includes(callback)){
				this._subs[eventName].push(callback);
			}
			return true;
		}else{
			throw `${callback} is not a function`;
		}
	},
	//unsubscribe from an event
	off: function(eventName, callback){
		if(callback){
			if(this._subs && this._subs[eventName]){
				let cbIndex = this._subs[eventName].indexOf(callback);

				if(cbIndex == -1){
					return false;
				}else{
					this._subs[eventName].splice(cbIndex, 1);
					return true;
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
	},
	//publish event
	emit: function(eventName/*, ...args*/){
		let observable = this;
		let args = Array.prototype.slice.call(arguments, 1);

		if(this._subs && this._subs[eventName]){
			this._subs[eventName].forEach(
				function(callback){
					if(typeof callback == "function"){
						callback.apply(
							observable,
							args
						)
					}
				}
			);
			return true;
		}else{
			return false;
		}
	}
}

export default Observable;
