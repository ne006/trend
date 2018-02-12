let MathFunction = {
	//Build function from a dictionary p=>k, where y=sum(ki*x^pi, i=0..n)
	build: function(kMapping)
	{
		let partials = [];
		for(let p in kMapping)
		{
			partials.push((x)=>kMapping[p]*Math.pow(x, p))
		}

		return function(x)
		{
			return partials.reduce(
				(result, partial) => result += partial(x),
				0
			)
		}
	},
	seriesFor: function(mFunc, from, to, step)
	{
		let series = [];
		for(let i = 0; i < Math.ceil((to - from)/step); i++)
		{
			let x = Math.min(from + i*step, to);
			series.push({x: x, y: mFunc(x)});
		}
		return series;
	}
}

export default MathFunction;
