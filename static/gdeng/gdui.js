/**com slides**/
;(function($){
	$.fn.gduiSlide = function(options){

		var defaults = {
            speed:5000,//播放速度
            auto : true,//是否自动播放
            eventType:"click",//事件触发
            customeClass:"",//自定义类名
            direction : false//是否显示左右箭头
		}
		
		var options = $.extend(defaults, options);

		return this.each(function(){
			var clean,
			$ele = $(this),
			picNum = $ele.find(".ty_pic").length,
			$focuBarTemp = $("<div class='focuBar mgauto'><ul class='focu-bar-list'></ul></div>"),
			barListTemp= "<li><a href='javascript:;'><span>&#9679;</span></a></li>",
            $direction = $('<ul class="direction-nav"><li><a class="direction-nav-prev" href="javascript:;"></a></li><li><a class="direction-nav-next" href="javascript:;"></a></li></ul>'),
			flag = 0;
			
            
			if(picNum <= 1){
            	clearInterval(clean);
            }else{
					for(var i=0; i<picNum; i++){
						$focuBarTemp.children().append(barListTemp);
					}
            	$ele.append($direction);
// 	            	$focuBarTemp.children().empty().append(barListTemp)
            	//checkAutoPlay();
                if(typeof(options.direction)&&options.direction){
                    $direction.show();
                }else{
                    $direction.hide();
                }
            }
			if($ele.find(".focuBar").length<=0){
				$ele.append($focuBarTemp).addClass(typeof(options.customeClass)?options.customeClass:'');
			}
			
			if($ele.find(".barCurrent").length<=0){
				$ele.find(".ty_pic").eq(0).show().siblings().hide();
				$ele.find(".focuBar").find("li").eq(0).addClass("barCurrent");
			}				
			
			$focuBarTemp.find("li").on(typeof(options.eventType)?options.eventType:defaults.eventType, function(){
				clearInterval(clean);
	            // clean = setInterval(autoPlay, options.speed);
				var $this = $(this)
				var index = $this.index();
				picShow(index);
				
				checkAutoPlay();
			});
            $direction.find("a").on("click",function(){
            	clearInterval(clean);
                var $self = $(this),
                    clickClass = $self.attr("class"),
                    moveType = clickClass.slice(-4),
                    $baritem = $focuBarTemp.find("li"),
                    curIndex = $focuBarTemp.find("li.barCurrent").index(),
                    nextIndex=0;
                switch(moveType){
                    case "prev":
                        if(curIndex == 0){
                            nextIndex = $baritem.length - 1
                        }else{
                            nextIndex = curIndex-1
                        }                        
                    break;
                    case "next":
                        if(curIndex == $baritem.length - 1){
                            nextIndex = 0
                        }else{
                            nextIndex = curIndex+1
                        }
                    break;
                }
                $baritem.eq(nextIndex).trigger("click");
                checkAutoPlay();
            });
			$ele.children(".ty_tabInfo").find("li").hover(function(){
				clearInterval(clean);
			},function(){
				checkAutoPlay();
			});
			checkAutoPlay();
			function checkAutoPlay(){
				//clearInterval(clean);
				if(options.auto){
					if(picNum <= 1){
						clearInterval(clean);
					}else{
						
                        // if(curIndex == $baritem.length - 1){
                        //     nextIndex = 0
                        // }else{
                        //     nextIndex = curIndex+1
                        // }
						clearInterval(clean);
						clean = setInterval(autoPlay, options.speed);
					}						
				}	
			}
			
			function picShow(obj){			
				$ele.find(".focuBar").find("li").removeClass("barCurrent").eq(obj).addClass("barCurrent");
				$ele.children(".ty_tabInfo").children("ul").find(".ty_pic").stop().eq(obj).css({"z-index":"1"}).fadeIn(500).siblings().css({"z-index":"0"}).fadeOut(500);
			}
			function autoPlay(){
				flag =$(".focuBar").find("li.barCurrent").index();                
				flag++;
				if(flag > picNum-1){
					flag=0
				}
				picShow(flag)
			}

		});
	}
})(jQuery);


