 
const app = getApp()

Page({ 
  
  data: {
    loginUser:null,
    butn_show_loading:false,
    hasNoScope:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sendOptionData: null,
    showAddressForm: false,
    userInfoFormCommitId:'',
  },
  userInfo: {
    telno: '',
    headimg: '',
    nickname: '',
    userTip: ''
  },
  imageUrl:"", 
  bindgetuserinfo(e){
    
    let that = this
    wx.getUserInfo({
      success: function (res) {
        console.warn('--获取用户信息--')
        console.log(res.userInfo)
        let userInfo = res.userInfo
        let loginUser = that.data.loginUser
        loginUser.nickName = userInfo.nickName
        loginUser.platformUser.headimgurl = userInfo.avatarUrl
        that.imageUrl = userInfo.avatarUrl
        
        that.setData({
          loginUser: loginUser
        })
      },
      fail:function(e){
        console.log(e)
        wx.showModal({
          title: '授权提示',
          content: '取消用户授权可能导致部分功能不可用，请确认授权！',
          cancelText:'拒绝',
          confirmText:'去授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  res.authSetting = {
                    "scope.userInfo": true,
                  }
                 that.bindgetuserinfo()
                }
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    })
  },
  /* 图片 */
  changeImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        let imageParam = {}
        imageParam.imageUrl = tempFilePaths
        // var customIndex = app.AddClientUrl("/imageToBase64A.html",  imageParam ,'post')
        // wx.request({
        //   url: customIndex.url,
        //   data: customIndex.params,
        //   header: app.headerPost,
        //   method: 'POST',
        //   success: function (res) {
        //     console.log(res.data)
           
        //   },
        //   fail: function (res) {
        //     app.loadFail()
        //   },
        //   complete: function () {
            
        //   }
        // })
        var customIndex = app.AddClientUrl("/file_uploading.html", imageParam, 'POST')
        wx.uploadFile({
          url: customIndex.url,
          filePath: tempFilePaths,
          name: 'file',
          formData: customIndex.params,
          // formData: {
          //   'user': 'test'
          // },
          success: function (res) {
            var data = JSON.parse(res.data)
            console.log(data)
            that.imageUrl = data.relateObj.imageUrl
            //do something
          },
          fail:function(res){
            console.log(res)
          },
        })
        console.log(tempFilePaths)
        //console.log(that.data.loginUser)
        that.data.loginUser.userIcon = tempFilePaths
        that.setData({
          loginUser: that.data.loginUser
        })
      }
    })
  },
  getDataFun: function (e) {
    let that = this;
    console.log("===getDataFun===", e, e.detail.formId)
    that.userInfo.userInfoFormCommitId = e.detail.formId
    let params = { userInfoFormCommitId: e.detail.formId, headimg: this.imageUrl }
    that.toChangeUserInfo(params)
  },
  sexChange:function(e){
    console.log("=====sexChange=====",e)
  },
  /* 提交 */
  //提交成功，重新登陆
  changeUserInfo: function (e) {
    let that=this;
    console.log(e.detail)
    var reLoginData = {
      username: "",
      passworld:"" 
    }
    this.setData({ butn_show_loading:true })
    this.userInfo = e.detail.value
    let phoneNo = this.userInfo.telno
    this.userInfo.headimg = this.imageUrl
    if (!app.setting.platformSetting.userInfoCustomFormId){
      if (!phoneNo || phoneNo.length != 11) {
        wx.showToast({
          title: "号码格式错误",
          image: '/images/icons/tip.png',
          duration: 2000
        })
        this.setData({ butn_show_loading: false })
        return;
      } 
      that.toChangeUserInfo(this.userInfo)
    }else{
      that.selectComponent("#userForm").formSubmit();
    }
  },
  toChangeUserInfo: function(userInfo){
    let that=this;
    var customIndex = app.AddClientUrl("/change_user_info.html", userInfo, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
        that.loginIn()
      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        that.setData({ butn_show_loading: false })
      }
    })
  },
 /* 退出登录 */

  loginOut: function () {
    return
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.removeStorage({
      key: 'loginUser',
      success: function (res) {
        app.loginUser = null
        console.log(res.data)
      },
      complete:function () {
        wx.hideLoading()
      },
    })
    wx.removeStorage({
      key: 'cookie',
      success: function (res) {
        app.cookie = null
        app.header = {
          'content-type': 'application/json' // 默认值
        }
        app.headerPost= {
          'content-type': 'application/x-www-form-urlencoded'
        },
        console.log(res.data)
        app.toIndex()
      },
      complete: function () {
        wx.hideLoading()
      },
    })
  },
  loginIn: function (data) {
    
    //app.wxLogin()
    app.get_session_userinfo()
    // setTimeout(function () { wx.navigateBack() },200)
    

    return
    console.log(data)
    var that = this;
    
    var loginUrl = app.AddClientUrl("Client.User.Login",data,'post')
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
          app.cookie = cookie
          app.loginUser = res.data.relateObj
          that.setData({ loginUser: res.data.relateObj })
          wx.setStorage({
            key: "loginUser",
            data: res.data.relateObj
          })

          wx.navigateBack()


        }
        else { 
          wx.showToast({
            title: '失败',
            icon: 'loading',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log("=========app.setting===========", app.setting)
    this.setData({
      loginUser: app.loginUser,
      hasNoScope: app.hasNoScope,
      setting: app.setting 
    })
    if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    if (app.setting.platformSetting.userInfoCustomFormId) {
      console.log("有设置用户表单", app.setting.platformSetting.userInfoCustomFormId)
      that.setData({ showAddressForm: true, sendOptionData: { customFormId: app.setting.platformSetting.userInfoCustomFormId } })
    } else {
      that.setData({ sendOptionData: {} })
    }
    if (app.loginUser.platformUser.userInfoFormCommitId) {
      console.log("有提交的内容")
      that.setData({ userInfoFormCommitId: app.loginUser.platformUser.userInfoFormCommitId})
    }else{
      console.log("没有提交的内容")
      // that.setData({ userInfoFormCommitId: 2244 })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!app.checkIfLogin()) {
    
      return
    }
    console.log(".............")
    console.log(this.data.loginUser)
    this.imageUrl = this.data.loginUser.userIcon
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