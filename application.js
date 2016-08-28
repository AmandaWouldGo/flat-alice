(function () {

	var aliceGamePiece;
	var queenGamePiece = [];
	var cardGamePiece = [];
	var mushroom = [];

	function startGame() {
	    myGameArea.start();
	    aliceGamePiece = new component(30, 30, "#03A9F4", 10, 120);
	    caterGamePiece = new component(35, 15, "#CDDC39", 960, 540);
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
		this.grow = function() {
			this.width = width * 2;
			this.height = height * 2;
		}
	}

	function updateGameArea() {
		var x, y;
		for (i = 0; i < queenGamePiece.length; i += 1) {
			if (aliceGamePiece.crashWith(queenGamePiece[i])) {
				myGameArea.stop();
			}	
		}
		for (i = 0; i < cardGamePiece.length; i += 1) {
			if (aliceGamePiece.crashWith(cardGamePiece[i])) {
				myGameArea.stop();
			}	
		}

		myGameArea.clear();
		myGameArea.frameNo += 1;

		if (myGameArea.frameNo == 1 || everyinterval(650)) {
			min = 200;
			max = 900;
			x = myGameArea.canvas.width - Math.floor(Math.random() * (max - min + 1) + min);
			y = myGameArea.canvas.height;
			queenGamePiece.push(new component(75, 75, "#F44336", x += 50, y));
		}
		for (i = 0; i < queenGamePiece.length; i += 1) {
			queenGamePiece[i].y -= 1;
			queenGamePiece[i].update();
		}
		if (myGameArea.frameNo == 1 || everyinterval(50)) {
			minX = 0;
			maxX = 900;
			minY = 540;
			maxY = -540;
			x = myGameArea.canvas.width - Math.floor(Math.random() * (maxX - minX + 1) + min);
			y = myGameArea.canvas.height - Math.floor(Math.random() * (maxY - minY + 1) + min);
			cardGamePiece.push(new component(15, 25, "#FFC107", x += 50, y += 50));
		}
		for (i = 0; i < cardGamePiece.length; i += 1) {
			cardGamePiece[i].y -= 1;
			cardGamePiece[i].x += 1;
			cardGamePiece[i].update();
		}
		if (myGameArea.frameNo == 1 || everyinterval(300)) {
			minX = 5;
			maxX = 955;
			minY = 20;
			maxY = 535;
			x = myGameArea.canvas.width - Math.floor(Math.random() * (maxX - minX + 1) + min);
			y = myGameArea.canvas.height - Math.floor(Math.random() * (maxY - minY + 1) + min);
			mushroom.push( (new component(10, 15, "#1ABC9C", x, y)), (new component(20, 10, "#1ABC9C", (x - 5), (y - 5))));
		}
		for (i = 0; i < mushroom.length; i += 1) {
			mushroom[i].update();
			if (aliceGamePiece.crashWith(mushroom[i])) {
				aliceGamePiece.grow();

				console.log(i);
				mushroom.splice(i, 1);
				console.log(i);
				myGameArea.stop();
			}	
			aliceGamePiece.update();
			console.log(aliceGamePiece);
		}

		caterGamePiece.x -= 1;
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

	document.addEventListener("onload", startGame());

} ());