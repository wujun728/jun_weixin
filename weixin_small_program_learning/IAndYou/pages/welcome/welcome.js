// pages/welcome/welcome.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options", options.userId);

    if (options.userId) {
      this.setData({
        userId: options.userId
      })
    }

    var that = this;
    app.userLogin();
    var in_index = 1;
    var times = setInterval(function () {
      in_index++;
      if (in_index > 10) {
        clearTimeout(times);
      }
      var rd_session = wx.getStorageSync("rd_session");

      var account = app.globalData.userId;

      if (rd_session) {
        clearTimeout(times);

        //业务逻辑----------start------------
        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/IandY ",
          data: {
            "account": account,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            console.log(response);
            if (response.data.status) {
              var user = response.data.data;
              
              //说明已经绑定了用户，直接跳转
              if(user.length >= 2) {
                wx.switchTab({
                  url: '/pages/lover/lover',
                })  
              }
            }
          }
        })
        //业务逻辑----------end------------

      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goIndex: function(e) {
    var that = this;
    console.log(getApp().globalData.userInfo);
    let sex = e.currentTarget.dataset.sex;
    var account = app.globalData.userId;
    if (that.data.userId != undefined && that.data.userId != null) {
      console.log("开始绑定~  我的ID ！！！！！", account);
      console.log("开始绑定~ 他的ID ！！！！！", that.data.userId);
      //没有绑定用户，继续绑定
      wx.request({
        url: "http://47.106.108.224/mavenSprngMVC/wxUser/bindUser",
        data: {
          "account": account,
          "bindedAccount": that.data.userId
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (response) {
          console.log(response);
          if (response.data.status) {
            wx.switchTab({
              url: '/pages/lover/lover?sex=' + sex,
            })
          }
        }
      })
    } else {
        wx.switchTab({
          url: '/pages/lover/lover?sex=' + sex,
        })
    }

  },
})