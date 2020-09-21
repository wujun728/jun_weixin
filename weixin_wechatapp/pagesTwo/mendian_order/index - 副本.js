
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

  },
  confirmMendianOrder:function(e){
    console.log("=====confirmMendianOrder=====",e)
    var orderNo = e.currentTarget.dataset.orderno
    var index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this

    wx.showModal({
      title: '提示',
      content: '确认订单',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/wx_confirm_mendian_order.html", param_post, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {

              if (res.data.errcode == '0') {
                console.log(res.data)


                wx.showToast({
                  title: '确认订单成功',
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
  rejectMendianOrder: function (e) {
    console.log("=====rejectMendianOrder=====", e)
    var orderNo = e.currentTarget.dataset.orderno
    var index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    wx.showModal({
      title: '提示',
      content: '拒绝订单',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/wx_reject_mendian_order.html", param_post, 'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {

              if (res.data.errcode == '0') {
                console.log(res.data)


                wx.showToast({
                  title: '拒绝订单成功',
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
  toOrderDetail:function(e){
    let orderNo = e.currentTarget.dataset.orderno
    wx.navigateTo({
      url: '/pages/order_detail/index?orderNo=' + orderNo,
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
  //得到他的利润
  distributeProfit:function(result){
    for (let i = 0; i < result.length; i++){
      result[i].distributeProfitResult = 0
      // for (let j = 0; j < result[i].orderItems.length; j++ ){
      //   let getMoneyItem = result[i].orderItems[j].distributeProfit * result[i].orderItems[j].itemCount
      //   result[i].distributeProfitResult += getMoneyItem
      // }
      // result[i].distributeProfitResult = (result[i].distributeProfitResult * (app.setting.platformSetting.mendianDistributeProfit)/100).toFixed(2)
    }
    return result
  },
  /* 获取数据 */
  getOrderList: function (focusTab, index, fresh) {
    let params = focusTab.params
    let tab = this.data.tab
    var customIndex = app.AddClientUrl("/get_mendian_order_items_admin_mendian_json.html", params,'post')
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
        if(res.data.errcode == '0'){
          focusTab.params.pageSize = res.data.relateObj.pageSize
          focusTab.params.curPage = res.data.relateObj.curPage
          focusTab.params.totalSize = res.data.relateObj.totalSize
          let result = that.distributeProfit(res.data.relateObj.result)

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
        }else{
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
    if (focusTab.params.totalSize > focusTab.params.curPage * focusTab.params.pageSize) {
      console.log('hasMore')
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
  /* 订单详细 */
  lookMore: function (e) {
    var orderNo = e.currentTarget.dataset.orderno
    console.log(orderNo)
    this.setData({ reflesh: true })
    wx.navigateTo({
      url: '/pages/order_detail/index?orderNo=' + orderNo,
    })

  },
  tabBar: [
    {
      name: '全部',
      getUrl: 'order_list_0.html',
      params: {
        easyStatusName: "全部订单",
        easyStatus: '0',
        page: 1
      },
      List: []
    },
    {
      name: '待付款',
      getUrl: 'order_list_2.html',
      params: {
        easyStatusName: "待付款",
        easyStatus: '2',
        page: 1
      },
      List: []
    },
    {
      name: '待发货',
      getUrl: 'order_list_3.html',
      params: {
        easyStatusName: "待发货",
        easyStatus: '3',
        page: 1
      },
      List: []
    },
    {
      name: '待收货',
      getUrl: 'order_list_4.html',
      params: {
        easyStatusName: "待收货",
        easyStatus: '4',
        page: 1
      },
      List: []
    },
    {
      name: '已完成',
      getUrl: 'order_list_6.html',
      params: {
        easyStatusName: "已完成",
        easyStatus: '6',
        page: 1
      },
      List: []
    },
  ],
})