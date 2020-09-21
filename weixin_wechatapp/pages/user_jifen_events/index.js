// pages/my_pages/my_jifen/index.js

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    jifenList: []
  },
  
  

  /* 获取订单列表 */
  getJifenList: function () {
    var that = this
    var getParam = {}
    getParam.page = that.listPage.page
    var customIndex = app.AddClientUrl("/get_user_jifen_events.html", getParam)
    
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------get_user_jifen_events--------')
        console.log(res.data)

        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize

        let dataArr = that.data.jifenList
        dataArr = dataArr.concat(res.data.result)


        if (!res.data.result || res.data.result.length == 0){
          that.setData({ jifenList: null })
        }else{
          that.setData({ jifenList: dataArr })
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
    this.getJifenList()
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
    this.data.jifenList = []

    this.listPage.page = 1
    this.getJifenList();

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
      this.getJifenList();
    }
  },

})