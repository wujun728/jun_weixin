const app = getApp()
var timer11; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoadFail:false,
    showLoading:false ,
    page_name: "",
  },
  toIndex:function(){
    let that=this; 
    console.log("========app==", app, app.more_scene, that.data.page_name);
    // custom_page_index.html是首页也就是app.miniIndexPage+".html" 
    if (that.data.page_name != "" && that.data.page_name != app.miniIndexPage+".html"){
      // that.data.page_name是带着.html先去掉
      var linkUrl=that.data.page_name
      let urlData = app.getUrlParams(linkUrl)
      var resultUrl = linkUrl.substring(12, linkUrl.length - 5)
      if (urlData.param == '') {
        urlData.param = '?'
      }

      console.log("urlData" + urlData.param + "------" + resultUrl)
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/custom_page/index' + urlData.param + '&Cpage=' + resultUrl,
        })},200);
    }else{
      if (app.clientNo=="tunzai"){
        console.log("进入蓝湖")
        setTimeout(function () {
        wx.reLaunch({
          url: '/pageTab/tunzai/index/index',
        })},200);
        return;
      }else{
        setTimeout(function () {
        wx.reLaunch({
          url: '/pageTab/' + app.miniIndexPage + '/index',
          fail: function () {
            console.log("==app.miniIndexPage==", app.miniIndexPage)
            app.linkEvent(app.miniIndexPage+'.html')
           }
          })
        }, 200);
        return;
      }
    }
  },
  reloadJs:function(){//重新加載
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
    console.log("=====options携带的参数=====", options)
    let that = this;
    app.shareSubPage = false;
    
    if (!app.setting.platformSetting.id){
      console.log('还没获取到setting')
      app.getSetting().then(function (res) {
        console.log('已获取到setting')
        that.enterPage(options)
      })
    } else {
      console.log('已获取到setting')
      that.enterPage(options)
    }
  },
  enterPage: function (options) {
    let that = this;
 
    if (options.params && options.params != "") {
      let aaa = JSON.parse(options.params)
      console.log(aaa)
      options = aaa
    }
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          //无网络
          console.error('无网络')
          that.setNav()
          that.setData({
            showLoadFail: true
          })
        }
      }
    })
    if (options.RESOURCE_TYPE){
      console.log("==========领取资源入口=========")
      let resourceType = options.RESOURCE_TYPE;//RESOURCE_TYPE
      let resourceId = options.RESOURCE_ID;//RESOURCE_ID
      let params = { resourceId: resourceId, resourceType: resourceType}
      params = app.jsonToStr2(params)
      let result = "resource_info.html?" + params
      setTimeout(function () {
        app.goto(result);
      }, 200);
    };
    // 预览页面 实际上就2点更改clientNo，重新获取setting（自己想多了）
    if (options.REDIRECT && options.REDIRECT != "") {
      app.linkEvent(options.REDIRECT);
      return;
    }
    // 预览页面 实际上就2点更改clientNo，重新获取setting（自己想多了）
    if (options.ENTER_PLATFORM_NO && options.ENTER_PLATFORM_NO != "" && options.ENTER_PAGE_NAME && options.ENTER_PAGE_NAME != "") {
      console.log("options.page_name", options.ENTER_PAGE_NAME)
      that.setData({
        page_name: options.ENTER_PAGE_NAME
      })
      console.log(" app.clientNo", app.clientNo)
      app.clientNo = options.ENTER_PLATFORM_NO
      app.getSetting();
      return;
    }
    //如果传入的是 MINI_PLATFORM_USER_开头的更改用户推广人

    //如果用户未登录 这里的代理有bug 应该用登录回调来处理
    if (!!options.scene && options.scene.indexOf('MINI_PLATFORM_USER_ID') != -1) {
      if (app.loginUser) {
        app.USER_DEFINED_SCENE = options.scene;
        app.changeUserBelong(options.scene)
      } else {
        app.USER_DEFINED_SCENE = options.scene;
      }
    }
    // 公用
    if (options.SHARE_COMMON_PAGE && options.SHARE_COMMON_PAGE != "") {
      console.log("=======SHARE_COMMON_PAGE=========", options)
      let linkUrl = options.linkUrl ||'custom_page_index'
      if (options.linkUrl ){
        delete options.linkUrl
      }
      if (options.SHARE_COMMON_PAGE ) {
        delete options.SHARE_COMMON_PAGE
      }
      if (options.scene) {
        delete options.scene
      }
      let params = app.jsonToStr2(options)
      console.log("=======params=========", params)
      let result = linkUrl + ".html?" + params
      setTimeout(function () {
      app.goto(result);
      },200);
      return
    }
    // 传入值携带桌子二维码的跳到订餐页面
    if (options.ENTER_ORDER_MEAL_TABLEID && options.ENTER_ORDER_MEAL_TABLEID != "" && options.ADDSHOPID && options.ADDSHOPID != "") {
      console.log("进入订餐页面", options.ENTER_ORDER_MEAL_TABLEID)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/order_meal/index?addShopId=' + options.ADDSHOPID, //you wenti
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      // 缓存
      try {
        wx.setStorageSync('tableID', options.ENTER_ORDER_MEAL_TABLEID)
      } catch (e) {
      }
      return;
    }

    if (options.APPLY_SERVER_CHANNEL_CODE && options.APPLY_SERVER_CHANNEL_CODE != "") {
      console.log("进服务商申请页面", options.APPLY_SERVER_CHANNEL_CODE)
      let url="";
      if(app.clientNo=="tunzai"){
        url ="/pageTab/tunzai/preApplyMendian/index"
      } else if (app.clientNo == "yunjishi"){
        url = "/pageTab/yunjishi/applyMendian/index?code=" + options.APPLY_SERVER_CHANNEL_CODE;
      }else{
        url = "/pageTab/yunjishi/applyMendian/index?code=" + options.APPLY_SERVER_CHANNEL_CODE;
      }
      //       applyMendian
      setTimeout(function () {
        wx.navigateTo({
          url: url+'?code=' + options.APPLY_SERVER_CHANNEL_CODE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)

      return;
    }
    if (options.APPLY_SERVANT_CODE && options.APPLY_SERVANT_CODE != "") {
      console.log("进服务人员申请页面", options.APPLY_SERVANT_CODE)
      //       applyMendian
      setTimeout(function () {
        wx.navigateTo({
          url: '/pageTab/yunjishi/applyServant/index?reqType=2&code=' + options.APPLY_SERVANT_CODE,
          success: function () {
            app.shareSubPage = true;
          }
        })
      }, 200)

      return;
    }
    //进入产品详情
    if (options.SHARE_PRODUCT_DETAIL_PAGE && options.SHARE_PRODUCT_DETAIL_PAGE != "") {

      console.log("options.SHARE_PRODUCT_DETAIL_PAGE", options.SHARE_PRODUCT_DETAIL_PAGE)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pagesTwo/productDetail/index?id=' + options.SHARE_PRODUCT_DETAIL_PAGE + "&addShopId=236",
          success: function () {
            app.shareSubPage = true;
          }
        })
      }, 200)
      return;
    }
    // 分享出来带分享SHARE_NEWS_DETAIL_PAGE跳到新闻详情页
    if (options.SHARE_NEWS_DETAIL_PAGE && options.SHARE_NEWS_DETAIL_PAGE != "") {
      console.log("进入新闻详情页面", options.SHARE_NEWS_DETAIL_PAGE)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/news_detail/index?id=' + options.SHARE_NEWS_DETAIL_PAGE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }
    // 分享出来带分享SHARE_FORM_DETAIL_PAGE跳到表单详情页
    if (options.SHARE_FORM_DETAIL_PAGE && options.SHARE_FORM_DETAIL_PAGE != "") {
      console.log("进入表单详情页面", options.SHARE_FORM_DETAIL_PAGE)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/form_detail/index?customFormId=' + options.SHARE_FORM_DETAIL_PAGE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }
    // 分享出来带分享SHARE_CHECK_FORM_DETAIL_PAGE跳到表单详情记录页
    if (options.SHARE_CHECK_FORM_DETAIL_PAGE && options.SHARE_CHECK_FORM_DETAIL_PAGE != "") {
      console.log("表单详情记录页", options.SHARE_CHECK_FORM_DETAIL_PAGE)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/check_form_detail/index?custom_form_commit_id=' + options.SHARE_CHECK_FORM_DETAIL_PAGE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }
    // 分享出来带分享SHARE_USER_INFO_PAGE跳到我的页面
    if (options.SHARE_USER_INFO_PAGE && options.SHARE_USER_INFO_PAGE != "") {
      console.log("进入首页", options.SHARE_USER_INFO_PAGE)
      that.Countdown();
      return;
    }
    // 卡券扫码核销
    if (options.VERIFICATION_CODE && options.VERIFICATION_CODE != "") {
      console.log("进入卡券扫码核销页面", options)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/verification_results/index?code=' + options.VERIFICATION_CODE + " &verifyScanType=" + options.verifyScanType + "&verifySign=" + options.sign,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }
    // 拼团邀请
    if (options.PINTUAN_CODE && options.PINTUAN_CODE != "") {
      console.log("拼团邀请", options)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/pintuan_invitation/index?pintuanRecordId=' + options.PINTUAN_CODE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }
    // 分享出来带分享SHARE_PROMOTION_PRODUCTS_PAGE跳到产品详情页
    if (options.SHARE_PROMOTION_PRODUCTS_PAGE && options.SHARE_PROMOTION_PRODUCTS_PAGE != "") {

      console.log("进入特卖页面", options.SHARE_PROMOTION_PRODUCTS_PAGE)
      setTimeout(function () {
        wx.navigateTo({
          url: '/pageTab/tunzai/teMai/index?promotionId=' + options.SHARE_PROMOTION_PRODUCTS_PAGE,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    }

    //如果传入的是 MendainID
    if (!!options.ENTER_MENDIAN && options.ENTER_MENDIAN != -1) {
      console.log("===================传入的门店====================id" + options.ENTER_MENDIAN)
      app.enterMenDianID = options.ENTER_MENDIAN;
      if(app.loginUser){//已登陆需要再次重新登陆
        app.wxLogin(app.more_scene);
      }
    }

    let ENTER_SHOP = options.ENTER_SHOP;
    if (!!ENTER_SHOP) {
      console.log("ENTER_SHOP" + ENTER_SHOP)

      setTimeout(function () {
        wx.reLaunch({
          url: '/pagesTwo/near_shop_page/index?addShopId=' + ENTER_SHOP,
          success: function () {
          }
        })

      }, 200)
      return;
    }

    //转发的数据都在这里，   这时候的scene已经被app.unlunch使用了。   
    ///我们这里只需要把参数解析一下？放全局，等跳到首页的时候再做跳转
    // console.log("这个传进来的参数", options.ENTER_MENDIAN_OFF_PAY)
    let ENTER_MENDIAN_OFF_PAY = options.ENTER_MENDIAN_OFF_PAY;
    if (!!ENTER_MENDIAN_OFF_PAY) {
      console.log("ENTER_MENDIAN_OFF_PAY" + ENTER_MENDIAN_OFF_PAY)

      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/new_pay_offline/index?id=' + ENTER_MENDIAN_OFF_PAY,
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
      return;
    } else if (app.setting && options.pageName && app.shareParam && app.shareParam.pageName) {
      setTimeout(function () {
        wx.navigateTo({
          url: '/pageTab/' + app.miniIndexPage + '/index',
          success: function () {
            app.shareSubPage = true;
          }
        })

      }, 200)
    } else {
      console.log('正常进入')
      that.Countdown(app);
    }
},
  onReady: function () {
  },

  onShow: function () {
    console.log("=========on show======", app.appHide, app.shareSubPage);
    if (app.appHide) {
      console.log("=======app.onLaunchOptions==========", app.onLaunchOptions)
     
      app.appHide = false
   //   app.onLaunch(app.onLaunchOptions)
     // this.onReady()
    }
    if(app.shareSubPage){
      console.log("========shareSubPage to index=====");
      app.shareSubPage = false;
      this.toIndex();
    }

  },
  count:8,
  Countdown:function(){
    let that = this
    --this.count;
    if (app.setting ) {
      console.log("测试有走到这里index页面111行")
      clearTimeout(timer11)
      that.toIndex()
      return false;
    }
    if (this.count < 1) {
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
