
const app = getApp()
Page({

  /**
   * 页面的初始数据 
   */
  data: {

    setting: null,
    loginUser: null,

    orderNo: null,
    orderDetailData: null
  },
  getOrderDetail: function (orderNo) {
    let that = this
    let getParams = {}
    getParams.orderNo = orderNo

    let customIndex = app.AddClientUrl("/get_manager_mendian_order_detail_admin_mendian_json.html", getParams,'post')

    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        if(res.data.errcode == 0){
          that.setData({ orderDetailData: res.data.relateObj })
        }
        
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //物流单号 一键复制的事件
  copyTBL: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.orderDetailData.invoiceNo,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    console.log(option)
    that.getOrderDetail(option.orderNo)
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

})