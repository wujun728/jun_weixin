
const app = getApp() 
Page({

  /**
   * 页面的初始数据 
   */
  data: {

    setting: null,
    loginUser: null,
    posterState:false,
    orderNo:null,
    orderDetailData:null,
    showArr: false,
    addrArr: null,
    hasAddnewAddr: false,
  },
  /* 获取地址列表 */
  showOtherArr: function () {
    var customIndex = app.AddClientUrl("/get_login_user_address_list.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        that.setData({ addrArr: res.data.result, showArr: true })
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })

  },
  
  chooseNewAddr: function (e) {
    let that = this
    var addrArr = this.data.addrArr
    var index = e.currentTarget.dataset.index
    var selectAddr = addrArr[index]
    console.log(selectAddr)
    let addrParam = {}
    addrParam.addressId = selectAddr.id
    addrParam.orderNo = this.data.orderDetailData.orderNo
    let customIndex = app.AddClientUrl("/change_order_address.html", addrParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if(res.data.errcode == 0){
          let orderDetailData = that.data.orderDetailData
          orderDetailData.buyerName = selectAddr.contactName
          orderDetailData.buyerTelno = selectAddr.telNo
          orderDetailData.buyerProvince = selectAddr.province
          orderDetailData.buyerCity = selectAddr.city
          orderDetailData.buyerArea = selectAddr.area
          orderDetailData.buyerAddress = selectAddr.address
          that.setData({
            orderDetailData: orderDetailData,
            showArr: false
          })
          wx.showToast({
            title: '地址修改成功',
          })
        }
        


      },
      fail: function (res) {
        app.loadFail()
      }
    })


   
    wx.hideLoading()
  },
  closeShowArr: function () {
    this.setData({ showArr: false })
  },

  toaddress_new: function () {
    this.setData({ hasAddnewAddr: true })
    wx.navigateTo({
      url: '/pages/add_address/index',
    })
  },
  tolinkUrl: function (e) {
    console.log(e.currentTarget.dataset.id)
    // product_detail.html?productId= 9219;
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
    app.linkEvent(a);
  },
  getOrderDetail:function(id){
    let that = this
    let getParams = {}
    getParams.orderNo = id
    let customIndex = app.AddClientUrl("/get_order_detail.html", getParams)
    
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        that.setData({ orderDetailData: res.data})
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      },
      complete: function () {
        console.log('=====fail====')
      },
    })
  },
  //物流单号 一键复制的事件
  copyTBL:function(){
    var that=this;
    wx.setClipboardData({
      data: that.data.orderDetailData.invoiceNo,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {            
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  showPoster: function () {
    let that = this;
    console.log('===showPoster====', that.data.loginUser.id)
    if (that.data.loginUser && that.data.loginUser.platformUser.id) {
      let ewmImgUrl = app.getQrCode({ type: "pin_tuan", id: that.data.orderDetailData.pintuanRecord.id })
      that.setData({
        posterState: true,
        ewmImgUrl: ewmImgUrl,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您还未登录，点击【确定】重新加载',
        success: function (res) {
          if (res.confirm) {
            that.getSessionUserInfo();
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  getSessionUserInfo: function () {
    var that = this;
    var postParamUserBank = app.AddClientUrl("/get_session_userinfo.html")
    wx.request({
      url: postParamUserBank.url,
      data: postParamUserBank.params,
      header: app.headerPost,
      success: function (res) {
        console.log(res.data)

        if (res.data.errcode == '0') {
          that.setData({
            loginUser: res.data.relateObj
          })
          app.loginUser = res.data.relateObj
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        console.log(res.data)
      },
      complete: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    var that = this
    that.setData({ setting: app.setting, loginUser: app.loginUser })
    console.log(o)
    if (!!o.orderNo) {
      that.data.orderNo = o.orderNo
      that.setData({
        orderNo: that.data.orderNo
      })

      that.getOrderDetail(o.orderNo)
    }else{
      wx.navigateBack()
    }
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
    if (this.data.hasAddnewAddr) {
      this.showOtherArr()
    }
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
    wx.stopPullDownRefresh()
    this.getOrderDetail(this.data.orderNo);
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
      let id = this.data.orderDetailData.pintuanRecord.id;

      let shareName = '拼团活动'

      let shareParams = 'pintuanRecordId=' + id

      console.log("shareParams", shareParams)
    console.log("============ii=========", app.sharePintuan('pintuan_invitation', shareName, shareParams))
      return app.sharePintuan('pintuan_invitation', shareName, shareParams)


  },
})