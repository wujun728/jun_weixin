
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: "1",
    shops: [],
    journey: [],//公里数
    receiveData:{},
    curPage:1,
    pageSize :10,
    totalSize : 1
  },
  tolinkUrl: function (e) {
    console.log("e.currentTarget.dataset.link=====", e.currentTarget.dataset.link)
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  // 获取附近店铺数据
  getData: function () {

    let that = this;

    // 店铺名可以从app.setting中拿到
    console.log("app.setting.platformSetting", app.setting);
    let shopName = app.setting.platformSetting.defaultShopBean.account.shopName
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        console.log(latitude)
        console.log(that.data.page)

        // 获取附近店铺数据
        let nearShopUrl = "/more_near_shops.html"
        let pageParam = {
          "longitude": longitude,
          "latitude": latitude,
       //  "shopTag":"",
          "page": that.data.page
        }
        pageParam = Object.assign({}, pageParam, that.data.receiveData )
        console.log(nearShopUrl + pageParam)
        let customIndex = app.AddClientUrl(nearShopUrl, pageParam, 'get', 1)

        // wx.showLoading({
        //   title: 'loading'
        // })
        app.showToastLoading('loading', true)
        //拿custom_page
        wx.request({
          url: customIndex.url,
          header: app.header,
          method: 'GET',
          success: function (res) {
            console.log("数据", res.data.relateObj)
            let shops = res.data.relateObj.result;
            // 获取公里数
            for (let i = 0; i < shops.length; i++) {
              shops[i].distance = app.getDistance(latitude, longitude, shops[i].latitude, shops[i].longitude)
            }
            that.setData({
              shops: shops,
              curPage: res.data.relateObj.curPage,
              pageSize: res.data.relateObj.pageSize,
              totalSize: res.data.relateObj.totalSize
            })




            if (res.data.errcode < 0) {
              console.log(res.data.errMsg)
            }else {
              wx.hideLoading()
              if (!!res.data.partials) {
                that.getPartials(res.data.partials)
              } else {
                console.log('--------error --------' + res.data)
              }
            }
          },
          fail: function (res) {
            wx.hideLoading()
            app.loadFail()
          }
        })
      }

    })




  },
  // 
  getGreatCircleDistance: function (lng1, lat1, lng2, lat2) {
    var EARTH_RADIUS = 6378.137; //地球半径
    lng1 = parseFloat(lng1);
    lat1 = parseFloat(lat1);
    lng2 = parseFloat(lng2);
    lat2 = parseFloat(lat2);
    console.log("a,b", lng1, lat1, lng2, lat2)
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;

    var a = radLat1 - radLat2;
    var b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    // console.log("公里数",s)
    // console.log("公里数", this.data.journey)
    s = s.toFixed(1);
    var journey = this.data.journey
    journey.push(s);

    this.setData({
      journey: journey
    })
    // console.log("公里数", this.data.journey)
    return s;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("====options===", options)
    this.setData({ receiveData: options})
    this.getData();

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
    if (this.data.reflesh == 1) {
      this.onPullDownRefresh()
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
    this.data.Data = []

    this.listPage.page = 1
    this.getData();
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
    if (that.data.totalSize > that.data.curPage * that.data.pageSize) {
      that.data.page++;
      // 如果跳到下一页把上一页的数据加进去
      let shoparr = that.data.shops
    //  现获取数据，当翻页后把上一页的内容加进去
      this.getData();

      if (that.data.page > 1) {
        shoparr = shoparr.concat(that.data.shops);
        that.setData({
          shops: shoparr,
       
        })
      }
    }
  },

})