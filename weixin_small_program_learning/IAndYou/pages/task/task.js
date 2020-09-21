// pages/task/task.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topIndex: 0,
    showModal: false,
    showComment: false,
    
    //心情列表
    diary: [],

    //撒娇
    coquetry: [],
    
    //心情详情
    diaryDetail: {},
    
    //评论框内容
    commentValue: "",

    //评论列表
    commentList: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    app.userLogin();
    var in_index = 1;
    var times = setInterval(function () {
      in_index++;
      if (in_index > 10) {
        clearTimeout(times);
      }
      var rd_session = wx.getStorageSync("rd_session");

      var account = app.globalData.userId;

      if (rd_session) {
        clearTimeout(times);


        //业务逻辑----------start------------
        
        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/getDiaries",
          data: {
            "account": account,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            console.log(response);            
            if (response.data.status) {
              var diary = response.data.data;
              that.setData({
                diary: diary
              })
            }            
          }
        })

        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/getDiaries",
          data: {
            "account": account,
            "flag": "true"
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            console.log(response);
            if (response.data.status) {
              var coquetry = response.data.data;
              that.setData({
                coquetry: coquetry
              })
            }
          }
        })

        //业务逻辑----------end------------

      }
    }, 1000)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeTop: function(e) {    
    this.setData({
      topIndex: e.target.dataset.index
    })
  },
  //点击写心情
  edit: function() {

    console.log("写心情：", this.data.topIndex);
    wx.navigateTo({
      url: '/pages/mood/mood?topIndex=' + this.data.topIndex,
    })
  },
  //关闭模态框
  close: function() {
      console.log("点击了关闭");
      this.setData({
        showModal: false
      })
  },
  /**
   * 查看心情
   */
  watchMood: function(e) {
    var that = this;
    var diaryDetail = e.currentTarget.dataset.item;
    var id = diaryDetail.id;
    this.setData({
      showModal: true,
      diaryDetail: diaryDetail
    })

  },
  //点击点赞
  addPaise: function() {
    console.log("点了赞");

  },
  commentInput: function(e) {
    this.setData({
      commentValue:  e.detail.value
    })
  },
  addMessage: function() {    
    console.log("点了发送消息");    
    this.setData({
      showComment: !this.data.showComment
    })

    var that = this;
    var id = this.data.diaryDetail.id;

    //request请求获取评论
    wx.request({
      url: "http://47.106.108.224/mavenSprngMVC/wxUser/getCommentsById",
      data: {
        "id": id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (response) {
        console.log(response);
        that.setData({
          commentList: response.data.data
        })
      }
    })
  },
  addComment: function(e) {
    var that = this;
    var msg = this.data.commentValue;
    var account = app.globalData.userId;
    var id = e.currentTarget.dataset.id;
    console.log("mgs", msg == "");
    if (msg == "") {
      wx.showToast({
        icon: 'loading',
        title: '消息不能为空~',
      })
      return;
    }
    //发送评论
    wx.request({
      url: "http://47.106.108.224/mavenSprngMVC/wxUser/pubComment",
      data: {
        "id": id,
        "account": account,
        "msg": msg,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (response) {

        wx.showToast({
          icon: "success",
          title: '发送成功~',
        })
        that.setData({
          showComment: false,
          commentValue: "",
        })
      }
    })


  },
  delete: function(e) {
    console.log(e.currentTarget.dataset.id);
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除图片',
      content: '确定要删除该图片？',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {

        if (res.cancel) {
          this.setData({
            showModal: false
          })
        } else {
          wx.request({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/deleteDiary",
            data: {
              "id": id,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function (response) {
              console.log(response);
              wx.showToast({
                icon: "success",
                title: '删除成功',
              })
              that.setData({
                showModal: false
              })
            }
          })

        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })


  },
  editMood: function() {
    wx.navigateTo({
      url: '/pages/mood/mood?id=' + this.data.diaryDetail.id + "&topIndex=" + this.data.topIndex,
    })
  }
})