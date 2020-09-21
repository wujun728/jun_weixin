

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:null,
    setting:null,
    butn_show_loading: false,
    properties: {},
  },
  /* 去充值 */
  toAccount:function(){
    wx.navigateTo({
      url: '/pages/user_recharge/index',
    })
  },
  /* 立即支付 */
  payNow:function(e){
    var orderNo = e.currentTarget.dataset.orderno
    var orderItem = this.data.success

    if (orderItem.payType == 2){
      console.log('-----余额支付-----')
      this.payByYue(orderItem.orderNo)
    }
    if (orderItem.payType == 3){
      console.log('-----微信支付-----')
      this.payByWechat(orderItem.orderNo)
    }
    
  },
  //微信支付
  payByWechat: function (orderNo){
    var that = this
    let loginUser = app.loginUser
    console.log(loginUser)
    let wxChatPayParam = {
      openid:'',
      orderNo: '',
      app:3
    }
    this.setData({ butn_show_loading: true })

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
        PayStr ='{' +PayStr+'}'
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
            console.log(that.data.success)
            /* wx.showToast({
              title: '付款成功',
              icon: 'success',
              duration: 2000
            }) */
            if (that.data.success.orderType==12){
              wx.redirectTo({
                url: '/pages/order_pintuan_detail/index?orderNo=' + that.data.success.orderNo,
              })
            }else{
              if (that.data.success.mendianZiti == 1) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order_detail/index?orderNo=' + orderNo,
                  })
                }, 2000)
              } else {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order_list_tab/index',
                  })
                }, 2000)
              }
            }
            /* setTimeout(function () {
              
            }, 2000) */
          },
          'fail': function (res) {
            console.log('------fail--------')
            console.log(res)
          },
          'complete':function(){
            console.log('------complete--------')
            console.log(res)
            that.setData({ butn_show_loading: false })
          }
        })
      },complete:function(){
        
      }
    })
  },
  /* 余额支付 */
  payByYue: function (orderNo){
    var that = this
    console.log(orderNo)

    wx.showModal({
      title: '提示',
      content: '确认付款',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_account_pay.html", param_post,'post')
          that.setData({ butn_show_loading: true })
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.errcode == '0') {
                wx.showToast({
                  title: '付款成功',
                  icon: 'success',
                  duration: 2000
                })
                if (res.data.relateObj.mendianZiti==1){
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/order_detail/index?orderNo=' + orderNo,
                    })
                  }, 2000)
                }else{
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/order_list_tab/index',
                    })
                  }, 2000)
                }
              } else {
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              app.loadFail()
            },
            complete:function(res){
              that.setData({ butn_show_loading: false })
            }
          })
        } else if (res.cancel) {

        }
      }, complete: function () {
        
      }
    })
  },
  toIndex: function () {
    // console.log('首页叫做：' + app.miniIndexPage)

    // console.log('首页叫做：' + app.clientNo)
    // //这个需要注意  switchTab  和  redirectTo
    // if (app.clientNo == 'tunzai') {
    //   console.log("1111111111111")
    //   wx.switchTab({
    //     url: '/pageTab/lanHu/index/index',
    //   })
    //   return;
    // }
    // else if (app.miniIndexPage) {
    //   console.log("2222222222222")
    //   wx.switchTab({
    //     url: '/pageTab/' + app.miniIndexPage + '/index',
    //   })
    // } else {
    //   console.log("33333333333333")
    //   wx.switchTab({
    //     url: '/pageTab/custom_page_index/index',
    //   })
    // }
    app.toIndex();


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.payItem)
    this.setData({
      success: app.payItem
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, loginUser: app.loginUser, properties: app.properties })
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