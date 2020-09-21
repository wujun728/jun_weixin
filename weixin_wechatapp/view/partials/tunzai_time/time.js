const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    color:'#888',
    tipText:"",
    count:152366544,
  },
    interval:null ,
  
   ready:function(){
     let that=this;
     let time = '';
     if (that.data.data.endTime){
       that.data.tipText='活动即将结束';
       time = that.data.data.endTime
     } else if (that.data.data.startTime){
       time = that.data.data.startTime
       that.data.tipText = '活动即将开始'; 
     }
   that.data.time = time;
   //  this.setData({ time: time})
     that.data.platformSetting = app.setting.platformSetting;
    //  that.interval(function () {
    //    let that = this;
    //    var t1 = that.data.time;
    //    var d1 = t1.replace(/\-/g, "/");
    //    var date1 = new Date(d1);
    //    var totalSecond = parseInt((date1 - new Date()) / 1000);
    //    // 秒数
    //    var second = totalSecond;
    //    // 天数位
    //    var day = Math.floor(second / 86400);
    //    var dayStr = day.toString();
    //    if (dayStr.length == 1) dayStr = '0' + dayStr;

    //    // 小时位
    //    var hr = Math.floor((second - day * 86400) / 3600);
    //    var hrStr = hr.toString();
    //    if (hrStr.length == 1) hrStr = '0' + hrStr;

    //    // 分钟位
    //    var min = Math.floor((second - day * 86400 - hr * 3600) / 60);
    //    var minStr = min.toString();
    //    if (minStr.length == 1) minStr = '0' + minStr;

    //    // 秒位
    //    var sec = second - day * 86400 - hr * 3600 - min * 60;
    //    var secStr = sec.toString();
    //    if (secStr.length == 1) secStr = '0' + secStr;

    //    that.setData({
    //      countDownDay: dayStr,
    //      countDownHour: hrStr,
    //      countDownMinute: minStr,
    //      countDownSecond: secStr,
    //      color: that.data.platformSetting.defaultColor
    //    });
    //    totalSecond--;
    //    if (totalSecond <= 0) {
    //      wx.showToast({
    //        title: that.data.tipText,
    //      });
    //      that.setData({
    //        countDownDay: '00',
    //        countDownHour: '00',
    //        countDownMinute: '00',
    //        countDownSecond: '00',
    //        count: totalSecond,
    //      });
    //      that.setData({
    //        color: '#888'
    //      });

    //    } else {
    //      /*that.setData({
    //        count: totalSecond,
    //      });*/
    //    }
    //  }.bind(that), 1000, that.data.count);
     if (time){
        that.startInterval();
     }
     
   },
  methods: {
    containerShow: function () {
      this.startInterval();
    },

    startInterval:function(){
      var that = this;
      if (this.interval!=null){
        clearInterval(this.interval);
        this.interval = null;
      }  
      this.interval = setInterval(function () {
      
        var t1 =that.data.time;
        var d1 = t1.replace(/\-/g, "/");
        var date1 = new Date(d1);
        var totalSecond = parseInt((date1 - new Date()) / 1000);
        // 秒数
        var second = totalSecond;
        // 天数位
        var day = Math.floor(second / 86400);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;

        // 小时位
        var hr = Math.floor((second - day * 86400) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位
        var min = Math.floor((second - day * 86400 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位
        var sec = second - day * 86400 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        that.setData({
          countDownDay: dayStr,
          countDownHour: hrStr,
          countDownMinute: minStr,
          countDownSecond: secStr,
          color: that.data.platformSetting.defaultColor
        });
        totalSecond--;
          // console.log(totalSecond+that.data.data.type);
        if (totalSecond <= 0) {
          clearInterval(that.interval);
          wx.showToast({
            title: that.data.tipText,
          });
          that.setData({
            countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
            color: '#888'
          }); 

        } else {

        }
      }.bind(that), 1000);
    },
    containerHide:function(){
      clearInterval(this.interval);
      this.interval=null;
    },
    containerRemove:function(){
      clearInterval(this.interval);
      this.interval=null;
    },
    // 这里是一个自定义方法
    // interval: function (func, w, t) {
    //   let that=this
    //   var interv = function () {
    //     if (typeof t === "undefined" || t-- > 0) {
    //       setTimeout(interv, w);
    //       try {
    //         func();
    //       } 
    //       catch (e) {
    //         t = 0;
    //         throw e.toString();
    //       }
    //     }
    //   };
    //   setTimeout(interv, w);
    // },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);

    }
  },
})