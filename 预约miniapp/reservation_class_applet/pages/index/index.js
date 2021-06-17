//index.js
//获取应用实例
const app = getApp()
const api = require('../../config/api.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播数组
    movies: [
      { url: 'http://img.taopic.com/uploads/allimg/140714/234975-140G4155Z571.jpg' },
      { url: 'http://img.cnys.com/upload/picture/2018/03-29/wZjqYz.jpg' },
      { url: 'http://img.taopic.com/uploads/allimg/140714/234975-140G4155Z571.jpg' },
      { url: 'http://img.taopic.com/uploads/allimg/140714/234975-140G4155Z571.jpg' }
    ],
    toast1Hidden: true,
    modalHidden: true,
    notice_str: '',
    //视频地址
    videouri: "http://wvideo.spriteapp.cn/video/2018/0410/5acc2d907fbee_wpd.mp4",
    store: "氧疗馆",
    address: "西安市XXXXXXXXXXX",
    phone: "138000000000",
    images: [
      { url:"/images/1.jpg"},
      { url: "/images/1.jpg"}],
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2018,
    endYear: 2050
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  bindDateChange: function (e) {
    var that = this;
    that.setData({
      date: e.detail.value
    })
    console.log(that.data.date);
  },
  //提交信息
  formSubmit: function (e) {
    //表单校验
    if(!this.checkForm(e)){
        return false;
    }
    var that = this;
    var formData = e.detail.value;
    //提交表单
    wx.request({
      url: api.INFO,//提交路径
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) { 
        console.log(res.data.code)
        console.log(res.data.msg)
        if (res.data.code==200){
          wx.showToast({
            title: '预约成功',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }else{
          wx.showToast({
            title: '服务器忙，请稍后再试',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }
      
        //清空表单
        that.setData({
          username: '',
          phone1:'',
          count:''
        })
      }
    })
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '13400000000' //需要拨打的电话号码
    })
  },
  to_map: function () {
    console.log("map");
    wx.navigateTo({
      url: '/pages/map/map'
    })
  }, formBindsubmit: function (e) {
    if (e.detail.value.username.length == 0 || e.detail.value.phone.length == 0) {
      wx.showToast({
        title: '姓名或电话不为空',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    } 
  },
  checkForm:function(e){
    if (e.detail.value.username.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(e.detail.value.phone)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (e.detail.value.enterdate.length == 0) {
      wx.showToast({
        title: "请选择日期",
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (e.detail.value.count.length == 0) {
      wx.showToast({
        title: "请填写人数",
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    return true;
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  //小程序转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  }
})
