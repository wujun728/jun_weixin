
import { socketFun } from "../../../public/json2Form.js";
const app = getApp();
var timeTimeout
  Component({
  properties: {
   

    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
     
    }
  },
    data: {
      // 这里是一些组件内部数据
      someData: { },
      findNotifyTipsData:null,
      findNotifyTipsItem:null,
      showPopup:false,
      animationData:{},
      timer:null,
      numberTime: 0,
      properties:{},
    },
    lifetimes: {
      attached: function () {
        console.log("========attached=============")
        socketFun.addListener( "defaultUserChat",  function(msg){
            console.log("hello!!!",msg);
            return true;
        });
        let that = this;
        console.log("==========title=============", that.data.data)
        that.setData({ setting: app.setting, properties: app.properties })
        console.log("==========setting=============", that.data.setting.platformSetting.defaultColor)
        if (that.data.data.androidTemplate == "popup_page") {
          that.findNotifyTipsFun();
        } 
        if (that.data.data.androidTemplate == "form_search"){
          that.getFormType();
        }
      },
      detached: function () {
        // 在组件离开页面节点树后， detached 生命周期被触发
        let that = this;
        if (that.data.data.androidTemplate == "popup_page") {
          console.log("==========detached=============")
          that.clearInterval()
          clearTimeout(timeTimeout)
          // app.notifyTipPage.clearInterval();
          // app.preNotifyTipPage.clearInterval();
          // app.notifyTipPage = app.preNotifyTipPage;
          // app.notifyTipPage.findNotifyTipsFun();
        }
      },
    },
    pageLifetimes: {
      show: function () {
        // 页面被展示(主页之间的切换)
        console.log("=====页面被展示=====")
        let that = this;
        if (that.data.data.androidTemplate == "popup_page") {
          that.setData({ numberTime: 0 })
          that.findNotifyTipsFun();
        }
      },
      hide: function () {
        // 页面被隐藏(主页之间的切换)
        console.log("=====页面被隐藏=====")
        let that = this;
        if (that.data.data.androidTemplate == "popup_page") {
          console.log("==========组件hide=============")
          clearTimeout(timeTimeout)
          that.clearInterval()
          // app.notifyTipPage.clearInterval();
          // app.preNotifyTipPage.clearInterval();
          // app.notifyTipPage = app.preNotifyTipPage;
          // app.notifyTipPage.findNotifyTipsFun();
        }
      },
    },
    methods: {//获取表单分类
      bindPickerChange:function(){
        
      },
      getFormType: function (groupName, callback) {
        let customIndex = app.AddClientUrl("/wx_find_custom_forms.html")
        // wx.showLoading({
        //   title: 'loading'
        // })
        app.showToastLoading('loading', true)
        let that = this
        wx.request({
          url: customIndex.url,
          header: app.header,
          success: function (res) {
            wx.hideLoading()
            console.log("getFormType", res.data)
            if (res.data.errcode == 0) {
              let formType= res.data.relateObj.result
              that.setData({ formType: formType})
            }
            wx.hideLoading()
          },
          fail: function (res) {
            console.log("fail")
            wx.hideLoading()
            app.loadFail()
          }
        })
      },
      // 这里是一个自定义方法
      findNotifyTipsFun: function () {
        // if (app.notifyTipPage){
        //   app.preNotifyTipPage=app.notifyTipPage;
        //   app.notifyTipPage.clearInterval();
        //   app.preNotifyTipPage.clearInterval();
        // }
        // app.notifyTipPage=this;
        // var that = app.notifyTipPage;
        let that = this;
        var customIndex = app.AddClientUrl("/wx_find_notify_tips.html", { test: 1 })
        wx.request({
          url: customIndex.url,
          header: app.header,
          success: function (res) {
            wx.hideLoading()
            console.log("findNotifyTipsFun", res.data, that.data.numberTime)
            if (res.data.errcode == 0) {
              let findNotifyTipsData = res.data.relateObj.result
              that.setData({ findNotifyTipsData: findNotifyTipsData, showPopup: true })
              let count=0;
              let numberTime = that.data.numberTime
              // that.data.timer = setInterval(function () {
              //   console.log("===========timer get order detail============");
              //   if (count==0){
              //     console.log("========从头开始===========")
              //     that.setData({ numberTime: 5000 })
              //   }
              //   if (count < findNotifyTipsData.length) {
              //     that.getFindNotifyTipsItem(findNotifyTipsData[count])
              //     count++
              //   } else {
              //     that.setData({ numberTime: 60000 - (count * 5000) })
              //     that.clearInterval()
              //     that.findNotifyTipsFun()
              //   }
              // }, numberTime);
              timeTimeout=setTimeout(function(){
                that.data.timer = setInterval(function () {
                  console.log("===========timer get order detail============");
                  if (count < findNotifyTipsData.length) {
                    that.getFindNotifyTipsItem(findNotifyTipsData[count])
                    count++
                  } else {
                    that.setData({ numberTime: 60000 - (count * 5000)})
                    that.clearInterval()
                    that.findNotifyTipsFun()
                  }
                }, 5000);
              }, numberTime)
            } else {

            }
            wx.hideLoading()
          },
          fail: function (res) {
            console.log("fail")
            wx.hideLoading()
            app.loadFail()
          }
        })
      },
      clearInterval:function(data){
        let that=this;
        console.log("=====clearInterval=====", data)
        if (that.data.showPopup){
          let timer = that.data.timer
          clearInterval(timer);
          that.setData({ showPopup: false, timer: null })
        }
      },
      getFindNotifyTipsItem: function (findNotifyTipsItem){
        // let that = app.notifyTipPage;
        let that = this;
        let animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        animation.opacity(1).step()
        that.setData({
          animationData: animation.export(),
        })
        console.log("=====findNotifyTipsItem====", findNotifyTipsItem)
        that.setData({ findNotifyTipsItem: findNotifyTipsItem })
        setTimeout(function(){//停留4S
          animation.opacity(0).step()
          that.setData({
            animationData: animation.export(),
          })
        },4000)
      },
      
      /* 搜索 */
      changeSearchProductFun:function(data){
        let that=this;
        if (that.data.data.androidTemplate == "more_product_search"){
          console.log("===changeSearchProductFun===", data)
        }
      },
      searchProduct: function (e) {
        var product = e.detail.value
        console.log(product)
        var param = {}
        param.productName = product
        let postParam = app.jsonToStr(param)
        // app.productParam = param
        wx.navigateTo({
          url: '/pages/search_product/index' + postParam
        })
      },
      tolinkUrl: function (event) {
        console.log(event.currentTarget.dataset.link)
        app.linkEvent(event.currentTarget.dataset.link);


        // wx.navigateTo({
        //   url: '/pages/' + event.currentTarget.dataset.page + '/index'
        // })
      }
  }
})