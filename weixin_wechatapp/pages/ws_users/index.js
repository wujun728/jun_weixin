// pages/fx_users/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[],
    allNum:0,
  },
  get_ws_users: function (options) {
    let url;
    if (options && options.wsType == 1){
      url ="/wx_get_fx_group_leader_children.html"
    } else if ((options && options.wsType == 2)){
      url = "/wx_get_fx_group_children.html"
    }
    console.log('-------分销人--------')
    let getParam = {}
    getParam.page = this.listPage.page
    var customIndex = app.AddClientUrl(url, getParam )
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
       
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize
        that.setData({ allNum: that.listPage.totalSize})
        let data = res.data.relateObj.result
        if(!data){
          return
        }
        if (data.length == 0 && that.data.List.length == 0){
          that.setData({ List:null })
        }else{
          // 获取到的数据要添加进原先的数据
          let newList = that.data.List;
          newList = newList.concat(res.data.relateObj.result);
          console.log(newList);
          for (let i = 0; i < newList.length;i++){
            newList[i].lastestLoginTime = newList[i].lastestLoginTime.slice(0,-9)
          }
          that.setData({ List: newList})
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
  options:{},
  onLoad: function (options) {
    console.log("===options===", options)
    this.options = options
    this.get_ws_users(options)
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
    this.data.favouriteList = []

    this.listPage.page = 1
    this.get_ws_users(this.options);

    wx.stopPullDownRefresh()
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.get_ws_users(this.options);
    }
  },


})