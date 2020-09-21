// pages/girl/girl.js
var that
var Network = require("../../utils/network.js")
var Constant = require("../../utils/constant.js")
let interstitialAd = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    imgsrc: "/common/assets/tab/autorenew.png",
    girlArray: [],
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.requestData()
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-ff5f0c7ccfcfdeb9'
      })
      interstitialAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      interstitialAd.onError((err) => {
        console.log('onError event emit', err)
      })
      interstitialAd.onClose((res) => {
        console.log('onClose event emit', res)
      })
    }
  },
  onLazyLoad(info) {
    //console.log(info)
  },
  /**
   * 异常流
   */
  onAbnorTap() {
    this.setData({
      hidden: true
    })
    this.requestData()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.data.girlArray.length = 0
    that.data.pageIndex = 1
    that.requestData()
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.data.pageIndex++
    that.requestData()
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  /**
   * 图片预览
   */
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: that.data.girlArray
    })
  },
  clickRetry: function (event) {
    requestData()
  },
  requestData: function () {
    Network.requestLoading(Constant.BASE_URL.concat("/girl/20" + "/" + that.data.pageIndex), function (res) {
      if (res.msg.length != 0) {
        for (let i = 0; i < res.msg.length; i++) {
          that.data.girlArray.push(res.msg[i].ossUrl)
        }
        that.setData({
          images: that.data.girlArray,
          hidden: true
        })
      } else {

      }

    }, function () {
      if (that.data.pageIndex !== 1) {
        that.data.pageIndex--
      }
      wx.showToast({
        title: '加载数据失败'
      })
      that.setData({
        hidden: false
      })
    })
  }
})