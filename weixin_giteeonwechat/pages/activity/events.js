const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    //分页开始
    page: 1,
    isGetingData: false,
    list: [],
    type: 'mine',
    login:""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.other) {
      this.setData({
        type: 'friends',
        login:app.userInfo.login
      });
      wx.setNavigationBarTitle({
        title: '好友动态'
      });
    }else if (e.login) {
      this.setData({
        type: 'user',
        login:e.login
      });
      wx.setNavigationBarTitle({
        title: '用户动态'
      });
    } else {
      this.setData({
        type: 'mine',
        login:app.userInfo.login
      });
      wx.setNavigationBarTitle({
        title: '我的动态'
      });
    }
  },
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getList();
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.setData({
      page: 1
    });
    this.getList();
  },
  /**
   * 上拉加载时间
   */
  onReachBottom: function () {
    if (!this.data.isGetingData) {
      this.setData({
        page: this.data.page + 1
      });
      this.getList();
    }
  },
  /**
   * 获取数据列表
   */
  getList: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '数据加载中',
      });
    }
    if (that.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    that.isGetingData = true;
    var url = app.config.apiUrl + "api/v5/users/" + that.data.login + "/events";
    switch(that.data.type){
      case 'friends':
        url = app.config.apiUrl + "api/v5/users/" + that.data.login + "/received_events";
        break;
      case 'user':
        url = app.config.apiUrl + "api/v5/users/" + that.data.login + "/events/public";
        break;
        default:
    }
    wx.request({
      url: url,
      method: "POST",
      data: {
        access_token: app.access_token,
        page: that.data.page,
        method: 'get'
      },
      success: function (result) {
        that.isGetingData = false;
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '获取失败',
            content: "你可以尝试重新登录或稍后再试",
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        } else {
          if (that.data.page == 1) {
            that.setData({
              list: result.data
            });
          } else {
            var _list = that.data.list;
            for (var i = 0; i < result.data.length; i++) {
              _list.push(result.data[i]);
            }
            that.setData({
              list: _list
            });
          }
        }
      }
    });
  }
})