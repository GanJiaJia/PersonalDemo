(function() {

var Base = function(options) {
	this.ctx = options.ctx;

	this.speed = 2;
	this.x = 0;
	this.y = 0;
};

Fly.getBase = function(options) {
	return new Base(options);
};

})(Fly);




var str = "{'name':'asdf'}"

eval("var obj = " + str);