
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 100,
    payway: 3,
    butn_show_loading: false,
    properties:{},
  },
  selectItemFun:function(e){
    console.log("========selectItemFun========",e)
    let that=this;
    let info = e.currentTarget.dataset.info;
    that.data.money = info.value
    that.setData({ money: info.value })
    that.subMitButn()
  },
  getBuyerScript: function (e) {
    this.setData({ money: e.detail.value })
  },
  getPayWay: function (e) {
    this.setData({
      payway: e.detail.value
    })
  },

  subMitButn: function () {
    var that = this
    let money = this.data.money
    let payWay = this.data.payway
    let wxChatPayParam = {
      rechargeAmount: '',
      payType: 3
    }

    wxChatPayParam.rechargeAmount = money
    wxChatPayParam.payType = payWay
    console.log(wxChatPayParam)
    this.setData({ butn_show_loading: true })
    let customIndex = app.AddClientUrl("/create_recharge_order.html", wxChatPayParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        //这里拿到订单数据
        //下面应该吊起支付
        console.log(res.data)
        let orderNo = res.data.orderNo
        if (!res.data || !res.data.payType) {
          console.log('--------失败-------')
        }
        if (res.data.payType == 3) {
          that.payByWechat(orderNo)
        }

      },
      fail: function () {

      },
      complete: function () {
        that.setData({ butn_show_loading: true })
      }

    })
  },
  payByWechat: function (orderNo) {
    var that = this
    let loginUser = app.loginUser
    console.log(loginUser)
    let wxChatPayParam = {
      openid: '',
      orderNo: '',
      app: 3
    }
    wxChatPayParam.openid = loginUser.platformUser.miniOpenId
    wxChatPayParam.orderNo = orderNo
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
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          'fail': function (res) {
            console.log('------fail--------')
            console.log(res)
            wx.showToast({
              title: '支付失败',
              image: '/images/icons/tip.png',
              duration: 2000
            })
          },
          'complete': function () {
            console.log('------complete--------')
            console.log(res)
            that.setData({ butn_show_loading: false })
            app.navigateBack(2000)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log("options", options)
    if (options.money){
      that.setData({ money: options.money })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.setting = app.setting
    if (this.data.setting.platformSetting.rechargeList && typeof (this.data.setting.platformSetting.rechargeList)=='string'){
      this.data.setting.platformSetting.rechargeList = JSON.parse(this.data.setting.platformSetting.rechargeList)
    }
    this.setData({ setting: this.data.setting, loginUser: app.loginUser, properties: app.properties })
    console.log("setting", app.setting)
    if (app.properties.alias_yue) {
      wx.setNavigationBarTitle({
        title: app.properties.alias_yue + '充值',
      })
    }
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

})