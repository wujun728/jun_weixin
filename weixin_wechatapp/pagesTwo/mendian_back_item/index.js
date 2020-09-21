
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    reflesh: false,

    showTabIndex: 0,
    sysWidth: 320,
    sysHeight: 568,

    tab: [],
    showKefu:false,
    butnText:'是否同意'
  },
  /* 去详情页面 */
  lookMore: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/back_item_more/index?orderItemId=' + id,
    })
  },
  /* 点击tab */
  bindTab: function (e) {

    var index = e.currentTarget.dataset.id
    if (this.data.showTabIndex == index) {
      return
    }

    this.setData({
      showTabIndex: index
    })

  },
  /* 滑动事件 */
  changeIndex: function (e) {
    var index = e.detail.current
    let tab = this.data.tab
    let focusTab = tab[index]
    if (!focusTab.List || focusTab.List.length == 0) {
      this.getOrderList(focusTab, index)
    }
    this.setData({
      showTabIndex: index
    })
  },
  /* 获取数据 */
  getOrderList: function (focusTab, index, fresh) {
    let params = focusTab.params
    let tab = this.data.tab
    var customIndex = app.AddClientUrl("/get_mendian_back_amount_list_admin_mendian_json.html", params,'post')
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

        console.log('-----------orderList--------')
        console.log(res.data)
        if (res.data.errcode == '0') {
          focusTab.params.pageSize = res.data.relateObj.pageSize
          focusTab.params.curPage = res.data.relateObj.curPage
          focusTab.params.totalSize = res.data.relateObj.totalSize
          let result = res.data.relateObj.result
          if (fresh) {
            focusTab.List = []
          }

          if (!result || result.length == 0) {
            focusTab.List = null
          } else {
            focusTab.List = focusTab.List.concat(result)
          }
          tab[index] = focusTab
          that.setData({
            tab: tab
          })
        } else {
          console.log('error')
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  loading: false,
  /* 加载更多 */
  scrollBottomToLoadMore: function (e) {
    let that = this

    console.log(this.loading)
    if (this.loading) {
      return
    }
    this.loading = true
    let index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    if (focusTab.params.totalSize > focusTab.params.page * focusTab.params.pageSize) {
      ++focusTab.params.page;
      this.getOrderList(focusTab, index)
    }
    setTimeout(function () {
      that.loading = false
    }, 2000)
  },
  /* 第一次加载 */
  dellOpt: function (options) {
    if (this.data.tab.length == 0) {
      return
    }
    let easyStatus = options.easyStatus
    if (!easyStatus) {
      easyStatus = 0
    }
    let tab = this.data.tab
    let index = 0
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].params.easyStatus == easyStatus) {
        index = i
      }
    }
    this.getOrderList(tab[index], index)
    this.setData({
      showTabIndex: index
    })
  },
  opt: {},
  onLoad: function (options) {
    this.opt = options
    console.log(options)
    this.setData({
      tab: this.tabBar
    })
    this.dellOpt(options)
  },
  onReady: function () {
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      sysWidth: app.globalData.sysWidth,
      sysHeight: app.globalData.sysHeight,
    });
  },



  getTextAreaValue(e){
    console.log(e)
    this.param_post.rejectReason = e.detail.value
  },
  showResonTextArea(param_post){
    this.setData({
      showKefu:true
    })
  },
  closeKefu(){
    this.setData({
      showKefu: false
    })
  },
  /* 退货 */
  dellBackButn: function (e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    let accept = e.currentTarget.dataset.accept
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    this.bindToReflesh.focusTab = focusTab
    this.bindToReflesh.index = index
    let param_post = {}
    param_post.acceptStatus = accept
    param_post.shopBackAmountId = id
    param_post.acceptStatus = accept
    this.param_post = param_post
    this.showResonTextArea()
    let returnText = ''
    if (accept == 1){
      returnText = '同意'
    }else{
      returnText = '拒绝'
    }
    this.setData({
      butnText: returnText
    })
  },
  param_post:{},
  surePost:function(){
    console.log(this.param_post)
    this.postBackParam(this.param_post)
  },
  bindToReflesh:{
    focusTab:null,
    index:null
  },
  postBackParam(param_post){
    let focusTab = this.bindToReflesh.focusTab
    let index = this.bindToReflesh.index
    let that = this
    wx.showModal({
      title: that.data.butnText,
      content: '退货申请？',
      success: function (res) {
        that.setData({
          showKefu: false
        })
        if (res.confirm) {
          var customIndex = app.AddClientUrl("/accept_or_reject_back_order_item_amount.html", param_post, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.errcode == '0') {
                console.log(res.data)
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 1000
                })

                setTimeout(function () {
                  focusTab.params.page = 1
                  that.getOrderList(focusTab, index, 1)
                }, 1000)

              }
              else {
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 1000
                })
              }
            },
            fail: function (res) {
              app.loadFail()
            }
          })
        } else if (res.cancel) {
          that.setData({
            showKefu: false
          })
        }
      }
    })
  },
  dellBackButnAgree:function(e){
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    let accept = e.currentTarget.dataset.accept
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    let param_post = {}
    param_post.acceptStatus = accept
    param_post.shopBackAmountId = id
    param_post.acceptStatus = accept

    wx.showModal({
      title: '同意',
      content: '退货申请？',
      success: function (res) {
        if (res.confirm) {
          var customIndex = app.AddClientUrl("/accept_or_reject_back_order_item_amount.html", param_post, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.errcode == '0') {
                console.log(res.data)
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 1000
                })

                setTimeout(function () {
                  focusTab.params.page = 1
                  that.getOrderList(focusTab, index, 1)
                }, 1000)

              }
              else {
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 1000
                })
              }
            },
            fail: function (res) {
              app.loadFail()
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  tabBar: [
    {
      name: '未处理',
      getUrl: 'get_mendian_back_amount_list_admin_mendian_json.html',
      params: {
        backStatus : '1',
        page: 1
      },
      List: []
    },
    {
      name: '已同意',
      getUrl: 'get_mendian_back_amount_list_admin_mendian_json.html',
      params: {
        backStatus: '2',
        page: 1
      },
      List: []
    },
    {
      name: '已拒绝',
      getUrl: 'get_mendian_back_amount_list_admin_mendian_json.html',
      params: {
        backStatus : '5',
        page: 1
      },
      List: []
    },
    {
      name: '已退款',
      getUrl: 'get_mendian_back_amount_list_admin_mendian_json.html',
      params: {
        backStatus : '3',
        page: 1
      },
      List: []
    },
  ],
})