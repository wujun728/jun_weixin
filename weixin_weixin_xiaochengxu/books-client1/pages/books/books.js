//获取服务器接口地址
const api = require('../../config/config.js');

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    showLoading: true
  },
  doLogin:function(){
    console.log('doLogin');
  },
  testGetUserInfo: function () {
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        console.log("success");
      },
      fail(){

      }
    })
  },
  getBookList: function () {
    let that = this;
    wx.request({
      url: api.getBooksUrl,
      data: {
        is_all: 1
      },
      success: function (res) {
        let data = res.data;
        console.log(data);
        if (data.result === 0) {
          setTimeout(function () {
            that.setData({
              bookList: data.data,
              showLoading: false
            });
          }, 800);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  onLoad: function () {
    let that = this;
    that.getBookList();
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
