const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: String,
      value: 'default value',
    },
    // authorizationState: {
    //   type: Boolean,
    //   value: 'default value',
    // }
  },
  data: {
    // 这里是一些组件内部数据
    showPopup:false,
    renderData: null,
    PaiXuPartials:null, 
    kefuCount: 0,
    footerCount: 0,
    authorizationCount:0,
    defaultTop:0,
    footerImgState: false,
    sendOptionData: null,
    showAddressForm: false,
    userInfoFormCommitId: '',
    showUserForm: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  ready: function () {
    let that = this;
    app.footerCount++;
    app.authorizationCount++
    console.log("===that.data.data====", that.data.data)
    let jsonData='';
    try {
      jsonData = JSON.parse(that.data.data);
    } catch (e) {
      jsonData = that.data.data
    }
    that.setData({ authorizationCount: app.authorizationCount, footerCount: app.footerCount, showPopup: jsonData.state})
    console.log('zujian', that.data.data, that.data.showPopup, that.data.authorizationCount)
    if (that.data.data){}
    that.setData({
      loginUser: app.loginUser,
      setting: app.setting,
      userInfo:{
        telno: app.loginUser.telno||'',
        headimg: app.loginUser.userIcon||'',
        nickname: app.loginUser.nickname||'',
        userTip: app.loginUser.userTip||'',
        sex: app.loginUser.sex,
      }
    })
    console.log('setting', that.data.setting)
    console.log('app.loginUser', that.data.loginUser)
// 获取用户信息
    if (that.data.canIUse) {
      console.log('==that.data.canIUse===', that.data.canIUse);
      app.userInfoReadyCallback = res => {
        console.log("=====userInfo====",res)
        that.setData({
          userInfo: res.userInfo,
        })
      }
    }
    that.getParac();
    // wx.getSetting({//检查用户是否授权了
    //   success(res) {
    //     console.warn("======检查用户是否授权了========", res)
    //     if (!res.authSetting['scope.userInfo']) {
    //       console.warn('=====没授权====')
    //       that.setData({ showPopup: true })
    //     } else {
    //       console.warn('=====已授权====')
    //       that.setData({ showPopup: false })
    //     }
    //   }});
    if (app.setting.platformSetting.userNeedShenhe > 0 && !(app.loginUser && app.loginUser.platformUser.userInfoFormCommitId)) {
      that.setData({ showUserForm: true })
      if (app.setting.platformSetting.userInfoCustomFormId) {
        console.log("有设置用户表单", app.setting.platformSetting.userInfoCustomFormId)
        that.setData({ showAddressForm: true, sendOptionData: { customFormId: app.setting.platformSetting.userInfoCustomFormId } })
      } else {
        that.setData({ sendOptionData: {} })
      }
    }
  },
  methods: {
    toChangeUserInfo: function (userInfo) {
      let that = this;
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
          that.setData({ showUserForm: false })
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

    loginIn: function (data) {

      //app.wxLogin()
      app.get_session_userinfo()
      // setTimeout(function () { wx.navigateBack() },200)


      return
      console.log(data)
      var that = this;

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
    getDataFun: function (e) {
      let that = this;
      console.log("===getDataFun===", e, e.detail.formId)
      if (e.detail.formId) {
        let userInfo = that.data.userInfo;
        userInfo.userInfoFormCommitId = e.detail.formId
        that.toChangeUserInfo(userInfo)
      };
    },
    submitData: function (e) {
      let that = this;
      console.log("===getDataFun===", e, e.detail.formId)
      that.selectComponent("#userForm").formSubmit();
    },
    // 这里是一个自定义方法
    resEventFun: function (event){
      let that=this;
      console.log("==========resEventFun=========", event)
      let resEventData = event.detail.resEventData;
      that.triggerEvent('resEvent', { resEventData }, {})
    },
    bindGetUserInfo: function (e) {
      let that = this;
      that.setData({ showPopup: false })
      console.log(that.data.showPopup)
      console.log(e.detail.userInfo)
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        if (app.loginUser && app.loginUser.platformUser&&!app.loginUser.platformUser.nickname) {
           app.sentWxUserInfo(app.loginUser)
        }
      } else {
        console.log('用户按了拒绝按钮')
        //用户按了拒绝按钮
      }
    },
    cancel: function () {
      this.setData({ showPopup: false })
    },
    getParac: function () {
      var that = this;
      let url
      let jsonData;
      let params = { version: app.version};
      try {
        jsonData = JSON.parse(that.data.data);
        url = jsonData.url
      } catch (e) {
        jsonData = that.data.data
        console.log(e); //error in the above string(in this case,yes)!
        url = jsonData
      }
      if (jsonData.params){
        params = Object.assign({}, params, jsonData.params)
      }
      console.log("jsonData", jsonData)
      // 经纬度
      let locationAddressData = wx.getStorageSync('selectAddressData') || ''
      if (locationAddressData) {
         params = Object.assign({}, params,{
          "longitude": locationAddressData.longitude,
          "latitude": locationAddressData.latitude,
        })
      } else {
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            console.log("=====getLocationAddress====", res)
            params.latitude = res.latitude
            params.longitude = res.longitude
          }
        })
      }

      console.log("====url====", url, jsonData)
      var customIndex = app.AddClientUrl("/custom_page_" + url + ".html", params, 'get', '1')
      //拿custom_page
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log("====== res.data=========", res.data)
          let data = res.data;
          if (!data.errcode | data.errcode=='0'){
            if (data.channelName !="index"){
              if (jsonData.title && jsonData.title =="noTitle"){
                console.log("======不设置标题=======")
              } else (
                wx.setNavigationBarTitle({
                  title: data.channelTitle,
                })
              )
           }
            wx.hideLoading()
            app.renderData = data
            that.setData({ renderData: data })
            if (data.partials.length == 0) {
              that.setData({ PaiXuPartials: null })
            } else {
              that.getPartials();
            }
          }else{
            // wx.showModal({
            //   title: '提示',
            //   content: '该页面还未装修',
            //   success: function (res) {

            //     if (res.confirm) {
                 
            //     } else if (res.cancel) {
                 
            //     }
            //   }
            // })
            console.log('加载失败')
          }
        },
        fail: function (res) {
          console.log('------------2222222-----------')
          console.log(res)
          wx.hideLoading()

          //app.loadFail()

          wx.showModal({
            title: '提示',
            content: '加载失败，点击【确定】重新加载',
            success: function (res) {

              if (res.confirm) {
                that.getParac()
              } else if (res.cancel) {
                app.toIndex()
              }
            }
          })
        }
      })
    },
    getPartials: function () {
      let that=this;
      var partials = that.data.renderData.partials;
      console.log("=====partials=====", partials)
      var PaiXuPartials = [];
      //排序
      if (partials && partials.length) {
        for (let i = 0; i < partials.length; i++) {
          // 产品标签的转化为数组start
          if (partials[i].partialType == 6 && partials[i].androidTemplate=="footer-img"){
            console.log("====存在浮动图片====", that.data.footerImgState)
            that.setData({ footerImgState: true })
            console.log("====存在浮动图片====", that.data.footerImgState)
          }
          if (partials[i].partialType == 24 ){
            that.data.kefuCount++;
          }
          console.log('=========that.kefuCount=====', that.data.kefuCount)
          // if (partials[i].partialType == 15 && partials[i].relateBean && partials[i].relateBean.length != 0) {
          //   for (let j = 0; j < partials[i].relateBean.length; j++) {
          //     if (partials[i].relateBean[j].tags && partials[i].relateBean[j].tags != '') {
          //       let tagArray = partials[i].relateBean[j].tags.slice(1, -1).split("][")
          //       partials[i].relateBean[j].tagArray = tagArray;
          //     }
          //   }
          // }
          // 产品标签的转化为数组end
          if (typeof (partials[i].jsonData) == "string") {
            partials[i].jsonData = JSON.parse(partials[i].jsonData)
          } else {
            continue;
          }

          console.log("=====partials=====", partials)
          PaiXuPartials.push(partials[i]);
        }
        wx.getSystemInfo({
          success: function (res) {
            let screenHeight = Math.floor(res.screenHeight * 0.618);
            let kefuHeight = Math.floor(that.data.kefuCount * ((65 + 20) / 2))
            console.log('===screenHeight====', screenHeight);
            let defaultTop = screenHeight - kefuHeight
            console.log('defaultTop', defaultTop)
            that.setData({
              defaultTop: defaultTop
            })
          },
        })
      }
      this.setData({ PaiXuPartials: PaiXuPartials })
      console.log(this.data.PaiXuPartials)
    },

  },
})