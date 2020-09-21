import { dellUrl } from "/public/requestUrl.js";
import { socketFun} from "/public/json2Form.js";
const Promise = require('/promise/promise.js');
App({
  // clientUrl: 'http://127.0.0.1:3000/chainalliance/',  // 本地链接地址
  clientUrl: 'https://mini.sansancloud.com/chainalliance/',//一定加https

  /**
   *   切换项目的开关 ↓↓↓↓↓
   */
  clientNo: 'chunzhixiang',   //自定义的项目的名称。,
  preCallbackObj: { key: { callback: '' } },
  clientName: '',
  version:'3.5.76',
  more_scene: '', //扫码进入场景   用来分销
  shareParam: null,//分享页面参数onload
  miniIndexPage: '',
  setting: { platformSetting: { defaultColor: "#fff", secondColor: "#fff" } },  // 全局设置
  loginUser: "", //登陆返回的个人信息
  cookie: null,
  shopOpen: null, // 店铺营业时间-开关
  mapProIconArray: {},
  cart_offline: {},
  properties:{},
  //addr:null,
  kefuCount: 0,
  socketTask:null,
  // notifyTipPage:false,
  // preNotifyTipPage: false,
  loginSuccessListeners: [],
  socketConnect: socketFun.socketConnect,
  socketLinkListener: {},
  carChangeNotifys:[],
  popupNotifysList:[],
  payItem: null, //下单的时候传过去的
  userSign: null, //账号密码
  EditAddr: null,//传值的
  richTextHtml: '',
  footerCount: 0,
  authorizationCount: 0,
  showAuthorizationPopup: false,
  productParam: null,//传值的
  //  customPageJson:null,//page的动态组件json
  header: {
    'content-type': 'application/json' // 默认值
  },
  headerPost: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  globalData: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  },
  successOnlaunch: false,
  showToastLoading:function(title,mask){
    console.log("=====showToastLoading=====", title, mask)
    if (this.clientNo!='naifen'){
      wx.showLoading({
        title: title,
        mask:mask
      })
    }
  },
  defaultMendianID: "",

  // 扫描二维码所带的参数，即扫码进来携带MendianID
  enterMenDianID: "",
  /* 页面影藏 */
  appHide: false,
  shareSubPage: true,
  onHide: function (e) {
    console.log('hide', this.shareSubPage)
    console.log(e)
  },
  addSocketLinkListener: function (listener) {
    let that=this;
    console.log('addSocketLinkListener', listener)
    that.socketLinkListener = Object.assign({}, that.socketLinkListener, listener);
    console.log("socketLinkListener", that.socketLinkListener)
  },
  addLoginListener: function (listener) {
    console.log('addLoginListener', listener)
    this.loginSuccessListeners.push(listener);
  },
  authorizationListenerItem: {},
  addAuthorizationListenerItem: function (listener) {
    let that=this;
    console.log("====addAuthorizationListenerItem====", listener)
    console.log('addLoginListener', listener)
    this.authorizationListenerItem = Object.assign({}, this.authorizationListenerItem, listener)
  },
  authorizationListener: function (state){
    console.log('====authorizationListener====', state)
    try {
      this.authorizationListenerItem.getStateData(state);
    } catch (e) {
      console.log(e);
    }
  },
  addCarChangeNotify:function(listener){
    this.carChangeNotifys.push(listener);
  },
  addPopupNotifysList: function (listener){
    this.popupNotifysList.push(listener);
  },
  clearPopupNotifysList: function (data){
    console.log('===clearPopupNotifysList====', data);
    if (this.popupNotifysList && this.popupNotifysList.length > 0) {
      for (let t = 0; t < this.popupNotifysList.length; t++) {
        try {
          this.popupNotifysList[t].clearInterval(data);
        } catch (e) {
          console.log(res);
        }
      }
    }
  },
  carChangeNotify:function(data){
    console.log('000000carChangeNotify000000', data);
    if (this.carChangeNotifys && this.carChangeNotifys.length > 0) {
      console.log('000000000000', this.carChangeNotifys)
      for (let t = 0; t < this.carChangeNotifys.length; t++) {
        try {
          this.carChangeNotifys[t].carChangeNotify(data);
        } catch (e) {
          console.log(res);
        }
      }
    }
  },
  onShow: function (e) {
    let that = this
    console.log('======app.show=====', that.globalData)
    console.log("=======eeeee======", e)
    if (e.scene == "1011" || e.scene == "1012" || e.scene == "1013" || e.scene == "1047") {
      this.appHide = true
      console.log("=====1011====");
      if (e.query.platformNo) {
        console.log("HAHAHAHHAA" + e.query.platformNo)
      }
    }
    console.log("=====on show===" + this.clientNo);
    /* let pagePath = e.path
    if(this.appHide){
      this.appHide = false
    } */
  },
  onLaunchOptions: {},
  /* 第一次加载 */
  onLaunch: function (options) {
    console.log('------options------', options)
    this.onLaunchOptions = options
    let that = this
    console.log('------onlauch------' + this.clientNo)
    // 扫码登录  判断将使用哪些数据
    // this.getSdkVersion()获取 个人信息例如name，nickname，password，platformNo，手机号等等 在900行
    this.getSdkVersion()
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    if (extConfig.clientNo) {
      console.log('extConfig')
      that.clientNo = extConfig.clientNo
    }
    console.log('===' + this.clientNo + '====')
    console.log("options111", this.onLaunchOptions)
    let inputPlatformNo = this.onLaunchOptions.query.platformNo;
    if (!!inputPlatformNo) { this.clientNo = inputPlatformNo }
    let more_scene = decodeURIComponent(this.onLaunchOptions.scene)
    if (more_scene) { this.more_scene = more_scene }
    console.log("clinetNo:" + this.clientNo + "  more_scene:" + more_scene)
    that.loadFirstEnter(more_scene)

  },
  timer: 0,
  // 确保onLaunch事件完成后再开始调用其他函数
  promiseonLaunch: function (self) {
    let that = this
    console.log('promiseonLaunch')
    if (!!this.setting) {
      self.onLoad()
    }
    else {
      that.timer = setTimeout(function () {
        that.promiseonLaunch(self);
      }, 500);
    }

   
  },
  navigateBack: function (time) {
    setTimeout(function () { wx.navigateBack() }, time);
  },
  //第一次登录加载的函数
  loadFirstEnter: function (more_scene) {
    console.log('第一次登录加载的函数');
    let that=this;
    // this.linkEvent("https://mini.sansancloud.com/chainalliance/sansancloud/bindWxGz.html?platformUserId=71076")
    // setTimeout(function () {
    //   that.wxLogin(more_scene)
    // },6000)
    that.wxLogin(more_scene)
    that.getSetting()
  },
  loadScene: function (inputPlatformNo) {
    this.clientNo = inputPlatformNo
  },
  globalData: {
    userInfo: null,
    sansanUser: null,
    sysWidth: wx.getSystemInfoSync().windowWidth, //图片宽度
    sysHeight: wx.getSystemInfoSync().windowHeight,
  },
  createOrder: function (baseProData, pintuanData, customFromCommitId, callback, failed) {
    console.log('=====app.createOrder=====');
    let params = Object.assign({}, params, baseProData, pintuanData, {})
    if (customFromCommitId) {
      params = Object.assign({}, params, { customFromCommitId: customFromCommitId })
    }
    let that = this
    let customIndex = that.AddClientUrl("/buy_now.html", params, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: that.headerPost,
      method: 'POST',
      success: function (res) {
        console.log("点击确定后内容", res.data)
        wx.hideLoading()
        if (res.data.errcode != -1 || !res.data.errcode) {
          console.log("====成功===")
          if (callback) {
            callback(res);
            return;
          }
          if (res.data.payStatus == 0) {
            wx.navigateTo({
              url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
            })
          } else if (res.data.payStatus == 1 && res.data.processInstanceCount > 0) {//进入流程列表
            let processId = 0
            that.linkEvent("process_list.html");
            // wx.navigateTo({
            //   url: '/pages/process_list/index?processId=' + processId,
            // })
          } else if (res.data.payStatus == 1 && res.data.processInstanceCount == 0) {
            wx.redirectTo({
              url: '/pages/order_list_tab/index',
            })
          }
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        // wx.hideLoading()
        // app.loadFail()
      },
      complete: function (res) {

      }
    })
  },
  toIndex: function () {
    console.log('首页叫做：' + this.miniIndexPage)
    let that=this;
    console.log('首页叫做：' + this.clientNo)
    //这个需要注意  switchTab  和  redirectTo
    if (this.clientNo == 'tunzai') {
      console.log("1111111111111")
      wx.switchTab({
        url: '/pageTab/tunzai/index/index',
      })
      return;
    }
    else if (this.miniIndexPage) {
      console.log("2222222222222")
      wx.switchTab({
        url: '/pageTab/' + this.miniIndexPage + '/index',
        fail:function(){
          that.linkEvent(that.miniIndexPage + '.html')
        }
      })
    } else {
      console.log("33333333333333")
      wx.switchTab({
        url: '/pageTab/custom_page_index/index',
      })
    }


  },
  // 一键回到顶部
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  toMy: function () {
    console.log('我的叫做：' + this.clientNo)
    //这个需要注意  switchTab  和  redirectTo
    if (this.clientNo == 'tunzai') {
      console.log("1111111111111")
      wx.switchTab({
        url: '/pageTab/tunzai/myInfo/index',
      })
      return;
    } else {
      console.log("222222")
      wx.switchTab({
        url: '/pageTab/aikucun_userinfo/index',
      })
    }


  },
  echoErr: function (errMessage) {
    wx.showToast({
      title: errMessage,
      image: '/images/icons/tip.png',
      duration: 2000
    })
  },
  //加载失败处理
  loadFail: function () {
    let that = this
    /*
    wx.showModal({
      title: '提示',
      content: '加载失败，重新加载',
      success: function (res) {

        if (res.confirm) {
          that.toIndex()
        } else if (res.cancel) {

        }
      }
    })*/
    wx.showToast({
      title: "加载失败",
      image: '/images/icons/tip.png',
      duration: 2000
    })
  },
  loadLogin: function (e) {
    wx.showModal({
      title: '提示',
      content: '用户未登录',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login_wx/index'
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  //检查是否已经登录
  checkIfLogin: function () {

    if (this.loginUser) {
      console.log('已经登录了')
      return true
    } else {
      console.log('未登录')

      wx.showModal({
        title: '提示',
        content: '用户未登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login_wx/index'
            })
          } else if (res.cancel) {

          }
        }
      })
      return false
    }

  },
  //检查商家开店？
  checkShopOpenTime: function () {
    let that = this
    let shopBean = this.setting.platformSetting.defaultShopBean
    let nowTime = {
      hour: '',
      minutes: ''
    }
    let myDate = new Date();
    nowTime.hour = myDate.getHours()
    nowTime.minutes = myDate.getMinutes()
    let myTime = ''
    if (nowTime.minutes < 10) {
      myTime = Number(nowTime.hour + '.0' + nowTime.minutes)
    } else {
      myTime = Number(nowTime.hour + '.' + nowTime.minutes)
    }
    if (myTime < Number(shopBean.serviceStartTime) || myTime > Number(shopBean.serviceEndTime)) {
      wx.showModal({
        title: '不是营业时间',
        content: '营业时间为' + shopBean.serviceStartTime + '-' + shopBean.serviceEndTime,
        success: function (res) {
          if (res.confirm) {
            that.toIndex()
          } else if (res.cancel) {

          }
        }
      })
      return false
    } else {
      return true
    }
  },
  /* 处理url的函数，放到app里吧 */
  AddClientUrl: function (url, params, method, random, noToken) {
    let loginToken = ''

    if (noToken || (!this.loginUser || !this.loginUser.platformUser || !this.loginUser.platformUser.loginToken)) {
      loginToken = ''
    } else {
      loginToken = this.loginUser.platformUser.loginToken
    }
    if (url.indexOf("get_product_comment_list") != -1 || url.indexOf("product_detail") != -1 || url.indexOf("get_platform_setting.html") != -1 || url.indexOf("more_product_list.html") != -1 || url.indexOf("index.html") != -1 || url.indexOf("get_promotions_detail.html") != -1 || url.indexOf("/super_shop_manager_get_mini_code.html") != -1) {
      loginToken = "";
      random = "tunzai";
    }
    var returnUrl = dellUrl(url, params, method, random, loginToken)
    if ((returnUrl.url).indexOf("socket")!=-1){
      if ((this.clientUrl).indexOf("https") != -1) {
        returnUrl.url = this.clientUrl.replace("https","wss") + this.clientNo + returnUrl.url
      }else{
        returnUrl.url = this.clientUrl.replace("http", "ws") + this.clientNo + returnUrl.url
      }
    }else{
      returnUrl.url = this.clientUrl + this.clientNo + returnUrl.url
    }
    console.log("returnUrl", returnUrl);
    return returnUrl;
  },
  /* 解析LinkUrl */
  getUrlParams: function (url) {
    console.log('------getUrlParams--------')
    console.log(url)

    let theResult = {
      url: '',
      param: ''
    }
    if (url.indexOf('?') != -1) {
      let str2 = url.substr(0, url.indexOf('?') - 5);
      let str3 = url.substr(url.indexOf('?'));
      theResult.url = str2
      theResult.param = str3
    }
    if (url.indexOf('?') == -1) {
      let str2 = url.substr(0, url.indexOf('.'))
      let str3 = ''
      theResult.url = str2
      theResult.param = str3
    }
    console.log("======theResult======", theResult)
    return theResult
  },
  getSpaceStr: function (str, p) {
    let theResult = {
      str1: '',
      str2: ''
    }
    if (str.indexOf(p) != -1) {
      let str2 = str.substr(0, str.indexOf(p));
      let str3 = str.substr(str.indexOf(p) + 1);
      theResult.str1 = str2
      theResult.str2 = str3
    }
    return theResult
  },
  /* 转换成str 带？*/
  jsonToStr: function (json) {
    var returnParam = "?"
    var str = [];
    for (var p in json) {
      str.push(p + "=" + json[p]);
      //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    returnParam += str.join("&")
    console.log(returnParam)
    return returnParam
  },
  // 不带问号 过滤loginTocken
  jsonToStr2: function (json) {
    var returnParam = ""
    var str = [];
    for (var p in json) {
      if (p != 'loginToken') {
        str.push(p + "=" + json[p]);
      }
    }
    returnParam += str.join("&")
    console.log("returnParam", returnParam)
    return returnParam
  },


  //link事件   绑定导向对应的控件上
  lookBigImage: function (e) {
    let imgSrc = e.currentTarget.dataset.imageurl
    console.log(imgSrc)
    let PostImageSrc = imgSrc.replace(/http/, "https")
    // let PostImageSrc = imgSrc
    console.log(PostImageSrc)
    if (!imgSrc) {
      return
    }
    let urls = []
    urls.push(imgSrc)
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  goto: function (linkUrl){
    let that=this;
    that.shareSubPage = false;
    console.log('====linkUrl======', linkUrl)
    if (!linkUrl) {
      return
    }
    let urlData = this.getUrlParams(linkUrl)
    console.log("===========urlData============", urlData)
    wx.navigateTo({
      url: "/pageTab/" + urlData.url + "/index" + urlData.param,
      fail: function () {
        //pages里不存在该页面
        console.log("pageTab里不存在该页面,跳转pages目录下的页面")
        wx.navigateTo({
          url: "/pages/" + urlData.url + "/index" + urlData.param,
          success: function () {
            that.shareSubPage = true;
          },
          fail: function () {
            console.log("pages里不存在该页面,跳转pagesTwo目录下的页面")
            wx.navigateTo({
              url: "/pagesTwo/" + urlData.url + "/index" + urlData.param,
              success: function () {
                that.shareSubPage = true;
              },
              fail: function () {
                console.log("跳转tab页")
                wx.switchTab({
                  url: "/pageTab/" + urlData.url + "/index" + urlData.param,
                  success: function () {
                    that.shareSubPage = true;
                  },
                  fail: function () {
                    console.log("跳转tunzai定制页")
                    wx.navigateTo({
                      url: "/pageTab/tunzai/" + urlData.url + "/index" + urlData.param,
                      success: function () {
                        that.shareSubPage = true;
                      },
                      fail: function () {
                        console.log("没有定义" + urlData.url + "页面")
                        that.toIndex()
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  //扫一扫 核销
  getVerificationCode: function (e) {
    console.log("getVerificationCode", e)
    wx.scanCode({
      onlyFromCamera: true,
      success: (scanRes) => {
        console.log("getVerificationCode", scanRes)
        wx.navigateTo({
          url: "/" + scanRes.path
        })
      }
    })
  },
  linkEvent: function (linkUrl) {
    let that=this;
    console.log('====linkUrl======', linkUrl)
    if (!linkUrl) {
      return
    }
    that.footerCount=0;
    let urlData = that.getUrlParams(linkUrl)
    let If_Order_url = urlData.url.substr(0, 10)
    console.log('-----toGridLinkUrl---------')
    console.log('==urlData===', urlData)
    console.log('==jpg===', linkUrl.substr(-3, 3))
    console.log(If_Order_url, that.showAuthorizationPopup)
    wx.getSetting({//检查用户是否授权了
      success(res) {
        console.warn("======检查用户是否授权了========", res)
        if (!res.authSetting['scope.userInfo']) {
          console.log('=====没授权====')
          that.showAuthorizationPopup = true
          that.authorizationListener(that.showAuthorizationPopup)
          return 'authorization'
        } else {
          console.log('=====已授权====')
          if (linkUrl.substr(0, 3) == 'tel') {
            wx.makePhoneCall({
              phoneNumber: linkUrl.substr(4) //仅为示例，并非真实的电话号码
            })
          } else if (linkUrl.substr(0, 4) == 'http' && (linkUrl.substr(-3, 3).toLowerCase() == 'jpg' || linkUrl.substr(-3, 3).toLowerCase() == 'png')) {
            that.lookBigImage(linkUrl)
          } else if (linkUrl.substr(0, 12) == 'custom_page_') {
            var resultUrl = linkUrl.substring(12, linkUrl.length - 5)
            if (urlData.param == '') {
              urlData.param = '?'
            }
            wx.navigateTo({
              url: '/pages/custom_page/index' + urlData.param + '&Cpage=' + resultUrl,
            })
          }
          else if (If_Order_url == 'order_list') {

            wx.navigateTo({
              url: '/pages/' + 'order_list_tab' + '/index' + urlData.param,
            })
          }
          else if (linkUrl.substr(0, 14) == 'search_product') {
            console.log("that.clientNo", that.clientNo)
            that.goto((that.properties.style_product_list || "milk_product_list") + ".html" + urlData.param);
            return;
          }
          else if (linkUrl.substr(0, 18) == 'promotion_products') {
            wx.navigateTo({
              url: '/pageTab/tunzai/teMai/index' + urlData.param,
            })
          }
          else if (linkUrl.substr(0, 23) == 'milk_shopping_car_pages') {
            wx.navigateTo({
              url: '/pagesTwo/milk_shopping_car_list/index' + urlData.param,
            })
          }
          else if (linkUrl.substr(0, 9) == 'goto_mini') {
            let appId = linkUrl.substr(21)
            console.log("========appId======", appId)
            wx.navigateToMiniProgram({
              appId: appId,
              path: '',
              extraData: {
              },
              envVersion: 'release',
              success(res) {
                console.log("小程序跳转成功", res)
              }
            })
          }
          else if (linkUrl.substr(0, 13) == 'order_pintuan') {

            wx.navigateTo({
              url: '/pages/' + 'order_pintuan_list' + '/index' + urlData.param,
            })
          }
          else if (linkUrl.substr(0, 5) == 'https') {
            let url = encodeURIComponent(linkUrl);
            console.log("==url+web_view===", url)
            wx.navigateTo({
              url: '/pages/' + 'web_view' + '/index?url=' + url,
            })
          }
          else if (linkUrl.indexOf('_sysScanQrcode') != -1) {
            that.getVerificationCode()
          }
          else if (linkUrl.substr(0, 14) == 'product_detail') {
            let productId = linkUrl.replace(/[^0-9]/ig, "");
            console.log(linkUrl.substr(15, 6))
            // 
            that.goto((that.properties.style_product_detail|| "productDetail") + ".html" + urlData.param + "&addShopId=0");
            return;
          }
          else if (urlData.url == 'shop_map') {
            that.openLocation()
          } else if (urlData.url == 'location') {
            console.log(urlData.param + urlData.url)
            var params = urlData.param.slice(1);
            let paramArr = params.split('&')
            var paramObj = {}
            for (let i = 0; i < paramArr.length; i++) {
              var a = paramArr[i].split('=')
              paramObj[a[0]] = a[1]
            }
            var a = Number(paramObj['latitude']); var b = Number(paramObj['longitude']);
            wx.openLocation({
              latitude: a,
              longitude: b,
              scale: 12,
              name: paramObj.title,
              address: paramObj.description
            })
          } else {
            that.goto(linkUrl)
          }
        }
      }
    });
  },
  checkLogin: function () {
    //let that = this
    if (!this.loginUser) {
      this.wxLogin()
    }
  },
  /* 检查是否过期 */
  checkSession: function () {
    let that = this
    wx.checkSession({
      success: function () {

        console.log('session 未过期，并且在本生命周期一直有效')
        wx.getStorage({
          //拿cookie
          key: 'cookie',
          success: function (res) {
            that.cookie = res.data
            that.header = {
              'content-type': 'application/json', // 默认值
              'Cookie': res.data
            }
            that.headerPost = {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': res.data
            }
          }
        })
        wx.getStorage({
          key: 'loginUser',
          success: function (res) {
            that.loginUser = res.data
          }
        })
      },
      fail: function () {
        //登录态过期
        console.log('登录态过期')

        that.wxLogin()
      }
    })
  },
  /* 设置cookie */
  setCookie: function (cookie) {
    this.cookie = cookie
    this.header = {
      'content-type': 'application/json', // 默认值
      'Cookie': cookie
    }
    this.headerPost = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': cookie
    }
  },
  //存用户信息
  setloginUser: function (loginUser, cookie) {
    console.log('--------setloginUser----------')
    if (loginUser) {
      wx.setStorage({
        key: "loginUser",
        data: loginUser
      })
    }
    if (cookie) {
      wx.setStorage({
        key: "cookie",
        data: cookie
      })
    }


  },


  //获取已经登录了的用户信息和login时一样
  get_session_userinfo: function () {
    let customIndex = this.AddClientUrl("/get_session_userinfo.html", {}, 'post')
    let that = this
    wx.request({
      url: customIndex.url, //仅为示例，并非真实的接口地址
      data: customIndex.params,
      header: that.headerPost,
      success: function (res) {
        console.log('===========get_session_userinfo============', res)
        if (res.data.errcode == 0) {
          console.log(res.data.relateObj)
          that.loginUser = res.data.relateObj
          that.setloginUser(res.data.relateObj)
        }

      },
      fail: function (res) {

      }
    })
  },

  //sentWxUserInfo 第一次登录给他设置头像
  sentWxUserInfo: function (loginJson) {
    console.warn("========sentWxUserInfo:loginJson=======", loginJson)
    let that = this
    let userInfo = this.globalData.userInfo
    wx.getUserInfo({
      success: function (res) {
        console.log('--获取用户信息--')
        console.log(res.userInfo)
        userInfo = res.userInfo
        let infoParam = {
          headimg: '',
          nickname: '',
          sex: ''
        }
        if (loginJson && loginJson.platformUser.telNo) {
          console.error(loginJson.platformUser.telNo)
          infoParam.telno = loginJson.platformUser.telNo
        } else {
          infoParam.telno = ''
        }

        infoParam.headimg = userInfo.avatarUrl
        infoParam.nickname = userInfo.nickName
        infoParam.sex = userInfo.gender
        // 用户所在城市，市，区，
        infoParam.city = userInfo.city
        if (that.loginUser.nickName != userInfo.nickName) {
          let customIndex = that.AddClientUrl("/change_user_info.html", infoParam, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: that.headerPost,
            method: 'POST',
            success: function (res) {
              console.log('---change_user_info----- success-')
              console.log(res.data)
              if (res.data.errcode == 0) {
                that.loginUser.nickName = userInfo.nickName;
                that.loginUser.sex = userInfo.sex;
                that.loginUser.userIcon = userInfo.avatarUrl;
                console.log('-----第一次登录   传头像成功 --------')
              } else {
                console.log('-----第一次登录   传头像失败 --------')

              }
              that.get_session_userinfo()
            },
            fail: function (res) {
              console.log('-----第一次登录   传头像失败 回调fail--------')
              console.log()
            },
            complete: function (res) {

            },
          })
        }
      },
      fail: function (e) {
        console.log(e)
        setTimeout(function () {
          wx.showModal({
            title: '授权提示',
            content: '取消用户授权可能导致部分功能不可用，请确认授权！',
            cancelText: '拒绝',
            confirmText: '去授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    res.authSetting = {
                      "scope.userInfo": true,
                    }
                    that.sentWxUserInfo(loginJson)
                  }
                })
              } else if (res.cancel) {

              }
            }
          })
        }, 500);

      }
    })





  },
  getCaption: function (str1) {
    var str2 = (str1.match(/MINI_PLATFORM_USER_ID_(\S*)/))[1];
    console.log("这是测试str2" + str2)
    return str2;
  },
  hasNoScope: false,
  showAuthUserInfoButton: true,
  changeUserBelong: function (more_scene) {
    if (!more_scene) return;
    let changeMendianOnly = 0;
    if (!this.loginUser || !this.loginUser.platformUser || this.loginUser.platformUser.parentId > 0) {
      //  console.log("parent id:"+this.loginUser.platformUser.parentId);
      console.log("未登录或 已经有推广用户了");
      if (this.setting.platformSetting && this.setting.platformSetting.scanChangeBelongMendian) {
        changeMendianOnly = 1;
      } else {
        return;
      }

    } else {
      console.log("修改用户推广人");
    }
    let that = this
    console.error("hello:" + more_scene)
    console.log("测试有没有调用")

    let parentPlatformUserId = this.getCaption(more_scene)
    console.error(parentPlatformUserId)
    if (!parentPlatformUserId) {
      return;
    }
    let param_post = {}
    param_post.parentPlatformUserId = parentPlatformUserId
    param_post.changeMendianOnly = changeMendianOnly;
    var customIndex = that.AddClientUrl("/change_fx_user.html", param_post, 'post')

    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: that.headerPost,
      method: 'POST',
      success: function (res) {
        console.warn('修改分销 -- 返回')
        console.log(res.data)
        if (res.data.errcode == 0) {
          let loginUser = that.loginUser
          loginUser.platformUser.mendian = res.data.relateObj.mendian
        }
      },
      fail: function (res) {
        that.loadFail()
      }
    })
  },
  /* 微信登录测试 */
  wxLogin: function (more_scene) {
    console.warn("===wxLogin===", more_scene)
    if (!more_scene || more_scene == 'undefined') {
      more_scene = '0'
    }
    console.log('--------------微信登录--------------')
    this.showToastLoading('登录中', true)
    // wx.showLoading({
    //   title: '登录中',
    //   mask: true
    // })
    var that = this
    console.log('===1===')
    wx.login({//微信登入接口
      success: function (res) {
        console.log("=======wxCode======", res.code, more_scene)
        if (res.code && res.code.indexOf('mock') == -1) {
          //发起网络请求
          let loginParam = {}
          loginParam.code = res.code
          loginParam.scene = more_scene
          setTimeout(function () {
            let customIndex = that.AddClientUrl("/wx_mini_code_login.html", loginParam, 'post')
            wx.request({
              url: customIndex.url,
              data: customIndex.params,
              header: that.headerPost,
              method: 'POST',
              success: function (e) {
                if (e.data.errcode == 0) {
                  console.log("===========wx.login=============", e)
                  let header = e.header
                  let cookie = null
                  if (!!header['Set-Cookie']) {
                    cookie = header['Set-Cookie']
                  }
                  if (!!header['set-cookie']) {
                    cookie = header['set-cookie']
                  }
                  let loginJson = e.data.relateObj
                  that.setCookie(cookie)
                  console.log('登陆成功')
                  if (loginJson.platformUser.scanChangeBelongMendian == 1 && that.enterMenDianID != 0 && loginJson.platformUser.belongMendian != that.enterMenDianID && !loginJson.platformUser.managerMendianId) {
                    console.warn("变更归属门店")
                    let customIndex = that.AddClientUrl("/wx_change_belong_mendian.html", { scanMendianId: that.enterMenDianID })
                    wx.request({
                      url: customIndex.url,
                      header: that.header,
                      success: function (res) {
                        console.log('change_belong_mendian', res)
                        loginJson.platformUser = res.data.relateObj
                        that.setloginUser(loginJson, cookie)
                        that.loginUser = loginJson
                        that.globalData.sansanUser = that.loginUser
                        if (that.loginSuccessListeners && that.loginSuccessListeners.length > 0) {
                          console.log('000000000000', that.loginSuccessListeners)
                          for (let t = 0; t < that.loginSuccessListeners.length; t++) {
                            try {
                              that.loginSuccessListeners[t].loginSuccess(that.globalData);
                            } catch (e) {
                              console.log(res);
                            }
                          }
                        }
                      },
                      fail: function (res) {
                        console.warn("change_belong_mendian_fail")
                      }
                    })
                  } else {
                    console.warn("不变更归属门店")
                    that.setloginUser(e.data.relateObj, cookie)
                    that.loginUser = e.data.relateObj
                    that.globalData.sansanUser = e.data.relateObj
                    if (that.loginSuccessListeners && that.loginSuccessListeners.length > 0) {
                      console.log('000000000000', that.loginSuccessListeners)
                      for (let t = 0; t < that.loginSuccessListeners.length; t++) {
                        try {
                          that.loginSuccessListeners[t].loginSuccess(e.data.relateObj);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                  }
                  wx.hideLoading()
                  wx.getSetting({//检查用户是否授权了
                    success(res) {
                      console.warn("======getSetting:res========", res)
                      if (!res.authSetting['scope.userInfo']) {
                        console.error('没有授权')
                        that.hasNoScope = res.authSetting['scope.userInfo']
                        that.showAuthUserInfoButton = true;
                      } else {
                        that.showAuthUserInfoButton = false;
                        //that.sentWxUserInfo(loginJson)
                      }
                    }
                  })
                  //that.get_session_userinfo()
                  console.warn('========socketConnect========')
                  socketFun.socketConnect()
                  if (!loginJson.platformUser.nickname) {
                    // console.error('没有昵称调用上传接口')
                    //that.sentWxUserInfo(loginJson)
                  }
                  console.log(loginJson.platformUser.mendian)
                  console.log('===more_scene===', more_scene)
                  //      if (!loginJson.platformUser.mendian && more_scene.indexOf("PLATFORM_USER_ID") > 0) {
                  //console.error('more_scene',more_scene)
                  that.changeUserBelong(that.USER_DEFINED_SCENE)
                  // }
                  // that.toIndex()
                } else {
                  console.log("失败原因" + JSON.stringify(e.data))
                  wx.hideLoading()
                  wx.showToast({
                    title: '登录失败',
                    image: '/images/icons/tip.png',
                    duration: 2000
                  })


                  if (that.loginSuccessListeners && that.loginSuccessListeners.length > 0) {
                    console.log('000000000000', that.loginSuccessListeners)
                    for (let t = 0; t < that.loginSuccessListeners.length; t++) {
                      try {
                        that.loginSuccessListeners[t].loginFailed(e.data);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }
                }
              },
              fail: function (e) {
                console.log('----fail------')
                console.log(e)

                wx.showToast({
                  title: '登录失败',
                  image: '/images/icons/tip.png',
                  duration: 2000
                })

                if (that.loginSuccessListeners && that.loginSuccessListeners.length > 0) {
                  console.log('000000000000', that.loginSuccessListeners)
                  for (let t = 0; t < that.loginSuccessListeners.length; t++) {
                    try {
                      that.loginSuccessListeners[t].loginFailed(e);
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              }
            })
          }, 0)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log('---------111111  fail----------')
        console.log(res)
      },
      complete: function (res) {
        console.log('---------111111  complete----------')
        console.log(res)
        wx.hideLoading()
      },
    });
  },
  //获取setting
  getSetting: function (self) {
    if (!self) {
      self = 0
    }
    console.log('**************************************', self)
    var settUrl = this.AddClientUrl("/get_platform_setting.html", {}, 'get', 1, 1)
    var that = this
    console.log("======settUrl.url======", settUrl.url)
    //拿setting
    return new Promise(function (resolve, reject) {
      wx.request({
        url: settUrl.url, //仅为示例，并非真实的接口地址
        header: that.header,
        success: function (res) {
          resolve(res);
          console.log("====Promise-resSetting====", res.data)
          //获取门店ID
          console.log("====门店ID====", res.data.platformSetting.defaultShopBean.defaultMendianId);
          that.defaultMendianID = res.data.platformSetting.defaultShopBean.defaultMendianId;

          if (res.data.platformSetting) {
            that.clientName = res.data.platformSetting.platformName
            that.properties = res.data.platformSetting.properties
            if (res.data.platformSetting.categories) {//产品类别
              let categories = res.data.platformSetting.categories
              let allType = {}
              allType.id = 'all'
              allType.name = '全部'
              allType.active = true
              for (let i = 0; i < categories.length; i++) {
                categories[i].active = false
              }
              categories.unshift(allType)
            }
          }

          that.setting = res.data

          if (res.data.platformSetting.miniIndexPage) {
            let miniIndexPage = that.getSpaceStr(res.data.platformSetting.miniIndexPage, '.')

            that.miniIndexPage = miniIndexPage.str1
          } else {

            that.miniIndexPage = 'custom_page_index'
          }



          if (!self) {

          } else {
            self.setData({ setting: res.data })
            self.setNavBar()
          }
          wx.hideLoading()//隐藏 loading 提示框
          return
          let ShopBean = res.data.platformSetting.defaultShopBean
          if (ShopBean.serviceStartTime) {

          }

          // 完成初次加载
          that.successOnlaunch = true

        },
        fail: function (res) {
          reject('error');
          wx.hideLoading()//隐藏 loading 提示框
          that.loadFail()//获取失败
        }
      })
    })
  },
  //微信内部地图
  openLocation: function () {
    console.log('---------打开地图-------')
    let markers = this.setting.platformSetting.defaultShopBean
    let lat = Number(markers.latitude)
    let lng = Number(markers.longitude)
    let name = markers.shopName
    let address = ''
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('11111')
        wx.openLocation({
          latitude: Number(markers.latitude),
          longitude: Number(markers.longitude),
          scale: 28,
          name: name,
          address: address,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }, fail: function (res) {
        console.log('22222')
        console.log(res)
      }
    })
  },
  // 拼团转发
  sharePintuan: function (pageName, pageTitle, pageCode) {
    console.log('pageCode', pageName, pageTitle, pageCode)
    let that = this
    let AllCode = ''
    if (!pageCode) {
      pageCode = ''
    }
    AllCode = pageCode
    console.log('AllCode', AllCode)
    return {
      title: pageTitle,
      path: '/pages/' + pageName + '/index?' + AllCode,
      success: function (res) {
        console.log('转发出去的参数集合：   ' + AllCode)
      },
      fail: function (res) {
      }
    }
  },
  //带参转发
  shareForFx: function (pageName, pageTitle, pageCode) {
    let that = this
    let AllCode = ''
    let fxCode = ''  //userId
    if (this.loginUser) {
      fxCode = 'scene=MINI_PLATFORM_USER_ID_' + this.loginUser.platformUser.id
    } else {
      fxCode = 'scene=MINI_PLATFORM_USER_ID_' + this.more_scene
    }
    if (!pageName) {
      pageName = 'index'
    }
    if (!pageTitle) {
      pageTitle = that.clientName
    }
    if (!pageCode) {
      pageCode = ''
      AllCode = fxCode
    } else {
      AllCode = fxCode + '&' + pageCode
    }
    console.log('AllCode', AllCode)
    return {
      title: pageTitle,
      path: '/pages/' + pageName + '/index?' + AllCode,
      success: function (res) {
        console.log('转发出去的参数集合：   ' + AllCode)
      },
      fail: function (res) {
      }
    }
  },
  // 获取二维码
  getQrCode: function (data) {
    console.log(" this.loginUser", this.loginUser)
    let userId = "";
    let mendianId = "";
    if (this.loginUser && this.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + this.loginUser.platformUser.id
      if (this.loginUser.platformUser.managerMendianId) {
        mendianId = '%26ENTER_MENDIAN%3d' + this.loginUser.platformUser.managerMendianId
      }
    }
    console.log("this.loginUser.platformUser", this.loginUser.platformUser.id)
    console.log("data", data)
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    let str = '';
    let str2 = '';
    if (data.type == 'active') {
      str = 'SHARE_PROMOTION_PRODUCTS_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_PROMOTION_PRODUCTS_PAGE%3d'
      postParam[str] = data.id;
    } else if (data.type == 'news_detail') {
      console.log(data.type)
      str = 'SHARE_NEWS_DETAIL_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_NEWS_DETAIL_PAGE%3d'
      postParam[str] = data.id;
    } else if (data.type == 'form_detail') {
      console.log(data.type)
      str = 'SHARE_FORM_DETAIL_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_FORM_DETAIL_PAGE%3d'
      postParam[str] = data.id;
    } else if (data.type == 'check_form_detail') {
      console.log(data.type)
      str = 'SHARE_CHECK_FORM_DETAIL_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_CHECK_FORM_DETAIL_PAGE%3d'
      postParam[str] = data.id;
    } else if (data.type == 'user_info') {
      console.log(data.type)
      str = 'SHARE_USER_INFO_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_USER_INFO_PAGE%3d'
      postParam[str] = data.id;
    } else if (data.type == 'pin_tuan') {
      console.log(data.type)
      str = 'PINTUAN_CODE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fPINTUAN_CODE%3d'
      postParam[str] = data.id;
    } else {
      str = 'SHARE_PRODUCT_DETAIL_PAGE'
      str2 = '/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d'
      postParam[str] = data.id;
    }
    postParam.scene = userId
    console.log(str, str2, postParam)
    // 上面是需要的参数下面的url
    var customIndex = this.AddClientUrl(str2 + postParam[str] + "%26hyaline%3d" +1+ "%26scene%3d" + userId + mendianId, postParam, 'get', '1')
    var result = customIndex.url.split("?");

    customIndex.url = result[0] + "?" + result[1]

    console.log("customIndex", customIndex.url, result[0])

    var that = this
    return customIndex.url


  },
  shareForFx2: function (pageName, pageTitle, pageCode, imageUrl, aliasName) {
    //组合参数，交给custompage_index 解析
    // 组合参数所带
    console.log("000000000000", pageName)
    console.log("111111111111", pageTitle)

    console.log("333333333333", pageCode)
    let that = this
    let AllCode = ''
    let fxCode = ''  //userId
    if (this.loginUser && this.loginUser.platformUser) {
      fxCode = 'scene=MINI_PLATFORM_USER_ID_' + this.loginUser.platformUser.id
    }
    if (!pageName && !this.miniIndexPage) {
      if (!this.miniIndexPage) {
        pageName = 'custom_page_index'
      } else {
        pageName = this.miniIndexPage
      }
    }
    if (!pageTitle) {
      pageTitle = that.clientName
    }
    if (!pageCode) {
      pageCode = {}
    }
    // title存在的时候显示活动名
    if (pageCode.title && pageCode.title != "") {
      pageTitle = that.clientName + "-" + pageCode.title
    }
    if (pageCode.shopName) {
      console.log("=========shopName=====", pageCode.shopName);
      pageTitle = pageCode.shopName
    }
    if (this.loginUser && this.loginUser.platformUser) {
      pageCode.scene = 'MINI_PLATFORM_USER_ID_' + this.loginUser.platformUser.id;
    }

    else {
      pageCode.scene = 'MINI_PLATFORM_USER_ID_' + 0;
    }

    //   如果带有id的产品传参则进入产品详情页
    if (pageCode.id && pageCode.id != "" && pageName == "productDetail") {
      pageCode.SHARE_PRODUCT_DETAIL_PAGE = pageCode.id
    } else if (pageCode.id && pageCode.id != "" && pageName == "news_detail") {
      pageCode.SHARE_NEWS_DETAIL_PAGE = pageCode.id
    } else {
      pageCode.SHARE_COMMON_PAGE = pageCode[aliasName]
      pageCode.linkUrl = pageName
    }
    if (pageCode.belongShop && pageCode.belongShop != "") {
      pageCode.ENTER_SHOP = pageCode.belongShop
    }

    // jsonToStr2在333行
    AllCode = that.jsonToStr2(pageCode)

    console.log('转发出去的参数集合：   ' + AllCode)
    console.log('转发出去的imageUrl：   ' + imageUrl)
    console.log('转发出去的pageTitle：   ' + pageTitle)
    return {
      title: pageTitle,
      path: '/pageTab/index/index?' + AllCode,
      imageUrl: imageUrl,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  toFix: function (money) {
    money = money.toFixed(2)
    return money
  },
  lookBigImage: function (url, urls) {
    console.log("==lookBigImage===", url, urls)
    if (!url) {
      return
    }
    if (!urls) {
      urls = []
      urls.push(url)
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  getRad: function (d) {
    let PI = Math.PI;
    return d * PI / 180.0;
  },
  getDistance: function (lng1, lat1, lng2, lat2) {
    let that = this;
    let EARTH_RADIUS = 6378.1370; //单位KM
    lng1 = parseFloat(lng1);
    lat1 = parseFloat(lat1);
    lng2 = parseFloat(lng2);
    lat2 = parseFloat(lat2);
    let radLat1 = that.getRad(lat1);
    let radLat2 = that.getRad(lat2);

    let a = radLat1 - radLat2;
    let b = that.getRad(lng1) - that.getRad(lng2);

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    console.log("====getDistance===", s)
    return s;
  },
  showPrice: function (cartData, checkedItem) {
    console.log("=====app-showPrice======", cartData, checkedItem)
    let objData = {}
    if (!cartData) {
      // this.setData({
      //   countGood: 0,
      //   countPrice: 0
      // })
      objData = {
        countGood: 0,
        countPrice: 0,
      }
      return objData
    }
    var cartDataItem = cartData[0].carItems
    var checkedItem = checkedItem

    var pushItem = []
    var countGood = 0
    var countPrice = 0
    for (let i = 0; i < cartDataItem.length; i++) {
      if (checkedItem){
        for (let j = 0; j < checkedItem.length; j++) {
          if (cartDataItem[i].id == checkedItem[j]) {
            pushItem.push(cartDataItem[i])
          }
        }
      }else{
        pushItem.push(cartDataItem[i])
      }
    }
    // for (let i = 0; i < cartDataItem.length; i++) {
    //   pushItem.push(cartDataItem[i])
    // }
    for (let i = 0; i < pushItem.length; i++) {
      countGood += parseInt(pushItem[i].count)
      console.log("====pushItem=====", pushItem[i])
      let promotionPrice = 0;
      let carItemPrice = 0;
      let specialSaleTypePrice = 0;
      if (pushItem[i].item.itemSpecialSaleType == 1) {
        if (parseInt(pushItem[i].count) * pushItem[i].carItemPrice >= Number(pushItem[i].item.itemSpecialSaleValue1)) {
          specialSaleTypePrice = Number(pushItem[i].item.itemSpecialSaleValue2)
        }
      }
      if (pushItem[i].item.promotion && pushItem[i].item.promotion != 0) {
        promotionPrice = pushItem[i].item.promotionPrice
      } else {
        carItemPrice = pushItem[i].carItemPrice
      }
      console.log("====pushItem=====", promotionPrice, carItemPrice, specialSaleTypePrice)
      if (pushItem[i].item.promotion && pushItem[i].item.promotion != 0) {
        countPrice += ((parseInt(pushItem[i].count) * promotionPrice) - specialSaleTypePrice)
      } else {
        countPrice += ((parseInt(pushItem[i].count) * carItemPrice) - specialSaleTypePrice)
      }
      // if (pushItem[i].item.promotion && pushItem[i].item.promotion!=0) {
      //   countPrice += parseInt(pushItem[i].count) * pushItem[i].item.promotionPrice
      // } else {
      //   countPrice += parseInt(pushItem[i].count) * pushItem[i].carItemPrice
      // }
    }
    countPrice = Number(countPrice.toFixed(2))
    objData={
      pushItem: pushItem,
      countGood: countGood,
      countPrice: countPrice,
    }
    return objData
    // this.setData({
    //   pushItem: pushItem,
    //   countGood: countGood,
    //   countPrice: countPrice
    // })
  },
  calling: function (phoneNumber) {
    console.log('====e===', phoneNumber)
    wx.makePhoneCall({
      phoneNumber: phoneNumber, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  SDKVersion: '',
  // 个人信息，连接90行
  getSdkVersion: function () {
    //获取版本信息
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log("=======getSystemInfo=========", res)
        that.SDKVersion = res.SDKVersion
      }
    })
  },

  compareVersion: function (v1, v2) {
    //判断版本大小
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  }
})
