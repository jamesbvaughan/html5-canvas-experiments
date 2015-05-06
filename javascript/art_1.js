$(document).ready(function () {
	// options
	var yPad = 10;
	var xPad = 10;
	var nLines = 30;
	var lineColor = colors.blue;
	var squareColor = colors.pink;
	var bgColor = colors.yellow;

	var canvas = document.getElementById("art_1");
	var context = canvas.getContext("2d");
	var linesHeight = boxSize.height - 2 * yPad;

	canvas.width = boxSize.width;
	canvas.height = boxSize.height;

	// draw the square
	drawLineBox = function () {
		context.fillStyle = squareColor;
		context.fillRect(0, 0, boxSize.width, boxSize.height);
	};

	// define line spacing
	f = function(input, mouseHeight) {
		var out = 4 * (input / nLines - Math.pow(input / nLines, 2));
		if (input < nLines / 2)
			return mouseHeight * out + 0.5; 
		return linesHeight - (linesHeight - mouseHeight) * out - 0.5;
	};

	// draw the lines
	drawLines = function(mouseHeight) {
		context.beginPath();
		var currentLineY;
		for (var x = 0; x <= nLines; x++) {
			currentLineY = f(x, mouseHeight) + yPad;
			context.moveTo(xPad, currentLineY);
			context.lineTo(boxSize.width - xPad, currentLineY);
		}	
		context.strokeStyle = lineColor;
		context.stroke();
	};

	// MAIN PROGRAM
	$("#one").css("background-color", bgColor);
	drawLineBox();
	drawLines(boxSize.height / 2);

	// update lines when mouse moves in square
	var lastY;
	$("#art_1").mousemove(function(e) {
		var yPos = e.pageY - $("#art_1").offset().top;
		if (yPos != lastY && yPos >= yPad && yPos <= boxSize.height - yPad) {
			lastY = yPos;
			context.clearRect(0, 0, boxSize.width, boxSize.height);
			drawLineBox();
			drawLines(yPos - yPad);
		}
	});
});
