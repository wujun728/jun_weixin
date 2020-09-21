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
    orderType:'0',
  }, timer: null,
  ready: function () {

  let that=this;
    setTimeout(function () {
     
      console.log("that", that.data)
      let products = that.data.data
      that.setData({
        products: products
      })

    }, 1000)


  },
  methods: {
    // 这里是一个自定义方法
    getData: function () {
      console.log("this", this.data)
      let products = this.data.data.products
      this.setData({
        products: products
      })
    },
    tolinkUrl: function (e) {
      console.log(e.currentTarget.dataset.id)
      // product_detail.html?productId= 9219;
      var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
      app.linkEvent(a);
    },
      //点击 ...  显示分享
  showCardShare: function (e) {
    if (this.timer){
     clearTimeout(this.timer);
    }
    console.log("this", this.data)
  let that=this;
       // 找到商品id
      let id = e.currentTarget.dataset.id;
      console.log("id", id)
       // 循环products
      let products = this.data.products
      let a = 0;
      for (let i = 0; i < products.length; i++) {
        a = i;
        if (products[a].id == id) {
          products[a].productShow = true
          console.log(products[a])
            }
            else {
          products[a].productShow = false
            }
          }
      this.setData({
        products: products,
      })
   this.timer = setTimeout(function () {
        let productsCloseShow = that.data.products
        let b = 0;
        for (let j = 0; j < productsCloseShow.length; j++) {
          b = j;
          if (productsCloseShow[b].productShow == true) {

            productsCloseShow[b].productShow = false
    
          }
     
        }
        that.setData({
          products: productsCloseShow,
        })
   
   
      }, 111000)
     
 
    
    },
  sharePages: function (e) {
    // 找到商品id
    console.log('===sharePages==',e)
    let id = e.currentTarget.dataset.proinfo.id;
    console.log("id", id)

    // 循环products
    let products = this.data.products

    for (let i = 0; i < products.length; i++) {

      products[i].productShow = false
    }
    this.setData({
      products: products,
    })
    console.log(this.data.products)

  },
  // 加入购物车
    clickReqFun: function (e) {
     console.log("e",e)
     let sendData = { type: e.target.dataset.type, data: e.target.dataset}
     this.triggerEvent("action", { sendData});
    },
  
    // 点击海报
    showPosters: function (e) {
      console.log("eeeeeeeeeeeeeeeeeeeee", e)
      let id = e.target.dataset.id;

      let that=this;
      let productsCloseShow = that.data.products
      let b = 0;
      for (let j = 0; j < productsCloseShow.length; j++) {
        b = j;
        if (productsCloseShow[b].productShow == true) {
          productsCloseShow[b].productShow = false
        }
      }
      that.setData({
        products: productsCloseShow,
        posterState:true,
        proId:id
      })
      this.getQrCode(e.target.dataset.type);

      // this.triggerEvent("showPosters", { e });
    },
    // 获取二维码
    getQrCode: function (type) {

      let userId = "";
      if (app.loginUser && app.loginUser.platformUser) {
        userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
      }
      console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
      // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
      let postParam = {}
      let str = '';
      let str2 = '';
      if (type == 'active') {
        str = 'SHARE_PROMOTION_PRODUCTS_PAGE'
        str2 = '/super_shop_manager_get_mini_code.html?path=pageTab%2findex%2findex%3fSHARE_PROMOTION_PRODUCTS_PAGE%3d'
      } else if (type == 'product'){
        str = 'SHARE_PRODUCT_DETAIL_PAGE'
        str2 = '/super_shop_manager_get_mini_code.html?path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d'
      }
      console.log(str, str2)
      postParam[str] = this.data.proId;
      postParam.scene = userId

      // 上面是需要的参数下面的url
      var customIndex = app.AddClientUrl(str2 + this.data.proId + "%26scene%3d" + userId, postParam, 'get', '1')
      var result = customIndex.url.split("?");

      customIndex.url = result[0] + "?" + result[1]

      console.log("customIndex", customIndex.url, result[0])

      var that = this
      that.setData({
        qrCodeUrl: customIndex.url
      })

    },
    // 关闭海报
    getChilrenPoster(e) {

      let that = this;
      that.setData({
        posterState: false,
      })

    },
    // 获得特卖数据(特卖的上拉加载和下拉刷新)
    getNewData(id, page, onPullDownRefresh){
      console.log("1111111111", id, page, onPullDownRefresh)
     let that = this
     console.log("id",id)
     let param={}
     param.promotionId =id
     param.page=page
     param.orderType=that.data.orderType
     if (onPullDownRefresh==true){
     that.setData({
       products:[]
     })
    }

     let customIndex = app.AddClientUrl("/more_product_list.html", param, 'get')
     console.log("customIndex.url", customIndex.url)
    //  wx.showLoading({
    //    title: 'loading'
    //  })
    app.showToastLoading('loading', true)

     wx.request({
       url: customIndex.url,
       header: app.header,
       success: function (res) {
         if (that.data.products && that.data.products!=""){
           let products = that.data.products
           console.log("组件商品", products)
           products = products.concat(res.data.result)
           console.log("组件特卖数据", products)
           that.setData({
             products: products
           })
         }
         else{
           console.log("组件特卖数据", res.data.result)
           that.setData({
             products: res.data.result
           })
         }
         let sendData = { pageSize: res.data.pageSize, totalSize: res.data.totalSize, curPage: res.data.curPage}
         that.triggerEvent("resProData", { sendData});
         wx.hideLoading()
       },
       fail: function (res) {
         console.log("fail")
         wx.hideLoading()
         app.loadFail()
       }
     })
  },
 
    // 获取热销数据
    getHotProduct: function (page, onPullDownRefresh) {
      console.log("购物车内的商品上拉加载第几页",page)
      var that = this
      let param = {
        page: page,
      }

      if (onPullDownRefresh == true) {
        that.setData({
          products: []
        })
      }
      var customIndex = app.AddClientUrl("/more_product_list.html", param, 'get', '1')
 
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log("获取热销数据", res.data)
          if (that.data.products && that.data.products != "") {
            let products = that.data.products
            products = products.concat(res.data.result)
            console.log("组件购物车数据", products)
            that.setData({
              products: products
            })
          }
          else {
            console.log("组件特卖数据", res.data.result)
            that.setData({
              products: res.data.result
            })
          }
        },
        fail: function (res) {
          console.log("fail")
          app.loadFail()
        }
      })
    },


