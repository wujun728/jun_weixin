var Promise = require('./utils/es6-promise.min.js').Promise;
App({
	onLaunch: function () {
		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
	},
	getUserInfo:function(cb){
		var that = this
		console.log(this.globalData.userInfo);
		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
		} else {
			login(that, cb);
		}
	},
	globalData:{
		userInfo:null
	}
})
//调用登录接口
function login(that, cb) {
	new Promise(function(resolve){
		// 显示加载中
		wx.showToast({
			title: "loading",
			icon: 'loading'
		});
		wx.login({
			success: function (res) {
				resolve(res);
			}
		});
	}).then(function (xdata){
		return new Promise(function(resolve, reject){
			wx.request({
				url: 'http://localhost/wxa/user/login',
				data: {
					code: xdata.code
				},
				success: function(res) {
					var data = res.data;
					if (data.errcode !== 500) {
						wx.setStorageSync("sessionId", data.sessionId);
						resolve(res);
					} else {
						reject(data);
					}
				}
			})
		});
	}).then(function (xdata){
		return new Promise(function(resolve, reject){
			wx.getUserInfo({
				success: function (res) {
					console.log(res);
					that.globalData.userInfo = res.userInfo
					resolve(res);
				}, 
				fail: function (res) {
					// 取消授权
					reject(res);
				}
			})
		});
	}, function(xdata){
		wx.showModal({
			title: '提示',
			content: xdata.errmsg,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			}
		});
	}).then(function (xdata){
		return new Promise(function(resolve, reject){
			wx.request({
				url: 'http://localhost/wxa/user/info',
				data: {
					rawData: xdata.rawData,
					signature: xdata.signature,
					encryptedData: xdata.encryptedData,
					iv: xdata.iv
				},
				header: {
					'wxa-sessionid': wx.getStorageSync("sessionId")
				},
				success: function(res) {
					resolve(res);
				}
			})
		});
	}, function(xdata){
		wx.hideToast();
		wx.showModal({
			title: '提示',
			content: "您取消了授权",
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			}
		});
	}).then(function(xdata){
		wx.hideToast();
		cb(that.globalData.userInfo);
	}, function(xdata){
		wx.hideToast();
		wx.showModal({
			title: '提示',
			content: xdata.errmsg,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			}
		});
	});
}