// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    textInput: "",
    my: {},
    lover: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
              for (var i = 0; i < user.length; i++) {
                if (user[i].currentUser) {
                  that.setData({
                    my: user[i]
                  })
                } else {
                  that.setData({
                    lover: user[i]
                  })
                }
              }

            }
          }
        })
        //业务逻辑----------end------------

      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  onShareAppMessage: function (res) {
    var account = app.globalData.userId;
    return {
      title: '您的另一半正在邀请您加入~',
      path: '/pages/welcome/welcome?userId=' + account,
      imageUrl: 'http://120.79.70.126:8600//blog/admin/jpg/2018/11/23/1542979263772.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  invite: function() {
    console.log("邀请");
    this.onShareAppMessage();
  },
  //解除关系
  remove: function() {
    
    var account = app.globalData.userId;

    wx.showModal({
      title: '警告!',
      content: '你确定要解除关系吗？(双方所有数据都会删除)',
      success: function(res) {
        if(res.confirm) {
          

          wx.request({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/unBindUser",
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
                wx.showToast({
                  title: '解除成功',
                })
              }
            }
          })

          wx.showToast({
            icon: 'none',
            title: '成功解除!',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '您已取消!',
          })
        }
      }
    })
    
  },
  //意见反馈相关
  feedback: function() {
    console.log("意见反馈");
    this.setData({
      hidden: false,
    })
  },
  textInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      textInput: e.detail.value
    })
  },
  cancel: function() {
    console.log("点击了取消");
    this.setData({
      hidden: true,
      textInput: "",
    })
  },
  confirm: function() {
    
    var account = app.globalData.userId;

    console.log("点击了发送");
    var textInput = this.data.textInput;
    if(textInput == "") {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空~',        
      })
      return;
    }
    wx.request({
      url: "http://47.106.108.224/mavenSprngMVC/wxUser/pubSuggestion",
      data: {
        "account": account,
        "msg": textInput
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (response) {
        console.log(response);
        if (response.data.status) {
          wx.showToast({
            title: '反馈成功',
          })
        }
      }
    })

    this.setData({
      hidden: true,      
    })
  }
})