
const app = getApp()
var tab = require('../../view/js/tab.js');
var detailList = require('../../view/js/detail_list.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    /* seeting */ 
    setting: null,
    userData: null,
    PaiXuPartials: null,

    loginUser: null,
    componentState:true, //组件的data
    orderData: null,
    ListData: null,
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  showPoster: function () {
    let that = this;
    console.log('===showPoster====', that.data.loginUser.id)
    if (that.data.loginUser && that.data.loginUser.platformUser.id) {
      let ewmImgUrl = app.getQrCode({ type: "user_info", id: that.data.loginUser.platformUser.id })
      that.setData({
        posterState: true,
        ewmImgUrl: ewmImgUrl,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您还未登录，点击【确定】重新加载',
        success: function (res) {
          if (res.confirm) {
            that.getSessionUserInfo();
            this.getParac()
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  getParac: function () {
    var that = this
    var customIndex = app.AddClientUrl("/custom_page_userinfo.html", {}, 'get', '1')
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("====== res.data=========", res.data)
        wx.hideLoading()
        if (!res.data.errcode || res.data.errcode == '0') {
          that.setData({ componentState:true})
        } else {
          console.log('加载失败')
          that.setData({ componentState: false })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '加载失败，点击【确定】重新加载',
          success: function (res) {

            if (res.confirm) {
              that.getParac()
            } else if (res.cancel) {
              app.toIndex()
            }
          }
        })
      }
    })
  },
  loginOut: function () {
    wx.navigateTo({
      url: '/pages/pre_change_user_info/index',
    })
  },
  login: function () {
    wx.navigateTo({
      // url: '../login_wx/index',
      url: '/pages/login_wx/index',
    })
  },
  // headData:{
  //   // imageUrl:'http://image.aikucun.xyz/aikucun/2018_4/2/11/48/3_10.jpg'
  // },
  
  blankData:{
    color: "rgb(244,244,244)",
    height: 12
  },

  orderData: {
    
    cells:[
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/47/6_417.jpg",
        linkUrl: "order_list_2.html?easyStatus=2&easyStatusName=待付款",
        text: "待付款",
        color: "#777777",
        showCountNum:0,
        
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/21_775.jpg",
        linkUrl: "order_list_0.html?easyStatusName=全部订单",
        text: "全部订单",
        color: "#777777",
        showCountNum: 0,
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/21_802.jpg",
        linkUrl: "order_list_3.html?easyStatus=3&easyStatusName=待发货" ,
        text: "待发货",
        color: "#777777",
        showCountNum:0,
      }
    ],
    column:3,
    showType: 0
  },

  ListData:{
    cells: [
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_117.jpg?x-oss-process=style/preview_120",
        linkUrl: "address.html",
        text: "收货地址",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_432.jpg?x-oss-process=style/preview_120",
        linkUrl: "my_favorite.html",
        text: "我的收藏",
      color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_434.jpg?x-oss-process=style/preview_120",
        linkUrl: "my_coupons.html",
        text: "优惠券",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_429.jpg?x-oss-process=style/preview_120",
        linkUrl: "",
        id:"1",
        text: "在线客服",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_3/27/15/37/19_420.jpg?x-oss-process=style/preview_120",
        linkUrl: "custom_page_my_newlist?pageNage=常见问题",
        text: "常见问题",
        color: "#777777"
      }
    ],
    column: 3,
    showType: 0
  },
  dellSData:function(){
    this.setData({
      orderData: this.orderData,
      ListData: this.ListData,
    })
  },
  getSessionUserInfo: function () {
    var that = this;
    var postParamUserBank = app.AddClientUrl("/get_session_userinfo.html")
    wx.request({
      url: postParamUserBank.url,
      data: postParamUserBank.params,
      header: app.headerPost,
      success: function (res) {
        console.log(res.data)

        if (res.data.errcode == '0') {
          let UserInfo = res.data.relateObj.platformUser
          let orderData = that.orderData
          orderData.cells[0].showCountNum = UserInfo.unpayedCount
          orderData.cells[1].showCountNum = UserInfo.unsendedCount
          orderData.cells[2].showCountNum = UserInfo.unreceivedCount

          that.setData({
            orderData: orderData,
            loginUser: res.data.relateObj
          })
          app.loginUser = res.data.relateObj
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {

       // unsendedCount //待发货
       // unreceivedCount //待收货
       // unpayedCount //逮住款

        console.log(res.data)
      },
      complete: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dellSData()
    this.getSessionUserInfo();
    this.getParac()
    this.setData({
      loginUser: app.loginUser,
      userInfo: app.globalData.userInfo,
      setting: app.setting
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: "#10c2ff",
    }) 
    wx.setNavigationBarTitle({
      title: "奶爸无忧·母婴商超",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  openShow:false,
  onShow: function () {
    if (this.openShow){
      this.setData({ loginUser: app.loginUser })
      this.getSessionUserInfo();
    }
    this.openShow = true
    
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
    this.getSessionUserInfo();
    this.getParac()
    console.log(this.data.setting)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  /* 分享 */
  onShareAppMessage: function () {
    return app.shareForFx2(app.miniIndexPage)
  },

  /* 组件事件集合 */

  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  }
})