/**
 * The MIT License (MIT)
 * 全选效果
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/allcheckbox/allcheckbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: { id: "全选", val: "全选", checked: false },
    items:[
      { id: "1", val:"小丽",checked: false },
      { id: "2", val: "小刚",checked: false },
      { id: "3", val: "小明",checked: false },
      { id: "4", val: "小美",checked: false },
    ] 
  },
  //复选框事件
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var t_items = [];
    if (e.detail.value == this.data.all.id){
      for (var i = 0; i < this.data.items.length;i++){
        t_items[i] = { id: this.data.items[i].id, val: this.data.items[i].val, checked: true };
      }
      this.setData({ items: t_items});
    }else{
      for (var i = 0; i < this.data.items.length; i++) {
        t_items[i] = { id: this.data.items[i].id, val: this.data.items[i].val, checked: false };
      }
      this.setData({ items: t_items });
    };
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