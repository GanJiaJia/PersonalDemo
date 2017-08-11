
	// 获取网页的高度

	$(window).load(function() {
		var width = $(this).width();
		var height = $(this).height();
		$('.right').css({
			'height':height + 'px'
		})
		centerMiddle();
	});
	$(window).resize(function() {
	    var width = $(this).width();
	    var height = $(this).height();
	    $('.right').css({
			'height':height + 'px'
		})
	  centerMiddle();
	});

	// 点击导航栏下拉
	$('body').on('click','.plus',function(){

		// 其他兄弟栏隐藏
		$(this).parent().siblings().find('.nav_child').slideUp('fast');
		$(this).parent().siblings().find('.add').removeClass('minus');
		$(this).parent().siblings().find('.seled').removeClass('sel');
		// 判断是否还有子集
		if ($(this).hasClass('minus')) {
			$(this).siblings().slideUp('fast');
			$(this).removeClass('minus');
			$(this).siblings().removeClass('addbgc');
		} else {
			$(this).siblings().slideDown('fast');
			$(this).addClass('minus');
			$(this).siblings().addClass('addbgc');
		}
		
	})

	//没有下拉子集的栏目点击
	$('.seled').on('click',function(){

		$(this).parent().siblings().find('.plus').removeClass('minus');
		$(this).parent().siblings().find('.nav_child').slideUp('fast');
		$(this).parent().siblings().find('.seled').removeClass('sel');

		if (!$(this).hasClass('sel')) {
			$(this).addClass('sel');
		} 
	})

	//鼠标移到用户中心上时
	$('.userinfo').hover(function(){
		$('.userinfo a.uinfo').addClass('hovr');
		$('.userinfo ul').show();
	},function(){
		$('.userinfo a.uinfo').removeClass('hovr');
		$('.userinfo ul').hide();
	})

	// 公用的tabs模块
	function publicTabs(navs){

		// 判断是否有mark标识，如果没有的话在tabs栏目插入tab标签
		if (!$(navs).hasClass('mark')) {
			var textVal = navs.text(),
					dataId = navs.attr('data-id'),
					links = navs.attr('ifr-url'),
					url = navs.attr('jurl'),
					rescodes = navs.attr('rcode'),
					html = '<a href="#" data-id="'+dataId+'" aurl="'+url+'" resCode="'+rescodes+'"><strong>'+textVal+'</strong><em class="icon-remove-sign remove"></em></a>',
					iframeHtml = '<iframe src="'+links+'" frameborder="0" data-id="'+dataId+'"></iframe>';
			// 插入到tab里面
			$('.navslist').append(html);
			$('.right').append(iframeHtml);

			// 点击时切换到相应的tab上
			$('.navs a').last().addClass('sel').siblings().removeClass('sel');
			$('.navs a').last().find('em').addClass('sel');
			$('.navs a').last().siblings().find('em').removeClass('sel');
			// tab相应的iframe也要对应的显示
			$('.right iframe').last().addClass('show').siblings().removeClass('show');

			$(navs).addClass('mark');
			
		} else {
			// 如果已经在tab里面存在，通过data-id去找寻相应的tab和iframe显示
			var dataIdIndex = navs.attr('data-id');
			$('.navs a').map(function(index,elem) {
	      if ($(elem).attr('data-id') == dataIdIndex) {
	      	var ind = $(this).index();
	      	$('.navs a').eq(ind).addClass('sel').siblings().removeClass('sel');
	      	$('.navs a').eq(ind).find('em').addClass('sel');
	      	$('.navs a').eq(ind).siblings().find('em').removeClass('sel');
	      	$('.right iframe').eq(ind).addClass('show').siblings().removeClass('show');
	      }
  		});   

		}	
	}

	// 点击左边导航栏生成tabs切换，调用公用方法publicTabs();
	var lengths = 0;
	var nwid = $('.navs').width() - 100;

	function turn(){
		var aw = $('.navs a'),
			aws = 0;
		aw.map(function(index,elem){
			aws += $(elem).outerWidth();
		})
		
		if (aws > nwid) {
			lengths += -200;
			
			if (lengths < -1000) {
				return false;
			} else {
				$('.navslist').stop().animate({
					'left': lengths +'px'
				},200)
			}
			
		}
	}
	function positionElement(elem){
		var dataIds = elem.attr('data-id');
		var preLen = 0;
		$('.navs a').map(function(index,elem){

			if ($(elem).attr('data-id') == dataIds) {
				
				$(this).prevAll().map(function(index,elem){
					preLen += $(elem).outerWidth();
				})
				
			}
		})
		if (preLen > nwid) {
			$('.navslist').stop().animate({
				'left': -1000 +'px'
			},200)
		} else {
			$('.navslist').stop().animate({
				'left': 0 +'px'
			},200)
		}
	}

	// 点击二级菜单
	$('body').on('click','.nav_child a',function(){
		var url = $(this).attr('jurl'),
				resourceCode = $(this).attr('rcode'),
				links = $('.links').val(),
		 		token = $.cookie('token'),
		 		proId = $.cookie('proId'),
		 		aid = $.cookie('aid'),
		 		cthis = $(this),
		 		jurl = $(this).attr('rcode'),
			 	date = new Date(); 
		if ($(this).hasClass('menuebtns')) {
			$('.menus_btn').stop().animate({
			'left':'0rem'
			},200)
			$('.left').stop().animate({
				'left':'-30rem'
			},200);
			$('.showhead').stop().animate({
				'top':'5.6rem'
			},200);
			$('.top,.tabs').show();
				$('.right').css({
				'padding-top':'5.5rem'
			});
			$('.right iframe').css({
				'padding-top':'5.5rem'
			});
			$('.showhead i').removeClass('icon-chevron-down');
			$('.showhead i').addClass('icon-chevron-up');
			$('.menus_btn').removeClass('mark');
			$('.showhead').removeClass('mark');
			$('.phonemask').hide();
			$('.nav_child li a').removeClass('menuebtns');
		}
		date.setTime(date.getTime()+30*60*1000);
		$.cookie('resCode', resourceCode, { path: "/", expires: date.toGMTString()});
		$.cookie('url', url, { path: "/", expires: date.toGMTString()});
		$.cookie('links', links, { path: "/", expires: date.toGMTString()});
		cthis.addClass('sels').parent().siblings().find('a').removeClass('sels');
		cthis.addClass('sels').parent().parent().parent().siblings().find('a').removeClass('sels');
		var navs = cthis;
		positionElement(navs);
		turn();
		publicTabs(navs,url);
	})

	$('.add.seled').on('click',function(){
		$('.nav_child a').removeClass('sels');
		var navs = $(this);
		positionElement(navs);
		turn();	
		publicTabs(navs);
	})
	// 点击tabs切换
	$('body').on('click','.navs a',function(){
		var index = $(this).index(),
				url = $(this).attr('aurl'),
				dataId = $(this).attr('data-id'),
				resCode = $(this).attr('resCode'),
				menuList = $('.nav_child li'),
				date = new Date(); 
		date.setTime(date.getTime()+30*60*1000);
		$.cookie('url', url, { path: "/", expires: date.toGMTString()});
		$.cookie('resCode', resCode, { path: "/", expires: date.toGMTString()});
		menuList.map(function(index,elem){

			if ($(elem).find('a').attr('data-id') == dataId) {
				$(elem).find('a').addClass('sels').siblings().removeClass('sels');
				$(elem).find('a').parent().siblings().find('a').removeClass('sels');
				$(elem).find('a').parent().parent().slideDown();
				$(elem).find('a').parent().parent().siblings().addClass('minus');
				$(elem).find('a').parent().parent().parent().siblings().find('a.plus').removeClass('minus');
				$(elem).find('a').parent().parent().parent().siblings().find('ul').slideUp();
			}
		})
		$(this).addClass('sel').siblings().removeClass('sel');
		$(this).find('em').addClass('sel');
		$(this).siblings().find('em').removeClass('sel');
		$('.right iframe').eq(index).addClass('show').siblings().removeClass('show');
	})

	//移除tab标签
	$('.navs').on('click','em.remove',function(){
		var ind = $(this).parent().index(),
			dataInd = $(this).parent().attr('data-id');
			aclass = $(this).parent(),
			len = aclass.parent().find('a').length;

		$('.nav_child a').map(function(index,elem){
			if ($(elem).attr('data-id') == dataInd) {
				$(this).removeClass('mark');
			}
		})
		// $('.navs a').unbind('click');
		$('.add.seled').map(function(index,elem){
			if ($(elem).attr('data-id') == dataInd) {
				$(this).removeClass('mark');
			}
		})
		// 判断是否是已选中的tab移除，如果是则后一个显示
		if (aclass.hasClass('sel')) {
			// 判断是否是最后一个tab，如果是则它的前一个tab显示
			if (ind == len-1) {
				aclass.prev().addClass('sel');
				$('.right iframe').eq(ind-1).addClass('show');
				$('.right iframe').eq(ind).remove();
				$(this).parent().remove();
			} else {
				aclass.next().addClass('sel');
				$('.right iframe').eq(ind+1).addClass('show');
				$('.right iframe').eq(ind).remove();
				$(this).parent().remove();
			}
				
		} else {
			$('.right iframe').eq(ind).remove();
			$(this).parent().remove();	
		}
		
	})
	
	// 查看更多标签栏 向左 <-
	

	$('body').on('click','.next',function(){

		var aw = $('.navs a'),
			aws = 0;
		aw.map(function(index,elem){
			aws += $(elem).outerWidth();
		})
		if (aws > nwid) {
			lengths = -1000;
			$('.navslist').stop().animate({
				'left': lengths +'px'
			},200)
		} else {
			return false;
		}
		
	})

	$('body').on('click','.back',function(){

		lengths = 0;
		$('.navslist').stop().animate({
			'left': lengths +'px'
		},200)
		
	})

