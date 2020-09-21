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
  dellBackImage: function (imageList) {
    let returnList = []
    for (let i = 0; i < imageList.length; i++) {
      returnList.push(imageList[i].imagePath)
    }
    return returnList
  },
  lookBigImage: function (e) {
    let url = e.currentTarget.dataset.url
    let urls = e.currentTarget.dataset.urls
    app.lookBigImage(url, urls)

  },
  getOrderDetail: function (orderItemId) {
    let that = this
    let getParams = {}
    getParams.orderItemId = orderItemId
    let customIndex = app.AddClientUrl("/get_order_product_comment_page_partial.html", getParams)

    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        if (res.data.id) {
          if (res.data.backAmount && res.data.backAmount.backImageJson) {
            let imageList = res.data.backAmount.backImageJson
            imageList = JSON.parse(imageList)
            res.data.backAmount.backImageList = that.dellBackImage(imageList)
          }

          that.setData({ orderDetailData: res.data })
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
  onLoad: function (option) {
    var that = this
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    console.log(option)
    that.getOrderDetail(option.orderItemId)
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
