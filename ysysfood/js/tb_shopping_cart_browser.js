var head = document.getElementsByTagName('HEAD').item(0);
var style = document.createElement('link');
style.href = relativeToAbsoluteURL('plugin/tb_shopping_cart/css/tb_shopping_cart.css');
style.rel = 'stylesheet';
style.type = 'text/css';
head.appendChild(style);

function tb_shopping_cart_initFrame(frame,contentClass,height){	
	var self = frame,bh = self.contentWindow.document.body.scrollHeight,
	dh = self.contentWindow.document.documentElement.scrollHeight,max = Math.max;
	
	var $parent = $(self).closest('.wp-floatpanel_dialog'),otherh = 0,temph = max(bh,dh);
	temph+=1;
	if($.browser.msie){
		temph = temph+25;
	}
	$parent.find('.'+contentClass).siblings().each(function(i,dom){
		otherh += $(dom).outerHeight(true);
	});

	var _float = function(numString){
		var number = parseFloat(numString);
		if(isNaN(number)) return 0;
		return number;
	};
	var winheight=window.innerHeight || self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	winheight-=39;
	var seth = _float(height),maxh = seth ? seth : max(winheight,200),
	difw = maxh - otherh - 10;// 上下间隔5像素
	if(difw < temph) temph = difw;
	frame.height = max(temph,200);
}

//购物车弹出层
function wp_shoppingcart_position(dom,width,height,overlayid){
	if(dom instanceof jQuery == false) return;
	var $target = dom,/*$win = $(window),*/tpw = $target.outerWidth(true),tph = $target.outerHeight(true),
	floor = Math.floor,rgx = /^\d+$/i,ocs = {};
	// Parse
	if(rgx.test(height)) tph = height;
	tpw = Math.max(tpw,width);
	var wnw = window.innerWidth || self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	wnh = window.innerHeight || self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	pllt = floor((wnw - tpw)/2);
	// Overlay
	$('#'+overlayid).width(wnw).height(wnh);
	// Panel
	ocs['left'] = pllt+'px';
	ocs['top'] = '-3px';
	$target.css(ocs);
}

