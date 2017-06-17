function layer_tb_product_list_init_func(param){
	var layerid=param.layer_id;
	var productStyle=param.productStyle;
	window['set_thumb_'+layerid]=function(obj){
		var callback=function(img){
				img.fadeIn('slow',function(){
				img.closest('.img,.wp-new-product-style-01-left').children('.imgloading').remove();
			   });
		}
		$(obj).each(function() {
			var img=$(this);
			callback(img);
		});      
	}
	
	$(function(){
		setTimeout(function(){
			if(productStyle=== "03"||productStyle=== "04"){
				$(".tb_product_list-"+layerid+" li").each(function(){
					var tmph = parseInt($('.productsmallfloating img').eq(0).height());
					var mrt = $(this).find('.productlistid').height()-10-tmph;
					var mrtw = ($(this).find('.productlistid').width()-$(this).find('.productsmallfloating').width())/2;
					$(this).find('.productsmallfloating').css({'marginTop':mrt+'px','marginLeft':mrtw+'px'})

				})
			}


		},300)

	})
	
	if (productStyle === "01"||productStyle === "03") {
		$("#"+layerid).bind("fixedmarginright", function(e, margin){
			var $target = $(this),$li = $target.find('.tb_product_list-'+layerid+' > ul > li');
											if(margin != undefined) {$li.css("margin-right", margin+'px');}
											else {/*动态获取margin-right*/$li.css("margin-right", $li.filter(':first').css("margin-right"));}

			// var $first = $li.filter(':first'),liwidth = $first.width()+30+6,//30、6 li的padding和border
			// 2014/04/23 leiminglin 修改为动态获取li的padding 和 border
			
			var $first = $li.filter(':first');
			var paddingLeft = $first.css("padding-left")||'0';
			var paddingRight = $first.css("padding-right")||'0';
			var liwidth = $first.width() + 
			parseInt( paddingLeft.match(/\d+/) ) + parseInt( paddingRight.match(/\d+/) ) + 
			parseInt( $first.css("border-left-width") ) * 2, //30、6 li的padding和border

			mgnright = $._parseFloat($first.css("marginRight")),
			maxwidth = $target.children('.wp-tb_product_list_content').width(),
			maxcols = Math.floor(maxwidth / (liwidth + mgnright));

			if(maxwidth >= maxcols * (liwidth + mgnright) + liwidth) maxcols += 1;
			for(var i = 1,licnt = $li.length; i <= licnt; i++){
				if (i % maxcols != 0) continue;
				if ((maxcols == 1) && (2*liwidth <= maxwidth)) continue;
				$li.filter(':eq('+(i - 1)+')').css("margin-right", '0');
			}
			if(!$("#"+layerid).find('.wp-pager_link:visible').length){
				var firstcol=($li.length % maxcols != 0)?(parseInt($li.length/maxcols)*maxcols+1):(($li.length/maxcols-1)*maxcols+1);
				for(var i = 1,licnt = $li.length; i <= licnt; i++){
					if(i>=firstcol) $li.filter(':eq('+(i - 1)+')').css("margin-bottom", '2px');
				}
			}
			layer_img_lzld(layerid);
		})

		$(window).load(function(){
			var maxliheight = 0,tmplayerid = "#"+layerid;
			if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
			maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
			if (maxliheight) $tmpnode.height(maxliheight);
			// 右间距 2014/03/17
			$(tmplayerid).triggerHandler("fixedmarginright");
			// <<End                
		});
		$('#'+layerid).layer_ready(function(){
			$('#'+layerid).triggerHandler("fixedmarginright");
		})
	}
}

function layer_tb_product_list_checkid_func(params){
	$(function(){
		var layer_id = "#"+params.layer_id;
		$(layer_id+' .productlistid').click(function(event){
			event.preventDefault();
			var gourl = $(this).attr('href');
			var targettype = $(this).attr('target');
			_this = $(this);
			//判断是否是会员文章 
			$.ajax({
				type: "POST",
				url: parseToURL('tb_product_list','checkproductid'),
	             data: {id:_this.attr('productlistid')},
	             dataType: "json",
	             async:false,
	             success: function(r){
	            	 if(r.code == -1){
		 					var islogin = params.islogin;
		 					ismember = true;  //是会员商品y
		 					if(islogin == 0){
		 						event.preventDefault();
		 						$LAB
		 						.script(relativeToAbsoluteURL("script/datepicker/custom_dialog.js"))
		 						 .wait(function(){
		 							show_custom_panel(parseToURL('userlogin','login_dialog'),{
		 								title:'Login',
		 								overlay:true,
		 								id:'wp_user_info'
		 							});
		 						});
		 						return false;
		 					}
		 				}else if(r.code == -2){
		 					ismember = false; //不是会员商品
		 								
		 				}
		 				if(targettype == undefined && gourl != 'javascript:void(0);'){
		 				location.href=gourl;
		 				}else if(targettype != undefined && gourl != 'javascript:void(0);'){
		 					window.open(gourl);
		 				}	
		 				
		 

                  }

				})
		})

	})
}

