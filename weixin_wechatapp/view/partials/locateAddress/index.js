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
    locationAddress:"加载当前地址中...",
    clientNo:'',
  },
  ready:function(){
    let that=this;
    this.setData({
      setting: app.setting,
      clientNo: app.clientNo
    })
    console.log("================locationAddress============",that.data.data)
    that.getLocationAddress();
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
    changeSelectAddress: function (data,indexPage) {
      let that=this;
      console.log("====changeSelectAddress====", data)
      let locationAddress
      if (data.value) {
        locationAddress = data.value
      } else {
        locationAddress = data.province + data.city + data.area + data.address
      }
      that.setData({ locationAddress: locationAddress })
      if (indexPage && indexPage.onPullDownRefresh){
        indexPage.onPullDownRefresh();
      }
    },
    setLoctionAddr: function (pageParam) {
      let that = this
      let customIndex = app.AddClientUrl("/setLocation.html", pageParam, 'get')
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log("=====setLoctionAddr====", res.data)
          wx.hideLoading()
         
        },
        fail: function (res) {
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    //  附近门店取第一个
    getNearMenDian: function (addressInfo) {
      let that = this;
      let latitude = addressInfo.latitude
      let longitude = addressInfo.longitude
      let menDian = {
        longitude: longitude,
        latitude: latitude,
      }
      // longitude 经度        
      // 获取门店的样式
      let menDianYangShi = app.AddClientUrl("/find_mendians.html", menDian, 'get')
      wx.request({
        url: menDianYangShi.url,
        data: menDianYangShi.params,
        header: app.headerPost,
        method: 'GET',
        success: function (res) {
          console.log("===附近门店取第一个", res.data)
          if (res.data.errcode == "-1") {
            wx.showToast({
              title: res.data.errMessage,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
          else {
            let firstMendian = res.data.relateObj.result;
            if (firstMendian.length != 0 && firstMendian[0].id) {
              // 当数据都存在，然后就开始设置门店
              that.setUpMenDian(firstMendian[0].id);
            } else {
              wx.showToast({
                title: "您附近没有相关门店哦!",
                image: '/images/icons/tip.png',
                duration: 2000
              })
            }
          }
        }
      })
    },
    // 设置门店（当门店信息都有的时候，将门店id传到服务器。）
    setUpMenDian: function (menDianID) {
      let that = this;
      let id = menDianID
      let menDianParameter = {
        mendianId: id
      }
      let menDianYangShi = app.AddClientUrl("/location_mendian.html", menDianParameter, 'get')
      wx.request({
        url: menDianYangShi.url,
        data: menDianYangShi.params,
        header: app.headerPost,
        method: 'GET',
        success: function (res) {
          console.log('=====setUpMenDian====', res)
          if (res.data.errcode == "-1") {
            wx.showToast({
              title: res.data.errMessage,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
          else {
            console.log("设置成功")
          }
        }
      })
    },
    // 这里是一个自定义方法
    tolinkUrl: function (e) {
      console.log("e.currentTarget.dataset.link=====", e.currentTarget.dataset.link)
      let linkUrl = e.currentTarget.dataset.link
      app.linkEvent(linkUrl)
    },
    getLocationAddress:function(){
      let that=this;
      console.log("==========getLocationAddress=========")
      let locationAddressData = wx.getStorageSync('selectAddressData')||''
      if (locationAddressData){
        let locationAddress=""
        if (locationAddressData.community){
          if (locationAddressData.value && locationAddressData.community) {
            locationAddress = locationAddressData.value
          } else  {
            locationAddress = locationAddressData.province + locationAddressData.city + locationAddressData.area + locationAddressData.address
          }
          that.setData({ locationAddress: locationAddress })
        }
        console.log("===locationAddressData====", locationAddressData);
        let pageParam = {
          "longitude": locationAddressData.longitude,
          "latitude": locationAddressData.latitude,
        }
        that.getLoctionAddr(pageParam)
      }else{
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            console.log("=====getLocationAddress====", res)
            let latitude = res.latitude
            let longitude = res.longitude
            console.log(longitude + "..............." + latitude)
            // 获取附近店铺数据
            let pageParam = {
              "longitude": longitude,
              "latitude": latitude,
            }
            console.log(pageParam)
            that.getLoctionAddr(pageParam)
            that.getNearMenDian(pageParam);
          }
        })
      }
     
    },
    // 获取地理数据
    getLoctionAddr: function (pageParam) {
      var that = this
      var param = {}
      param['type'] = 1
      param.longitude = pageParam.longitude
      param.latitude = pageParam.latitude
      var customIndex = app.AddClientUrl("/get_location_detail.html", param, 'get')
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log("=====getLoctionAddr====", res.data)
          let data = res.data.result
          let params={
            longitude: pageParam.longitude,
            latitude: pageParam.latitude,
            province: data.addressComponent?data.addressComponent.province : data.address_component.province,
            city: data.addressComponent ?data.addressComponent.city : data.address_component.city,
            street: data.addressComponent ?data.addressComponent.street : data.address_component.street,
          }
          that.setLoctionAddr(params);
          let locationAddress;
          if (data.formatted_address || data.formatted_addresses){
            locationAddress = data.pois[0].title
          }else{
            locationAddress = "加载当前地址失败..."
          }
          that.setData({ locationAddress: locationAddress })
          wx.hideLoading()
        },
        fail: function (res) {
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
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