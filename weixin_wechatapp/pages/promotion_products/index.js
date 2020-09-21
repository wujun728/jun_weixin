const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterState: false,
    posterActiveState: false,
    ProductshowWay: '2',
    setting: null, // setting           
    loginUser: null,
    productData: [], // 商品数据  
    sysWidth: 320,//图片大小
    acReport: '正品低价，买！买！买！',
    minCount:'1',
    focusIndex: 0,
    carCount: 0,
    //规格信息
    showCount: false,
    focusData: null,
    measurementJson: null,
    ordertypeState: false,
    orderHotState: false,
    byNowParams: {},//购买的参数
    bindType: 'addto', //加入购物车or直接下单

    showKefu: false,
    id: ""//传进来的promotionId，用来辨别这是哪个活动
  },
  imageList: [],
  toCart: function () {
    wx.navigateTo({
      url: '/pages/shopping_car_list2/index',
    })
  },
  //开关显示客服的
  showKefuWechatCode: function (e) {
    let index = e.currentTarget.dataset.index;
    this.closeCardShare(index)
    this.setData({
      showKefu: true
    })
  },
  lookBigWxCode: function (e) {
    let url = e.currentTarget.dataset.url;
    if (!url) {
      return
    }
    let urls = []
    urls.push(url)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  closeKefu: function () {
    this.setData({
      showKefu: false
    })
  },
  //点击 ...  显示分享
  showCardShare: function (e) {
    let oldIndex = this.data.focusIndex

    let index = e.currentTarget.dataset.index;

    let productData = this.data.productData
    let focusData = productData



    if (oldIndex == index) {
      focusData[index].showShare = !focusData[index].showShare
    } else {
      this.closeCardShare(oldIndex)
      focusData[index].showShare = !focusData[index].showShare
    }


    console.log('--------1--------' + index)
    this.setData({
      productData: focusData,
      focusIndex: index
    })

    console.log("productData", this.data.productData)




  },
  //关闭
  closeCardShare: function (oldIndex) {

    let index = this.data.focusIndex
    if (!isNaN(oldIndex) && oldIndex > -1) {
      index = oldIndex
    }
    console.log('--------2关闭--------' + index)
    if (index == -1) {
      return
    }
    let productData = this.data.productData
    let focusData = productData[index]
    if (focusData.showShare == false) {
      return
    }
    focusData.showShare = false;


    let a = 0;
    for (let i = 0; i < productData.length; i++) {
      a = i;
      productData[a].showShare = false
    }
    console.log("productData", productData)

    this.setData({
      productData: productData
    })
  },

  //切割数组
  sliceArray: function (array, size) {
    var result = [];
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
      let start = x * size;
      let end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  },
  /* swiper滑动 */
  swiperCurrentChange: function (e) {
    console.log(e)
    let current = e.detail.current;
    let index = e.currentTarget.dataset.index;
    let productData = this.data.productData
    let focusData = productData[index];
    if (current > focusData.current && current > focusData.pageNum) {
      focusData.pageNum = current
    } else {
      focusData.pageNum = focusData.pageNum
    }
    // console.log(focusData.current) 
    focusData.current = current
    // console.log(focusData.current)
    // focusData.pageNum = pageNum
    // console.log(pageNum)



    this.setData({
      productData: productData,
    })
  },
  //获取图片数组 用来预览用
  getImageUrlList: function (array) {
    let result = [];
    for (let x = 0; x < array.length; x++) {
      result.push(array[x].imagePath);
    }
    return result;
  },
  ChangeParam: function (params) {
    var returnParam = ""
    for (let i in params) {
      returnParam += "&" + i + "=" + params[i]
    }
    console.log(returnParam)
    return returnParam
  },


  sliceProductImageList: function (arr) {

    let that = this
    let sdkVersion = app.compareVersion(app.SDKVersion, '1.4.0') //版本号
    for (let i = 0; i < arr.length; i++) {
      arr[i].imageListArr = that.sliceArray(arr[i].itemImages, 4)
      arr[i].imageListWatcher = that.getImageUrlList(arr[i].itemImages)

      if (i < 2 || sdkVersion != 1) {
        arr[i].showImage = true
      } else {
        arr[i].showImage = false
      }

      arr[i].showShare = false //显示分享
      arr[i].current = 0
      arr[i].pageNum = 0

    }
    return arr
  },
  watchBigImage: function (e) {
    let urls = e.currentTarget.dataset.urls;
    let myurl = e.currentTarget.dataset.me
    console.log(urls)
    wx.previewImage({
      current: myurl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /* 获取数据 */
  getData: function (param, ifAdd, onReachBottom) {
    let that = this
    console.log("id", this.data.id)
    param.promotionId = this.data.id

    let customIndex = app.AddClientUrl("/more_product_list.html", param, 'get')
    console.log("customIndex.url", customIndex.url)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)

    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        that.setData({ reqState: true })
        console.log("特卖数据", res.data)
        that.params.pageSize = res.data.pageSize
        that.params.curPage = res.data.curPage
        that.params.totalSize = res.data.totalSize

        if (that.data.productData && that.data.productData.length != "0") {
          let products = that.data.productData
          console.log("组件商品", products)
          products = products.concat(res.data.result)
          that.setData({
            productData: products
          })
        }
        else {
          console.log("特卖数据", res.data.result)
          that.setData({
            productData: res.data.result
          })
        }


        setTimeout(function () {
          that.getAllRects(onReachBottom)
        }, 300)
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
    page: 1,
    promotionId: "",
    productName: '',
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  byNowParams: {
    productId: '',
    itemCount: 1,
    shopId: '',
    cartesianId: '0',
    orderType: ''
  },
  subNum: function () {
    if (this.data.measurementJson.id) {
      this.setData({ minCount: this.data.measurementJson.minSaleCount })
    } else {
      this.setData({ minCount: 1 })
    }
    if (this.byNowParams.itemCount == this.data.minCount) {
      return
    }
    this.byNowParams.itemCount--;
    this.setData({ byNowParams: this.byNowParams })
  },
  addNum: function (e) {
    let cantadd = e.currentTarget.dataset.cantadd;
    if (cantadd == 1) {
      return
    } else {
      this.byNowParams.itemCount++;
      this.setData({ byNowParams: this.byNowParams })
    }
  },
  selectFun: function (data) {
    let that = this
    console.log('===selectFun====', data)
    let typeData = data.detail.sendData.type;
    let reqdata = data.detail.sendData.data;
    if (typeData == 'addCat') {
      that.bindAddtocart(reqdata)
    } else if (typeData == 'getProData') {
      that.resProData(reqdata)
    }
  },
  resProData: function (data) {
    let that = this;
    console.log('====resProData====', data);
    that.params.curPage = data.detail.sendData.curPage
    that.params.pageSize = data.detail.sendData.pageSize
    that.params.totalSize = data.detail.sendData.totalSize
    this.setData({
      params: that.params
    })
    console.log('===that.params====', that.params)
  },
  //点击加入购物车或立即下单
  bindAddtocart: function (e) {
    console.log("56565555555555555555555555", e.info);
    var info = e.info;
    console.log("info", info)
    this.dellBindItem(info, e.bindbuy)
  },
  bindBuy: function (e) {
    var index = e.index;
    this.dellBindItem(index, 'tobuy')
  },
  dellBindItem: function (info, bindType) {

    // let productData = this.data.productData
    // console.log("productData", productData, id)
    let focusData = info;
    // for (let i = 0; i < productData.length; i++) {
    //   index = i;
    //   if (productData[index].id == id) {
    //     console.log(productData[index])
    //     focusData = productData[index]
    //   }
    // }


    this.byNowParams.productId = focusData.id
    this.byNowParams.shopId = focusData.belongShopId
    this.byNowParams.orderType = 0
    this.chooseMeasureItem(focusData)
    console.log(focusData)
    this.setData({
      focusData: focusData,
      showCount: true,
      byNowParams: this.byNowParams,
      bindType: bindType
    })
  },
  buyNow: function () {
    console.log(this.byNowParams)
    if (!app.checkShopOpenTime()) {
      return
    }

    if (!app.checkIfLogin()) {
      return
    }
    if (this.data.bindType == 'addto') {
      //加入购物车
      console.log('加入购物车')
      this.addtocart()
    } else {
      //立即购买
      console.log('立即购买')
      this.createOrder22(this.byNowParams)
    }

  },

  /* 加入購物車 */
  addtocart: function () {

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

    if (!this.data.focusData.measureItem || this.data.focusData.measureTypes.length == 0) {
      params.cartesianId = '0'
    }
    else {
      params.cartesianId = this.data.measurementJson.id
    }

    params.productId = this.data.focusData.id
    params.shopId = this.data.focusData.belongShopId
    params.count = this.byNowParams.itemCount
    params.type = 'add'

    this.postParams(params)

  },

  getCart: function () {

    var params = {}
    params.productId = 0
    params.count = 0
    params.type = 'add'
    this.postParams(params)
  },
  postParams: function (data) {
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

        if (that.data.bindType == 'addto') {
          that.setData({ showCount: false })
        }
        if (data.productId == 0) {
          console.log('购物车里面的商品数量')
          that.setData({
            carCount: res.data.totalCarItemCount
          })
        } else {
          if (res.data.productId && res.data.productId != 0) {
            that.setData({
              carCount: res.data.totalCarItemCount
            })
            if (data.count == 0) {
              console.log('通过加入购物车来确定购物车里面的商品数量')
            } else {
              wx.showToast({
                title: '加入购物车成功',
              })
            }
          } else {
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icons/tip.png',
              duration: 3000
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

  /* 创建订单 */
  createOrder22: function (o) {
    var customIndex = app.AddClientUrl("/buy_now.html", o, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (!!res.data.orderNo) {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      },
      complete: function (res) {

      }
    })
  },
  reqFun: function (data) {
    console.log('====data=====', data)
  },
  closeZhezhao: function () {
    this.MeasureParams = []
    this.setData({ showCount: false, focusData: null })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  opt: {},
  loadOpt: function (options) {
    // 设置页面标题
    if (options.description) {
      this.setData({
        acReport: decodeURIComponent(options.description)
      })
    }
    let navName = options.navName
    if (navName) {
      wx.setNavigationBarTitle({
        title: navName,
      })
    }
    //设置公告
    //公告信息-从活动信息过来的
  },
  onLoad: function (options) {
    console.log("hahahahahahah这是id", options.promotionId)
    this.setData({
      platformSetting: app.setting.platformSetting
    })
    this.setData({
      id: options.promotionId
    })
    console.log("======getCurrentPages============", getCurrentPages())
    // if (getCurrentPages().length === 5) {
    //   my.redirectTo('/xx');
    // } else {
    //   my.navigateTo('/xx');
    // }
    // let params={};
    // params.promotionId = options.promotionId;

    this.getActiveData();
    this.getData(this.params, 1)//获取商品数据
    this.getCart();

    this.opt = options
    this.loadOpt(options)
    for (let i in options) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = options[i] }
      }
    }



  },

  onReady: function () {
    this.setData({
      sysWidth: app.globalData.sysWidth,
      sysHeight: app.globalData.sysHeight,
      setting: app.setting,
      loginUser: app.loginUser
    });
  },

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

    this.setData({
      productData: []
    })
    this.params.page = 1;
    this.getData(this.params)
    if (this.data.ProductshowWay == 2) {
      this.params.onPullDownRefresh = true;
      let id = this.data.id
      this.selectComponent('#productLists').getNewData(id, this.params.page, this.params.onPullDownRefresh)

      let that = this;
      setTimeout(function () {
        that.params.onPullDownRefresh = false;
      }, 500)
    }

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this
    if (that.params.totalSize > that.params.curPage * that.params.pageSize) {
      that.params.page++
      // 组件内的事件
      let id = this.data.id;
      this.selectComponent('#productLists').getNewData(id, that.params.page)
    } else {
      console.log('到底了', that.params.curPage)
    }
  },
  /*  
   * 图片懒加载模块
   */
  zuihoudetuoxie(rects) {
    // 把每个top都加上他的第一个的  负数的  top值  

    let subNum = rects[0].bottom
    for (let i = 0; i < rects.length; i++) {

      rects[i].top = rects[i].top - subNum
    }
    return rects
  },
  getAllRects: function (onReachBottom) {
    let that = this
    // 问题留下来    wx.createSelectorQuery().selectAll('.promotionItem')的时候
    // 如果分页加载，就是现在没在顶部的时候， 他的 rects 的 之前的分支的 top值  为负数
    wx.createSelectorQuery().selectAll('.promotionItem').boundingClientRect(function (rects) {

      if (onReachBottom == 1) {

      } else {
        that.promotionItemPageOffline = rects
      }
      console.log(that.promotionItemPageOffline)

      // rects.forEach(function (rect) {
      //   promotionData.scrollTop = rect.top  
      // })
    }).exec() //回调

  },
  promotionItemPageOffline: null,   // .promotionItem支点集
  onPageScroll(e) {
    // 滑动的时候获取页面高度  并且开始判断 支点的模块高度
    this.watchActiveCard(e.scrollTop)
  },
  watchActiveCard(pageTop) {
    let promotionData = this.data.productData
    // 判断页面高度和支点的模块高度并且计算是否显示图片
    let promotionItemPageOffline = this.promotionItemPageOffline
    for (let i = 0; i < promotionItemPageOffline.length; i++) {
      if ((pageTop + this.data.sysHeight) > promotionItemPageOffline[i].top && !promotionData[i].showImage) {
        this.showImage(i)
      }
    }
  },

  showImage(i) {
    var promotionItem = "productData[" + i + "].showImage"
    this.setData({
      [promotionItem]: true
    })
  },

  _watchBigImage: function (e) {
    let urls = e.currentTarget.dataset.urls;
    let _url = e.currentTarget.dataset.url;
    let url = urls[0];
    if (!urls) {
      url = _url
    }
    app.lookBigImage(url, urls)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)

    if (res.from == "button") {
      console.log(res)
      // 商品id
      let id = res.target.dataset.proinfo.id
      // let productData = this.data.productData

      // console.log("this.data.productData", this.data.productData)
      // let index = 0;

      // for (let i = 0; i < productData.length; i++) {

      //   if (productData[i].id == id) {
      //     console.log(productData[i], i)
      //     index = i;
      //   }
      // }
      // let oldIndex = index
      this.closeCardShare(0)
      let focusData = res.target.dataset.proinfo
      if (!focusData.brandName || focusData.brandName == "") {
        focusData.brandName = ""
      };
      let imageUrl = focusData.imagePath

      let shareName = '活动价：￥' + focusData.price + '(原价：￥' + focusData.tagPrice + ')' + focusData.brandName + focusData.name

      let shareParams = this.opt
      shareParams.productName = focusData.productCode
      console.log('nnnnnnnnnn' + shareName)

      shareParams.id = id

      console.log("shareParams", shareParams)

      return app.shareForFx2('promotion_products', shareName, shareParams, imageUrl)
    }

    else {
      let that = this;

      console.log("==============", that.data.activityPromotion.name)
      let params = that.opt;
      params.title = that.data.activityPromotion.name;
      params.SHARE_PROMOTION_PRODUCTS_PAGE = this.data.id
      console.log('params:' + JSON.stringify(params))
      this.closeShowShar();
      return app.shareForFx2('promotion_products', '', params)

    }


  },



  /* 
     规格操作
  */
  MeasureParams: [],
  //提交规格产品
  /*
  submitMeasure: function (id) {
    var that = this
    let focusProduct = this.data.focusData
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

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },*/
  //获取规格价格参数
  get_measure_cartesion: function () {
    this.setData({ measurementJson: { waitDataState: false } })
    this.byNowParams.cartesianId = -1
    let productId = this.data.focusData.id
    let postStr = ''
    if (this.MeasureParams.length == 0) {
      this.byNowParams.cartesianId = '0'
      this.setData({ measurementJson: { waitDataState: true } })//没有规格时 不需要等待请求
      return
    }
    for (let i = 0; i < this.MeasureParams.length; i++) {
      postStr += this.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)

    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        if (!res.data.id) {
          // 没有这个参数
          //......
          console.log('error')
          //.....
        }
        console.log(res.data)
        that.byNowParams.cartesianId = res.data.id
        that.setData({ measurementJson: res.data })
        that.data.measurementJson.waitDataState = true
        that.setData({ measurementJson: that.data.measurementJson })
        that.byNowParams.itemCount = that.data.measurementJson.minSaleCount
        that.setData({ byNowParams: that.byNowParams })
        that.setData({ minCount: that.byNowParams.itemCount })
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
  chooseMeasureItem: function (focusData) {
    console.log('----------初始化规格参数-----------')
    if (!focusData.measureItem) {
      return
    }
    for (let i = 0; i < focusData.measureTypes.length; i++) {
      focusData.measureTypes[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      param.name = focusData.measureTypes[i].name
      param.value = focusData.measureTypes[i].productAssignMeasure[0].id

      this.MeasureParams.push(param)

    }
    this.setData({
      focusData: focusData
    })
    this.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)

    let focusData = this.data.focusData
    focusData.measureTypes[indexJson.str1].checkedMeasureItem = indexJson.str2
    this.setData({ focusData: focusData })
  },
  //选择规格小巷---获取数据
  chooseMeasure: function (e) {
    console.log(e.detail.value)
    let chooseMeasureJson = app.getSpaceStr(e.detail.value, '-')
    console.log(chooseMeasureJson)

    for (let i = 0; i < this.MeasureParams.length; i++) {
      if (this.MeasureParams[i].name == chooseMeasureJson.str1) {
        this.MeasureParams[i].value = chooseMeasureJson.str2
      }
    }
    this.get_measure_cartesion()
  },

  tolinkUrl: function (e) {
    console.log(e.currentTarget.dataset.id)
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
    app.linkEvent(a);
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
    this.MeasureParams = []
    this.setData({ showCount: false, focusData: null })
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
  }, /* 全部参数 */
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
  searchProduct: function (e) {
    let that = this;
    let typeValue = e.currentTarget.dataset.type
    console.log('===typeValue===', typeValue)
    if (typeValue == 'price') {
      if (that.data.ordertypeState) {
        console.log("价格排序", that.data.ordertypeState)
        this.selectComponent('#productLists').sortingPrice(that.data.id, '102');
        that.setData({ ordertypeState: !that.data.ordertypeState })
      } else {
        console.log("价格排序", that.data.ordertypeState)
        this.selectComponent('#productLists').sortingPrice(that.data.id, '2');
        that.setData({ ordertypeState: !that.data.ordertypeState })
      }
    } else if (typeValue == 'hot') {
      if (that.data.orderHotState) {
        console.log("热度排序", that.data.orderHotState)
        this.selectComponent('#productLists').sortingPrice(that.data.id, '101');
        that.setData({ orderHotState: !that.data.orderHotState })
      } else {
        console.log("热度排序", that.data.orderHotState)
        this.selectComponent('#productLists').sortingPrice(that.data.id, '1');
        that.setData({ orderHotState: !that.data.orderHotState })
      }
    }
    // if (ordertype == "101") {
    //   if (that.data.ProductshowWay == "2"){
    //     // 执行组件内的排序
    //     console.log("销量排序")
    //     that.selectComponent('#productLists').sortingHot();
    //   }else{
    //     console.log("热度排序组件内的商品", that.data.productData)

    //     let products1 = this.data.productData;
    //     // 排序
    //     let temp;
    //     for (let i = 0; i < products1.length; i++) {

    //       for (let j = i + 1; j < products1.length; j++) {
    //         if ((products1[i].stock / products1[i].totalStock) > (products1[j].stock / products1[j].totalStock)) {
    //           console.log(products1[i].stock / products1[i].totalStock + "===" + products1[j].stock / products1[j].totalStock)
    //           temp = products1[i];
    //           products1[i] = products1[j];
    //           products1[j] = temp;
    //         }
    //       }
    //     }

    //     that.setData({
    //       productData: products1
    //     })
    //   }



    // }



    this.setData({ showType: false, bindProductTypeIndex: null })
    console.log("====event.currentTarget.dataset====", event.currentTarget.dataset)
    var focusKey = event.currentTarget.dataset;

    for (let i in focusKey) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = focusKey[i] }
      }
    }
    console.log("====this.params====", this.params)
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
    wx.navigateTo({
      url: '../../../pages/productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
    })
  },

  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },

  getActiveData: function () {
    var that = this
    var customIndex = app.AddClientUrl("/tunzai_index.html", {}, 'get', '1')
    //获取到数据
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("====== res.data=========", res.data.activityPromotion)
        let id = that.data.id;
        wx.hideLoading()
        if (res.data.activityPromotion.length == 0) {
          that.getActiveData();
        }
        else {
          console.log("=======id======", id)
          var index = "0"
          for (var i = 0; i < res.data.activityPromotion.length; i++) {
            index = i;
            if (id == res.data.activityPromotion[index].id) {
              console.log("相同的id", res.data.activityPromotion[index])
              that.setData({
                activityPromotion: res.data.activityPromotion[index],
              })
            }

          }
          console.log("最后的数据", that.data.activityPromotion)
          that.getTimeAll();
        }
      },
      fail: function (res) {
        console.log('------------2222222-----------')
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '加载失败，点击【确定】重新加载',
          success: function (res) {

            if (res.confirm) {
              that.getParac()
            } else if (res.cancel) {
              app.toIndex()
            }
          }
        })
      }
    })
  },
  // 获取时间
  getTimeAll: function () {

    var me = this;
    // 已经开始的活动
    var arr = [];


    arr[0] = me.data.activityPromotion.endDate

    me.setData({ actEndTimeList: arr })
    var interval = setInterval(function () {
      // 获取当前时间，同时得到活动结束时间数组
      let newTime = new Date().getTime();
      let endTimeList = me.data.actEndTimeList;
      let countDownArr = [];
      let endTime1 = new Date(arr[0]).getTime();
      // 对结束时间进行处理渲染到页面
      endTimeList.forEach(o => {
        let endTime = new Date(o.replace(/-/g, '/')).getTime();
        let obj = null;

        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000;

          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          obj = {
            day: me.timeFormat(day),
            hou: me.timeFormat(hou),
            min: me.timeFormat(min),
            sec: me.timeFormat(sec)
          }
        } else {//活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        countDownArr.push(obj);
      })
      // 渲染，然后每隔一秒执行一次倒计时函数
      this.setData({ countDownList: countDownArr })
      // console.log(this.data.countDownList)

    }.bind(this), 1000);

  },
  timeFormat: function (param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },

  tolinkUrl: function (e) {
    this.closeShowShar();
    console.log(e)
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.info.id;
    app.linkEvent(a);
  },
  closeShowShar: function (e) {
    console.log("this.data.productData", this.data.productData)
    let productData = this.data.productData;
    let index = 0;
    for (let i = 0; i < productData.length; i++) {
      index = i;
      console.log(productData[i].showShare)
      if (productData[index].showShare) {
        productData[index].showShare = !productData[index].showShare
      }
    }
    this.setData({
      productData: productData
    })
  },

  // 点击海报
  showPosters: function (e) {
    console.log("eeeeeeeeeeeeeeeeeeeee", e)
    this.setData({
      posterActiveState: true,
    })
    this.getQrCode(e.currentTarget.dataset.type);
  },

  // 关闭海报
  getChilrenPoster(e) {

    let that = this;
    that.setData({
      posterActiveState: false,
    })

  },
  // 获取二维码
  getQrCode: function (type) {
    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
    console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
    console.log("type", type)
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    let str = '';
    let str2 = '';
    if (type == 'active') {
      str = 'SHARE_PROMOTION_PRODUCTS_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?path=pageTab%2findex%2findex%3fSHARE_PROMOTION_PRODUCTS_PAGE%3d'
      postParam[str] = this.data.id;
    } else {
      str = 'SHARE_PRODUCT_DETAIL_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d'
      postParam[str] = this.data.proId;
    }
    postParam.scene = userId
    console.log(str, str2, postParam)
    // 上面是需要的参数下面的url
    var customIndex = app.AddClientUrl(str2 + postParam[str] + "%26scene%3d" + userId, postParam, 'get', '1')
    var result = customIndex.url.split("?");

    customIndex.url = result[0] + "?" + result[1]

    console.log("customIndex", customIndex.url, result[0])

    var that = this
    that.setData({
      qrCodeUrl: customIndex.url
    })

  }

})