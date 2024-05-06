/*------------------------------------------------------------
// Copyright (C) 2016
// 文件名：
// 文件功能描述：项目通用  函数
// 创 建 人： Mark
// 修 改 人：
// 修改日期：
// 修改描述：
//-----------------------------------------------------------*/

// 获取系统平台
var winPlat = window.navigator.platform;

// 判断是否为手机（仅相对于模拟器）
var isPhone = !(winPlat == 'Win32' || winPlat == 'Win64' || winPlat == 'MacIntel' || winPlat == 'Linux i686' || winPlat == 'Linux x86_64');

// 判断是否为安卓f
var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false;

// 判断是否为IOS
var isIOS = (winPlat == 'iPad' || winPlat == 'iPod' || winPlat == 'iPhone');

/**
 * toast提示框 800
 */
function $toast(mes, t) {
    uexWindow.toast( t ? '0' : '1', '5', mes, t ? t : 0);
}

/**
 * 手动关闭加载框
 */
function $closeToast() {
    uexWindow.closeToast();
}

/*
 * 设置缓存
 * @param key:要保存的键，key如果是数组，就会把数组中每个键值对都保存起来，如果是对象则会把对象里面每个  键值对都保存起来
 * @param val:要保存对应的值
 */
function setLocVal(key, value) {
    try {
        // 存储本地缓存
        appcan.setLocVal(key, value);
    } catch(ex) {

    }
}

/*
 * 获取key保存在localStorage中对应的值
 * @param key:要获取值的键值
 */
function getLocVal(key) {
    try {
        if (appcan.getLocVal(key)) {
            return appcan.getLocVal(key);
        }
    } catch(ex) {

    }
}

/*
 * 清除localStorage中对应的值
 * @param key:要清除值的健名
 * 注意：如果为空会清空整个存储
 */
function clearLocVal(key) {
    if (key) {
        appcan.locStorage.remove(key);
    } else {
        /**
         * 清空存储的本地缓存
         */
        appcan.locStorage.remove();
    }
}

/**
 * 在其他窗口中执行指定主窗口中的代码
 * @param String wn  需要执行代码窗口的名称
 * @param String scr 需要执行的代码
 */
function uescript(wn, scr) {
    appcan.window.evaluateScript(wn, scr, '0');
}

/**
 * 在其他窗口中执行指定浮动窗口中的代码
 * @param String wn  需要执行代码浮动窗口所在的主窗口的名称
 * @param String pn  需要执行代码的浮动窗口的名称
 * @param String scr 需要执行的代码
 */
function ueppscript(wn, pn, scr) {
    appcan.window.evaluatePopoverScript(wn, pn, scr);
}

/**
 * 判断是否为空
 */
function isDefine(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof (value) == 'undefined' || value == '[]') {
        return false;
    } else {
        value = value + "";
        value = value.replace(/\s/g, "");
        if (value == "") {
            return false;
        }
        return true;
    }
}

/**
 *获得当前年月,demo:2016年09月
 */
function showYMDate(args) {
    var str = '';
    var mydate = new Date(args);
    str += mydate.getFullYear() + "年";
    str += (mydate.getMonth() + 1) + "月";
    return str;
}

/**
 *获得一周的日期号数组    date [29, 30, 31, 1, 2, 3, 4]
 */
function showOWDate(args) {
    //当周星期一的日期对象
    var d=getMonDateH(args);
    var arr=[];
    //从周一开始往后加7天，获取一周的日期
    for(var i=0; i<7; i++)
    {
        arr.push(d.getDate());
        //+1天继续循环
        d.setDate(d.getDate()+1);
    }
    return arr;
}
/**
 *获得一周的日期并format    
date ["20160829", "20160830", "20160831", "20160901", "20160902", "20160903", "20160904"]
 */
function getOWDate(args) {
    //当周星期一的日期对象
    var d=getMonDateH(args);
    var arr=[];
    //从周一开始往后加7天，获取一周的日期
    for(var i=0; i<7; i++)
    {
        var month = d.getMonth()+1;
        var date = d.getDate();
        if(month<10){
            month = '0'+month;
        }
        if(date<10){
            date = '0'+date;
        }
        arr.push(''+d.getFullYear()+month+date);
        //+1天继续循环
        d.setDate(d.getDate()+1);
    }
    return arr;
}
// function showYMDate(args) {
    // var str = '';
    // var mydate = new Date();
    // str += args.getFullYear() + "年";
    // str += (args.getMonth() + 1) + "月";
    // return str;
// }
/**
 *获得当前日期,demo:9月10日
 */
function showDate() {
    var str = '';
    var mydate = new Date();
    str += (mydate.getMonth() + 1) + "月";
    str += mydate.getDate() + "日";
    return str;
}

/**
 *获得当前周数,demo:'37'
 */
function getWeekNumber() {
    d = new Date();
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    var getWeekNo = weekNo;
    return '周'+getWeekNo;
}
/**
 *获得当前周数,有入参,demo:'37'
 */
function getWeekNumberH(args) {
    d = new Date(args);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    var getWeekNo = weekNo;
    return '周'+getWeekNo;
}
/**
 *获得当前星期数,demo:星期六
 */
function showCrtDay() {
    var day = new Date(Date.parse(new Date()));
    var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    return today[day.getDay()];
}

/**
 *获取当周周一的日期
 */
function getMonDate()
{
    var d=new Date(),
    day=d.getDay(),
    date=d.getDate();
    if(day==1){
        return d;
    }
    if(day==0){
        d.setDate(date-6);
    }else{
        d.setDate(date-day+1);
    }
    return d;
}
/**
 *获取当周周一的日期,有入参args
 */
