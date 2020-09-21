

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    servantData: [], // 商品数据 
    servantshowWay: 1, // servantshowWay列表显示方法 (默认显示地图)
    colorAtive: '#888',
    localPoint: { longitude: '0', latitude:'0'},
    mapCtx:{},
    currentScale:14,
    markers: [{
      iconPath: "",
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
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  getCenterPoint(callback){
    console.log("===getCenterPoint==")
    let that = this;
    that.mapCtx.getCenterLocation({
      success: function (res) {
        console.log('res', res)
        that.params.latitude = res.latitude;
        that.params.longitude = res.longitude;
        that.setData({
          params: that.params,
        })
        if (callback){
          callback()
        }
      }
    }) //获取当前地图的中心经纬度
  },
  regionchange(e) {
    console.log('===regionchange===',e)
    let that=this;
    if (e.type == 'end') {
      if (e.causedBy =='scale'){
        that.getScale();
      } else if(e.causedBy == 'drag') {
        console.log('====drag====');
        that.getCenterPoint(that.getData);
        }else{
        console.log('====all====');
        that.getCenterPoint(that.getData);
        }
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.toservantDetailMap(e.markerId);
  },
  toservantDetailMap: function (markerId){
    console.log("markerId", markerId)
  },
  getScale: function () {
    console.log('====scale====')
    let that=this;
    that.mapCtx.getScale({
      success: function (res) {
        console.log("==getScale==", res)
        that.data.currentScale = res.scale
        that.getData()
      }
    })
  },
  controltap(e) {
    console.log(e)
  },

  clickcontrol(e) {//回到定位的
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();

  },
  hiddenProInfo(e){
    console.log(e)
    this.setData({servantDetail:null})
  },
  /* 获取数据 */
  getServantData: function () {
    let that=this;
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var customIndex = app.AddClientUrl("/wx_find_servants.html",that.params);
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log('find_servants',res.data)
        let dataArr = res.data.relateObj;
        that.listPage.pageSize = dataArr.pageSize;
        that.listPage.totalSize = dataArr.totalSize;
        if ((!dataArr.result || dataArr.result.length == 0) || that.params.page == 1){
          that.data.markers=[];
        }
        dataArr = that.data.markers.concat(dataArr.result)
        if (dataArr.length!=0) {
          for (let i = 0; i < dataArr.length; i++) {
            // dataArr[i].iconPath = '';
            // dataArr[i].width = 32;
            // dataArr[i].height = 32;
            dataArr[i].title = dataArr[i].name;
            // dataArr[i].callout = {
            //   padding:20
            // };
          }
        }
        that.setData({ markers: dataArr})
        console.log('==that.data.markers===', that.data.markers);
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  getData: function () { //根据把param变成&a=1&b=2的模式
    let that = this;
    var customIndex;
    let counterType;
    console.log("===that.data.currentScale===", that.data.currentScale)
    if (that.data.currentScale < 5) {
      counterType = 0
      let params = Object.assign({}, params, that.data.params, { type: counterType })
      customIndex = app.AddClientUrl("/wx_find_servant_counter.html", params)
    } else if (that.data.currentScale >= 5 && that.data.currentScale < 7) {
      counterType = 1
      let params = Object.assign({}, params, that.data.params, { type: counterType })
      customIndex = app.AddClientUrl("/wx_find_servant_counter.html", params)
    } else if (that.data.currentScale >= 7 && that.data.currentScale < 9) {
      counterType = 2
      let params = Object.assign({}, params, that.data.params, { type: counterType })
      customIndex = app.AddClientUrl("/wx_find_servant_counter.html", params)
    } else if (that.data.currentScale >= 9 && that.data.currentScale < 12) {
      counterType = 3
      let params = Object.assign({}, params, that.data.params, { type: counterType })
      customIndex = app.AddClientUrl("/wx_find_servant_counter.html", params)
    }else{
      that.getServantData()
      return
    }
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log('find_servants', res.data)
        let resData = res.data.relateObj;
        if (resData.length!=0) {
          for (let i = 0; i < resData.length; i++) {
            let text="";
            if (counterType==0){
              text = '全国'
            } else if (counterType == 1){
              text = resData[i].province
            } else if (counterType == 2) {
              text = resData[i].city
            } else if (counterType == 3) {
              text = resData[i].area
            }
            resData[i].iconPath = 'http://image1.sansancloud.com/yunjishi/2018_12/3/13/49/22_584.jpg';
            resData[i].width = 32;
            resData[i].height = 32;
            resData[i].label = {
              content: text + "\n" + resData[i].count,
              bgColor: '#35bbef',
              color: "#fff",
              borderRadius: "18",
              padding: '16',
              textAlign: 'center',
              anchorX: '0',
              fontSize: "12",
              anchorY: "-80",
            };
          }
        }
        that.setData({ markers: resData })
        console.log('==that.data.markers===', that.data.markers);
      },
      fail: function (res) {
        console.log("fail")
        // wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 全部参数 */
  params: {
    page: 1,
    latitude:'0',
    longitude:'0',
  },
  
  more_servant_list_URL: function (params) {
    let resule = app.AddClientUrl("/wx_find_servants.html", params)
    return resule;
  },
  /* 商品显示方法 */

  bindservantshowWay: function () {
    if (this.data.servantshowWay == 1) {
      this.setData({ servantshowWay: 2 })
    } else{
      this.setData({ servantshowWay: 1 })
      
    }

  },
  listPage: {
    pageSize: 0,
    totalSize: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("options", options)
    that.setData({ options: options})
    that.initSetting();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('==getLocation==',res)
        that.data.localPoint.latitude = res.latitude
        that.data.localPoint.longitude = res.longitude
        that.params.latitude = res.latitude
        that.params.longitude = res.longitude
        that.setData({
          params: that.params,
          localPoint: that.data.localPoint
        })
        that.getData(that.params, 2);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    that.mapCtx = wx.createMapContext('map')
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
    this.params.page = 1
    this.getData()
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.params.page) {
      that.params.page++
      this.getData();
    }
  },
})