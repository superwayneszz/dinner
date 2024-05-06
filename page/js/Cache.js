/*
 * 本文件用于定义扫码系统模块的缓存字段
 */
var Cache = {
    //====================订餐相关=========================
    //登录用户信息
    USERINFO_CACHE: function (inputData) {
        console.log("USERINFO_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("USERINFO_CACHE");
            } else {
                storage.setItem("USERINFO_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("USERINFO_CACHE");
        }
    },
    //判断当天是否为工作日
    ISWORKDAY_CACHE: function (inputData) {
        console.log("ISWORKDAY_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("ISWORKDAY_CACHE");
                //appcan.locStorage.remove("ISWORKDAY_CACHE");
            } else {
                storage.setItem("ISWORKDAY_CACHE", inputData);
                // storage.setItem("ISWORKDAY_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("ISWORKDAY_CACHE");
            //return appcan.getLocVal("ISWORKDAY_CACHE");
        }
    },
    //存储部门信息
    DEPARTINFO_CACHE: function (inputData) {
        console.log("DEPARTINFO_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("DEPARTINFO_CACHE");
            } else {
                storage.setItem("DEPARTINFO_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("DEPARTINFO_CACHE");
        }
    },
    //缓存是否可以订餐
    ISENABLEEAT_CACHE: function (inputData) {
        console.log("ISENABLEEAT_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("ISENABLEEAT_CACHE");
            } else {
                storage.setItem("ISENABLEEAT_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("ISENABLEEAT_CACHE");
        }
    },
    //就餐地点信息
    MEALPLACE_CACHE: function (inputData) {
        console.log("MEALPLACE_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("MEALPLACE_CACHE");
            } else {
                storage.setItem("MEALPLACE_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("MEALPLACE_CACHE");
        }
    },
    //订餐数量信息
    MEALCNT_CACHE: function (inputData) {
        console.log("MEALCNT_CACHE>>" + inputData);
        var storage = window.sessionStorage;
        //写入数据
        if (inputData) {
            //当输入值为"@emptydata"时，清空缓存数据
            if (inputData == "@emptydata") {
                storage.removeItem("MEALCNT_CACHE");
            } else {
                storage.setItem("MEALCNT_CACHE", inputData);
            }
        }
        //读取数据
        else if (!inputData) {
            return storage.getItem("MEALCNT_CACHE");
        }
    }
};
