/**
 * 加载动画
 * @param str string 提示文字
 */
function showProgress (str){
    var template = document.createElement('div');
    var loadingText = str ? '<div class="text">' + str + '</div>' : '';
    var str = '<div class="container"><div class="loader"></div>' + loadingText + '</div>';
    template.id = 'loading';
    template.innerHTML = str;
    document.body.appendChild(template);
}
/**
 * 隐藏加载动画
 */
function hideProgress (){
    var object = document.getElementById('loading');
    if(object) document.body.removeChild(object);
}
/**
 * 提示框
 * @param msg 描述
 * @param state 状态
 * @param timeout 隐藏时间
 * @param dom 要插入到的元素
 */
function showMsg (msg,state,timeout,dom){
    hideProgress();
    var state = state || 0,timeout = timeout || 1000,dom = dom || 'body';
    var icon = '',bgColor = '',pos = dom == 'body' ? 'fixed' : 'absolute';
    if(state == 0){
        bgColor = 'background:rgba(255,0,0,0.6)';
        icon = '<span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(45deg);"></span><span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(-45deg);"></span>';
    }else{
        bgColor = 'background:rgba(0,0,0,0.6)';
        icon = '<span style="position:absolute;top:18px;left:10px;width:24px;height:2px;background:#fff;transform:rotate(-45deg);"></span><span style="position:absolute;top:22px;left:2px;width:14px;height:2px;background:#fff;transform:rotate(45deg);"></span>';
    }
    var template = '<div id="msgBox" style="position:' + pos + ';top:50%;left:50%;width:160px;padding:10px;margin-left:-90px;' + bgColor +  ';border-radius:4px;transform:scale(0);transition:transform 0.2s linear;z-index:999;">' +
        '<div class="icon" style="position:relative;width:36px;height:36px;border-radius:50%;border:2px solid #fff;margin:0 auto;">' + icon + '</div>' +
        '<div class="msg" style="padding:8px 0;text-align:center;color:#fff;">' + msg + '</div>' +
        '</div>';
    $(template).appendTo($(dom));
    setTimeout(function (){
        var ih = ($('#msgBox').height() + 20)/1;
        $('#msgBox').css({'margin-top':-ih,'transform':'scale(1)'});
    },100);
    setTimeout(function (){
        $('#msgBox').remove();
    },timeout + 1000);
}
/**
 * actionSheet
 * @param title string 标题
 * @param btns json [{t:'标题',u:'链接'},{...}] 按钮列表
 * @param callback function 回调函数
 */
function actionSheet (title,btns,callback){
    if(typeof btns != 'object' || $('#action').size() > 0) return;
    var names,theight,buttons = '';
    if(title == ''){
        names = '',theight = (btns.length + 1) * 50 + 10;
    }else{
        names = '<div class="title">' + title + '</div>',theight = (btns.length + 2) * 50;
    }
    for(var i = 0;i < btns.length;i ++){
        buttons += '<a href="javascript:;" data-url="' + (btns[i].u || '') + '">' + btns[i].t + '</a>';
    }
    buttons += '<a href="javascript:;" class="cancel">取消</a>';
    var template = '<div id="action"><div class="mask"></div><div class="button">' + names + '<div class="btns">' + buttons + '</div></div></div>';
    $('body').append(template);
    setTimeout(function (){
        $('#action .mask').css({'opacity':'0.6'}).next().css({
            'transform' : 'translateY(-' + theight + 'px)',
            '-webkit-transform' : 'translateY(-' + theight + 'px)'
        });
    },50);
    $('#action').click(function (e){
        if(e.target.tagName == 'A' && typeof callback == 'function'){
            var index = $(e.target).index(),url = $(e.target).attr('data-url');
            callback(index,url);
        }
        $('#action .mask').css({'opacity':'0'}).next().css({
            'transform' : 'translateY(0)',
            '-webkit-transform' : 'translateY(0)'
        });
        setTimeout(function (){$('#action').remove();},200);
    });
}
/**
 * 弹窗组件
 * @param title string 标题
 * @param text string 内容
 * @param btns json [{},{}] 按钮
 * @param callback function 回调函数
 */
