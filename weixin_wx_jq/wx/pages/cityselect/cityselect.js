/**
 * The MIT License (MIT)
 * 城市选择器
 * @author 微信团队
 */

// pages/cityselect/cityselect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //普通选择器：（普通数组）
    array: ['选项1', '选项2', '选项3', '选项4'],
    index: 0,//默认显示位置
    //普通选择器2：（普通json格式数组）
    objectArray: [
      {
        id: 0,
        name: '大老婆'
      },
      {
        id: 1,
        name: '二老婆'
      },
      {
        id: 2,
        name: '三老婆'
      },
      {
        id: 3,
        name: '四老婆'
      }
    ],
    objectIndex: 0,//默认显示位置
    //多列选择器：
    multiArray: [['音频', '视频'], ['mp3', '评书']],//二维数组，长度是多少是几列
    multiIndex: [0, 0],
    //时间选择器：
    time: '12:01',
    //日期选择器：
    date: '2016-09-01',
    //省市区选择器：
    region: ['请选择', '请选择', '请选择'],
    customItem: '请选择'//为每一列的顶部添加一个自定义的项
  },
  //普通选择器：
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //普通选择器2：
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      objectIndex: e.detail.value
    })
  },
  //多列选择器：
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column==0){//第1列
      if (e.detail.value == 0) {//音频
        this.setData({
          multiArray: [['音频', '视频'], ['mp3', '评书']]
        })
      };
      if (e.detail.value == 1) {//视频
        this.setData({
          multiArray: [['音频', '视频'], ['电影', '电视剧']]
        })
      };
    };

  },
  //时间选择器：
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  //日期选择器：
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //省市区选择器：
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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