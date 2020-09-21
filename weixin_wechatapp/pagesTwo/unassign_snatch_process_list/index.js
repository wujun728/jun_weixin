
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    processList: [],
    currentIndex:0,
    tabItem:[],
    localPoint: { longitude: 0, latitude:0}
  },
  tabItem:[
    { text: "派单中", state: 0, params: { instanceStatus: 0 }},
    { text: "服务中", state: 1, params: { instanceStatus: 1 }},
    { text: "已完成", state: 2, params: { instanceStatus: 2 } },
    { text: "已取消", state: 3, params: { instanceStatus: 3 } }
  ],
  changeStateProcess:function(e){
    let that=this;
    console.log("===changeStateProcess===",e)
    let index = e.currentTarget.dataset.index
    that.listPage.page = 1
    that.setData({ currentIndex:index})
    that.getProcessList();
  },
  /* 获取可抢单数据 */
  getProcessList: function () {
    let that = this
    if (!app.checkIfLogin()) return;
    let getParams = {}
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })
    getParams.page = that.listPage.page;
    getParams.instanceStatus = that.data.currentIndex;
    let customIndex = app.AddClientUrl("/wx_get_servant_unassign_snatch_process_instance_list.html", getParams)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getProcessList-res===',res)
        let data = res.data;
        if (typeof (res.data)=='string'){
          data = JSON.parse(res.data)
        }
        if (data.errcode == 0){
          that.listPage.pageSize = data.relateObj.pageSize
          that.listPage.totalSize = data.relateObj.totalSize
          let dataArr = that.data.processList
          if ((!data.relateObj.result || data.relateObj.result.length == 0) || that.listPage.page==1) {
            dataArr = null;
            that.setData({ processList: [] })
          } 
          dataArr = (dataArr || []).concat(data.relateObj.result)
          that.setData({ processList: dataArr })
          if (dataArr){
            wx.hideToast()
          }
        }
        console.log('===processList===', that.data.processList);
      },
      complete: function (res) {

      }
    })
  },
  getProcessDetail: function (processId, callback) {
    console.log('==processId==', processId)
    let that = this
    let params={};
    params.processInstanceId = processId
    let customIndex = app.AddClientUrl("/wx_get_process_instance_detail.html", params)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getProcessDetail-res===', res)
        if (res.data.errcode == 0) {
          if (callback) { callback(res)};
          that.setData({ processList: dataArr })
        }
      },
      complete: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params:{},
  onLoad: function (options) {
    console.log('===options===', options)
    let that=this;
    that.setData({ tabItem: that.tabItem})
    if (options && options.actionEvent){
      let params = JSON.parse(options.actionEvent)
      that.doAction(params)
    }
    that.params=options;
    let localPoint = that.data.localPoint
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('==getLocation==', res)
        localPoint.latitude = res.latitude
        localPoint.longitude = res.longitude
        that.setData({
          localPoint: localPoint
        })
        that.getProcessList()
      }
    })
    // that.getProcessList();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    that.setData({setting: app.setting, loginUser: app.loginUser })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    that.getProcessList();
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
    this.getProcessList();
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
      this.getProcessList();
    }
  },

})