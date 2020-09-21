/**
 * The MIT License (MIT)
 * 时钟特效
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/clockeffect2/clockeffect2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //基本换算数据
    cdeg: -90,
    b1: 30,           //h
    b2: 6,             //m
    cb2: 1 / 2,
    cb22: 1 / 120,
    b3: 6,              //s
    cb3: 1 / 10,
    //字符换时分秒
    hh: null,
    mm: null,
    ss: null,
    //图形时分秒
    deghh: null,
    degmm: null,
    degss: null
  },
  //初始化时间
  initc: function () {
    //获取当前时间
    var nowdate = new Date();
    var hh = (nowdate.getHours() > 12) ? nowdate.getHours() - 12 : nowdate.getHours();
    var mm = nowdate.getMinutes();
    var ss = nowdate.getSeconds();
    //设置
    this.setData({ hh: hh, mm: mm, ss: ss });
    //换算出对应角度
    var deghh = this.data.b1 * hh + mm * this.data.cb2 + ss * this.data.cb22 + this.data.cdeg;
    var degmm = this.data.b2 * mm + ss * this.data.cb3 + this.data.cdeg;
    var degss = this.data.b3 * ss + this.data.cdeg;
    //设置
    this.setData({ deghh: deghh, degmm: degmm, degss: degss });
  },
  //定时器时间
  interc: function () {
    var that = this;
    //时分动效
    setInterval(function () {
      that.hmanimate();
    }, 1000);
    //秒动效
    setInterval(function () {
      that.sanimate();
    }, 1000 / 12);
  },
  //时分动效
  hmanimate:function(){
    //获取当前时间
    var nowdate = new Date();
    var hh = (nowdate.getHours() > 12) ? nowdate.getHours() - 12 : nowdate.getHours();
    var mm = nowdate.getMinutes();
    var ss = nowdate.getSeconds();
    //设置
    this.setData({ hh: hh, mm: mm, ss: ss });
    //换算出对应角度
    var deghh = this.data.b1 * hh + mm * this.data.cb2 + ss * this.data.cb22 + this.data.cdeg;
    var degmm = this.data.b2 * mm + ss * this.data.cb3 + this.data.cdeg;
    //设置
    this.setData({ deghh: deghh, degmm: degmm });
  },
  //秒动效
  sanimate: function () {
    this.setData({ degss: this.data.degss + 0.5 });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化时间
    this.initc();
    //定时器时间
    this.interc();
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