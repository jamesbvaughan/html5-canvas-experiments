$(document).ready(function () {
	// options
	var nBalls = 400;
	var maxRadius = 20;
	var fps = 24;
	var maxSpeed = 5;

	
	var canvas = document.getElementById("art_2");
	var context = canvas.getContext("2d");
	var ballColor = colors.yellow;
	var boxColor = colors.blue;
	var balls = [];
	var mouseInBox;
	var ins;
	var ms = 1000 / fps;

	// add all the balls to the array
	addBalls = function () {
		for (var i = 0; i < nBalls; i++) {
			var ballSpeed = Math.ceil(Math.random() * maxSpeed);
			balls[i] = {
					x: Math.floor(Math.random() * $(window).width()),
					y: Math.floor(Math.random() * $(window).height()),
					dX: Math.ceil((2 * Math.random() - 1) * ballSpeed),
					dY: Math.ceil((2 * Math.random() - 1) * ballSpeed),
					bSpeed: ballSpeed,
					radius: maxRadius * ballSpeed / maxSpeed
			};
			while (balls[i].dX === 0 && balls[i].dY === 0) {
				balls[i].dX = Math.ceil((2 * Math.random() - 1) * ballSpeed);
				balls[i].dY = Math.ceil((2 * Math.random() - 1) * ballSpeed);
			}
		}
		console.log("Ball 1 d(" + balls[1].dX + ", " + balls[1].dY + ")");
	};

	// reset ball directions
	function resetDirections() {
		for (var i = 0; i < nBalls; i++) {
			balls[i].dX = Math.ceil((2 * Math.random() - 1) * balls[i].bSpeed);
			balls[i].dY = Math.ceil((2 * Math.random() - 1) * balls[i].bSpeed);
			while (balls[i].dX === 0 && balls[i].dY === 0) {
				balls[i].dX = Math.ceil((2 * Math.random() - 1) * balls[i].bSpeed);
				balls[i].dY = Math.ceil((2 * Math.random() - 1) * balls[i].bSpeed);
			}
		}
		console.log("Ball 1 d(" + balls[1].dX + ", " + balls[1].dY + ") RESET");
	}


	// draw the box
	drawBubbleBox = function () {
		context.strokeStyle = boxColor;
		context.strokeRect(
			$(window).width() / 2 - boxSize.width / 2,
			$(window).height() / 2 - boxSize.height / 2,
			boxSize.width,
			boxSize.height
			);
	};

	// move the balls
	updateBalls = function () {
		var wHeight = $(window).height();
		var wWidth = $(window).width();
		if (mouseInBox) {
			for (var n = 0; n < balls.length / 2; n++) {
				balls[n].x += balls[n].mX;
				balls[n].y += balls[n].mY;
			}
			for (var j = balls.length / 2; j < balls.length; j++) {
				balls[j].x += balls[j].dX;
				balls[j].y += balls[j].dY;
				if (balls[j].x > wWidth + 2 * balls[j].radius) {
					balls[j].x = -balls[j].radius;
				} else if (balls[j].x < -balls[j].radius) {
					balls[j].x = wWidth + balls[j].radius;
				}
				if (balls[j].y > wHeight + balls[j].radius) {
					balls[j].y = -balls[j].radius;
				} else if (balls[j].y < -balls[j].radius) {
					balls[j].y = wHeight + balls[j].radius;
				}
			}
		} else {
			for (var i = 0; i < balls.length; i++) {
				balls[i].x += balls[i].dX;
				balls[i].y += balls[i].dY;
				if (balls[i].x > wWidth + 2 * balls[i].radius) {
					balls[i].x = -balls[i].radius;
				} else if (balls[i].x < -balls[i].radius) {
					balls[i].x = wWidth + balls[i].radius;
				}
				if (balls[i].y > wHeight + balls[i].radius) {
					balls[i].y = -balls[i].radius;
				} else if (balls[i].y < -balls[i].radius) {
					balls[i].y = wHeight + balls[i].radius;
				}
			}
		}
	};

	// draw the balls
	drawBalls = function () {
		context.fillStyle = ballColor;
		for (var i = 0; i < nBalls; i++) {
			var b = balls[i];
			context.beginPath();
			context.arc(b.x - balls[i].radius / 2,
						b.y - balls[i].radius / 2,
						balls[i].radius,
						0,
						Math.PI * 2);
			context.closePath();
			context.fill();
		}
	};

	// redraw all balls and box
	moveBalls = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		updateBalls();
		drawBalls();
		drawBubbleBox();
	};

	// begin the animation
	var interval;
	function startAnimation() {
		interval = setInterval(moveBalls, ms);
	}

	// resize the canvas with the window
	$(window).resize(function () {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		drawBubbleBox();
		drawBalls();
	});

	// update mouseInBox to be correct and ball directions
	$("#art_2").mousemove(function (e) {
		var mouse = { x: e.pageX, y: e.pageY - $(window).height() };
		mouseInBox = mouse.x > $(window).width() / 2 - boxSize.width / 2 &&
			mouse.x < $(window).width() / 2 + boxSize.width / 2 &&
			mouse.y > $(window).height() / 2 - boxSize.height / 2 &&
			mouse.y < $(window).height() / 2 + boxSize.height / 2;
		if (mouseInBox) {
			for (var i = 0; i < nBalls; i++) {
				balls[i].mX = 2 * balls[i].bSpeed * (mouse.x - balls[i].x) / screen.width;
				balls[i].mY = 2 * balls[i].bSpeed * (mouse.y - balls[i].y) / screen.height;
			}
		} else if (ins) {
			resetDirections();
		}
		ins = mouseInBox;
	});

	addBalls();
	$(window).resize();
	drawBubbleBox();
	drawBalls();
	startAnimation();
	$(document).scroll(moveBalls);
});
