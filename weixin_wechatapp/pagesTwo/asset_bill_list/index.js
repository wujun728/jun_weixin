

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    assetBillList: [], // 商品数据 
    noAssetBillList: [], // 商品数据 
    currentTab:1,
    showNoneBill:false,
    butn_show_loading:false,
  },
  clickShowNoPay:function(){
    let that = this;
    let showNoneBill;
    if (that.data.showNoneBill){
      showNoneBill=false
    } else {
      showNoneBill = true
    }
    that.setData({ showNoneBill: showNoneBill})
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
    })
    if (showNoneBill) {
      animation.height(250).step()
    } else {
      animation.height(0).step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  toIndex(){
    app.toIndex()
  },
  clickTypeTab: function (e) {
    console.log("====clickTypeTab====", e)
    let that = this;
    that.params.page=1
    let currentTab = e.currentTarget.dataset.type;
    that.params.payUserType = currentTab
    that.getData(that.params,2)
    that.setData({ currentTab: currentTab });

  },
  subMitButn: function () {
    var that = this
    let billIds ;
    if (that.data.currentTab==0){
      billIds = that.data.noAssetBillList.userUnpayedBillIds
    } else if (that.data.currentTab == 1){
      billIds = that.data.noAssetBillList.organizeUnpayedBillIds
    }
    let wxChatPayParam = {
      billIds: billIds,
    }
    if (billIds.length==0){
      wx.showModal({
        title: '提示',
        content: '主人~您没有任何未支付账单哦!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    this.setData({ butn_show_loading: true })
    let customIndex = app.AddClientUrl("/wx_create_bill_order.html", wxChatPayParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        //这里拿到订单数据
        //下面应该吊起支付
        let orderNo = res.data.relateObj.orderNo
        if (!res.data.relateObj || !res.data.relateObj.payType) {
          console.log('--------失败-------')
        }
        if (res.data.relateObj.payType == 3) {
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
            that.getData(that.params, 2);
            that.getNonData()
          }
        })
      }
    })
  },
  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/wx_find_user_asset_bill.html", param)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log("===find_user_asset_bill===",res.data)
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.assetBillList
        let tagArray=[];
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
          that.setData({ assetBillList: [] })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.relateObj.result)
          for (let i = 0; i < dataArr.length;i++){
            if (dataArr[i].unitEndTime || dataArr[i].unitEndTime) {
              let reg = new RegExp('-', "g")
              dataArr[i].unitEndTime = dataArr[i].unitEndTime.replace(reg, ".")
              dataArr[i].unitStartTime = dataArr[i].unitStartTime.replace(reg, ".")
              if (dataArr[i].unitEndTime.length>12){
                dataArr[i].unitEndTime = dataArr[i].unitEndTime.slice(0, -9)
              }
              if (dataArr[i].unitStartTime.length > 12) {
                dataArr[i].unitStartTime = dataArr[i].unitStartTime.slice(0, -9)
              }
            }
          }
          that.setData({ assetBillList: dataArr })
          console.log("===assetBillList===", that.data.assetBillList)
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
  /* 获取数据 */
  getNonData: function () {
    var customIndex = app.AddClientUrl("/wx_get_user_will_pay_bill.html")
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log("===getNonData===", res.data)
        let dataArr = res.data.relateObj
        if (!dataArr || dataArr.length == 0) {
          that.setData({ noAssetBillList: [] })
        } else {
          for (let i = 0; i < dataArr.userUnpayedBills.length; i++) {
            if (dataArr.userUnpayedBills[i].unitEndTime || dataArr.userUnpayedBills[i].unitEndTime) {
              let reg = new RegExp('-', "g")
              dataArr.userUnpayedBills[i].unitEndTime = dataArr.userUnpayedBills[i].unitEndTime.replace(reg, ".")
              dataArr.userUnpayedBills[i].unitStartTime = dataArr.userUnpayedBills[i].unitStartTime.replace(reg, ".")
              if (dataArr.userUnpayedBills[i].unitEndTime.length > 12) {
                dataArr.userUnpayedBills[i].unitEndTime = dataArr.userUnpayedBills[i].unitEndTime.slice(0, -9)
              }
              if (dataArr.userUnpayedBills[i].unitStartTime.length > 12) {
                dataArr.userUnpayedBills[i].unitStartTime = dataArr.userUnpayedBills[i].unitStartTime.slice(0, -9)
              }
            }
          }
          for (let i = 0; i < dataArr.organizeUnpayedBills.length; i++) {
            if (dataArr.organizeUnpayedBills[i].unitEndTime || dataArr.organizeUnpayedBills[i].unitEndTime) {
              let reg = new RegExp('-', "g")
              dataArr.organizeUnpayedBills[i].unitEndTime = dataArr.organizeUnpayedBills[i].unitEndTime.replace(reg, ".")
              dataArr.organizeUnpayedBills[i].unitStartTime = dataArr.organizeUnpayedBills[i].unitStartTime.replace(reg, ".")
              if (dataArr.organizeUnpayedBills[i].unitEndTime.length > 12) {
                dataArr.organizeUnpayedBills[i].unitEndTime = dataArr.organizeUnpayedBills[i].unitEndTime.slice(0, -9)
              }
              if (dataArr.organizeUnpayedBills[i].unitStartTime.length > 12) {
                dataArr.organizeUnpayedBills[i].unitStartTime = dataArr.organizeUnpayedBills[i].unitStartTime.slice(0, -9)
              }
            }
          }
          that.setData({ noAssetBillList: dataArr })
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
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  params:{
    payUserType: 1,
    page: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.initSetting();
    for (let i in options) {
      for (let j in that.params) {
        if (i.toLowerCase() == j.toLowerCase()) { that.params[j] = options[i] }
      }
    }
    that.setData({
      params: that.params
    })
    console.log(that.params)
    that.getData(that.params, 2);
    that.getNonData()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initSetting(){
    this.setData({ setting: app.setting })
    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      this.data.setting.platformSetting.categories[i].colorAtive = '#888';
    }
    this.data.setting.platformSetting.categories[0].colorAtive = this.data.setting.platformSetting.defaultColor;
    this.setData({
      setting: this.data.setting,
    })
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


    this.listPage.page = 1
    this.params.page = 1
    this.getData(this.params, 2)

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.params.page * that.listPage.pageSize) {
      that.params.page++
      console.log()
      that.getData(that.params);
    }
  },

})