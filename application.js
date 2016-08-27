function startGame() {
	gamePlaySpace.start(); // startGame is a function that invokes the start function on the play space
}

var gamePlaySpace = {
	canvas : document.createElement("canvas"),
	// start makes the canvas
	start : function() {
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childnodes[0])
	}
}