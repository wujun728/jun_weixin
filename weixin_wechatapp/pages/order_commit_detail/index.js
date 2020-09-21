

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting: null,
    Data: null,
    Reason: '',
    /* 分数 */
    scoll_1: 1, //商品符合度
    scoll_2: 1, //服务态度
    scoll_3: 1, //发货速度
    getScore:2, //评分
  
    checked:2, //checkBox
  },

/* 选择分数  心形 */
  //商品符合度
  bindScoll_1:function(e){
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

  /*  */
  chooseScore:function(e){
    this.setData({ getScore: e.detail.value, checked: e.detail.value})
  },
  

  getReason: function (e) {
    this.setData({
      Reason: e.detail.value
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
    let Reason = this.data.Reason
    //let getScore = this.data.getScore

    let scoll_1 = this.data.scoll_1
    let scoll_2 = this.data.scoll_2
    let scoll_3 = this.data.scoll_3
    let Data = this.data.Data
    var that = this
    let PostData = {}
    

    PostData.orderNo = Data.orderNo,
    PostData.commentContent = Reason
   // PostData.pingfen = getScore
    PostData.shopId = Data.belongShop
    PostData.productId = 0
    PostData.shangpinfuhedu = scoll_1
    PostData.dianjiafuwutaidu = scoll_2
    PostData.wuliufahuosudu = scoll_3

    for (let i = 0; i < Data.orderItems.length;i++){
      //PostData.productId += Data.orderItems[i].productItem.id + ','
    //  PostData.productId = Data.orderItems[i].productItem.id 
    }
    console.log(PostData)
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    var customIndex = app.AddClientUrl("/comment_order.html", PostData,'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
            
            wx.showToast({
              title: '评价成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
         
        },
        fail: function (res) {
          
          app.loadFail()
        },
        complete:function(){
          wx.hideLoading()
        }
      })
       
  },

  getItem: function (e) {
    var orderItemId = e

    var that = this
    var getParams = {}
    getParams.orderNo = orderItemId
    var customIndex = app.AddClientUrl("/get_order_detail.html", getParams)
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        that.setData({
          Data: res.data
        })
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
    this.getItem(options.orderNo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting: app.setting
    })
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