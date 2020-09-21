const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: Object,
      value: 'default value',
    },
    locationList2: {
      type: Object,
    },
    showBtn: {
      type: String,
    },
    showTitle: {
      type: String,
    },
    userAddressCustomFormCommitId: {
      type: String,
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    sysWidth:"",
  },
  ready:function(){
    console.log("====notify======", this.data.data,app.setting)
    that.findNotifyTipsFun();
    this.setData({
      sysWidth: app.globalData.sysWidth,
      setting:app.setting
    });
  },
  methods: {
    //获取产品分类
    findNotifyTipsFun: function () {
      var customIndex = app.AddClientUrl("/wx_find_notify_tips.html", { test:1})
      app.showToastLoading('loading', true)
      var that = this
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("findNotifyTipsFun", res.data)
          if (res.data.errcode == 0) {
            
          } else {
            
          }
          wx.hideLoading()
        },
        fail: function (res) {
          console.log("fail")
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    tolinkUrl: function (e) {
      console.log(e.currentTarget.dataset.info)
      let info = e.currentTarget.dataset.info
      let jifenId = info.id
      let productId = info.productId
      let couponId = info.couponId
      let jifenNum = info.needJifen
      let jifenCount = info.count
      if (productId) {
        var a = "jifen_product_detail.html?type=jifen&productId=" + productId + '&jifenNum=' + jifenNum + '&jifenId=' + jifenId + '&jifenCount=' + jifenCount;
      }
      if (couponId) {
        var a = "coupon_detail.html?type=jifen&couponId=" + couponId;
      }
      app.linkEvent(a);
    },
  },
})