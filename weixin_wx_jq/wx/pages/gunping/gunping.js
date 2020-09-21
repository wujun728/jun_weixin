/**
 * The MIT License (MIT)
 * 瀑布流布局+滚屏
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/gunping/gunping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realkeyWords: [],
    contleft: 0,
    contmaxwidth: 0
  },
  /*瀑布流布局+滚屏*/
  seamless(keyWords) {
    let that = this;
    //372rpx  三行每一行的top
    var row = [0, 124, 248];
    var margin = 30;//30rpx 项目的left间距
    var fontsize = 36;//36rpx 字体大小用来计算宽度

    var arrswidth = [0, 0, 0];//三行每一项的宽度值
    var realkeyWords = [//计算好的可用数组
      // {val:"我去局,输",top:0,left:0}
    ];
    //刷新间隔(单位：ms)
    var interval = 30;
    //瀑布流计算
    //xxxrpx*设备宽度/750
    wx.getSystemInfo({
      success: function (res) {
        row = [0 * res.windowWidth / 750, 124 * res.windowWidth / 750, 248 * res.windowWidth / 750];
        margin = 30 * res.windowWidth / 750;
        fontsize = 36 * res.windowWidth / 750;
        for (var i = 0; i < 3; i++) {
          realkeyWords.push({ val: keyWords[i], top: row[i], left: margin, width: (keyWords[i].length + 2) * fontsize });
          arrswidth[i] = margin + (keyWords[i].length + 2) * fontsize;
        };
        for (var i = 3; i < keyWords.length; i++) {
          var minval = Math.min.apply(null, arrswidth);
          var minindex = 0;
          for (var j = 0; j < arrswidth.length; j++) {
            if (minval == arrswidth[j]) {
              minindex = j;
              break;
            };
          };
          var str = keyWords[i];
          realkeyWords.push({
            val: str, top: row[minindex], left: margin + minval, width: (str.length + 2) * fontsize
          });
          arrswidth[minindex] = arrswidth[minindex] + margin + (str.length + 2) * fontsize;
        };

        var contmaxwidth = Math.ceil(Math.max.apply(null, arrswidth));
        console.log("item值", realkeyWords, "最大宽度", contmaxwidth);
        that.setData({
          realkeyWords: realkeyWords,
          contmaxwidth: contmaxwidth
        });
        that.wfgdTimer = setInterval(function () {
          if (that.data.contleft <= -contmaxwidth) {
            that.setData({
              contleft: 0
            });
          } else {
            that.setData({
              contleft: that.data.contleft - 1
            });
          };
        }, interval);
        //e
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //瀑布流布局 + 滚屏 * /
    this.seamless([
      "你很好的啊啊",
      "就是很厉害",
      "加油",
      "不错的",
      "我真的不知道什么",
      "七龙珠",
      "大魔王来了",
      "为新的小程序",
      "你很好吗",
      "和",
      "嘎嘎嘎个",
      "加油吧",
      "什么的藕粉色",
      "啊啊大大大",
      "啊大大",
      "十大撒大大大的",
      "蝶粉蜂黄或或或",
      "试试",
      "发广告",
      "哒哒哒哒"
    ]);
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