/**com page**/
;!function(){
"use strict";

function gduiPage(options){
    var skin = 'gduiPagecss';
    gduiPage.dir = 'dir' in gduiPage ? gduiPage.dir : Page.getpath + '/skin/gduiPage.css';
    new Page(options);
    if(gduiPage.dir && !doc[id](skin)){
        Page.use(gduiPage.dir, skin);
    }
}

gduiPage.v = '1.2';

var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
var index = 0, Page = function(options){
    var that = this;
    var conf = that.config = options || {};
    conf.item = index++;
    that.render(true);
};

Page.on = function(elem, even, fn){
    elem.attachEvent ? elem.attachEvent('on'+ even, function(){
        fn.call(elem, window.even); //for ie, this指向为当前dom元素
    }) : elem.addEventListener(even, fn, false);
    return Page;
};

Page.getpath = (function(){
    var js = document.scripts, jsPath = js[js.length - 1].src;
    return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
}())

Page.use = function(lib, id){
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = gduiPage.dir;
    id && (link.id = id);
    doc[tag]('head')[0].appendChild(link);
    link = null;
};

//判断传入的容器类型
Page.prototype.type = function(){
    var conf = this.config;
    if(typeof conf.cont === 'object'){
        return conf.cont.length === undefined ? 2 : 3;
    }
};

//分页视图
Page.prototype.view = function(){
    var that = this, conf = that.config, view = [], dict = {};
    conf.pages = conf.pages|0;
    conf.curr = (conf.curr|0) || 1;
    conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
    conf.first = 'first' in conf ? conf.first : 1;
    conf.last = 'last' in conf ? conf.last : conf.pages;
    conf.prev = 'prev' in conf ? conf.prev : '\u4e0a\u4e00\u9875';
    conf.next = 'next' in conf ? conf.next : '\u4e0b\u4e00\u9875';
    
    if(conf.groups > conf.pages){
        conf.groups = conf.pages;
    }
    
    //计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
    
    //当前页非首页，则输出上一页
    if(conf.curr > 1 && conf.prev){
        // if(conf.staticPage && conf.staticPath){

        // }else{}
        view.push('<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath.replace(/-\d\./g,('-'+(conf.curr - 1)+'.')):'javascript:;')+'" class="gduiPage_prev" data-page="'+ (conf.curr - 1) +'">'+ conf.prev +'</a>');
        //view.push('<a href="javascript:;" class="gduiPage_prev" data-page="'+ (conf.curr - 1) +'">'+ conf.prev +'</a>');
    }
    
    //当前组非首组，则输出首页
    if(dict.index > 1 && conf.first && conf.groups !== 0){
        //view.push('<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath+(conf.first):'javascript:;')+'" class="gduiPage_first" data-page="1"  title="\u9996\u9875">'+ conf.first +'</a><span>\u2026</span>');
        view.push('<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath.replace(/-\d\./g,('-'+conf.first+'.')):'javascript:;')+'" class="gduiPage_first" data-page="1"  title="\u9996\u9875">'+ conf.first +'</a><span>\u2026</span>');
    }
    
    //输出当前页组
    dict.poor = Math.floor((conf.groups-1)/2);
    dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
    dict.end = dict.index > 1 ? (function(){
        var max = conf.curr + (conf.groups - dict.poor - 1);
        return max > conf.pages ? conf.pages : max;
    }()) : conf.groups;
    if(dict.end - dict.start < conf.groups - 1){ //最后一组状态
        dict.start = dict.end - conf.groups + 1;
    }
    for(; dict.start <= dict.end; dict.start++){
        if(dict.start === conf.curr){
            view.push('<span class="gduiPage_curr" '+ (/^#/.test(conf.skin) ? 'style="background-color:'+ conf.skin +'"' : '') +'>'+ dict.start +'</span>');
        } else {
            //view.push('<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath+(dict.start):'javascript:;')+'" data-page="'+ dict.start +'">'+ dict.start +'</a>');
            view.push('<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath.replace(/-\d\./g,('-'+dict.start+'.')):'javascript:;')+'" data-page="'+ dict.start +'">'+ dict.start +'</a>');

        }
    }
    
    //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
    if(conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0){
        //view.push('<span>\u2026</span><a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath+(conf.pages):'javascript:;')+'" class="gduiPage_last" title="\u5c3e\u9875"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
        view.push('<span>\u2026</span><a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath.replace(/-\d\./g,('-'+conf.pages+'.')):'javascript:;')+'" class="gduiPage_last" title="\u5c3e\u9875"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
    }
    
    //当前页不为尾页时，输出下一页
    dict.flow = !conf.prev && conf.groups === 0;
    if(conf.curr !== conf.pages && conf.next || dict.flow){
        view.push((function(){
            return (dict.flow && conf.curr === conf.pages) 
            ? '<span class="page_nomore" title="\u5df2\u6ca1\u6709\u66f4\u591a">'+ conf.next +'</span>'
            //: '<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath+(conf.curr + 1):'javascript:;')+'" class="gduiPage_next" data-page="'+ (conf.curr + 1) +'">'+ conf.next +'</a>';
            : '<a href="'+(that.config.staticPage && that.config.staticPath?that.config.staticPath.replace(/-\d\./g,('-'+(conf.curr + 1)+'.')):'javascript:;')+'" class="gduiPage_next" data-page="'+ (conf.curr + 1) +'">'+ conf.next +'</a>';
        }()));
    }
    
    return '<div name="gduiPage'+ gduiPage.v +'" class="gduiPage_main gduiPageskin_'+ (conf.skin ? (function(skin){
        return /^#/.test(skin) ? 'molv' : skin;
    }(conf.skin)) : 'default') +'" id="gduiPage_'+ that.config.item +'">'+ view.join('') + function(){
        return conf.skip 
        ? '<span class="gduiPage_total"><label>\u5230\u7b2c</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="gduiPage_skip"><label>\u9875</label>'
        + '<button type="button" class="gduiPage_btn">\u786e\u5b9a</button></span>' 
        : '';
    }() +'</div>';
};

//跳页
Page.prototype.jump = function(elem){
    var that = this, conf = that.config, childs = elem.children;
    var btn = elem[tag]('button')[0];
    var input = elem[tag]('input')[0];
    for(var i = 0, len = childs.length; i < len; i++){
        if(childs[i].nodeName.toLowerCase() === 'a'){
            Page.on(childs[i], 'click', function(){
                var curr = this.getAttribute('data-page')|0;
                conf.curr = curr;
                that.render();
                
            });
        }
    }
    if(btn){
        Page.on(btn, 'click', function(){
            var curr = input.value.replace(/\s|\D/g, '')|0;
            if(curr && curr <= conf.pages){
                conf.curr = curr;
                that.render();
            }else if(curr > conf.pages){
            	layer.msg("输入的页数不能大于总页数")
            }
        });
        document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];  
            var input = elem[tag]('input')[0];
            var curr = input.value.replace(/\s|\D/g, '')|0;          
            if(e && e.keyCode==13){ // enter 键
                if(curr && curr <= conf.pages){
                    conf.curr = curr;
                    that.render();
                }else if(curr > conf.pages){
                	layer.msg("输入的页数不能大于总页数")
                }
            }
        };
    }
};

//渲染分页
Page.prototype.render = function(load){
    var that = this, conf = that.config, type = that.type();
    var view = that.view();
    if(type === 2){
        conf.cont.innerHTML = view;
    } else if(type === 3){
        conf.cont.html(view);
    } else {
        doc[id](conf.cont).innerHTML = view;
    }
    conf.jump && conf.jump(conf, load);
    that.jump(doc[id]('gduiPage_' + conf.item));
    if(conf.hash && !load){
        location.hash = '!'+ conf.hash +'='+ conf.curr;
    }
};

//for 页面模块加载、Node.js运用、页面普通应用
"function" === typeof define ? define(function() {
    return gduiPage;
}) : "undefined" != typeof exports ? module.exports = gduiPage : window.gduiPage = gduiPage;

}();


/*
Ajax 三级省市联动

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
------------------------------ */
(function($){
	$.fn.gduiCitySelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		settings=$.extend({
			url:"city.min.js",
			prov:null,
			city:null,
			dist:null,
			nodata:null,
			required:true
		},settings);

		var box_obj=this;
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var dist_obj=box_obj.find(".dist");
		var prov_val=settings.prov;
		var city_val=settings.city;
		var dist_val=settings.dist;
		var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
		var city_json;

		// 赋值市级函数
		var cityStart=function(){
			var prov_id=prov_obj.get(0).selectedIndex;
			if(!settings.required){
				prov_id--;
			};
			city_obj.empty().attr("disabled",true);
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||typeof(city_json.citylist[prov_id].c)=="undefined"){
				if(settings.nodata=="none"){
					city_obj.css("display","none");
					dist_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					city_obj.css("visibility","hidden");
					dist_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml;
			$.each(city_json.citylist[prov_id].c,function(i,city){
				temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";
			});
			city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			//city_obj.selectric();
			distStart();
		};

		// 赋值地区（县）函数
		var distStart=function(){
			var prov_id=prov_obj.get(0).selectedIndex;
			var city_id=city_obj.get(0).selectedIndex;
			if(!settings.required){
				prov_id--;
				city_id--;
			};
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||city_id<0||typeof(city_json.citylist[prov_id].c[city_id].a)=="undefined"){
				if(settings.nodata=="none"){
					dist_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					dist_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml;
			$.each(city_json.citylist[prov_id].c[city_id].a,function(i,dist){
				temp_html+="<option value='"+dist.s+"'>"+dist.s+"</option>";
			});
			dist_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};

		var init=function(){
			// 遍历赋值省份下拉列表
			temp_html=select_prehtml;
			$.each(city_json.citylist,function(i,prov){
				temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
			});
			prov_obj.html(temp_html);

			//prov_obj.selectric();
			// 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.prov!=null){
					prov_obj.val(settings.prov);
					cityStart();
					setTimeout(function(){
						if(settings.city!=null){
							city_obj.val(settings.city);
							distStart();
							setTimeout(function(){
								if(settings.dist!=null){
									dist_obj.val(settings.dist);
								};
							},1);
						};
					},1);
				};
			},1);

			// 选择省份时发生事件
			prov_obj.bind("change",function(){
				cityStart();
			});

			// 选择市级时发生事件
			city_obj.bind("change",function(){
				distStart();
			});
		};

		// 设置省市json数据
		if(typeof(settings.url)=="string"){
			$.getJSON(settings.url,function(json){
				city_json=json;
				init();
			});
		}else{
			city_json=settings.url;
			init();
		};
	};
})(jQuery);

/*!

 @Name：layer v2.0 弹层组件
 @Author：贤心
 @Site：http://layer.layui.com
 @License：LGPL
        
 */

;!function(window, undefined){
"use strict";

var $, win, ready = {
    getPath: function(){
        var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
        if(script.getAttribute('merge')) return;
        return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }(),
    
    //屏蔽Enter触发弹层
    enter: function(e){
        if(e.keyCode === 13) e.preventDefault();
    },
    config: {}, end: {},
    btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],
    
    //五种原始层模式
    type: ['dialog', 'page', 'iframe', 'loading', 'tips']
};

//默认内置方法。
var layer = {
    v: '2.0',
    ie6: !!window.ActiveXObject&&!window.XMLHttpRequest,
    index: 0,
    path: ready.getPath,
    config: function(options, fn){
        var item = 0;
        options = options || {};
        layer.cache = ready.config = $.extend(ready.config, options);
        layer.path = ready.config.path || layer.path;
        typeof options.extend === 'string' && (options.extend = [options.extend]);
        layer.use('skin/layer.css', (options.extend && options.extend.length > 0) ? (function loop(){
            var ext = options.extend;
            layer.use(ext[ext[item] ? item : item-1], item < ext.length ? function(){
                ++item; 
                return loop;
            }() : fn);
        }()) : fn);
        return this;
    },
    
    //载入配件
    use: function(module, fn, readyMethod){
        var i = 0, head = $('head')[0];
        var module = module.replace(/\s/g, '');
        var iscss = /\.css$/.test(module);
        var node = document.createElement(iscss ? 'link' : 'script');
        var id = 'layui_layer_' + module.replace(/\.|\//g, '');
        if(!layer.path) return;
        if(iscss){
            node.rel = 'stylesheet';
        }
        node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : layer.path + module;
        node.id = id;
        if(!$('#'+ id)[0]){
            head.appendChild(node);
        }
        //轮询加载就绪
        ;(function poll() {
            ;(iscss ? parseInt($('#'+id).css('width')) === 1989 : layer[readyMethod||id]) ? function(){
                fn && fn();
                try { iscss || head.removeChild(node); } catch(e){};
            }() : setTimeout(poll, 100);
        }());
        return this;
    },
    
    ready: function(path, fn){
        var type = typeof path === 'function';
        if(type) fn = path;
        layer.config($.extend(ready.config, function(){
           return type ? {} : {path: path};
        }()), fn);
        return this;
    },
    
    //各种快捷引用
    alert: function(content, options, yes){
        var type = typeof options === 'function';
        if(type) yes = options;
        return layer.open($.extend({
            content: content,
            yes: yes
        }, type ? {} : options));
    }, 
    
    confirm: function(content, options, yes, cancel){ 
        var type = typeof options === 'function';
        if(type){
            cancel = yes;
            yes = options;
        }
        return layer.open($.extend({
            content: content,
            btn: ready.btn,
            yes: yes,
            cancel: cancel
        }, type ? {} : options));
    },
    
    msg: function(content, options, end){ //最常用提示层
        var type = typeof options === 'function', rskin = ready.config.skin;
        var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'layui-layer-msg';
        var shift = doms.anim.length - 1;
        if(type) end = options;
        return layer.open($.extend({
            content: content,
            time: 3000,
            shade: false,
            skin: skin,
            title: false,
            closeBtn: false,
            btn: false,
            end: end
        }, (type && !ready.config.skin) ? {
            skin: skin + ' layui-layer-hui',
            shift: shift
        } : function(){
           options = options || {};
           if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
               options.skin = skin + ' ' + (options.skin||'layui-layer-hui');
           }
           return options;
        }()));  
    },
    
    load: function(icon, options){
        return layer.open($.extend({
            type: 3,
            icon: icon || 0,
            shade: 0.01
        }, options));
    }, 
    
    tips: function(content, follow, options){
        return layer.open($.extend({
            type: 4,
            content: [content, follow],
            closeBtn: false,
            time: 3000,
            maxWidth: 210
        }, options));
    }
};

var Class = function(setings){    
    var that = this;
    that.index = ++layer.index;
    that.config = $.extend({}, that.config, ready.config, setings);
    that.creat();
};

Class.pt = Class.prototype;

//缓存常用字符
var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
doms.anim = ['layui-anim', 'layui-anim-01', 'layui-anim-02', 'layui-anim-03', 'layui-anim-04', 'layui-anim-05', 'layui-anim-06'];

//默认配置
Class.pt.config = {
    type: 0,
    shade: 0.3,
    fix: true,
    move: doms[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0, //0表示不自动关闭
    zIndex: 19891014, 
    maxWidth: 360,
    shift: 0,
    icon: -1,
    scrollbar: true, //是否允许浏览器滚动条
    tips: 2
};

//容器
Class.pt.vessel = function(conType, callback){
    var that = this, times = that.index, config = that.config;
    var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
    var ismax = config.maxmin && (config.type === 1 || config.type === 2);
    var titleHTML = (config.title ? '<div class="layui-layer-title" style="'+ (titype ? config.title[1] : '') +'">' 
        + (titype ? config.title[0] : config.title) 
    + '</div>' : '');
    
    config.zIndex = zIndex;
    callback([
        //遮罩
        config.shade ? ('<div class="layui-layer-shade" id="layui-layer-shade'+ times +'" times="'+ times +'" style="'+ ('z-index:'+ (zIndex-1) +'; background-color:'+ (config.shade[1]||'#000') +'; opacity:'+ (config.shade[0]||config.shade) +'; filter:alpha(opacity='+ (config.shade[0]*100||config.shade*100) +');') +'"></div>') : '',
        
        //主体
        '<div class="'+ doms[0] +' '+ (doms.anim[config.shift]||'')  + (' layui-layer-'+ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin||'') +''+(config.cusClass||'')+ ' ' + (config.cusClass||'') +'" id="'+ doms[0] + times +'" type="'+ ready.type[config.type] +'" times="'+ times +'" showtime="'+ config.time +'" conType="'+ (conType ? 'object' : 'string') +'" style="z-index: '+ zIndex +'; width:'+ config.area[0] + ';height:' + config.area[1] + (config.fix ? '' : ';position:absolute;') +'">'
            + (conType && config.type != 2 ? '' : titleHTML)
            +'<div class="layui-layer-content'+ ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' :'') + (config.type == 3 ? ' layui-layer-loading'+config.icon : '') +'">'
                + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico'+ config.icon +'"></i>' : '')
                + (config.type == 1 && conType ? '' : (config.content||''))
            +'</div>'
            + '<span class="layui-layer-setwin">'+ function(){
                var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="layui-layer-ico '+ doms[7] +' '+ doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) +'" href="javascript:;"></a>');
                return closebtn;
            }() + '</span>'
            + (config.btn ? function(){
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for(var i = 0, len = config.btn.length; i < len; i++){
                    button += '<a class="'+ doms[6] +''+ i +'">'+ config.btn[i] +'</a>'
                }
                return '<div class="'+ doms[6] +'">'+ button +'</div>'
            }() : '')
        +'</div>'
    ], titleHTML);
    return that;
};

//创建骨架
Class.pt.creat = function(){
    var that = this, config = that.config, times = that.index, nodeIndex;
    var content = config.content, conType = typeof content === 'object';
    
    if(typeof config.area === 'string'){
        config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
    }
    
    switch(config.type){
        case 0:
            config.btn = ('btn' in config) ? config.btn : ready.btn[0];
            layer.closeAll('dialog');
        break;
        case 2:
            var content = config.content = conType ? config.content : [config.content||'http://sentsin.com?from=layer', 'auto'];
            config.content = '<iframe scrolling="'+ (config.content[1]||'auto') +'" allowtransparency="true" id="'+ doms[4] +''+ times +'" name="'+ doms[4] +''+ times +'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
        case 3:
            config.title = false;
            config.closeBtn = false;
            config.icon === -1 && (config.icon === 0);
            layer.closeAll('loading');
        break;
        case 4:
            conType || (config.content = [config.content, 'body']);
            config.follow = config.content[1];
            config.content = config.content[0] + '<i class="layui-layer-TipsG"></i><i class="layui-layer-TipsGs"></i>';
            config.title = false;
            config.shade = false;
            config.fix = false;
            config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
            config.tipsMore || layer.closeAll('tips');
        break;
    }
    
    //建立容器
    that.vessel(conType, function(html, titleHTML){
        $('body').append(html[0]);
        conType ? function(){
            (config.type == 2 || config.type == 4) ? function(){
                $('body').append(html[1]);
            }() : function(){
                if(!content.parents('.'+doms[0])[0]){
                    content.show().addClass('layui-layer-wrap').wrap(html[1]);
                    $('#'+ doms[0] + times).find('.'+doms[5]).before(titleHTML);
                }
            }();
        }() : $('body').append(html[1]);
        that.layero = $('#'+ doms[0] + times);
        config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
    }).auto(times);

    config.type == 2 && layer.ie6 && that.layero.find('iframe').attr('src', content[0]);
    $(document).off('keydown', ready.enter).on('keydown', ready.enter);

    //坐标自适应浏览器窗口尺寸
    config.type == 4 ? that.tips() : that.offset();
    if(config.fix){
        win.on('resize', function(){
            that.offset();
            (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
            config.type == 4 && that.tips();
        });
    }
    
    config.time <= 0 || setTimeout(function(){
        layer.close(that.index)
    }, config.time);
    that.move().callback();
};

//自适应
Class.pt.auto = function(index){
    var that = this, config = that.config, layero = $('#'+ doms[0] + index);
    if(config.area[0] === '' && config.maxWidth > 0){
        //为了修复IE7下一个让人难以理解的bug
        if(/MSIE 7/.test(navigator.userAgent) && config.btn){
            layero.width(layero.innerWidth());
        }
        layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }
    var area = [layero.innerWidth(), layero.innerHeight()];
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    function setHeight(elem){
        elem = layero.find(elem);
        elem.height(area[1] - titHeight - btnHeight - 2*(parseFloat(elem.css('padding'))|0));
    }
    switch(config.type){
        case 2: 
            setHeight('iframe');
        break;
        default:
            if(config.area[1] === ''){
                if(config.fix && area[1] >= win.height()){
                    area[1] = win.height();
                    setHeight('.'+doms[5]);
                }
            } else {
                setHeight('.'+doms[5]);
            }
        break;
    }
    return that;
};

//计算坐标
Class.pt.offset = function(){
    var that = this, config = that.config, layero = that.layero;
    var area = [layero.outerWidth(), layero.outerHeight()];
    var type = typeof config.offset === 'object';
    that.offsetTop = (win.height() - area[1])/2;
    that.offsetLeft = (win.width() - area[0])/2;
    if(type){
        that.offsetTop = config.offset[0];
        that.offsetLeft = config.offset[1]||that.offsetLeft;
    } else if(config.offset !== 'auto'){
        that.offsetTop = config.offset;
        if(config.offset === 'rb'){ //右下角
            that.offsetTop = win.height() - area[1];
            that.offsetLeft = win.width() - area[0];
        }
    }
    if(!config.fix){
        that.offsetTop = /%$/.test(that.offsetTop) ? 
            win.height()*parseFloat(that.offsetTop)/100
        : parseFloat(that.offsetTop);
        that.offsetLeft = /%$/.test(that.offsetLeft) ? 
            win.width()*parseFloat(that.offsetLeft)/100
        : parseFloat(that.offsetLeft);
        that.offsetTop += win.scrollTop();
        that.offsetLeft += win.scrollLeft();
    }
    layero.css({top: that.offsetTop, left: that.offsetLeft});
};

//Tips
Class.pt.tips = function(){
    var that = this, config = that.config, layero = that.layero;
    var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
    if(!follow[0]) follow = $('body');
    var goal = {
        width: follow.outerWidth(),
        height: follow.outerHeight(),
        top: follow.offset().top,
        left: follow.offset().left
    }, tipsG = layero.find('.layui-layer-TipsG'),tipsGs = layero.find('.layui-layer-TipsGs');
    
    var guide = config.tips[0];
    config.tips[1] || tipsG.remove();
    
    goal.autoLeft = function(){
        if(goal.left + layArea[0] - win.width() > 0){
            goal.tipLeft = goal.left + goal.width - layArea[0];
            tipsG.css({right: 12, left: 'auto'});
            tipsGs.css({right: 12, left: 'auto'});
        } else {
            goal.tipLeft = goal.left;
        };
    };
    
    //辨别tips的方位
    goal.where = [function(){ //上                
        goal.autoLeft();
        goal.tipTop = goal.top - layArea[1] - 10;
        tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
        tipsGs.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
    }, function(){ //右
        goal.tipLeft = goal.left + goal.width + 10;
        goal.tipTop = goal.top;
        tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
        tipsGs.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]); 
    }, function(){ //下
        goal.autoLeft();
        goal.tipTop = goal.top + goal.height + 10;
        tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
        tipsGs.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
    }, function(){ //左
        goal.tipLeft = goal.left - layArea[0] - 10;
        goal.tipTop = goal.top;
        tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
        tipsGs.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
    }];
    goal.where[guide-1]();
    
    /* 8*2为小三角形占据的空间 */
    if(guide === 1){
        goal.top - (win.scrollTop() + layArea[1] + 8*2) < 0 && goal.where[2]();
    } else if(guide === 2){
        win.width() - (goal.left + goal.width + layArea[0] + 8*2) > 0 || goal.where[3]()
    } else if(guide === 3){
        (goal.top - win.scrollTop() + goal.height + layArea[1] + 8*2) - win.height() > 0 && goal.where[0]();
    } else if(guide === 4){
       layArea[0] + 8*2 - goal.left > 0 && goal.where[1]()
    }

    layero.find('.'+doms[5]).css({
        'background-color': config.tips[1], 
        'padding-right': (config.closeBtn ? '30px' : '')
    });
    layero.css({left: goal.tipLeft, top: goal.tipTop});
}

//拖拽层
Class.pt.move = function(){
    var that = this, config = that.config, conf = {
        setY: 0,
        moveLayer: function(){
            var layero = conf.layero, mgleft = parseInt(layero.css('margin-left'));
            var lefts = parseInt(conf.move.css('left'));
            mgleft === 0 || (lefts = lefts - mgleft);
            if(layero.css('position') !== 'fixed'){
                lefts = lefts - layero.parent().offset().left;
                conf.setY = 0;
            }
            layero.css({left: lefts, top: parseInt(conf.move.css('top')) - conf.setY});
        }
    };
    
    var movedom = that.layero.find(config.move);
    config.move && movedom.attr('move', 'ok');
    movedom.css({cursor: config.move ? 'move' : 'auto'});
    
    $(config.move).on('mousedown', function(M){    
        M.preventDefault();
        if($(this).attr('move') === 'ok'){
            conf.ismove = true;
            conf.layero = $(this).parents('.'+ doms[0]);
            var xx = conf.layero.offset().left, yy = conf.layero.offset().top, ww = conf.layero.outerWidth() - 6, hh = conf.layero.outerHeight() - 6;
            if(!$('#layui-layer-moves')[0]){
                $('body').append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+ xx +'px; top:'+ yy +'px; width:'+ ww +'px; height:'+ hh +'px; z-index:2147483584"></div>');
            }
            conf.move = $('#layui-layer-moves');
            config.moveType && conf.move.css({visibility: 'hidden'});
           
            conf.moveX = M.pageX - conf.move.position().left;
            conf.moveY = M.pageY - conf.move.position().top;
            conf.layero.css('position') !== 'fixed' || (conf.setY = win.scrollTop());
        }
    });
    
    $(document).mousemove(function(M){
        if(conf.ismove){
            var offsetX = M.pageX - conf.moveX, offsetY = M.pageY - conf.moveY;
            M.preventDefault();

            //控制元素不被拖出窗口外
            if(!config.moveOut){
                conf.setY = win.scrollTop();
                var setRig = win.width() - conf.move.outerWidth(), setTop = conf.setY;               
                offsetX < 0 && (offsetX = 0);
                offsetX > setRig && (offsetX = setRig); 
                offsetY < setTop && (offsetY = setTop);
                offsetY > win.height() - conf.move.outerHeight() + conf.setY && (offsetY = win.height() - conf.move.outerHeight() + conf.setY);
            }
            
            conf.move.css({left: offsetX, top: offsetY});    
            config.moveType && conf.moveLayer();
            
            offsetX = offsetY = setRig = setTop = null;
        }                                                 
    }).mouseup(function(){
        try{
            if(conf.ismove){
                conf.moveLayer();
                conf.move.remove();
                config.moveEnd && config.moveEnd();
            }
            conf.ismove = false;
        }catch(e){
            conf.ismove = false;
        }
    });
    return that;
};

Class.pt.callback = function(){
    var that = this, layero = that.layero, config = that.config;
    that.openLayer();
    if(config.success){
        if(config.type == 2){
            layero.find('iframe')[0].onload = function(){
                this.className = '';
                config.success(layero, that.index);
            };
        } else {
            config.success(layero, that.index);
        }
    }
    layer.ie6 && that.IE6(layero);
    
    //按钮
    layero.find('.'+ doms[6]).children('a').on('click', function(){
        var index = $(this).index();
        config['btn'+(index+1)] && config['btn'+(index+1)](that.index, layero);
        if(index === 0){
            config.yes ? config.yes(that.index, layero) : layer.close(that.index);
        } else if(index === 1){
            cancel();
        } else {
            config['btn'+(index+1)] || layer.close(that.index);
        }
    });
    
    //取消
    function cancel(){
        var close = config.cancel && config.cancel(that.index);
        close === false || layer.close(that.index);
    }
    
    //右上角关闭回调
    layero.find('.'+ doms[7]).on('click', function(){
        //config.onClose ? config.onClose:cancel;
        config.onClose && config.onClose();
        layer.close(that.index);
    });
    
    //点遮罩关闭
    if(config.shadeClose){
        $('#layui-layer-shade'+ that.index).on('click', function(){
            layer.close(that.index);
        });
    } 
    
    //最小化
    layero.find('.layui-layer-min').on('click', function(){
        layer.min(that.index, config);
        config.min && config.min(layero);
    });
    
    //全屏/还原
    layero.find('.layui-layer-max').on('click', function(){
        if($(this).hasClass('layui-layer-maxmin')){
            layer.restore(that.index);
            config.restore && config.restore(layero);
        } else {
            layer.full(that.index, config);
            config.full && config.full(layero);
        }
    });

    config.end && (ready.end[that.index] = config.end);
};

//for ie6 恢复select
ready.reselect = function(){
    $.each($('select'), function(index , value){
        var sthis = $(this);
        if(!sthis.parents('.'+doms[0])[0]){
            (sthis.attr('layer') == 1 && $('.'+doms[0]).length < 1) && sthis.removeAttr('layer').show(); 
        }
        sthis = null;
    });
}; 

Class.pt.IE6 = function(layero){
    var that = this, _ieTop = layero.offset().top;
    
    //ie6的固定与相对定位
    function ie6Fix(){
        layero.css({top : _ieTop + (that.config.fix ? win.scrollTop() : 0)});
    };
    ie6Fix();
    win.scroll(ie6Fix);

    //隐藏select
    $('select').each(function(index , value){
        var sthis = $(this);
        if(!sthis.parents('.'+doms[0])[0]){
            sthis.css('display') === 'none' || sthis.attr({'layer' : '1'}).hide();
        }
        sthis = null;
    });
};

//需依赖原型的对外方法
Class.pt.openLayer = function(){
    var that = this;
    
    //置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function(layero){
        var setZindex = function(){
            layer.zIndex++;
            layero.css('z-index', layer.zIndex + 1);
        };
        layer.zIndex = parseInt(layero[0].style.zIndex);
        layero.on('mousedown', setZindex);
        return layer.zIndex;
    };
};

