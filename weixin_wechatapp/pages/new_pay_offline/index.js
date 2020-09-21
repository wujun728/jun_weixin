
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 100,
    payway: 3,
    orderNo:0,
    butn_show_loading: false,
    mendianId:"",
    mendianImg:"",
    mendianName:"111",
    successState:'normal',
    properties:{},
  },
  // 返回首页
  toIndex:function(){
    app.toIndex();
  },
  login: function(e) {
    wx.switchTab({
      url: '../../pageTab/custom_page_index/index',
    })
  },
  getBuyerScript: function (e) {
    this.setData({ money: e.detail.value })
  },
  getBuyerRemark:function(e){
    this.setData({ remark: e.detail.value })
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
    let remark = this.data.remark
    let wxChatPayParam = {
      payAmount: '',
      payType: 3,
      mendianId: that.data.mendianId,
    }

    wxChatPayParam.payAmount = money
    wxChatPayParam.payType = payWay
    wxChatPayParam.remark = remark
    console.log("ff==========",wxChatPayParam)
    this.setData({ butn_show_loading: true })
    let customIndex = app.AddClientUrl("/create_mendian_offline_pay_order.html", wxChatPayParam, 'post')
    console.log("------customIndex.url--------" + JSON.stringify(customIndex.params))
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log("结果" + JSON.stringify(res))
        //这里拿到订单数据
        //下面应该吊起支付
        console.log(res.data.relateObj.orderNo)
        let orderNo = res.data.relateObj.orderNo
        if (!res.data || !res.data.relateObj.payType) {
          console.log('--------失败-------')
        }
       else if (res.data.relateObj.payType == 3) {
          that.setData({ orderNo: orderNo })
          that.payByWechat(orderNo)
         
        }else{
          wx.showToast({
            title: '创建订单失败',
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }

      },
      fail: function () {
        console.log("123456987456321")
      },
      complete: function () {
        that.setData({ butn_show_loading: true })
      }

    })
  },
  payByWechat: function (orderNo) {
    var that = this
    let loginUser = app.loginUser
    console.log("loginUser" + loginUser)
    let wxChatPayParam = {
      openid: '',
      orderNo: '',
      app: 3,
      mendianId: that.data.mendianId,
    }
    wxChatPayParam.openid = loginUser.platformUser.miniOpenId
    wxChatPayParam.orderNo = orderNo
    console.log("------wxChatPayParam---" + JSON.stringify(wxChatPayParam) )
    let customIndex = app.AddClientUrl("/unifined_order.html", wxChatPayParam, 'post')
    console.log("customIndex--------" + JSON.stringify(customIndex))
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
            let successData = { remark: that.data.remark, orderNo: that.data.orderNo,goodsAmount: that.data.money, payTypeStr: that.data.payway,}
            that.setData({
              successData: successData
            })
            that.setData({
              successState: 'success'
            })
            // wx.showToast({
            //   title: '支付成功',
            //   icon: 'success',
            //   duration: 2000
            // })
        
            // 支付成功跳到首页
                // wx.reLaunch({
                //   url: '/pages/success_pay/index',
                // })
             


        

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
          }
        })
      }
    })
  },
  loginSuccess: function (user) {
    console.log("pre apply mendian login success call back!", user);
    let that=this;
    let menDian = {
      mendianId: that.data.mendianId,
    }
    that.getData(menDian)
  },
  loginFailed: function (err) {
    console.log("login failed!!");

  },
  conut: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    that.setData({
      mendianId: options.id
    })
    // 获取门店的样式
    let menDian = {
      mendianId: options.id,
    }
   
    if (app.loginUser) {
      that.getData(menDian)
    } else {
      app.addLoginListener(that);
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      console.log("====setTimeout1=====")
      that.setTimeoutLogin(that.conut)
    }
  },
  setTimeoutLogin: function (conuData) {
    let that = this;
    console.log("====setTimeout-init=====", conuData)
    that.conut = conuData;
    that.conut += 2;
    if (that.conut <= 5) {
      setTimeout(function () {
        if (app.loginUser) {
          wx.hideLoading()
        } else {
          that.setTimeoutLogin(that.conut)
        }
      }, that.conut * 1000)
    } else {
      wx.showModal({
        title: '失败了',
        content: '请求失败了，请下拉刷新！',
      })
    }
  },
  getData: function (menDian) {
    var that = this
    let menDianYangShi = app.AddClientUrl("/mendian_detail.html", menDian, 'get')
    console.log("customIndex--------" + JSON.stringify(menDianYangShi))
    console.log("customIndex--------" + menDianYangShi.url)
    wx.request({
      url: menDianYangShi.url,
      data: menDianYangShi.params,
      header: app.headerPost,
      method: 'get',
      success: function (res) {
        console.log(res)
        console.log(res.data)
        if (res.data.errcode == "-1") {
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
        else {
          if (res.data.relateObj.logo == 0) {
            that.setData({
              mendianName: res.data.relateObj.name,
            })
          }
          else {
            var Images = res.data.relateObj.logo;
            if (Images == "") {
              Images = "../../images/333.jpg"
            }
            that.setData({
              mendianImg: Images,
              mendianName: res.data.relateObj.name,
            })
          }

        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, properties: app.properties, loginUser: app.loginUser})
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