// 加载登录成功后的数据,菜单栏

// function loadInfo(){
// 	var links = $('.links').val(),
// 	 		token = $.cookie('token'),
// 	 		proId = $.cookie('proId'),
// 	 		name = $.cookie('name'),
// 	 		aid = $.cookie('aid');
// 	$('.uinfo span').text(name);
// 	$('body').append(_LoadingHtml);
// 	console.log(token);
// 	$.ajax({
// 		type:'post',
// 		url:links+'/account/userResource',
// 		data:{
// 			proId:proId,
// 			token:token,
// 			aid:aid
// 		},
// 		dataType:'text',
// 		success:function(data){
// 			$('#loadingDiv').remove();
// 			var obj = JSON.parse(data);
// 			var menue = obj.data;
// 			console.log(obj);
// 			menue.map(function(index,elem){
// 				var html = '<li class=""><a href="#" class="plus add"><i class="icon-user-md icon-large"></i><span>'+index.resourceName+'</span></a><ul class="nav_child"></ul></li>';
// 				var items = index.resources;
// 				$('.navlist').append(html);
// 				items.map(function(val,ele){

// 					var htmlChild = '<li><a href="#" data-id="'+val.resourceId+'" ifr-url="" jurl="'+val.url+'" rcode="'+val.resourceCode+'" class="acc_list"><span>'+val.resourceName+'</span></a></li>';
// 					$('.nav_child').append(htmlChild);
// 				})
				
// 			})
// 		},
// 		complete: function(){
// 			$('#loadingDiv').remove();
// 		}
// 	})
// }
// 提示信息显示之后消失
function showErrorTips(){
	$('.mask,.tips').fadeOut();
}

// 退出登录
$('.logout').click(function(){
	window.location.href = '../../login.html';
})


