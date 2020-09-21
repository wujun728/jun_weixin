
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VisitList:[]
  },
  toProductDetail: function (event){
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + info.visitItemId + "&addShopId=" + info.belongShopId,
    })
  },
  /* 获取 */
  getUserVisitList:function(fresh){
    if (!app.checkIfLogin()) {
 
      return
    }
    if(!fresh){
      fresh = 1
    }
    var getParams = {}
    getParams.page = this.listPage.page
    var customIndex = app.AddClientUrl("/get_user_visit_items.html", getParams)
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------getUserVisitList--------')
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.VisitList
        if (fresh == 2){
          dataArr = []
       }

        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ VisitList: null })
        } else {
          dataArr = dataArr.concat(res.data.result)
          that.setData({ VisitList: dataArr })
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
    this.getUserVisitList()
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
    this.data.jifenList = []

    this.listPage.page = 1
    this.getUserVisitList(2);

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
      this.getUserVisitList();
    }
  },

})