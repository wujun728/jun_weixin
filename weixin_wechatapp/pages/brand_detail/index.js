
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting:null,
    productData: null, // 商品数据 
  },
  toProductDetail:function(e){
    var info = e.currentTarget.dataset.info

    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
    })
    
  },

  /* 取消关注 */
  removeGuanzhuDaShi: function (e) {
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
    var customIndex = app.AddClientUrl("/remove_favorite.html", postData,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.getData()
        wx.hideLoading()

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 关注 */
  guanzhuDaShi: function (e) {
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
        that.getData()
        wx.hideLoading()

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  getData:function(){
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var getParam = {}
    getParam.brandId = that.brandId
    var customIndex = app.AddClientUrl("/get_brand_detail.html", getParam)
    
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.setData({ productData: res.data })
        wx.hideLoading()
      }
    })
  },
  lookMore: function () {
    wx.navigateTo({
      url: '../search_product/index'
    })
  },

  brandId:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var brandId = options.brandId
    this.brandId = brandId
    this.getData()
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
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