ready.record = function(layero){
    var area = [
        layero.outerWidth(),
        layero.outerHeight(),
        layero.position().top, 
        layero.position().left + parseFloat(layero.css('margin-left'))
    ];
    layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
    layero.attr({area: area});
};

ready.rescollbar = function(index){
    if(doms.html.attr('layer-full') == index){
        if(doms.html[0].style.removeProperty){
            doms.html[0].style.removeProperty('overflow');
        } else {
            doms.html[0].style.removeAttribute('overflow');
        }
        doms.html.removeAttr('layer-full');
    }
};

/*! 内置成员 */

//获取子iframe的DOM
layer.getChildFrame = function(selector, index){
    index = index || $('.'+doms[4]).attr('times');
    return $('#'+ doms[0] + index).find('iframe').contents().find(selector);    
};

//得到当前iframe层的索引，子iframe时使用
layer.getFrameIndex = function(name){
    return $('#'+ name).parents('.'+doms[4]).attr('times');
};

//iframe层自适应宽高
layer.iframeAuto = function(index){
    if(!index) return;
    var heg = layer.getChildFrame('body', index).outerHeight();
    var layero = $('#'+ doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    layero.css({height: heg + titHeight + btnHeight});
    layero.find('iframe').css({height: heg});
};

//重置iframe url
layer.iframeSrc = function(index, url){
    $('#'+ doms[0] + index).find('iframe').attr('src', url);
};

//设定层的样式
layer.style = function(index, options){
    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.'+doms[6]).outerHeight() || 0;
    if(type === ready.type[1] || type === ready.type[2]){
        layero.css(options);
        if(type === ready.type[2]){
            layero.find('iframe').css({
                height: parseFloat(options.height) - titHeight - btnHeight
            });
        }
    }
};

//最小化
layer.min = function(index, options){
    var layero = $('#'+ doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    ready.record(layero);
    layer.style(index, {width: 180, height: titHeight, overflow: 'hidden'});
    layero.find('.layui-layer-min').hide();
    layero.attr('type') === 'page' && layero.find(doms[4]).hide();
    ready.rescollbar(index);
};

//还原
layer.restore = function(index){
    var layero = $('#'+ doms[0] + index), area = layero.attr('area').split(',');
    var type = layero.attr('type');
    layer.style(index, {
        width: parseFloat(area[0]), 
        height: parseFloat(area[1]), 
        top: parseFloat(area[2]), 
        left: parseFloat(area[3]),
        overflow: 'visible'
    });
    layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
    layero.find('.layui-layer-min').show();
    layero.attr('type') === 'page' && layero.find(doms[4]).show();
    ready.rescollbar(index);
};

//全屏
layer.full = function(index){
    var layero = $('#'+ doms[0] + index), timer;
    ready.record(layero);
    if(!doms.html.attr('layer-full')){
        doms.html.css('overflow','hidden').attr('layer-full', index);
    }
    clearTimeout(timer);
    timer = setTimeout(function(){
        var isfix = layero.css('position') === 'fixed';
        layer.style(index, {
             top: isfix ? 0 : win.scrollTop(),
             left: isfix ? 0 : win.scrollLeft(),
             width: win.width(),
             height: win.height()
        });
        layero.find('.layui-layer-min').hide();
    }, 100);
};

//改变title
layer.title = function(name, index){
    var title = $('#'+ doms[0] + (index||layer.index)).find(doms[1]);
    title.html(name);
};

//关闭layer总方法
layer.close = function(index){
    var layero = $('#'+ doms[0] + index), type = layero.attr('type');
    if(!layero[0]) return;
    if(type === ready.type[1] && layero.attr('conType') === 'object'){
        layero.children(':not(.'+ doms[5] +')').remove();
        for(var i = 0; i < 2; i++){
            layero.find('.layui-layer-wrap').unwrap().hide();
        }
    } else {
        //低版本IE 回收 iframe
        if(type === ready.type[2]){
            try {
                var iframe = $('#'+doms[4]+index)[0];
                iframe.contentWindow.document.write('');
                iframe.contentWindow.close();
                layero.find('.'+doms[5])[0].removeChild(iframe);
            } catch(e){}
        }
        layero[0].innerHTML = '';
        layero.remove();
    }
    $('#layui-layer-moves, #layui-layer-shade' + index).remove();
    layer.ie6 && ready.reselect();
    ready.rescollbar(index);
    $(document).off('keydown', ready.enter);
    typeof ready.end[index] === 'function' && ready.end[index]();
    delete ready.end[index]; 
};

//关闭所有层
layer.closeAll = function(type){
    $.each($('.'+doms[0]), function(){
        var othis = $(this);
        var is = type ? (othis.attr('type') === type) : 1;
        is && layer.close(othis.attr('times'));
        is = null;
    });
};

//主入口
ready.run = function(){
    $ = jQuery; 
    win = $(window);
    doms.html = $('html');
    layer.open = function(deliver){
        var o = new Class(deliver);
        return o.index;
    };
};

'function' === typeof define ? define(function(){
    ready.run();
    return layer;
}) : function(){
   window.layer = layer;
   ready.run();
   layer.use('skin/layer.css');
}();

}(window);


/**
 
 @Name : layDate v1.1 日期控件
 @Site：http://sentsin.com/layui/laydate
 
 */

;!function(win){

//全局配置，如果采用默认均不需要改动
var config =  {
    path: '', //laydate所在路径
    defSkin: 'default', //初始化皮肤
    format: 'YYYY-MM-DD', //日期格式
    min: '1900-01-01 00:00:00', //最小日期
    max: '2099-12-31 23:59:59', //最大日期
    isv: false,
    init: true
};

var Dates = {}, doc = document, creat = 'createElement', byid = 'getElementById', tags = 'getElementsByTagName';
var as = ['laydate_box', 'laydate_void', 'laydate_click', 'LayDateSkin', 'skins/', '/laydate.css'];


//主接口
win.laydate = function(options){
    options = options || {};
    try{
        as.event = win.event ? win.event : laydate.caller.arguments[0];
    } catch(e){};
    Dates.run(options);
    return laydate;
};

laydate.v = '1.1';

//获取组件存放路径
Dates.getPath = (function(){
    var js = document.scripts, jsPath = js[js.length - 1].src;
    return config.path ? config.path : jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
}());

Dates.use = function(lib, id){
    var link = doc[creat]('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = Dates.getPath + lib + as[5];
    id && (link.id = id);
    doc[tags]('head')[0].appendChild(link);
    link = null;
};

Dates.trim = function(str){
    str = str || '';
    return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
};

//补齐数位
Dates.digit = function(num){
    return num < 10 ? '0' + (num|0) : num;
};

Dates.stopmp = function(e){
    e = e || win.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    return this;
};

Dates.each = function(arr, fn){
    var i = 0, len = arr.length;
    for(; i < len; i++){
        if(fn(i, arr[i]) === false){
            break
        }
    }
};

Dates.hasClass = function(elem, cls){
    elem = elem || {};
    return new RegExp('\\b' + cls +'\\b').test(elem.className);
};

Dates.addClass = function(elem, cls){
    elem = elem || {};
    Dates.hasClass(elem, cls) || (elem.className += ' ' + cls);
    elem.className = Dates.trim(elem.className);
    return this;
};

Dates.removeClass = function(elem, cls) {
    elem = elem || {};
    if (Dates.hasClass(elem, cls)) {
        var reg = new RegExp('\\b' + cls +'\\b');
        elem.className = elem.className.replace(reg, '');
    }
    return this;
};

//清除css属性
Dates.removeCssAttr = function(elem, attr){
    var s = elem.style;
    if(s.removeProperty){
        s.removeProperty(attr);
    } else {
        s.removeAttribute(attr);
    }
};

//显示隐藏
Dates.shde = function(elem, type){
    elem.style.display = type ? 'none' : 'block';
};

//简易选择器
Dates.query = function(node){
    if(node && node.nodeType === 1){
        if(node.tagName.toLowerCase() !== 'input'){
            throw new Error('选择器elem错误');
        }
        return node;
    }

    var node = (Dates.trim(node)).split(' '), elemId = doc[byid](node[0].substr(1)), arr;
    if(!elemId){
        return;
    } else if(!node[1]){
        return elemId;
    } else if(/^\./.test(node[1])){
        var find, child = node[1].substr(1), exp = new RegExp('\\b' + child +'\\b');
        arr = []
        find = doc.getElementsByClassName ? elemId.getElementsByClassName(child) : elemId[tags]('*');
        Dates.each(find, function(ii, that){
            exp.test(that.className) && arr.push(that); 
        });
        return arr[0] ? arr : '';
    } else {
        arr = elemId[tags](node[1]);
        return arr[0] ? elemId[tags](node[1]) : '';
    }
};

//事件监听器
Dates.on = function(elem, even, fn){
    elem.attachEvent ? elem.attachEvent('on'+ even, function(){
        fn.call(elem, win.even);
    }) : elem.addEventListener(even, fn, false);
    return Dates;
};

//阻断mouseup
Dates.stopMosup = function(evt, elem){
    if(evt !== 'mouseup'){
        Dates.on(elem, 'mouseup', function(ev){
            Dates.stopmp(ev);
        });
    }
};

Dates.run = function(options){
    var S = Dates.query, elem, devt, even = as.event, target;
    try {
        target = even.target || even.srcElement || {};
    } catch(e){
        target = {};
    }
    elem = options.elem ? S(options.elem) : target;

    as.elemv = /textarea|input/.test(elem.tagName.toLocaleLowerCase()) ? 'value' : 'innerHTML';
    if (config.init) elem[as.elemv] = laydate.now(null, options.format || config.format)

    if(even && target.tagName){
        if(!elem || elem === Dates.elem){
            return;
        }
        Dates.stopMosup(even.type, elem);
        Dates.stopmp(even);
        Dates.view(elem, options);
        Dates.reshow();
    } else {
        devt = options.event || 'click';
        Dates.each((elem.length|0) > 0 ? elem : [elem], function(ii, that){
            Dates.stopMosup(devt, that);
            Dates.on(that, devt, function(ev){
                Dates.stopmp(ev);
                if(that !== Dates.elem){
                    Dates.view(that, options);
                    Dates.reshow();
                }
            });
        });
    }
};

Dates.scroll = function(type){
    type = type ? 'scrollLeft' : 'scrollTop';
    return doc.body[type] | doc.documentElement[type];
};

Dates.winarea = function(type){
    return document.documentElement[type ? 'clientWidth' : 'clientHeight']
};

//判断闰年
Dates.isleap = function(year){
    return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
};

//检测是否在有效期
Dates.checkVoid = function(YY, MM, DD){
    var back = [];
    YY = YY|0;
    MM = MM|0;
    DD = DD|0;
    if(YY < Dates.mins[0]){
        back = ['y'];
    } else if(YY > Dates.maxs[0]){
        back = ['y', 1];
    } else if(YY >= Dates.mins[0] && YY <= Dates.maxs[0]){
        if(YY == Dates.mins[0]){
            if(MM < Dates.mins[1]){
                back = ['m'];
            } else if(MM == Dates.mins[1]){
                if(DD < Dates.mins[2]){
                    back = ['d'];
                }
            }
        }
        if(YY == Dates.maxs[0]){
            if(MM > Dates.maxs[1]){
                back = ['m', 1];
            } else if(MM == Dates.maxs[1]){
                if(DD > Dates.maxs[2]){
                    back = ['d', 1];
                }
            }
        }
    }
    return back;
};

//时分秒的有效检测
Dates.timeVoid = function(times, index){
    if(Dates.ymd[1]+1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]){
        if(index === 0 && (times < Dates.mins[3])){
            return 1;
        } else if(index === 1 && times < Dates.mins[4]){
            return 1;
        } else if(index === 2 && times < Dates.mins[5]){
            return 1;
        }
    } else if(Dates.ymd[1]+1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]){
        if(index === 0 && times > Dates.maxs[3]){
            return 1;
        } else if(index === 1 && times > Dates.maxs[4]){
            return 1;
        } else if(index === 2 && times > Dates.maxs[5]){
            return 1;
        }
    }
    if(times > (index ? 59 : 23)){
        return 1;
    }
};

//检测日期是否合法
Dates.check = function(){
    var reg = Dates.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,'\\d+\\').replace(/\\$/g, '');
    var exp = new RegExp(reg), value = Dates.elem[as.elemv];
    var arr = value.match(/\d+/g) || [], isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);
    if(value.replace(/\s/g, '') !== ''){
        if(!exp.test(value)){
            Dates.elem[as.elemv] = '';
            Dates.msg('日期不符合格式，请重新选择。');
            return 1;
        } else if(isvoid[0]){
            Dates.elem[as.elemv] = '';
            Dates.msg('日期不在有效期内，请重新选择。');
            return 1;
        } else {
            isvoid.value = Dates.elem[as.elemv].match(exp).join();
            arr = isvoid.value.match(/\d+/g);
            if(arr[1] < 1){
                arr[1] = 1;
                isvoid.auto = 1;
            } else if(arr[1] > 12){
                arr[1] = 12;
                isvoid.auto = 1;
            } else if(arr[1].length < 2){
                isvoid.auto = 1;
            }
            if(arr[2] < 1){
                arr[2] = 1;
                isvoid.auto = 1;
            } else if(arr[2] > Dates.months[(arr[1]|0)-1]){
                arr[2] = 31;
                isvoid.auto = 1;
            } else if(arr[2].length < 2){
                isvoid.auto = 1;
            }
            if(arr.length > 3){
                if(Dates.timeVoid(arr[3], 0)){
                    isvoid.auto = 1;
                };
                if(Dates.timeVoid(arr[4], 1)){
                    isvoid.auto = 1;
                };
                if(Dates.timeVoid(arr[5], 2)){
                    isvoid.auto = 1;
                };
            }
            if(isvoid.auto){
                Dates.creation([arr[0], arr[1]|0, arr[2]|0], 1);
            } else if(isvoid.value !== Dates.elem[as.elemv]){
                Dates.elem[as.elemv] = isvoid.value;
            }
        }
    }
};

