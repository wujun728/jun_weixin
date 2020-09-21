// pages/fx_users/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatUserList:[],
  },
  tolinkUrl: function (data) {
    let that=this;
    console.log("data",data)
    let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
    let id = data.currentTarget ? data.currentTarget.dataset.id : data;
    let chatUserList= that.data.chatUserList
    if (id){
      for (let i = 0; i < chatUserList.length;i++){
        if (chatUserList[i].id==id){
          chatUserList[i].unreadCount=0
        }
      }
    }
    that.setData({ chatUserList: chatUserList})
    console.log("==linkUrl===", linkUrl)
    app.linkEvent(linkUrl)
  },
  getChatUserListFun: function (options) {
    let that=this;
    let getParam = {}
    getParam.page = this.listPage.page
    let customIndex = app.AddClientUrl("/wx_find_chat_users.html", getParam)
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
        for (let i = 0; i < data.length; i++) {
          data[i].lastChatTime = data[i].lastChatTime.replace(/-/ig, "/")
        }
        if(!data){
          return
        }
        if (data.length == 0 && that.data.chatUserList.length == 0 && that.listPage.curPage){
          that.setData({ chatUserList:null })
        } else{
          // 获取到的数据要添加进原先的数据
          let newList = that.data.chatUserList;
          if (that.listPage.curPage != 1){
            newList = newList.concat(data);
          }else{
            newList = data
          }
          console.log(newList);
          that.setData({ chatUserList: newList})
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
    this.getChatUserListFun(options)
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      properties: app.properties
    })
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
    this.getChatUserListFun(this.options);

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
      this.getChatUserListFun(this.options);
    }
  },


})