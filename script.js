// options
var yPad = 10;
var xPad = 10;
var height = 300;
var width = 300;
var nLines = 30;

// colors
var squareColor = "#FF77E3";
var bgColor = "#FFEC90";
var lineColor = "#4BCCCB";


$(document).ready(function () {
	// setup
	var canvas = document.getElementById("art");
	var context = canvas.getContext("2d");
	var linesHeight = height - 2 * yPad;

	// color the square
	drawRect = function () {
		context.fillStyle = squareColor;
		context.fillRect(0, 0, width, height);
	}

	// function that defines line spacing
	f = function(input, mouseHeight) {
		var out = 4 * (input / nLines - Math.pow(input / nLines, 2));
		if (input < nLines / 2)
			return mouseHeight * out + 0.5; 
		return linesHeight - (linesHeight - mouseHeight) * out - 0.5;
	}

	// draw the lines
	drawLines = function(mouseHeight) {
		context.beginPath();
		var currentLineY;
		for (var x = 0; x <= nLines; x++) {
			currentLineY = f(x, mouseHeight) + yPad;
			context.moveTo(xPad, currentLineY);
			context.lineTo(width - xPad, currentLineY);
		}	
		context.strokeStyle = lineColor;
		context.stroke();
	}

	// update lines when mouse moves in square
	var lastX;
	$("#art").mousemove(function(e) {
		var yPos = e.pageY - $("#art").offset().top;
		if (yPos != lastX) {
			lastX = yPos;
			context.clearRect(0, 0, width, height);
			drawRect();
			drawLines(yPos);
		}
	});

	main = function () {
		$("body").css("background-color", bgColor);
		canvas.width = width;
		canvas.height = height;
		drawRect();
		drawLines(height / 2);
	}

	main();
});
