
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    attendList: {},
    showMeasureListState: {},
    animationData:{},
  },
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  showMeasureListFun: function (e) {
    let that = this;
    console.log("=======showMeasureListFun========", e)
    let productId = e.currentTarget.dataset.id;
    let showMeasureListState = that.data.showMeasureListState
    let state = showMeasureListState['showMeasureListState_' + productId]
    for (let i in showMeasureListState) {
      showMeasureListState[i] = false;
    }
    showMeasureListState['showMeasureListState_' + productId] = !state
    that.setData({ showMeasureListState: showMeasureListState })
    let showMeasureListState2 = showMeasureListState['showMeasureListState_' + productId]
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    console.log("=======popupFormPage==========", animation, this.data.showMeasureListState2)
    if (showMeasureListState2) {
      animation.bottom('100rpx').step()
    } else {
      animation.bottom('-100rpx').step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  /* 获取数据 */
  getAttendListData: function (params) {
    let that = this
    let param = Object.assign({}, params, { page: that.pageData.curPage})
    let customIndex = app.AddClientUrl("/wx_find_custom_form_commit_attend_list.html", param)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getAttendListData-res===', res)
        let showMeasureListState = that.data.showMeasureListState
        if (res.data.errcode == 0) {
          let dataArr = res.data.relateObj.result
          if (that.pageData.curPage==1){
            that.data.attendList=[];
          }else{
            dataArr = that.data.attendList.concat(dataArr)
          }
          console.log("=========attendList===========", dataArr)
          for (let i = 0; i < dataArr.length; i++){
            if (dataArr[i].attendMeasureList && typeof (dataArr[i].attendMeasureList)=="string"){
              dataArr[i].attendMeasureList = JSON.parse(dataArr[i].attendMeasureList)
            }
            showMeasureListState['showMeasureListState_' + dataArr[i].id] = false
          }
          that.setData({ attendList: dataArr, showMeasureListState: showMeasureListState})
          that.pageData.pageSize = res.data.relateObj.pageSize
          that.pageData.totalSize = res.data.relateObj.totalSize
        }else{
          wx.showModal({
            title: '提示',
            content: '主人~请求超时！确认重新加载',
            success: function (res) {
              if (res.confirm) {
                that.getAttendListData(that.params)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log('===attendList===', that.data.attendList);
        console.log('===myAttend===', that.data.myAttend);
      },
      complete: function (res) {

      }
    })
  },
  /* 获取数据 */
  getMyAttendListData: function (params) {
    let that = this
    let param = Object.assign({}, params, { page: that.pageData.curPage })
    let customIndex = app.AddClientUrl("/wx_user_attend_custom_form_commit.html", param)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getAttendListData-res===', res)
        let showMeasureListState = that.data.showMeasureListState
        if (res.data.errcode == 0) {
          let dataArr = res.data.relateObj.result
          if (that.pageData.curPage == 1) {
            that.data.attendList = [];
          } else {
            dataArr = that.data.attendList.concat(dataArr)
          }
          console.log("=========attendList===========", dataArr)
          for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].attendMeasureList && typeof (dataArr[i].attendMeasureList) == "string") {
              dataArr[i].attendMeasureList = JSON.parse(dataArr[i].attendMeasureList)
            }
            showMeasureListState['showMeasureListState_' + dataArr[i].id] = false
          }
          that.setData({ attendList: dataArr, showMeasureListState: showMeasureListState })
          that.pageData.pageSize = res.data.relateObj.pageSize
          that.pageData.totalSize = res.data.relateObj.totalSize
        } else {
          wx.showModal({
            title: '提示',
            content: '主人~请求超时！确认重新加载',
            success: function (res) {
              if (res.confirm) {
                that.getAttendListData(that.params)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        console.log('===attendList===', that.data.attendList);
        console.log('===myAttend===', that.data.myAttend);
      },
      complete: function (res) {

      }
    })
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
        let data = res.data.relateObj
        if (res.data.errcode == '0') {
          that.setData({
            loginUser: data
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
  pageData:{
    totalSize:0,
    curPage:1,
    pageSize:20
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params:{},
  onLoad: function (options) {
    console.log('===options===', options)
    let that=this;
    that.params = options
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    let title=""
    if (options.type == "my") {
      console.log("=========我的参与记录=========",)
      that.getMyAttendListData(options);
      title ="我的参与记录"
    } else if (options.type == "more"){
      that.getAttendListData(options);
      title = "更多参与记录"
      console.log("=========更多参与记录=========")
    }else{
      that.getAttendListData(options);
      title = "更多参与记录"
      console.log("=========其他=========")
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    console.log("===loginUser====", that.data.loginUser)
    console.log("===setting====", that.data.setting)
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
    let that = this;
    that.pageData.curPage = 1;
    if (that.params.type == "my") {
      that.getMyAttendListData(that.params);
    } else if (that.params.type == "more") {
      that.getAttendListData(that.params);
    } else {
      that.getAttendListData(that.params);
    }
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    console.log("===loginUser====", that.data.loginUser)
    wx.stopPullDownRefresh() 
  },
  /**
   * 页面上拉触底事件的处理函数
   * pageData:{
        totalSize:0,
        curPage:1,
        pageSize:20
      },
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    let that=this;
    if (that.pageData.totalSize > that.pageData.curPage * that.pageData.pageSize){
      that.pageData.curPage += 1;
      if (that.params.type == "my") {
        that.getMyAttendListData(that.params);
      } else if (that.params.type == "more") {
        that.getAttendListData(that.params);
      } else {
        that.getAttendListData(that.params);
      }
    }else{
      wx.showToast({
        title: "到底了~",
        image: '/images/icons/tip.png',
        duration: 1000
      })
    }
  },

})