
const app = getApp()
var tab = require('../../view/js/tab.js');
var detailList = require('../../view/js/detail_list.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    setting: null,
    userData: null,
    PaiXuPartials: null,

    loginUser: null,
    componentState:true, //组件的data
    curPersonnelType:-1,
    havaMoreSelectType:[],
    havaMoreSelectTypeArr:[],
    // headData:null,
    blankData: null,
    orderData: null,
    ListData: null,
    serverData: null,
    servantData:null,
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  clickWxGz:function(){
    let that=this;
    console.log('===bindWxGz====', that.data.loginUser)
    let loginUser = that.data.loginUser;
    let title ="你确定要绑定公众号推送嘛~"
    if (loginUser.platformUser.openid){
      title = "你确定要解绑公众号推送嘛~"
    }
    wx.showModal({
      title: '提示',
      content: title,
      success: function (res) {
        if (res.confirm) {
          if (!loginUser.platformUser.openid) {
            that.bindWxGz()
          }else{
            that.unBindWxGz()
          }
        } else if (res.cancel) {

        }
      }
    })
  },
  bindWxGz:function(){
    let that=this;
    let paramsUrl = "https://mini.sansancloud.com/chainalliance/" + app.clientNo + "/bindWxGz.html?platformUserId=" + that.data.loginUser.platformUser.id;
    that.tolinkUrl(paramsUrl)
    that.getSessionUserInfo();
  },
  unBindWxGz: function () {
    let that = this
    let customIndex = app.AddClientUrl("/wx_unbind_wx_gz_openid.html")
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("====== res.data=========", res.data)
        wx.hideLoading()
        if (!res.data.errcode || res.data.errcode == '0') {
          wx.showToast({
            title: '解绑成功~',
            icon: 'success',
            duration: 1000
          })
          that.getSessionUserInfo();
        } else {
          console.log('加载失败')
          wx.showToast({
            title: res.data.errMsg + '~',
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
      }
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
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/21_802.jpg",
        linkUrl: "order_list_3.html?easyStatus=3&easyStatusName=待发货" ,
        text: "待发货",
        color: "#777777",
        showCountNum:0,
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/21_775.jpg",
        linkUrl: "order_list_4.html?easyStatus=4&easyStatusName=待收货",
        text: "待收货" ,
        color: "#777777",
        showCountNum:0,
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/22_291.jpg",
        linkUrl: "back_item_list.html",
        text: "售后",
        color: "#777777"
      },
  
    ],
    column:4,
    showType: 0
  },

  ListData:{
    cells: [{
      iconPath: "http://image1.sansancloud.com/sansancloud/2018_9/11/14/41/49_530.jpg",
      linkUrl: "order_pintuan.html?payStatus=1&orderType=12",
      text: "我的拼单",
      color: "#777777"
    },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_10/9/14/16/9_477.jpg",
        linkUrl: "user_jifen_events.html",
        text: "我的积分",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_10/9/14/10/49_366.jpg",
        linkUrl: "my_coupons.html",
        text: "我的优惠券",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_1/4/11/7/54_534.jpg",
        linkUrl: "my_card_voucher.html",
        text: "我的卡券",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2019_1/11/20/49/36_852.jpg",
        linkUrl: "verification_record.html",
        text: "核销记录",
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/54/39_501.jpg",
        linkUrl: "address.html",
        text: "收货地址" ,
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/52/10_637.jpg" ,
        linkUrl: "yijian_fankui.html",
        text: "意见反馈" ,
        color: "#777777"
      },
      {
        iconPath: "http://image1.sansancloud.com/xianhua/2018_9/5/16/45/22_284.jpg",
        linkUrl: "custom_page_about_us?pageNage=关于我们",
        text: "关于我们",
        color: "#777777"
      },
    ],
    column: 3,
    showType: 0
  },

  serverData:{
    iconPath: "http://image1.sansancloud.com/jianzhan/2018_9/5/19/17/45_862.jpg?x-oss-process=style/preview_120",
    linkUrl: "mendian_center.html",
    text: "我是服务商",
    color: "#777777"
  },
  servantData: {
    iconPath: "http://image1.sansancloud.com/jianzhan/2018_9/5/19/17/45_862.jpg?x-oss-process=style/preview_120",
    linkUrl: "servant_center.html",
    text: "我是服务人员",
    color: "#777777"
  },
  moreSelectType:[
    {
      iconPath: "http://image1.sansancloud.com/jianzhan/2018_9/5/19/17/45_862.jpg?x-oss-process=style/preview_120",
      linkUrl: "mendian_center.html",
      text: "我是服务商",
      typeText: 'mendian',
      color: "#777777",
      ownState: false,
    },{
      iconPath: "http://image1.sansancloud.com/jianzhan/2018_9/5/19/17/45_862.jpg?x-oss-process=style/preview_120",
      linkUrl: "new_servant_center.html",
      text: "我是服务人员",
      typeText:'servant',
      color: "#777777",
      ownState: false,
    }, {
      iconPath: "http://image1.sansancloud.com/jianzhan/2018_9/5/19/17/45_862.jpg?x-oss-process=style/preview_120",
      linkUrl: "servant_target_center.html",
      text: "我是服务对象",
      typeText: 'servantTarget',
      color: "#777777",
      ownState: false,
    }
  ],
  bindPickerChange:function(e){
    let that=this;
    console.log("====bindPickerChange====",e)
    let index = e.detail.value;
    that.setData({
      curPersonnelType: index,
    })
  },
  dellSData:function(){
    this.setData({
      // headData: this.headData,
      blankData: this.blankData,
      orderData: this.orderData,
      ListData: this.ListData,
      serverData: this.serverData,
      servantData: this.servantData,
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
          // 11111
          let loginUser = res.data.relateObj
          let curPersonnelType = that.data.curPersonnelType;
          let moreSelectType = that.moreSelectType
          let havaMoreSelectType = []
          let havaMoreSelectTypeArr = []
          console.log("===moreSelectType===", moreSelectType)
          for (let i = 0; i < moreSelectType.length; i++) {
            if (loginUser.platformUser.managerMendianId && moreSelectType[i].typeText == 'mendian') {
              havaMoreSelectType.push(moreSelectType[i])
            }
            if (loginUser.platformUser.managerServantId && moreSelectType[i].typeText == 'servant') {
              havaMoreSelectType.push(moreSelectType[i])
            }
            if (loginUser.platformUser.managerServantTargetId && moreSelectType[i].typeText == 'servantTarget') {
              havaMoreSelectType.push(moreSelectType[i])
            }
          }
          console.log("moreSelectType", moreSelectType, havaMoreSelectType)
          if (havaMoreSelectType.length!=0){
            for (let i = 0; i < havaMoreSelectType.length;i++){
              havaMoreSelectTypeArr.push(havaMoreSelectType[i].text)
              // 判断优先度
              if (loginUser.platformUser.managerMendianId && loginUser.platformUser.managerMendianId != 0 && havaMoreSelectType[i].typeText=='mendian') {
                console.log("服务商")
                curPersonnelType = i
              } else if (!loginUser.platformUser.managerMendianId && (loginUser.platformUser.managerServantId && loginUser.platformUser.managerServantId != 0) && havaMoreSelectType[i].typeText == 'servant') {
                console.log("服务人员")
                curPersonnelType = i
              } else if (!loginUser.platformUser.managerMendianId && !loginUser.platformUser.managerServantId && (loginUser.platformUser.managerServantTargetId && loginUser.platformUser.managerServantTargetId != 0) && havaMoreSelectType[i].typeText=='servantTarget') {
                console.log("服务对象")
                curPersonnelType = i
              }
            }
          }
          console.log("curPersonnelType", curPersonnelType, havaMoreSelectTypeArr)
          that.setData({
            curPersonnelType: curPersonnelType,
            loginUser: loginUser,
            userInfo: app.globalData.userInfo,
            setting: app.setting,
            orderData: orderData,
            havaMoreSelectTypeArr: havaMoreSelectTypeArr,
            havaMoreSelectType: havaMoreSelectType
          })
          // 11111
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
    let that=this
    that.dellSData()
    that.getSessionUserInfo();
    that.getParac()
    
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
    let linkUrl = e.currentTarget ? e.currentTarget.dataset.link:e
    app.linkEvent(linkUrl)
  }
})