//生成日期
Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Dates.viewDate = function(Y, M, D){
    var S = Dates.query, log = {}, De = new Date();
    Y < (Dates.mins[0]|0) && (Y = (Dates.mins[0]|0));
    Y > (Dates.maxs[0]|0) && (Y = (Dates.maxs[0]|0));
    
    De.setFullYear(Y, M, D);
    log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];
    
    Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;
    
    De.setFullYear(log.ymd[0], log.ymd[1], 1);
    log.FDay = De.getDay();
    
    log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
    log.NDay = 1;
    
    //渲染日
    Dates.each(as.tds, function(i, elem){
        var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
        elem.className = '';
        if(i < log.FDay){
            elem.innerHTML = DD = i + log.PDay;
            Dates.addClass(elem, 'laydate_nothis');
            MM === 1 && (YY -= 1);
            MM = MM === 1 ? 12 : MM - 1; 
        } else if(i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]){
            elem.innerHTML = DD = i  - log.FDay + 1;
            if(i - log.FDay + 1 === log.ymd[2]){
                Dates.addClass(elem, as[2]);
                log.thisDay = elem;
            }
        } else {
            elem.innerHTML = DD = log.NDay++;
            Dates.addClass(elem, 'laydate_nothis');
            MM === 12 && (YY += 1);
            MM = MM === 12 ? 1 : MM + 1; 
        }
       
        if(Dates.checkVoid(YY, MM, DD)[0]){
            Dates.addClass(elem, as[1]);
        }
        
        Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
        elem.setAttribute('y', YY);
        elem.setAttribute('m', MM);
        elem.setAttribute('d', DD);
        YY = MM = DD = null;
    });
    
    Dates.valid = !Dates.hasClass(log.thisDay, as[1]);
    Dates.ymd = log.ymd;
    
    //锁定年月
    as.year.value = Dates.ymd[0] + '年';
    as.month.value = Dates.digit(Dates.ymd[1] + 1) + '月';
    
    //定位月
    Dates.each(as.mms, function(i, elem){
        var getCheck = Dates.checkVoid(Dates.ymd[0], (elem.getAttribute('m')|0) + 1);
        if(getCheck[0] === 'y' || getCheck[0] === 'm'){
            Dates.addClass(elem, as[1]);
        } else {
            Dates.removeClass(elem, as[1]);
        }
        Dates.removeClass(elem, as[2]);
        getCheck = null
    });
    Dates.addClass(as.mms[Dates.ymd[1]], as[2]);
    
    //定位时分秒
    log.times = [
        Dates.inymd[3]|0 || 0, 
        Dates.inymd[4]|0 || 0, 
        Dates.inymd[5]|0 || 0
    ];
    Dates.each(new Array(3), function(i){
        Dates.hmsin[i].value = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i+3]|0 : log.times[i]|0);
    });
    
    //确定按钮状态
    Dates[Dates.valid ? 'removeClass' : 'addClass'](as.ok, as[1]);
};

