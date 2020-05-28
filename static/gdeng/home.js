/**
 * @fileoverview home
 * @author wanglin
 * @modify 2016.01.18
 **/
$(function(){
	/**幻灯片**/
	$(".index-banner").gduiSlide({
		customeClass:"slide-wrap-cus",
		speed : 5000,
		auto : true
	});	
//	$(".h-search-catlist li").click(function() {
//		var _self = $(this),
//			curVal = _self.text(),
//			perVal = $(".h-search-tit").text();
//		$(".h-search-tit").text(curVal);
//		$(this).children().text(perVal);
//	});
	/* 展开主导航的侧边导航 */
	if(!$('#nav_home').length){
		$('.nav_title').data('timer', null).bind({
			mouseover: function() {
				var $title = $(this);
				clearTimeout($title.data("timer"));
				$title.siblings('.header_sidenav').slideDown(200, function() {
					$(this).css('overflow', 'visible');
				}).bind({
					mouseover: function() {
						clearTimeout($title.data("timer"));
					},
					mouseout: function() {
						var $this = $(this);
						clearTimeout($title.data("timer"));
						$title.data("timer", setTimeout(function() {
							$this.hide();
						}, 200));
					}
				});
			},
			mouseout: function() {
				var $title = $(this);
				clearTimeout($title.data("timer"));
				$title.data("timer", setTimeout(function() {
					$title.siblings('.header_sidenav').hide();
				}, 200));
			}
		});
	}else{
		$(".header_sidenav").show();
	}
	
	/* 侧导航菜单 */
	(function(){
	var startX = null, startY = null, endX = null, endY = null, able = true, isTimer = false, hoverTimer = null,$lev1wrap = $(".header_sidenav_list"),$lev1list = $lev1wrap.find(".header_sidenav_item"),
		fn = function (obj1, obj2) {
			obj1.addClass('header_sidenav_item_curr').siblings().removeClass('header_sidenav_item_curr');
			var minus = ( obj1.offset().top + obj2.height() ) - ( $(window).height() + $(window).scrollTop() ) + 20;
			if (minus > 0) {
				obj2.animate({'margin-top':- minus},200);
			} else {
				obj2.animate({'margin-top':'0'},200);
			}
			if($.browser.msie){
				setTimeout(function() {
					$('.header_sidenav_close', obj2).css('zoom','1');
				}, 0);
			}
		};
		
		$('.header_sidenav_item').bind({
			'mouseenter': function(e) {
				if(isTimer){ return }
				isTimer = true;
				startX = e.pageX;
				startY = e.pageY;
				var $this = $(this), $subCont = $this.find('.header_sidenav_cnt'), $img = $this.find('img[data-src]');
				if($img.length>0){
					if($img.attr('isload')!='true'){
						$img.attr('src', $img.attr('data-src')).attr('isload','true');
					}
				}
				if ($subCont.length && able) {
					fn($this, $subCont);
					isTimer = false;
				} else {
					hoverTimer = setTimeout(function(){
						fn($this, $subCont);
						isTimer = false;
					},10);
				}
			},
			'mouseleave': function(e) {
				clearTimeout(hoverTimer);
				isTimer = false;
				endX = e.pageX;
				endY = e.pageY;
				if (Math.abs(endX - startX)/Math.abs(endY - startY) < 0.3) {
					able = true;
				} else {
					able = false;
				}
			}
		});
		$('.header_sidenav_close').bind('click', function() {
			$(this).parents('.header_sidenav_item').removeClass('header_sidenav_item_curr');
			if(!$('#header_b').length){
				$('.header_sidenav').hide();
			}
		});
		$lev1list.height($lev1wrap.height()/$lev1list.length);
		$lev1list.find(".header_sidenav_item_info").each(function(){
			var self = $(this),
				selfHeight = self.height(),
				parentHeight = self.parent("li").height();
			self.find(".header_sidenav_item_other").find("a").eq(0).css("padding-left","0px")
			if($lev1list.find(".header_sidenav_item_info").length>7){
				self.css({
					marginTop:(parentHeight-selfHeight)/2+"px"
				});	
			}else{
				self.parent().addClass("header_sidenav_showOth");
				if(self.find(".header_sidenav_item_other").length>0){
					self.css({
						marginTop:(parentHeight-selfHeight-$(".header_sidenav_item_other").height()-5)/2+"px"
					});
				}else{
					self.css({
						marginTop:(parentHeight-selfHeight)/2+"px"
					});	
				}
				
			}
			
		})
		$('.header_sidenav').bind({
			'mouseleave': function() {
				$(this).find('.header_sidenav_item').removeClass('header_sidenav_item_curr');
			}
		});
	})();
	function unique(arr) {
	    var result = [], hash = {};
	    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
	        if (!hash[elem]) {
	            result.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return result;
	}
	(function(){
		var topArr = [],
			topArrun = [],
			winHeight = $(window).height(),
			$fixeParent = $(".i-page-fixed-list");
		if($('#nav_home').length>0){
			$(".i-com-cat-box").each(function(){
			    topArr.push($(this).offset().top-winHeight/2 )
			});		
			topArrun = topArr;
			topArr = unique(topArr);
			//console.log(topArr)
			$(window).bind("scroll", function() {
				// $(".i-page-fixed-list li").each()
				var winTop = $(window).scrollTop()
				if(winTop >= winHeight/2){
					$(".i-page-fixed-list").show();
					$('.page-fixed').animate({top:"30px"}, 100);
				}else{
					$(".i-page-fixed-list").hide();
					$('.page-fixed').animate({top:$(window).height()/2-46+"px"}, 100);
				}
				
				//console.log(winTop);
				$fixeParent.find("li").removeClass("page-fixed-cur");
				for(var i = 0 ,len = topArr.length;i<len;i++){
					if(topArr[i+1]){
						if(winTop > topArr[i] && winTop <= topArr[i+1]){
							$fixeParent.find("li:even").eq(i).addClass("page-fixed-cur").next().addClass("page-fixed-cur");
						}	
					}else{
						if(winTop>topArr[topArr.length-1]){
							$fixeParent.find("li:even").eq(topArr.length-1).addClass("page-fixed-cur").next().addClass("page-fixed-cur");
						}
						else{
							$fixeParent.find("li:even").eq(topArr.length-1).removeClass("page-fixed-cur").next().removeClass("page-fixed-cur");
						}
					}
					
				}
			});
			$(window).trigger("scroll");
			$fixeParent.find("li").click(function(){
				var index = $(this).index();			
				$('body,html').animate({scrollTop:topArrun[index]+10+"px"}, 100 );
				$(window).trigger("scroll");
			})	
		}else{
			$(".i-page-fixed-list").hide()
			$(".page-fixed").css({"top":$(window).height()/2});
		}
		
	})();

	$(".js-showMap").click(function(){
		initStreetView("pano_container",39.916527,116.397128);
		layer.open({
			type: 1,
		    title: "开通商铺", //显示标题
		    content: $('.pano_container'), //捕获的元素
		    cancel: function(index){
		    	layer.close(index);

		    }
		})
	});
	/*if($(".i-scroll-box").length>0){
		$.ajax({
		  	type: "post",
		  	url: "v1.0/js/staticData/dailyUpdate.js",
		  	dataType: "json",
		  	success: function(data){
		  		if(data){
		  			console.log(data);
		  			var seconds = data.mmsecond,
		  				totalProduct = data.totalProduct,
		  				yesterdayAmounts = data.yesterdayAmounts,
		  				todayAmounts = data.todayAmounts,
		  				productList = data.product,
		  				objtime = new Date(),
		  				sprostr = '',
		  				downs = '';

		  			objtime.setTime(seconds);
		  			$(".i-nowtime").html(objtime.getFullYear()+"/"+(objtime.getMonth()+1)+"/"+objtime.getDate());
		  			$(".totalProduct").html(totalProduct);
		  			$(".yesterdayAmounts").html(yesterdayAmounts);
		  			$(".todayAmounts").html(todayAmounts);
		  			for(var i =0, len = productList.length ;i<len;i++){
		  				if(productList[i].downs==0){
		  					downs = '<span class="dows-ico-up"></span>';
		  				}else if(productList[i].downs==1){
		  					downs = '<span class="dows-ico-down"></span>';
		  				}else{
		  					downs = '持平'
		  				}
		  				sprostr += '<li class="clearfix">'+
										'<div class="i-scrn-item i-scrn-item1">'+ productList[i].productName +'</div>'+
										'<div class="i-scrn-item i-scrn-item2">'+ productList[i].highestPrice +'</div>'+
										'<div class="i-scrn-item i-scrn-item3">'+ productList[i].lowestPrice +'</div>'+
										'<div class="i-scrn-item i-scrn-item4">'+ productList[i].averagePrice +'</div>'+
										'<div class="i-scrn-item i-scrn-item5">'+ downs +'</div>'+
								'</li>'
		  				
		  			}
		  			//console.log(sprostr);
		  			$(".i-scroll-list").html(sprostr);

		  		}
		   	}
		});	
	}*/
	(function(){
		var $liitem = $(".i-scroll-box").find("li"),
			$linum = $liitem.length,
			$linheight = $liitem.height(),
			scrollWrap = $(".i-scroll-box").height(); 
		if($linum*$linheight>scrollWrap){
			autoScroll($(".i-scroll-box"),"30");
		}
	})();
	(function(){
		if($(".infoList").height()>$(".tempWrap").height()){
			linkautoScroll($(".infoList"),"24");
		}
	})();
});

function linkautoScroll(obj,scrollHeight){
	var scrollFlag = true,cleatimer;
	var flag = 0
	clearInterval(cleatimer);    
    checkAutoScroll();
    
    $(obj).hover(function(){
    	scrollFlag = false;
    	clearInterval(cleatimer);
    },function(){
    	scrollFlag = true;
    	checkAutoScroll()
    });
    
    function autoPlay(flag){
		$(obj).stop().animate({
            marginTop:"-"+scrollHeight*flag+"px"
	    },500);
	}
	function scrollIndex(){		
		flag++;
		if(flag >= obj.height()/scrollHeight){
			flag=0
		}
		autoPlay(flag)
	}
    function checkAutoScroll(){
		clearInterval(cleatimer);
		if(scrollFlag){
			cleatimer = setInterval(scrollIndex, 2000);
		}	
	}
}
	
function autoScroll(obj,scrollHeight){
	var scrollFlag = true,cleatimer;
	clearInterval(cleatimer);    
    checkAutoScroll();
    
    $(obj).hover(function(){
    	scrollFlag = false;
    	clearInterval(cleatimer);
    },function(){
    	scrollFlag = true;
    	checkAutoScroll()
    });
    
    function autoPlay(){
		$(obj).find("ul:first").stop().animate({
            marginTop:"-"+scrollHeight+"px"
	    },500,function(){
	            $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	    });
	}
    function checkAutoScroll(){
		clearInterval(cleatimer);
		if(scrollFlag){
			cleatimer = setInterval(autoPlay, 2000);
		}	
	}
}
var numflag = 0;
function bindmarkScroll(){
	markTimer = setTimeout(function(){
		$(".bottom-mark").slideUp(); 
	}, 10000);
	$(window).bind("scroll", function() {
		if(numflag==0){
			clearTimeout(markTimer);
			if($('#nav_home').length){
				$(".bottom-mark").slideDown();
			}					
			markTimer = setTimeout(function(){
				$(".bottom-mark").slideUp(); 
			}, 10000);
		}
	});	
};	
/**foot mark**/
$(function(){
	if($(".bottom-mark").length>0){
		var markTimer,
			$markobj = $(".bottom-mark");
		$(".close-f").bind('click',function(){
			numflag++;
			$markobj.slideUp();
			//$.cookie('showQRcodeMark', '0', { expires: 365*2, path: '/' });
			//$.coo
		});
		//$.cookie('showQRcodeMark',null);
		if($('#nav_home').length>0){		
			$markobj.slideDown();
			bindmarkScroll();			
		}
			
		markTimer = setTimeout(function(){
			$markobj.slideUp(); 
		}, 10000);

		$(".rft-qrbtn").hover(function(){
			clearTimeout(markTimer);
			$markobj.slideDown();
		},function(){
			bindmarkScroll();
		});
	}	
});