function showAlert (title,text,btns,callback){
    var name = title != '' ? '<div class="title">' + title + '</div>' : '';
    var button = '';
    for(var h = 0;h < btns.length;h++){
        var url = btns[h].u || 'javascript:;',w = 100 / btns.length;
        button += '<a href="'+url+'" class="btns" data-url="' + url + '" style="width:' + w + '%">' + btns[h].t + '</a>';
    }
    var template = '<div id="alert">' +
        '<div class="mask" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>' +
        '<div class="content">' +
        name +
        '<div class="flex center text">' + text + '</div>' +
        '<div class="flex end button">' + button + '</div>' +
        '</div>' +
        '</div>';
    $('body').append(template);
    var offset = {'height':$('#alert .content').height(),'width': $('#alert .content').width()};
    $('#alert .content').css({
        'margin' : parseInt(-offset.height/2) + 'px 0 0 ' + parseInt(-offset.width/2) + 'px',
        'transform' : 'scale(0)',
        '-webkit-transform' : 'scale(0)'
    });
    setTimeout(function (){
        $('#alert .content').css({
            'visibility' : 'visible',
            'transform' : 'scale(1)',
            '-webkit-transform' : 'scale(1)'
        });
    },200);
    $('#alert .button a').click(function (){
        $('#alert').removeClass('show');
        setTimeout(function (){$('#alert').remove();},200);
        var index = $(this).index(),url = $(this).attr('data-url');
        if(typeof callback == 'function') callback(index,url);
    });
    $('#alert .mask').click(function (){
        $('#alert').removeClass('show');
        setTimeout(function (){$('#alert').remove();},200);
    });
}
/**
 * 图片自适应盒子
 * @param obj 图片对象
 */
function imageReady (obj){
    var style = getComputedStyle(obj,'');
    if(style.position != 'absolute') return;
    var w = obj.parentNode.offsetWidth,h = obj.parentNode.offsetHeight;
    var boxScale = w / h,imgScale = obj.width / obj.height;
    if(boxScale >= 0){
        // 盒子正方形
        if(parseInt(imgScale) <= 0){
            // 图片宽小于等于高
            obj.width = w,obj.height = parseInt(w / imgScale);
            obj.style.top = Math.floor((h - obj.height) / 2) + 'px';
        }else{
            // 图片宽大于高
            obj.height = h,obj.width = parseInt(h * imgScale);
            obj.style.left = Math.floor((w - obj.width) / 2) + 'px';
        }
    }else{
        // 盒子宽小于高
        if(parseInt(imgScale) >= 0){
            // 图片宽大于等于高
            obj.height = h,obj.width = parseInt(h * imgScale);
            obj.style.width = Math.floor((w - obj.width) / 2) + 'px';
        }else{
            // 图片宽小于高
            obj.width = w,obj.height = parseInt(w / imgScale);
            obj.style.top = Math.floor((h - obj.height) / 2) + 'px';
        }
    }
}
/**
 * 设置cookie
 * @parma name  cookie的名称
 * @param value cookie的值
 * @param time  cookie过期时间
 */
