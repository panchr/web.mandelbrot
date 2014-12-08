// Rushy Panchal
// mandelbrot.js

function drawMandelbrotSet(id) {
	var canvasObj = $("#" + id);
	var canvas = canvasObj.get(0);
	var graph = canvas.getContext('2d');
	graph.fillStyle = "black";

	var newDimen = Math.min(canvasObj.height(), canvasObj.height());
	canvasObj.height(newDimen).width(newDimen);

	function scale(n) {
		return Math.floor(256 * n) % 256;
		}

	function getColor(c, z, current, final) {
		distance = z.abs();
		if (distance == 0) {
			return "FFFFFF";
			}
		var red = scale(Math.log(distance));
		var green = scale(Math.log(current));
		var blue = scale(Math.log(final));
		return "rgb(" + red + "," + green + "," + blue + ")";
		}

	var graphCoords = {
		xMin: -2,
		xMax: 2,
		yMin: -2,
		yMax: 2,
		graphWidth: Math.floor(canvasObj.width()),
		graphHeight: Math.floor(canvasObj.height()),
		init: function() {
			this.xRatio = (this.xMax - this.xMin) / this.graphWidth;
			this.yRatio = (this.yMax - this.yMin) / this.graphHeight;
			this.xBase = this.xMin;
			this.yBase = this.yMax;
			},
		translate: function(px, py) {
			return {
				x: (px * this.xRatio + this.xBase),
				y: (this.yBase - py * this.yRatio)
				};
			}
		};

	graphCoords.init();
	canvas.width = graphCoords.graphWidth;
	canvas.height = graphCoords.graphHeight;
	drawColumn = function(x) {
		for (var y = 0; y < graphCoords.graphHeight; y++) {
			var pixelC = graphCoords.translate(x, y);
			var c = new Complex(pixelC.x, pixelC.y);
			var z = new Complex(0, 0);
			for (var i = 0; i < 100; i++) {
				z.multiply(z).add(c);
				if (z.abs() > 2) {
					break;
					}
				}
			color = getColor(c, z, i, 100);
			graph.fillStyle = color;
			graph.fillRect(x, y, 1, 1);
			}
		if (x < graphCoords.graphWidth) {
			setTimeout(function() {drawColumn(x+1)}, 1);
			}
		}
	drawColumn(0);
	}