
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favouriteList: [],
    productList: [],
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
  },
  /* 删除收藏 */
  removeFavourite: function (e) {
    let that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    let postData = {
      itemId: '',
      favoriteType: '1'
    }
    postData.itemId = e.currentTarget.dataset.itemid
    console.log("===postData===", postData)
    let customIndex = app.AddClientUrl("/remove_favorite.html", postData, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          console.log("that.data.productList", that.data.productList)
          for (let i = 0; i < that.data.productList.length;i++){
            if (postData.itemId == that.data.productList[i].productId){
              console.log("====i====", i, that.data.productList[i])
              that.data.productList.splice(i,1)
              that.setData({ productList: that.data.productList})
            }
          };
          wx.showToast({
            title: '已取消收藏！',
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  tolinkUrl: function (e) {
    console.log(e.currentTarget.dataset.id)
    // product_detail.html?productId= 9219;
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
    app.linkEvent(a);
  },
  toProductDetail: function (event) {
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + info.itemId + "&addShopId=" + info.shopId,
    })
  },
  /* 获取 */
  getUserVisitList: function () {

    let getParam = {}
    getParam.favoriteType = 1
    getParam.page = this.listPage.page
    var customIndex = app.AddClientUrl("/get_favorite.html", getParam)
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------get_favorite--------')
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.favouriteList
        dataArr = dataArr.concat(res.data.result)
//  productList: { androidTemplate: "pupu_product_list_one", jsonData: { count: 0}, relateBean:[] }
//  { androidTemplate: "pupu_product_list_one", relateBean: dataArr, jsonData: { count: dataArr.length, showCard: 1}, relateBean: dataArr}
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ favouriteList: [], productList: [] })
        } else {
          that.setData({ favouriteList: dataArr, productList: dataArr })
        }
        
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
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
    console.log("====readyAddCar=====", e, that.data.byNowParams)
    let productInfo = e.currentTarget.dataset.product;
    that.data.productData.productInfo = productInfo
    that.setData({ productData: that.data.productData })
    let productId = productInfo.productId || productInfo.id
    console.log("====productInfo.id=====", productId)
    that.get_product_measure(productId)
  },

  subNum: function () {
    if (this.data.measurementJson.id) {
      this.setData({ minCount: this.data.measurementJson.minSaleCount })
    } else {
      this.setData({ minCount: 1 })
    }
    if (this.data.byNowParams.itemCount == this.data.minCount) {
      return
    }
    this.data.byNowParams.itemCount--;
    this.setData({ byNowParams: this.data.byNowParams })
  },
  addNum: function () {
    this.data.byNowParams.itemCount++;
    this.setData({ byNowParams: this.data.byNowParams })
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

    let productId = this.data.productData.productInfo.productId || this.data.productData.productInfo.id
    console.log("====productInfo.id=====", productId)
    params.productId = productId
    params.shopId = this.data.productData.productInfo.belongShopId || this.data.productData.productInfo.shopId
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
        that.setData({ minCount: that.data.byNowParams.itemCount })
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
          console.log("====info==", info)
          that.data.byNowParams.productId = info.id
          that.data.byNowParams.shopId = info.belongShopId || info.shopId
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserVisitList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting: app.setting,
      defaultColor: app.setting.platformSetting.defaultColor,
      secondColor: app.setting.platformSetting.secondColor,
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
    this.data.favouriteList = []

    this.listPage.page = 1
    this.getUserVisitList();

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
      this.getUserVisitList();
    }
  },

})