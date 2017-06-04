(function(Fly) {

var Pipe = function(options) {
	// this.ctx = options.ctx;
	this.x = options.x;
	this.imgUp = options.imgUp;
	this.imgDown = options.imgDown;
	
	this.imgW = this.imgUp.width;
	this.imgH = this.imgUp.height;

	this.speed = 2;
	this.pipeSpace = 130;
	this.upY = 0;
	this.DownY = 0;

	this._initPipeY();
};

Pipe.prototype = {
	constructor: Pipe,

	draw: function(drawCtx) {
		var ctx = drawCtx.ctx;

		this.x -= this.speed;
		if(this.x < -this.imgW) {
			this.x += this.imgW * 3 * 6;

			this._initPipeY();
		}

		ctx.drawImage(this.imgUp, this.x, this.upY);
		ctx.drawImage(this.imgDown, this.x, this.downY);

		this._initPath(drawCtx);
	},

	_initPipeY: function() {
		var pipeTopHeight = Math.floor(Math.random() * 200) + 50;

		this.upY = pipeTopHeight - this.imgH;
		this.downY = pipeTopHeight + this.pipeSpace;
	},

	_initPath: function(drawCtx) {
		var ctx = drawCtx.ctx;

		ctx.rect(this.x, this.upY, this.imgW, this.imgH);
		ctx.rect(this.x, this.downY, this.imgW, this.imgH);
		// ctx.fill();
	}
};


Fly.getPipe = function(options) {
	return new Pipe(options);
};

})(Fly);