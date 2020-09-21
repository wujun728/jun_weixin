

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    assetsList: [], // 商品数据 
    sysWidth: 320,//图片大小
    positionTab:'',
    SpaceshowWay: 2, // SpaceshowWay列表显示方法 (默认显示地图)
    localPoint: { longitude: '0', latitude:'0'},
    spaceDetail:null,
    markers: [{
      iconPath: "../../images/icon/mapItem.png",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }]
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
          callback
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
        this.getCenterPoint(this.getData(this.params, 2));
        }else{
        console.log('====all====');
        this.getCenterPoint(this.getData(this.params, 2));
        }
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.toSpaceDetailMap(e.markerId);
  },
  controltap(e) {
    console.log(e)
  },
  hiddenProInfo(e){
    console.log(e)
    this.setData({spaceDetail:null})
  },
  //获取产品分类
  getAssetsType: function (categoryId) {
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
        let dataArr = res.data
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
    let onId;
    if (event && event.currentTarget){
      onId = event.currentTarget.dataset.type.id
      console.log('====bindTypeItem currentTarget====',onId)
    } else if (event && !event.currentTarget){
      onId = event
      console.log('====bindTypeItem event====',onId)
    }
    console.log(event)
    console.log("this.data.setting.platformSetting",this.data.setting)
    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      if (this.data.setting.platformSetting.categories[i].id == onId ) {
        this.data.setting.platformSetting.categories[i].active = true
        console.log(this.data.setting.platformSetting.defaultColor)
        this.data.setting.platformSetting.categories[i].colorAtive =this.data.setting.platformSetting.defaultColor;
      }
      else {
        this.data.setting.platformSetting.categories[i].active = false
        this.data.setting.platformSetting.categories[i].colorAtive = '#888';
      }
    }
    this.setData({
      setting: this.data.setting,
    })

    this.listPage.page = 1
    this.params.page = 1

    if (onId == "all") {

      this.params.categoryId = ''
      this.getData(this.params, 2)
    } else {
      this.params.categoryId = onId
      this.getData(this.params, 2)
    }
  },
  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/wx_find_space_assets.html", param)
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
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.assetsList
        let tagArray=[];
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
          that.setData({ assetsList: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.relateObj.result)
          for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].leaseEndDatetime ){
              dataArr[i].leaseEndDatetime = dataArr[i].leaseEndDatetime.slice(0,-9)
            }
          }
          that.setData({ assetsList: dataArr })
        }
        that.setData({ markers: that.data.assetsList })
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
    name: "", 
    page: 1,
    assetTypeId: "",
    spaceId: "",
    latitude:'0',
    longitude:'0',

  },
  /* 查找商品 */
  getSearchSpaceName: function (e) {
    console.log(e)
    if (e.detail.value){
      this.params.name = e.detail.value
    }else{
      this.params.name=''
    }
    var that = this
    var customIndex = this.more_space_list_URL(this.params);
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
        let dataArr = res.data.relateObj.result
        if (!dataArr || dataArr.length == 0) {
          that.setData({ assetsList: null })
        } else {
          for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].leaseEndDatetime) {
              dataArr[i].leaseEndDatetime = dataArr[i].leaseEndDatetime.slice(0, -9)
            }
          }
          that.setData({ assetsList: dataArr })
        }

        that.setData({ markers: dataArr })
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
  more_space_list_URL: function (params) {
    let resule = app.AddClientUrl("/wx_find_space_assets.html", params)
    return resule;
  },
  /* 商品显示方法 */

  bindSpaceshowWay: function () {
    if (this.data.SpaceshowWay == 1) {
      this.setData({ SpaceshowWay: 2 })
    } else{
      this.setData({ SpaceshowWay: 1 })
    }

  },
  /* 组件事件集合 */
  // 定位
  toNavigate: function (e) {
    console.log("===toNavigate=====", e)
    let itemInfo = e.currentTarget.dataset.info;
    let latitude = itemInfo.latitude;
    let longitude = itemInfo.longitude;
    let name = itemInfo.name;
    let address = itemInfo.province + itemInfo.city + itemInfo.area + itemInfo.address;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 12,
      name: name,
      address: address
    })
  },
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  toSpaceDetail: function (event) {
    console.log("--------toSpaceDetail------", event)
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    let id;
    if (info.spaceId){
      id = info.spaceId
    }else{
      id = info.id
    }
    wx.navigateTo({
      url: '../spaceDetail/index?id=' + id ,
    })
  },
  toSpaceDetailMap: function (id) {
    console.log("--------toSpaceDetailMap------")
    console.log(id)
    var param = { spaceId: id}
    let customIndex = app.AddClientUrl("/space_detail.html", param)

    var that = this
    that.setData({
      spaceDetail: null
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.setData({
          spaceDetail: res.data
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
        // if (options.assetTypeId) {
        //   that.setData({ positionTab: options.assetTypeId })
        //   options.assetTypeId = options.assetTypeId
        //   that.bindTypeItem(options.assetTypeId)
        // }
        if (!!options.forceSearch && options.forceSearch == 2) {
          that.setData({ SpaceshowWay: 2 })
        } else {
          that.setData({ SpaceshowWay: 2 })
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