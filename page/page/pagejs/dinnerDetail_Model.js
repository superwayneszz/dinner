var DinnerDetailModel = {
    //编辑信息  1 编辑    0 删除  2吃好饭
    editDinner: function (type, callback) {
        var bookNum = 0;
        var bookMarks = "";
        var isHelpOthers = 0;
        if ($('input[id="divCkb"]').prop("checked")) {
            //帮别人订餐
            isHelpOthers = 1;
            //帮助厂商预定数量
            bookNum = $.trim($("#numInput2").val());
            if (!bookNum) {
                commonFunctions.message({
                    content: "请填写厂商预定份数"
                });
                return false;
            }
            //如果帮助了厂商订饭，必须写备注
            bookMarks = $.trim($("#marksInput").val());
            if (!bookMarks) {
                commonFunctions.message({
                    content: "请填写订餐备注"
                });
                return false;
            }
        }
        var userInfo = commonFunctions.getUserInfo();
        var params = {
            "action": 'editMeal',
            'empID': userInfo["userId"],
            'mealCount': 1,
            'isHelpOthers': isHelpOthers,
            'helpOthersMealsCount': bookNum,
            "remark": bookMarks,
            "isEnable": type
        };
        CommonRequest.postRequest(configMasUrl.bookDinner, params, function (data) {
            var json = JSON.parse(data);
            var status = json.status;
            if (status == "1") {
                callback(status);
            } else {
                //询问框
                commonFunctions.confirm({
                    title: "错误",
                    content: "更新失败，请检查网络~",
                    btns: ['确定']
                }, function (data) {
                    commonFunctions.closeWin(-1);
                });
            }
        }, function (data) {
            //询问框
            commonFunctions.confirm({
                title: "错误",
                content: "更新失败，请检查网络~",
                btns: ['确定']
            }, function (data) {
                commonFunctions.closeWin(-1);
            });
        });
    }
};