function getMonDateH(args)
{
    var d=new Date(args),
    day=d.getDay(),
    date=d.getDate();
    if(day==1){
        return d;
    }
    if(day==0){
        d.setDate(date-6);
    }else{
        d.setDate(date-day+1);
    }
    return d;
}
/**
 *日期format  demo  20160912
 */
function dateFormat(args)
{
    var year = args.getFullYear();
    var month = args.getMonth()+1;
    if(month<10){
        month = '0'+month;
    }
    var day = args.getDate();
    if(day<10){
        day = '0'+day;
    }
    return ''+year+month+day;
}

/**
 *渲染一周的日期(_号)
 * 入参:Date类型
 */
function rendWeek(theTime){
    $("#weekDay div").removeClass("selected");
    var dateArray = showOWDate(theTime);
    var getDate = getOWDate(theTime);
    var date = new Date();
    var date_ = new Date(theTime);
    if(date.getFullYear() == date_.getFullYear()&&date.getMonth()==date_.getMonth()){
        //判断日期,添加selected样式
        if(dateArray[0] == date.getDate()){
            $("#Monday").addClass('selected');
        }else if(dateArray[1] == date.getDate()){
            $("#Tuesday").addClass('selected');
        }else if(dateArray[2] == date.getDate()){
            $("#Wednesday").addClass('selected');
        }else if(dateArray[3] == date.getDate()){
            $("#Thursday").addClass('selected');
        }else if(dateArray[4] == date.getDate()){
            $("#Friday").addClass('selected');
        }else if(dateArray[5] == date.getDate()){
            $("#Saturday").addClass('selected');
        }else if(dateArray[6] == date.getDate()){
            $("#Sunday").addClass('selected');
        }
    }    
    // var date = new Date(theTime);
    // //判断日期,添加selected样式
    // if(dateArray[0] == date.getDate()){
        // $("#Monday").addClass('selected');
    // }else if(dateArray[1] == date.getDate()){
        // $("#Tuesday").addClass('selected');
    // }else if(dateArray[2] == date.getDate()){
        // $("#Wednesday").addClass('selected');
    // }else if(dateArray[3] == date.getDate()){
        // $("#Thursday").addClass('selected');
    // }else if(dateArray[4] == date.getDate()){
        // $("#Friday").addClass('selected');
    // }else if(dateArray[5] == date.getDate()){
        // $("#Saturday").addClass('selected');
    // }else if(dateArray[6] == date.getDate()){
        // $("#Sunday").addClass('selected');
    // }
    //周:日期赋值
    $("#Monday").html(dateArray[0]);
    $("#Tuesday").html(dateArray[1]);
    $("#Wednesday").html(dateArray[2]);
    $("#Thursday").html(dateArray[3]);
    $("#Friday").html(dateArray[4]);
    $("#Saturday").html(dateArray[5]);
    $("#Sunday").html(dateArray[6]);
    
    $("#Monday").attr('data',getDate[0]);
    $("#Tuesday").attr('data',getDate[1]);
    $("#Wednesday").attr('data',getDate[2]);
    $("#Thursday").attr('data',getDate[3]);
    $("#Friday").attr('data',getDate[4]);
    $("#Saturday").attr('data',getDate[5]);
    $("#Sunday").attr('data',getDate[6]);
}
/**
 *获取一个月前的今天的日期.
 * 入参:Date类型
 * return:Date()
 */
function getPreMonth(dt){
    if (typeof dt == 'undefined'){
        dt = new Date(); 
    }  
    var y = (dt.getMonth() == 0) ? (dt.getFullYear() - 1) : dt.getFullYear();  
    var m = (dt.getMonth() == 0) ? 11 : dt.getMonth() - 1;  
    var preM = getDayOfMonth(y,m);
    var d = (preM < dt.getDate()) ? preM : dt.getDate();  
    return new Date(y, m, d);
}
/**
 *获取一个月后的今天的日期.
 * 入参:Date类型
 * return:Date()
 */
function getNextMonth(dt){
    if ( typeof dt == 'undefined') {
        dt = new Date();
    }
    var y = (dt.getMonth() == 11) ? (dt.getFullYear() + 1) : dt.getFullYear();
    var m = (dt.getMonth() == 11) ? 0 : dt.getMonth() + 1;
    var preM = getDayOfMonth(y, m);
    var d = (preM < dt.getDate()) ? preM : dt.getDate();
    return new Date(y, m, d);
}
function getDayOfMonth(y,m){ 
    if ( typeof(y) == 'undefined') {
        y = (new Date()).getFullYear();
    }
    if ( typeof(m) == 'undefined') {
        m = (new Date()).getMonth();
    }
    var Feb = (y % 4 == 0) ? 29 : 28;
    var aM = new Array(31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    return aM[m];

}

function includeVoiceRec(fileUrl, contentID, cbFn){
    $.ajax({
        url: fileUrl,
        async: false,
        success: function (ret) {
            $("#"+contentID).html($.trim(ret));
            //alert(ret);
            appcan.window.subscribe("uexXunfei.onRecognizeError",function(info){
                onRecognizeError(info);
            });
            appcan.window.subscribe("uexXunfei.onBeginOfSpeech",function(info){
                onBeginOfSpeech(info);
            });
            appcan.window.subscribe("uexXunfei.onEndOfSpeech",function(info){
                onEndOfSpeech(info);
            });
            appcan.window.subscribe("uexXunfei.onRecognizeResult",function(info){
                //非undefined并且非"undefined"
                if(typeof(info) != "undefined"&& info!="undefined"){
                    onRecognizeResult(info);
                }
            });
            
            if (typeof (cbFn) == "function") {
                cbFn(ret);
                return;
            }
        }, error: function (s,e,t) { }
    });
}