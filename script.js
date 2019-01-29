document.addEventListener('readystatechange', () => {
	if (document.readyState == "interactive") {
		// initApplication();
	}
});

let gameTimer = null;

document.querySelector('[name="start"]').addEventListener('click', () => {
	const angles_count = [...document.querySelectorAll('[name="angles_count"] option')].find(({ selected }) =>selected).value;
	const size = document.querySelector('[name="size"]').value;
	console.log(size);
	initApplication(angles_count, parseInt(size));
});

function initApplication(angles_count, size) {
	console.log('init');

	clearInterval(gameTimer);

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	const maxSize = size > 300 ? size : 300;
	canvas.width = maxSize;
	canvas.height = maxSize;

	ctx.clearRect(0, 0, maxSize, maxSize);

	const half = maxSize / 2;

	const positions_3 = [
		[0, maxSize],
		[maxSize, 0],
		[maxSize, maxSize],
	];

	const positions_4 = [
		[0, half],
		[half, 0],
		[maxSize, half],
		[half, maxSize],
	];

	const positions_6 = [
		[0, half],
		[half * 0.5, half * 1.75],
		[half * 1.5, half * 1.75],
		[maxSize, half],
		[half * 1.5, half * 0.25],
		[half * 0.55, half * 0.25],
	];

	const positions_8 = [
		[0, half],
		[half * 0.25, half * 0.25],
		[half, 0],
		[half * 1.75, half * 0.25],
		[maxSize, half],
		[half * 1.75, half * 1.75],
		[half, maxSize],
		[half * 0.25, half * 1.75]
	];

	const positionsArray = [
		null,
		null,
		null,
		{
			positions: positions_3,
			koef: 2
		},
		{
			positions: positions_4,
			koef: 1.5
		},
		null,
		{
			positions: positions_6,
			koef: 1.5
		},
		null,
		{
			positions: positions_8,
			koef: 1.4
		},
	];

	const data = positionsArray[angles_count];
	if (!data) {
		return;
	}

	const {
		positions,
		koef,
	} = data;

	let currentPosition = [
		getRandomInt(0, maxSize),
		getRandomInt(0, maxSize),
	];

	const anglesCount = positions.length;
	const getBackgroung = (x, y) => `rgb(89, ${( 255 / maxSize * x)}, ${( 255 / maxSize * y)})`

	const getRandAngle = () => positions[getRandomInt(0, anglesCount)];

	gameTimer = setInterval(() => {
		window.requestAnimationFrame(() => {
			const [x1, y1] = currentPosition;
			const [x2, y2] = getRandAngle();
			currentPosition = [
				parseInt(x1 + (x2 - x1) / koef),
				parseInt(y1 + (y2 - y1) / koef),
			];
			ctx.fillStyle = getBackgroung(x1, y1);
			draw(ctx, x1, y1);
		});
	}, 0);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function stroke(ctx, positions) {
	ctx.beginPath();
	positions.forEach(([x, y], i) => {
		ctx.moveTo(x, y);
		if (positions[i + 1]) {
			ctx.lineTo(positions[i + 1][0], positions[i + 1][1]);
		} else {
			ctx.lineTo(positions[0][0], positions[0][1]);
		}
	});
	ctx.stroke();
}

function draw(ctx, x, y) {
	ctx.fillRect(x, y, 1, 1);
}