// var _czc = _czc || [];
// _czc.push(["_setAccount", "1260070297"]);
var mySwiper;
var audio = document.getElementById("media");
var lastpage = getQueryString("lastpage");
// var cardId = getQueryString("cardId");
// var sid = getQueryString("sid");
// var userId = sid;
// var guide_link = "/page/zmpal/register.jsp?sid=" + sid;
// var titleObj = {};
// var forCompObj = ['yuedu_89'];

//拼接今天日期，格式：2014-12-02
function get_time(){
	var today=new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	var time = year;
	time += ((month < 10) ? "-0" : "-") + month + "";
	time += ((day < 10) ? "-0" : "-") + day + "";
	return time;
}
//操作cookie
// var cookie = (function(){
//     var _getCookie = function(key){
//         var re = new RegExp('(?:^|; )' + key + '=([^;]*)');
//         var result = document.cookie.match(re);
//         return result ? result[1] : null;
//     };
//     var _setCookie = function(key, value, minute){
//         if (minute) {
//             var now = new Date(),
//                 expire = new Date();
//             expire.setTime(parseFloat(+now) + 60 * 1000 * minute);
//         }
//         document.cookie = key + '=' + value + '; ' + (minute ? ('expires=' + expire.toUTCString() + '; ') : '') + 'path=/;';
//     };
//     var _removeCookie = function(key){
//         document.cookie = key + '=; expires=Mon, 2 Mar 2009 19:00:00 UTC; path=/;';
//     };
//     return {
//         getCookie : _getCookie,
//         setCookie : _setCookie,
//         removeCookie : _removeCookie
//     }
// })();
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    // wx.ready(function(){
    // 	play();
    // });
    /*document.addEventListener("WeixinJSBridgeReady", function () {//微信
       play();
    }, false);*/
    document.addEventListener("touchstart",play, false);
}
// cookie.setCookie("zmsid", sid, 60*24*365);
// var share_random = 1;
// //统计数据记录
// var tjObj = {};
// tjObj.source = "h5";
// tjObj.type = "browse";
// tjObj.userId = userId;
// tjObj.url = document.URL;
// var urlObj = lineLink.split("/");
// for(var u in urlObj){
// 	if(urlObj[u].indexOf(".html") > 0){
// 		tjObj.sourceCid = urlObj[u].split(".html")[0];
// 	}
// }
//
// //定时任务
// if(get_time() >= "2017-05-29" && tjObj.sourceCid == "yuedu_86"){
// 	shareTitle = "祝所有伙伴端午节安康！";
// 	forCompObj.push(tjObj.sourceCid);
// }

$(function() {
	audioAutoPlay('media');
	//适配屏幕
	showImg();
    //获取分享参数
	//getShareAttr();
	//微信分享配置
	//wx_share();
	//统计浏览量
	//h5_tongjiFunction(tjObj);
	//$("#inside_2141856207, #inside_6874247876").remove();
});