// 特卖中的价格排序
    sortingPrice:function(promotionId,orderType){
      console.log("价格排序组件内的商品", orderType)
      let that=this;
      that.data.orderType = orderType
      console.log('===that.data.orderType=====',that.data.orderType)
      that.getNewData(promotionId,1,true)
    //   let products = this.data.products;
    //   // 排序
    //   let temp;
    //   for (let i = 0; i < products.length;i++){
   
    //     for (let j = i + 1; j < products.length; j++) {
    //       if (products[i].price > products[j].price) {
    //         temp = products[i];
    //         products[i] = products[j];
    //         products[j] = temp;
    //       }
    //     }
    //   }
    //   console.log("价格排序完的",products)
    //  that.setData({
    //    products: products
    //  })

    },
    // 特卖中的价格降排序
    sortingPriceFalling: function () {
      console.log("价格排序组件内的商品", this.data.products)
      let that = this;
      let products = this.data.products;
      // 排序
      let temp;
      for (let i = 0; i < products.length; i++) {

        for (let j = i + 1; j < products.length; j++) {
          if (products[i].price <products[j].price) {
            temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
        }
      }
      console.log("价格排序完的", products)
      that.setData({
        products: products
      })

    },


    // 特卖中的热度排序
    sortingHot:function() {
      console.log("热度排序组件内的商品", this.data.products)
      let that = this;
      let products = this.data.products;
      // 排序
      let temp;
      for (let i = 0; i < products.length; i++) {

        for (let j = i + 1; j < products.length; j++) {
          if ((products[i].stock/products[i].totalStock) > (products[j].stock/products[j].totalStock) ) {
            console.log(products[i].stock / products[i].totalStock +"===" +products[j].stock / products[j].totalStock)
            temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
        }
      }
      // console.log("热度排序完的", products[0].stock / products[0].totalStock)
      that.setData({
        products: products
      })

    },

  },
})