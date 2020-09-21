
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    servantTargetRelatesList: [],
    currentIndex: 0,
    tabItem: [],
    localPoint: { longitude: 0, latitude: 0 },
    grabOrderState: false,
  },
  reqUrl:'',
  typeData:1,
  tabItem: [
    { text: "关注我的", state: 0, params: { instanceStatus: 1 } },
    { text: "我关注的", state: 1, params: { instanceStatus: 2 } },
    { text: "相互关注", state: 2, params: { instanceStatus: 3 } },
  ],
  tabItemTwo: [
    { text: "关注我的", state: 0, params: { instanceStatus: 2 } },
    { text: "我关注的", state: 1, params: { instanceStatus: 1 } },
    { text: "相互关注", state: 2, params: { instanceStatus: 3 } },
  ],
  changeStateRelates: function (e) {
    let that = this;
    console.log("===changeStateRelates===", e)
    let index = e.currentTarget ? e.currentTarget.dataset.index : e
    that.listPage.page = 1
    that.setData({ currentIndex: index })
    that.getServantTargetRelatesList();
  },
  /* 组件事件集合 */
  tolinkUrl: function (data) {
    let that = this;
    let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
    console.log("==linkUrl===", linkUrl)
    if (linkUrl.indexOf("unassign_snatch_process_list") != -1) {
      that.setData({ grabOrderState: true })
    }
    app.linkEvent(linkUrl)
  },
  // 关注
  focusSomeOne: function (e) {
    console.log("===focusSomeOne==",e)
    let doAction = e.currentTarget.dataset.ation
    let toTargetId = e.currentTarget.dataset.id
    var that = this;
    let params = { type: that.typeData, toTargetId: toTargetId,doAction:doAction}
    var customIndex = app.AddClientUrl("/wx_set_servant_target_relate.html", params, 'post')
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log("==getServantDetail===", res.data)
        if (res.data.errcode == '0') {
          let content=""
          if (doAction==1){
            content ="你已关注成功~"
          }else{
            content = "你已取消关注成功~"
          }
          let servantDetail = res.data.relateObj;
          wx.showModal({
            title: '',
            content: content,
          })

        } else {
          wx.showModal({
            title: '失败了',
            content: '请求失败了，请下拉刷新！',
          })

        }
      }
    })
  },
  /* 获取数据 */
  getServantTargetRelatesList: function () {
    let that = this
    if (!app.checkIfLogin()) return;
    let getParams = {}
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })
    getParams.page = that.listPage.page;
    getParams['type'] = that.data.tabItem[that.data.currentIndex].params.instanceStatus;
    let customIndex = app.AddClientUrl(that.reqUrl, getParams)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getServantTargetRelatesList-res===', res)
        let data = res.data;
        if (typeof (res.data) == 'string') {
          data = JSON.parse(res.data)
        }
        if (data.errcode == 0) {
          that.listPage.pageSize = data.relateObj.pageSize
          that.listPage.totalSize = data.relateObj.totalSize
          let dataArr = that.data.servantTargetRelatesList
          if ((!data.relateObj.result || data.relateObj.result.length == 0) || that.listPage.page == 1) {
            dataArr = null;
            that.setData({ servantTargetRelatesList: [] })
          }
          dataArr = (dataArr || []).concat(data.relateObj.result)
          that.setData({ servantTargetRelatesList: dataArr })
          if (dataArr) {
            wx.hideToast()
          }
        }
        console.log('===servantTargetRelatesList===', that.data.servantTargetRelatesList);
      },
      complete: function (res) {

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
    this.getServantTargetRelatesList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params: {},
  conut: 1,
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
  onLoad: function (options) {
    let that=this;
    console.log('===options===', options)
    that.typeData = options.type
    let tabItem = ''
    if (options.type==1){
      that.reqUrl ='/wx_find_servant_target_relates_by_servant.html'
      tabItem = that.tabItemTwo
    } else {
      that.reqUrl = '/wx_find_servant_target_relates_by_servant_target.html'
      tabItem = that.tabItem
    }
    that.setData({ tabItem: tabItem},function(){
      if (app.loginUser) {
        that.checkState();
      } else {
        app.addLoginListener(that);
        app.showToastLoading('loading', true)
        console.log("====setTimeout1=====")
        that.setTimeoutLogin(that.conut)
      }
    })
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      properties: app.properties,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    if (that.data.grabOrderState) {
      that.getServantTargetRelatesList();
      that.setData({ grabOrderState: false })
    }
    // if (this.data.reflesh == 1) {
    //   this.onPullDownRefresh()
    // }
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
    this.listPage.page = 1
    this.getServantTargetRelatesList();
    app.get_session_userinfo()
    wx.stopPullDownRefresh()
  },


  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    var that = this
    if (that.listPage.totalSize > that.listPage.page * that.listPage.pageSize) {
      that.listPage.page++
      that.getServantTargetRelatesList();
    }
  },

})