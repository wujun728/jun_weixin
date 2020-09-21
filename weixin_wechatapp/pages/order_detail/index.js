
const app = getApp() 
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    setting: null,
    loginUser: null,
    formCommitId:null,
    orderNo:null,
    orderDetailData:null,
    showArr: false,
    addrArr: null,
    hasAddnewAddr: false,
    ewmCode:"",
  },
  tolinkUrl: function (e) {
    console.log(e.currentTarget.dataset.info)
    // product_detail.html?productId= 9219;
    let productData = e.currentTarget.dataset.info
    let link = "";
    if (productData.productType == 6) {
      link = "ticket_detail.html?productId=" + productData.itemId;
    } else {
      link = "product_detail.html?productId=" + productData.itemId;
    }
    // var a = "product_detail.html?productId=" + e.currentTarget.dataset.id; 
    app.linkEvent(link);
  },
  clickCatch: function (e) {
    console.log(e.currentTarget.dataset.info)
    let info = e.currentTarget.dataset.info;
    console.log(info)
    let latitude = info.latitude || info.buyerLatitude;
    let longitude = info.longitude || info.buyerLongitude;
    let name = info.name || info.buyerName || info.belongShopName;
    let address = info.address || (info.buyerProvince + info.buyerCity + info.buyerArea + info.buyerAddress);
    // 判断金纬度是否为空
    if (latitude == 0 || longitude == 0) {
      console.log("判断金纬度是否为空");
      wx.showModal({
        title: '提示',
        content: '主人~该门店没有设置位置哦!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    else {
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,
        name: name,
        address: address,
      })
    }
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
    app.showToastLoading('loading', true)
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
  getVerificationCode: function (orderNo) {
    var that = this
    let params = { verifyScanType: 2, code: orderNo||0};
    var customIndex = app.AddClientUrl("/wx_get_scan_verify_parameter.html", params)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("getVerificationCode", res.data)
        if (res.data.errcode == 0) {
          that.getEwmCode(res.data.relateObj)
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.errMsg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      },
      complete: function (res) {

      }
    })
  },

  getEwmCode: function (data) {
    let that = this;
    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
    // + "%26verifyScanType%3d" + that.onloadOpt.verifyScanType + "%26sign%3d" + data.sign + "%26seq%3d" + data.seq + "%26scene%3d" + userId 
    let getUrl = app.AddClientUrl("/super_shop_manager_get_mini_code.html");
    that.setData({ ewmCode: getUrl.url + '&path=pageTab%2findex%2findex%3fVERIFICATION_CODE%3d' + data.verifyScanCode + "%26verifyScanType%3d" + data.verifyScanType + "%26sign%3d" + data.sign })
    console.log("ewmCode", that.data.ewmCode)
  },
  getOrderDetail:function(id){
    let that = this
    let getParams = {}
    getParams.orderNo = id
    let customIndex = app.AddClientUrl("/get_order_detail.html", getParams)
    
    /*wx.showLoading({
      title: 'loading'
    })*/
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        that.setData({ orderDetailData: res.data})
        if (res.data.mendianZiti==1){
          that.getVerificationCode(res.data.orderNo)
        }
        if (res.data.processInstanceId){
          that.getProcessList(res.data.processInstanceId)
        }
        if (res.data.userAddressCustomFormCommitId){
          that.setData({ formCommitId: res.data.userAddressCustomFormCommitId})
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
// 地图
  regionchange(e) {
    console.log('===regionchange===', e)
    if (e.type == 'end') {
      if (e.causedBy == 'scale') {
        console.log('====scale====')
      } else if (e.causedBy == 'drag') {
        console.log('====drag====');
        this.getCenterPoint(this.getData);
      } else {
        console.log('====all====');
        this.getCenterPoint(this.getData);
      }
    }
  },
  getCenterPoint(callback) {
    let that = this;
    var mapCtx = wx.createMapContext('map')
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('res', res)
        let params={}
       // that.getLoctionAddr(res.longitude, res.latitude)
        params.latitude = res.latitude;
        params.longitude = res.longitude;
        console.log("params", params)
        that.setData({
          params: params,
        })
        if (callback) {
          callback(params, 2)
        }
      }
    }) //获取当前地图的中心经纬度
  },
  /* 获取数据 */
  getProcessList: function (id) {
    let that = this
    if (!app.checkIfLogin()) return;
    let getParams = {}
   /* wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })*/
    getParams.instanceStatus=1
    getParams.processId = id
    let customIndex = app.AddClientUrl("/wx_get_process_instance_list.html", getParams)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getProcessList-res===', res)
        let data = res.data;
        if (typeof (res.data) == 'string') {
          data = JSON.parse(res.data)
        }
        if (data.errcode == 0) {
          
        }
      },
      complete: function (res) {

      }
    })
  },
  //物流单号 一键复制的事件
  copyTBL:function(e){
    var that = this;
    console.log("====copyTBL====", e)
    let value = e.currentTarget.dataset.value
    wx.setClipboardData({
      data: value,
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
  timer:null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    var that = this
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    console.log(o)
    if (!!o.orderNo) {
      this.data.orderNo = o.orderNo
      this.setData({
        orderNo: this.data.orderNo
      })
      that.getOrderDetail(o.orderNo);
      that.timer =  setInterval(function(){
        console.log("===========timer get order detail============");
        if (!that.data.orderDetailData||(that.data.orderDetailData.payStatus == 1 && that.data.orderDetailData.orderStatus<=3)){
            that.getOrderDetail(o.orderNo)
          
        }else{
          clearInterval(that.timer);
        }

      },8000);
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
    clearInterval(this.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer);
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