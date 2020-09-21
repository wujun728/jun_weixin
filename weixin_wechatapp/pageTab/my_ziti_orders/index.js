
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [], 
    reflesh: false,

    showTabIndex:0,
    sysWidth: 320,
    sysHeight: 568,

    tab: [],
    refreshText:'下拉刷新',
  },
  /* 点击tab */
  bindTab: function (e) {

    var index = e.currentTarget.dataset.id
    if (this.data.showTabIndex == index){
      return
    }
    
    this.setData({
      showTabIndex: index
    })

  },
  tolinkUrl: function (e) {
    console.log("tolinkUrl", e)
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 滑动事件 */
  clickCatch: function (e) {
    console.log(e.currentTarget.dataset.info)
    var info = e.currentTarget.dataset.info;
    console.log(info)
    let latitude = info.latitude;
    let longitude = info.longitude;
    let name = info.name;
    let address = info.address;
    // 判断金纬度是否为空
    if (latitude == "" || longitude == "") {
      console.log("判断金纬度是否为空");
      wx.showModal({
        title: '提示',
        content: '主人~该门店没有设置位置哦!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    else {
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,
        name: name,
        address: address,
      })
    }
  },
  changeIndex:function(e){
    
    var index = e.detail.current
    let tab = this.data.tab
    let focusTab = tab[index]
    if (!focusTab.List || focusTab.List.length == 0) {
      this.getOrderList(focusTab, index, 1)
    }
    this.setData({
      showTabIndex: index
    })
  },
  /* 获取数据 */
  getOrderList: function (focusTab,index, fresh) {
    let params = focusTab.params
    let tab = this.data.tab
    var customIndex = app.AddClientUrl("/get_order_list.html", params)
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {

        console.log('-----------orderList--------')
        console.log(res.data)
        focusTab.params.pageSize = res.data.pageSize
        focusTab.params.curPage = res.data.curPage
        focusTab.params.totalSize = res.data.totalSize
        let result = res.data.result
        if (fresh){
          focusTab.List = []
        }
        
        if (!res.data.result || res.data.result.length == 0) {
          focusTab.List = null
        } else {
          focusTab.List = focusTab.List.concat(result)
        }
        tab[index] = focusTab
        that.setData({
          tab: tab
        })
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      },
      complete:function(){
        setTimeout(function () {
          that.loading = false
          
        }, 2000)
        that.setData({
          refreshText: '下拉刷新'
        })
        
      },
    })
  },
  loading:false,
  /* 下拉刷新 */
  scrollTopToReflesh:function(e){
   
    console.log('粗发下拉事件')
    this.setData({
      refreshText: '松开手指即可刷新'
    })
    
    let index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    if (!this.FreshIng){
      this.FreshIng = true
    }else{
      return;
    }
   
  },
  //刷新数据
  freshList(focusTab,index){
    
    if (this.FreshIng){
      this.FreshIng = false
      console.log('mmmmmmmmmm   加载数据中   mmmmmmm')
      let that = this
      focusTab.params.page = 1
      this.getOrderList(focusTab, index, 1)
    }
    
  },
  scrollEvent:function(e){
    let index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    if (this.FreshIng && e.detail.scrollTop > -10){
      console.log('mmmmmmmmmm   1   mmmmmmm')
      this.freshList(focusTab, index)
    }
  },

  FreshIng:false,
  /* 加载更多 */
  scrollBottomToLoadMore:function(e){
    let that = this
    console.log(this.loading)
    if (this.loading){
      return
    }
    this.loading = true
    let index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    if (focusTab.params.totalSize > focusTab.params.page * focusTab.params.pageSize) {
      ++focusTab.params.page;
      this.getOrderList(focusTab,index)
    }else{
      console.log('noMore')
      focusTab.state.listEnd = true
      this.setData({
        tab: tab
      })
    }
    setTimeout(function () {
      that.loading = false
    }, 2000)
  },
  /* 第一次加载 */
  dellOpt: function (options) {
    let tab = this.data.tab
    console.log("==tab===",tab)
    this.getOrderList(tab[0], 0)
    this.getOrderList(tab[1], 1)
    this.setData({
      showTabIndex: 0
    })
  },
  opt:{},
  onLoad:function(options){
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
  /* 取消订单 */
  cancelOrder: function (e) {
    var orderNo = e.currentTarget.dataset.orderno
    var index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    
    wx.showModal({
      title: '提示',
      content: '取消订单',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/cancel_order.html", param_post, 'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {

              if (res.data.errcode == '0') {
                console.log(res.data)


                wx.showToast({
                  title: '取消订单成功',
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
      name: '未提订单',
      params: {
        ziti: 1,
        page: 1
      },
      state: {
        scrollTop: 0,
      },
      List: []
    },
    {
      name: '已提订单',
      params: {
        ziti:2,
        page: 1
      },
      state: {
        scrollTop:0,
      },
      List: []
    }
  ],
})