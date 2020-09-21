const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');

Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    page:"1",
    shops:[],
    journey:[],//公里数
  },
  ready:function(){
    this.getData();
    if (app.setting.platformSetting.defaultColor && app.setting.platformSetting.defaultColor !=""){
      console.log("=========app.setting.platformSetting.defaultColor ==========", app.setting.platformSetting.defaultColor )
      // 有默认色
      this.setData({
        defaultColor: app.setting.platformSetting.defaultColor
      })
      
    }
    else{
      // 没有默认色
      this.setData({
        defaultColor: app.setting.platformSetting.defaultColor
      })
    }
  
 
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (e) {
      console.log("e.currentTarget.dataset.link=====", e.currentTarget.dataset.link)
      let linkUrl = e.currentTarget.dataset.link
      app.linkEvent(linkUrl)
    },
    // 获取附近店铺数据
    getData:function(){
      let that = this;
      // 店铺名可以从app.setting中拿到
      console.log("app.setting.platformSetting", app.setting);
      let shopName = app.setting.platformSetting.defaultShopBean.account.shopName
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          let latitude = res.latitude
          let longitude = res.longitude
          console.log(longitude + "..............." + latitude)
          console.log(that.data.page)
          // 获取附近店铺数据
          let pageParam = { 
            "longitude": longitude,
            "latitude": latitude,
            "page": that.data.page
             }
          console.log(pageParam)
          let customIndex = app.AddClientUrl("/more_near_shops.html", pageParam, 'get', 1)
          // wx.showLoading({
          //   title: 'loading'
          // })
          app.showToastLoading('loading', true)
          wx.request({
            url: customIndex.url,
            header: app.header,
            method: 'GET',
            success: function (res) {
              console.log("数据", res)
              that.setData({
                shops: res.data.relateObj.result
              })
              // 店铺标签是带【】的字符串需要改
              console.log("=====shops=====", that.data.shops)
              let shops = res.data.relateObj.result;
              let tagArray=[];
              for (let j = 0; j < shops.length; j++) {
                // 获取公里数
                shops[j].distance = app.getDistance(latitude, longitude, shops[j].latitude, shops[j].longitude)
                if (shops[j].shopTag) {
                  tagArray = shops[j].shopTag.slice(1, -1).split("][")
                  shops[j].tagArray = tagArray;
                }
              }
              that.setData({shops: shops})
              console.log("=========shops=======", that.data.shops)
              if (res.data.errcode < 0) {
                console.log(res.data.errMsg)
              }
              else {
                wx.hideLoading()
               
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
    getGreatCircleDistance: function (lng1, lat1, lng2, lat2){
      var EARTH_RADIUS = 6378.137; //地球半径
    lng1=parseFloat(lng1);
    lat1=parseFloat(lat1);
    lng2=parseFloat(lng2);
    lat2=parseFloat(lat2);
    // console.log("a,b", lng1, lat1, lng2, lat2)
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;

    var a = radLat1 - radLat2;
    var b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
   
    // console.log("公里数",s)
    // console.log("公里数", this.data.journey)
    s=s.toFixed(1);
    var journey = this.data.journey
    journey.push(s);
  
    this.setData({
      journey: journey
    })
    // console.log("公里数", this.data.journey)
    return s;
  },
  

  },
})