/**
 * The MIT License (MIT)
 * 表单校验
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/formcheck/formcheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading: false,
    userName: "",
    pwd: "",
    errTxt: "",
    errShow: false
  },
  //事件处理函数
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  //进入
  goto: function () {
    var that = this;
    //手机号
    if (/^.+$/.test(that.data.userName)) {
      that.setData({
        errTxt: "",
        errShow: false
      });
    } else {
      that.setData({
        errTxt: "手机号不能为空",
        errShow: true
      });
      return false;
    }
    if (/^1[34578][0-9]{9}$/.test(that.data.userName)) {
      that.setData({
        errTxt: "",
        errShow: false
      });
    } else {
      that.setData({
        errTxt: "手机号格式错误",
        errShow: true
      });
      return false;
    }
    //密码
    if (/^.+$/.test(that.data.pwd)) {
      that.setData({
        errTxt: "",
        errShow: false
      });
    } else {
      that.setData({
        errTxt: "密码不能为空",
        errShow: true
      });
      return false;
    }
    if (/^.{6,16}$/.test(that.data.pwd)) {
      that.setData({
        errTxt: "",
        errShow: false
      });
    } else {
      that.setData({
        errTxt: "密码格式错误",
        errShow: true
      });
      return false;
    }

    that.setData({ isloading: true });
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
  
  }
})