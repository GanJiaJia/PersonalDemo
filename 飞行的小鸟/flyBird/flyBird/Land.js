(function(Fly) {

var Land = function(options) {
	this.x = options.x;
	this.img = options.img;
	this.imgW = this.img.width;
	this.y = options.y;

	this.speed = 2;
};

Land.prototype = {
	constructor: Land,

	draw: function(drawCtx) {
		var ctx = drawCtx.ctx;

		this.x -= this.speed;

		if(this.x <= -this.imgW) {
			this.x += this.imgW * 4;
		}
		ctx.drawImage(this.img, this.x, this.y);
	}
};

Fly.getLand = function(options) {
	return new Land(options);
};

})(Fly);