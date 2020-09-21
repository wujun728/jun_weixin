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
    actEndTimeList: [],
    countDownList:[],
    dataArr:[],
    setting:{}


  },

  ready: function (options) {
    var me = this;
    var oldData = this.data;
    console.log("===actEndTimeList===", oldData);
    this.setData({ setting: app.setting, defaultColor: app.setting.platformSetting.defaultColor})
    console.log("=======defaultColor====", this.data.defaultColor)
    // 已经开始的活动
    if (oldData.data.relateBean[0].promotionStatus == 1){
      var arr=[];
      console.log(oldData.data.relateBean.length);
      var dataLength = oldData.data.relateBean.length;
      // 循环出项目的个数,添加到arr中
      for (var a = 0; a < dataLength; a++) {
        console.log(oldData.data.relateBean[a].endDate)
        arr.push(oldData.data.relateBean[a].endDate)   
      }
      me.setData({ actEndTimeList: arr })

      var interval = setInterval(function () {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = oldData.actEndTimeList;
        let countDownArr = [];
        // console.log("endTimeList" + endTimeList)
        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
          let endTime = new Date(Date.parse(o.replace(/-/g, "/"))).getTime();
          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
              day: this.timeFormat(day),
              hou: this.timeFormat(hou),
              min: this.timeFormat(min),
              sec: this.timeFormat(sec)
            }
          } else {//活动已结束，全部设置为'00'
            obj = {
              day: '00',
              hou: '00',
              min: '00',
              sec: '00'
            }
          }
          countDownArr.push(obj);
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({ countDownList: countDownArr })
        // console.log(oldData.countDownList)
      
      }.bind(this), 1000);
    }
   
 
    // 还未开始的活动
    if (oldData.data.relateBean[0].promotionStatus == 0) {
      var arr = [];
      var dataArr=[];
      console.log(oldData.data.relateBean.length);
      var dataLength = oldData.data.relateBean.length;
      // 循环出项目的个数,添加到arr中
      for (var a = 0; a < dataLength; a++) {
        console.log(oldData.data.relateBean[a].startDate)
        arr.push(oldData.data.relateBean[a].startDate)
        // 开抢时间
        var aaa = oldData.data.relateBean[a].startDate;
        var str = aaa.slice(5, 10); 
        var d1 = str.replace(/\-/g, "月");
        dataArr.push(d1)
        console.log(d1) 
      }
      me.setData({
         actEndTimeList: arr,
         dataArr: dataArr
          })
      var interval = setInterval(function () {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = me.data.actEndTimeList;
        let countDownArr = [];
        // console.log("endTimeList" , endTimeList)
        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
          let endTime = new Date(Date.parse(o.replace(/-/g, "/"))).getTime();
          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
              day: me.timeFormat(day),
              hou: me.timeFormat(hou),
              min: me.timeFormat(min),
              sec: me.timeFormat(sec)
            }
          } else {//活动已结束，全部设置为'00'
            obj = {
              day: '00',
              hou: '00',
              min: '00',
              sec: '00'
            }
          }
          countDownArr.push(obj);
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        me.setData({ countDownList: countDownArr })
        // console.log(oldData.countDownList)

      }.bind(me), 1000);
    }
   
  },

  methods: {
    // 这里是一个自定义方法
 
    timeFormat: function(param) {//小于10的格式化函数
      return param < 10 ? '0' + param : param;
    },

// 跳转页面
    clickLink: function (e) {
      console.log("===clickLink===",e)
      let data ={};
      if (e.currentTarget.dataset){
        data = e.currentTarget.dataset.item
      }
      if (data.promotionStatus == 1 && data.promotionType!=50){
        wx.navigateTo({
          url: '../../pageTab/tunzai/teMai/index?promotionId=' + data.id,
        })
      } else if (data.promotionStatus == 0 || data.promotionType == 50) {
        let a = "promotion_detail.html?promotionId=" + e.currentTarget.dataset.id;
        app.linkEvent(a);
      }   
    },
  },


})