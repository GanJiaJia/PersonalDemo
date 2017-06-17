function detectZoom (){ 
    var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase() || '';
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }else if (~ua.indexOf('msie')) {  
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio){
        ratio = Math.round(ratio * 100);
    }
    return ratio;
}

function layer_unslider_init_func(params){
    var layerid = params.layerid;
    var module_height =params.module_height;
	if (layerid.length == 0) return;
    //Set module height start
    if(module_height && parseInt(module_height)){
        $('#'+layerid).css('height',module_height+'px').removeAttr('module_height');
        $('#'+layerid+' .wp-resizable-wrapper').css('height',module_height+'px');
    }//Set module height end
	var $content = $('#'+layerid+'_content');
	var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
	$content.css("border", params.pstyle);
	var fullparent = $content.parents('.fullpagesection').length;
	var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
	if(fullparent) { cnvpos.left = Math.abs($('.fullpagesection').css('left').replace('px','')); }
	cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
	var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
	if(fullparent) { canwidth = $(window).width(); }
	if(cnvpos.left<0) cnvpos.left=0;
	$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});
	$('#'+layerid).css({left: '0',width: $('#canvas').width()});
	$('#'+layerid+' .banner').css("min-height", cntheight+'px'); $('#'+layerid+' .banner').css("height", cntheight+'px');
	$('#'+layerid+' .bannerul').css("height", cntheight+'px');
	$('#'+layerid+' .banner ul li').css("min-height", cntheight+'px').css('width',($('#scroll_container_bg').width() - borderwidth)+'px');$('#'+layerid+' .banner ul li').css("height", cntheight+'px');
	$('#'+layerid+' .banner .inner').css("padding", cntheight/2+'px 0px');
	$('#'+layerid).layer_ready(function(){
		var ctrldown = false;
		$(window).resize(function(){
				if(!ctrldown){
					setTimeout(function(){
						var $content = $('#'+layerid+'_content');
						var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
						var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
						cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
						var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
						if(cnvpos.left<0) cnvpos.left=0;
						$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});
					},0)
				}
		})
		$(window).keydown(function(event){
				if(!event.ctrlKey){
					var $content = $('#'+layerid+'_content');
					var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
					var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
					cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
					var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
					if(cnvpos.left<0) cnvpos.left=0;
					$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});

				}else{
					ctrldown = true;
				}
		})
	})
	$('#'+layerid).layer_ready(function(){
			var transitionstr=params.easing;
			if(params.easing=='all'){
				transitionstr=($.browser.msie) ? "slide,slice,blocks,blinds" : "slide,slice,blocks,blinds,shuffle,threed";
		}
			var $content = $('#'+layerid +' #'+layerid +'_content');
			var cntheight = $content.parent().height();
			cntheight = $('#'+layerid+' .wp-unslider_content').height();
			if(cntheight=='') cntheight=267;
			var  cnpos = $('#'+layerid+' .wp-unslider_content').offset();
			var contentpos = (cntheight)-39;
			var scripts = document.getElementsByTagName("script");
			var jsFolder = "";
			for (var i= 0; i< scripts.length; i++)
			{
					if( scripts[i].src && scripts[i].src.match(/lovelygallery\.js/i))
					jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
			}
			$LAB
			.script(relativeToAbsoluteURL('plugin/unslider/js/html5zoo.js')).wait(function(){
					var win_width = $('#scroll_container_bg').width();
				jQuery("#"+layerid+"html5zoo-1").html5zoo({
					jsfolder:jsFolder,
					width:win_width,height:cntheight,
					skinsfoldername:"",loadimageondemand:false,isresponsive:false,
					addmargin:true,randomplay:false,
					slideinterval:params.interval,     // 控制时间
					loop:0,
					autoplay:params.autoplays=='false'?false:true,
					skin:"Frontpage",
					navbuttonradius:0,
					navmarginy:contentpos,showshadow:false,
					navcolor:"#999999",
					texteffect:"fade",
					navspacing:12,
					arrowtop:50,
					textstyle:"static",
					navpreviewborder:4,
					navopacity:0.8,
					shadowcolor:"#aaaaaa",
					navborder:4,
					navradius:0,
					navmarginx:16,
					navstyle:"bullets",
					timercolor:"#ffffff",
					navfontsize:12,
					navhighlightcolor:"#333333",
					navheight:12,navwidth:12,
					navshowfeaturedarrow:false,
					titlecss:"display:block;position:relative;font:"+params.title_size+"px "+params.title_family+"; color:"+params.title_color+";",//font style
					arrowhideonmouseleave:win_width,
					texteffectduration:win_width,
					border:0,
					timerposition:"bottom",
					navfontcolor:"#333333",
					borderradius:0,
					textcss:"display:block; padding:12px; text-align:left;",
					navbordercolor:"#ffffff",
					textpositiondynamic:"bottomleft",
					ribbonmarginy:0,
					ribbonmarginx:0,
					unsliderheight:cntheight,
					unsliderlid:layerid,
					slide: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true
					},
					crossfade: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true
					},
					threedhorizontal: {
							checked:true,
							bgcolor:"#222222",
							perspective:win_width,
							slicecount:1,
							duration:1500,
							easing:"easeOutCubic",
							fallback:"slice",
							scatter:5,
							perspectiveorigin:"bottom"
					},
					slice: {
							duration:1500,
							easing:"easeOutCubic",
							checked:true,
							effects:"up,down,updown",
							slicecount:10
					},
					fade: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true
					},
					blocks: {
							columncount:5,
							checked:true,
							rowcount:5,
							effects:"topleft,bottomright,top,bottom,random",
							duration:1500,
							easing:"easeOutCubic"
					},
					blinds: {
							duration:2000,
							easing:"easeOutCubic",
							checked:true,
							slicecount:3
					},
					shuffle: {
							duration:1500,
							easing:"easeOutCubic",
							columncount:5,
							checked:true,
							rowcount:5
					},
					threed: {
							checked:true,
							bgcolor:"#222222",
							perspective:win_width,
							slicecount:5,
							duration:1500,
							easing:"easeOutCubic",
							fallback:"slice",
							scatter:5,
							perspectiveorigin:"right"
					},
				 transition: transitionstr	
			});
			//html5zoo-text position
			var fontheight = $('#'+layerid+' .unslidertxtf').height();
			if(params.show_title=='1'){	
					if($('#'+layerid+' .html5zoo-text-bg-1').css('display')=='none'){
						var fv = parseInt($('#'+layerid+' .html5zoo-title-1').css('font-size'));
						var sv = parseInt($('#'+layerid+' .html5zoo-text-1').css('padding-top'));
						fontheight = fv+sv*2;
					}
			}
			$('#'+layerid+' .unslidertxtf').css({'top':(cntheight-fontheight)});
			if(params.show_nav=='0'){				
				$('#'+layerid+' .dotsnew-nav').css({'display':'none'});
			}
		});    
	});
	
}