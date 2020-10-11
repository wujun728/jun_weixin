const app = getApp()
var base64Helper = require('../../utils/Base64.js');
/**
 * 页面的初始数据
 */
Page({
  data: {
    userInfo: {},
    login: "",
    defaultUserInfo: {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    that.setData({
      userInfo: that.data.defaultUserInfo,
    });
    if (e.login) {
      that.setData({
        login: e.login,
      });
      wx.showLoading({
        title: '用户读取中',
      });
    } else {
      wx.showModal({
        title: '参数错误',
        content: '系统发生错误，无法为你读取数据',
        showCancel: false,
        success(res) {
          wx.navigateBack();
        }
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
        that.getDetail(false);
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.getDetail();
  },
  getDetail: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '用户读取中',
      });
    }
    wx.request({
      url: app.config.apiUrl + "api/v5/users/" + that.data.login,
      method: "POST",
      data: {
        access_token: app.access_token,
        method: 'get'
      },
      success: function (result) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("id")) {
          that.setData({
            userInfo: result.data
          });
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showModal({
            title: '数据获取失败',
            content: result.data.message,
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        }
      }
    });
  },
})