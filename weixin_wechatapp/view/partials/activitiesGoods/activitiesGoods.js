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
    color:"",
    countDownDay: "",
    countDownHour: "",
    countDownMinute: "",
    countDownSecond: "",
    setting:{},
  },
  
  ready: function (options) {
    var that=this;
    var oldData = this.data;
    console.log("====oldData====", oldData)
    that.setData({ setting: app.setting.platformSetting})
    console.log("=======setting====", that.data.setting)
    // oldData.countDownMinute = '1fffffffffffffffffffffffffffffffffffffff11';
    // console.log("hel11lo", JSON.stringify(oldData)); 
    // console.log("hel11lo", oldData.data.relateBean.endDate); 
    if (oldData.data.relateBean.promotionStatus == 1) {


      var interval = setInterval(function () {
        var t1 = oldData.data.relateBean.endDate;
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

        this.setData({
          countDownDay: dayStr,
          countDownHour: hrStr,
          countDownMinute: minStr,
          countDownSecond: secStr,
        });
        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(interval);
          wx.showToast({
            title: '活动已结束',
          });
          this.setData({
            countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
          });
        }
      }.bind(this), 1000);


    }
    if (oldData.data.relateBean.promotionStatus == 0) {


      var interval = setInterval(function () {
        var t1 = oldData.data.relateBean.startDate;
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

        this.setData({
          countDownDay: dayStr,
          countDownHour: hrStr,
          countDownMinute: minStr,
          countDownSecond: secStr,
        });
        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(interval);
         
          this.setData({
            countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
          });
        }
      }.bind(this), 1000);


    }
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);


      // wx.navigateTo({
      //   url: '/pages/' + event.currentTarget.dataset.page + '/index'
      // })
    },
    // 跳转页面
    clickLink: function (e) {
      console.log(e)
      // 如果是已经开始的就前往详情
      var oldData = this.data;
      if (oldData.data.relateBean.promotionStatus == 1) {
        console.log("=====已开始的活动========")
        var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
        app.linkEvent(a);
      }else if (oldData.data.relateBean.promotionStatus == 0) {
        console.log("=====未开始的活动========")
        var a = "promotion_detail.html?promotionId=" + e.currentTarget.dataset.id;
        app.linkEvent(a);
      }else if (oldData.data.relateBean.promotionStatus == 2) {
        console.log("=====已结束的活动========")
        var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
        app.linkEvent(a);
      }



    },
    clickLink1: function (e) {
      console.log(e)
      // 如果是已经开始的就前往详情
      var oldData = this.data;
      if (oldData.data.relateBean.promotionStatus == 1) {
        wx.navigateTo({
          url: '../../pageTab/tunzai/teMai/index?promotionId=' + e.currentTarget.dataset.id,
        })
      }

      if (oldData.data.relateBean.promotionStatus == 0) {
        var a = "promotion_detail.html?promotionId=" + e.currentTarget.dataset.id;
        app.linkEvent(a);
      }



    },

  },
 
  
})