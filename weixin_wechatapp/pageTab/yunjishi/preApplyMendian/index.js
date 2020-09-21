// pageTab/lanHu/serviceProviders/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
    applyImgBg: '',
    applyText: '',
    applyState:'',
    setting:"",
  },
  // 返回首页
  login: function (e) {
    app.toIndex()
  },
getSUbmitRecord:function(callback){
  let params = {}
  var customIndex = app.AddClientUrl("/get_product_mendian_submit.html", params, 'post')
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
      console.log('=====999999=======',res.data)
      if (res.data.errcode == '0') {
        callback(res.data.relateObj)
        wx.hideLoading()
      } else {
        callback(res.data)
        // wx.showModal({
        //   title: '失败了',
        //   content: '请求失败了，请重新进入！',
        // })
        wx.hideLoading()
      }
    }
  })
},
checkState:function(){
  console.log('----1------')
  let that=this;
  this.getSUbmitRecord(function(record){
    console.log('record=======', record)
    if(record.status==0){
      that.data.applyImgBg ='http://image.tunzai.vip/tunzai/2018_8/14/13/41/3_623.jpg'
      that.data.applyText = "您的资料还在审核中~";
      that.data.applyState = record.status;
    } else if (record.status==1){
      that.data.applyImgBg = 'http://image1.sansancloud.com/xianhua/2019_2/20/11/56/0_164.jpg'
      that.data.applyText = "您的资料已提交成功，请等待审核~";
      that.data.applyState = record.status;
    } else if (record.status == 2) {
      wx.showModal({
          title: '您已被拒绝',
          content: '您提交的信息存在问题，请重新填写您的信息',
        })
      that.data.applyState = record.status;
      that.data.applyImgBg = 'http://image.tunzai.vip/tunzai/2018_8/14/13/40/56_666.jpg'
      that.data.applyText = "点击按钮去注册吧~";
    } else if (record.errcode == '-1') {
      that.data.applyState = record.errcode;
      that.data.applyText = "点击按钮去注册吧~";
      that.data.applyImgBg = 'http://image.tunzai.vip/tunzai/2018_8/14/13/40/56_666.jpg'
    }
    that.setData({
      applyImgBg: that.data.applyImgBg,
      applyState:that.data.applyState,
      applyText:that.data.applyText
    }) 
    })
},
loginSuccess:function(user){
  console.log("pre apply mendian login success call back!", user);
  this.checkState();
},
loginFailed:function(err){
  console.log("login failed!!");
   
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('======options=====', options)
    console.log('======app.setting=====', app.setting)
      let a=""; 
      if(options.code){
        a=options.code;
      }
      this.setData({
        code: a,
        setting: app.setting
      }) 
      /**** */
      console.log('======4444444======', app.loginUser)
      if (app.loginUser) {
        this.checkState();
      }else{
        console.log('======111222333======')
        app.addLoginListener(this);
      }
 
  },
  tolinkUrl:function(){
    let url="";
    if (app.clientNo == "tunzai") {
      url = "/pageTab/tunzai/applyMendian/index"
    } else if (app.clientNo == "yunjishi") {
      url = "/pageTab/yunjishi/applyMendian/index"
    }else{
      url = "/pageTab/yunjishi/applyMendian/index"
    }
    wx.navigateTo({
      url: url+'?code=' +this.data.code
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
  
  }
})