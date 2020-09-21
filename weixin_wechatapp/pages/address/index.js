
const app = getApp()
Page({

  data: {
    setting: null,
    loginUser: null,
    addrData:null
  },  
/* 编辑 */
  writeAddr: function (e) {
    var addrId = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.addrData.length;i++){
      if (addrId == this.data.addrData[i].id){
        
        app.EditAddr = this.data.addrData[i]
      }
    }
    wx.navigateTo({
      url: '../add_address/index?addrId=' + addrId,
    })
  },

/* 设为默认地址 */
  setDefaultAddr:function(e){
    var addrId = e.currentTarget.dataset.id
    var param = {}
    param.addressId = addrId
    var that = this
    wx.showModal({
      title: '提示',
      content: '设为默认地址',
      success: function (res) {
        if (res.confirm) {
          // wx.showLoading({
          //   title: 'loading'
          // })
          app.showToastLoading('loading', true)
          var customIndex = app.AddClientUrl("/set_default_address.html", param,'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res)
              console.log(res.data)
              wx.hideLoading()
              that.getAddr()
            },
            fail: function (res) {
              wx.hideLoading()
              app.loadFail()
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

/* 删除 */
  deleteAddr: function (e) {
    var addrId = e.currentTarget.dataset.id
    var param = {}
    param.addressId = addrId
    param.platformNo = app.setting.platformSetting.platformNo
    param.userId = app.loginUser.id
    console.log(param)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          // wx.showLoading({
          //   title: 'loading',
          //   mask: true
          // })
          app.showToastLoading('loading', true)
          var customIndex = app.AddClientUrl("/delete_address.html", param,'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res)
              console.log(res.data)
              wx.hideLoading()
              that.getAddr()
            },
            fail: function (res) {
              console.log(res)
              wx.hideLoading()
              app.loadFail()
            }
          })
        } else if (res.cancel) {
    
        }
      }
    })
    
   
  },

  addNewAddr: function () {
    wx.navigateTo({
      url: '../add_address/index',
    })
  },

 
  getAddr: function () {
    if (!app.checkIfLogin()) {
      return
    }
    var customIndex = app.AddClientUrl("/get_login_user_address_list.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    //拿custom_page 
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-------地址---------')
        console.log(res.data)
        if (res.data.result.errcode == '-1'){
          console.log('err')
          app.echoErr(res.data.result.errMsg)
        }else{
          that.setData({ addrData: res.data.result })
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
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    this.getAddr()
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
    this.getAddr()
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
    this.getAddr()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})