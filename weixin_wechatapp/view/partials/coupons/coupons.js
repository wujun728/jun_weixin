const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: '../../../images/icons/play.png',

    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    color: ["#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53", "#FE3D53"]
  },
  ready:function(){
    if (app.setting.platformSetting.defaultColor && app.setting.platformSetting.defaultColor != "") {
      console.log("=========app.setting.platformSetting.defaultColor ==========", app.setting.platformSetting.defaultColor)
      // 有默认色
      this.setData({
        defaultColor: app.setting.platformSetting.defaultColor
      })

    }
    else {
      // 没有默认色
      this.setData({
        defaultColor: app.setting.platformSetting.defaultColor
      })
    }
  },
  methods: {

    // 这里是一个自定义方法
   

    //领取优惠券
    click: function (e) {
      console.log(e)
      var i = e.currentTarget.dataset.index
      //gain_coupon
      var data = {
        couponId: '',
        couponSecretCode: '',
        couponSecretPassword: ''
      }
      data.couponId = e.currentTarget.dataset.id
      console.log(data)
      var that = this
      var customIndex = app.AddClientUrl("/gain_coupon.html", data, 'post')

      console.log("A" + app.headerPost)
      wx.request({
        url: customIndex.url,
        header: app.headerPost,
        data: customIndex.params,
        method: 'POST',
        success: function (res) {
          console.log('---------s---------')
          console.log(res)
          // 能领取
          if (res.data.id && res.data.id > 0) {
            if (res.data.newGot == 0 && res.data.otherGot == 0){
              wx.showToast({
                title: '你已经领过了',
                icon: 'success',
                duration: 1000
              })
              var color = that.data.color;
              console.log(that.data)
              color[i] = "#E7E7E7"
                  that.setData({ color: color })
            }
            else if (res.data.otherGot == 1) {
              wx.showToast({
                title: '已被别人领取',
                icon: 'success',
                duration: 1000
              })
              var color = that.data.color;
              console.log(that.data)
              color[i] = "#E7E7E7"
              that.setData({ color: color })
            }
            else if (res.data.newGot == 0) {
              wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 1000
              })
              var color = that.data.color;
              console.log(that.data)
              color[i] = "#E7E7E7"
              that.setData({ color: color })
            }
          
          
          }
          // 不能领取
          else if (res.data.errcode && res.data.errcode == 0) {
            res = res.relateBean
          }
          else if (res.data.errcode && res.data.errcode != 0) {
        
            wx.showToast({
              title: res.data.errMsg,
              icon: 'none',
              duration: 1000
            })
          }


        },
        fail: function (res) {
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    // 点击更多卷
    clickLink: function () {

      // 前往优惠卷列表详情
      wx.navigateTo({
        url: '../../pages/available_coupons/index',
      })
      // 前往购物车
      // wx.navigateTo({
      //   url: '../../pages/promotion_products/index',
      // })
      // 活动详情
      //   wx.navigateTo({
      //     url: '../../pages/promotion_products/index',
      // })
      // 活动商品
      // wx.navigateTo({
      //   url: '../../pages/promotion_detail/index?id=17',
      // })
    },
  },


})