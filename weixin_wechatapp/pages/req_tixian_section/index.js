
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 1,
    butn_show_loading:false,
    userInfo: null,
    agree:false,
    extraData:{},
  },
  getSessionUserInfo: function () {
    var that = this;
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var postParamUserBank = app.AddClientUrl("/get_session_userinfo.html")
    wx.request({
      url: postParamUserBank.url,
      data: postParamUserBank.params,
      header: app.headerPost,
      success: function (res) {
        console.log(res.data)
        let data = res.data.relateObj.platformUser
        if (res.data.errcode == '0') {
          if (data.bankName && data.subBankName && data.trueName && data.bankNo && data.zfbNo){
            that.data.agree = true
            that.setData({ 
              agree: that.data.agree, 
              extraData: { reqBankName: data.bankName+data.subBankName, reqBankCardNo: data.bankNo, reqUserTrueName: data.trueName,}
            })
            console.log("extraData",that.data.extraData)
          } else {
            that.data.agree = false
            that.setData({ agree: that.data.agree })
          }
          that.setData({userInfo: data})
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: "请求错误",
          image: '/images/icons/tip.png',
          duration: 1000
        })
        console.log(res.data)
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  getBuyerScript: function (e) {
    this.setData({ money: e.detail.value })
  },

  subMitButn: function () {
    var that = this
    let money = Number(this.data.money) 
    if (money < 0 || money == 0 ){
      return
    }
    if (!that.data.agree){
      wx.showModal({
        title: '提示',
        content: '主人~您还没填写详细信息哦，点击确定前往填写!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.tolinkUrl("user_bank_info_setting.html")
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    let wxChatPayParam = {
      amount: ''
    }
    wxChatPayParam.amount = Number(money) 
    wxChatPayParam = Object.assign({}, wxChatPayParam, that.data.extraData)
    this.setData({ butn_show_loading:true })
    let customIndex = app.AddClientUrl("/req_tixian.html", wxChatPayParam, 'post')
    wx.showModal({
      title: '提示',
      content: '确认提现？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.id) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () { wx.navigateBack() }, 2000)
              }else{
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              }
              
            },
            fail: function () {
            },
            complete: function () {
              that.setData({ butn_show_loading: false })
            }
          })
        } else if (res.cancel) {
          that.setData({ butn_show_loading: false })
          console.log('用户点击取消')
        }
      }
    })

  },
  /* 组件事件集合 */
  tolinkUrl: function (data) {
    let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
    console.log("==linkUrl===", linkUrl)
    app.linkEvent(linkUrl)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getSessionUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSessionUserInfo()
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