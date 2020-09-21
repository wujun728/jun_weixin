// pages/reply/reply.js
const app = getApp() 
Page({
  /**
   * 页面的初始数据
   */
  data: { //存储初始数据
    id:'',
    recommentList:[],
    commentValue:"",
  },
  totalPage: 1,
  totalSize: 1,
  pageSize: 1,
  curPage: 1,
  commentId:0,
  
  sendComments: function (e) {
    console.log("===sendComments==", e)
    var that = this
    let value = e.detail.value || ""
    that.recommentInput(value)
  },
  saveData: function (data) {
    let that = this
    console.log("===saveData==", data)
    that.data.commentValue = data.detail.value;
  },
  //再评论
  recommentInput: function (commentValue) {
    var that = this
    let data = {
      commentId: that.commentId,
      comment: commentValue || that.data.commentValue,
    }
    let customIndex = app.AddClientUrl("/add_bbs_recomments.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('==res===', res)
        if (res.data.errcode == 0) {
          that.getRecomment(that.commentId, 1);
          wx.showToast({
            title: "评论成功",
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: "评论失败",
            icon: "none",
            duration: 2000
          })
        }
      },

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('===options==', options)
    this.commentId=options['id']; //首先实参和形参要相等
    this.getRecomment(this.commentId,1); //实参  驼峰命名法 连拼首字母要大写
    //
  },
  
 
    //获取再评论数据
  getRecomment: function (commentId,page) { 
    //()形参   获取再评论就需要获取ID，刷新需获取页数
    console.log('---commentId---', commentId,)
    let that = this; 
    let data = {
      commentId: that.commentId,
      page: page,
      comment: that.recommentList,
    }
    let customIndex = app.AddClientUrl("/get_news_bbs_recomments.html", data)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.header,
        success: function (res) {//对数据的处理 都写在SUCCESS 里
          console.log('---data---', res)
          if (page==1){
            that.setData({  //修改和存储数据
              recommentList: res.data.result,
              // 链接两个页面
            })  
          }else{
            that.setData({  //修改和存储数据
              recommentList: that.data.recommentList.concat(res.data.result),
              // 链接两个页面
            })  
          }
          that.totalSize = res.data.totalSize;
          that.curPage = page;
          that.pageSize = res.data.pageSize;
    //      
               
        }
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
    console.log('=======on=====Refresh========')
    var that = this;
    
    that.getRecomment(that.commentId,1); //要传实参才能用
    wx.showNavigationBarLoading() //在标题栏中显示刷新

    wx.stopPullDownRefresh() //停止下拉刷新
    wx.hideNavigationBarLoading() //完成停止加载});
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('=====on===Bottom======')
    var that = this;
    if (that.totalSize) { //totalSize 要先定义 
      if (that.totalSize > that.curPage * that.pageSize) {
        // 如果总条数大于当前条数乘于页面条数
        that.getRecomment(that.commentId, ++that.curPage);
                 //形参commentId =实参this.commentId
                 //形参page =实参this.curPage
         //就执行getRecomment传过来的数据（必须是实参 并且让当前页数加1）
      } else {
        //否则就显示没有更多数据了
        console.log("没有更多数据了");
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})