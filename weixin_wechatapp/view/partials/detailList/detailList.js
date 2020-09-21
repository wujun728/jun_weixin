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
    url: '',
    /* seeting */
    setting: null,
    indexData: null,
    //四个数据源
    newsList: null,
    activityPromotion: null,
    unactivityPromotion: null,
    products: null,
    activityPromotionNum: null,
    more_scene: '',
    sysWidth: 320,//图片大小 
    loginUser: null,

    /* 热销数据 */
    //规格信息
    showCount: false,
    focusData: null,
    measurementJson: null,

    byNowParams: {},//购买的参数
    bindType: 'addto', //加入购物车or直接下单
    focusIndex: 0,
    showKefu: false,
    productData: null, // 商品数据 
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);
    },

    // 点击
    readyPay2: function (e) {
      if (!app.checkIfLogin()) {
        return
      }
      let productData = this.data.productData
      console.log(productData)
      let way = e.currentTarget.dataset.way
      if (way == 'cart') {
        if (productData.measures.length == 0) {
          this.addtocart()
        } else {

          this.setData({ bindway: way })
          this.setData({ showCount: true })
          let info = productData.productInfo
          this.byNowParams.productId = info.productId
          this.byNowParams.shopId = info.belongShopId
          this.byNowParams.orderType = 0
          this.setData({ byNowParams: this.byNowParams })
          this.chooseMeasureItem()
        }
      } else {

        this.setData({ bindway: way })
        this.setData({ showCount: true })
        let info = productData.productInfo
        this.byNowParams.productId = info.productId
        this.byNowParams.shopId = info.belongShopId
        this.byNowParams.orderType = 0
        this.setData({ byNowParams: this.byNowParams })
        this.chooseMeasureItem()

      }




    },

    //点击加入购物车或立即下单

    bindBuy: function (e) {
      let index = e.currentTarget.dataset.index;
      let bindBuy = e.currentTarget.dataset.bindbuy;
    
      let products = this.data.products
      let focusData = products[index]
      this.byNowParams.productId = focusData.id
      this.byNowParams.shopId = focusData.belongShopId
      this.byNowParams.orderType = 0
      this.chooseMeasureItem(focusData)
      console.log(focusData)
      this.setData({
        focusData: focusData,
        showCount: true,
        byNowParams: this.byNowParams,
        bindBuy: bindBuy
      })
    },
    buyNow: function () {
      console.log(this.byNowParams)
      if (!app.checkShopOpenTime()) {
        return
      }

      if (!app.checkIfLogin()) {
        return
      }
      //立即购买
      if (this.data.bindBuy == 'addto') {
        console.log('加入购物车')
        //addto
        this.addtocart()
      } else {
        console.log('立即购买')
        this.createOrder22(this.byNowParams)
      }

    },
    /* 加入購物車 */
    addtocart: function (e) {
      console.log(e)
    //   var that = this;
   
    //   var params = {
    //     cartesianId: '',
    //     productId: '',
    //     shopId: '',
    //     count: '',
    //     type: '',
    //   }

 

    //   params.productId = this.data.focusData.id
    //   params.shopId = this.data.focusData.belongShopId
    //   params.count = this.byNowParams.itemCount
    //   params.type = 'add'

    //   // this.postParams(params)
   
    //   var customIndex = app.AddClientUrl("/change_shopping_car_item.html", params, 'post')
    //   wx.request({
    //     url: customIndex.url,
    //     data: customIndex.params,
    //     header: app.headerPost,
    //     method: 'POST',
    //     success: function (res) {
    //       console.log('---------------change_shopping_car_item-----------------')
    //       console.log(res.data)
    //       wx.hideLoading()

    //       if (that.data.bindType == 'addto') {
    //         that.setData({ showCount: false })
    //       }
    //       if (res.data.productId && res.data.productId != 0) {
    //         that.setData({
    //           carCount: res.data.totalCarItemCount
    //         })
    //         if (data.count == 0) {
    //           console.log('通过加入购物车来确定购物车里面的商品数量')
    //         } else {
    //           wx.showToast({
    //             title: '加入购物车成功',
    //           })
    //         }
    //       } else {
    //         wx.showToast({
    //           title: res.data.errMsg,
    //           image: '/images/icons/tip.png',
    //           duration: 3000
    //         })
    //       }


    //     },
    //     fail: function (res) {
    //       wx.hideLoading()
    //       app.loadFail()
    //     }
    //   })

    // },

    // getCart: function () {
    //   let focusProduct = this.data.products[0]
    //   var params = {}
    //   params.productId = focusProduct.id
    //   params.shopId = focusProduct.belongShopId
    //   params.count = 0
    //   params.type = 'add'
    //   this.postParams(params)
    },
    postParams: function (data) {
   
    },




  },
})