function intervalCalc(x, y, logic = (x0, y0) => x0 && y0 && true) {
	let x_ = x.concat(), y_ = y.concat();
	let src = [x_, y_, [!logic(!x_[0], !y_[0]) - 0]];
	if (src.findIndex(a => a.length == 0) + 1) throw "Null Interval";
	src.forEach(a => a[0] = !!a[0] - 0);
	let p = [0, 0, 0];
	let end = [false, false];
	let c, j;	//j : channel chooser
	while (true) {
		//End detect
		end = [
			end[0] || src[0].length == p[0] + 1,
			end[1] || src[1].length == p[1] + 1
		];
		//Terminate
		if (end[0] && end[1]) break;
		//Step
		p[(end[0] || !end[1] &&
			src[0][p[0] + 1] > src[1][p[1] + 1]
		) - 0]++;
		//Comp
		j = (!p[0] || p[1] && src[0][p[0]] < src[1][p[1]]) - 0;
		//Calc
		c = logic(
			(p[0] + src[0][0] + 1) % 2,
			(p[1] + src[1][0] + 1) % 2
		) - 0;
		if ((p[2] + src[2][0] + 1) % 2 != c) {
			src[2].push(src[j][p[j]]);
			p[2]++;
		}
		console.log(JSON.stringify(src), JSON.stringify(p), JSON.stringify(end), c, j)
	}
	return src[2];
}

function intervalFold(x, t) {
	let y = x.concat();
	if (y.length == 0) throw "Null Interval";
	if (t == 0) throw "period length = 0 ?!"
	y[0] = !!y[0] - 0;
	if (y.length == 1) return y;
	let k = Math.floor(y[1] / t);
	let p = 1;
	let res = [1];
	while (true) {
		while (p < y.length && y[p] <= (k + 1) * t) p++;
		res = intervalCalc(
			y.splice(0, p, !((p - y[0]) % 2) - 0)
				.map((x, i) => i == 0 ? x : x - k * t),
			res, (x, y) => !!(x || y)
		);
		if ((p = 1) == y.length) break;
		k++;
	}
	return res;
}

/*
console.log(intervalCalc(
	[1, 3, 4, 8, 10],
	[0],
	((x, y) => x || y || false)
));
// */
// console.log(intervalFold(
// 	[0, -1, 6], 10
// ));

// a = 1 + 1;

intY = [0, -0.3, 3.4]
PI = 3.14159265358979;
p = intY.findIndex((x, i) => i > 0 && x > 0);
intY = intY.concat(intY.splice(0, p, (p - intY[0]) % 2).slice(1).map((x, i) => x + 2 * PI));
console.log(intY)