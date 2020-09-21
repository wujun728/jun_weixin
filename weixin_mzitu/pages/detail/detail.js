// pages/detail/detail.js
var Network = require("../../utils/network.js")
var Constant = require("../../utils/constant.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,//网络异常
    show: true,//留言订阅
    girlArray: [],
    loading: true//骨架屏
  },
  onReady: function () {
    this.setData({
      loading: false
    });
  }, 
  /**
  * 异常流
  */
  onAbnorTap() {
    this.setData({
      hidden: false
    })
    that.requestData()
  },
  /**
   * 今日推荐
   */
  today: function (event) {
    wx.switchTab({
      url: '/pages/today/today',
    });
  },
  /**
  * 订阅
  */
  subscribe: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['Qwe3JQrNVwVqBpfeqSxOtp-PdpbCHqYgzq1OJg7HaEo'],
      success(res) {
        console.log("可以给用户推送每日妹子了");
        //'accept'表示用户接受；'reject'表示用户拒绝；'ban'表示已被后台封禁
        var flag = res['Qwe3JQrNVwVqBpfeqSxOtp-PdpbCHqYgzq1OJg7HaEo']
        if (flag == "accept") {
          //更新用户订阅状态
          var openId = getApp().globalData.userInfo.openid
          Network.request(
            Constant.BASE_URL.concat("/weChat/subscribe"), function (res) {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000
              })
            }, function () {

            }, { 'openId': openId })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var user = wx.getStorageSync('userInfo')
    let open = wx.getStorageSync('open')
    if (user && open == 'open') {
      that.setData({
        show: false
      })
    }
    uuid = options.uuid
    
    title = decodeURI(options.title)
    requestData()
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: title
    };
  }
})

function requestData(){
  Detail.requestDetailData(that, "/recommend/" + uuid)
}

var Detail = require("../../utils/requestDetail.js")
var uuid,title
var that






