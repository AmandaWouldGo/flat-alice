(function () {

	var aliceGamePiece, queenGamePiece;

	function startGame() {
	    myGameArea.start();
	    aliceGamePiece = new component(30, 30, "#03A9F4", 10, 120);
	    queenGamePiece = new component(75, 75, "#F44336", 10, 10);
	    caterGamePiece = new component(20, 20, "#CDDC39", 10, 300);
	}

	var myGameArea = {
	    canvas : document.createElement("canvas"),
	    start : function() {
	        this.canvas.width = 960;
	        this.canvas.height = 540;
	        this.context = this.canvas.getContext("2d");
	        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	        this.interval = setInterval(updateGameArea, 20);
	        window.addEventListener('keydown', function (e) {
	        	myGameArea.keys = (myGameArea.keys || []);
	        	myGameArea.keys[e.keyCode] = (e.type == "keydown");
	        })
	        window.addEventListener('keyup', function (e) {
	        	myGameArea.keys[e.keyCode] = (e.type == "keydown");
	        })
	    },
	    clear : function() {
	    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	}

	function component(width, height, color, x, y) {
	    this.width = width;
	    this.height = height;
	    this.speedX = 0;
	    this.speedY = 0
	    this.x = x;
	    this.y = y;
	    this.update = function() {
		    ctx = myGameArea.context;
		    ctx.fillStyle = color;
		    ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		this.newPos = function() {
			this.x += this.speedX;
			this.y += this.speedY;
		}
	}

	function updateGameArea() {
		myGameArea.clear();
		// queenGamePiece.y += 1;
		// caterGamePiece.x += 1;
		// caterGamePiece.y -= 1;
		// queenGamePiece.update();
		// caterGamePiece.update();

		aliceGamePiece.speedX = 0;
		aliceGamePiece.speedY = 0;
		if (myGameArea.keys && myGameArea.keys[37]) { aliceGamePiece.speedX = -1; }
		if (myGameArea.keys && myGameArea.keys[39]) { aliceGamePiece.speedX = 1; }
		if (myGameArea.keys && myGameArea.keys[38]) { aliceGamePiece.speedY = -1; }
		if (myGameArea.keys && myGameArea.keys[40]) { aliceGamePiece.speedY = 1; }

		
		aliceGamePiece.newPos();
		aliceGamePiece.update();
	}

	document.addEventListener("onload", startGame());
} ());