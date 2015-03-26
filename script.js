// sizes
var yPad = 10;
var xPad = 10;
var height = 300;
var width = 300;
var relativeNodeHeight = .5;

// colors
var pink = "#FF77E3";
var yellow = "#FFEC90";
var blue = "#4BCCCB";


// setup
$("body").css("background-color", yellow);
var canvas = document.getElementById("art");
var context = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

// color the square
context.fillStyle = pink;
context.fillRect(0, 0, width, height);

// function that defines line spacing
f = function(input) {
	return Math.pow(input, 3) / 20;
}

// draw the lines
for (var x = 0; f(x) < canvas.height; x++) {
	console.log("x = " + x);
	context.moveTo(0, f(x));
	context.lineTo(canvas.width, f(x));
}	
context.strokeStyle = blue;
context.stroke();
