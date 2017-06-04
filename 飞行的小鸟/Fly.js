(function(window) {

var Fly = {};

// 根据传入的id创建canvas
var createCanvas = function(id) {
	if(!id) return;

	var container = document.getElementById(id + "");
	var cv = document.createElement("canvas");
	cv.width = 800;
	cv.height = 600;
	container.appendChild(cv);

	return cv;
};
Fly.createCanvas = createCanvas;

// 加载图片函数
Fly.loadImages = function(imgsSrcArr, callback) {
	var imgList = {};
	var imgsLen = imgsSrcArr.length;
	var loadedLength = 0;

	imgsSrcArr.forEach(function(src) {
		var img = new Image();
		img.src = "../imgs/" + src + ".png";
		imgList[src] = img;

		img.addEventListener("load", function() {
			loadedLength++;

			if(loadedLength >= imgsLen) {
				callback(imgList);
			}
		});
	});
};

// 角度转弧度
Fly.toRadian = function(angle) {
	return angle / 180 * Math.PI;
};

window.Fly = Fly;
})(window);