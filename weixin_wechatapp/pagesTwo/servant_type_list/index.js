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
      servantTypeList: {},
      showMask: false,
      setPrice:0,
    },
    sureSetPriceState: false,
    params:{
      servantTypeId: 0,
      doAction: 0,
      servantPrice:0
    },
    /* 组件事件集合 */
    tolinkUrl: function (e) {
      let linkUrl = e.currentTarget? e.currentTarget.dataset.link:e
      app.linkEvent(linkUrl)
    },
    switchChange:function(e){
      console.log("====switchChange====",e)
      let that = this;
      that.params.servantTypeId = e.currentTarget.dataset.item.id
      that.params.servantPrice = e.currentTarget.dataset.item.price
      that.params.doAction = e.detail.value ? 1 : 2;
      if (that.params.doAction == 1 && that.params.servantPrice!=0){
        that.setData({ showMask: true, setPrice: that.params.servantPrice })
      }else{
        that.setServantTypes()
      }
    },
    modifyPriceFun:function(e){
      console.log("====modifyPriceFun====", e)
      let that=this;
      that.params.servantTypeId = e.currentTarget.dataset.item.id
      that.params.servantPrice = e.currentTarget.dataset.item.price
      that.params.doAction =1
      if (that.params.servantPrice != 0){
        that.setData({ showMask: true, setPrice: that.params.servantPrice })
      }
    },
    sureSetPriceFun:function(e){
      console.log("====sureSetPriceFun====",e)
      let that=this;
      that.params.servantPrice = e.detail.value.servantPrice;
      if (!that.params.servantPrice){
        wx.showToast({
          title: '请填写价格~',
          icon: 'none',
          duration: 2000,
        })
        return
      } else {
        that.setServantTypes()
      }
    },
    closeZhezhao: function () {
      let that=this;
      let servantTypeList = that.data.servantTypeList
      if (!that.sureSetPriceState){
        console.log()
        for (let i = 0; i < servantTypeList.length; i++) {
          if (that.params.servantTypeId == servantTypeList[i].id) {
            servantTypeList[i].subscribe = servantTypeList[i].subscribe
          }
        }
      }else{
        that.sureSetPriceState=false
      }
      that.setData({ showMask: false, servantTypeList: servantTypeList, })
    },
    setServantTypes: function () {
      console.log('-------设置服务对象分类(资料库)-------')
      let that=this;
      var customIndex = app.AddClientUrl("/servant_set_servant_type_relate.html", that.params, 'post')
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (res.data.errcode == '0') {
            wx.hideLoading()
            that.sureSetPriceState = true
            let servantTypeList = that.data.servantTypeList
            // let servantType = res.data.relateObj
            for (let i = 0; i < servantTypeList.length;i++){
              if (that.params.servantTypeId == servantTypeList[i].id) {
                servantTypeList[i].subscribe = that.params.doAction==1?1:0;
                // servantTypeList.splice(i, 1, servantType)
              }
            }
            that.setData({
              servantTypeList: servantTypeList,
            },function(){
              that.closeZhezhao()
            })
          }
          else {
            wx.showModal({
              title: '失败了',
              content: res.data.errMsg,
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '失败了',
            content: '请求失败了!',
          })
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    getServantTypes: function () {
      console.log('-------服务对象分类(资料库)-------')
      let params = {}
      var customIndex = app.AddClientUrl("/find_servant_types.html", params, 'post')
      var that = this
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (res.data.errcode == '0') {
            let servantTypeList = res.data.relateObj.result
            that.setData({
              servantTypeList: servantTypeList
            })
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
    setNavColor: function () {
      console.log('setNavColor', app.setting)
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: app.setting.platformSetting.defaultColor
      })
    },
    setNav: function (servantInfo) {
      console.log('setNav', app.setting)
      wx.setNavigationBarTitle({
        title: '服务类型',
        // servantInfo.name
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
      this.getServantTypes()
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
