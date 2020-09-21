

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    productData: [], // 商品数据 
    sysWidth: 320,//图片大小
    positionTab:'',
    topName: {
    SearchProductName: "",//头部搜索的
    },
    focusTypeItem: null,
    typeSearch: '', // typeSearch的字体 
    colorAtive: '#888',
    productDetail:null,
    productType:[],
  },
  toIndex(){
    app.toIndex()
  },
  //获取产品分类
  getProductType: function (categoryId){
    var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: categoryId||0})
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log("getProductType",res.data)
        if (res.data.errcode==0){
          that.setData({ productType: res.data.relateObj })
        }else{
          that.setData({ productType: that.data.productType })
        }
        that.data.productType.unshift({ id: categoryId||0,name:"全部"})
        for (let i = 0; i < that.data.productType.length; i++) {
          that.data.productType[i].colorAtive = '#888';
        }
        that.data.productType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.data.productType[0].active = true;
        that.setData({ productType: that.data.productType })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event)
    let onId;
    if (event && event.currentTarget){
      onId = event.currentTarget.dataset.type.id
      console.log('====bindTypeItem currentTarget====',onId)
    } else if (event && !event.currentTarget){
      onId = event
      console.log('====bindTypeItem event====',onId)
    }
    for (let i = 0; i < this.data.productType.length; i++) {
      if (this.data.productType[i].id == onId ) {
        this.data.productType[i].active = true
        console.log(this.data.setting.platformSetting.defaultColor)
        this.data.productType[i].colorAtive =this.data.setting.platformSetting.defaultColor;
      }
      else {
        this.data.productType[i].active = false
        this.data.productType[i].colorAtive = '#888';
      }
    }
    this.setData({
      productType: this.data.productType,
    })

    this.listPage.page = 1
    this.params.page = 1
    this.params.categoryId = onId
    this.getData(this.params, 2)
  },
  ChangeParam: function (params) {
    var returnParam = ""
    for (let i in params) {
      returnParam += "&" + i + "=" + params[i]
    }
    console.log(returnParam)
    return returnParam
  },
  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/more_product_list.html", param)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.productData
        let tagArray=[];
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.result)
          for (let i = 0; i < dataArr.length; i++) {
            dataArr[i].promotion = Number(dataArr[i].promotion);
            if (dataArr[i].tags && dataArr[i].tags!=''){
              tagArray = dataArr[i].tags.slice(1,-1).split("][")
              dataArr[i].tagArray = tagArray;
            }
          }
          that.setData({ productData: dataArr })
          console.log(that.data.productData)
        }
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 全部参数 */
  params: {
    categoryId: "",
    platformNo: "",
    belongShop: "",
    typeBelongShop: "",
    page: 1,
    showColumn: "",
    productName: "",
    orderType: "",
    saleTypeId: "",
    promotionId: "",
    shopProductType: "",
    latitude:'0',
    longitude:'0',

  },
  /* 查找商品 */
  getSearchProductName: function (e) {
    console.log(e)
    if (e.detail.value){
      this.params.productName = e.detail.value
    }else{
      this.params.productName=''
    }
    var that = this
    var customIndex = this.more_product_list_URL(this.params);
    console.log(customIndex)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          let tagArray;
          for (let i = 0; i < res.data.result.length; i++) {
            if (res.data.result[i].tags && res.data.result[i].tags != '') {
              tagArray = res.data.result[i].tags.slice(1, -1).split("][")
              res.data.result[i].tagArray = tagArray;
            }
          }
          that.setData({ productData: res.data.result })
        }

      },
      fail: function () {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  more_product_list_URL: function (params) {
    let resule = app.AddClientUrl("/more_product_list.html", params)
    return resule;
  },

  toProductDetail: function (event) {
    console.log("--------toProductDetail------", event)
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    let id;
    let belongShopId = info.belongShopId;
    if (info.productId){
      id = info.productId
    }else{
      id = info.id
    }
    wx.navigateTo({
      url: '../productDetail/index?id=' + id + "&addShopId=" + belongShopId,
    })
  },

  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.initSetting();
    console.log("options", options)
    if (options.parentCategoryId) {
      that.setData({ positionTab: options.parentCategoryId })
      options.categoryId = options.parentCategoryId
      that.getProductType(options.categoryId, that.bindTypeItem)
    } else {
      that.getProductType(options.categoryId)
    }
    for (let i in options) {
      for (let j in that.params) {
        if (i.toLowerCase() == j.toLowerCase()) { that.params[j] = options[i] }
      }
    }
    that.setData({
      params: that.params,
    })
    console.log(that.params)
    that.getData(that.params, 2);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initSetting(){
    this.setData({ setting: app.setting })
    console.log(app.setting)
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


    this.listPage.page = 1
    this.params.page = 1
    this.getData(this.params, 2)

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      that.params.page++
      this.getData(this.params);
    }
  },

})