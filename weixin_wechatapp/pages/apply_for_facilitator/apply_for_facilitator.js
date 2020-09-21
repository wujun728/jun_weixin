// pages/apply_for_facilitator/apply_for_facilitator.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    serverData: {} ,//服务商填写的信息
    formId:"",//表单的ID
    
    // invitationCode:''
  }, 

  get_qrcode: function () {
    console.log('-------获取邀请码二维码信息--------')
    var customIndex = app.AddClientUrl("/get_qrcode.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        if (res.data.errcode == '0') {
          that.setData({
            FxImage: res.data.relateObj
          })
        }
        else {
          wx.showToast({
            title: res.data.errMsg,
            icon: '/images/icons/tip.png',
            duration: 1500
          })
        }
        console.log(res.data)
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },


  sendMessage: function (e) {  
    var that = this;
    
    that.setData({
      serverData: e.detail.data[0]
    })
    
    var params={}; 
    params = e.detail.data[0]   
    var customIndex = app.AddClientUrl("/applyServer.html", params, 'post')    
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'post',
      success: function (res) {        
        console.log("**********success***********",res.data.relateObj) 
        
      },
      fail: function (res) {
        console.error("----------fail----------"+res)
      }
    })

  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.error('app.more_scene', app.more_scene)
    var that = this; 
    // + '&formId=' + options.formId   + '&invitationCode=' + app.more_scene.substring(21)
    that.setData({       
      url: app.clientUrl + 'aikucun/apply_server.html?clientUrl=' + app.clientUrl + '&loginToken=' + app.loginUser.platformUser.loginToken + '&formId=' + options.formId + '&invitationCode=' + app.more_scene.substring(21) 
     
    })  
    wx.showToast({
      title: '加载中',
      icon: 'loading',      
      duration: 800
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