const app = getApp()
var timer11; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoadFail:false,
    showLoading:false
  },
  
  toIndex:function(){
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/' + app.miniIndexPage + '/index',
      })
    }, 100)
  },
  reloadJs:function(){
    this.setData({
      showLoading: true
    })
    app.loadFirstEnter(app.more_scene)
    clearTimeout(timer11)
    this.count = 5
    this.Countdown(app);
    
  },
  opt:{},
  setNav:function(){
    wx.setNavigationBarTitle({
      title: '加载失败',
    })
  },
  onLoad: function (options) {
    let that = this
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none'){
            //无网络
            console.error('无网络')
            that.setNav()
            that.setData({
              showLoadFail:true
            })
        }
      }
    }) 
    app.shareParam = options
    //转发的数据都在这里，   这时候的scene已经被app.unlunch使用了。   
    ///我们这里只需要把参数解析一下？放全局，等跳到首页的时候再做跳转
    if (app.setting && options.pageName && app.shareParam && app.shareParam.pageName) {
      setTimeout(function(){
        wx.reLaunch({
          url: '/pages/' + app.miniIndexPage + '/index',
        })
      },100)
      

    }else{
      this.Countdown(app);
    }
    
  },

  onReady: function () {
    
  },

  onShow: function () {
    
    
    if (app.appHide) {
      app.appHide = false
      app.onLaunch(app.onLaunchOptions)
      this.onReady()
    }

  },
  count:8,
  Countdown:function(){
    let that = this
    --this.count;
    console.log('-------获取 setting 中--------')
    if (app.setting ) {
      clearTimeout(timer11)
      that.toIndex()
      return false;
    }
    if (this.count < 1){
      app.echoErr('获取setting数据失败')
      this.setData({
        showLoadFail: true,
        showLoading: false
      })
      this.setNav()     
      clearTimeout(timer11)
      return false;
    }
    else {
      timer11 = setTimeout(function () {
        that.Countdown();
      }, 1000);
    }
  }

})

//定时器
/*  function Countdown(page) {
   console.log('2')
   if (!!page.setting){
     //setTimeout(function () {  }, 200)
     page.toIndex()
   }
   else{
     timer = setTimeout(function () {
       Countdown(page);
     }, 1000);
   }
}; */