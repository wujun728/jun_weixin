/**
 * The MIT License (MIT)
 * 商城购买数量增减效果
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/numchange/numchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min:1,//最小值 整数类型，null表示不设置
    max: null,//最大值 整数类型，null表示不设置
    num: 1,//输入框数量 整数类型
    change: 1,//加减变化量 整数类型
    def_num: 1//输入框值出现异常默认设置值
  },
  //输入框失去焦点事件
  evblur: function (e) {
    var zval = parseInt(e.detail.value);
    console.log(zval)
    //正则 正整数 0 负整数
    if (/(^-[1-9][0-9]{0,}$)|(^0$)|(^[1-9][0-9]{0,}$)/.test(zval)){
          //最大值
          if (this.data.max != null) {
            if (zval > this.data.max) {
              console.log("超出最大值")
              this.setData({ num: this.data.def_num })  
            }else{
              this.setData({ num: zval })
            };
          } else {
            this.setData({ num: zval })
          };
          //最小值
          if (this.data.min != null) {
            if (zval < this.data.min) {
              console.log("低于最小值")
              this.setData({ num: this.data.def_num })
            } else {
              this.setData({ num: zval })
            };
          } else {
            this.setData({ num: zval })
          };
    }else{
        console.log("不是整数")
        this.setData({ num: this.data.def_num })
    };
  },
  //加
  evad: function () {
    var cval = Number(this.data.num) + this.data.change;
    if (this.data.max != null){
      if (cval > this.data.max){
        console.log("超出最大值")
      }else{
        this.setData({ num: cval })
      };
    }else{
      this.setData({ num: cval })
    };
  },
  //减
  evic: function () {
    var cval = Number(this.data.num) - this.data.change;
    if (this.data.min != null) {
      if (cval < this.data.min) {
        console.log("低于最小值")
      } else {
        this.setData({ num: cval })
      };
    } else {
      this.setData({ num: cval })
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