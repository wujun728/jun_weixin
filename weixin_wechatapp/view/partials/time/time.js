const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    color:'#888'
  },

   ready:function(){
     let that=this;
     console.log("===========this===========", that.data.data)
     that.setData({ platformSetting: app.setting.platformSetting })
     console.log("===========this===========", that.data.platformSetting)
     if (that.data.data){
       var interval = setInterval(function () {
         var t1 = that.data.data;
         var d1 = t1.replace(/\-/g, "/");
         var date1 = new Date(d1);

         var totalSecond = parseInt((date1 - new Date()) / 1000);
         // 秒数
         var second = totalSecond;
         // console.log(totalSecond)
         // 天数位
         var day = Math.floor(second / 3600 / 24);
         var dayStr = day.toString();
         if (dayStr.length == 1) dayStr = '0' + dayStr;

         // 小时位
         var hr = Math.floor((second - day * 3600 * 24) / 3600);
         var hrStr = hr.toString();
         if (hrStr.length == 1) hrStr = '0' + hrStr;

         // 分钟位
         var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
         var minStr = min.toString();
         if (minStr.length == 1) minStr = '0' + minStr;

         // 秒位
         var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
         var secStr = sec.toString();
         if (secStr.length == 1) secStr = '0' + secStr;

         that.setData({
           countDownDay: dayStr,
           countDownHour: hrStr,
           countDownMinute: minStr,
           countDownSecond: secStr,
         });
         totalSecond--;
         if (totalSecond < 0) {
           clearInterval(interval);
          //  wx.showToast({
          //    title: '活动已结束',
          //  });
           that.setData({
             countDownDay: '00',
             countDownHour: '00',
             countDownMinute: '00',
             countDownSecond: '00',
           });
           that.setData({
             color: '#888'
           });
           
         }else{
           that.setData({
             color: that.data.platformSetting.defaultColor
           });
         }
       }.bind(that), 1000);
     }
     

   },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);

    }
  },
})