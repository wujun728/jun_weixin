// pages/dashi/index.js

const app = getApp()

Page({ 

  /** 
   * 页面的初始数据
   */
  data: {
    setting: null, // setting 
    productData: [], // 商品数据 
  },
/* 查看更多 */
  showDaShi: function(e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../brand_detail/index?brandId=' + e.currentTarget.dataset.brandid,
    })
  },
  /* 取消关注 */
  removeGuanzhuDaShi:function(e){
    if (!app.checkIfLogin()) {
     
      return
    }
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)

    var postData = {
      itemId: '',
      favoriteType: '9'
    }
    postData.itemId = e.currentTarget.dataset.brandid
    console.log(postData)
    var that = this
    var customIndex = app.AddClientUrl("/remove_favorite.html", postData,'POST')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if(res.data.errcode == '0'){
          that.freshData(postData.itemId)
        }
        
        wx.hideLoading()

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
/* 关注 */
  guanzhuDaShi:function(e){
    if (!app.checkIfLogin()) {
      
      return
    }
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var postData = {
      itemId: '',
      favoriteType: '9'
    }
    postData.itemId = e.currentTarget.dataset.brandid
    console.log(postData)
    var that = this
    var customIndex = app.AddClientUrl("/add_to_favorite.html", postData,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          that.freshData(postData.itemId)
        }
        wx.hideLoading()

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /* 查看商品 */
  lookProdocuDaShi: function (e) {
    console.log(e.currentTarget.dataset.brandid)
   
    wx.navigateTo({
      url: '../search_product/index?brandid=' + e.currentTarget.dataset.brandid
    })
   },

  listPage:{
    page:1,
    pageSize:0,
    totalSize:0,
    curpage:1
  },
  
  /* 获取数据 */
  getData: function () {
    let getParam = {}
    var that = this
    getParam.page = that.listPage.page
    let customIndex = app.AddClientUrl("/get_brand_list.html", getParam )
    app.showToastLoading('loading', true)
    
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        console.log(res.data.relateObj)

        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize

        let dataArr = that.data.productData
        dataArr = dataArr.concat(res.data.relateObj.result)
        that.setData({ productData: dataArr })
        wx.hideLoading()
      }
    })
  },
  /* 刷新数据 */
  freshData: function (id) {
    var productData = this.data.productData
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id == id ){
        productData[i].guanzhu = !productData[i].guanzhu
      }
    }

    this.setData({ productData: productData})
    
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(); 
    this.setData({ setting: app.setting })
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
    //this.getData(); 
    
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
    this.data.productData = []

    this.listPage.page = 1
    this.getData();
    
    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize){
      that.listPage.page++
      this.getData(); 
    }
  },

  
})