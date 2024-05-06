var commonFunctions = {
    //获取当前时间
    getCurrentDate: function () {
        //'2017','9','4','18'
        //'2018','2','2','13'
        return new Date();
    },
    //拿到企业微信的code 信息
    getQYWXCode: function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    //获取当前登录用户工号
    getUserInfo: function () {
        var userInfo = Cache.USERINFO_CACHE();
        //session里面没有值的话
        if (userInfo == null || userInfo == "" || userInfo == "null") {
            commonFunctions.message({
                content: "无法获取当前登录用户工号，请检查网络~"
            });
            return false;
        } else {
            userInfo = JSON.parse(userInfo);
            return userInfo;
        }
    },
    //从后台获取用户信息
    getUserInfoByEmpId: function (empId, callback) {
        var params = {
            'action': 'getEmpInfoByEmpId',
            'empId': empId
        };
        CommonRequest.postRequest(configMasUrl.bookDinner, params, function (response) {
            console.log(response);
            response = JSON.parse(response);
            if (response.status == '1') {
                var data = response.data;
                if (data.length > 0) {
                    data = data[0];
                    callback(data);
                } else {
                    commonFunctions.message({
                        content: "从后台获取用户信息失败！"
                    });
                    callback(null);
                }
            } else {
                commonFunctions.message({
                    content: "从后台获取用户信息失败！"
                });
                callback(null);
            }
        }, function (data) {
            commonFunctions.message({
                content: "从后台获取用户信息失败！"
            });
            callback(null);
        });
    },
    //根据code初始化用户信息
    initUserInfoByCode: function (sucCallback, errCallback) {
        // var storage = window.sessionStorage;
        var userInfo = Cache.USERINFO_CACHE();

        // //测试用
        // userInfo = {
        //     userId: '61940',
        //     fullName: '徐洋',
        //     departCode: '0001',
        //     departName: '部门'
        // };
        // Cache.USERINFO_CACHE(JSON.stringify(userInfo));
        // sucCallback(userInfo);
        // //测试用

        //session里面没有值的话
        if (userInfo == null || userInfo == "" || userInfo == "null") {
            var Request = new Object();
            Request = commonFunctions.getQYWXCode();
            var code = Request["code"];
            //获得code ,调用请求，获得userID
            var params = {
                'action': 'getWxUserIdCommon',
                'agentId': appConfig.wxConfig.agentId,
                'systemName': appConfig.wxConfig.systemName,
                'code': code
            };
            CommonRequest.postRequest(configMasUrl.guzi, params, function (response) {
                console.log(response);
                // var response = JSON.parse(response);
                if (response.success == true) {
                    var data = response.data;
                    commonFunctions.getUserInfoByEmpId(data.UserId, function (responseUserInfo) {
                        if (null != responseUserInfo) {
                            //写入登录用户信息的缓存
                            userInfo = {
                                userId: responseUserInfo.empId,
                                fullName: responseUserInfo.empName,
                                departCode: responseUserInfo.departCode,
                                departName: responseUserInfo.departName
                            };
                            Cache.USERINFO_CACHE(JSON.stringify(userInfo));
                            sucCallback(userInfo);
                        }
                    });

                } else {
                    commonFunctions.message({
                        content: "根据code获取当前登录用户工号失败！"
                    });
                    sucCallback(null);
                }
            }, function (data) {
                commonFunctions.message({
                    content: "无法根据code获取当前登录用户工号，请检查网络~"
                });
                sucCallback(null);
            });
        } else {
            //非第一次登陆
            userInfo = JSON.parse(userInfo);
            sucCallback(userInfo);
        }
    },

    //提示框,3秒关闭，无回调
    message: function (input) {
        layer.open({
            title: [
                input.title || '提示',
                'background-color:#003b90; color:#fff; font-weight:600; text-align:left'
            ],
            time: 3,
            type: 0,
            maxmin: true,
            shadeClose: true,
            content: input.content || '',
            style: "font-size:18px; "
        });
    },

    //提示框,3秒关闭
    messagecallback: function (input, callback) {
        layer.open({
            title: [
                input.title || '提示',
                'background-color:#003b90; color:#fff; font-weight:600; text-align:left'
            ],
            time: 3,
            type: 0,
            maxmin: true,
            shadeClose: false,
            content: input.content || '',
            style: "font-size:18px; ",
            end: function (elem) {
                callback();
            }
        });
    },

    //信息框
    alert: function (input) {
        if (input.btns.length == 1) {
            layer.open({
                title: [
                    input.title || '提示',
                    'background-color:#003b90; color:#fff; font-weight:600; text-align:left'
                ],
                type: 0,
                maxmin: true,
                shadeClose: false,
                content: input.content,
                style: "font-size:18px; ",
                btn: input.btns,
                yes: function (index) {
                    layer.close(index);
                }
            });
        }
    },

    //确认框
    confirm: function (input, callback) {
        var params = null;

        if (input.btns.length > 0 && input.btns.length <= 2) {
            params = {
                title: [
                    input.title || '提示',
                    'background-color:#003b90; color:#fff; font-weight:600; text-align:left'
                ],
                type: 0,
                maxmin: true,
                shadeClose: false,
                content: input.content,
                style: "font-size:18px; ",
                btn: input.btns,
                yes: function (index) {
                    callback({
                        status: true
                    });
                    // location.reload();
                    layer.close(index);
                },
                no: function (index) {
                    callback({
                        status: false
                    });
                    layer.close(index);
                }
            };
            //询问框
            layer.open(params);
        } else {
        }
    },

    //打开新页面
    openWin (url) {
        window.open(url, '_self', '', false);
    },
    //返回按钮实现，关闭当前页面
    closeWin (pageIdx) {
        window.history.go(pageIdx);
    }
};
