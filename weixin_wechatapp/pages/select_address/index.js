
const app = getApp()
Page({

  data: {
    setting: null,
    loginUser: null,
    addrData:null,
    selectAddressData:{},
    reqLocation:false,
  },  
  getLocationAddress: function () {//获取当前地址
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("=====getLocationAddress====", res)
        let latitude = res.latitude
        let longitude = res.longitude
        console.log(longitude + "..............." + latitude)
        // 获取附近店铺数据
        let pageParam = {
          "longitude": longitude,
          "latitude": latitude,
        }
        console.log(pageParam)
        that.getLoctionAddr(pageParam)
      }
    })
  },
  getLoctionAddr: function (pageParam) {//根据当前经纬度获取当前详细地址
    var that = this
    var param = {}
    param.longitude = pageParam.longitude
    param.latitude = pageParam.latitude
    param['type'] = 1
    var customIndex = app.AddClientUrl("/get_location_detail.html", param, 'get')
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====getLoctionAddr====", res.data)
        let data = res.data.result
        let params = {
          longitude: pageParam.longitude,
          latitude: pageParam.latitude,
          province: data.addressComponent ? data.addressComponent.province : data.address_component.province,
          city: data.addressComponent ? data.addressComponent.city : data.address_component.city,
          street: data.addressComponent ? data.addressComponent.street : data.address_component.street,
          value: data.pois ? data.pois[0].title : data.formatted_addresses.recommend,
          // value: data.formatted_address || data.formatted_addresses.recommend,
        }
        console.log("====params=====", params)
        that.setLoctionAddr(params);
        that.setData({ selectAddressData: params })
        that.getNearMenDian(params)
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  selectAddressFun:function(e){//选择已存在的用户地址
    console.log("======e=======",e);
    let that=this;
    let addressInfo;
    if (e.currentTarget) {
      addressInfo = e.currentTarget.dataset.info;
    }else{
      addressInfo = e
    }
    let address = {
      longitude: addressInfo.longitude,
      latitude: addressInfo.latitude,
      province: addressInfo.province || '',
      city: addressInfo.city || '',
      street: addressInfo.area|| '',
      detailedAddress: addressInfo.address||'',
      community: addressInfo.community,
      value: addressInfo.community || addressInfo.address,
    }
    addressInfo = address
    that.setData({ selectAddressData: addressInfo})
    that.getNearMenDian(addressInfo)
    let params = {
      longitude: addressInfo.longitude,
      latitude: addressInfo.latitude,
    }
    if (addressInfo.province){
      params = Object.assign({}, params, {
        province: addressInfo.province,
        city: addressInfo.city,
        street: addressInfo.street || addressInfo.area,
      })
   }
    console.log("====params=====", params)
    that.setLoctionAddr(params)
  },
  setLoctionAddr: function (pageParam) {//设置地址
    let that = this
    let customIndex = app.AddClientUrl("/setLocation.html", pageParam, 'get')
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====setLoctionAddr====", res.data)
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //  附近门店取第一个
  getNearMenDian: function (addressInfo) {
    let that = this;
    let latitude = addressInfo.latitude
    let longitude = addressInfo.longitude
    let menDian = {
      longitude: longitude,
      latitude: latitude

    }
    let menDianYangShi = app.AddClientUrl("/find_mendians.html", menDian, 'get')
    wx.request({
      url: menDianYangShi.url,
      data: menDianYangShi.params,
      header: app.headerPost,
      method: 'GET',
      success: function (res) {
        console.log("===附近门店取第一个", res.data)
        if (res.data.errcode == "-1") {
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
        else {
          let firstMendian = res.data.relateObj.result;
          if (firstMendian.length!=0 && firstMendian[0].id) {
            // 当数据都存在，然后就开始设置门店
            that.setUpMenDian(firstMendian[0].id);
          }else{
            wx.showToast({
              title: "您附近没有相关门店哦!",
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
        }
      }
    })
  },
  // 设置门店（当门店信息都有的时候，将门店id传到服务器。）
  setUpMenDian: function (menDianID) {
    let that=this;
    let id = menDianID
    let menDianParameter = {
      mendianId: id
    }

    let menDianYangShi = app.AddClientUrl("/location_mendian.html", menDianParameter, 'get')
    wx.request({
      url: menDianYangShi.url,
      data: menDianYangShi.params,
      header: app.headerPost,
      method: 'GET',
      success: function (res) {
        console.log('=====setUpMenDian====',res)
        if (res.data.errcode == "-1") {
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
        else {
          console.log("设置成功", that.data.selectAddressData)
          wx.setStorageSync('selectAddressData', that.data.selectAddressData);
          let pages = getCurrentPages();//当前页面
          let prevPage = pages[pages.length - 2];//上一页面
          console.log("====prevPage===", prevPage)
          if (prevPage) {
            prevPage.onPullDownRefresh()
          }
          wx.navigateBack(
            { delta: 1, }
          )
        }
      }
    })
  },
/* 编辑 */
  writeAddr: function (e) {
    var addrId = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.addrData.length;i++){
      if (addrId == this.data.addrData[i].id){
        
        app.EditAddr = this.data.addrData[i]
      }
    }
    wx.navigateTo({
      url: '../add_address/index?addrId=' + addrId,
    })
  },
  tolinkUrl: function (e) {
    if (!app.loginUser) {
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
    let that = this;
    let linkUrl = e.currentTarget.dataset.link
    if (linkUrl.indexOf("select_location.html") != -1) {
      console.log("选择位置")
      that.setData({ reqLocation: true})
    } else {
      that.setData({ reqLocation: false })
    }
    app.linkEvent(linkUrl)
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
        if (res.data.result.errcode == '-1'){
          console.log('err')
          app.echoErr(res.data.result.errMsg)
        }else{
          that.setData({ addrData: res.data.result })
        }
        
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    this.getAddr()
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
    let that=this;
    that.getAddr()
    if (that.data.reqLocation) {
      let locationList = {};
      console.log("从选择地点页面返回", that.data.selectAddress)
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      console.log(currPage) //就可以看到data里mydata的值了
      if (that.data.selectAddress) {
        console.log("选择了地点")
        that.selectAddressFun(that.data.selectAddress)
      } else {
        console.log("没选择地点")
      }
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
    this.getAddr()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})