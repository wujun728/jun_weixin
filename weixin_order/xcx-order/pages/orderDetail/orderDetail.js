var app = getApp()
Page({
  data: {
    logistics: false,
    userInfo: '',
    orderStatus: 1,   // 0未付款 1已接单 2派送中 3已完成
    markers: [
      {
        iconPath: "../../img/qishou.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 40,
        height: 40
      },
      {
        iconPath: "../../img/me.jpg",
        id: 1,
        latitude: 23.090094,
        longitude: 113.324520,
        width: 40,
        height: 40
      }
    ],
    polyline: [{
      points: [{
        longitude: 113.324520,
        latitude: 23.099994
      }, {
        longitude: 113.324520,
        latitude: 23.090094
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
  },  
  //获取当前位置
  onLoad: function () {    
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo
        })  
      }
    })
    if (this.data.orderStatus==1){
      var shopAddress = [
        {
          iconPath: "../../img/shop.png",
          id: 0,
          name: '店家地址',
          desc: '店家地址',
          latitude: 23.099994,
          longitude: 113.324520,
          width: 40,
          height: 40,
          callout: {
            content: '店家地址',
            display: 'ALWAYS',
            borderRadius: 2,
            bgColor: '#ffe400',
            padding: 10
          },
        }];
      var callout = [
        {
          
        }
      ]
      this.setData({
        markers: shopAddress,
        polyline: ''
      })
    }
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '18316588252',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  toApply: function() {
    wx.navigateTo({
      url: '../applyRefund/applyRefund',
    })
  },
  logToTrue: function() {
    this.setData({
      logistics: true
    })
  },
  logToFalse: function() {
    this.setData({
      logistics: false
    })
  },
  toEvaluate: function() {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  }
})