//节日
Dates.festival = function(td, md){
    var str;
    switch(md){
        case '1.1':
            str = '元旦';
        break;
        case '3.8':
            str = '妇女';
        break;
        case '4.5':
            str = '清明';
        break;
        case '5.1':
            str = '劳动';
        break;
        case '6.1':
            str = '儿童';
        break;
        case '9.10':
            str = '教师';
        break;
        case '10.1':
            str = '国庆';
        break;
    };
    str && (td.innerHTML = str);
    str = null;
};

//生成年列表
Dates.viewYears = function(YY){
    var S = Dates.query, str = '';
    Dates.each(new Array(14), function(i){
        if(i === 7) {
            str += '<li '+ (parseInt(as.year.value) === YY ? 'class="'+ as[2] +'"' : '') +' y="'+ YY +'">'+ YY +'年</li>';
        } else {
            str += '<li y="'+ (YY-7+i) +'">'+ (YY-7+i) +'年</li>';
        }
    }); 
    S('#laydate_ys').innerHTML = str;
    Dates.each(S('#laydate_ys li'), function(i, elem){
        if(Dates.checkVoid(elem.getAttribute('y'))[0] === 'y'){
            Dates.addClass(elem, as[1]);
        } else {
            Dates.on(elem, 'click', function(ev){
                Dates.stopmp(ev).reshow();
                Dates.viewDate(this.getAttribute('y')|0, Dates.ymd[1], Dates.ymd[2]);
            });
        }
    });
};

