

const app = getApp()

Page({

  data: {

    setting: null, // setting   
    productData: [], // 商品数据 
    sysWidth: 320,//图片大小

    selectTab: [],
    /* 显示或影藏 */
    showType: false,
    show0: false,
    show1: false,
    show2: false,
    topName: {
      SearchProductName: "",//头部搜索的
    },


    focusTypeItem: null,
    bindProductTypeIndex: null,

    ProductshowWay: 1, // ProductshowWay列表显示方法 

    typeSearch: '', // typeSearch的字体 



    s_price: {  // 查询的价格 
      startPrice: "",
      endPrice: ""
    },
  },
  /* 点击分类 */
  bindProductType: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == this.data.bindProductTypeIndex) {
      this.data.showType = false;

      this.setData({
        showType: this.data.showType,
        bindProductTypeIndex: null
      })
    }
    else {
      this.data.showType = true;
      this.data.bindProductTypeIndex = index;
      if (index == 0) {
        this.data.show0 = true;
        this.data.show1 = false;
        this.data.show2 = false;
      }
      else if (index == 1) {
        this.data.show0 = false;
        this.data.show1 = true;
        this.data.show2 = false;
      }
      else if (index == 2) {
        this.data.show0 = false;
        this.data.show1 = false;
        this.data.show2 = true;
      }

      this.setData({
        show0: this.data.show0,
        show1: this.data.show1,
        show2: this.data.show2,
        showType: this.data.showType,
        bindProductTypeIndex: this.data.bindProductTypeIndex
      })

    }

  },

  /* 点击遮罩层 */
  closeZhezhao: function () {
    this.data.showType = false;
    this.setData({ showType: false, bindProductTypeIndex: null })
  },

  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event.currentTarget.dataset.type)
    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      if (this.data.setting.platformSetting.categories[i].id == event.currentTarget.dataset.type.id) {
        this.data.setting.platformSetting.categories[i].active = true
      }
      else {
        this.data.setting.platformSetting.categories[i].active = false
      }
    }
    this.setData({
      setting: this.data.setting,
    })

    this.listPage.page = 1
    this.params.page = 1

    if (event.currentTarget.dataset.type.id == "all") {

      this.params.categoryId = ''
      this.getData(this.params, 2)
      this.setData({ showType: false, bindProductTypeIndex: null })

      var allItem = {
        id: ""
      }
      this.setData({
        focusTypeItem: allItem
      })
    }
    else {

      this.setData({
        focusTypeItem: event.currentTarget.dataset.type,
      })
      var focus = event.currentTarget.dataset.type

      if (focus.children.length == 0) {



        this.params.categoryId = focus.id
        this.getData(this.params, 2)
        this.setData({ showType: false, bindProductTypeIndex: null })
      }

    }

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
    //var postParam = this.ChangeParam(param)
    //param.page = this.listPage.page
    var customIndex = app.AddClientUrl("/more_product_list.html", param, 'get', '1')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this


    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.productData

        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.result)
          that.setData({ productData: dataArr })
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
    showType: "",
    showColumn: "",
    productName: "",
    startPrice: "",
    endPrice: "",
    orderType: "",
    saleTypeId: "",
    promotionId: "",
    shopProductType: "",
    attrKeyValues:'',
    endPrice:'',
    startPrice:'',
    attrKeyValues:"",
    itemSpecialSaleType:'',
    tag:"",
  },
  /* 查找商品 */
  getSearchProductName: function (e) {
    this.params.productName = e.detail.value
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
          that.setData({ productData: res.data.result })
        }

      },
      fail: function () {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /* 分类查询 */
  searchProduct: function (event) {
    var that = this;
    this.setData({ showType: false, bindProductTypeIndex: null })
    console.log(event.currentTarget.dataset)
    var focusKey = event.currentTarget.dataset;
    console.log(this.params)
    for (let i in focusKey) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = focusKey[i] }
      }
    }
    switch (this.params.orderType) {
      case '0': {
        this.setData({ typeSearch: '默认排序' }); break;
      };
      case '102': {
        this.setData({ typeSearch: '价格升序' }); break;
      };
      case '2': {
        this.setData({ typeSearch: '价格降序' }); break;
      };
      case '104': {
        this.setData({ typeSearch: '上架日期升' }); break;
      };
      case '4': {
        this.setData({ typeSearch: '上架日期降' }); break;
      };
      case '101': {
        this.setData({ typeSearch: '销量升' }); break;
      };
      case '1': {
        this.setData({ typeSearch: '销量降' }); break;
      };
    }

    console.log(this.params)
    this.params.page = 1
    var customIndex = this.more_product_list_URL(this.params);
    console.log(customIndex)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    that.listPage.page = 1
    that.params.page = 1
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {

        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize

        console.log(res.data)


        wx.hideLoading()

        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          let dataArr = []
          dataArr = dataArr.concat(res.data.result)
          that.setData({ productData: dataArr })
        }

        /* if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          that.setData({ productData: res.data.result })
        } */

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


  /* 价格排序 */
  getStartValue: function (e) {
    this.data.s_price.startPrice = e.detail.value
  },
  getEndValue: function (e) {
    this.data.s_price.endPrice = e.detail.value
  },
  searchProductbyPrice: function () {
    var that = this;
    this.setData({ showType: false, bindProductTypeIndex: null })

    var focusKey = this.data.s_price

    console.log(this.params)
    for (let i in focusKey) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = focusKey[i] }
      }
    }
    console.log(this.params)

    var customIndex = this.more_product_list_URL(this.params);
    console.log(customIndex)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          that.setData({ productData: res.data.result })
        }
        that.setData({ s_price: that.data.s_price })
      }
    })
  },
  /* 商品显示方法 */

  bindProductshowWay: function () {
    if (this.data.ProductshowWay == 1) {
      this.setData({ ProductshowWay: 2 })
    } else {
      this.setData({ ProductshowWay: 1 })
    }

  },


  toProductDetail: function (event) {
    console.log("--------toProductDetail------")
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    let link = 'productDetail.html ? id = ' + info.id + "&addShopId=" + info.belongShopId;
    app.linkEvent(link)
    // wx.navigateTo({
    //   url: '../productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
    // })
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

    if (!!options.productTypeId) {
      options.categoryId = options.productTypeId
    }
    if (!!options.forceSearch && options.forceSearch == 2) {
      this.setData({ ProductshowWay: 2 })
    } else {
      this.setData({ ProductshowWay: 1 })
    }
    for (let i in options) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = options[i] }
      }
    }
    console.log(this.params)
    this.getData(this.params, 2);

    this.setData({
      sysWidth: app.globalData.sysWidth
    });
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