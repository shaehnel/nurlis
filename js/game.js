var config = {
	mouseScare: 50,
	nurliScare: 60,
	nurliSize: 20,
	friction: 0.95,
	states: {
		"bored":{ color:"#EEEEBB", text:":|"},
		"normal":{ color:"#EECCBB", text:":)"},
		"excited":{ color:"#EEAA99", text:":D"},
		"scared":{ color:"#EE1111", text: ":O"},
		"oops":{ color: "#1111EE", text: ":P"}
	}
}


var Game = function (w, h) {
	this.width = w;
	this.height = h;
	return this;
}

Game.prototype = {
	gameObjects: [],
	mouse: { x:-1, y:-1 },
	render: function () {
	    var l = this.gameObjects.length;
	    for (var i = 0; i < l; i++) {
	    	var obj = this.gameObjects[i];
	    	obj.handleMouse(this.mouse);
	    	obj.move();
	    	obj.feel();
	    	obj.checkBoundaries(this.canvas);
	    	for (var j = i + 1; j < l; j++) {
	    		var obj2 = this.gameObjects[j];
	    		obj.checkCollission(obj2);
	    	}
	    }
	    this.clearCanvas();
	    for (var i = 0; i < l; i++) {
	    	var obj = this.gameObjects[i];
	    	obj.render(this.ctx);
	    }
	},
	clearCanvas: function () {
	    this.ctx.fillStyle="#CCCCCC";
	    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},
	update: function () {
		this.render();
	},
	handleMouseMove: function(event) {
		var mx = event.clientX;
		var my = event.clientY;
		this.mouse.x = mx - this.canvas.offsetLeft;
		this.mouse.y = my - this.canvas.offsetTop;
	},
	createCanvas: function () {
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		document.body.appendChild(this.canvas);	
	}
}



var GameObject = function (x, y) {
	this.x = x;
	this.y = y;
	return this;
}

GameObject.prototype = {
	dx: 0,
	dy: 0,
	state: "bored",
	move: function () {
		this.x += this.dx;
		this.y += this.dy;
		this.dx = config.friction * this.dx;
		this.dy = config.friction * this.dy;
	},
	render: function (context) {
		context.beginPath();
		context.fillStyle = config.states[this.state].color;
		context.arc(this.x, this.y, config.nurliSize, 0, 2 * Math.PI);
		context.fill();
		context.fillStyle = "gray";
		context.font = "16px Arial";
		context.fillText(config.states[this.state].text, this.x-5, this.y+4);
	},
	handleMouse: function (mouse) {
		var diffX = this.x - mouse.x;
		var diffY = this.y - mouse.y;
		var distance = Math.sqrt(diffX * diffX + diffY * diffY);
		var scareFactor = (config.mouseScare - distance);
		if (scareFactor > config.mouseScare * 0.1) {
			this.dx += scareFactor * diffX / (2 * config.mouseScare);
			this.dy += scareFactor * diffY / (2 * config.mouseScare);
		}
	},
	checkCollission: function (other) {
		var diffX = this.x - other.x;
		var diffY = this.y - other.y;
		var distance = Math.sqrt(diffX * diffX + diffY * diffY);
		var scareFactor = (config.nurliScare - distance);
		if (scareFactor > config.nurliScare * 0.1) {
			this.dx += scareFactor * diffX / (2 * config.nurliScare);
			this.dy += scareFactor * diffY / (2 * config.nurliScare);
			other.dx -= scareFactor * diffX / (2 * config.nurliScare);
			other.dy -= scareFactor * diffY / (2 * config.nurliScare);
		}
	},
	checkBoundaries: function (canvas) {
		if (this.x < config.nurliSize) {
			this.dx = Math.abs(this.dx);
			this.state = "oops";
		} else
		if (this.x > canvas.width - config.nurliSize) {
			this.dx = -Math.abs(this.dx);
			this.state = "oops";
		}
		if (this.y < config.nurliSize) {
			this.dy = Math.abs(this.dy);
			this.state = "oops";
		} else
		if (this.y > canvas.height - config.nurliSize) {
			this.dy = -Math.abs(this.dy);
			this.state = "oops";
		}
	},
	feel: function () {
		var speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		if (speed > 8) {
			this.state = "scared";
		} else
		if (speed > 3) {
			this.state = "excited";
		} else
		if (speed < 0.5) {
			this.state = "bored";
		} else {
			this.state = "normal";
		}
	}
}