function layer_tb_product_list_pager_func(param){
	$('#'+param.layer_id).layer_ready(function(){
		var pageskips =param.pageskip;
		var layerid =param.layer_id ,$cstlayer = $('#'+layerid),
		$pglnker = $cstlayer.find('.wp-tb_product_list_content .wp-pager_link');
		$pglnker.find('a').click(function(e,page){
			var pageid = page||$(this).attr("href").replace("###",'');
			if(param.editmode == "1") $.method.tb_product_list.refreshProductList({"page":pageid,"layerid":layerid,"orderby":param.orderby,"ordertype":param.sortby});	
			else {

				var dom = $cstlayer.find('.tb_product_list_save_itemList'),
				params = {};
			
				var liststyle={"prdliststyle":param.prdliststyle}
				var search_txt = $.trim($("#"+layerid).find('.search-input').val());
				var startprice = $.trim($(".price-input").eq(0).val());              	//取搜索开始价格值
				var endprice = $.trim($(".price-input").eq(1).val());					//取搜索结束价格值
				var product_category = $("#"+layerid).find("input[name='get_product_category']").val(); //分类产品分页丢失
				$.ajax({
					type: "GET",
					url: parseToURL("tb_product_list","get_page"),
					data: {product_category:param.product_category,layer_id: layerid,page: pageid,search_txt:search_txt,start_price:startprice,end_price:endprice,"orderby":param.orderby,"ordertype":param.sortby,"filter_arr":param.filter_arr},
					success: function(data){
								var $layer = $("#"+layerid);
								var oldHeight = $layer.find('.tb_product_list-'+layerid).height();
								$layer.children('.wp-tb_product_list_content').before(data).remove();
								var maxliheight = 0,tmplayerid = "#"+layerid;
								if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
								maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
								if (maxliheight) $tmpnode.height(maxliheight);
								// 右间距 2014/03/17
								$(tmplayerid).triggerHandler("fixedmarginright");
								// <<End                
								tmplayerid = $tmpnode = null;
								$layer.triggerHandler("fixedmarginright");
								wp_heightAdapt($layer);
								//explain:产品列表模块刷新后将页面定位到该模块距离浏览器顶部的距离,author:fpf,date:2014-12-18,action:modify;
								//1/定位到网站页首2/定位到产品列表页首
								if(pageskips == 1){
									$('#scroll_container').scrollTop(0);
								} else if(pageskips == 2){
									var product_listtop = $cstlayer.css('top').replace('px','');
									var father = $cstlayer.attr('fatherid')||'';
									if(father){
										var father_top = $('#'+father).css('top').replace('px','');
										product_listtop = parseInt(product_listtop)+parseInt(father_top);
									}
									if(product_listtop){$('#scroll_container').scrollTop(product_listtop);}
								}
					}
				});
			}
			return false;
		});
		if(param.editmode != "1"){
			if($.cookie('wp_layer_page_'+layerid) && $.cookie('wp_layer_page_'+layerid) != param.curpage){
					 $pglnker.find('a:first').trigger('click',$.cookie('wp_layer_page_'+layerid));
			 }
		}
		// About input
		$pglnker.find(':input').each(function(i,dom){
			var $input = $(this),ent = pgid = '',fnc;
			switch($input.attr("type")) {
				case "text":
					ent = 'keyup';
					fnc = function(){
						pgid = this.value = this.value.replace(/(?:\b0|[^\d+])/i,'');
						return false;
					};
					break;
				case "button":
					ent = 'click';
					fnc = function(){
						if (pgid.length && /^[1-9]{1}\d*$/.test(pgid)) {
							var maxpg = _int($pglnker.find('span.total').html());
							if(!maxpg) maxpg = 1;
							$pglnker.find('a').triggerHandler('click',[Math.min(pgid,maxpg)]);
						}
						function _int(numString){
							var number = parseInt(numString);
							if(isNaN(number)) return 0;
							return number;
						}
						return false;
					};
					break;
			}
			if(fnc && $.isFunction(fnc)) $input[ent](fnc);
		});
	});
}

function layer_tb_product_list_refreshOrder_func(param){
	var layerid=param.layer_id;
	window['refreshOrderby_'+layerid]=function(obj) {
		var start_price = $.trim($('#'+layerid+' .price-input').eq(0).val());
		var end_price = $.trim($('#'+layerid+' .price-input').eq(1).val());
		var search_txt = $.trim($('#'+layerid).find('.search-input').val());
		var search_name= $.trim($('#'+layerid).find('input[name="cityname"]').val());

		var tmp_obj = {layer_id:layerid,search_name:search_name,location:$.trim($("#"+layerid).find("input[name='location']").val()),start_price:start_price,end_price:end_price,search_txt:search_txt,product_category:$.trim($("#"+layerid).find("input[name='get_product_category']").val() ||param.product_category)}
					//筛选属性
					var attr_loop_str=[];
					$('#'+layerid+' .wp_filter_attr .sorting').each(function(e){
							var attr_loop  = '';
							attr_loop = $(this).find(':input').val();
							if(attr_loop) attr_loop_str.push(attr_loop);
					});
					attr_loop_str=attr_loop_str.join('$$$')
					$("#"+layerid).find("input[name='filter_arr']").val(attr_loop_str);
					var filter_obj = {filter_arr:$.trim($("#"+layerid).find("input[name='filter_arr']").val())};
		$.extend(tmp_obj,obj,filter_obj);
		$.ajax({
			type:'POST',
			url:parseToURL('tb_product_list','orderby'),
			data:tmp_obj,
			success:function(data){
				$("#"+layerid).html(data);
				$("#"+layerid).triggerHandler("fixedmarginright");
				if (param.productStyle=== "01") {
					var maxliheight = 0,tmplayerid = "#"+layerid;
					var thisdom = $("#"+layerid).find(".img_lazy_load");
					thisdom.each(function(){
						$(this).fadeOut().fadeIn(100);
						$(this).attr("src",$(this).attr("data-original"));
					});
					setTimeout(function(){
					if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
					maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
					if (maxliheight) {$tmpnode.height(maxliheight); }
					},200);
				}
			}
		});
		}
}