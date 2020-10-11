const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      wx.hideLoading();
      if (result) {
        that.setData({
          userInfo: app.userInfo,
        });
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 点击修改资料按钮事件
   * @param {object}} e 
   */
  formSubmit: function (e) {
    var that = this;
    wx.showLoading({
      title: '保存中',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user",
      method: "POST",
      data: {
        ...{
          access_token: app.access_token,
          extend: 'motify',
          method: 'patch'
        },
        ...e.detail.value
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('id')) {
          wx.showModal({
            title: '修改成功',
            content: '你的资料已成功更新到码云账户',
            showCancel: false,
            success: function (res) {
              wx.navigateBack();
            }
          })
        } else {
          wx.showModal({
            title: '保存失败',
            content: result.data.message,
            showCancel: false
          })
        }
      }
    });
  }
})