//初始化面板数据
Dates.initDate = function(){
    var S = Dates.query, log = {}, De = new Date();
    var ymd = Dates.elem[as.elemv].match(/\d+/g) || [];
    if(ymd.length < 3){
        ymd = Dates.options.start.match(/\d+/g) || [];
        if(ymd.length < 3){
            ymd = [De.getFullYear(), De.getMonth()+1, De.getDate()];
        }
    }
    Dates.inymd = ymd;
    Dates.viewDate(ymd[0], ymd[1]-1, ymd[2]);
};

//是否显示零件
Dates.iswrite = function(){
    var S = Dates.query, log = {
        time: S('#laydate_hms')
    };
    Dates.shde(log.time, !Dates.options.istime);
    Dates.shde(as.oclear, !('isclear' in Dates.options ? Dates.options.isclear : 1));
    Dates.shde(as.otoday, !('istoday' in Dates.options ? Dates.options.istoday : 1));
    Dates.shde(as.ok, !('issure' in Dates.options ? Dates.options.issure : 1));
};

//方位辨别
Dates.orien = function(obj, pos){
    var tops, rect = Dates.elem.getBoundingClientRect();
    obj.style.left = rect.left + (pos ? 0 : Dates.scroll(1)) + 'px';
    if(rect.bottom + obj.offsetHeight/1.5 <= Dates.winarea()){
        tops = rect.bottom - 1;         
    } else {
        tops = rect.top > obj.offsetHeight/1.5 ? rect.top - obj.offsetHeight + 1 : Dates.winarea() - obj.offsetHeight;
    }
    obj.style.top = Math.max(tops + (pos ? 0 : Dates.scroll()),1) + 'px';
};

