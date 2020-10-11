const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    product: app.product,
    user_name: "",
    personal_token: "",
    tokenFormShow: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var user_name = wx.getStorageSync('user_name');
    var personal_token = wx.getStorageSync('personal_token');
    this.setData({
      user_name: user_name,
      personal_token: personal_token
    });
  },
  //切换到私人令牌登录
  loginWithToken: function () {
    this.setData({
      tokenFormShow: true
    });
  },
  hideAddForm: function () {
    this.setData({
      tokenFormShow: false
    });
  },
  doTokenFormSubmit: function (e) {
    wx.setStorageSync('access_token', e.detail.value.personal_token);
    wx.showLoading({
      title: '令牌检测中',
    });
    app.getUserInfo(function (result) {
      wx.hideLoading();
      console.log(app.userInfo);
      if (result) {
        wx.setStorageSync('personal_token', e.detail.value.personal_token);
        wx.navigateBack();
      } else {
        wx.showModal({
          title: '授权失败',
          content: '输入的私人令牌无效，请检查是否正确',
          showCancel: false
        })
      }
    })
  },
  /**
   * 点击登录 开始登录
   */
  formSubmit: function (e) {
    var postData = e.detail.value;
    wx.showLoading({
      title: '登录中',
    });
    var user_name = postData.username;
    wx.setStorageSync('user_name', user_name);
    postData.grant_type = 'password';
    postData.scope = 'user_info projects pull_requests issues notes keys hook groups gists enterprises';
    wx.request({
      url: app.config.apiUrl + 'oauth/token',
      method: "POST",
      data: postData,
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('access_token')) {
          wx.setStorageSync('access_token', result.data.access_token);
          wx.showToast({
            title: "登录成功"
          });
          wx.navigateBack();
        } else {
          wx.showModal({
            title: '登录失败',
            content: '我们尝试为你登录码云帐号，但可能你的帐号密码错误',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 打开找回密码页面
   */
  open_user_passwordReset: function () {
    wx.navigateTo({
      url: '../user/passwordReset',
    })
  },
  /**
   * 打开帐号注册页面
   */
  open_user_reg: function () {
    wx.navigateTo({
      url: '../user/reg',
    })
  },
  /**
   * 打开微信登录页面
   */
  open_wechat_login: function () {
    wx.redirectTo({
      url: '../user/loginWechat',
    })
  }
})