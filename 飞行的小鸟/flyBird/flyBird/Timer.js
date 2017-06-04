(function(Fly) {

var Timer = function(options) {
	this.text = "坚持了0小时0分钟0秒！";
	this.time = 0;
};

Timer.prototype.draw = function(drawCtx) {
	var ctx = drawCtx.ctx;
	this.time = drawCtx.durationTime / 1000;

    var hours = Math.floor(this.time / (60 * 60));
    var minutes = Math.floor(this.time % (60 * 60) / 60);
    var seconds = Math.floor(this.time % 60);
    var milliseconds = (this.time - seconds).toFixed(3) * 1000;
    this.text = '坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒' + milliseconds + "毫秒！";

    ctx.save();

    ctx.fillStyle = "hotpink";
    ctx.font = "25px consolas";
    ctx.fillText(this.text, 450, 30);

    ctx.restore();
};


Fly.getTimer = function(options) {
	return new Timer(options);
};

})(Fly);