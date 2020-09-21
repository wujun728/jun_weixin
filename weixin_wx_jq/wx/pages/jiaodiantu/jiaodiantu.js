/**
 * The MIT License (MIT)
 * 焦点图效果
 * @author 微信团队
 */

// pages/jiaodiantu/jiaodiantu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [//图片地址
      '../../images/jiaodiantu/1.png',
      '../../images/jiaodiantu/2.png',
      '../../images/jiaodiantu/3.png'
    ],
    indicatorDots: false,//是否显示面板指示点
    autoplay: false,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    circular: false,//是否采用衔接滑动
    vertical: false,//滑动方向是否为纵向
    current: 0//当前所在滑块的 index
  },
  //是否显示面板指示点
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  //是否自动切换
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  //是否采用衔接滑动
  changeCircular: function (e) {
    this.setData({
      circular: !this.data.circular
    })
  },
  //滑动方向是否为纵向
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  //自动切换时间间隔
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  //滑动动画时长
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //滑动事件
  eventchange: function (event){
    console.log(event.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})