// pages/homepage/homepage.js
var that
var Network = require("../../utils/network.js")
var Constant = require("../../utils/constant.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    imgsrc: "/common/assets/tab/autorenew.png",
    historyArray:[],
    pageIndex: 1,
    loading: true,
    arr:[]
  },
  onReady: function () {
    this.setData({
      loading: false
    });
  }, 
  onLazyLoad(info) {
    var index = info.currentTarget.dataset.index
    that.data.arr[index] = true
    setTimeout(function () {
      that.setData({
        arr: that.data.arr
      })
    },2000)
   
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.requestData()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.data.historyArray.length = 0
    that.data.pageIndex = 1
    that.requestData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.data.pageIndex++
    that.requestData()
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: '互联网搜妹小分队-历史干货'
    };
  },
  /**
   * 订阅
   */
  subscribe: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['这里换成自己的模板ID'],
      success(res) {
        console.log("可以给用户推送每日妹子了");
        //'accept'表示用户接受；'reject'表示用户拒绝；'ban'表示已被后台封禁
        var flag = res['这里换成自己的模板ID']
        if (flag =="accept"){
          //更新用户订阅状态
          var openId = wx.getStorageSync('openid')
          Network.request(
             Constant.BASE_URL.concat("/weChat/subscribe"), function (res) {

          }, function () {

          }, { 'openId': openId })
        }
      }
    })
  },
  /**
   * 干货详情
   */
  onItemClick: function(event){
    var app = getApp();
    var user = wx.getStorageSync('userInfo')
    if (user){
        wx.navigateTo({
          url: '../detail/detail?uuid=' + event.currentTarget.dataset.uuid + "&title=" + event.currentTarget.dataset.title
        })
    }else{
        wx.navigateTo({
          url: '../login/index'
        })
    }
  },
  clickRetry: function(event){
    that.requestData()
  },
  requestData: function () {
    Network.requestLoading(Constant.BASE_URL.concat("/recommend/10/" + that.data.pageIndex).concat("?v=" + Constant.time()), function (res) {
      for (let i = 0; i < res.msg.length; i++) {
        var itemData = res.msg[i]
        if(i==0){
          that.data.arr.push(true)
        }else{
          that.data.arr.push(false)
        }
        that.data.historyArray.push(itemData)
      }
      that.setData({
        items: that.data.historyArray,
        arr: that.data.arr,
        hidden: true
      })
    }, function () {
      if (that.data.pageIndex !== 1) {
        that.data.pageIndex--
      }
      wx.showToast({
        title: '加载数据失败',
      })
      that.setData({
        hidden: false
      })
    })
  }
})
