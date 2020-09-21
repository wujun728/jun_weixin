
const app = getApp() 
Page({
 
  /** 
   * 页面的初始数据
   */ 
  data: { 
    orderData:null,
    selectStore:null,
    reqStore: false,
    showSelectCoupon:false,
    sureUseCouponState:false,
    reqAddress: false,
    showTopSelect:false,
    showAddressForm:false,
    orderNo:'',
    checkedRadio:0,
    agreementState:true,
    isAgreement:false,
    jifenState:true,
    //优惠券 
    getEditOrderDetailData:null,
    coupon:[],
    coupon2:[],
    index: 0,//
    gotCouponListId:0,
    mendianZiti:-1,
    couponMoney:0,
    sendOptionData:null,
    userAddressCustomFormCommitId:'',
    setting: null,
    loginUser: null,
    properties:{},
    //otherArr
    showArr:false,
    addrArr:null,
    hasAddnewAddr:false,
  },
  // 判断是否有协议页面；
  getParac: function () {
    var that = this
    var customIndex = app.AddClientUrl("/custom_page_order_agreement.html", {}, 'get', '1')
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("====== res.data=========", res.data)
        if (!res.data.errcode || res.data.errcode == '0') {
          wx.hideLoading()
          that.setData({ isAgreement: true })
        } else {
          console.log('加载失败')
          that.setData({ isAgreement: false })
        }
      },
      fail: function (res) {
        console.log('------------2222222-----------', res)
        that.setData({ isAgreement: false })
        wx.hideLoading()
      }
    })
  },
  changeAgreement(e) {
    let that=this;
    console.log('checkbox发生change事件，携带value值为：', e)
    let type = e.target.dataset.type;
    if(type==1){
      that.setData({ agreementState:true})
    } else {
      that.setData({ agreementState: false })
    }
  },
  radioChance:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      checkedRadio:index
    })
  },
  //will sent
  orderMessage:{
    platformNo:'',
    gotCouponListId:'',
    userId:'', 
    orderNo: '',
    payType: '3',
    buyerScript: '',
    addressId: '',
    jifenDikou: '0',
    buyerBestTime: '',
    changeOrderMendianId:0,
    contactName:"",
    contactTelno:"",
  },
  /* 积分抵扣 */
  jifenChange: function (e) {
    let that=this;
    console.log("==e==", e)
    let jifen = e.detail.value[0]
    console.log("==jifen==", jifen)
    if (jifen){
      that.data.jifenState=true;
      that.orderMessage.jifenDikou = jifen
    } else {
      that.data.jifenState = false;
      that.orderMessage.jifenDikou = 0
    }
    console.log("that.orderMessage", that.orderMessage)
  },
  /* 获取地址列表 */
  showOtherArr:function() {
    var customIndex = app.AddClientUrl("/get_login_user_address_list.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        console.log("获取地址列表",res)
        wx.hideLoading()
        that.setData({ addrArr:res.data.result, showArr: true })
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  toaddress_new: function() {
    this.setData({ hasAddnewAddr:true})
    wx.navigateTo({
      url: '/pages/add_address/index',
    })
  },
  // 地址从微信上调取需要的参数
  needParam: {
    contactName: '',
    telno: '',
    province: '',
    city: '',
    district: '',
    detail: '', //详细地址
    longitude: '',
    latitude: '',
    defaultAddress: 0,
  },
  wx_toaddress_new:function(){
    
    let that=this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName) //收货人姓名
        console.log(res.postalCode) //邮编
        console.log(res.provinceName)// 省
        console.log(res.cityName)//  市
        console.log(res.countyName)//区
        console.log(res.detailInfo)// 详细地址
        console.log(res.telNumber)//手机号

        that.needParam.contactName = res.userName //名字
        that.needParam.province = res.provinceName //省
        that.needParam.city = res.cityName //市
        that.needParam.district = res.countyName //
        that.needParam.telno = res.telNumber  //手机号
        that.needParam.detail = res.detailInfo
        that.needParam.defaultAddress = "1" //默认

        console.log("参数" + JSON.stringify(that.needParam))
      let customIndex = app.AddClientUrl("/add_address.html", that.needParam, 'post')
        wx.request({
          url: customIndex.url,
          data: customIndex.params,
          header: app.headerPost,
          method: 'POST',
          success: function (res) {
            console.log(res)
            wx.hideLoading()
            app.addrEditParam = that.needParam
            // 添加成功后重新刷新列表
            that.showOtherArr()
          },
          fail: function (res) {
            wx.hideLoading()
            app.loadFail()
          }
        })
      },

 

    })
  },
  chooseNewAddr: function (e) {
    app.showToastLoading('loading', true)
    let that=this;
    //console.log(e.currentTarget.dataset.chooseid)
    var addrArr = this.data.addrArr
    console.log(addrArr)
    var addressId = e.currentTarget.dataset.chooseid
    console.log("addressId" + addressId)
    that.changeAddressData(addressId)
    var selectAddr = null
    for (let i = 0; i < addrArr.length;i++){
      if (addressId == addrArr[i].id){
        selectAddr = addrArr[i]
      }
    }
    console.log(selectAddr)
    let newData = this.data.orderData
    newData.buyerName = selectAddr.contactName
    newData.buyerTelno = selectAddr.telNo
    newData.buyerProvince = selectAddr.province
    newData.buyerCity = selectAddr.city
    newData.buyerArea = selectAddr.area
    newData.buyerAddress = selectAddr.address
   // this.data.orderData.buyerName = selectAddr.contactName
    newData.addressId = addressId
    this.orderMessage.addressId = addressId
    this.setData({
      orderData: newData,
      showArr:false
    })
    wx.hideLoading()
  },
  changeAddressData: function (addressId){
    let that=this;
    let params = { addressId: addressId, orderNo: that.data.orderData.orderNo};
    var customIndex = app.AddClientUrl("/change_order_address.html", params, 'post')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    //拿custom_page 
    wx.request({
      url: customIndex.url,
      header: app.headerPost,
      data: customIndex.params,
      method: 'POST',
      success: function (res) {
        console.log('-------地址---------')
        console.log(res.data)
        if (res.data.errcode == '-1') {
          console.log('0')
        } else {
          console.log('1')
          that.getEditOrderDetail()
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  closeShowArr: function () {
    this.setData({ showArr: false, showSelectCoupon:false})
  },
  /* 支付方式 */
  payWayChange: function(e) {
    console.log(e.detail.value)
    this.orderMessage.payType = e.detail.value
  },
  getBuyerScript: function(e) {
    this.orderMessage.buyerScript = e.detail.value
  },
  //优惠券
  bindPickerChange: function(e) {
    console.log(e.detail)
    var index = e.detail.value
    var coupon = this.data.coupon
    if (index == 0){
      this.setData({
        index: index,
        couponMoney: 0
      })
    }else{
      var gotCouponListId = coupon[index].id
      console.log(gotCouponListId)
      this.orderMessage.gotCouponListId = gotCouponListId
      this.setData({
        index: index,
        gotCouponListId: gotCouponListId,
        couponMoney: coupon[index].coupon.youhuiAmount
      })
      this.getEditOrderDetail()
    }
   
  },
  // 这里需要修改
  getavailableCouponsArr: function() { 
    var arr = ['no']
    var arr2 = ['请选择优惠券']
    var data=this.data;
    if (data&&data.getEditOrderDetailData.availableCoupons){
      let couponList = this.data.getEditOrderDetailData.availableCoupons;
      for (let i = 0; i < couponList.length;i++){
        arr.push(couponList[i])
        let couponName =''
        if (couponList[i].coupon.orderAmount!=0){
          couponName = "满" + couponList[i].coupon.orderAmount + "元减" + couponList[i].couponYouhuiAmount
          arr2.push(couponName)
        }else{
          couponName = couponList[i].couponYouhuiAmount+'元优惠券'
          arr2.push(couponName)
        }
      }
    }
    this.setData({ coupon: arr, coupon2: arr2})
    console.log('----------1----------')
    console.log(arr)
    console.log('----------2----------') 
    console.log(arr2)
  },
 
  getEditOrderDetail: function () {
    var that = this
    var getParams = {}
    console.log("==setting==",that.data.setting)
    getParams.orderNo = that.data.orderNo
    getParams.gotCouponListId = that.orderMessage.gotCouponListId
    getParams.mendianZiti = that.data.mendianZiti
    var customIndex = app.AddClientUrl("/get_edit_order_detail.html", getParams)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====orde detail=======",res)
        let data = res.data
        if (data.userAddressCustomFormId && data.userAddressCustomFormId>0 ){
          that.setData({ showAddressForm: true, sendOptionData: { customFormId: data.userAddressCustomFormId || 0 } })
        }else{
          that.setData({  sendOptionData: null })
        }
        if (data.userAddressCustomFormCommitId){
          that.setData({ userAddressCustomFormCommitId: data.userAddressCustomFormCommitId})
        }
        if (data.formCommit && data.formCommit.attendMeasureList){
          data.formCommit.attendMeasureListObj = JSON.parse(data.formCommit.attendMeasureList)
        }
        that.setData({ getEditOrderDetailData: data, orderData: data})
        if (data.belongMendian){
          that.setData({ belongMendian: data.belongMendian })
          that.orderMessage.changeOrderMendianId = data.belongMendian.id
        }

  // 获取门店自提
        let allowMendianZiti = data.allowMendianZiti
        let showTopSelect=false;
        console.log(allowMendianZiti)
        that.setData({
          allowMendianZiti: allowMendianZiti,
          mendianZiti: data.mendianZiti
        })
        if (allowMendianZiti!=0){
          showTopSelect=true
        }else{
          showTopSelect = false
        }
        that.setData({ showTopSelect: showTopSelect })
        console.log("=====mendianZiti======", that.data.mendianZiti)
        that.getavailableCouponsArr()
        that.loadMessage()
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 确认订单 */
  submitOrder:function(e){
    console.log('====formId====',e)
    var that = this
    that.setData({ reqAddress: false })
    let miniNotifyFormId = that.orderMessage.miniNotifyFormId ? that.orderMessage.miniNotifyFormId : (e.detail.formId || '');
    that.orderMessage.miniNotifyFormId = miniNotifyFormId
    let addressType= that.data.setting.platformSetting.addressType
    console.log("=====addressType=====", addressType)
    console.log(that.orderMessage)
    // 不允许自提的时候没写地址
    if (!that.orderMessage.addressId && that.data.allowMendianZiti == "0" && addressType != 2 && that.data.orderData.orderType != 17){
        wx.showModal({
          title: '提示',
          content: '请添加收货地址',
          success: function (res) {
            if (res.confirm) {
              that.setData({ reqAddress: true })
              wx.navigateTo({
                url: '/pages/add_address/index?type="order"'
              })
            } else if (res.cancel) {
              that.setData({ reqAddress: false })
            }
          }
        })
      
    }else{
      // 如果允许自提但没打勾
      if (that.data.allowMendianZiti != "0" && that.data.mendianZiti == "0" && !that.orderMessage.addressId && addressType != 2 && that.data.orderData.orderType != 17){
        wx.showModal({
          title: '提示',
          content: '请添加收货地址',
          success: function (res) {
            if (res.confirm) {
              that.setData({ reqAddress: true })
              wx.navigateTo({
                url: '/pages/add_address/index?type="order"'
              })
            } else if (res.cancel) {
              that.setData({ reqAddress: false })
            }
          }
        })
      }else{
        // 如果是订餐的话携带桌子ID
        // 查找缓存
        console.log("22222222222222")
        try {
          let tableID = wx.getStorageSync('tableID')
          if (tableID) {
            that.orderMessage.tableId = tableID
          }
        } catch (e) {
        }
        // 判断是否自提
        console.log("======mendianZiti=========", that.data.mendianZiti)
        that.orderMessage.mendianZiti = that.data.mendianZiti
        if (that.data.mendianZiti == 1 && (!that.orderMessage.contactName || !that.orderMessage.contactTelno) && that.data.setting.platformSetting.addressType != 2 && that.data.orderData.orderType != 17){
          wx.showModal({
            title: '提示',
            content: '请完善提货人信息！',
            success: function (res) {
              if (res.confirm) {
               
              } else if (res.cancel) {

              }
            }
          })
          return;
        }
        if (that.data.isAgreement){
          if (!that.data.agreementState){
            wx.showModal({
              title: '提示',
              content: '请您勾选《订单协议》同意协议内容！',
              success: function (res) {
                if (res.confirm) {
                  that.setData({ agreementState: true })
                } else if (res.cancel) {

                }
              }
            })
            return;
          }
        }
        //判断地址类型
        if (that.data.setting.platformSetting.addressType == 2 || that.data.orderData.orderType==17) {
          that.orderMessage.addressId = 0
        }
        if (that.data.coupon2.length != 0 && !that.orderMessage.gotCouponListId && !that.data.sureUseCouponState) {
          that.setData({ showSelectCoupon: true })
          return
        }
        console.log("=========参数orderMessage===========", that.orderMessage, that.data.sendOptionData)
        if (!that.data.sendOptionData){
          console.log("=====没有表单=====")
          that.toSubmitOrder(that.orderMessage)
        } else {
          console.log("=====有表单=====")
          that.selectComponent("#orderForm").formSubmit();
        }

      }
    }
  },
  getDataFun: function (e) {
    let that=this;
    console.log("===getDataFun===", e)
    that.orderMessage.userAddressCustomFormCommitId = e.detail.formId
    that.toSubmitOrder(that.orderMessage)
  },
  continueSubmitOrder:function(e){
    let that=this;
    console.log("===continueSubmitOrder===",e)
    let state=e.currentTarget.dataset.state
    if (state=='no'){
      that.orderMessage.gotCouponListId = 0
    }
    that.setData({ sureUseCouponState:true })
    that.submitOrder()
  },
  toSubmitOrder:function(data){
    var customIndex = app.AddClientUrl("/submit_order.html", data, 'post')
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------确认订单------- ')
        console.log(res)
        console.log(res.data)
        if (res.data.errcode == '10001') {
          app.loadLogin()
        } else if (res.data.errcode == '-1') {
          wx.hideLoading()
          wx.showModal({
            title: '警告',
            content: res.data.errMsg,
            success: function (res) {
              if (res.confirm) {

              } else if (res.cancel) {

              }
            }
          })
          return;
        } else {
          app.payItem = res.data  /* 全局传过去吧... */
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/submit_order_result/index',
          })
        }


      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //增加 购买过程中——及时收获地址——可编辑的状态
  addressModifyInTime: function (e) {
    var addrId = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.addrArr.length; i++) {
      if (addrId == this.data.addrArr[i].id) {
        app.EditAddr = this.data.addrArr[i]
      }
    }
    this.hasEditAddr = true
    wx.navigateTo({
      url: '../add_address/index?addrId=' + addrId,
    })
  },

  getAddr: function () {
    if (!app.checkIfLogin()) {
      return
    }
    var customIndex = app.AddClientUrl("/get_login_user_address_list.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    //拿custom_page 
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-------地址---------')
        console.log(res.data)
        if (res.data.result.errcode == '-1') {
          console.log('err')
          app.echoErr(res.data.result.errMsg)
        } else {
        
            that.setData({ addrArr: res.data.result })
          
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  // 添加一个地址到
  subMitArrFrom: function (e) {
    console.log(this.needParam)
    var that = this
    /* 判断地址是否有空的 */
    let pass = this.dellAddrSpace(this.needParam)
    if (pass == '0') {
      /* 判断是编辑还是新增 */
      var customIndex = null
      if (!this.data.ifEid) {
        customIndex = app.AddClientUrl("/add_address.html", that.needParam, 'post')
      }
      else {
        customIndex = app.AddClientUrl("/edit_address.html", that.needParam, 'post')
      }


      // wx.showLoading({
      //   title: 'loading',
      //   mask: true
      // })
      app.showToastLoading('loading', true)

      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          app.addrEditParam = that.needParam
          wx.navigateBack()
        },
        fail: function (res) {
          wx.hideLoading()
          app.loadFail()
        }
      })
    } else {
      wx.showToast({
        title: pass,
        image: '/images/icons/tip.png',
        duration: 2000
      })
    }

  },
  clickCatch: function (e) {
    console.log(e.currentTarget.dataset.info)
    var info = e.currentTarget.dataset.info;
    console.log(info)
    let latitude = info.latitude;
    let longitude = info.longitude;
    let name = info.name;
    let address = info.address;
    // 判断金纬度是否为空
    if (latitude == "" || longitude == "") {
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
  onLoad: function (option) {
    var that = this
    console.log("========app.setting======", app.setting)
    console.log("========option======", option)
    console.log("========properties======", app.properties)
    // 查找缓存(先暂时把id当成桌号，后台暂时没有配置桌号，后面再去改)
    try {
      var tableID = wx.getStorageSync('tableID')
      if (tableID && tableID!="") {
          this.setData({
            tableID: tableID
          })
      }
    } catch (e) {
     
    }
    console.log("=========tableID===========", tableID)
    that.setData({ setting: app.setting, loginUser: app.loginUser, properties: app.properties})
    console.log("==================option===================", option.orderNo)
    let orderData = option.orderNo
  //  获取订单号
    if (!!orderData && orderData!=""){
      this.data.orderNo = orderData
      this.setData({
        orderData: orderData
      })
      that.getEditOrderDetail();
      that.getParac();
      console.log("===================", this.data.orderData)
    }
  },
  gainUserLocation:function(){
    let that=this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        // success  
        console.log("===wx.getLocation===", res)
        var longitude = res.longitude
        var latitude = res.latitude
        that.needParam.longitude = longitude
        that.needParam.latitude = latitude
        that.setData({ needParam: that.needParam })
      },
      fail: function (res) {
        // fail  
        console.log("===wx.getLocatiofailn===", res)
        wx.openSetting({
          success: function (res) {
            if (res.authSetting["scope.userLocation"] == true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000
              })
              //再次授权，调用wx.getLocation的API
              that.gainUserLocation();
            } else {
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      },
      complete: function () {
        // complete  
        console.log("===wx.getLocationcomplete===")
      }
    })
  },
  getUserLocation:function(){
    let that=this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    res.authSetting = {
                      "scope.userLocation": true,
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API
          console.log("用户首次进入页面", res)
          that.gainUserLocation();
        }
        else {
          console.log('授权成功')
          //调用wx.getLocation的API
          that.gainUserLocation();
        }
      }
    })
  },
  tolinkUrl: function (e) {
    if(!app.loginUser){
      wx.showModal({
        title: '提示',
        content: '主人~您还在登陆哦!稍等片刻',
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
    let that=this;
    let linkUrl = e.currentTarget.dataset.link
    if (linkUrl.indexOf("nearby_stores.html")!=-1) {
      console.log("选择门店")
      that.setData({ reqStore: true })
    } else {
      that.setData({ reqStore: false })
    }
    app.linkEvent(linkUrl)
  },
  selectType:function(e){
    console.log("====selectType====",e)
    let that=this;
    let type = e.currentTarget.dataset.type;
    if (that.data.allowMendianZiti == 3 && type==0){
      wx.showModal({
        title: '提示',
        content: '主人~您的订单不支持配送上门哦！',
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
    that.setData({
      mendianZiti: type
    })
    that.getEditOrderDetail();
  },
  // 1提货人
  contactNameInput: function (e) {
    let that=this;
    console.log("提货人", e.detail.value)
    that.orderMessage.contactName = e.detail.value
    that.setData({
      orderMessage: that.orderMessage
    })
  },
  // 1.提货人手机号
  contactTelnoInput: function (e) {
    let that=this;
    console.log("提货人手机号", e.detail.value)
    that.orderMessage.contactTelno = e.detail.value
    that.setData({
      orderMessage: that.orderMessage
    })
  },
  check:function(){
    if (this.data.allowMendianZiti=="3"){
      this.setData({
        mendianZiti: 0
      })
    }else{
      this.setData({
        mendianZiti: 1
      })
    }
    console.log(this.data.mendianZiti)
    this.getEditOrderDetail();
  },
  uncheck:function(){
    console.log(this.data.allowMendianZiti)
    if (this.data.allowMendianZiti == "3") {
      this.setData({
        mendianZiti: 1
      })
    } else {
      this.setData({
        mendianZiti: 0
      })
    }
    console.log(this.data.mendianZiti)
    this.getEditOrderDetail();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loadMessage: function () {
    this.orderMessage.platformNo = app.setting.platformSetting.platformNo
    this.orderMessage.userId = app.loginUser.id
    this.orderMessage.orderNo = this.data.orderData.orderNo
    if (this.data.orderData.orderJifen && this.data.orderData.orderJifen.tuijianDikou && this.data.jifenState){
      this.orderMessage.jifenDikou = this.data.orderData.orderJifen.tuijianDikou
    }
    this.orderMessage.gotCouponListId = this.data.gotCouponListId
    this.orderMessage.addressId = this.data.orderData.addressId
    this.orderMessage.contactName = this.data.orderData.contactName||"",
    this.orderMessage.contactTelno = this.data.orderData.contactTelno || "",



    console.log('----------------------------')
    console.log(this.orderMessage)
    console.log('----------------------------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  hasEditAddr: false,
  onShow: function () {
    let that = this;
    that.getUserLocation();
    if (!!that.data.orderNo) {
      //this.getEditOrderDetail()
      that.getAddr()
    }
    if (that.data.hasAddnewAddr) {
      that.showOtherArr()
      // this.getAddr()
    }
    let addrEditParam = app.addrEditParam
    if (addrEditParam && this.hasEditAddr) {
      console.log(addrEditParam)
      that.changOutAddr(addrEditParam);
    }
    if (that.data.reqStore){
      //选择门店
      console.log("从附近店铺页面返回")
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      console.log(currPage) //就可以看到data里mydata的值了
      if (that.data.selectStore) {
        console.log("选择门店了", that.data.selectStore)
        that.setData({ belongMendian: that.data.selectStore })
        that.orderMessage.changeOrderMendianId = that.data.selectStore.id
      }else{
        console.log("没选择门店")
      }
    }
    if (that.data.reqAddress) {
      //选择门店
      console.log("从添加地址页面返回")
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      console.log(currPage) //就可以看到data里mydata的值了
      if (that.data.selectAddress) {
        console.log("保存好了地址", that.data.selectAddress)
        let selectAddr = that.data.selectAddress
        that.changeAddressData(selectAddr.id)
        let newData = that.data.orderData
        newData.buyerName = selectAddr.contactName
        newData.buyerTelno = selectAddr.telNo
        newData.buyerProvince = selectAddr.province
        newData.buyerCity = selectAddr.city
        newData.buyerArea = selectAddr.area
        newData.buyerAddress = selectAddr.address
        newData.addressId = selectAddr.id
        that.orderMessage.addressId = selectAddr.id
        that.setData({
          orderData: newData,
        })
      } else {
        console.log("取消保存地址")
      }
    }
  },
  changOutAddr: function (addrEditParam) {
    app.addrEditParam = null
    this.hasEditAddr = false
    let orderData = this.data.orderData
    orderData.buyerName = addrEditParam.contactName
    orderData.buyerTelno = addrEditParam.telno
    orderData.buyerProvince = addrEditParam.province
    orderData.buyerCity = addrEditParam.city
    orderData.buyerArea = addrEditParam.district
    orderData.buyerAddress = addrEditParam.detail

    this.orderMessage.addressId = addrEditParam.addressId

    this.setData({
      orderData: orderData
    })

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