//获取url参数值
function getQueryString(name) {
	var reg = new RegExp("(^|&|&amp;)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
//检测是否加载完
function checkLoad() {
	setTimeout(function(){
		$(".checkbg").hide();
	},1000);
	//触屏轮播
	mySwiper = new Swiper('.swiper-container', {
		direction : 'vertical',
		speed: 600,
		loop: true,
		followFinger : false,
		longSwipesRatio : 0.1,
		onSlideChangeStart : function(swiper) {
			var id = swiper.activeIndex;
			$(".m-img").hide();
			$(".swiper-slide .m-img").eq(id).show();
			
			$(".swiper-slide").eq(id).find("img").each(function(){
				var $self = $(this);
				if($self.attr('data-realsrc')){
					$self.attr('src',$self.attr('data-realsrc'));
		            $self.removeAttr('data-realsrc');
				}
			});
			$(".swiper-slide").eq(id+1).find("img").each(function(){
				var $self = $(this);
				if($self.attr('data-realsrc')){
					$self.attr('src',$self.attr('data-realsrc'));
		            $self.removeAttr('data-realsrc');
				}
			});
		}
	});
	if(lastpage){
		mySwiper.slidePrev();
	}
}
//适配屏幕
function showImg() {
	//可视屏幕高度
	var height = document.documentElement.clientHeight;
	var width = $("body").width();
	$(".swiper-container,.swiper-wrapper").css({
		"height" : height
	});
	var ratio = 320/416,
		winW = document.documentElement.clientWidth,
		winH = document.documentElement.clientHeight,
		ratio2 = winW/winH,
		scale;
	
	if(ratio < ratio2){
		scale = (winH/480).toString().substring(0, 6); console.log(1);
    }else{
		scale = (winW/340).toString().substring(0, 6); console.log(2);
	}
	
	setTimeout(function(){
		if(ratio2 !== ratio){
			var cssText = '-webkit-transform: scale(' + scale + ');-webkit-transform-origin: top;opacity: 1;';
			$(".swiper-slide .edit_area").attr('style', cssText);
		}
        $(".swiper-slide .edit_area").css({
			"margin-top" : (height-480*scale)/8,
			"width" : "320px",
			"left" : "50%",
			"margin-left" : "-160px",
		});
		$(".swiper-slide .page-inner").css({
			"height" : height,
			"width" : winW
		});
		$(".cardpage_content").parent().css({
			"width" : "100%",
			"height" : "100%"
		});
		$(".cardpage_content .edit_area").css({
			"margin-top" : 0
		});
		//检测是否加载完
		checkLoad();
	}, 300);
}
//音乐控制
$("#audio_btn").on("click", function(){
	if($(this).hasClass("off")){
		$(this).addClass("play_yinfu").removeClass("off");
		$("#yinfu").addClass("rotate");
		audio.play();
	}else{
		$(this).addClass("off").removeClass("play_yinfu");
		$("#yinfu").removeClass("rotate");
		audio.pause();
	}
});
//跳转最后一页
$(".goLastPage").live("click", function(){
	mySwiper.slidePrev();
});

//获取分享参数
// function getShareAttr(){
// 	$.ajax({
// 		url:"/page/zmpal/namecardshare!getShareAttr.jsp",
// 		type:"post",
// 		success:function(data){
// 			var jsapi_ticket = data.ticket;
// 			var appId = data.appId;
// 			var timestamp = '1';
// 			var nonceStr = '1';
// 			var theUrl = document.URL;
// 			var string1 = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + theUrl;
// 			var signature = new jsSHA(string1,"TEXT"); //签名算法
// 				signature = signature.getHash("SHA-1","HEX");
// 			var jsApiList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getNetworkType', 'closeWindow', 'chooseWXPay'];
// 			//通过config接口注入权限验证配置
// 			wx.config({
// 			    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
// 			    appId: appId, // 必填，公众号的唯一标识
// 			    timestamp: timestamp, // 必填，生成签名的时间戳
// 			    nonceStr: nonceStr, // 必填，生成签名的随机串
// 			    signature: signature, // 必填，签名，见附录1
// 			    jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// 			});
// 			//获取游客序号
// 			//get_browse();
// 			//获取名片信息
// 			getDetail();
// 		}
// 	});
// }
//获取游客序号
function get_browse(){
	$.ajax({
		type: "post",
        url: "/page/zmpal/statisticshare!browse.jsp",
        data: {num: tjObj.sourceCid},
        success: function(data){
        	titleObj.total = data.total;
        	//获取名片信息
			getDetail();
        }
 	});
}
//获取名片信息
function getDetail(){
	var html = '<div class="cardpage_head">\
					<div class="cardpage_face_content">\
						<a class="cardpage_face_main" style="-webkit-animation: fadeInDown .8s ease .3s 1 both;">\
							<img src="//media.zmpal.com/zmpal/image/common/face.png" class="cardpage_face">\
							<img src="//media.zmpal.com/zmpal/image/common/icon_king.gif" class="cardpage_face_vip hidden">\
						</a>\
					</div>\
					<div class="cardpage_name_content" style="-webkit-animation: fadeInLeft .5s ease 1s 1 both;">\
						<span class="cardpage_name">姓名</span>\
						<span class="cardpage_position">职位</span>\
					</div>\
					<div class="cardpage_auth_content" style="-webkit-animation: fadeInLeft .5s ease 1.2s 1 both;">\
						<span class="cardpage_auth">未实名认证</span>\
					</div>\
					<div class="cardpage_company" style="-webkit-animation: fadeInLeft .5s ease 1.4s 1 both;">公司名称</div>\
				</div>\
				<div class="cardpage_body">\
					<a class="cardpage_body_item cardpage_phone" style="-webkit-animation: zoomIn .8s ease 1.7s 1 both;">\
						<div class="cardpage_body_icon"></div>\
						<div class="cardpage_body_text">拨打电话</div>\
					</a>\
					<a class="cardpage_body_item cardpage_wechat" style="-webkit-animation: zoomIn .8s ease 1.7s 1 both;">\
						<div class="cardpage_body_icon"></div>\
						<div class="cardpage_body_text">添加微信</div>\
					</a>\
					<a class="cardpage_body_item cardpage_shop" style="-webkit-animation: zoomIn .8s ease 1.7s 1 both;">\
						<div class="cardpage_body_icon"></div>\
						<div class="cardpage_body_text">进入微店</div>\
					</a>\
				</div>\
				<div class="cardpage_foot" style="-webkit-animation: fadeInUp .5s ease 2.2s 1 both;">\
					<a class="cardpage_foot_link">我也要在这里推广</a>\
				</div>\
				<div class="vcard_mask">\
					<div class="vcard_mask_body">\
						<div class="vcard_mask_main"><div style="margin-bottom: .3rem;">资料还未完善，朋友们都联系不到你了</div><a external href="/page/zmpal/namecard!edit.jsp" style="font-size: .8rem;color: #0cb9f2;">立即完善资料&gt;&gt;</a></div>\
					</div>\
				</div>';
	
	$(".cardpage_li").html(html);
	// $.ajax({
	// 	url:"/page/zmpal/namecardshare!getNameCardDetailById.jsp",
	// 	type:"post",
	// 	data:{cardId: cardId},
	// 	success:function(data){
	// 		if(data.result == "success"){
	// 			//分享标题
	// 			titleObj.name = data.name;
	// 			//区分是否选择公司
	// 			if(data.companyId){
	// 				titleObj.companyName = compObj[data.companyName];
	// 				/*if(forCompObj.indexOf(tjObj.sourceCid) != -1){
	// 					if(titleObj.companyName && titleObj.companyName != "undefined"){
	// 						shareTitle = "第"+ titleObj.total +"位"+ titleObj.companyName +"人，" + shareTitle;
	// 					}
	// 				}*/
	// 				$(".cardpage_shop").attr("href", "/page/zmpal/companyshare!index.jsp?userId=" + sid);
	// 			}else{
	// 				$(".cardpage_shop").attr("href", "/page/zmpal/namecardshare!detail.jsp?cardId=" + cardId);
	// 				$(".cardpage_shop .cardpage_body_text").text("进入微站");
	// 			}
	//
	// 			if(forCompObj.indexOf(tjObj.sourceCid) != -1){
	// 				if(titleObj.companyName && titleObj.companyName != "undefined"){
	// 					shareTitle = titleObj.companyName + titleObj.name + shareTitle;
	// 				}else{
	// 					shareTitle = titleObj.name + shareTitle;
	// 				}
	// 				seajs.use(['document_title.js?' + Math.random()], function(title){
	// 					title.init(shareTitle);
	// 				});
	// 				//微信分享配置
	// 				wx_share();
	// 			}
	//
	// 			$(".cardpage_face_main").attr("href", "/page/zmpal/namecardshare!detail.jsp?cardId=" + cardId);
	// 			//注册
	// 			$(document).on("click", ".cardpage_foot_link", function(){
	// 				_czc.push(["_trackEvent", "注册来源", "H5尾页注册"]);
	// 				location.href = guide_link;
	// 			});
	// 			$(".cardpage_phone").attr("href", "tel:" + data.phone);
	// 			if(data.picUrl.indexOf("zmpal.com") != -1 && data.picUrl.indexOf("@") == -1){
	// 				data.picUrl = data.picUrl + "@200w_200h";
	// 			}
	// 			if(data.wxPicCode.indexOf("zmpal.com") != -1 && data.wxPicCode.indexOf("@") == -1){
	// 				data.wxPicCode = data.wxPicCode + "@500w";
	// 			}
	// 			$(".cardpage_face").attr("src", data.picUrl);
	// 			$(".cardpage_name").text(data.name);
	// 			$(".cardpage_position").text(data.position.substr(0,6));
	// 			$(".cardpage_company").html(data.companyName.substr(0,14));
	// 			if(data.isPay == "yes"){
	// 				$(".cardpage_face_vip").removeClass("hidden");
	// 			}
	// 			if(data.isCert == "yes"){
	// 				$(".cardpage_auth").html("已实名认证").addClass("on");
	// 			}
	// 			//客服
	// 			$(".cardpage_wechat").attr({
	// 				"data-phone": data.phone,
	// 				"data-weixin": data.wxNo,
	// 				"data-iscert": data.isCert,
	// 				"data-ispay": data.isPay,
	// 				"data-comp": data.companyName,
	// 				"data-src": data.wxPicCode
	// 			});
	// 		}else{
	// 			$(".vcard_mask").show();
	// 		}
	// 	},
	// 	error:function(data){
	// 		$(".vcard_mask").show();
	// 	}
	// });
}
//名片二维码
// $(document).on("click", ".cardpage_wechat", function(){
// 	var t = $(this);
// 	var src = t.data("src");
// 	var weixin = t.data("weixin");
// 	var phone = t.data("phone");
// 	var iscert = t.data("iscert");
// 	var ispay = t.data("ispay");
// 	var comp = t.data("comp");
// 	if(ispay == "yes"){
// 		//付费二维码
// 		if($(".qrcode_menu_shiming").length <= 0){
// 			var qrcode_menu_mask = '<div class="qrcode_menu_mask qrcode_menu_shiming '+ (iscert == 'yes' ? 'yes' : '') +'">\
// 										<div class="qrcode_menu_main">\
// 											<div class="qrcode_shiming_comp overhidden1">公司：<span id="qrcodeComp"></span></div>\
// 											<span class="qrcode_menu_close"></span>\
// 											<div class="qrcode_shiming_number qrcode_shiming_weixin">\
// 											<span class="qrcode_shiming_numberspan qrcode_shiming_weixinspan">微信号：<span id="qrcodeWeixin"></span></span>\
// 											</div>\
// 											<div class="qrcode_shiming_number qrcode_shiming_phone">\
// 											<span class="qrcode_shiming_numberspan qrcode_shiming_phonespan">手机号：<span id="qrcodePhone"></span></span>\
// 											</div>\
// 											<img class="qrcode_shiming_img">\
// 											<img class="qrcode_shiming_king" src="//media.zmpal.com/zmpal/image/common/icon_king.gif">\
// 											<img class="qrcode_shiming_vip" src="//media.zmpal.com/zmpal/image/common/pdetail_jinpai.png">\
// 										</div>\
// 									</div>';
// 		}
// 	}else{
// 		//二维码弹层
// 		if($(".qrcode_menu_mask_contacts").length <= 0){
// 			var qrcode_menu_mask = '<div class="qrcode_menu_mask qrcode_menu_mask_contacts">\
// 										<div class="qrcode_menu_main">\
// 											<div class="qrcode_menu_info">\
// 												<div class="qrcode_menu_weixin">微信号：<span id="qrcodeWeixin"></span></div>\
// 												<div class="qrcode_menu_phone">手机号：<span id="qrcodePhone"></span></div>\
// 												<span class="qrcode_menu_close"></span>\
// 											</div>\
// 											<img src="" class="qrcode_menu_ewm">\
// 											<div class="qrcode_menu_savetips" style="text-align: center;">长按扫码添加好友</div>\
// 										</div>\
// 									</div>';
// 		}
// 	}
// 	$("body").append(qrcode_menu_mask);
// 	$(".qrcode_menu_weixin, .qrcode_menu_phone").show();
// 	$("#qrcodeWeixin").html(weixin);
// 	$("#qrcodePhone").html(phone);
// 	$("#qrcodeComp").html(comp)
// 	$(".qrcode_menu_mask_contacts, .qrcode_menu_shiming").show();
// 	$(".qrcode_menu_ewm, .qrcode_shiming_img").attr("src", src);
// });
// //视频弹层开启
// $(".video_area").live("click", function(){
// 	var t = $(this);
// 	var videourl = t.attr("videourl");
// 	var html = '<div class="video_mask page_effect lock">'+ videourl +'</div><a class="close_mask eqf-wrong"></a>';
// 	var parent = t.parent();
// 	while(parent.length > 0){
// 		if(parent.hasClass("edit_wrapper")){
// 			parent.after(html);
// 			audio.pause();
// 			$("#audio_btn").hide();
// 			$(".video_mask iframe").css({
// 				"position": "absolute",
// 				"height": "260px",
// 				"width": "100%",
// 				"top": "50%",
// 				"margin-top": "-130px"
// 			});
// 			break;
// 		}else{
// 			parent = parent.parent();
// 		}
// 	}
// });
// //视频弹层关闭
// $(".close_mask").live("click", function(){
// 	$(this).prev().remove();
// 	$(this).remove();
// 	$("#audio_btn").show();
// 	audio.play();
// });
//
// //微信分享配置
// function wx_share(){
// 	//通过ready接口处理成功验证
// 	wx.ready(function(){
// 		if(lineLink.indexOf("?") != -1){
// 			if(lineLink.indexOf("v=") != -1){
// 				var arr = lineLink.split("&");
// 			    for (var j in arr) {
// 			        var arr1 = arr[j].split("=");
// 			        if (arr1[0] == 'v') {
// 			        	if(arr1[1].trim() == 1){
// 			        		share_random += 1;
// 			        	}else{
// 			        		share_random = 2;
// 			        	}
// 			            lineLink = lineLink.replace("v=" + arr1[1].trim(), "v=" + share_random);
// 			        }
// 				}
// 			}else{
// 				lineLink += "&v=" + share_random;
// 			}
// 		}else{
// 			lineLink += "?v=" + share_random;
// 		}
//
// 		var shareObj = {};
// 		shareObj.title = shareTitle;
// 		shareObj.desc = descContent;
// 		shareObj.link = lineLink;
// 		shareObj.imgUrl = imgUrl;
// 		shareObj.success = function(){
// 			if(getQueryString("v")){
// 				tjObj.type = "twiceShare";
// 			}else{
// 				tjObj.type = "share";
// 			}
// 			//统计分享类型
// 			h5_tongjiFunction(tjObj);
// 		}
// 		console.log(shareObj)
//
// 	    wx.onMenuShareAppMessage(shareObj);
// 		wx.onMenuShareTimeline(shareObj);
// 		wx.onMenuShareQZone(shareObj);
// 		wx.onMenuShareQQ(shareObj);
// 		wx.onMenuShareWeibo(shareObj);
// 	});
// }
// //统计数据记录
// function h5_tongjiFunction(tjObj){
// 	var database = window.localStorage;
// 	var datakey = tjObj.source + '_' + tjObj.type + '_' + tjObj.sourceCid;
// 	var dataitem = database.getItem(datakey);
// 	if(!dataitem){
// 		database.setItem(datakey, 1);
// 		$.ajax({
// 			type: "post",
// 	        url: "/page/zmpal/statisticshare!stat.jsp",
// 	        data: tjObj,
// 	        success: function(data){
// 	        	if(data.result == "success"){
//
// 	        	}
// 	        },
// 	        error: function(){
// 	        	hideloading();
// 	        }
// 	 	});
// 	}
// }
