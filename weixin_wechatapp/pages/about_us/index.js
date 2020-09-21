var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data:null,
    params:{},
    ewmImgUrl:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onloadOpt:{},
  onLoad: function (options) {
    let that=this;
    that.onloadOpt = options
    that.setData({ params: options,setting:app.setting})
    console.log('options', options)
    console.log('setting', that.data.setting)
    if (that.data.setting){
      WxParse.wxParse('article', 'html', that.data.setting.platformSetting.defaultShopBean.shopDescription, that, 10);
      console.log('===0000=====', that.data.article.nodes);
    }else{
      wx.showToast({
        title: '请求错误',
        icon: 'loading',
        duration: 2000
      })
    }
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
    let that = this;
    that.setData({ setting: app.setting })
    console.log('setting', that.data.setting)
    if (that.data.setting) {
      WxParse.wxParse('article', 'html', that.data.setting.platformSetting.defaultShopBean.shopDescription, that, 10);
      console.log('===0000=====', that.data.article.nodes);
    } else {
      wx.showToast({
        title: '请求错误',
        icon: 'loading',
        duration: 2000
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
})