$(document).ready(function () {
	// options
	var bgColor = colors.pink;
	var lineColor = colors.yellow;
	var slope = 1000;
	var lSpeed = 9;
	var lineWidth = 5;
	var lineSpacing = 60;

	var canvas = document.getElementById("art_3");
	var context = canvas.getContext("2d");
	var lines = [];
	var frame = 1;
	var mouse = { x: 0, y: 0 };

	function addLines() {
		var x = 0;
		var lineHoriz = Math.floor(canvas.height / slope);
		for (var i = -lineHoriz; i < canvas.width + lineHoriz; i += lineSpacing) {
			lines[x] = {
					startX: i,
					startY: 0,
					endX: i - lineHoriz,
					endY: canvas.height
			};
		x++;
		}
	}

	function updateLines() {
		var lineHoriz = Math.floor(canvas.height / slope);
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].startX < canvas.width && lines[i].endX < canvas.width) {
				lines[i].startX += lSpeed;
				lines[i].endX += lSpeed;
			} else {
				lines[i].startX = -lineHoriz;
				lines[i].endX = -2 * lineHoriz;
			}
		}
	}

	function drawLines() {
		context.beginPath();
		for (var i = 0; i < lines.length; i++) {
			context.moveTo(lines[i].startX, lines[i].startY);
			context.lineTo(lines[i].endX, lines[i].endY);
		}
		context.lineWidth = lineWidth;
		context.strokeStyle = lineColor;
		context.stroke();
	}


	function drawSingle() {
		context.beginPath();
		var center = { x: canvas.width / 2, y: canvas.height / 2 };
		var aspect = canvas.height / canvas.width;
		slope = (mouse.y - center.y) / (mouse.x - center.x);
		console.log(slope);
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (slope >= aspect || slope <= -aspect) {
			context.moveTo(center.x - (center.y / slope), 0);
			context.lineTo(center.x + (center.y / slope), canvas.height);
		} else {
			context.moveTo(0, center.y - (center.x * slope));
			context.lineTo(canvas.width, center.y + (center.x * slope));
		}
		context.lineWidth = lineWidth;
		context.strokeStyle = lineColor;
		context.stroke();
	}

	function moveLines() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		// updateLines();
		// drawLines();
		drawSingle();
	}

	$("#art_3").mousemove(function (e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY - (2 * $(window).height());
	});

	// resize the canvas with the window
	$(window).resize(function () {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
	});

	// begin the animation
	var interval;
	function startAnimation() {
		interval = setInterval(moveLines, ms);
	}

	// MAIN PROGRAM
	$("#three").css("background-color", bgColor);
	$(window).resize();
	
	addLines();
	startAnimation();
});