(function(window){
	
	/**
	 * Float对话框
	 * (String)load_url - 加载的地址
	 * (Object)option - 配置项(title|titlebg|contentClass|id|width|height|left|top|isCenter|overlay|showBottom|zIndex|open|close)
	 */
	function wp_shoppingCart(load_url,option){
		var modregexp=/_m=([^&]+)/;
		var actregexp=/_a=([^&]+)/;

		var modarr=modregexp.exec(load_url);
		var actarr=actregexp.exec(load_url);
		var m='';
		var a='';
		if(modarr) m=modarr[1];
		if(actarr) a=actarr[1];
		if(m=='tb_shopping_cart' && (a=='showItems'||a=='showOrders'||a=='showOrderInterface'||a=='shownotes'||a=='showuserlogin')){
			openWDialog(load_url,option);
			return;
		}
		if(m=='tb_shopping_cart' && (a=='mydistributors')){
			option['style']=a;
			// 修复”分销链接异常(bug#646)“问题 16/06/03 ↓↓↓↓↓↓
			load_url = load_url.replace('mydistributors', 'mydistributors&referid='+($('#page_id').val()||'0'));
			openWDialog(load_url,option);
			return;
		}
		var config = $.extend({},{
			width: 286,
			height: 'auto',
			left: 5
		},option||{});
		var load_url = load_url+'&m_r='+Math.random();
		// Remove old panel
		var pnl,$pnl,wp_timer,id = 'shopping_cart-items';
		var rgx = /^\d+$/i,plw = config.width,plh = config.height,cc = 'wp-new-cart-windows-content',z = 1001;
		
		// Init overlay
		var ols = '';
		var $overlay = $('#wp-floatpanel_overlay');
		if($overlay.size() > 0) $overlay.remove();
		ols = '<div id="wp-floatpanel_overlay" style="z-index:'+z+';"></div>';
		z += 1;
		
		// Loading area
		var $tmpwin = $(window),$load = $('#wp-floatpanel_loading'),loadstr = '<div id="wp-floatpanel_loading" style="z-index:'+(z-1)+';"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>';
		if($load.size() > 0) $load.remove();
		
		// Create panel
		var superid = $.options ? $.options.superid : 0;
		var $ap = $('<div id="'+id+'" class="" style="background:none;box-shadow:none;display:none;position:absolute;z-index:'+z+';"><div class="wp-new-cart-close"><a class="wp-shopping_cart-close" href="javascript:void(0);"></a></div><div class="wp-new-cart-windows-top"></div>'
				+'<div class="'+cc+'"></div><div class="wp-new-cart-windows-bottom"></div></div>'+ols+loadstr).appendTo('body');
		pnl = $ap[0];$pnl = $(pnl);
		// Loading position
		var winWidth = $tmpwin.width(),pnlWidth = $pnl.width();
		$('#wp-floatpanel_loading').width(winWidth).height($tmpwin.height());
		
		// Events
		$pnl.bind('wpdialogclose',function(e){
			$pnl = {};// 注销$pnl对象
			clearTimeout(wp_timer);
			var dom = $(e.target);
			dom = dom.add('#wp-floatpanel_overlay');
			if($.isFunction(config.close)) config.close(dom[0]);
			$(document).trigger('click');//IE8中无法移除cstselect插件的div.wp-diy-selected-content
			return dom.add('#wp-floatpanel_loading').remove();
		});
		
		// Load content
		$.Deferred(function(dtd){
			// Modal setting
			var frmw = plw - 26/*左右padding值为2*13px*/,frame = '<div class="wp-iframe_beforloaded"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>'
				+'<iframe style="background-color:transparent;" allowtransparency="true" id="'+id+'_frame" name="'+id+'_frame" frameborder="0" src="'+load_url+'" scrolling="auto" width="'+frmw+'" onload="this.height=200;$(\'.wp-iframe_beforloaded\',\'#'+id+'\').remove();tb_shopping_cart_initFrame(this,\''+cc+'\',\''+plh+'\');"></iframe>';
				dtd.resolve(frame);
			return dtd.promise();
		}).done(function(data){
			$('#wp-floatpanel_loading').remove();
			// Append innerHTML
			var ocs = {};
			var cccdiv=$('.'+cc,pnl);
			cccdiv.html(data);
			if(rgx.test(plw)) ocs['width'] = plw+'px';
			if(rgx.test(plh)) ocs['height'] = plh+'px';
			// Reset position
			$pnl.show().css(ocs);
			wp_timer = setTimeout(function(){
				$pnl.triggerHandler('wpdialogsetpos');
				cccdiv.find('.wp-iframe_beforloaded').width(cccdiv.width()-45).height(cccdiv.height());
			},30);
			// Bind window resize
			$(window).resize(function(){
				wp_shoppingcart_position($pnl,plw,plh,'wp-floatpanel_overlay');
			});
			$pnl.bind('wpdialogsetpos',function(e){
				wp_shoppingcart_position($pnl,plw,plh,'wp-floatpanel_overlay');
			});
		}).fail(function(){
			wp_alert(config.title+"(deferred fail).<br/>"+translate('Request failed!')); 
			$pnl.triggerHandler('wpdialogclose');
			return false;
		});
		// Bind close events
		$('.wp-shopping_cart-close',pnl).bind('click',function(e){
			$pnl.triggerHandler('wpdialogclose');
			// IE下禁止触发onbeforeunload
			e.preventDefault();
		});
		return null;
	}
	window.wp_shoppingCart = wp_shoppingCart;
	
	window.openCustomDialog=function(func){
		$LAB
		.script(relativeToAbsoluteURL("script/datepicker/custom_dialog.js"))
		 .wait(function(){
			func();
		});
	}
	
	var init_config={
			title: 'Title',
			style:'user',
			id: 'wp_shoppingcart_info',
			width: 286,
			height: 'auto',
			left: 5,
			top: 60,
			isCenter: false,
			overlay: false,
			contain:$('body'),
			zIndex: 1666666,
			showBottom: false,
			postbody:false,
			swfFix: false,
			data: {}
	}
	function openWDialog(load_url,option){
		var config = $.extend({},init_config,option||{});
		var dialog=new WDialog(load_url,config);
	}
	
	function openCartResult(style,option){
		var scrollt=$(window).scrollTop();
		var dialogel=$('#shopping_cart_result_dlg');
		var styleel=dialogel.find('.'+style);
		dialogel.show();
		$('#shopping_cart_result_dlg .result').hide();
		styleel.show();
		var loadstr="<div class=\"floatlayerbg\" ><div class=\"closebtn\"><a href=\"javascript:;\"></a></div></div>";
		$(loadstr).attr('id','shopping_cart_result_dlg_loading').css({'z-index':999,width:$(window).width(),height:$(window).height(),top:scrollt}).appendTo('body');
		var resizeevent;var iframetimer;var scrollevent;
		$(window).bind('resize',function(e){
			resizeevent=e;
			var scrollt=$(window).scrollTop();
			var winh=$(window).height();
			var winw=$(window).width();
			$('#shopping_cart_result_dlg_loading').css({width:winw,height:winh});
			var dialogw=dialogel.width();
			var dialogh=dialogel.height();

			var leftpos=Math.max((winw-dialogw)/2,5);
			var toppos=Math.max(scrollt+(winh-dialogh)/2,scrollt+20);
			dialogel.css({left:leftpos,top:toppos});
		})
		$(window).bind('scroll',function(e){
			scrollevent=e;
			$(window).scrollTop(scrollt);
		})
		var cannotclose=option.cannotclose;
		if(!cannotclose){
			dialogel.bind('wclose.dlg',function(){
				if(resizeevent) $(window).unbind(resizeevent);
				if(scrollevent) $(window).unbind(scrollevent);
				if(iframetimer) clearInterval(iframetimer);
				dialogel.hide().unbind('.dlg');
				$('#shopping_cart_result_dlg_loading').remove();
			})
		}
		$(window).triggerHandler('resize');$(window).triggerHandler('scroll');
		$('#shopping_cart_result_dlg_loading .closebtn').click(function(e){
			 e.preventDefault();
			 dialogel.trigger('wclose');
		})
		styleel.find('.refresh_link').unbind('click').bind('click',function(e){
			e.preventDefault();
			dialogel.trigger('wclose');
			location.reload();
		})
		styleel.find('.close_link').unbind('click').bind('click',function(e){
			e.preventDefault();
			dialogel.trigger('wclose');
		})
		styleel.find('.user_manage_link').unbind('click').bind('click',function(e){
			e.preventDefault();
			$LAB
			.script(relativeToAbsoluteURL("script/usermanagepc/usermanage.js"))
			.wait(function(){
				wp_openManageDialog(parseToURL('wp_user_manage','user_manage'),{});
			 });
			dialogel.trigger('wclose');
		})
		var oid=option.order.oid;
		styleel.find('.order_view_link').unbind('click').bind('click',function(e){
			e.preventDefault();
			$LAB
			.script(relativeToAbsoluteURL("script/usermanagepc/usermanage.js"))
			.wait(function(){
				wp_openManageDialog(parseToURL('wp_user_manage','order_view',{oid:oid}),{
					style:'order',
					id:'wp_userorder_info',
					zIndex: 1666669,
					close:function(){},
					data:{
						refresh:function(){}
					}
				});
			 });
			dialogel.trigger('wclose');
		})
		
	}
	
	window.openCartResult=openCartResult;
	
	var cachelang;
	function WDialog(load_url,option){
		this.url=load_url;
		this.options=option;
		var dlg=this;
		var deferred=$.Deferred();
		if(cachelang){
			this._lang=cachelang;
			deferred.resolve();
		}else{
			var keys=['Shopping Cart','Settlement goods','Confirm your order','Payment complete'];
			$.ajax({
				type: "POST",
				url: parseToURL("tb_shopping_cart", "get_global_lang"),
				data: {keys:keys},
				success: function (response) {
					if (response == 'Session expired') window.location.href = getSessionExpiredUrl();
					var json = $.parseJSON(response);
					cachelang=json;
					dlg._lang=json;
					deferred.resolve();
				},
				error: function (xhr, textStatus, errorThrown) {
					deferred.resolve();
				}
			});
		}
		
		deferred.done(function(){
			 dlg.open();
		})
	}
	
	WDialog.prototype.translate=function(key){
		var lang=this._lang;
		if(lang&&lang[key]) return lang[key];
		return key;
	}
	
	WDialog.prototype.open=function(){
		var scrollt=$(window).scrollTop();
		var dialogobj=this;
		var options=this.options;
		var dialogid=options.id;
		var loading_id='wloading_'+dialogid;
		if($('#'+dialogid).length){
			var existdialog=$('#'+dialogid).data('wdialog');
			if(existdialog && existdialog.close) return;
		}
		var zindex=options.zIndex;
		var imgpath=relativeToAbsoluteURL('script/userloginpc/img/loading.gif');
		var dialogstr='';
		if(options.style=='mydistributors'){
			dialogstr='<div id="'+dialogid+'" class="iframebox_d" style="z-index:'+(zindex)+';height:200px;">\n\
<div class="loading"><img src="'+imgpath+'" /></div>\n\
<iframe  name="inner" width="600" height="200" src="'+this.url+'"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>\n\
</div>';
		}else if(options.style=='mydistributors'){
			dialogstr='<div id="'+dialogid+'" class="iframebox_d" style="z-index:'+(zindex)+';height:200px;width:390px;">\n\
<div class="loading"><img src="'+imgpath+'" /></div>\n\
<iframe  name="inner" width="390" height="200" src="'+this.url+'"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>\n\
</div>';
		}else{
		  dialogstr='<div id="'+dialogid+'"  class="scart_iframebox" style="z-index:'+(zindex)+';">\n\
			<div class="sctit">\n\
				<h2 class="dialog_title">'+this.translate('Shopping Cart')+'</h2>\n\
				<p class="curpagetxt subtitle1">\n\
                     <span class="step1 cur">1.'+this.translate('Settlement goods')+'<em></em></span>\n\
                     <span class="step2">2.'+this.translate('Confirm your order')+'<em></em></span>\n\
                     <span class="step3">3.'+this.translate('Payment complete')+'</span>\n\
                    </p>\n\
				<p class="curpagetxt subtitle2">\n\
                     <span class="step2 cur">1.'+this.translate('Confirm your order')+'<em></em></span>\n\
                     <span class="step3">2.'+this.translate('Payment complete')+'</span>\n\
                    </p>\n\
                  <div class="clear"></div>\n\
               </div>\n\
			<div class="iframebox2" style="height:200px;">\n\
			<div class="loading"><img src="'+imgpath+'" /></div>\n\
			<iframe  name="inner" width="990" height="200"  src="'+this.url+'"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>\n\
			</div>\n\
';
		}
		$(dialogstr).appendTo('body');
		var loadstr="<div class=\"floatlayerbg\" ><div class=\"closebtn\"><a href=\"javascript:;\"></a></div></div>";
		$(loadstr).attr('id',loading_id).css({'z-index':(zindex-1),width:$(window).width(),height:$(window).height(),top:scrollt}).appendTo('body');
		dialogobj.el=$('#'+dialogid);
		dialogobj.loading_el=$('#'+loading_id);
		dialogobj.el.data('wdialog',dialogobj);
		dialogobj.set_title(this.url);
		if(options.open) options.open.apply(this);
		if(!(options.style=='mydistributors'||options.style=='mydistributors2')){
			if(!$('#title_scrollbar_css_link').length){
				var head = document.getElementsByTagName('head').item(0);
				var css = document.createElement('link');
				css.id="title_scrollbar_css_link";
				css.href = relativeToAbsoluteURL('script/mscrollbars/jquery.mCustomScrollbar.css');
				css.rel = 'stylesheet';
				css.type = 'text/css';
				head.appendChild(css);
			}
			$LAB.script(relativeToAbsoluteURL('script/mscrollbars/jquery.mCustomScrollbar.js'))
			 .script(relativeToAbsoluteURL('script/mscrollbars/jquery.mousewheel.js')) 
			.wait(function(){
				dialogobj.el.find('.iframebox2').mCustomScrollbar({axis:"y",
						theme:"minimal-dark"});
				dialogobj.el.find('.iframebox2').find('.loading').detach().prependTo(dialogobj.el.find('.iframebox2'));
			});
		}
		
		var resizeevent;var iframetimer;var scrollevent;
		$(window).bind('resize',function(e){
			resizeevent=e;
			dialogobj.dialog_pos();
		})
		$(window).bind('scroll',function(e){
			scrollevent=e;
			$(window).scrollTop(scrollt);
		})
		dialogobj.el.bind('wclose',function(){
			if(resizeevent) $(window).unbind(resizeevent);
			if(scrollevent) $(window).unbind(scrollevent);
			if(iframetimer) clearInterval(iframetimer);
			if(options.close) options.close.apply(dialogobj);
		})
		dialogobj.loading_el.find('.closebtn').bind('click',function(e){
			e.preventDefault();
			dialogobj.close();
		})
		if(options.style=='mydistributors'||options.style=='mydistributors2'){
			dialogobj.loading_el.find('.closebtn').hide();
		}else{
			dialogobj.loading_el.find('.closebtn').show();
		}
		var iframeel=dialogobj.el.find('iframe');
		if(iframeel.length){
			var func=function(){
				var iframewin=iframeel[0].contentWindow;
				if(iframewin && !iframewin.dialogobj){
					iframewin.dialogobj=dialogobj;
				}
			}
			func();
			iframetimer=setInterval(func,300);
		}
		iframeel.load(function(){
			dialogobj.el.find('.loading').hide();
		})
		this.dialog_pos();
	}
	
	WDialog.prototype.close=function(){
		var dialogel=this.el;
		var loadingel=this.loading_el;
		dialogel.trigger('wclose');
		dialogel.remove();
		loadingel.remove();
	}
	
	WDialog.prototype.hide=function(){
		var dialogel=this.el;
		var loadingel=this.loading_el;
		dialogel.hide();
		loadingel.hide();
	}
	
	WDialog.prototype.show=function(){
		var dialogel=this.el;
		var loadingel=this.loading_el;
		dialogel.show();
		loadingel.show();
		this.dialog_pos();
	}
	
	WDialog.prototype.set_option=function(key,value){
		var dialogel=this.el;
		var loadingel=this.loading_el;
		var options=this.options;
		var style=options.style;
		if(key=='iframeh'){
			if(options.style=='mydistributors'||options.style=='mydistributors2'){
				var winh=$(window).height();
				var curiframeh=value;
				var maxdh=winh-50;
				var iframedh=curiframeh;
				var dialogh=Math.min(maxdh,iframedh);
				dialogel.css({height:dialogh});
				dialogel.find('iframe').css({height:(dialogh)+'px'});
				this.dialog_pos();
			}else{
				var winh=$(window).height();
				var curiframeh=value;
				var maxdh=winh-50-77;
				var iframedh=curiframeh;
				var dialogh=Math.min(maxdh,iframedh);
				dialogel.find('.iframebox2').css({height:dialogh});
				dialogel.css({height:(dialogh+77)+'px'});
				dialogel.find('iframe').css({height:(curiframeh)+'px'});
				this.dialog_pos();
			}
			
		}
	}
	
	WDialog.prototype.set_title=function(load_url){
			var dialogel=this.el;
			var modregexp=/_m=([^&]+)/;
			var actregexp=/_a=([^&]+)/;

			var modarr=modregexp.exec(load_url);
			var actarr=actregexp.exec(load_url);
			var m='';
			var a='';
			if(modarr) m=modarr[1];
			if(actarr) a=actarr[1];
			if(a=='showOrderInterface'){
				dialogel.find('h2.dialog_title').html(this.translate('Confirm your order'));
				dialogel.find('.curpagetxt').hide().filter('.subtitle2')
						.show().find('span').removeClass('cur').filter('.step2').addClass('cur');
				
			}else if(a=='showOrders'){
				dialogel.find('h2.dialog_title').html(this.translate('Confirm your order'));
				dialogel.find('.curpagetxt').hide().filter('.subtitle1')
						.show().find('span').removeClass('cur').filter('.step2').addClass('cur');
			}else if(a=='showItems'){
				dialogel.find('h2.dialog_title').html(this.translate('Shopping Cart'));
				dialogel.find('.curpagetxt').hide().filter('.subtitle1')
						.show().find('span').removeClass('cur').filter('.step1').addClass('cur');
			}
	}
	
	WDialog.prototype.dialog_pos=function(){
		var scrollt=$(window).scrollTop();
		var winh=$(window).height();
		var winw=$(window).width();
		var options=this.options;
		var style=options.style;
		var dialogel=this.el;
		var loadingel=this.loading_el;
		if(!dialogel.length || !dialogel.is(':visible')) return;
		loadingel.css({width:winw,height:winh});
		var dialogw=dialogel.width();
		var dialogh=dialogel.height();

		var leftpos=Math.max((winw-dialogw)/2,5);
		var dialogtoobig=false;
		if(leftpos<38){ 
			leftpos=Math.max((winw-dialogw-38)/2,5);
			dialogtoobig=true;
		}
		var toppos=Math.max(scrollt+(winh-dialogh)/2,scrollt+20);
		dialogel.css({left:leftpos,top:toppos});
		
		var iframeel=dialogel;
		var ifaH=iframeel.height();
		var ifaW=iframeel.width();
		var marleft=ifaW/2;
		if(dialogtoobig) marleft-=19;
		marleft=marleft+"px";
		 var martop= -(ifaH/2-20)+"px";
		 loadingel.find('.closebtn').css({"margin-left":marleft,"margin-top":martop}).show();
	}
})(window);