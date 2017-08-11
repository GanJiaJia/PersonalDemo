(function () {

	$(window).load(function() {
		var width = $(this).width();
		var height = $(this).height();
		$('.login_body').css({
			'height':height + 'px',
			'width':width + 'px'
		})
	});
	$(window).resize(function() {
	    var width = $(this).width();
	    var height = $(this).height();
	    $('.login_body').css({
			'height':height + 'px',
			'width':width + 'px'
		})
	});


	// 用户名输入框聚焦
	$('.username').on('focus',function(){
		$('.user_error').stop().animate({
			right:'-200px'
		});
		$(this).parent().addClass('f');
		$(this).parent().find('span').addClass('sel');
	})
	// 失去焦点
	$('.username').on('blur',function(){
		$('.user_error').stop().animate({
			right:'-200px'
		});
		$(this).parent().removeClass('f');
		$(this).parent().find('span').removeClass('sel');
	})
	//聚焦时密码校验
	$('.passw').on('focus',function(){

		$(this).parent().addClass('f');
		$(this).parent().find('span').addClass('sel');

		$('.passw_error').stop().animate({
			right:'-200px'
		});

	})
	$('.passw').on('blur',function(){

		$(this).parent().removeClass('f');
		$(this).parent().find('span').removeClass('sel');

		$('.passw_error').stop().animate({
			right:'-200px'
		});

	})
	//点击登录

	function loginPblicFun(){
		var username = $('.username').val(),
			password = $('.passw').val(),
			links = $('.links').val();

		if ($('.username').val() == '' || $('.passw').val() == '') {

				if ($('.username').val() == '') {

					$('.user_error').stop().animate({
						right:'15px'
					});

				} else if($('.passw').val() == ''){

					$('.passw_error').stop().animate({
						right:'15px'
					});

				}
				
			} else {
				if ($("#btn").hasClass('unclick')) {
					return false;
				} else {

					$("#btn").addClass('unclick');
					$('body').append(_LoadingHtml);
					if ($('.username').val() == 'kehu005' && $('.passw').val() == 'kehu005') {
						window.location.href = 'html/system/index.html';
					} else {
						$('.error').text('用户名或密码不正确');
					}
					// $.ajax({
					// 	type:'post',
					// 	url:links+'/account/login',
					// 	data:{
					// 		name:username,
					// 		password:password,
					// 		proId:''
					// 	},
					// 	dataType:'text',
					// 	success:function(data){
					// 		$('#loadingDiv').remove();
					// 		var obj = JSON.parse(data);
					// 		var date=new Date(); 
					// 		date.setTime(date.getTime()+30*60*1000);
					// 		if (obj.code == 0) {
					// 			window.location.href = 'system/index.html';
					// 			$.cookie('token', obj.data.token, { path: "/", expires: date.toGMTString()});
					// 			$.cookie('aid', obj.data.aid,{ path: "/", expires: date.toGMTString()});
					// 			$.cookie('proId', obj.data.proId, { path: "/", expires: date.toGMTString()});
					// 			$.cookie('name', obj.data.name, { path: "/", expires: date.toGMTString()});
					// 		}	else {
					// 			$("#btn").removeClass('unclick');
					// 		}	 			
					// 	},
					// 	error:function(){
					// 		$('.sub_error').fadeIn();
					// 		$('.sub_error').text('服务器请求异常');
					// 		$("#btn").removeClass('unclick');	
					// 	},
					// 	complete: function(){
					// 		$('#loadingDiv').remove();
					// 	}
					// })	
					
				}
				
		}
	}
	$(".btn").on('click',function() {
		loginPblicFun(); 
	});
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
				loginPblicFun(); 
	    }
	}
}())