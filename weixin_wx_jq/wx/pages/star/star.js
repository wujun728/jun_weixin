/**
 * The MIT License (MIT)
 * 星星评分功能
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/star/star.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posi:-1,//评分的结束索引，实际从0开始，-1表示无评分
    stars:[//评分描述配置
      { des: "0.2" },
      { des: "0.4" },
      { des: "0.6" },
      { des: "0.8" },
      { des: "1.0" },
    ],
    posit: 0,//评分的结束索引，实际从0开始，0表示选中第一个
    starst: [//评分描述配置
      { des: "极差" },
      { des: "很差" },
      { des: "一般" },
      { des: "很好" },
      { des: "非常好" },
    ]
  },
  //评分事件
  evclick:function(event) {
    //console.log(event.target.dataset.posi)
    this.setData({ posi: event.target.dataset.posi })
  },
  //评分事件
  evclickt: function (event) {
    //console.log(event.target.dataset.posit)
    this.setData({ posit: event.target.dataset.posit })
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