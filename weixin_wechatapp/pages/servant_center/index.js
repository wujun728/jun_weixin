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
        servant: {
            account: {
                account: 0,
            },
            totalEarningAmount: 0.00,
            totalTixianAmount: 0.00,
            waitCompleteOrderDistributeAmount: 0.00
        },
        applyServantType: true,
        servantStatusShapColor:"#2dbe53",
        servantStatusText: "在线",
        showStatusList:false,
    },
    changeServantStatus:function(e){
      console.log("==============changeServantStatus===============",e)
      let status = e.currentTarget.dataset.type
      let params = { status: status}
      var customIndex = app.AddClientUrl("/wx_set_servant_status.html", params, 'post')
      var that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          console.log("=============success=============",res.data)
          that.showStatusListFun()
          if (res.data.errcode == '0') {
            let servant = res.data.relateObj
            that.setServantStatus(servant)
          } else {
            wx.showModal({
              title: '失败了',
              content: '请求失败了，请下拉刷新！',
            })

          }
        }
      })
    },
  setServantStatus: function (servant){
    let that=this;
    if (servant.status == 2) {
      that.setData({ servantStatusShapColor: "#999", servantStatusText: "下线" })
    } else if (servant.status == 3) {
      that.setData({ servantStatusShapColor: "#ed5254", servantStatusText: "繁忙" })
    } else if (servant.status == 4) {
      that.setData({ servantStatusShapColor: "#ed5254", servantStatusText: "禁用" })
    } else if (servant.status == 0) {
      that.setData({ servantStatusShapColor: "#666", servantStatusText: "未审核" })
    } else if (servant.status == 1) {
      that.setData({ servantStatusShapColor: "#2dbe53", servantStatusText: "在线" })
    } else {

    }
    },
    showStatusListFun: function () {
      console.log("=====showStatusListFun=====")
      let animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out',
      })
      if (this.data.showStatusList) {
        animation.height(0).step();
        this.setData({ showStatusList: false })
      } else {
        animation.height(56).step();
        this.setData({ showStatusList: true })
      }
      this.setData({ animation: animation.export() })
    },
    /* 组件事件集合 */
    tolinkUrl: function (e) {
        let linkUrl = e.currentTarget.dataset.link
        app.linkEvent(linkUrl)
    },
    submitFormId: function (e) {
        this.toApplyForFacilitator(e);
    },

    getservantInfo: function () {
      console.log('-------门店-1-------')
      let params = {}
      var customIndex = app.AddClientUrl("/super_shop_manager_get_manager_servant_info.html", params, 'post')
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
            wx.hideLoading()
                console.log(res.data)
                if (res.data.errcode == '0') {
                    let servant = res.data.relateObj
                    that.setServantStatus(servant)
                    servant = that.dellMoney(servant)
                    //account 账户余额
                    that.setData({
                        servant: servant
                    })
                    that.setNav(servant)
                } else {
                  wx.showModal({
                        title: '失败了',
                      content: res.data.errMsg,
                    })

                }
            }
        })
    },
    /* 组件事件集合 */
    tolinkUrl: function (e) {
        let linkUrl = e.currentTarget.dataset.link
        app.linkEvent(linkUrl)
    },
    dellMoney: function (servant) {
      if (servant.account && servant.account.account){
        servant.account.account = app.toFix(servant.account.account)
      }else{
        servant.account = { account:app.toFix(0)} 
      }
      servant.realizedParentServiceProfit = app.toFix(servant.realizedParentServiceProfit)
      servant.realizedServiceProfit = app.toFix(servant.realizedServiceProfit)
        return servant
    },
    setNavColor:function(){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: app.setting.platformSetting.defaultColor

      })
    },
    setNav: function (servant) {
      console.log('app.setting', app.setting)
        wx.setNavigationBarTitle({
            title: servant.name,
        })
    },
    //扫一扫 登录后台
    toLoginBackstage: function (e) {
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
    let that=this
    console.log('======checkState.loginUser======', app.loginUser)
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    this.setNavColor()
    this.getservantInfo()
    if (!app.loginUser.platformUser.managerServantId) {
      console.log("=========没有归属服务员=========")
      this.setData({ applyServantType: false })
      return
    }
  },
  conut:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that=this;
      console.log('======app.loginUser======', app.loginUser)
      if (app.loginUser) {
        that.checkState();
      } else {
        // wx.showLoading({
        //   title: 'loading'
        // })
        app.showToastLoading('loading', true)
        app.addLoginListener(that);
        console.log("====setTimeout1=====")
        that.setTimeoutLogin(that.conut)
      }
      that.setData({
        setting: app.setting,
        loginUser: app.loginUser,
         
      })
    },
  setTimeoutLogin: function (conuData){
    let that = this;
    console.log("====setTimeout-init=====", conuData)
    that.conut = conuData ;
    that.conut +=2;
    if (that.conut<=5){
      setTimeout(function () {
        if (app.loginUser) {
          wx.hideLoading()
        } else {
          that.setTimeoutLogin(that.conut)
        }
      }, that.conut * 1000)
    }else{
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
