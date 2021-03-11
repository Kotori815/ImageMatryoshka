var can = document.getElementById("cvs");
var context = can.getContext("2d");
var color = 'ff00ff';
var radius = 5;
// only paint if mouse is  being dragged (moved while the button is pressed)
var isPainting = false;

var stdiv = document.getElementById("status");

function setWidth(value) {
    can.width = value;
}

function setHeight(value) {
    can.height = value;
}

function startPaint() {
    isPainting = true;
    stdiv.innerHTML = "true";
}

function endPaint() {
    isPainting = false;
    stdiv.innerHTML = "false";
}

function doPaint(x, y) {
    if (isPainting) {
        paintCircle(x, y);
    }
}

function clearCanvas () {
  context.clearRect(0, 0, can.width, can.height);
}

function paintCircle (x, y) {
    // make sure to start a new circle each time
    context.beginPath();
    // draw circle using a complete (2*PI) arc around given point
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}
// verify the given value is actually a number
function isNumeric (value) {
  // standard JavaScript function to determine whether a string is an illegal number (Not-a-Number)
  return !isNaN(value);
}

function changeColor(newColor) {
    color = newColor;
    document.getElementById("colorOutput").value = newColor

}

function changeRadius(newRadius) {
    radius = newRadius;
    document.getElementById("sizeOutput").value = newRadius
}