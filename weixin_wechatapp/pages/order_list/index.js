
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    reflesh:false
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  }, 
  /* 支付 */
  pay:function(e){
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
  lookMore:function(e){
    var orderNo = e.currentTarget.dataset.orderno
    console.log(orderNo)
    this.setData({ reflesh: true })
    wx.navigateTo({
      url: '/pages/order_detail/index?orderNo=' + orderNo,
    })
    
  },
/* 编辑订单 */
  editOrder:function(e) {
    var order = e.currentTarget.dataset.order
    var orderNo = order.orderNo
    console.log(order)
    this.setData({ reflesh: true })
    console.log("=================list===============",list)
    wx.navigateTo({
      url: '/pages/edit_order/index?orderNo=' + orderNo,
    })
    
  },
  /* 取消订单 */
  cancelOrder:function(e){
    var orderNo = e.currentTarget.dataset.orderno
    var that = this
    wx.showModal({
      title: '提示',
      content: '取消订单',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/cancel_order.html", param_post,'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {

              if (res.data.errcode == '0') {
                console.log(res.data)
                that.listPage.page = 1


                wx.showToast({
                  title: '取消订单成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function () {
                  that.getOrderList(that.GloOption)
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
  delectOrder:function(e){
    var orderNo = e.currentTarget.dataset.orderno
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_unshow.html", param_post,'post')
          
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': app.cookie
            },
            method: 'POST',
            success: function (res) {
              
              if(res.data.errcode == '0'){
                console.log(res.data)
                that.listPage.page = 1


                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function () {
                  that.getOrderList(that.GloOption)
                }, 1000)
              }
              else{
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
  pingjiaOrder:function(e){
    var orderNo = e.currentTarget.dataset.orderno
    this.setData({ reflesh: true })
    wx.navigateTo({
      url: '/pages/order_shop_comment/index?orderNo=' + orderNo,
    })
  },
/* 订单到货 */
  arriverOrder:function(e){
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
          var customIndex = app.AddClientUrl("/order_received.html", param_post,'post')

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
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/order_list/index',
                  })
                },2000)
               
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

  /* 获取订单列表 */
  getOrderList: function (options){
    if (!app.loginUser) {
      app.loadLogin()
      return
    }
    options.page = this.listPage.page
    var customIndex = app.AddClientUrl("/get_order_list.html", options)
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
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.orderList
        if (that.listPage.page ==1){
          dataArr = []
        }
       
        dataArr = dataArr.concat(res.data.result)

        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ orderList: null })
        } else {
          that.setData({ orderList: dataArr })
        }
        
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList(options)
    this.GloOption= options
  },
  GloOption:null,
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
    if (this.data.reflesh){
      this.getOrderList(this.GloOption)
    }
    
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
    this.data.orderList = []

    this.listPage.page = 1
    this.getOrderList(this.GloOption);

    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.getOrderList(that.GloOption)
    }
  },

})