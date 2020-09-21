//app.js
App({
  onLaunch: function () {
    var that = this;
    that.globalData.loginIndex = 1;
    console.log("加载小程序");
    this.login();
  },

  userLogin: function () {
    var that = this;
    //判断是否请求了登录，只能同时请求一次登录
    var ifLogin = that.globalData.ifLogin;
    if (ifLogin == "true") {
    
    } else {
      this.login();
    }

  },
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        //创建一个dialog
        
        // wx.showToast({
        //   title: '正在登录...',
        //   icon: 'loading',
        //   duration: 10000
        // });

        console.log("code:", code);
        //请求服务器
        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/getUserOpenId",
          data: {
            code: code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            // console.log("登录成功", response.data);
            that.globalData.loginIndex = 2;
                    
            wx.hideToast();
            if (response.data.status) {//登录success

              var wxData = JSON.parse(response.data.data);

              wx.setStorageSync("rd_session", wxData.session_key);
              
              that.globalData.userId = wxData.openid; //openId

              that.globalData.ifLogin = 1;//登录了

              return "true";
            } else {

              that.globalData.ifLogin = 0;//没登录

              return "false";
            }
            
          },
          fail: function () {
            // 在这里你要考虑到用户登录失败的情况  
            wx.showToast({
              title: '网站正在维护中...',
              icon: 'loading',
              duration: 10000
            });
            wx.removeStorage({
              key: 'login'
            })
            return false;
          },
        })
      }

    })
  },

  globalData: {
    userInfo: null,
    sortId: null,
    ifLogin: 0,
    addresss: null,
    addressId: 0,
    loginIndex: 0,
  }
})