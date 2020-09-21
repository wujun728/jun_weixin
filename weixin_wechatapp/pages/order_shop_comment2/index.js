

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting: null,
    Data: null,
    //Reason: '',
    /* 分数 */
    scoll_1: 5, //商品符合度
    scoll_2: 5, //服务态度
    scoll_3: 5, //发货速度
    getScore: 2, //评分
 
    checked: 2, //checkBox
    sysWidth: 320,//图片大小
  },
  /* 添加商品评论图片 */
  addCommitImage:function(e){
    var that = this
    let productId = e.currentTarget.dataset.productid
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        that.addCommitImageToData(productId, tempFilePaths)
      }
    })
  },
  /* 把图片加到orderItem属性里面 */
  addCommitImageToData: function (productId, tempFilePaths){
    let DataItem = this.data.Data
    for (let i = 0; i < DataItem.orderItems.length; i++){
      if (DataItem.orderItems[i].itemId == productId){
        DataItem.orderItems[i].commitImages = tempFilePaths
      }
    }
    this.setData({ Data:DataItem })
  },
  /* 把分数加到orderItem属性里面  */
  addCommitScrollToData: function (productId, scroll){
    let DataItem = this.data.Data
    for (let i = 0; i < DataItem.orderItems.length; i++) {
      if (DataItem.orderItems[i].itemId == productId) {
        DataItem.orderItems[i].commitScroll = scroll
      }
    }
    this.setData({ Data: DataItem })
  },
  /* 商品评分 */
  productScroll:function(e){
    let scoll = e.currentTarget.dataset.scroll
    var result = app.getSpaceStr(scoll,'!')
    this.addCommitScrollToData(result.str2, result.str1)
  },

  /* 选择分数  心形 */
  //商品符合度
  bindScoll_1: function (e) {
    let scoll_1 = e.currentTarget.dataset.scroll
    this.setData({ scoll_1: scoll_1 })
  },
  //服务态度
  bindScoll_2: function (e) {
    let scoll_2 = e.currentTarget.dataset.scroll
    this.setData({ scoll_2: scoll_2 })
  },
  //发货速度
  bindScoll_3: function (e) {
    let scoll_3 = e.currentTarget.dataset.scroll
    this.setData({ scoll_3: scoll_3 })
  },

  /* 选择评分 */
  chooseScore: function (e) {
    this.setData({ getScore: e.detail.value, checked: e.detail.value })
  },

  /* 拿到评价的内容 */
  getCommitContent: function (e) {
    let productId = e.currentTarget.dataset.productid
    let commitContent = e.detail.value
  
    let DataItem = this.data.Data
    for (let i = 0; i < DataItem.orderItems.length; i++) {
      if (DataItem.orderItems[i].itemId == productId) {
        DataItem.orderItems[i].commitContent = commitContent
      }
    }
    this.setData({ Data: DataItem })
  },
/* 准备评价的数据    goods*/
  readyCommit_product:function(){
    let DataItem = this.data.Data
    let readySentArr = []
    for (let i = 0; i < DataItem.orderItems.length; i++) {
      let readySent = {}
      readySent.orderNo = DataItem.orderNo
      readySent.productId = DataItem.orderItems[i].itemId
      readySent.shopId = DataItem.orderItems[i].shopId 
      readySent.commentContent=DataItem.orderItems[i].commitContent  //评论
      readySent.pingfen = DataItem.orderItems[i].commitScroll  //评分
      readySent.commentImages = DataItem.orderItems[i].commitImages  //图片
      readySentArr.push(readySent)
    }
    return readySentArr
  },
  /* 商品评价 */
  commitProduct:function(){
    var that = this
    let readySentArr = this.readyCommit_product()
    let overCommit = 0
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    for (let i = 0; i < readySentArr.length;i++){
      let customIndex = app.AddClientUrl("/comment_order.html", readySentArr[i], 'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log('---success----product----')
          console.log(res.data)
          overCommit++;
          if (overCommit == readySentArr.length){
            
            that.commitShop()
          }
        },
        fail: function (res) {
          console.log('---fail----product----')
        },
        complete:function(res){
          wx.hideLoading()
        }
      })
    }
    
  },
  /* 准备评价的数据    shop*/
  readyCommit_shop: function () {
    let DataItem = this.data.Data
    let readySentArr = []
    for (let i = 0; i < DataItem.orderItems.length; i++) {
      let readySent = {}
      readySent.productId = DataItem.orderItems[i].itemId
      readySent.shopId = DataItem.orderItems[i].shopId
      readySent.commentContent = DataItem.orderItems[i].commitContent  //评论
      readySent.pingfen = DataItem.orderItems[i].commitScroll  //评分
      readySent.commentImages = DataItem.orderItems[i].commitImages  //图片
      readySentArr.push(readySent)
    }
    return readySentArr
  },
  /* 店家评价 */
  commitShop:function(){
    let scoll_1 = this.data.scoll_1
    let scoll_2 = this.data.scoll_2
    let scoll_3 = this.data.scoll_3
    let Data = this.data.Data
    var that = this
    let PostData = {}


    PostData.orderNo = Data.orderNo,
    PostData.shopId = Data.belongShop
    PostData.shangpinfuhedu = scoll_1
    PostData.dianjiafuwutaidu = scoll_2
    PostData.wuliufahuosudu = scoll_3
    var customIndex = app.AddClientUrl("/comment_order.html", PostData, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---success----shop----')
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 1000)
        console.log(res.data)
      },
      fail: function (res) {
        console.log('---fail----shop----')
        app.loadFail()
      }
    })
  },
  //参考淘宝的评价系统
  /*
    产品评价和店铺评价分开
    产品评价带上评分和comment和productId
    产品评价要便利出来，每个产品单独一个
    店铺评价就不用了就底下的三行星就行
   */
  sureCommit: function () {
    console.log('=========    bindCommit    ========')
    //this.commitShop()
    this.commitProduct()
  },
  //初始化分数
  chushihuaScroll: function (Data){
    let DataItem = Data
    for (let i = 0; i < DataItem.orderItems.length; i++) {
         DataItem.orderItems[i].commitContent = ''  //评论
         DataItem.orderItems[i].commitScroll = 5  //评分
         DataItem.orderItems[i].commitImages = []  //图片
    }
    this.setData({Data:DataItem})
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