

const app = getApp()

Page({

  data: {

    setting: null, // setting   
    productListData: [], // 商品数据 
    sendData:null,
    sysWidth: 320,//图片大小
    searchProductName:"",
    /* 显示或影藏 */
    focusTypeItem: null,
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
    productTypeItem:[],
    productTypeName:"",
    sendIndexData:null,
    showListType:null,
  },
  /* 点击遮罩层 */
  closeZhezhao: function () {
    this.data.showType = false;
    this.setData({ showType: false, bindProductTypeIndex: null })
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
          if (data[i].tagPrice > data[i].price) {
            let discount = ((Number(data[i].price) / Number(data[i].tagPrice)) * 10).toFixed(1);
            data[i].discount = discount
          }
        }
        console.log("data", data)
        if (ifAdd == 2) {
          dataArr = []
        }
        let showListType=null
        if (data.length!=0&&data[0].productType==6){
          showListType ="piaowu"
        } else {
          showListType = "common"
        }
        that.setData({ showListType: showListType })
        console.log("showListType", that.data.showListType)
        if (!data || data.length == 0) {
          that.setData({ productListData: null, sendData: { relateBean: [], jsonData: { count: 0 }}})
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(data)
          if (showListType == 'piaowu'){
            that.setData({ productListData: dataArr, sendData: { relateBean: dataArr, jsonData: { count: dataArr.length, showCard: 0 } } })
          }else{
            that.setData({ productListData: dataArr, sendData: { relateBean: dataArr, jsonData: { count: dataArr.length, showCard: 1 } } })
          }
        }
        console.log("datasendData", that.data.sendData)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  tolinkUrl: function (e) {
    console.log("===e====", e)
    let info = e.currentTarget.dataset.info
    let linkUrl
    let id = info&&info.id||"";
    if (info){
      if (info.productType == 6) {
        linkUrl = "ticket_detail.html?productId=" + info.id;
      } else {
        linkUrl = "product_detail.html?productId=" + info.id;
      }
    }else{
      linkUrl = e.currentTarget.dataset.link;
    }
    if (linkUrl =="search_page.html"){
      this.setData({ reqSearch:true})
    }
    app.linkEvent(linkUrl)
  },
  /* 全部参数 */
  params: {
    categoryId: "",
    page: 1,
    productName: "",
    orderType: "",
    productTypeId: "",
    itemSpecialSaleType: "0",
    promotionId: "",
    longitude:0,
    latitude:0,
  },
  productTypeItem:[
    { id: 0, title: "热卖", upState: false, downState: false, orderType: { up: 101, down: 1 }},
    { id: 1, title: "价格", upState: false, downState: false, orderType: { up: 102, down: 2 }},
    { id: 2, title: "折扣", upState: false, downState: false, orderType: { up: 105, down: 5 }},
    { id: 3, title: "活动", state:false},
  ],
  selectPromotionType: function (e) {
    console.log("====selectPromotionType====", e)
    let that = this;
    let itemSpecialSaleType = e.currentTarget.dataset.itemspecialsaletype||0;
    that.params.itemSpecialSaleType = itemSpecialSaleType
    that.getData(that.params, 2);
  },
  selectSearchType:function(e){
    console.log("====selectSearchType====", e)
    let that=this;
    let index = e.currentTarget.dataset.index||0
    let id = e.currentTarget.dataset.id || 0;
    let orderType = e.currentTarget.dataset.ordertype || {};
    console.log("===orderType===", orderType)
    for (let i=0;i<that.productTypeItem.length;i++){
      if (that.productTypeItem[i].id!=3&&i!=index){
        that.productTypeItem[i].upState = false;
        that.productTypeItem[i].downState = false;
      }
    }
    if (!that.productTypeItem[index].upState && !that.productTypeItem[index].downState && index != 3){
      that.productTypeItem[index].upState=true;
      that.params.orderType = orderType.up
    } else if (that.productTypeItem[index].upState && !that.productTypeItem[index].downState && index != 3) {
      that.productTypeItem[index].upState = false;
      that.productTypeItem[index].downState = true;
      that.params.orderType = orderType.down
    } else if (index == 3) {
      if (that.productTypeItem[index].state) {
        that.productTypeItem[index].state = false;
      } else {
        that.productTypeItem[index].state = true;
      }
    } else {
      that.params.orderType = 0
      that.productTypeItem[index].downState = false;
      that.productTypeItem[index].upState = false;
    }
    that.setData({ productTypeItem: that.productTypeItem})
    if (index != 3) {
      that.params.page = 1
      that.getData(that.params, 2);
    }
  },
  toProductDetail: function (event) {
    console.log("--------toProductDetail------")
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '../productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
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
    console.log("===options===", options)
    let that=this;
    let locationAddressData = wx.getStorageSync('selectAddressData') || ''
    if (locationAddressData) {
      that.params.latitude = locationAddressData.latitude;
      that.params.longitude = locationAddressData.longitude;
    }
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "product_list", params: { } })
    that.setData({ sendIndexData: sendIndexData })
    if (options.productName){
      that.setData({ searchProductName: options.productName})
    }
    if (!!options.productTypeId) {
      options.categoryId = options.productTypeId
    }
    for (let i in options) {
      for (let j in that.params) {
        if (i.toLowerCase() == j.toLowerCase()) { that.params[j] = options[i] }
      }
    }
    console.log(that.params)
    that.getData(that.params, 2);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.setting.platformSetting.defaultColor,
    })
    // wx.setNavigationBarTitle({
    //   title: "奶爸无忧·母婴商超",
    // })
    this.setData({
      setting: app.setting,
      defaultColor: app.setting.platformSetting.defaultColor,
      secondColor: app.setting.platformSetting.secondColor,
      reqSearch:false,
      productTypeItem:this.productTypeItem,
    });
    console.log("===app.setting,====", app.setting,)
    this.setProductTypeName(options.categoryId)
  },
  setProductTypeName:function(id){
    let that=this;
    let categories = app.setting.platformSetting.categories
    if(id==0||!id){
      that.setData({ productTypeName: "全部" })
    }else{
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id == id) {
          that.setData({ productTypeName: categories[i].name })
        }
      }
    }
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
        try {
          app.carChangeNotify(res.data);
        } catch (e) { }


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
    // if (that.data.reqSearch) {
    //   //搜索
    //   console.log("从搜索页面返回")
    //   var pages = getCurrentPages();
    //   var currPage = pages[pages.length - 1]; //当前页面
    //   console.log(currPage) //就可以看到data里mydata的值了
    //   console.log("搜索名称", that.data.searchValue)
    //   that.params.productName = that.data.searchValue;
    //   that.setData({ searchProductName: that.data.searchValue })
    //   that.getData(that.params,2);
    // }
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