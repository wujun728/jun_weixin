
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: true,
    UserInfo:{},
    info: {
      trueName: '',
      bankName: '',
      subBankName: '',
      bankNo: '',
      zfbNo: '',
    },
  },
  
  user_bank_info_setting_Submit: function (e) {
    var info = e.detail.value;
    if (!info.trueName) { //|| !info.bankName || !info.subBankName || !info.bankNo || !info.zfbNo
      wx.showToast({
        title: '输入为空',
        image: '/images/icons/tip.png',
        duration: 1000
      })
    } 
    else {
      this.postParams(info)
    }
  },
  postParams: function (info) {
    var that = this;
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var postParamUserBank = app.AddClientUrl("/set_user_bank_info_setting.html", info, 'post')
    wx.request({
      url: postParamUserBank.url,
      data: postParamUserBank.params,
      method: 'POST',
      header: app.headerPost,
      success: function (res) {
        if (res.data.errcode == '0') {
          wx.showToast({
            title: '成功'
          })
          setTimeout(function () { wx.navigateBack() }, 2000)
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
        console.log(res.data)
      },
      fail: function (res) {
        
        console.log(res.data)
      },
      complete:function(res){
        wx.hideLoading()
      }
    })
  },
  checkboxChange: function (e) {
    console.log(e.detail.value[0])
    if (e.detail.value.length == 1) {
      this.setData({ agree: true })
    } else {
      this.setData({ agree: false })
    }
  },
  getSessionUserInfo:function(){
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
        
        if (res.data.errcode == '0') {
          that.setData({
            UserInfo: res.data.relateObj.platformUser
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {

        console.log(res.data)
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  /* lookUserXY: function () {
    wx.navigateTo({
      url: '/pages/regist_xieyi/index',
    })
  }, */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSessionUserInfo()
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
    this.setData({ setting: app.setting })
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

  loginIn: function (data) {
    console.log(data)
    var that = this;
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    var loginUrl = app.AddClientUrl("Client.User.Login", data, 'post')
    wx.request({
      url: loginUrl.url,
      data: loginUrl.params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.header)
        var header = res.header
        var cookie = null
        if (!!header['Set-Cookie']) {
          cookie = header['Set-Cookie']
        }
        if (!!header['set-cookie']) {
          cookie = header['set-cookie']
        }

        console.log(cookie)


        wx.hideLoading()
        //console.log(res.data)
        if (res.data.errcode == 0) {
          wx.setStorage({
            key: "cookie",
            data: cookie
          })
          app.header = {
            'content-type': 'application/json', // 默认值
            'Cookie': cookie
          }
          // wx.setStorageSync('cookie', cookie)
          app.cookie = cookie
          app.loginUser = res.data.relateObj
          that.setData({ loginUser: res.data.relateObj })
          wx.setStorage({
            key: "loginUser",
            data: res.data.relateObj
          })

          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.getStorageInfo({
                success: function (res) {
                  console.log("本地缓存.............")
                  console.log(res.keys)
                  for (let i = 0; i < res.keys.length; i++) {
                    wx.getStorage({
                      key: res.keys[i],
                      success: function (res) {
                        console.log(res.data)
                      }
                    })
                  }

                }
              })
              app.toIndex()
            }
          })


        }
        else { //
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 1500
          })
        }



      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  }
})