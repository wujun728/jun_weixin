const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    sysWidth:"",
  },
  ready:function(){
    let that=this;
    console.log("====jifen======", that.data.data,app.setting)
    that.setData({
      sysWidth: app.globalData.sysWidth,
      setting:app.setting,
      someData: that.data.data
    });
  },
  methods: {
    // 这里是一个自定义方法
    buttom: function () {
      // console.log("1111111111111")
      app.wxLogin(1011)
      // wx.chooseAddress({
      //   success: function (res) {
      //     console.log(res.userName)
      //     console.log(res.postalCode)
      //     console.log(res.provinceName)
      //     console.log(res.cityName)
      //     console.log(res.countyName)
      //     console.log(res.detailInfo)
      //     console.log(res.nationalCode)
      //     console.log(res.telNumber)
      //   }
      // })
    },
    // 兑换商品
    buyGoods: function (e) {
      var that = this;
      console.log(e.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '确定兑换商品',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.exchange(e.currentTarget.dataset.id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    },
    //兑换
    exchange: function (index) {
      console.log("======a=======", index)
      var that = this;
      console.log("======a=======", that.data.someData.relateBean[index])
      // 判断是否已经兑换过
      if (that.data.someData.relateBean[index].count <= 0) {
        wx.showToast({
          title: "超出兑换上限",
          image: '/images/icons/tip.png',
          duration: 2000
        })
      }
      else {
        var id = that.data.someData.relateBean[index].id;
        let exchange = {
          jifenItemId: id,
          fromSource: "wx"
        }
        let menDianYangShi = app.AddClientUrl("/jifen_exchange_phone_json.html", exchange, 'get')
        wx.request({
          url: menDianYangShi.url,
          data: menDianYangShi.params,
          header: app.headerPost,
          method: 'get',
          success: function (res) {
            console.log("======a=======", res)
            if (res.data.errcode == "-1") {
              wx.showToast({
                title: res.data.errMsg,
                image: '/images/icons/tip.png',
                duration: 2000
              })
              console.log(res.data.errMsg)
            }
            else {
              wx.showToast({
                title: "兑换成功",
                image: '/images/icons/targ.png',
                duration: 2000
              })
              // 兑换成功后次数减少
              var time = that.data.someData;
              console.log("time", time.relateBean[index].count--)
              time.relateBean[index].count = time.relateBean[index].count--;
              that.setData({
                someData: time
              })

            }

          }
        })
      }

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