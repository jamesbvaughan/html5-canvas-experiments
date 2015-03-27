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

	// color the square
	drawRect = function () {
		context.fillStyle = squareColor;
		context.fillRect(0, 0, width, height);
	}

	// function that defines line spacing
	f = function(input, mouseHeight) {
		var out = 4 * (input / nLines - Math.pow(input / nLines, 2));
		if (input < nLines / 2)
			return mouseHeight * out; 
		return height - (height - mouseHeight) * out;
	}

	// draw the lines
	drawLines = function(mouseHeight) {
		context.beginPath();
		var lineHeight;
		for (var x = 1; x < nLines; x++) {
			lineHeight = f(x, mouseHeight);
			context.moveTo(0, lineHeight);
			context.lineTo(width, lineHeight);
		}	
		context.strokeStyle = lineColor;
		context.stroke();
	}

	// update lines when mouse moves in square
	var lastX;
	$("#art").mousemove(function(e) {
		var top = $("#art").offset().top;
		if (e.pageY - top != lastX) {
			lastX = e.pageY - top;
			context.clearRect(0,0,canvas.width,canvas.height);
			drawRect();
			drawLines(e.pageY - top);
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
