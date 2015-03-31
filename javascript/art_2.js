$(document).ready(function () {
	// options
	var nBalls = 100;
	var ballRadius = 5;
	var fps = 24;
	var speed = 5;

	var canvas = document.getElementById("art_2");
	var context = canvas.getContext("2d");
	var ballColor = colors.yellow;
	var boxColor = colors.blue;
	var balls = [];
	var ms = 1000 / fps;

	// add all the balls to the array
	addBalls = function () {
		for (var i = 0; i < nBalls; i++) {
			balls[i] = {
					x: Math.floor(Math.random() * $(window).width()),
					y: Math.floor(Math.random() * $(window).height()),
					dX: Math.ceil((2 * Math.random() - 1) * speed),
					dY: Math.ceil((2 * Math.random() - 1) * speed)
			};
			while (balls[i].dX === 0 && balls[i].dY === 0) {
				balls[i].dX = Math.ceil((2 * Math.random() - 1) * speed);
				balls[i].dY = Math.ceil((2 * Math.random() - 1) * speed);
			}
		}
	};

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
		for (var i = 0; i < balls.length; i++) {
			balls[i].x += balls[i].dX;
			balls[i].y += balls[i].dY;
			if (balls[i].x > wWidth) {
				balls[i].x = 0;
			} else if (balls[i].x < 0) {
				balls[i].x = wWidth;
			}
			if (balls[i].y > wHeight) {
				balls[i].y = 0;
			} else if (balls[i].y < 0) {
				balls[i].y = wHeight;
			}
		}
	};

	// draw the balls
	drawBalls = function () {
		context.fillStyle = ballColor;
		for (var i = 0; i < nBalls; i++) {
			var b = balls[i];
			context.beginPath();
			context.arc(b.x - ballRadius / 2,
						b.y - ballRadius / 2,
						ballRadius,
						0,
						Math.PI * 2);
			context.closePath();
			context.fill();
		}
	};

	moveBalls = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		updateBalls();
		drawBalls();
		drawBubbleBox();
	};

	var interval;
	function startAnimation() {
		interval = setInterval(moveBalls, ms);
	}

	$(window).resize(function () {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		drawBubbleBox();
		drawBalls();
	});

	addBalls();
	$(window).resize();
	drawBubbleBox();
	drawBalls();
	startAnimation();
	$(document).scroll(moveBalls);
});
