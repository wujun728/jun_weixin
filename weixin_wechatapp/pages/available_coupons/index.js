
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCoupon: [],
  },
  //领取优惠券
  GotCoupon: function (e) {
    //gain_coupon
    var data={
      couponId:'',
      couponSecretCode:'',
      couponSecretPassword:''
    }
    data.couponId = e.currentTarget.dataset.id
    console.log(data)
    var that = this
    var customIndex = app.AddClientUrl("/gain_coupon.html", data,'post')
    
    wx.request({
      url: customIndex.url ,
      header: app.headerPost,
      data: customIndex.params,
      method:'POST',
      success: function (res) {
        console.log('---------s---------', res.data)
        let gainData = res.data
        if (!res.data.errcode){
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 1000
          })
          that.freshData(gainData)
        }else{
          wx.showToast({
            title: res.data.errMsg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  freshData: function (gainData){
    console.log("1111111111")
    let showCoupon = this.data.showCoupon
    for (let i = 0; i < showCoupon.length; i++) {
      if (showCoupon[i].id == gainData.id ) {
        showCoupon.splice(i, 1, gainData.coupon)
      }
    }
    this.setData({ showCoupon: showCoupon })

  },
  /* 去掉日期的时间 */
  spliceData: function (e) {
    for (let i = 0; i < e.length; i++) {
      e[i].startDate = e[i].startDate.substring(0, 10)
      e[i].endDate = e[i].endDate.substring(0, 10)
    }
    return e;
  },
  toCouponDetail(data){
    console.log("--------toCouponDetail------", data)
    console.log(data.currentTarget.dataset.id)
    var id = data.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/coupon_detail/index?couponId=' + id,
    })
  },
  getNewCouponsList:function(){
      var that = this
      var getParam = {}
      getParam.page = that.listPage.page
      var customIndex = app.AddClientUrl("/get_available_coupons.html", getParam)

      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log(res.data)

          that.listPage.pageSize = res.data.pageSize
          that.listPage.curPage = res.data.curPage
          that.listPage.totalSize = res.data.totalSize
          let dataArr = that.data.showCoupon
          dataArr = dataArr.concat(res.data.result)

          var result = that.spliceData(dataArr)
          that.setData({ showCoupon: result })
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
    this.getNewCouponsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
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
    this.data.showCoupon = []

    this.listPage.page = 1
    this.getNewCouponsList();

    wx.stopPullDownRefresh() 
  },

  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.getNewCouponsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.shareForFx('available_coupons')
  }
})