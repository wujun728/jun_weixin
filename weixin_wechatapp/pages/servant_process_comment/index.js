

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting: null,
    currentIndex: 0, //checkBox
    sysWidth: 320,//图片大小
    baseData:{},
    commentContent:"",
  },
  commentProcessData:{
    processInstanceId:"",
    commentContent:'',
    pingfen:0,
  },
  pingfenDataList: [
    { id: 1, state: 0, length: 1},
    { id: 2, state: 0, length: 2},
    { id: 3, state: 0, length: 3},
    { id: 4, state: 0, length: 4},
    { id: 5, state: 0, length: 5},
  ],
  selectPingFen:function(e){
    console.log("=======selectPingFen==========",e)
    let that=this;
    let currentIndex = e.currentTarget ? e.currentTarget.dataset.index:e;
    that.commentProcessData.pingfen = currentIndex;
    for (let i = 0; i < that.pingfenDataList.length;i++){
      if (i <currentIndex){
        that.pingfenDataList[i].state = 1
      }else{
        that.pingfenDataList[i].state = 0
      }
    }
    that.setData({
      currentIndex: currentIndex,
      pingfenDataList:that.pingfenDataList
    })
  },
  getCommitContent:function(e){
    console.log("======getCommitContent======",e)
    let that=this
    let value = e.detail.value;
    that.commentProcessData.commentContent = value
  },
  commitUpComment: function () {
    let that = this
    console.log('-------提交评论-------', that.commentProcessData)
    if (that.commentProcessData.pingfen == 0 || !that.commentProcessData.commentContent){
      wx.showModal({
        title: '提示',
        content: '主人~评价内容或评分请填写完整!',
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
    let customIndex = app.AddClientUrl("/wx_comment_process_instance.html", that.commentProcessData, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () { wx.navigateBack()  }, 2000);
        }else{
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
          setTimeout(function () { wx.navigateBack() }, 2000);
        }
      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("============options1========", options)
    let that=this;
    let baseData={
      servantName: options.servantName||"",
      servantIcon: options.servantIcon || "",
    }
    that.commentProcessData.processInstanceId = options.processInstanceId || ""
    if (options.pingfen){
      that.selectPingFen(options.pingfen)
    }
    if (options.commentContent){
      that.setData({
        commentContent: options.commentContent,
      })
    }
    console.log("=======that.commentProcessData======", that.commentProcessData)
    that.setData({
      baseData: baseData,
      pingfenDataList: that.pingfenDataList,
      type: options.type||'',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting: app.setting
    })
    this.setData({
      sysWidth: app.globalData.sysWidth
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})