//吸附定位
Dates.follow = function(obj){
    if(Dates.options.fixed){
        obj.style.position = 'fixed';
        Dates.orien(obj, 1);
    } else {
        obj.style.position = 'absolute';
        Dates.orien(obj);
    }
};

//生成表格
Dates.viewtb = (function(){
    var tr, view = [], weeks = [ '日', '一', '二', '三', '四', '五', '六'];
    var log = {}, table = doc[creat]('table'), thead = doc[creat]('thead');
    thead.appendChild(doc[creat]('tr'));
    log.creath = function(i){
        var th = doc[creat]('th');
        th.innerHTML = weeks[i];
        thead[tags]('tr')[0].appendChild(th);
        th = null;
    };
    
    Dates.each(new Array(6), function(i){
        view.push([]);
        tr = table.insertRow(0);
        Dates.each(new Array(7), function(j){
            view[i][j] = 0;
            i === 0 && log.creath(j);
            tr.insertCell(j);
        });
    });
    
    table.insertBefore(thead, table.children[0]); 
    table.id = table.className = 'laydate_table';
    tr = view = null;
    return table.outerHTML.toLowerCase();
}());

//渲染控件骨架
Dates.view = function(elem, options){
    var S = Dates.query, div, log = {};
    options = options || elem;

    Dates.elem = elem;
    Dates.options = options;
    Dates.options.format || (Dates.options.format = config.format);
    Dates.options.start = Dates.options.start || '';
    Dates.mm = log.mm = [Dates.options.min || config.min, Dates.options.max || config.max];
    Dates.mins = log.mm[0].match(/\d+/g);
    Dates.maxs = log.mm[1].match(/\d+/g);
    
    if(!Dates.box){
        div = doc[creat]('div');
        div.id = as[0];
        div.className = as[0];
        div.style.cssText = 'position: absolute;';
        div.setAttribute('name', 'laydate-v'+ laydate.v);
        
        div.innerHTML =  log.html = '<div class="laydate_top">'
          +'<div class="laydate_ym laydate_y" id="laydate_YY">'
            +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
            +'<input id="laydate_y" readonly><label></label>'
            +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
            +'<div class="laydate_yms">'
              +'<a class="laydate_tab laydate_chtop"><cite></cite></a>'
              +'<ul id="laydate_ys"></ul>'
              +'<a class="laydate_tab laydate_chdown"><cite></cite></a>'
            +'</div>'
          +'</div>'
          +'<div class="laydate_ym laydate_m" id="laydate_MM">'
            +'<a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a>'
            +'<input id="laydate_m" readonly><label></label>'
            +'<a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a>'
            +'<div class="laydate_yms" id="laydate_ms">'+ function(){
                var str = '';
                Dates.each(new Array(12), function(i){
                    str += '<span m="'+ i +'">'+ Dates.digit(i+1) +'月</span>';
                });
                return str;
            }() +'</div>'
          +'</div>'
        +'</div>'
        
        + Dates.viewtb
        
        +'<div class="laydate_bottom">'
          +'<ul id="laydate_hms">'
            +'<li class="laydate_sj">时间</li>'
            +'<li><input readonly>:</li>'
            +'<li><input readonly>:</li>'
            +'<li><input readonly></li>'
          +'</ul>'
          +'<div class="laydate_time" id="laydate_time"></div>'
          +'<div class="laydate_btn">'
            +'<a id="laydate_clear">清空</a>'
            +'<a id="laydate_today">今天</a>'
            +'<a id="laydate_ok">确认</a>'
          +'</div>'
          +(config.isv ? '<a href="http://sentsin.com/layui/laydate/" class="laydate_v" target="_blank">laydate-v'+ laydate.v +'</a>' : '')
        +'</div>';
        doc.body.appendChild(div); 
        Dates.box = S('#'+as[0]);        
        Dates.events();
        div = null;
    } else {
        Dates.shde(Dates.box);
    }
    Dates.follow(Dates.box);
    options.zIndex ? Dates.box.style.zIndex = options.zIndex : Dates.removeCssAttr(Dates.box, 'z-index');
    Dates.stopMosup('click', Dates.box);
    
    Dates.initDate();
    Dates.iswrite();
    Dates.check();
};

//隐藏内部弹出元素
Dates.reshow = function(){
    Dates.each(Dates.query('#'+ as[0] +' .laydate_show'), function(i, elem){
        Dates.removeClass(elem, 'laydate_show');
    });
    return this;
};

