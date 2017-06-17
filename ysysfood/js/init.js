function layer_sitesearch_init_func(param){
	var wp_productsearchcache=param.wp_productsearchcache;
	var langs=param.langs;
	var layerid=param.layer_id;
	$('#'+layerid).layer_ready(function(){
					var vskin =param.skin,$curlayer = $('#'+layerid);
					if(vskin=='skin4' || vskin=='skin5' || vskin=='skin6' || vskin=='skin7' || vskin=='skin8'){
							$curlayer.find('.searchtype').css({'display':'none'});
					}else $curlayer.find('.searchtype').css({'display':'block'});
					if(vskin=='skin4' || vskin=='skin5'){
					//adapt extend skin width 2014.4.27
							$curlayer.bind("fixedsearchwidth",function(e,width){
									var $target = $(this),$targetwidth = $target.find('.searchbox');
									//if(width != undefined) $targetwidth.css("width", width+'px');
									var this_btn_width =  $target.find('.searchbox_btn').outerWidth(true);
									var this_txt_width =  $target.find('.searchbox_txt').outerWidth(true);
									$targetwidth.css({'width':this_btn_width+this_txt_width});
							}).triggerHandler("fixedsearchwidth");
					//<<<end
					}
		var dom=$('#'+layerid);
		var domhtml=dom.find('.wp-sitesearch_container').html();
		//此处将页而ID存到本地解决在新的链接窗口中获取不到值的问题
		var article_page = param.article_page;
		var product_page =param.product_page;
		dom.data('article_page',article_page);
		dom.data('product_page',product_page);
		dom.data('openArticleUrl',param.openArticleUrl);
		dom.data('openProductUrl',param.openProductUrl);
		dom.data('search_listNum',param.search_listNum);
		dom.data('extend_content',param.extend_content);//add extend skin content
		if(domhtml.length>0){
			dom.find('.sright').click(function(){
				//explain:此处不知道为什么从dom对象中获取不到输入框的值，先改为$全局对象,author:fpf,date:2015-01-27,action:modify;
				//修改bug(1694)
				//var keywords=$.trim(dom.find('input[name="keywords"]').val());
				if(vskin=='skin8'){
					var keywords=$.trim($(this).parent().parent().parent().find('input[name="keywords"]').val());
				} else{
					var keywords=$.trim($(this).parent().find('input[name="keywords"]').val());
				}
				if(keywords.length == 0) {dom.find('input[name="keywords"]').focus();return false;}
													if(vskin=='skin8'){
															var lowprice=$.trim(dom.find('input[name="lowprice"]').val().replace(/[^0-9]/ig,""));
															if(lowprice.length == 0) {dom.find('input[name="lowprice"]').focus();return false;}
															var highprice=$.trim(dom.find('input[name="highprice"]').val().replace(/[^0-9]/ig,""));
															if(highprice.length == 0) {dom.find('input[name="highprice"]').focus();return false;}
													}
				var selid=new Array();
				var i=0;
				dom.find(".catetype").each(function(){
					if($(this).prop("checked")){ selid[i]=$(this).val(); i++;}

				});		

				var str='';
				if(selid.length>0){
					str=selid.join(',');
				}

				if(str.length==0){ str='title'; }
				var infotype=0;
				var sourcecotent=parent.$('#'+layerid).find('input[name=searchcontent]').val();
				if(sourcecotent !='article' &&sourcecotent !='product'){
					if(dom.find('.type_title').html()!=langs['Search Pro']){
						infotype=1;
					}
									if(vskin=='skin4' || vskin=='skin5' || vskin=='skin6' ||  vskin=='skin8'){
											infotype=0;
									}
				}else if(sourcecotent=='article'){
					infotype=1;
				}else if(sourcecotent=='product'){
					infotype=0;
				}

				dom.attr('infotype',infotype);
				$('body').data('wp_searchcache1','1');
				var open = $.trim(dom.find('.wp-sitesearch_container').attr('opn'));
													if(vskin=='skin8'){ //add high low price
															var url=parseToURL('sitesearch','search',{search_listNum:dom.data('search_listNum'),openProductUrl:dom.data('openProductUrl'),openArticleUrl:dom.data('openArticleUrl'),article_page:article_page,product_page:product_page,keywords:keywords,lowprice:lowprice,highprice:highprice,type:str,infotype:infotype,layerid:layerid});
													}else{
															var url=parseToURL('sitesearch','search',{search_listNum:dom.data('search_listNum'),openProductUrl:dom.data('openProductUrl'),openArticleUrl:dom.data('openArticleUrl'),article_page:article_page,product_page:product_page,keywords:keywords,type:str,infotype:infotype,layerid:layerid});
													}
													if(open=='1'){
					window.open(url,'_blank');
				}else{
					$LAB
					.script(relativeToAbsoluteURL("plugin/sitesearch/js/sitesearch_browser.js"))
					.wait(function(){
						wp_sitesearch(url,{
							title:langs['Search Result'],
							width: 791,
							top:60
						});
					})
				}
			});	

			dom.find('input[name="keywords"]').keydown(function(event){
				if(event.keyCode==13){  
						dom.find('.sright').trigger('click');
				}
			});

			dom.find('.type_select span').click(function(){
				dom.find('.type_title').html($(this).html());
				dom.find('.type_select').hide();
				if($(this).html() ==langs['Search Pro']){			
					dom.find('.s_title').html(langs['Name']);
					dom.find('.s_description').html(langs['Description']);
					$(this).html(langs['Search Art']);
					$('body').data('wp_searchcache',wp_productsearchcache);
					dom.find("input[name='keywords']").autocomplete("option","source",wp_productsearchcache);
				}else{
					dom.find('.s_title').html(langs['Search Title']);
					dom.find('.s_description').html(langs['Search Summary']);
					$(this).html(langs['Search Pro']);
					if(window.wp_articlesearchcache == undefined)
					{
						$.ajax({
							url:parseToURL("sitesearch","article_titlesearch"),
							async:false,
							success:function(data){
								window.wp_articlesearchcache = eval(data);
								$('body').data('wp_searchcache',window.wp_articlesearchcache);
								dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
							}
						});
					}
					else
					{
						dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
					}
				}

			});

			dom.find('.nsearch').hover(function(){
				dom.find('.type_select').show();
				dom.find('input[name="keywords"]').autocomplete("close");
			},function(){
				dom.find('.type_select').hide();
			}); 
			var width_xz=0;
			if($.browser.msie && $.browser.version>=9){ width_xz=4;}
			var additionwidth=0;
			var funci=0;
			var func=function(){
				if(dom.width()>dom.find('.sleft').outerWidth(true)||funci>=3){
					if(dom.find('.sright2').length) additionwidth+=dom.find('.sright2').outerWidth(true);
					dom.find('.ninput').css({'width':(dom.width()-dom.find('.sleft').outerWidth(true)-dom.find('.sright').outerWidth(true)-additionwidth-dom.find('.nsearch').outerWidth(true)-width_xz)-4+'px'});
					dom.find('.ninput input').width(dom.find('.ninput').width());
				}else{
					funci+=1;
					setTimeout(func,300);
				}
			}
			func();
			
		}
		if(!param.editmode){
					var autocomplete_width,autocomplete_date;
					if(vskin=='default' || vskin=='skin1' || vskin=='skin2' || vskin=='skin3'){
							autocomplete_width = dom.find("input[name='keywords']").parent().outerWidth()+dom.find('.searchbox').children('.sleft').outerWidth()+dom.find('.nsearch').outerWidth()
					}else{autocomplete_width = dom.find('.searchbox_txt').parent().outerWidth() }
					var wp_searchdefalut =param.sshdefalutshow;
					if(wp_searchdefalut==1){
						if(window.wp_articlesearchcache == undefined)
						{
										$.ajax({
														url:parseToURL("sitesearch","article_titlesearch"),
														async:false,
														success:function(data){
																		window.wp_articlesearchcache = eval(data);
																		$('body').data('wp_searchcache_default',window.wp_articlesearchcache);
																		dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
														}
										});
						}
						else{
										dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
						}
						autocomplete_date = $('body').data('wp_searchcache_default');
					}else{ autocomplete_date = $('body').data('wp_searchcache'); }
					dom.data('wp_searchcache',autocomplete_date);
					// 数据量超过一千会有明显卡顿，此处现取前一千来比对	by lsf 2015/01/15
			dom.find("input[name='keywords']").autocomplete({
				source:autocomplete_date.slice(0,1000),
				appendTo:dom,
				width:autocomplete_width,
				open:function(event,ui){
					$('.ui-autocomplete').css('left','0px');
				},
				select:function(event,ui){
					dom.find('.searchtype').prop('checked','false');
					dom.find("input[value='title']").prop('checked',true);
				}
			});
		}
		dom.data('interface_locale',getSiteCurLang());
		//explain:修复bug(1601)搜索插件的输入框在浏览器器缩放时因其宽度问题导致后面的搜索按钮不在同一行显示，现在手动减去5px以解决该问题,author:fpf,date:2015-01-20,action:modify;
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
		};
		var devicePixelRatios = detectZoom();
		var ischrome = navigator.userAgent.toLowerCase() || '';
		if(devicePixelRatios != 100 && ischrome.match(/chrome/)){
			var $search = dom.find('input.searchbox_txt');
			var search_width = parseFloat($search.width()).toFixed(2);
			if(search_width && search_width > 5){$search.width(search_width - 5);}
		}
	});
	
}

