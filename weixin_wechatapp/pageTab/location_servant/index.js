
const app = getApp()

Page({

  data: {
    setting: null, // setting   
    servantData: [], // 商品数据 
    servantshowWay: 1, // servantshowWay列表显示方法 (默认显示地图)
    colorAtive: '#888',
    localPoint: { longitude: '0', latitude:'0'},
    mapCtx: {},
    userInfoWidth: 200,
    currentScale:4,
    markers: [{
      iconPath: "",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }],
    showPopup: false,
  },
  toApplyServant:function(e){
    let that=this;
    if (that.data.loginUser.platformUser && that.data.loginUser.platformUser.managerServantId){
      wx.showModal({
        title: '提示',
        content: '主人~您已经是我们的技师啦！不要重新申请了!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    wx.navigateTo({
      url: '/pageTab/yunjishi/applyServant/index?reqType=2',
    })
  },
  getSearchservantName: function (data) {
    this.params.page = 1;
    console.log("getSearchservantName", data);
    var servant = data.detail.value
    console.log(servant)
    if (servant) {
      this.params.servantName = servant
    }else{
      this.params.servantName = ""
      this.setData({ searchServantName: ""})
    }
    this.getServantData();
  },
  toIndex(){
    app.toIndex()
  },
  tolinkUrl: function (e) {
    if(!app.loginUser){
      wx.showModal({
        title: '提示',
        content: '主人~您还在登陆哦!稍等片刻',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
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
  markertap(e) {
    console.log(e.markerId)
    this.toservantDetailMap(e.markerId);
  },
  toservantDetailMap: function (markerId){
    console.log("markerId", markerId)
  },
  toServantDetail:function(e){
    console.log(e)
    let servantId;
    if(e){
      servantId = e.currentTarget.dataset.servantid
    }
    wx.navigateTo({
      url: '/pages/servantDetail/index?servantId=' + servantId,
    })
  },
  hiddenProInfo(e){
    console.log(e)
    this.setData({servantDetail:null})
  },
  getLength: function (str) {
    var reg = /[a-zA-Z]/g;
    if (reg.test(str)) {
      return str.match(/[a-z]/ig).length;
    }
    return 0;
  },
  loginSuccess: function (user) {
    console.log("hello!!!", app.loginUser);
    let that = this
    that.setData({ loginUser: app.loginUser })
    if (app.loginUser && app.loginUser != "" && (app.loginUser.platformUser && app.loginUser.platformUser.mendian)) {
      that.setData({
        loginUserMendian: app.loginUser.platformUser.mendian
      })
      let mendianName = app.loginUser.platformUser.mendian.name
      let mendianNameE = this.getLength(mendianName)
      console.log('mendianNameE', mendianNameE, mendianName.length)
      that.setData({
        userInfoWidth: (mendianName.length - mendianNameE) * 28 + mendianNameE * 14 + 16
      })
      console.log(mendianName, that.data.userInfoWidth)
    }else{
      that.setData({
        userInfoWidth: 160
      })
    }
  },
  getData: function () { //根据把param变成&a=1&b=2的模式
    let that = this;
    var customIndex;
    let counterType;
    console.log("===that.data.currentScale===", that.data.currentScale)
    let params = Object.assign({}, params, that.data.params, { type: 2 })
    customIndex = app.AddClientUrl("/wx_find_servant_counter.html", params)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log('find_servant_counter', res.data)
        let resData = res.data.relateObj;
        if (resData.length != 0) {
          for (let i = 0; i < resData.length; i++) {
            resData[i].iconPath = 'http://image1.sansancloud.com/yunjishi/2018_12/10/15/44/6_356.jpg';
            resData[i].width = 16;
            resData[i].height = 16;
          }
        }
        that.setData({ markers: resData })
        console.log('==that.data.markers===', that.data.markers);
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
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
          that.data.servantData=[];
        }
        dataArr = that.data.servantData.concat(dataArr.result)
        for (let i = 0; i < dataArr.length;i++){
          dataArr[i].surname = dataArr[i].name.slice(0,1)
        }
        that.setData({ servantData: dataArr })
        console.log('==that.data.servantData===', that.data.servantData);
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
    latitude:'0',
    longitude:'0',
    servantName:"",
  },
  
  more_servant_list_URL: function (params) {
    let resule = app.AddClientUrl("/wx_find_servants.html", params)
    return resule;
  },
  /* 商品显示方法 */
  bindservantshowWay: function (state) {
    if (this.data.servantshowWay == 1 || state==2) {
      this.setData({ servantshowWay: 2 })
      this.getServantData()
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
    console.log("用户信息", app.loginUser)
    if (app.loginUser && app.loginUser != "") {
      that.loginSuccess(app.loginUser)
    }else{
      app.addLoginListener(that);
    }
    that.setData({ options: options, currentScale:4})
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
        that.getData();
        that.getServantData();
      }
    })
  },

  bindGetUserInfo: function (e) {
    this.setData({ showPopup: false })
    console.log(e.detail)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log('用户按了允许授权按钮')
      if (app.loginUser && app.loginUser.platformUser && !app.loginUser.platformUser.nickname) {
        app.sentWxUserInfo(app.loginUser)
      }
    } else {
      console.log('用户按了拒绝按钮')
      //用户按了拒绝按钮
    }
  },
  cancel: function () {
    this.setData({ showPopup: false })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    that.mapCtx = wx.createMapContext('map')
    console.log("=========检查用户是否授权了======")
    wx.getSetting({//检查用户是否授权了
      success(res) {
        console.warn("======检查用户是否授权了========", res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('=====1userInfo====')
          that.setData({ showPopup: true })
        } else {
          console.log('=====2userInfo====')
          that.setData({ showPopup: false })
        }
      }
    });
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
    let that=this;
    this.params.page = 1;
    that.getData();
    that.getServantData();
    if (app.loginUser && app.loginUser != "") {
      that.loginSuccess(app.loginUser)
    } else {
      app.addLoginListener(that);
    }
    console.log("=========检查用户是否授权了======")
    wx.getSetting({//检查用户是否授权了
      success(res) {
        console.warn("======检查用户是否授权了========", res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('=====1userInfo====')
          that.setData({ showPopup: true })
        } else {
          console.log('=====2userInfo====')
          that.setData({ showPopup: false })
        }
      }
    });
    wx.stopPullDownRefresh() //停止下拉刷新
    

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    console.log("====onReachBottom=====", that.listPage, that.params.page)
    if (that.listPage.totalSize > that.listPage.pageSize * that.params.page) {
      that.params.page++
      console.log("====onReachBottom=====", that.params.page)
      this.getServantData();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this
    let params = {}
    params.pageName = "index";
    console.log('params:' + JSON.stringify(params))
    return app.shareForFx2('index', '', params)
  },
})