  // 弹窗水平垂直居中，并且随着window的变化而做相应的水平垂直居中
    function centerMiddle(){
    var left = $(this).width() - $('.edit_accountcon').width(),
        top = $(this).height() - $('.edit_accountcon').height(),
        deleteL = $(this).width() - $('.delete_tips').width(),
        deleteT = $(this).height() - $('.delete_tips').height(),
        addL = $(this).width() - $('.add_account').width(),
        addH = $(this).height() - $('.add_account').height(),
        addLs = $(this).width() - $('.tips').width(),
        addHs = $(this).height() - $('.tips').height();
        postW = $(this).width() - $('.post_tips').width(),
        postH = $(this).height() - $('.post_tips').height();
    $('.edit_accountcon').css({
      'left':left/2 + 'px',
      'top':top/2 + 'px'
    })
    $('.delete_tips').css({
      'left':deleteL/2 + 'px',
      'top':deleteT/3 + 'px'
    })
    $('.add_account').css({
      'left':addL/2 + 'px',
      'top':addH/2 + 'px'
    })
    $('.tips').css({
      'left':addLs/2 + 'px',
      'top':addHs/2.2 + 'px'
    })
    $('.post_tips').css({
      'left':postW/2 + 'px',
      'top':postH/2 + 'px'
    })
  }
  // IE8+ placeholder兼容性
  if( !('placeholder' in document.createElement('input')) ){   

    $('input[placeholder],textarea[placeholder]').each(function(){    
      var that = $(this),    
      text= that.attr('placeholder');    
      if(that.val()===""){    
        that.val(text).addClass('placeholder');    
      }    
      that.focus(function(){    
        if(that.val()===text){    
          that.val("").removeClass('placeholder');    
        }    
      })    
      .blur(function(){    
        if(that.val()===""){    
          that.val(text).addClass('placeholder');    
        }    
      })    
      .closest('form').submit(function(){    
        if(that.val() === text){    
          that.val('');    
        }    
      });    
    });    
  } 

//判断浏览器是否支持 placeholder属性  
function isPlaceholder(){  
  var input = document.createElement('input');  
  return 'placeholder' in input;  
}  

if (!isPlaceholder()) {//不支持placeholder 用jquery来完成  
  $(document).ready(function() {  
    if(!isPlaceholder()){  
      $("input").not("input[type='password']").each(//把input绑定事件 排除password框  
        function(){  
          if($(this).val()=="" && $(this).attr("placeholder")!=""){  
            $(this).val($(this).attr("placeholder"));  
            $(this).focus(function(){  
            if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
          });  
          $(this).blur(function(){  
              if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
          });  
        }  
      });   
    }  
  });  
} 

// 定义一个cookie
$.cookie = function (name, value, options) {  
  if (typeof value != 'undefined') {  
    options = options || {};  
    if (value === null) {  
      value = '';  
      options.expires = -1;  
    }  
    var expires = '';  
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {  
      var date;  
      if (typeof options.expires == 'number') {  
          date = new Date();  
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));  
      } else {  
          date = options.expires;  
      }  
      expires = '; expires=' + date.toUTCString();  
    }  
    var path = options.path ? '; path=' + (options.path) : '';  
    var domain = options.domain ? '; domain=' + (options.domain) : '';  
    var secure = options.secure ? '; secure' : '';  
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');  
} else {  
    var cookieValue = null;  
    if (document.cookie && document.cookie != '') {  
      var cookies = document.cookie.split(';');  
      for (var i = 0; i < cookies.length; i++) {  
        var cookie = jQuery.trim(cookies[i]);  
        if (cookie.substring(0, name.length + 1) == (name + '=')) {  
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));  
          break;  
        }  
      }  
    }  
    return cookieValue;  
  }  
}
/*
*
页面加载前的加载状态
*
*/

//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight / 2 ,
    _LoadingLeft = _PageWidth  / 2;
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" class="icon-spinner icon-spin icon-2x" style="position: fixed;width:25px;height:29px;cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; color: #ccc;z-index:112;opacity:0.8"></div>';
//呈现loading效果
// document.write(_LoadingHtml);
//监听加载状态改变
// document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
// function completeLoading() {
//   if (document.readyState == "complete") {
//     var loadingMask = document.getElementById('loadingDiv');
//     loadingMask.parentNode.removeChild(loadingMask);
//   }
// }



// 开关控制

$('body').on('click','.toggle',function(e){
	e.preventDefault();
	var toggle = this;	
	$(toggle).toggleClass('toggle--on')
	.toggleClass('toggle--off')
	.addClass('toggle--moving');
	
	setTimeout(function() {
		$(toggle).removeClass('toggle--moving');
	}, 200);
	var onOff_id = $(this).parents('tr').children('.userId').attr('u-id');
	var onOff = 0;
	if ($(this).hasClass('toggle--on')) {
		onOff = 1;
	}else {
		onOff = 0;
	}
  //   var link = $.cookie('links'),
	//     token = $.cookie('token'),
	//     aid = $.cookie('aid'),
	//     url = $.cookie('url'),
	//     resCode = $.cookie('resCode');
	// $('body').append(_LoadingHtml);
	// $.ajax({
	// 	type: "post",
	// 	url: link+"/manage/app/updateOnOff",
	// 	data: {token:token,aid:aid,resCode:resCode,id:onOff_id,onOff:onOff},
	// 	dataType:'JSONP',
	// 	jsonp:'callBack',
	// 	jsonpCallback: 'callBack', 
	// 	contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	// 	success: function(obj){
	// 		if(obj.code == 200){
	// 			$('.post_tips').fadeIn().text('修改成功');
	// 			$('.add_account').fadeOut();
	// 			setTimeout(function(){
	// 				$('.post_tips').fadeOut();
	// 				setTimeout(window.location.reload(),1000);
	// 			},1000);
	// 		}else {
	// 			$('.post_tips').fadeIn().text('修改失败');
	// 			$('.add_account').fadeOut();
	// 			setTimeout(function(){
	// 				$('.post_tips').fadeOut();
	// 				setTimeout(window.location.reload(),1000);
	// 			},1000);
	// 		}
	// 	},
	// 	error: function(){
	// 		$('.post_tips').fadeIn().text('服务器请求异常');
	// 		setTimeout(function(){
	// 			$('.post_tips').fadeOut();
	// 		}, 1000);
	// 	},
	// 	complete: function(){
	// 		$('#loadingDiv').remove();
	// 	}
	// });

});


//日期控件控制

    
    jQuery(function ($) {
        $.datepicker.regional['zh-CN'] = {
            closeText: '关闭',
            prevText: '<上月',
            nextText: '下月>',
            currentText: '今天',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
            monthNamesShort: ['一', '二', '三', '四', '五', '六',
                '七', '八', '九', '十', '十一', '十二'
            ],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            weekHeader: '周',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '年'
        };
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    });

    $(function () {

        $("#from").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#to").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            onClose: function (selectedDate) {
                $("#from").datepicker("option", "maxDate", selectedDate);
            }
        });
    });