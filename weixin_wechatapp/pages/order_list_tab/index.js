
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
        let result = res.data.result;
        for (let i = 0; i < result.length;i++){
          if (result[i].attendBean){
            result[i].attendBean.attendMeasureList = JSON.parse(result[i].attendBean.attendMeasureList)
          }
        }
        console.log("====result=======", result)
        if (fresh){
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
  dellOpt: function (options){
    if(this.data.tab.length == 0){
      return
    }
    let easyStatus = options.easyStatus
    if (!easyStatus){
      easyStatus = 0
    }
    let tab = this.data.tab
    let index = 0
    for(let i = 0 ;i < tab.length;i++){
      if (tab[i].params.easyStatus == easyStatus){
        index = i
      }
    }
    
    if (index == 0){
      this.getOrderList(tab[index], index)
    }
    this.setData({
      showTabIndex:index
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
  /* 支付 */
  pay: function (e) {
    var order = e.currentTarget.dataset.order
    var that = this
    console.log(order)
    app.payItem = order
    this.setData({ reflesh: true })

    wx.navigateTo({
      url: '/pages/submit_order_result/index',
    })
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
  /* 编辑订单 */
  editOrder: function (e) {
    var order = e.currentTarget.dataset.order
    var orderNo = order.orderNo
    console.log(order)
    this.setData({ reflesh: true })
    console.log("===========tab======", this.data.tab)
    let list = this.data.tab;
    let data =null;
    for(let i=0;i<list.length;i++){
      //  console.log(list[i])
       for (let j = 0; j < list[i].List.length; j++){
        //  console.log(list[i].List[j])
         if (orderNo == list[i].List[j].orderNo){
            data = list[i].List[j];
           console.log("==========data========", data)
         }
       }
    }
    setTimeout(function () {
     
      wx.navigateTo({
        url: '/pages/edit_order/index?orderNo=' + data.orderNo,
      })
    }, 200)


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
  /* 删除订单 */
  delectOrder: function (e) {
    var orderNo = e.currentTarget.dataset.orderno
    var index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_unshow.html", param_post, 'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': app.cookie
            },
            method: 'POST',
            success: function (res) {

              if (res.data.errcode == '0') {
                console.log(res.data)
                wx.showToast({
                  title: '删除成功',
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
  /* 完成订单 */
  finishedOrder: function (e) {
    var orderNo = e.currentTarget.dataset.orderno
    var index = e.currentTarget.dataset.index
    let tab = this.data.tab
    let focusTab = tab[index]
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认完成该订单？',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_finished.html", param_post, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': app.cookie
            },
            method: 'POST',
            success: function (res) {

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
  /* 订单评价 */
  pingjiaOrder: function (e) {
    var orderNo = e.currentTarget.dataset.orderno
    this.setData({ reflesh: true })
    wx.navigateTo({
      url: '/pages/order_shop_comment/index?orderNo=' + orderNo ,
    })
  },
  /* 订单到货 */
  arriverOrder: function (e) {
    var orderNo = e.currentTarget.dataset.orderno

    var that = this
    console.log(orderNo)

    wx.showModal({
      title: '提示',
      content: '确认到货',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_received.html", param_post, 'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.errcode == '0') {
                wx.showToast({
                  title: '订单已到货',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order_list_tab/index',
                  })
                }, 2000)

              } else {
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 2000
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
      name: '全部',
      getUrl: 'order_list_0.html',
      params: {
        easyStatusName: "全部订单",
        easyStatus: '0',
        page: 1
      },
      state: {
        scrollTop:0,
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
      state: {
        scrollTop: 0,
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
      state: {
        scrollTop: 0,
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
      state: {
        scrollTop: 0,
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
      state: {
        scrollTop: 0,
      },
      List: []
    },
  ],
})