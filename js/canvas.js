var Game = function () {
	return this;
}

Game.prototype.createCanvas = function () {
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = 512;
	this.canvas.height = 480;
	document.body.appendChild(this.canvas);	
	console.log("canvas created");
}

Game.prototype.age = 0;

Game.prototype.render = function () {
    this.ctx.fillStyle="#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font="30px Verdana";
    this.ctx.fillStyle="#000000";
	this.ctx.fillText("Hello World! "+this.age, 10, 50);
}

Game.prototype.update = function () {
	this.age++;
	this.render();
}