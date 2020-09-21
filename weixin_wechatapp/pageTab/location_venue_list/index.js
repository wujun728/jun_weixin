

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    venueData: [], // 商品数据 
    venueType: [],
    sysWidth: 320,//图片大小
    positionTab:'',
    ProductshowWay: 1, // ProductshowWay列表显示方法 (默认显示地图)
    localPoint: { longitude: '0', latitude:'0'},
    venueDetail:null,
    searchData: {},
    shopName:'',
    markers: [{
      iconPath: "../../images/icon/mapItem.png",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }]
  },
  getVenueType: function () {
    var customIndex = app.AddClientUrl("/wx_get_venues_types.html", )
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
        console.log("getVenueType", res.data)
        if (res.data.errcode == 0) {
          that.setData({ venueType: res.data.relateObj.result })
        } else {
          that.setData({ venueType: that.data.venueType })
        }
        if (res.data.relateObj.result.length!=0){
          that.bindTypeItem(res.data.relateObj.result[0].id)
        }
        // that.data.venueType.unshift({ id:  0, name: "全部" })
        for (let i = 0; i < that.data.venueType.length; i++) {
          that.data.venueType[i].colorAtive = '#888';
        }
        that.data.venueType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.data.venueType[0].active = true;
        that.setData({ venueType: that.data.venueType })
        console.log("that.data.venueType", that.data.venueType)
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
    this.setData({venueDetail:null})
  },
  bindDateChange:function(e){
    console.log('bindDateChange发送选择改变，携带值为', e.detail.value)
    let searchData = this.data.searchData
    searchData.dateStr = e.detail.value
    this.setData({
      searchData: searchData
    })
  },
  bindTimeChange: function (e) {
    console.log('bindTimeChange发送选择改变，携带值为', e.detail.value)
    let searchData = this.data.searchData
    searchData.startTimeStr = e.detail.value
    this.setData({
      searchData: searchData
    })
  },
  sureSelectResult:function(e){
    console.log("=====sureSelectResult=====",e)
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event)
    let type = event.currentTarget? event.currentTarget.dataset.type.id: event
    let that = this;
    for (let i = 0; i < that.data.venueType.length; i++) {
      if (that.data.venueType[i].id == type) {
        that.data.venueType[i].active = true
        that.data.venueType[i].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.setData({ currentItem: that.data.venueType[i] })
      }
      else {
        that.data.venueType[i].active = false
        that.data.venueType[i].colorAtive = '#888';
      }
    }

    that.setData({
      venueType: that.data.venueType,
    })

    that.listPage.page = 1
    that.params.page = 1

    if (type == "0") {

      that.params.venuesType = 0
      that.getData()

      var allItem = {
        id: ""
      }
    }
    else {
      that.params.venuesType = type
      that.setData({ venueDetail: null })
      that.getData()
      //}

    }

  },
  /* 获取数据 */
  getData: function () {
    var that = this;
    let params = that.params
    if (JSON.stringify(that.data.searchData)!='{}'){
      params = Object.assign({}, params, that.data.searchData)
    }
    var customIndex = app.AddClientUrl("/more_near_shops.html", params)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        let resData = res.data.relateObj
        that.listPage.pageSize = resData.pageSize
        that.listPage.curPage = resData.curPage
        that.listPage.totalSize = resData.totalSize
        let dataArr = that.data.venueData
        let tagArray=[];
        if (that.params.page == 1) {
          dataArr = []
        }
        if (!resData.result || resData.result.length == 0) {
          that.setData({ venueData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(resData.result)
          for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].shopTag && dataArr[i].shopTag!=''){
              tagArray = dataArr[i].shopTag.slice(1,-1).split("][")
              dataArr[i].tagArray = tagArray;
            }
          }
          that.setData({ venueData: dataArr })
        }
        if (dataArr.length!=0){
          that.toProductDetailMap(dataArr[0].id)
        }
        that.setData({ markers: that.data.venueData })
        let mapIcon = ""
        console.log("====that.params.venuesType====", that.params.venuesType, that.data.venueType)
        if (that.params.venuesType&&that.params.venuesType!=0){
          console.log("有venuesType")
          for (let i = 0; i < that.data.venueType.length;i++){
            if (that.params.venuesType == that.data.venueType[i].id){
              console.log("获取Icon", that.data.venueType[i].icon)
              mapIcon = that.data.venueType[i].icon
            }
          }
        }
        console.log("====mapIcon====", mapIcon)
        let conut=0;
        if (that.data.markers) {
          for (let i = 0; i < that.data.markers.length; i++) {
            if (mapIcon) {
              that.downProIcon(mapIcon,function(url){
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
    page: 1,
    shopName: "",
    venuesType: "",
    latitude:'0',
    longitude:'0',

  },
  /* 查找商品 */
  getSearchShopName: function (e) {
    console.log(e)
    if (e.detail.value){
      this.params.shopName = e.detail.value
    }else{
      this.params.shopName=''
    }
    this.setData({ shopName: this.params.shopName})
    this.getData()
  },
  /* 商品显示方法 */

  toMy: function () {
    wx.navigateTo({
      url: '/pagesTwo/aikucun_userinfo/index'
    })
  },
  tolinkUrl: function (event) {
    let that=this;
    console.log("e.currentTarget.dataset.link=====", event.currentTarget.dataset.link)
    let linkUrl = event.currentTarget.dataset.link
    if (linkUrl =='near_shops.html'){
      linkUrl = linkUrl + "?venuesType=" + that.params.venuesType + "&dateStr=" + (that.data.searchData.dateStr || '') + "&startTimeStr=" + (that.data.searchData.startTimeStr || '')
    }
    app.linkEvent(linkUrl)
  },
  toProductDetailMap: function (id) {
    console.log("--------toProductDetailMap------",id)
    let customIndex = app.AddClientUrl('/shop_detail_' + id + '.html')
    var that = this
    that.setData({
      venueDetail: null
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        let venueDetail = res.data.result
        if (venueDetail.shopInfo.shopTag && venueDetail.shopInfo.shopTag != '') {
          let tagArray = venueDetail.shopInfo.shopTag.slice(1, -1).split("][")
          venueDetail.shopInfo.tagArray = tagArray;
        }
        that.setData({
          venueDetail: venueDetail
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
        that.getVenueType()
        // that.getData();
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
  /**
     * 用户点击右上角分享
     */

  onShareAppMessage: function (res) {
    console.log(res, app.miniIndexPage)
    return app.shareForFx2(app.miniIndexPage)
  },
})