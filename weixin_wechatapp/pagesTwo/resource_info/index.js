
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resourceGainInfo: [],
    moneyAmount: 0,
    properties: {},
    resourceValidateInput:"",
  },
  toIndex:function(){
    app.toIndex()
  },
  saveSearchValue:function(e){
    console.log("====saveSearchValue====",e)
    let that=this;
    that.setData({ resourceValidateInput: e.detail.value})
  },
  /* 获取数据 */
  setNavColor: function () {
    console.log('setNavColor', app.setting)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.setting.platformSetting.defaultColor

    })
  },
  setNav: function (name) {
    console.log('setNav', app.setting)
    wx.setNavigationBarTitle({
      title: name,
    })
  },
  getResourceGainInfo: function (paramData) {
    let params = paramData || {}
    let that = this
    let customIndex = app.AddClientUrl("/wx_get_resource_gain_info.html", params, 'post')
    wx.request({
      url: customIndex.url, //仅为示例，并非真实的接口地址
      data: customIndex.params,
      header: app.headerPost,
      success: function (res) {
        console.log('===========getResourceGainInfo============', res)
        if (res.data.errcode == 0) {
          console.log(res.data.relateObj)
          that.setData({ resourceGainInfo: res.data.relateObj})
          that.setNavColor();
          that.setNav(res.data.relateObj.resourceTypeStr+"领取")
          let resourceValidated = res.data.relateObj.resourceValidated;
          if (resourceValidated > 0) {
            app.linkEvent(res.data.relateObj.resourceValidatedLink)
          } 
        } else {
          console.log("接口错误")
        }

      },
      fail: function (res) {

      }
    })
  },
  gainResourceFun: function () {
    let that = this
    let params = that.params;
    if (!that.data.resourceValidateInput){
      wx.showModal({
        title: '提示',
        content: "请输入"+that.data.resourceGainInfo.resourceHideTip+"领取",
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
    params = Object.assign({}, params, { resourceValidateInput: that.data.resourceValidateInput})
    let customIndex = app.AddClientUrl("/wx_validate_resource_gain_info.html", params, 'post')
    wx.request({
      url: customIndex.url, //仅为示例，并非真实的接口地址
      data: customIndex.params,
      header: app.headerPost,
      success: function (res) {
        console.log('===========gainResourceFun============', res)
        if (res.data.errcode == 0) {
          app.linkEvent(that.data.resourceGainInfo.resourceValidateSuccessRedirectLink)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.errMsg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      },
      fail: function (res) {

      }
    })
  },
  loginSuccess: function (user) {
    console.log("pre apply mendian login success call back!", user);
    this.checkState();
  },
  loginFailed: function (err) {
    console.log("login failed!!");

  },
  checkState: function () {
    console.log('======checkState.loginUser======', app.loginUser)
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    this.getResourceGainInfo(this.params);
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
  params:{

  },
  conut: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.params = options
    if (app.loginUser) {
      this.checkState();
    } else {
      app.addLoginListener(this);
      app.showToastLoading('loading', true)
      console.log("====setTimeout1=====")
      that.setTimeoutLogin(that.conut)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, properties: app.properties })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.reflesh == 1) {
      this.onPullDownRefresh()
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
    this.onLoad()
    wx.stopPullDownRefresh()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})