

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting: null,
    Data: null,
    commentOrder:{},
 
    checked: 2, //checkBox
    sysWidth: 320,//图片大小
  },
  /* 添加商品评论图片 */
  addCommitImage:function(e){
    var that = this
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("======addCommitImage=======", res)
        let tempFilePaths = res.tempFilePaths
        that.addCommitImageToData( tempFilePaths)
      }
    })
  },
  /* 把图片加到orderItem属性里面 */
  addCommitImageToData: function (tempFilePaths) {
    console.log("======addCommitImageToData=======", tempFilePaths)
    let that=this;
    let commentOrder = that.data.commentOrder;
    commentOrder.commentImages = tempFilePaths//commentOrder.commentImages.concat(tempFilePaths)
    that.setData({ commentOrder: commentOrder })
  },
  /* 商品评分 */
  productScroll: function (e) {
    let that = this;
    let commentOrder = that.data.commentOrder
    let scoll = e.currentTarget.dataset.scroll
    commentOrder.pingfen = scoll
    this.setData({ commentOrder: commentOrder })
  },

  /* 选择分数  心形 */
  //商品符合度
  bindScoll_1: function (e) {
    let that = this;
    let commentOrder = that.data.commentOrder
    let scoll = e.currentTarget.dataset.scroll
    commentOrder.shangpinfuhedu = scoll
    this.setData({ commentOrder: commentOrder })
  },
  //店家服务态度
  bindScoll_2: function (e) {
    let that = this;
    let commentOrder = that.data.commentOrder
    let scoll = e.currentTarget.dataset.scroll
    commentOrder.dianjiafuwutaidu = scoll
    this.setData({ commentOrder: commentOrder })
  },
  //发货速度
  bindScoll_3: function (e) {
    let that = this;
    let commentOrder = that.data.commentOrder
    let scoll = e.currentTarget.dataset.scroll
    commentOrder.wuliufahuosudu = scoll
    this.setData({ commentOrder: commentOrder })
  },
  //配送员服务态度
  bindScoll_4: function (e) {
    let that = this;
    let commentOrder = that.data.commentOrder
    let scoll = e.currentTarget.dataset.scroll
    commentOrder.peisongyuanfuwutaidu = scoll
    this.setData({ commentOrder: commentOrder })
  },
  /* 拿到评价的内容 */
  getCommitContent: function (e) {
    console.log("=======getCommitContent======",e)
    let commitContent = e.detail.value;
    let that=this;
    let commentOrder = that.data.commentOrder
    commentOrder.commitContent = commitContent  //评论
    this.setData({ commentOrder: commentOrder })
  },
  /* 商品评价 */
  commitProduct:function(){
    var that = this;
    console.log("that.data.commentOrder", that.data.commentOrder)
    let params = JSON.parse(JSON.stringify(that.data.commentOrder))
    params.commentImages = params.commentImages.join(",")
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    let customIndex = app.AddClientUrl("/comment_order.html", params, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---success----product----')
        console.log(res.data)
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1000)
      },
      fail: function (res) {
        console.log('---fail----product----')
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
    
  },
  //初始化分数
  chushihuaScroll: function (data){
    let that=this;
    let commentOrder = that.data.commentOrder
    commentOrder.commitContent = ''  //评论
    commentOrder.shangpinfuhedu = 5  //商品符合度评分
    commentOrder.pingfen = 5  //评分
    commentOrder.dianjiafuwutaidu = 5  //店家服务态度评分
    commentOrder.wuliufahuosudu = 5  //物流发货速度评分
    commentOrder.peisongyuanfuwutaidu = 5  //配送员服务态度评分
    commentOrder.commentImages = []  //图片
    commentOrder.shopId = data.belongShop  //店铺
    commentOrder.orderNo = data.orderNo  //店铺
    that.setData({ commentOrder: commentOrder})
  },
  //获取数据
  getItem: function (e) {
    var orderItemId = e

    var that = this
    var getParams = {}
    getParams.orderNo = orderItemId
    var customIndex = app.AddClientUrl("/get_order_detail.html", getParams)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        that.setData({
          Data: res.data
        })
        that.chushihuaScroll(res.data)
        console.log(res.data)

      },
      fail: function (res) {
        app.loadFail()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("============pinglun========", options)
    this.getItem(options.orderNo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting: app.setting
    })
    this.setData({
      sysWidth: app.globalData.sysWidth
    });
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