 // pages/fx_center/index.js
const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting:{},
    fxCenter: null,
    fxState:false,
    loginUser:null,
    fxDetail:null,
    wsState:false,
    posterState:false,
    ewmImgUrl:"",
    
  },
  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  get_fxLevel:function(setting){
    let fxLevel = setting.platformSetting.fxLevel
    if (!fxLevel){
      fxLevel = 0
    }
    this.setData({ fxLevel: fxLevel })
  },

  //获取推广中心，查看是否有资格
  get_fx_center:function(setting){
    console.log('-------推广中心--------', setting)
    var customIndex = app.AddClientUrl("/fx_center.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        if (res.errMsg == 'request:ok'){
          let fxCenter = res.data
          that.setData({ fxCenter: fxCenter })
          if (setting.platformSetting.fxShenhe == 0 ){//分销不需要审核
            //都有资格
            that.setData({ fxState: true })
          }else{
            if (fxCenter.fxShenhe == 1){
              //有资格
              that.setData({ fxState: true })
            }else{
              //没有资格
              that.setData({ fxState: false })
              that.tip();
            }
          }
        }
        if (res.data.errcode == '10001'){
          that.setData({ fxCenter: null })
        }

        console.log("====get_fx_center===",res)
        
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  tip:function(tipText){
    wx.showModal({
      title: '提示',
      content: tipText||'主人~您还没有分销权限哦!',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.toIndex();
        } else if (res.cancel) {
          console.log('用户点击取消')
          app.toIndex();
        }
      }
    })
  },
  // 这里是一个自定义方法
  calling: function (e) {
    console.log('====e===', e)
    let phoneNumber = e.currentTarget.dataset.phonenumber
    wx.makePhoneCall({
      phoneNumber: phoneNumber, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //获取推广中心，查看是否有资格
  get_fx_detail: function (setting) {
    console.log('-------推广中心--------')
    var customIndex = app.AddClientUrl("/wx_get_fx_data.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("===get_fx_detail===",res)
        if (res.data.errcode == '0') {
          let fxDetail = res.data.relateObj;
          that.setData({ fxDetail: fxDetail })
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
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
    } else {
      wx.showModal({
        title: '提示',
        content: '您还未登录，点击【确定】重新加载',
        success: function (res) {
          if (res.confirm) {
            that.getSessionUserInfo();
          } else if (res.cancel) {

          }
        }
      })
    }
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
          that.setData({
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
    this.setData({ setting: app.setting, loginUser: app.loginUser })
    this.get_fx_center(app.setting)
    this.get_fx_detail();
    this.get_fxLevel(app.setting)
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
    this.onLoad()
    wx.stopPullDownRefresh()
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
    return app.shareForFx2(app.miniIndexPage)

  },
})