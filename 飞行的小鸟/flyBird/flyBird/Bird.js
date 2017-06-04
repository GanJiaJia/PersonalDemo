(function(Fly) {

var Bird = function(options) {
	this.img = options.img;
	this.imgW = this.img.width / 3;
	this.imgH = this.img.height;

	this.frameIndex = 0;
	this.speed = 0;
	this.a = 0.0005;
	this.y = 100;
	this.x = 100;

	this.listeners = [];
};

Bird.prototype = {
	constructor: Bird,
	draw: function(drawCtx) {
		var ctx = drawCtx.ctx;

		this.update(drawCtx.delta);

		// 计算 bird 的角度
		var maxAngleSpeed = 0.5,
			curAngle = 0;
		if(this.speed >= maxAngleSpeed) {
			curAngle = 45;
		} else if(this.spedd <= -maxAngleSpeed) {
			curAngle = -45;
		}

		curAngle = this.speed / maxAngleSpeed * 45;

		// 旋转绘制鸟头的朝向
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate( Fly.toRadian(curAngle) );
		ctx.drawImage(this.img, this.frameIndex * this.imgW, 0, this.imgW, this.imgH, 
			- 1/2*this.imgW, - 1/2*this.imgH, this.imgW, this.imgH);

		ctx.restore();

		// 序列帧
		this.frameIndex++;
		this.frameIndex %= 3;

		// 碰撞检测
		if( this.isBirdDie(drawCtx) ) return;
	},

	update: function(delta) {
		// 更新速度 和 位置
		this.speed = this.speed + this.a * delta;
		this.y = this.y + this.speed * delta + 1/2 * this.a * delta * delta;
	},

	isBirdDie: function(drawCtx) {
		var ctx = drawCtx.ctx,
			flag = false,
			maxY = drawCtx.canvas.height - drawCtx.imgList["land"].height - 10;

		if(this.y < 0 || 
			this.y >= maxY ||
			ctx.isPointInPath(this.x, this.y)) {

			flag = true;
			this.trigger();
		}

		return flag;
	},

	addListener: function(callback) {

		this.listeners.push(callback);
	},

	trigger: function() {
		this.listeners.forEach(function(lst) {

			lst();
		});
	},

	changeSpeed: function(speed) {

		this.speed = speed;
	}
};

Fly.getBird = function(options) {
	return new Bird(options);
};

})(Fly);