function setCookie(name,value,time){
    if(time){
        var exp = new Date();
        exp.setTime(exp.getTime() + time * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
    }else{
        document.cookie = name + "=" + escape(value) + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
}
/**
 * 获取cookie
 * @parma name  cookie的名称
 */
function getCookie(name){
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
/**
 * 删除获取cookie
 * @parma name  cookie的名称
 */
function deleteCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/**
 * 短信验证码定时器
 * @param obj 发送按钮
 * @param html 设置文字
 * @param interval 间隔时间
 * @param cls 移除元素设置的class
 */
function smsTimer(obj,html,interval,cls){
    obj.html(html+'(' + interval + ')');
    interval --;
    var time = setInterval(function (){
        if(interval == 0){
            obj.attr('style','').removeClass(cls).text(html);
            clearInterval(time);
        }else{
            obj.text(html + '(' + (interval --) + ')');
        }
    },1000);
}
/**
 * 获取链接的host
 */
function getHost(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}
/**
 * get参数转 post参数
 * @param paramstr [附加参数]
 * @param url [get链接]
 */
function searchToJson(paramstr,url){
    //if(paramstr == '') return {};
    var url = url || window.location.search;
    var newurl = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1) : '';
    var urlstr = (newurl == '') ? paramstr : newurl + '&' + paramstr;
    var arr = urlstr.split('&'),newarr = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == '') continue;
        var strarr = arr[i].split('=');
        var arrstr = '"' + strarr[0] + '":"' + (strarr[1] || '') + '"';
        newarr.push(arrstr);
    }
    return JSON.parse('{' + newarr.join(',') + '}');
}
/**
 * ajax分页
 * @param url [请求地址]
 * @param outerBox [外部容器]
 * @param innerBox [列表容器]
 */
function ajaxPages(url,outerBox,innerBox,listBox,loader){
    if(url == '' || $(outerBox).size() == 0 || $(innerBox).size() == 0) return false;
    var ih = $(outerBox).height(),lh = $(innerBox).height();
    var listBox = listBox || innerBox;
    if(lh > ih){
        var loadBtn = false,page = 1,canload = true;
        $(outerBox).on('scroll',function (){
            if(!canload || lh < ih) return;
            var h = $(this).scrollTop();
            if(lh - Math.ceil(ih + h) <= 1){
                if(loadBtn) return;
                loadBtn = true;
                page++;
                var st = $(outerBox).scrollTop();
                var loadTpl = '<div id="more" class="flex center"><i></i><span>正在加载..</span></div>';
                $(loadTpl).appendTo($(loader || listBox));
                $(outerBox).scrollTop(st);
                var post = searchToJson('page=' + page);
                $.post(url,post,function (ret){
                    if(ret.status == 1){
                        $(listBox).append(ret.info);
                        $('#more').remove();
                        lh = $(innerBox).height();
                    }else{
                        canload = false;
                        $('#more').html('<span>' + ret.info + '</span>');
                    }
                    $(outerBox).scrollTop(st);
                    loadBtn = false;
                },'json');
            }
        });
    }
}

/**
 * 打开裁剪框
 * @param id 裁剪框dom id
 * @param cid 裁剪区域dom id
 * @param callback 回调函数
 */
function showCliper (id,cid,title,callback){
    var template = '<div id="' + id.replace('#','') + '" class="cliper">' +
        '<div class="header">' +
        '<a href="javascript:;" class="side cancel">取消</a>' +
        '<div class="title">' + title + '</div>' +
        '<a href="javascript:;" class="side confirm">确定</a>' +
        '</div>' +
        '<div class="cliperbox" id="' + cid.replace('#','') + '"></div>' +
        '</div>';
    $(template).appendTo($('body'));
    if(typeof callback == 'function') callback(id,cid,id +' .confirm');
    $(id).find('.cancel').click(function (){
        $(id).css('opacity',0);
        setTimeout(function (){$(id).css('z-index',-1);},500);
    });
}

/**
 * 定制成功界面
 * @param img  要插入的图片地址
 * @param text 需要填写的内容
 * @param modu 要查看的模板地址
 */
function customSuccess(img,text,modu) {
    const html = `<div id="succeed" class="flexv wrap">
            <div class="win"><img src="${img}" class="fitimg"></div>
            <div class="s-text">${text}</div>
            <div class="flexitemv endvc backbox">
                <a href="${modu}" class="flex center check-btn">查看我的定制模板</a>
                <a href="index.html" class="flex center check-btn">返回首页</a>
            </div>
        </div>`;
    $('body').append(html);
}