

const app = getApp()

Page({

  data: {

    setting: null, // setting   
    productListData: [], // 商品数据 
    sysWidth: 320,//图片大小
    searchProductName:"",
    /* 显示或影藏 */
    showType: false,
    show0: false,
    show1: false,
    show2: false,
    // topName: {
    //   SearchProductName: "",//头部搜索的
    // },
    focusTypeItem: null,
    bindProductTypeIndex: null,
    ProductshowWay: 1, // ProductshowWay列表显示方法 
    typeSearch: '', // typeSearch的字体 
    s_price: {  // 查询的价格 
      startPrice: "",
      endPrice: ""
    },
    productData: {},
    measurementJson: null,
    byNowParams: {
      productId: '',
      itemCount: 1,
      shopId: '',
      cartesianId: '0',
      chatOrder: '',
      fromSource: '',
      orderType: ''
    },
    MeasureParams: [],
    showCount: false,
    bindway: "",
    reqSearch:false,
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
        let data = res.data.result;
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.productListData
        let tagArray = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].tags && data[i].tags != '') {
            tagArray = data[i].tags.slice(1, -1).split("][")
            data[i].tagArray = tagArray;
          }
        }
        console.log("data", data)
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!data || data.length == 0) {
          that.setData({ productListData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(data)
          that.setData({ productListData: dataArr })
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
  linkUrl: function (e) {
    console.log("===e====", e)
    let linkUrl = e.currentTarget.dataset.link;
    if (linkUrl =="search_page.html"){
      this.setData({ reqSearch:true})
    }
    app.linkEvent(linkUrl)
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
    attrKeyValues: '',
    endPrice: '',
    startPrice: '',
    attrKeyValues: "",
    itemSpecialSaleType: '',
    tag: "",
  },
  /* 查找商品 */
  getSearchProductName: function (e) {
    var that = this
    if (e.detail.value) {
      that.params.productName = e.detail.value
    } else {
      that.params.productName = ''
      that.setData({ searchProductName: that.params.productName })
    }
    var customIndex = that.more_product_list_URL(that.params);
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
          that.setData({ productListData: null })
        } else {
          that.setData({ productListData: res.data.result })
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
          that.setData({ productListData: null })
        } else {
          let dataArr = []
          dataArr = dataArr.concat(res.data.result)
          that.setData({ productListData: dataArr })
        }

        /* if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productListData: null })
        } else {
          that.setData({ productListData: res.data.result })
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
          that.setData({ productListData: null })
        } else {
          that.setData({ productListData: res.data.result })
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
    console.log("===options===", options)
    if (options.productName){
      this.setData({ searchProductName: options.productName})
    }
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
      sysWidth: app.globalData.sysWidth,
      setting: app.setting,
      reqSearch:false
    });
  },
  closeZhezhao: function () {
    this.setData({ showCount: false })
  },
  /* 立即购买 */
  buyNow: function (e) {
    console.log("==buyNow==", e)
    if (!app.checkShopOpenTime()) {
      return
    }

    if (!app.checkIfLogin()) {
      return
    }
    let bindway;
    if (e.currentTarget.dataset.way) {
      bindway = e.currentTarget.dataset.way
    } else {
      bindway = this.data.bindway
    }
    console.log('=======bindway======', bindway)
    this.setData({ haveMeasuresState: true })
    this.setData({ selectTypeData: this.data.selectTypeData })
    console.log('-----------addtocart----------')
    this.addtocart()


  },
  // 这里是一个自定义方法
  readyAddCar: function (e) {
    let that = this;
    console.log("====readyAddCar=====", e)
    console.log("====byNowParams=====", that.data.byNowParams)
    let productInfo = e.currentTarget.dataset.product;
    that.data.productData.productInfo = productInfo
    that.setData({ productData: that.data.productData })
    console.log("====productData=====", that.data.productData)
    console.log("====productInfo.id=====", productInfo.id)
    that.get_product_measure(productInfo.id)
  },
  addtocart: function () {
    console.log("===addtocart====")
    if (!app.checkIfLogin()) {

      return
    }
    var params = {
      cartesianId: '',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }

    if (this.data.productData.measures.length == 0) {
      params.cartesianId = '0'
    }
    else {
      params.cartesianId = this.data.measurementJson.id
    }

    params.productId = this.data.productData.productInfo.id
    params.shopId = this.data.productData.productInfo.belongShopId
    params.count = this.data.byNowParams.itemCount
    params.type = 'add'
    console.log('===postParams=====', params)
    this.postParams(params)

  },
  postParams: function (data) {
    console.log("==postParams====")
    var that = this
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---------------change_shopping_car_item-----------------')
        console.log(res.data)
        wx.hideLoading()

        if (that.data.bindway == 'cart') {
          that.setData({ showCount: false })
        }

        if (data.productId == 0) {
          console.log('购物车里面的商品数量')
          that.setData({
            countGood: res.data.totalCarItemCount
          })
        } else {
          if (res.data.productId && res.data.productId != 0) {
            if (data.count == 0) {
              console.log('通过加入购物车来确定购物车里面的商品数量')
            } else {
              wx.showToast({
                title: '加入购物车成功',
              })
            }

            if (!!res.data.totalCarItemCount || res.data.totalCarItemCount == 0) {
              that.setData({ countGood: res.data.totalCarItemCount })
            }
          } else {
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
        }



      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /* 
     规格操作
  */
  //提交规格产品
  submitMeasure: function (id) {
    var that = this
    let focusProduct = this.data.MeasureItem
    let measurementJson = this.data.measurementJson
    let data = {}
    data.cartesianId = measurementJson.id
    data.productId = focusProduct.id
    data.shopId = focusProduct.belongShopId
    data.count = 1
    data.type = 'add'

    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------add----------')
        console.log(res.data)
        that.setData({ showGuigeType: false })

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  //获取规格价格参数
  get_measure_cartesion: function () {

    this.setData({ measurementJson: { waitDataState: false } })
    let productId = this.data.productData.productInfo.id
    let postStr = ''
    if (this.data.MeasureParams.length == 0) {
      this.data.byNowParams.cartesianId = '0'
      this.setData({ measurementJson: { waitDataState: true } })//没有规格时 不需要等待请求
      return
    }
    for (let i = 0; i < this.data.MeasureParams.length; i++) {
      postStr += this.data.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    console.log(postStr)
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)

    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("===measurementJson===", res.data)
        that.data.byNowParams.cartesianId = res.data.id
        that.setData({
          measurementJson: res.data
        })
        that.data.measurementJson.waitDataState = true
        that.setData({ measurementJson: that.data.measurementJson })
        that.data.byNowParams.itemCount = that.data.measurementJson.minSaleCount
        that.setData({ byNowParams: that.data.byNowParams })
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },
  //获取规格价格参数
  get_product_measure: function (id) {
    let that = this;
    let productId = id
    let customIndex = app.AddClientUrl("/get_product_measures.html", { productId: productId })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        let measures = res.data;
        that.data.productData.measures = measures
        that.setData({ productData: that.data.productData })
        if (measures.length == 0) {
          that.addtocart()
        } else {
          that.setData({ bindway: "cart" })
          that.setData({ showCount: true })
          let info = that.data.productData.productInfo;
          that.data.byNowParams.productId = info.id
          that.data.byNowParams.shopId = info.belongShopId
          that.data.byNowParams.orderType = 0
          that.setData({ byNowParams: that.data.byNowParams })
          console.log("==byNowParams===", that.data.byNowParams)
          that.chooseMeasureItem()
        }
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },
  /* 初始化 选规格 */
  chooseMeasureItem: function (event) {
    console.log('----------初始化规格参数-----------', event)
    let that = this;
    let productData = that.data.productData
    let focusProduct = productData
    let selectTypeData = []
    for (let i = 0; i < focusProduct.measures.length; i++) {
      focusProduct.measures[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      let selectTypeDataItem = {}
      param.name = focusProduct.measures[i].name
      param.value = focusProduct.measures[i].productAssignMeasure[0].id
      selectTypeDataItem.type = focusProduct.measures[i].name
      selectTypeDataItem.value = focusProduct.measures[i].productAssignMeasure[0].measureName
      console.log('=====param=====', param)
      that.data.MeasureParams.push(param)
      selectTypeData.push(selectTypeDataItem)
    }
    that.data.selectTypeData = selectTypeData

    console.log('====that.data.selectTypeData======', this.data.selectTypeData)




    that.setData({
      productData: focusProduct
    })
    console.log('===MeasureParams====', this.data.MeasureParams)
    that.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let that = this
    let flag = false;
    console.log("====radioChange=====", e)
    console.log('====that.data.selectTypeData======', that.data.selectTypeData)
    if (that.data.selectTypeData) {
      console.log('1111111')
      for (let i = 0; i < that.data.selectTypeData.length; i++) {
        if (e.currentTarget.dataset.type == that.data.selectTypeData[i].type) {
          that.data.selectTypeData.splice(i, 1, e.currentTarget.dataset)
          flag = true;
        }
      }
      if (!flag) {
        that.data.selectTypeData.splice(that.data.selectTypeData.length, 1, e.currentTarget.dataset)
        flag = false;
      }
    } else {
      console.log('222222')
      that.data.selectTypeData = [];
      that.data.selectTypeData.splice(0, 1, e.currentTarget.dataset)
      that.setData({ selectTypeData: that.data.selectTypeData })
    }
    console.log('====that.data.selectTypeData======', that.data.selectTypeData)
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)
    let focusItem = that.data.productData
    focusItem.measures[indexJson.str1].checkedMeasureItem = indexJson.str2
    that.setData({ productData: focusItem })
  },
  //选择规格小巷---获取数据
  chooseMeasure: function (e) {
    console.log(e.detail.value)
    let chooseMeasureJson = app.getSpaceStr(e.detail.value, '-')
    console.log(chooseMeasureJson)

    for (let i = 0; i < this.data.MeasureParams.length; i++) {
      if (this.data.MeasureParams[i].name == chooseMeasureJson.str1) {
        this.data.MeasureParams[i].value = chooseMeasureJson.str2
      }
    }
    this.get_measure_cartesion()
  },
  closeGuigeZhezhao: function () {
    this.setData({ showGuigeType: false })
    this.data.MeasureParams = []
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
    let that=this;
    if (that.data.reqSearch) {
      //搜索
      console.log("从搜索页面返回")
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      console.log(currPage) //就可以看到data里mydata的值了
      console.log("搜索名称", that.data.searchValue)
      that.setData({ searchProductName: that.data.searchValue })
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