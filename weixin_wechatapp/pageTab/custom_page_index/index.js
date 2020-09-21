

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
    partialsName:'',
    loginUser:null,
    showAuthorizationPopup:false,
  },

  setNavBar: function (){
    console.warn("1111111111111")
    if (app.setting.platformSetting.siteTitle == '') {
      wx.setNavigationBarTitle({
        title: '首页',
      })
    } else {
      wx.setNavigationBarTitle({
        title: app.setting.platformSetting.siteTitle,
      })
    }

    wx.setNavigationBarColor({
      frontColor: app.setting.platformSetting.topColor.toLowerCase(),
      backgroundColor: app.setting.platformSetting.topBgColor,
    })
  },
  getStateData: function (state) {
    let that = this;
    console.log("===getStateData===", state, that.data.showAuthorizationPopup)
    let partialsName = JSON.parse(that.data.partialsName)
    partialsName.state = state
    that.setData({ partialsName: null })
    setTimeout(function(){
      that.setData({ partialsName: JSON.stringify(partialsName)})
    },300)
  },
  /*onload*/
  onLoad: function (options) {
    // wx.hideTabBar({})
    console.warn("======onLoad:options======", options, app.setting)
    console.log('--------------- custom_index --------------')
    app.addAuthorizationListenerItem(this)
    if(!app.setting){
      app.promiseonLaunch(this)
    }else{
       this.setData({
          sysWidth: app.globalData.sysWidth,
          setting: app.setting
        });
      let partialsName = JSON.stringify({ url: "index", state: this.data.showAuthorizationPopup })
      this.setData({ partialsName: partialsName })
        if (!!app.setting) {
          this.setNavBar()
        }
    }
  },

  onReady: function () { 
    if (app.shareParam && app.shareParam.pageName){
      console.log("这是custom_page里面ready事件的shareParam" + app.shareParam)
      this.jumpToPage(app.shareParam)
    }
    
    // Countdown(app,this);
  },
  jumpToPage: function (shareParam){
    if (shareParam.pageName == 'custom_page_index'){
      return
    } else if (shareParam.pageName == 'shopping_car_list') {
      return
    } else if (shareParam.pageName == 'custom_page_userinfo') {
      return
    } else{
      let paramStr = app.jsonToStr(shareParam)
      wx.navigateTo({
        url: '/pages/' + shareParam.pageName + '/index' + paramStr,
      })
    }

  },
  onPageScroll:function(object){
    var positionNotifyer = this.selectComponent("#container").selectAllComponents(".positionNotifyer"); 
    // console.log("===positionNotifyer===", positionNotifyer)
    if (positionNotifyer != null) {
      for (let i = 0; i < positionNotifyer.length; i++) {
        try { positionNotifyer[i].scrollTo(object); } catch (e) { }
      }
    }
  },
  onShow: function () {
    // console.log('-----------------a---------------', this.data.selectAddress, this.data.selectResultsData)
    // let that = this;
    // let title = that.selectComponent("#container").selectAllComponents("#title");
    // if (that.data.selectResultsData){
    //   if (title) {
    //     for (let i = 0; i < title.length; i++) {
    //       try { 
    //         title[i].changeSearchProductFun(that.data.selectResultsData); 
           
    //         } catch (e) { }
    //     }
    //   }
    // }
    // if (that.data.selectAddress){
    //   let locateAddress = that.selectComponent("#container").selectAllComponents("#locateAddress"); 
    //   if (locateAddress){
    //     for (let i = 0; i < locateAddress.length; i++) {
    //       try { locateAddress[i].changeSelectAddress(that.data.selectAddress); } catch (e) { }
    //     }
    //   }
    // }
    this.audioCtx = wx.createAudioContext('myAudio');
    let Time2 = util.formatTime(new Date())  //当前时间
    let OldTime = '2018-3-1 15:20:33'
    let result = util.GetDateDiff(OldTime, Time2,'second') 
    let sss = util.timeStamp(result)
    console.log(sss)
  },

  /* 组件事件集合 */
  tolinkUrl: function (e) {
    console.warn("=======e=======",e)
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 分享 app.js862行*/
  onShareAppMessage: function () {
    console.log(app.miniIndexPage)

    return app.shareForFx2(app.miniIndexPage)
    
  },
  setPageName:function(urlStr){
    let url = urlStr||"";
    let partialsName=""
    if(url){
      partialsName = JSON.stringify({ url: url, state: this.data.showAuthorizationPopup})
    }
    this.setData({ partialsName: partialsName })
    console.log("partialsName", this.data.partialsName)
  },
  refreshPage:function(){
    let that = this;
    console.log("首页刷新")
    that.setPageName()
    wx.showToast({
      title: '加载中...',
      icon: 'none',
      duration: 500,
    })
    setTimeout(function () {
      that.setPageName('index')
      app.footerCount = 0
    }, 500);
  },
  onPullDownRefresh: function () {
    let that = this;
    // 下拉刷新的时候首先判断存不存在tab
    that.refreshPage()
    // if (this.data.listenerId) {
    //   console.log("hello:" + this.data.listenerId);
    //   try {
   
    //     this.selectComponent('#' + this.data.listenerId).refresh();
    //   } catch (e) {
    //     console.log("e", e)
    //   }
    // }
    // console.log(this.data.PaiXuPartials)

    // var data = this.data.PaiXuPartials;
    // var index = 0;
    // console.log(data.length)
    // var a = [];
    // for (var i = 0; i < data.length; i++) {
    //   index = i;
    //   console.log(data[index].partialType)
    //   if (data[index].partialType == "13") {
    //     a.push(data[index]);
    //     console.log(a)
    //     this.setData({
    //       PaiXuPartials: a
    //     })
    //   }

    // }

    // if (this.data.PaiXuPartials.length == "0") {
    //   setTimeout(function () {
    //     that.onLoad();
    //   }, 500);
    // }
 
      wx.stopPullDownRefresh()
 
  },
})
function Countdown(page,that) {
  console.log('2')
  if (page.loginUser) {
    that.setData({
      loginUser: page.loginUser
    })
    
  

  }
  else {
    timer = setTimeout(function () {
      Countdown(page,that);
    }, 500);
  }
};