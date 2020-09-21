// pages/today/today.js
var Network = require("../../utils/network.js")
var Constant = require("../../utils/constant.js")
var Detail = require("../../utils/requestDetail.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,//网络加载失败
    title:'',//标题
    show:true,//留言、订阅显示
    girlArray:[],
    loading: true//骨架屏
  },
  onReady: function () {
    that = this
    setTimeout(function () {
      that.setData({
        loading: false
      });
    }, 1000)
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let open = wx.getStorageSync('open')
    var user = wx.getStorageSync('userInfo')
    if (user && open=='open') {
      that.setData({
        show: false
      })
    } else {
      //这个是时候我们在app的config里定义一个函数 给请求成功后调用
      getApp().callback = () => {
        if (user && open == 'open') {
          that.setData({
            show: false
          })
        }
      };
    }
    requestData()
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    that = this
    let open = wx.getStorageSync('open')
    var user = wx.getStorageSync('userInfo')
    if (user && open == 'open') {
      that.setData({
        show: false
      })
    }
    requestData()
  },
  /**
   * 异常流
   */
  onAbnorTap() {
    this.setData({
      hidden: true
    })
    requestData()
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: that.title,
      path: '/pages/today/today'
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
        if (flag == "accept") {
          //更新用户订阅状态
          var openId = wx.getStorageSync('userInfo').openid
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
  }
})

var that
function requestData() {
  Detail.requestDetailData(that, "/recommend/today")
}
