(function(Fly) {

var Sky = function(options) {
	this.x = options.x;
	this.img = options.img;
	this.imgW = this.img.width;

	this.speed = 2;
};

Sky.prototype = {
	constructor: Sky,

	draw: function(drawCtx) {
		var ctx = drawCtx.ctx;

		this.x -= this.speed;
		if(this.x <= - this.imgW) {
			this.x += this.imgW * 2;
		}

		ctx.drawImage(this.img, this.x, 0);
	}
};


Fly.getSky = function(options) {
	return new Sky(options);
};

})(Fly);