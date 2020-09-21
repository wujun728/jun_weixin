// pageTab/lanHu/success/index.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    servantDetail:{},
    servantTypeRelatesData: [],
    animationData: {}, //抽屉
    showType:false,
    curSelectIndex: -1,
    curSelectData: null,
    showSubmitForm:false,
    servantTypeState:false,
    servantTypeId: 0,
    showTypeTwo: false,
    animationDataTwo: null,
    shareTypeData: [{ name: '发送给朋友', type: 'botton' }],
  },
  focusServant: function () {
    var that = this;
    let params = { type: 2, toTargetId: that.data.servantDetail.id}
    var customIndex = app.AddClientUrl("/wx_set_servant_target_relate.html", params, 'post')
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log("==getServantDetail===", res.data)
        if (res.data.errcode == '0') {
          let servantDetail = res.data.relateObj;
          wx.showModal({
            title: '关注服务人员',
            content: '你已关注成功~',
          })

        } else {
          wx.showModal({
            title: '失败了',
            content: '请求失败了，请下拉刷新！',
          })

        }
      }
    })
  },
  showShareClose: function () {
    this.setData({ showTypeTwo: false })
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    })
    animation.height(0).step()
    let setData = animation.export()
    this.setData({
      animationDataTwo: setData
    })
  },
  showShare: function () {
    this.setData({ showTypeTwo: !this.data.showTypeTwo })
    let showTypeTwo = this.data.showTypeTwo
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
    })
    console.log("=======popupFormPage==========", animation, this.data.showType)
    if (showTypeTwo) {
      animation.height(100).step()
    } else {
      animation.height(0).step()
    }
    this.setData({
      animationDataTwo: animation.export()
    })
  }, 
  nextStepFun:function(){
    let that=this;
    that.setData({ showSubmitForm:false})
  },
  selectServantTypeFun:function(e){
    console.log("=======selectServantTypeFun==========",e)
    let itemInfo = e.currentTarget.dataset.info;
    let index = e.currentTarget.dataset.index;
    let that=this;
    that.setData({ curSelectIndex: index, curSelectData: itemInfo})
  },
  submitFormData:function(){
    let that = this;
    let curSelectData = that.data.curSelectData
    that.selectComponent("#submitForm").formSubmit(curSelectData.servantTypeBean.refCustomFormId);
  },
  getDataFun: function (e) {
    let that = this;
    console.log("===getDataFun===", e, e.detail.formId)
    if (e.detail.result) {
      that.toPayApplyCost(e.detail.result)
    } else {
      wx.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function(){
        that.getServantDetail(that.params);
        that.closeZhezhao()
      },2000)
    }
  },
  toPayApplyCost: function (result) {
    var that = this
    let loginUser = app.loginUser
    console.log(loginUser)
    let wxChatPayParam = {
      openid: '',
      orderNo: '',
      app: 3
    }
    wxChatPayParam.openid = loginUser.platformUser.miniOpenId
    wxChatPayParam.orderNo = result.orderNo
    console.log(wxChatPayParam)
    let customIndex = app.AddClientUrl("/unifined_order.html", wxChatPayParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        let PayStr = res.data
        PayStr = '{' + PayStr + '}'
        let wechatPayStr = JSON.parse(PayStr)
        console.log(wechatPayStr)
        wx.requestPayment({
          'timeStamp': wechatPayStr.timeStamp,
          'nonceStr': wechatPayStr.nonceStr,
          'package': wechatPayStr.package,
          'signType': wechatPayStr.signType,
          'paySign': wechatPayStr.paySign,
          'success': function (res) {
            console.log('------成功--------')
            console.log(res)
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })
            that.getServantDetail(that.params);
            that.closeZhezhao()
          },
          'fail': function (res) {
            console.log('------fail--------')
            console.log(res)
            wx.showToast({
              title: '支付失败',
              image: '/images/icons/tip.png',
              duration: 2000
            })
            app.navigateBack(2000)
          },
          'complete': function () {
            console.log('------complete--------')
            console.log(res)
          }
        })
      }
    })
  },
  submitData:function(e){
    let that = this;
    console.log("===submitData===", e)
    let linkUrl=e.currentTarget.dataset.link||'';
    let curSelectData = that.data.curSelectData
    if (!curSelectData){
      wx.showModal({
        title: '提示',
        content: '主人~请选择一项服务！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    if (curSelectData&&curSelectData.servantTypeBean.servantServiceType==1){
      app.calling(curSelectData.servantBean.telno)
    } else if (curSelectData &&curSelectData.servantTypeBean.servantServiceType == 2){
      this.setData({ showType:true,showSubmitForm: true, sendOptionData: { customFormId: curSelectData.servantTypeBean.refCustomFormId }})
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      console.log("=======popupFormPage==========", animation, this.data.showSubmitForm)
      if (that.data.showSubmitForm) {
        animation.bottom('100rpx').step()
      } else {
        animation.bottom('-100rpx').step()
      }
      this.setData({
        animationData: animation.export()
      })
    } else if (curSelectData && curSelectData.servantTypeBean.servantServiceType == 4) {
      let byNowParams = {
        productId: curSelectData.servantTypeBean.servantProductId,
        itemCount: 1,
        shopId: 0,
        cartesianId: '0',
        fromSource: 'mini',
        orderType: 0,
        servantId: curSelectData.servantId,
      };
      let pintuanParams = {
        pintuanCreateType: 0,
        pintuanRecordId: 0
      }
      if (!curSelectData.servantTypeBean.servantProductId){
        wx.showModal({
          title: '提示',
          content: '该产品还未上架~',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        app.createOrder(byNowParams, pintuanParams)
      }
    } else if (curSelectData && curSelectData.servantTypeBean.servantServiceType == 5) {
      app.linkEvent(linkUrl)
    } else if (curSelectData &&curSelectData.servantTypeBean.servantServiceType == 0) {

    }else{

    }
  },
  popupServantTypePage: function () {
    console.log("=======popupServantTypePage==========")
    this.setData({ showType: !this.data.showType })
    let showType2 = this.data.showType 
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    console.log("=======popupFormPage==========", animation, this.data.showType)
    if (showType2) {
      animation.bottom('100rpx').step()
    } else {
      animation.bottom('-100rpx').step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  closeZhezhao: function () {
    this.setData({ showType: false, showSubmitForm:false})
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation.bottom('-100rpx').step()
    let setData = animation.export()
    this.setData({
      animationData: setData,
    })
  },
  orderServant:function(e){
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  getServantDetail: function (params) {
    var customIndex = app.AddClientUrl("/wx_get_servant_detail.html", params, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log("==getServantDetail===",res.data)
        if (res.data.errcode == '0') {
          let servantDetail = res.data.relateObj;
          that.getServantTypeRelatesData(servantDetail.id)
          if (servantDetail.richText) {
            WxParse.wxParse('article', 'html', servantDetail.richText, that, 10);
            console.log('====article====', that.data.article)
          }
          if (servantDetail.tags && servantDetail.tags != '') {
            let tagArray = servantDetail.tags.slice(1, -1).split("][")
            servantDetail.tagArray = tagArray;
          }
          servantDetail.surname = servantDetail.name.slice(0, 1)
          that.setData({
            servantDetail: servantDetail
          })
          
        } else {
          wx.showModal({
            title: '失败了',
            content: '请求失败了，请下拉刷新！',
          })

        }
      }
    })
  },
  getServantTypeRelatesData: function (servantId) {
    var customIndex = app.AddClientUrl("/wx_find_servant_type_relates.html", { servantId: servantId}, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log("==servantTypeRelatesData===", res.data)
        if (res.data.errcode == '0') {
          let curSelectData = that.data.curSelectData;
          let servantTypeId = that.data.servantTypeId;
          let curSelectIndex = that.data.curSelectIndex
          let servantTypeRelatesData = res.data.relateObj.result
          for (let i = 0; i < servantTypeRelatesData.length;i++){
            if (servantTypeRelatesData[i].typeId == servantTypeId){
              curSelectData = servantTypeRelatesData[i]
              curSelectIndex=i
            }
          }
          that.setData({
            servantTypeRelatesData: servantTypeRelatesData,
            curSelectData: curSelectData,
            curSelectIndex: curSelectIndex,
          })
        } else {
          wx.showModal({
            title: '失败了',
            content: '请求失败了，请下拉刷新！',
          })

        }
      }
    })
  },
  params:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log("======servantDetail=====",options);
    if (app.setting.platformSetting.id) {
      that.setData({
        platformSetting: app.setting.platformSetting,
        properties: app.properties
      })
      wx.setNavigationBarTitle({
        title: (that.data.properties.alias_yewuyuan || "服务员") + "详情",
      })
      console.log("======platformSetting=====", that.data.platformSetting);
    }
    let servantTypeState = that.data.servantTypeState;
    if (options.servantTypeId){
      servantTypeState = false
    } else {
      servantTypeState = true
    }
    that.setData({ servantTypeState: servantTypeState, servantTypeId: options.servantTypeId})
    that.params = options
    that.getServantDetail(that.params);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    let that = this
    that.showShareClose();
    console.log("======this.params======", this.params)
    let params = this.params;
    let shareName = that.data.servantDetail.name + "(" + that.data.servantDetail.tagArray+")";
    let shareAppMessageData = app.shareForFx2('servant_detail', shareName, params, '', 'custom_form_commit_id')
    console.log('params:', params)
    return shareAppMessageData
  }
})