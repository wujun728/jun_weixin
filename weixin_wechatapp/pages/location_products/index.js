

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    productData: [], // 商品数据 
    productType: [],
    sysWidth: 320,//图片大小
    positionTab:'',
    ProductshowWay: 1, // ProductshowWay列表显示方法 (默认显示地图)
    localPoint: { longitude: '0', latitude:'0'},
    productDetail:null,
    markers: [{
      iconPath: "../../images/icon/mapItem.png",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }]
  },
  getProductType: function (categoryId) {
    var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: categoryId || 0 })
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
        console.log("getProductType", res.data)
        if (res.data.errcode == 0) {
          that.setData({ productType: res.data.relateObj })
        } else {
          that.setData({ productType: that.data.productType })
        }
        that.data.productType.unshift({ id: categoryId || 0, name: "全部" })
        for (let i = 0; i < that.data.productType.length; i++) {
          that.data.productType[i].colorAtive = '#888';
        }
        that.data.productType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.data.productType[0].active = true;
        that.setData({ productType: that.data.productType })
        console.log("that.data.productType", that.data.productType)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  toIndex(){
    app.toIndex()
  },
  clickcontrol(e) {//回到定位的
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
    
  },
  getCenterPoint(callback){
    let that = this;
    var mapCtx = wx.createMapContext('map')
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('res', res)
        that.params.latitude = res.latitude;
        that.params.longitude = res.longitude;
        that.setData({
          params: that.params,
        })
        if (callback){
          callback(that.params,2)
        }
      }
    }) //获取当前地图的中心经纬度
  },
  regionchange(e) {
    console.log('===regionchange===',e)
    if (e.type == 'end') {
      if (e.causedBy =='scale'){
        console.log('====scale====')
      } else if(e.causedBy == 'drag') {
        console.log('====drag====');
        this.getCenterPoint(this.getData);
        }else{
        console.log('====all====');
        this.getCenterPoint(this.getData);
        }
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.toProductDetailMap(e.markerId);
  },
  controltap(e) {
    console.log(e)
  },
  hiddenProInfo(e){
    console.log(e)
    this.setData({productDetail:null})
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event.currentTarget.dataset.type)
    let that = this;
    for (let i = 0; i < that.data.productType.length; i++) {
      if (that.data.productType[i].id == event.currentTarget.dataset.type.id) {
        that.data.productType[i].active = true
        that.data.productType[i].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.setData({ currentItem: that.data.productType[i] })
      }
      else {
        that.data.productType[i].active = false
        that.data.productType[i].colorAtive = '#888';
      }
    }

    that.setData({
      productType: that.data.productType,
    })

    that.listPage.page = 1
    that.params.page = 1

    if (event.currentTarget.dataset.type.id == "all") {

      that.params.categoryId = ''
      that.getData(this.params, 2)
      that.setData({ showType: false, bindProductTypeIndex: null })

      var allItem = {
        id: ""
      }
      that.setData({
        focusTypeItem: allItem
      })
    }
    else {

      that.setData({
        focusTypeItem: event.currentTarget.dataset.type,
      })
      var focus = event.currentTarget.dataset.type

      //if (focus.children.length == 0) {



      that.params.categoryId = focus.id
      that.setData({ productDetail: null })
      that.getData(this.params, 2)
      that.setData({ showType: false, bindProductTypeIndex: null })
      //}

    }

  },
  /* 点击分类大项 */
  // bindTypeItem: function (event) {
  //   let onId;
  //   if (event && event.currentTarget){
  //     onId = event.currentTarget.dataset.type.id
  //     console.log('====bindTypeItem currentTarget====',onId)
  //   } else if (event && !event.currentTarget){
  //     onId = event
  //     console.log('====bindTypeItem event====',onId)
  //   }
  //   console.log(event)
  //   console.log("this.data.setting.platformSetting",this.data.setting)
  //   for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
  //     if (this.data.setting.platformSetting.categories[i].id == onId ) {
  //       this.data.setting.platformSetting.categories[i].active = true
  //       console.log(this.data.setting.platformSetting.defaultColor)
  //       this.data.setting.platformSetting.categories[i].colorAtive =this.data.setting.platformSetting.defaultColor;
  //     }
  //     else {
  //       this.data.setting.platformSetting.categories[i].active = false
  //       this.data.setting.platformSetting.categories[i].colorAtive = '#888';
  //     }
  //   }
  //   this.setData({
  //     setting: this.data.setting,
  //   })

  //   this.listPage.page = 1
  //   this.params.page = 1

  //   if (onId == "all") {

  //     this.params.categoryId = ''
  //     this.getData(this.params, 2)
  //   } else {
  //     this.params.categoryId = onId
  //     this.getData(this.params, 2)
  //   }
  // },
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
            if (dataArr[i].tags && dataArr[i].tags!=''){
              tagArray = dataArr[i].tags.slice(1,-1).split("][")
              dataArr[i].tagArray = tagArray;
            }
          }
          that.setData({ productData: dataArr })
        }
        that.setData({ markers: that.data.productData })
        let conut=0;
        if (that.data.markers) {
          for (let i = 0; i < that.data.markers.length; i++) {
            if (that.data.markers[i].categoryIcon) {
              that.downProIcon(that.data.markers[i].categoryIcon,function(url){
                conut++;
                that.data.markers[i].iconPath = url;
                that.data.markers[i].width=32;
                that.data.markers[i].height = 32;
                if (conut == that.data.markers.length) {
                  that.setData({ markers: that.data.markers })
                  console.log('==that.data.markersHave===', that.data.markers);
                }
              })
            } else {
              conut++;
              that.data.markers[i].iconPath = '../../images/icon/mapItem.png';
              that.data.markers[i].width = 32;
              that.data.markers[i].height = 32;
              if (conut == that.data.markers.length) {
                that.setData({ markers: that.data.markers })
                console.log('==that.data.markers===', that.data.markers);
              }
            }
            
          }
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
  downProIcon:function(url,callback){
    var _this = this;
    if (app.mapProIconArray[encodeURIComponent(url)]){
      console.log('已存在', encodeURIComponent(url))
      callback(app.mapProIconArray[encodeURIComponent(url)])
      return
    }
    wx.downloadFile({ 
      url: url.replace('http', 'https'),
      success: function (res) {
        console.log('下载图片',res)       
        if (res.statusCode == 200) {
          callback(res.tempFilePath);   
          app.mapProIconArray[encodeURIComponent(url)] = res.tempFilePath     
        }      
      }    
    })    
  },
  /* 全部参数 */
  params: {
    categoryId: "",
    platformNo: "",
    belongShop: "",
    page: 1,
    productName: "",
    orderType: "",
    saleTypeId: "",
    promotionId: "",
    shopProductType: "",
    latitude:'0',
    longitude:'0',
    useLocation:1,

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

        that.setData({ markers: that.data.productData })
        let conut = 0;
        if (that.data.markers) {
          for (let i = 0; i < that.data.markers.length; i++) {
            if (that.data.markers[i].categoryIcon) {
              that.downProIcon(that.data.markers[i].categoryIcon, function (url) {
                conut++;
                that.data.markers[i].iconPath = url;
                that.data.markers[i].width = 32;
                that.data.markers[i].height = 32;
                if (conut == that.data.markers.length) {
                  that.setData({ markers: that.data.markers })
                  console.log('==that.data.markersHave===', that.data.markers);
                }
              })
            } else {
              conut++;
              that.data.markers[i].iconPath = '../../images/icon/mapItem.png';
              that.data.markers[i].width = 32;
              that.data.markers[i].height = 32;
              if (conut == that.data.markers.length) {
                that.setData({ markers: that.data.markers })
                console.log('==that.data.markers===', that.data.markers);
              }
            }

          }
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
  /* 商品显示方法 */

  bindProductshowWay: function () {
    if (this.data.ProductshowWay == 1) {
      this.setData({ ProductshowWay: 2 })
    } else{
      this.setData({ ProductshowWay: 1 })
    }

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
    let url = 'product_detail.html?id=' + id
    app.linkEvent(url)
  },
  toProductDetailMap: function (id) {
    console.log("--------toProductDetailMap------")
    console.log(id)
    var param = { productId: id}
    let customIndex = app.AddClientUrl("/product_detail.html", param)

    var that = this
    that.setData({
      productDetail: null
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.setData({
          productDetail: res.data
        })
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
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
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        that.data.localPoint.latitude = res.latitude
        that.data.localPoint.longitude = res.longitude
        that.params.latitude = res.latitude
        that.params.longitude = res.longitude
        console.log("options", options)
        // that.setData({ positionTab: options.productTypeId})
        // options.categoryId = options.productTypeId;//当前类目Id
        // let parentCategoryId = options.parentCategoryId||0;//父级类目Id
        // that.getProductType(parentCategoryId, options.categoryId, that.bindTypeItem)
        // that.bindTypeItem(options.productTypeId)
        if (options.productTypeId) {
          that.setData({ positionTab: options.productTypeId })
          options.categoryId = options.productTypeId
          that.getProductType(options.categoryId, that.bindTypeItem)
        } else {
          that.getProductType(options.categoryId)
        }
        // if (options.productTypeId) {
        //   that.setData({ positionTab: options.productTypeId })
        //   options.categoryId = options.productTypeId
        //   that.bindTypeItem(options.productTypeId)
        // }
        if (!!options.forceSearch && options.forceSearch == 2) {
          that.setData({ ProductshowWay: 2 })
        } else {
          that.setData({ ProductshowWay: 1 })
        }
        for (let i in options) {
          for (let j in that.params) {
            if (i.toLowerCase() == j.toLowerCase()) { that.params[j] = options[i] }
          }
        }
        that.setData({
          params: that.params,
          localPoint: that.data.localPoint
        })
        console.log(that.params)
        that.getData(that.params, 2);
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initSetting(){
    this.setData({ setting: app.setting })
    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      this.data.setting.platformSetting.categories[i].colorAtive = '#888';
    }
    this.data.setting.platformSetting.categories[0].colorAtive = this.data.setting.platformSetting.defaultColor;
    this.setData({
      setting: this.data.setting,
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