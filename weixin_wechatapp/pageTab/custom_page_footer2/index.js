

var util = require('../../utils/util.js');
const app = getApp()
var timer; // 计时器
Page({
  
  data: {  
    listenerId: null,
    /* seeting */ 
    setting:null,
    renderData:null,
    PaiXuPartials:[], 
    sysWidth: 750,//图片大小
    partialsName:'',
    loginUser:null,
    sendFooterData:null,

  },

  setNavBar: function () {
    console.warn("1111111111111", app.setting.platformSetting)
    wx.setNavigationBarColor({
      frontColor: app.setting.platformSetting.topColor.toLowerCase(),
      backgroundColor: app.setting.platformSetting.topBgColor,
    })
  },
  getData: function () {
    console.log('---------------index - getsetting --------------')
    var that = this
    if (!app.setting) {
      console.log('-------------hasNoneSetting-----------')
      app.getSetting(that)
    } else {
      console.log('-------------hasSetting-----------')
      this.setData({ setting: app.setting })
      console.log(this.data.setting)
    }
  },
  /*onload*/
  onLoad: function (options) {
    // wx.hideTabBar({})
    console.warn("======onLoad:options======", options)
    console.log('--------------- custom_index --------------')
    if(!app.setting){
      app.promiseonLaunch(this)
    }else{
       this.setData({
          sysWidth: app.globalData.sysWidth
      });
      let sendFooterData = JSON.stringify({ title: 'title', url: "footer2", params: { pageObjectId: options.id||"" } })
      this.setData({ sendFooterData: sendFooterData })
      // this.setData({ partialsName:'footer2'})
      if (!!app.setting) {
        console.log("=====setting=====")
        this.setNavBar()
      }
    }
    // 

     
    // }
   
  
  },

  onReady: function () { 
    
  },
  onShow: function () {
    console.log('-----------------a---------------')
    
  },
  // /* 分享 app.js862行*/
  // onShareAppMessage: function () {
  //   console.log(app.miniIndexPage)

  //   return app.shareForFx2(app.miniIndexPage)
    
  // },
  onPullDownRefresh: function () {
    // 下拉刷新的时候首先判断存不存在tab
    wx.stopPullDownRefresh()
  },
})