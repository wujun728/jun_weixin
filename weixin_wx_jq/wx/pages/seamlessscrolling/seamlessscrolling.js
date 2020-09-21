/**
 * The MIT License (MIT)
 * 无缝滚动
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/seamlessscrolling/seamlessscrolling.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bchange: 2,//变化值，可自定义设置
    bspeed: 100,//速度，可自定义设置
    direction: "horizontal", //  horizontal=水平 vertical=垂直  ，可设置
    horizontal_dire: "left",// direction: "horizontal" 有效，   left =左    right =右，可设置
    vertical_dire: "top",// direction: "vertical" 有效，   top =上    bottom =下，可设置
    strs: ["所有的楼房全部低于3千平米赶快买", "所有的车子全部低于30000一辆", "知道区块链吗，知道比特币吗，赶紧学"],//滚动内容，可自定义设置
    clonestr:[],//无缝衔接容器
    bw: 0,//容器宽度
    bh: 0,//容器高度
    bl: 0,//容器位置 left
    bt: 0//容器位置 top
  },
  //无缝滚动函数
  seamlessscrolling:function(){
    var that = this;
    //复制容器
    var clonestr = [];
    for (var i = 0; i < this.data.strs.length; i++) {
      clonestr.push(this.data.strs[i]);
    };
    for (var i = 0; i < this.data.strs.length; i++) {
      clonestr.push(this.data.strs[i]);
    };
    //console.log(clonestr);
    that.setData({ clonestr: clonestr })
    //容器设置 获取设备宽度（可自定义处理）
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res.windowWidth)
        //console.log(res.windowHeight)
        that.setData({ bw: res.windowWidth, bh: 40 })
      }
    })
    //动画
    var anima = setInterval(function () {
      if (that.data.direction == "horizontal") {//水平
        if (that.data.bl - that.data.bchange <= -that.data.bw * that.data.strs.length) {
          that.setData({ bl: 0 })
        } else {
          that.setData({ bl: that.data.bl - that.data.bchange })
        };
      } else if (that.data.direction == "vertical") {//垂直
        if (that.data.bt - that.data.bchange <= -that.data.bh * that.data.strs.length) {
          that.setData({ bt: 0 })
        } else {
          that.setData({ bt: that.data.bt - that.data.bchange })
        };
      };
    }, that.data.bspeed)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //无缝滚动函数
    this.seamlessscrolling();
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