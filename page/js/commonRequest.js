var CommonRequest = {
	//post请求
	postRequest: function (url, params, sucCallback, errCallback) {
		if (params.action == undefined) {
			alert('接口入参的action为空!');
			return false;
		}
		var layerIdx = -1;
		layer.open({
			type: 2,
			shadeClose: false,
			content: '加载中...',
			success: function (elem) {
				layerIdx = elem.getAttribute('index');
				console.log(elem);
			}
		});
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			success: function (data, textStatus, xmlHttpRequest) {
				console.log('params:' + JSON.stringify(params));
				console.log(data);
				sucCallback(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert('调用接口：' + url + '失败!');
				//errCallback(data);
			},
			complete: function (XMLHttpRequest, textStatus) {
				// var index = parent.layer.getFrameIndex(window.name);
				layer.close(layerIdx);
				// layer.closeAll();
			}
		});
	},
	//get请求
	getRequest: function (url, params, sucCallback, errCallback) {
		if (params.action == undefined) {
			alert('接口入参的action为空!');
			return false;
		}
		layer.open({
			type: 2,
			shadeClose: false,
			content: '加载中...'
		});
		//获得code ,调用请求，获得userID
		$.ajax({
			type: "GET",
			url: url,
			data: params,
			//+ "&code=" + code,
			success: function (data) {
				sucCallback(data);
			},
			error: function (data) {
				alert('调用接口：' + url + '失败!');
				errCallback(data);
			},
			complete: function (XMLHttpRequest, textStatus) {
				layer.closeAll();
			}
		});
	}
};


