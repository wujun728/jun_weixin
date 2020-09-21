const app = getApp()
var timer; // 计时器
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    setting:null,
    shopBean:null,
    userLocation:null,
   
  },
 
  //获取我的位置
  setLocation:function(){
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        let userLocation = res
        that.setData({ userLocation: userLocation })
      }
    })
  },
  //获取店铺的位置和半径
  setShopBean:function(){

    this.openLocation(shopBean)
  },
  //打开地图   ---   主要代码
  openLocation: function (){
    let markers = app.setting.platformSetting.defaultShopBean
      let lat = Number(markers.latitude)
      let lng = Number(markers.longitude)
      let name = markers.shopName
      let address = ''
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: Number(markers.latitude),
          longitude: Number(markers.longitude),
          scale: 28,
          name: name,
          address: address,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.openLocation()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.freshLocation()
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  //刷新位置
 /*  freshLocation: function () {
    let that = this
    Countdown(that);
  }, */
})
//定时器
/* function Countdown(page) {
  
  timer = setTimeout(function () {
    Countdown(page);
  }, 1000);
}; */