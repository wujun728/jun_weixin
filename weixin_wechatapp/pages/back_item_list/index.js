
import { json2Form } from "../../public/json2Form.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    IfbackTo:false
  },
  tuikuan: function (e) {
    var orderNo = e.currentTarget.dataset.orderno   
    wx.navigateTo({
      url: '/pages/back_item_detail/index?orderItemId=' + orderNo,
    })
    this.setData({ IfbackTo:true })
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /* 去详情页面 */
  lookMore:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/back_item_more/index?orderItemId=' + id,
    })
  },
  backWuLiu:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/back_item_wuliu/index?shopBackAmountId=' + id,
    })
    this.setData({ IfbackTo: true })
  },
  /* 获取订单列表 */
  getOrderList: function (options, fresh) {
    if (!app.checkIfLogin()) {
      return
    }
    var customIndex = app.AddClientUrl("/get_back_item_list.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url + '&page=' + that.listPage.page,
      header: app.header,
      success: function (res) {
        console.log('-----------get_back_item_list--------')
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize

        let dataArr = that.data.orderList
        if (fresh){
          dataArr = []
        }
        dataArr = dataArr.concat(res.data.result)

        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ orderList: null })
        } else {
          that.setData({ orderList: dataArr })
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
    this.getOrderList()
    this.GloOption = options
  },
  GloOption: null,
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
    if(this.data.IfbackTo){
      this.data.orderList = []
      this.listPage.page = 1
      this.getOrderList(this.GloOption);
    }
   
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
    this.data.orderList = []

    this.listPage.page = 1
    this.getOrderList(this.GloOption,1);

    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.getOrderList(that.GloOption)
    }
  },
  
})