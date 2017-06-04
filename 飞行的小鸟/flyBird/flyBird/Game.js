(function(Fly) {

var FlappyBird = function(options) {
	this._init(options);
};

FlappyBird.prototype = {
	constructor: FlappyBird,

	_init: function(options) {
		this.cv = Fly.createCanvas(options.id);
		this.ctx = this.cv.getContext("2d");

		this.imgsSrc = ["birds", "land", "pipe1", "pipe2", "sky"];
		this.roles = [];
		this.isRuning = false;
		this.hero = null;

		this.curFrameTime = 0;
		this.lastFrameTime = new Date();
		this.delta =  0;
		this.durationTime = 0;
	},

	start: function() {
		var self = this;
		var roles = self.roles;

		Fly.loadImages(this.imgsSrc, function(imgList) {
			// 初始化所有游戏角色
			self.initRoles(imgList);

			// 渲染游戏
			self.render(imgList);
		});

		this.bindEvent();
	},
	
	render: function(imgList) {
		var self = this,
			roles = self.roles,
			ctx = self.ctx,
			bird = self.hero;

		// 开始游戏
		self.isRuning = true;

		// 创建上下文对象
		var drawCtx = {
			ctx: ctx,
			canvas: this.cv,
			imgList: imgList
		};

		(function render() {
			ctx.beginPath();
			ctx.clearRect(0, 0, cv.width, cv.height);
			
			// 计算 世界时间
			self.curFrameTime = new Date();
			self.delta = self.curFrameTime - self.lastFrameTime;
			self.lastFrameTime = self.curFrameTime;
			// 游戏运行的总时间
			self.durationTime += self.delta;

			// 给上下文对象添加 时间参数
			drawCtx.delta = self.delta;
			drawCtx.durationTime = self.durationTime;

			roles.forEach(function(role) {
				role.draw(drawCtx);
			});
			bird.draw(drawCtx);

			if(self.isRuning) {
				requestAnimationFrame(render);
			}
		})();
	},

	initRoles: function(imgList) {
		var self = this,
			roles = this.roles,
			ctx = this.ctx,
			skyImg = imgList["sky"],
			pipeUp = imgList["pipe2"],
			pipeDown = imgList["pipe1"],
			landImg = imgList["land"],
			birdImg = imgList["birds"],
			sky = null,
			pipe = null,
			land = null,
			bird = null,
			timer = null;

		// 绘制天空
		for(var i = 0; i < 2; i++) {
			sky = Fly.getSky({
				img: skyImg,
				x: i * skyImg.width
			});

			roles.push(sky);
		}

		// 绘制管道
		for(var i = 0; i < 6; i++) {
			pipe = Fly.getPipe({
				imgUp: pipeUp,
				imgDown: pipeDown,
				x: i * 3 * pipeUp.width + 300
			});

			roles.push(pipe);
		}

		// 绘制陆地
		for(var i = 0; i < 4; i++) {
			land = Fly.getLand({
				img: landImg,
				x: i * landImg.width,
				y: this.cv.height - landImg.height
			});

			roles.push(land);
		}

		// 绘制时间
		timer = Fly.getTimer({});
		this.roles.push(timer);

		// 绘制小鸟
		bird = Fly.getBird({
			img: birdImg
		});

		this.hero = bird;

		// 监听小鸟
		this.hero.addListener(function() {
			self.stop();
		});
	},
	stop: function() {
		this.isRuning = false;
	},
	bindEvent: function() {
		var self = this;

		// 绑定事件
		this.cv.addEventListener("click", function() {
			self.hero.changeSpeed( -.3 );
		});
	}
};

// 单例模式
var gameInstance = null;
Fly.getGame = function(options) {
	if(gameInstance === null) {
		gameInstance = new FlappyBird(options);
	}

	return gameInstance;
};

})(Fly);