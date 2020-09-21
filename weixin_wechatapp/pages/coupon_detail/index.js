 
const app = getApp()
Page({ 

  /**
   * 页面的初始数据
   */ 

  data: {
    couponDetail:null,
    color:'#e2534d',
    couponUserState: true,
    couponEnableState: true,
    couponState: true,
    couponCountState: true,
    couponTimetState: true,
    clickStyle:'receive',
    showBtn:false,
  },
  getData: function () {
    let that = this
    let customIndex = app.AddClientUrl("/get_coupon_detail.html", that.optParam, 'get')
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data);
        that.setData({couponDetail: res.data.relateObj})
        if (that.data.couponDetail.isusing == 1) {
          console.log('可用')
          that.setData({ couponEnableState: true })//1可用
          that.setData({ color: '#e2534d' })

          if (that.data.couponDetail.userGotCoupon.length != 0) {
            that.setData({ clickStyle: 'used' })//点击类型
            that.setData({ couponState: true })//已领取
            wx.showToast({
              title: '你已经领过了',
              icon: 'success',
              duration: 2000
            })
            if (that.data.couponDetail.userGotCoupon[0].isUsed == 0) {
              that.setData({ couponUserState: true })//0未使用
              that.setData({ color: '#e2534d' })
            } else {
              that.setData({ couponUserState: false })//已使用
              that.setData({ color: '#E7E7E7' })
              that.setData({ clickStyle: 'noClick' })//点击类型
            }
          } else {
            that.setData({ couponState: false })//未领取
            that.setData({ clickStyle: 'receive' })
          }


        } else {
          console.log('不可用')
          that.setData({ couponEnableState: false })//不可用
          that.setData({ color: '#E7E7E7' })
          that.setData({ clickStyle: 'noClick' })//点击类型
          if (that.data.couponDetail.count!=0&&that.data.couponDetail.count <= that.data.couponDetail.gotCount) {
            that.setData({ couponCountState: false })//已领完
          } else {
            that.setData({ couponCountState: true })//已领完
          }
          let nowData = new Date();
          let couponData = that.data.couponDetail.endDate
          couponData = couponData.replace(/-/g, "/");
          couponData = new Date(couponData);
          console.log('===couponData===', couponData)
          console.log('===nowData===', nowData)
          let days1 = parseInt(couponData.getTime() / (1000 * 60 * 60 * 24));
          let days2 = parseInt(nowData.getTime() / (1000 * 60 * 60 * 24));
          console.log('===days1===', days1, days2)
          if (days1 > days2) {
            that.setData({ couponTimetState: true })//未到期
          } else {
            that.setData({ couponTimetState: false })//已到期
          }
        }
        console.log(that.data.couponDetail)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log('fail')
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  selectFun:function(){
    let that=this;
    if (that.data.clickStyle =='receive'){
      that.gainCoupon();
    } else if (that.data.clickStyle == 'used'){
      app.toIndex();
    }else{
      console.log('不可点击');
      return;
    }
  },
  gainCoupon: function () {
    let that = this
    let customIndex = app.AddClientUrl("/gain_coupon.html", that.optParam, 'post')
    console.log("customIndex", customIndex);
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      method: 'POST',
      header: app.headerPost,
      success: function (res) {
        console.log(res.data);
        if (res.data.errcode && res.data.errcode == -1) {
          console.log('===1====')
          wx.showToast({
            title: res.data.relateObj,
            icon: 'success',
            duration: 1000
          })
        } else if (!res.data.errcode){
          console.log('===2====')
          if (res.data.newGot == 0 && res.data.otherGot == 0) {
            wx.showToast({
              title: '你已经领过了',
              icon: 'success',
              duration: 1000
            })
          }
          else if (res.data.otherGot == 1) {
            wx.showToast({
              title: '已被别人领取',
              icon: 'success',
              duration: 1000
            })
          }
          else if (res.data.newGot == 1) {
            wx.showToast({
              title: '领取成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({ couponState: true })//已领取
            that.setData({ clickStyle: 'used' })//点击类型
          }
        }
      },
      fail: function (res) {
        console.log('fail')
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  toCouponList: function (event) {
    console.log("--------toCouponList------")
    wx.navigateTo({
      url: '../../pages/my_coupons/index',
    })
  },
  gotoGetCoupon: function () {
    wx.navigateTo({
      url: '../available_coupons/index',
    })
  },
  optParam: {}, // option数据 用来转发和刷新
  onLoad: function (options) {
    console.log("===options===",options)
    this.optParam = options;
    let showBtn=false;
    if (options.type=='jifen'){
      showBtn = false;
    }else{
      showBtn = true;
    }
    this.setData({
      showBtn: showBtn,
    });
    this.getData(options)
  },

  onReady: function () {
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      sysWidth: app.globalData.sysWidth,
      sysHeight: app.globalData.sysHeight,
    });
    console.log('setting', this.data.setting)
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
    this.getData(this.optParam )
    wx.stopPullDownRefresh()
  },

  
})