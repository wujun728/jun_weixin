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
    taskManagementData:null,
    wsState:false,
    posterState:false,
    ewmImgUrl:"",
    
  },
  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
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
  //获取推广中心，查看是否有资格
  getTaskManagementData: function () {
    console.log('-------推广中心--------')
    var customIndex = app.AddClientUrl("/wx_find_user_reward_package_results.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("===getTaskManagementData===",res)
        if (res.data.errcode == '0') {
          let taskManagementData = res.data.relateObj;
          for (let i = 0;i<taskManagementData.length;i++){
            if (taskManagementData[i].conditionPackage.rewardContent){
              taskManagementData[i].conditionPackage.rewardContent = JSON.parse(taskManagementData[i].conditionPackage.rewardContent)
            }
            
          }
          that.setData({ taskManagementData: taskManagementData })
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({ setting: app.setting, loginUser: app.loginUser })
    that.getTaskManagementData()
    console.log("loginUser", that.data.loginUser)
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