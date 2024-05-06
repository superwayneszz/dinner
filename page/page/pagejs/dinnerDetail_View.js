var DinnerDetailView = {
    //设置动画
    mealAnimation: function () {
        var idx = 0;
        var urlArr = [{
            "url": "../css/mycss/img/animate1.png"
        }, {
            "url": "../css/mycss/img/animate2.jpg"
        }, {
            "url": "../css/mycss/img/animate3.jpg"
        }];
        var backgroundStr = "";
        var aniObj = setInterval(function () {
            idx = parseInt(idx % 3);
            backgroundStr = "url('" + urlArr[idx].url + "') no-repeat center center";
            $("#mealAni").css({
                "background": backgroundStr,
                "background-size": "100%"
            });
            $("#mealAni").fadeIn(200);
            $("#mealAni").fadeOut(200);
            idx++;
        }, 500);
    }
};
