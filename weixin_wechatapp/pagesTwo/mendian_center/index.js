// pages/fx_center/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      setting: {},
      loginUser: null,
      properties: {},
        mendian: {
            account: {
                account: 0,
            },
            totalEarningAmount: 0.00,
            totalTixianAmount: 0.00,
            waitCompleteOrderDistributeAmount: 0.00
        },
        applyMendianType:true,
    },
    /* 组件事件集合 */
    tolinkUrl: function (e) {
      let linkUrl = e.currentTarget? e.currentTarget.dataset.link:e
      app.linkEvent(linkUrl)
    },
    submitFormId: function (e) {
        this.toApplyForFacilitator(e);
    },

    getMendianInfo: function () {
        console.log('-------门店-1-------')
        let params = {}
        var customIndex = app.AddClientUrl("/ge_manager_mendian_info_admin_mendian_json.html", params, 'post')
        var that = this
        // wx.showLoading({
        //     title: 'loading'
        // })
        app.showToastLoading('loading', true)
        wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
                console.log(res.data)
                if (res.data.errcode == '0') {
                    let mendian = res.data.relateObj
                    mendian = that.dellMoney(mendian)
                    //account 账户余额
                    that.setData({
                        mendian: mendian
                    })
                    that.setNav(mendian)
                } else {
                    wx.showModal({
                        title: '失败了',
                        content: '请求失败了，请下拉刷新！',
                    })

                }
            }
        })
    },
    getMendianInfo: function () {
        console.log('-------门店-1-------')
        let params = {}
        var customIndex = app.AddClientUrl("/ge_manager_mendian_info_admin_mendian_json.html", params, 'post')
        var that = this
        // wx.showLoading({
        //     title: 'loading'
        // })
        app.showToastLoading('loading', true)
        wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
                console.log(res.data)
                if (res.data.errcode == '0') {
                    let mendian = res.data.relateObj
                    mendian = that.dellMoney(mendian)
                    //account 账户余额
                    that.setData({
                        mendian: mendian
                    })
                    that.setNav(mendian)
                } 
                else {
                    wx.showModal({
                        title: '失败了',
                      content: res.data.errMsg,
                    })

                }

                wx.hideLoading()
            },
          fail: function (res) {
            wx.showModal({
              title: '失败了',
              content: '请求失败了，请下拉刷新！',
            })
            wx.hideLoading()
            app.loadFail()
            }
        })
    },
    dellMoney: function (mendian) {
        mendian.account.account = app.toFix(mendian.account.account)
        mendian.totalEarningAmount = app.toFix(mendian.totalEarningAmount)
        mendian.totalTixianAmount = app.toFix(mendian.totalTixianAmount)
        mendian.waitCompleteOrderDistributeAmount = app.toFix(mendian.waitCompleteOrderDistributeAmount)
        return mendian
    },
  setNavColor: function () {
    console.log('setNavColor', app.setting)
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: app.setting.platformSetting.defaultColor

      })
    },
    setNav: function (mendian) {
      console.log('setNav', app.setting)
        wx.setNavigationBarTitle({
            title: mendian.name,
        })
    },
    //扫一扫 登录后台
    toLoginBackstage: function (e) {
      console.log("toLoginBackstage",e)
        wx.scanCode({          
            onlyFromCamera: true,
            success: (scanRes) => {
              let params = {}
              var customIndex = app.AddClientUrl("/wx_mini_scan_uuid.html", params, 'post')
                if (scanRes.errMsg == 'scanCode:ok') {
                    let {result} = scanRes
                    // 跳转-确认、取消登录页面
                    wx.navigateTo({
                        url: '/pages/scan_login/scan_login?scan_result=' + result,
                        success(data){
                            wx.request({
                                url: customIndex.url,
                                data: customIndex.params,
                                header: app.headerPost,                                
                                method: 'POST',
                                success: function (res) {
                                    console.log('扫码成功')
                                },
                                fail: function (res) {

                                }
                            })
                        }
                    })
                }
                
            }
        })
    },
  //扫一扫 核销
  getVerificationCode: function (e) {
    console.log("getVerificationCode", e)
    wx.scanCode({
      onlyFromCamera: true,
      success: (scanRes) => {
        console.log("getVerificationCode", scanRes)
        wx.navigateTo({
          url: "/"+scanRes.path
        })
      }
    })
  },
    //跳转到申请服务商web页面
    toApplyForFacilitator: function (e) {
        wx.navigateTo({
            url: '/pages/apply_for_facilitator/apply_for_facilitator?formId=' + e.detail.formId
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
    this.setNavColor()
    this.getMendianInfo()
    if (!app.loginUser.platformUser.managerMendianId) {
      console.log("=========没有管理店铺=========")
      this.setData({ applyMendianType: false })
      return
    }else{

    }
  },
  conut: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that=this;
      console.log('======app.loginUser======', app.loginUser)
      console.log('====== app.setting======', app.setting)
      if (app.loginUser) {
        this.checkState();
      } else {
        app.addLoginListener(this);
        // wx.showLoading({
        //   title: 'loading'
        // })
        app.showToastLoading('loading', true)
        console.log("====setTimeout1=====")
        that.setTimeoutLogin(that.conut)
      }
      this.setData({
          setting: app.setting,
          loginUser: app.loginUser,
          properties: app.properties
      })
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
        this.onLoad()
        setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 2000)

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
})
