(function () {

	var aliceGamePiece;
	var queenGamePiece = [];

	function startGame() {
	    myGameArea.start();
	    aliceGamePiece = new component(30, 30, "#03A9F4", 10, 120);
	    // queenGamePiece = new component(75, 75, "#F44336", 10, 10);
	    caterGamePiece = new component(20, 20, "#CDDC39", 10, 300);
	}

	var myGameArea = {
	    canvas : document.createElement("canvas"),
	    start : function() {
	        this.canvas.width = 960;
	        this.canvas.height = 540;
	        this.context = this.canvas.getContext("2d");
	        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	        this.frameNo = 0;
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
	    },
	    stop : function() {
	    	clearInterval(this.interval);
	    }
	}

	function everyinterval(n) {
		if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    	return false;
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
		this.crashWith = function(otherobj) {
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((mybottom < othertop) ||
					(mytop > otherbottom) ||
					(myright < otherleft) ||
					(myleft > otherright)) {
				crash = false;
			}
			return crash;
		}
	}

	function updateGameArea() {
		var x, y;
		for (i = 0; i < queenGamePiece.length; i += 1) {
			if (aliceGamePiece.crashWith(queenGamePiece[i])) {
				myGameArea.stop();
				return;
			}	
		}
		myGameArea.clear();
		myGameArea.frameNo += 1;
		if (myGameArea.frameNo == 1 || everyinterval(650)) {
			x = myGameArea.canvas.width - 200;
			y = myGameArea.canvas.height
			queenGamePiece.push(new component(75, 75, "#F44336", x, y));
		}
		for (i = 0; i < queenGamePiece.length; i += 1) {
			queenGamePiece[i].y -= 1;
			queenGamePiece[i].update();
		}
		caterGamePiece.x += 1;
		caterGamePiece.y -= 1;
		aliceGamePiece.speedX = 0;
		aliceGamePiece.speedY = 0;

			if (myGameArea.keys && myGameArea.keys[37]) { aliceGamePiece.speedX = -2; }
			if (myGameArea.keys && myGameArea.keys[39]) { aliceGamePiece.speedX = 2; }
			if (myGameArea.keys && myGameArea.keys[38]) { aliceGamePiece.speedY = -2; }
			if (myGameArea.keys && myGameArea.keys[40]) { aliceGamePiece.speedY = 2; }
			
			aliceGamePiece.newPos();
			aliceGamePiece.update();
			caterGamePiece.update();
		}
	// }

	document.addEventListener("onload", startGame());
} ());