//关闭控件
Dates.close = function(){
    Dates.reshow();
    Dates.shde(Dates.query('#'+ as[0]), 1);
    Dates.elem = null;
};

//转换日期格式
Dates.parse = function(ymd, hms, format){
    ymd = ymd.concat(hms);
    format = format || (Dates.options ? Dates.options.format : config.format);
    return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index){
        ymd.index = ++ymd.index|0;
        return Dates.digit(ymd[ymd.index]);
    });     
};

//返回最终日期
Dates.creation = function(ymd, hide){
    var S = Dates.query, hms = Dates.hmsin;
    var getDates = Dates.parse(ymd, [hms[0].value, hms[1].value, hms[2].value]);
    Dates.elem[as.elemv] = getDates;
    if(!hide){
        Dates.close();
        typeof Dates.options.choose === 'function' && Dates.options.choose(getDates); 
    }
};

//事件
Dates.events = function(){
    var S = Dates.query, log = {
        box: '#'+as[0]
    };
    
    Dates.addClass(doc.body, 'laydate_body');
    
    as.tds = S('#laydate_table td');
    as.mms = S('#laydate_ms span');
    as.year = S('#laydate_y');
    as.month = S('#laydate_m');

    //显示更多年月
    Dates.each(S(log.box + ' .laydate_ym'), function(i, elem){
        Dates.on(elem, 'click', function(ev){
            Dates.stopmp(ev).reshow();
            Dates.addClass(this[tags]('div')[0], 'laydate_show');
            if(!i){
                log.YY = parseInt(as.year.value);
                Dates.viewYears(log.YY);
            }
        });
    });
    
    Dates.on(S(log.box), 'click', function(){
        Dates.reshow();
    });
    
    //切换年
    log.tabYear = function(type){  
        if(type === 0){
            Dates.ymd[0]--;
        } else if(type === 1) {
            Dates.ymd[0]++;
        } else if(type === 2) {
            log.YY -= 14;
        } else {
            log.YY += 14;
        }
        if(type < 2){
            Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
            Dates.reshow();
        } else {
            Dates.viewYears(log.YY);
        }
    };
    Dates.each(S('#laydate_YY .laydate_tab'), function(i, elem){
        Dates.on(elem, 'click', function(ev){
            Dates.stopmp(ev);
            log.tabYear(i);
        });
    });
    
    
    //切换月
    log.tabMonth = function(type){
        if(type){
            Dates.ymd[1]++;
            if(Dates.ymd[1] === 12){
                Dates.ymd[0]++;
                Dates.ymd[1] = 0;
            }            
        } else {
            Dates.ymd[1]--;
            if(Dates.ymd[1] === -1){
                Dates.ymd[0]--;
                Dates.ymd[1] = 11;
            }
        }
        Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
    };
    Dates.each(S('#laydate_MM .laydate_tab'), function(i, elem){
        Dates.on(elem, 'click', function(ev){
            Dates.stopmp(ev).reshow();
            log.tabMonth(i);
        });
    });
    
    //选择月
    Dates.each(S('#laydate_ms span'), function(i, elem){
        Dates.on(elem, 'click', function(ev){
            Dates.stopmp(ev).reshow();
            if(!Dates.hasClass(this, as[1])){
                Dates.viewDate(Dates.ymd[0], this.getAttribute('m')|0, Dates.ymd[2]);
            }
        });
    });
    
    //选择日
    Dates.each(S('#laydate_table td'), function(i, elem){
        Dates.on(elem, 'click', function(ev){
            if(!Dates.hasClass(this, as[1])){
                Dates.stopmp(ev);
                Dates.creation([this.getAttribute('y')|0, this.getAttribute('m')|0, this.getAttribute('d')|0]);
            }
        });
    });
    
    //清空
    as.oclear = S('#laydate_clear');
    Dates.on(as.oclear, 'click', function(){
        Dates.elem[as.elemv] = '';
        Dates.close();
    });
    
    //今天
    as.otoday = S('#laydate_today');
    Dates.on(as.otoday, 'click', function(){
        var now = new Date();
        Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
    });
    
    //确认
    as.ok = S('#laydate_ok');
    Dates.on(as.ok, 'click', function(){
        if(Dates.valid){
            Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
        }
    });
    
    //选择时分秒
    log.times = S('#laydate_time');
    Dates.hmsin = log.hmsin = S('#laydate_hms input');
    log.hmss = ['小时', '分钟', '秒数'];
    log.hmsarr = [];
    
    //生成时分秒或警告信息
    Dates.msg = function(i, title){
        var str = '<div class="laydte_hsmtex">'+ (title || '提示') +'<span>×</span></div>';
        if(typeof i === 'string'){
            str += '<p>'+ i +'</p>';
            Dates.shde(S('#'+as[0]));
            Dates.removeClass(log.times, 'laydate_time1').addClass(log.times, 'laydate_msg');
        } else {
            if(!log.hmsarr[i]){
                str += '<div id="laydate_hmsno" class="laydate_hmsno">';
                Dates.each(new Array(i === 0 ? 24 : 60), function(i){
                    str += '<span>'+ i +'</span>';
                });
                str += '</div>'
                log.hmsarr[i] = str;
            } else {
                str = log.hmsarr[i];
            }
            Dates.removeClass(log.times, 'laydate_msg');
            Dates[i=== 0 ? 'removeClass' : 'addClass'](log.times, 'laydate_time1');
        }
        Dates.addClass(log.times, 'laydate_show');
        log.times.innerHTML = str;
    };
    
    log.hmson = function(input, index){
        var span = S('#laydate_hmsno span'), set = Dates.valid ? null : 1;
        Dates.each(span, function(i, elem){
            if(set){
                Dates.addClass(elem, as[1]);
            } else if(Dates.timeVoid(i, index)){
                Dates.addClass(elem, as[1]);
            } else {
                Dates.on(elem, 'click', function(ev){
                    if(!Dates.hasClass(this, as[1])){
                        input.value = Dates.digit(this.innerHTML|0);
                    }
                });
            } 
        });
        Dates.addClass(span[input.value|0], 'laydate_click');
    };
    
    //展开选择
    Dates.each(log.hmsin, function(i, elem){
        Dates.on(elem, 'click', function(ev){
            Dates.stopmp(ev).reshow();
            Dates.msg(i, log.hmss[i]);
            log.hmson(this, i);
        });
    });
    
    Dates.on(doc, 'mouseup', function(){
        var box = S('#'+as[0]);
        if(box && box.style.display !== 'none'){
            Dates.check() || Dates.close();
        }
    }).on(doc, 'keydown', function(event){
        event = event || win.event;
        var codes = event.keyCode;

        //如果在日期显示的时候按回车
        if(codes === 13 && Dates.elem){
            Dates.creation([Dates.ymd[0], Dates.ymd[1]+1, Dates.ymd[2]]);
        }
    });
};

Dates.init = (function(){
    Dates.use('need');
    Dates.use(as[4] + config.defSkin, as[3]);
    Dates.skinLink = Dates.query('#'+as[3]);
}());

//重置定位
laydate.reset = function(){
    (Dates.box && Dates.elem) && Dates.follow(Dates.box);
};

//返回指定日期
laydate.now = function(timestamp, format){
    var De = new Date((timestamp|0) ? function(tamp){
        return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
    }(parseInt(timestamp)) : +new Date);
    return Dates.parse(
        [De.getFullYear(), De.getMonth()+1, De.getDate()],
        [De.getHours(), De.getMinutes(), De.getSeconds()],
        format
    );
};

//皮肤选择
laydate.skin = function(lib){
    Dates.skinLink.href = Dates.getPath + as[4] + lib + as[5];
};

}(window);




/**扩展自layer**/
;(function($){
	$.fn.gduimsgTips = function(options){
		
		var defaults = {
			direction:1,//tips的方向
			content:"",//tips内容
			bgColor:"#3595CC",//背景颜色
			time: 0,//自动关闭时间，0表示不自动关闭
			canOver:true
		}
		
		var options = $.extend(defaults, options);

		return this.each(function(){
			var msgTipsObjs,
				$ele = $(this);
			$ele.hover(function(){
				msgTipsObjs = layer.tips(options.content, this, {
			        tips: [options.direction, options.bgColor],
			        time: options.time?options.time:0,
                    area:options.area,
			        cusClass:options.cusClass
			    })
			},function  () {		
				layer.close(msgTipsObjs)
			});
		});
	}
})(jQuery);

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
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
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};