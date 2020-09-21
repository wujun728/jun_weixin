
import {
  json2Form
} from "../../public/json2Form.js";
const app = getApp()
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    showShare: [],
    setting: null,
    cartData: [],
    allchecked: false,
    loginUser: null,
    countPrice: 0,
    countGood: 0,
    pushItem: [],
    checkedItem: [],
    minCount: '1',
    maskLoad: false, //按钮loading

    showHongDong: false, //活动购买的时候
    /* 热销数据 */
    products: null,
    hotProduct: [],
    //规格信息
    showCount: false,
    focusData: null,
    measurementJson: null,
    minCount: '1',
    byNowParams: {}, //购买的参数
    bindType: 'addto', //加入购物车or直接下单
    focusIndex: 0,
    showKefu: false,
    hasMore: false,
    delBtnWidth: 120,
    sendIndexData: {},
  },


  touchS: function (e) {
    console.log('===touchS===', e)
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    console.log('===touchM===', e)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.cartData;
      list[0].carItems[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        cartData: list
      });
    }
  },



  touchE: function (e) {
    console.log('===touchE===', e)
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.cartData;
      list[0].carItems[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        cartData: list
      });
      console.log('=list=', this.data.cartData)
    }
  },








  toProductDetail: function (e) {
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + info.productId + "&addShopId=" + info.belongShop,
    })

  },
  oldEditIndex: -1,
  /* 编辑购物车 */
  closeOldEdit: function (index) {
    let cartData = this.data.cartData
    let focusCart = cartData[0].carItems[index]
    focusCart.showEditView = false
    this.setData({
      cartData: cartData
    })
  },
  editCart: function (e) {
    let index = e.currentTarget.dataset.index;

    if (this.oldEditIndex == -1) {

    } else {
      this.closeOldEdit(this.oldEditIndex)
    }
    this.oldEditIndex = index


    let cartData = this.data.cartData
    let focusCart = cartData[0].carItems[index]
    focusCart.showEditView = true
    focusCart.count2 = focusCart.count

    this.CartParamWaitPost.cartesianId = focusCart.measureCartesianId
    this.CartParamWaitPost.productId = focusCart.productId
    this.CartParamWaitPost.shopId = focusCart.belongShop
    this.CartParamWaitPost.count = focusCart.count
    this.CartParamWaitPost.type = 'change'

    this.setData({
      cartData: cartData
    })
  },
  sureChange: function (e) {
    let cartData = this.data.cartData
    console.log(this.CartParamWaitPost)
    this.postParams(this.CartParamWaitPost)
    this.setData({
      cartData: cartData
    })

  },
  _watchBigImage: function (e) {
    let urls = e.currentTarget.dataset.urls;
    let _url = e.currentTarget.dataset.url;
    let url = urls[0];
    if (!urls) {
      url = _url
    }
    app.lookBigImage(url, urls)
  },
  /* 右上删除 */
  deleById: function (e) {
    let that = this
    let info = e.currentTarget.dataset.info
    let listPro = {}
    listPro.shopId = info.belongShop
    listPro.selectedIds = info.id

    wx.showModal({
      title: '提示',
      content: '删除该商品',
      success: function (res) {
        if (res.confirm) {
          that.delectCart(listPro, 'some');
        } else if (res.cancel) {
          return
        }
      }
    })


  },
  /* 全部删除 */
  delectAll: function (e) {
    console.log("====delectAll====", e)
    var that = this
    var listPro = {
      shopId: '',
      selectedIds: '',
      type: 'shopall'
    }
    listPro.shopId = e.currentTarget.dataset.shopid
    wx.showModal({
      title: '提示',
      content: '全部删除',
      success: function (res) {
        if (res.confirm) {
          that.delectCart(listPro, 'all');
          // app.carChangeNotify("clear");
        } else if (res.cancel) { }
      }
    })
    try {
    } catch (e) { }
  },
  /* 删除选中 */
  delectChecked: function () {
    var that = this
    var pushItem = this.data.pushItem;
    let allDelect = 'some';
    var listPro = {
      shopId: '',
      selectedIds: '',
      type: 'selected'
    }
    console.log("", istPro.shopId)
    if (pushItem.length == that.data.cartData.length) {
      allDelect = 'all'
    }
    if (pushItem.length == 0) {
      return
    }
    for (let i = 0; i < pushItem.length; i++) {
      listPro.shopId = pushItem[i].belongShop
      listPro.selectedIds += pushItem[i].id + ','
    }
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          that.delectCart(listPro, allDelect);
        } else if (res.cancel) { }
      }
    })

  },
  //删除购物车的调用函数
  delectCart: function (params, type) {
    var that = this
    var customIndex = app.AddClientUrl("/delete_shopping_car_list_item.html", params, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('-----------delect----------')
        console.log(res.data)
        wx.hideLoading()
        if (type == 'all') {
          that.getCart()
        } else {
          that.getCart('init')
        }
        // that.setData({
        //   pushItem:[],
        //   countGood: 0,
        //   countPrice: 0
        // })
        try {
          if (type == 'all') {
            app.carChangeNotify('clear');
          } else {
            app.carChangeNotify('reload');
          }
        } catch (e) { }
      },
      fail: function (res) {
        wx.hideLoading()

      }
    })
  },
  /* 购物车操作  */

  createOrder_car: function () {
    console.log('=====ss------')
    if (!app.checkShopOpenTime()) {
      console.log('=====kong------')
      return
    }
    if (this.data.maskLoad) {
      console.log('mask')
      return
    }

    console.log('=====tt------')

    var listPro = {
      shopId: '',
      selectedIds: ''
    }

    var pushItem = this.data.pushItem
    if (pushItem.length == 0) {
      wx.showToast({
        title: '请选择下单商品',
        image: '/images/icons/tip.png',
        duration: 2000
      })
      return
    }
    for (let i = 0; i < pushItem.length; i++) {
      listPro.shopId = pushItem[i].belongShop
      listPro.selectedIds += pushItem[i].id + ','
    }
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    this.setData({
      maskLoad: true
    })
    var that = this
    var customIndex = app.AddClientUrl("/list_promotions_by_car_items.html", listPro, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'post',
      success: function (res) {
        console.log('------这里应该有promotionId数组--------')
        console.log(res.data)

        wx.hideLoading()
        if (res.data.length && res.data[0].id) {

          if (res.data.length == 1) {
            listPro.promotionId = res.data[0].id
            that.createOrder22_car(listPro)
          } else {
            that.listPro_passActive = listPro
            that.checkedActive = res.data[0].id
            that.setData({
              showHongDong: true,
              chooseArr: res.data
            })

          }
        } else {
          listPro.promotionId = '0'
          that.createOrder22_car(listPro)
        }

      },
      fail: function (res) {
        wx.hideLoading()
        that.setData({
          maskLoad: false
        })
        app.loadFail()
      }
    })
  },
  /* 选择活动 */
  closeHongDong: function () {
    this.setData({
      showHongDong: false,
      maskLoad: false
    })
  },

  listPro_passActive: {},
  checkedActive: -1, //选择的活动radio
  chooseHuodong: function (e) {
    this.checkedActive = e.detail.value
  },
  chooseActive: function (e) {
    console.log('----kong----')
    if (this.checkedActive == -1) {
      return
    }

    let id = this.checkedActive;

    console.log('选择的id', id)
    let listPro = this.listPro_passActive
    listPro.promotionId = id
    console.log(listPro)
    this.createOrder22_car(listPro)
  },
  /* 创建订单 */
  createOrder22_car: function (o) {
    var customIndex = app.AddClientUrl("/shopping_car_list_item_create_order.html", o, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data && res.data.orderNo) {

          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else if (!res.data) {
          wx.showToast({
            title: '出错了,请刷新后重试',
            image: '/images/icons/tip.png',
            duration: 2000
          })
          that.setData({
            maskLoad: false
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
          that.setData({
            maskLoad: false
          })
        }
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
        that.setData({
          maskLoad: false
        })
      },
      complete: function () {

      },
    })
  },
  /* 加入購物車 */
  subCarNum: function (e) {
    console.log('=====e=====', e)
    let that = this
    let index = e.currentTarget.dataset.id
    let focusCartItem = this.data.cartData[0].carItems[index]
    if (e.currentTarget.dataset.count == 1) {

      return
    }
    let params = {
      cartesianId: '0',
      productId: '',
      shopId: '',
      secretCode: '',
      count: '',
      type: '',
    }
    params.cartesianId = focusCartItem.measureCartesianId
    params.productId = focusCartItem.productId
    params.shopId = focusCartItem.belongShop
    params.secretCode = "sansan"

    if (focusCartItem.count == 1) {
      console.log(focusCartItem)
      params.count = 0
      params.type = 'change'
    }
    else {
      params.count = 1
      params.type = 'dec'
    }

    this.postParams(params, focusCartItem)
  },
  CartParamWaitPost: {
    cartesianId: '0',
    productId: '',
    shopId: '',
    count: '',
    type: 'change',
  },
  addCarNum: function (e) {
    let that = this
    let index = e.currentTarget.dataset.id
    let focusCartItem = this.data.cartData[0].carItems[index]


    let params = {
      cartesianId: '0',
      productId: '',
      shopId: '',
      secretCode: '',
      count: '',
      type: '',
    }
    params.cartesianId = focusCartItem.measureCartesianId

    params.productId = focusCartItem.productId
    params.shopId = focusCartItem.belongShop
    params.secretCode = "sansan"
    params.count = 1
    params.type = 'add'
    this.postParams(params, focusCartItem)
  },
  postParams: function (data, focusCartItem) {
    var that = this

    if (!focusCartItem) {
      focusCartItem = 0
    }

    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {

        console.log(res.data)
        wx.hideLoading()
        if (res.data.id) {
          if (focusCartItem) {
            focusCartItem.count = res.data.count
          }
        } else if (res.data.errcode == '-1') {
          app.echoErr(res.data.errMsg)
        }
        that.getCart("init")
        try {
          app.carChangeNotify('reload');
        } catch (e) { }
      },
      fail: function (res) {
        wx.hideLoading()
      }
    })
  },

  /* 加载购物车内容 */

  getCart: function (type) {
    console.log('==========', type)
    var customIndex = app.AddClientUrl("/get_shopping_car_list_item.html")
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('------error-------')
        console.log("加载的数据", res.data)
        if (res.data.errcode == '10001') {
          that.data.cartData = null
          that.setData({
            cartData: that.data.cartData
          })
          app.loadLogin()
        } else if (res.data.result.errcode == '-1') {
          that.data.cartData = null
          that.setData({
            cartData: that.data.cartData
          })
          app.echoErr(res.data.result.errMsg)
        } else {
          if (!res.data.result || res.data.result.length == 0) {
            that.data.cartData = null
            that.setData({
              cartData: that.data.cartData
            })
          } else if (res.data.result.errcode) {
            that.data.cartData = null
            that.setData({
              cartData: that.data.cartData
            })
            app.echoErr(res.data.result.errMsg)
          } else {
            console.log("======success====")
            that.data.cartData = res.data.result;
            that.setData({
              cartData: that.data.cartData,
              allchecked: false,
              checkedList: false
            })
            console.log("======successcartData====", that.data.cartData)
          }
          that.showPrice()
          if (type == 'init' || (type && type.detail)) {
            that.chooseAll()
          }
        }

        //wx.hideLoading()
      },
      fail: function (res) {
        // wx.hideLoading()

      }
    })
  },

  checkboxChange: function (e) {
    console.log('--------checkBox------')
    console.log(e.detail.value, 'value+++')
    var checkedItem = e.detail.value
    console.log(checkedItem, 'checkedItem--------')
    //加入选中标识
    let cartData = this.data.cartData[0].carItems
    console.log(cartData, 'cartData+++');

    if (checkedItem.length == cartData.length) {
      this.setData({
        allchecked: true
      })
    } else {
      this.setData({
        allchecked: false
      })
    }
    this.setData({
      checkedItem: checkedItem
    })
    this.showPrice()
  },
  computeProNum: function () {

  },
  chooseAll: function (e) {
    console.log("this.data.cartData", this.data.cartData);
    if (!this.data.cartData) {
      return
    }
    var checkedItem = []
    console.log(this.data.allchecked);
    console.log(this.data.cartData[0].carItems);

    if (!this.data.allchecked) {
      for (let i = 0; i < this.data.cartData[0].carItems.length; i++) {
        let cartId = this.data.cartData[0].carItems[i].id.toString();
        checkedItem.push(cartId)
      }
      console.log(checkedItem, "执行了");
      this.setData({
        checkedList: true
      })
    } else {
      checkedItem.length = 0;
      this.setData({
        checkedList: false
      })
    }


    this.setData({
      checkedItem: checkedItem,
      allchecked: !this.data.allchecked
    })
    console.log(checkedItem, 'checkedItem+++');
    this.showPrice()
  },

  showPrice: function () {
    let resultData = app.showPrice(this.data.cartData, this.data.checkedItem);
    console.log("===========resultData==========", resultData)
    this.setData({
      pushItem: resultData.pushItem || [],
      countGood: resultData.countGood,
      countPrice: resultData.countPrice
    })
    // if (!this.data.cartData) {
    //   this.setData({
    //     countGood: 0,
    //     countPrice: 0
    //   })
    //   return
    // }
    // var checkedItem = this.data.checkedItem
    // var cartDataItem = this.data.cartData[0].carItems

    // var pushItem = []
    // var countGood = 0
    // var countPrice = 0

    // for (let i = 0; i < cartDataItem.length; i++) {
    //   for (let j = 0; j < checkedItem.length; j++) {
    //     if (cartDataItem[i].id == checkedItem[j]) {
    //       pushItem.push(cartDataItem[i])
    //     }
    //   }
    // }
    // for (let i = 0; i < pushItem.length; i++) {
    //   countGood += parseInt(pushItem[i].count)
    //   console.log("====pushItem=====", pushItem[i])
    //   let promotionPrice = 0;
    //   let carItemPrice = 0;
    //   let specialSaleTypePrice = 0;
    //   if (pushItem[i].item.itemSpecialSaleType == 1) {
    //     specialSaleTypePrice = Number(pushItem[i].item.itemSpecialSaleValue2)
    //   } 
    //   if (pushItem[i].item.promotion && pushItem[i].item.promotion != 0) {
    //     promotionPrice = pushItem[i].item.promotionPrice
    //   } else {
    //     carItemPrice = pushItem[i].carItemPrice
    //   }
    //   console.log("====pushItem=====", promotionPrice, carItemPrice, specialSaleTypePrice)
    //   if (pushItem[i].item.promotion && pushItem[i].item.promotion != 0) {
    //     countPrice += ((parseInt(pushItem[i].count) * promotionPrice) - specialSaleTypePrice)
    //   } else {
    //     countPrice += ((parseInt(pushItem[i].count) * carItemPrice) - specialSaleTypePrice)
    //   }
    //   // if (pushItem[i].item.promotion && pushItem[i].item.promotion!=0){
    //   //   countPrice += parseInt(pushItem[i].count) * pushItem[i].item.promotionPrice
    //   // } else {
    //   //   countPrice += parseInt(pushItem[i].count) * pushItem[i].carItemPrice
    //   // }
    // }
    // countPrice = countPrice.toFixed(2)
    // this.setData({
    //   pushItem: pushItem,
    //   countGood: countGood,
    //   countPrice: countPrice
    // })
    // console.log(pushItem, 'pushItem__')
    // console.log(countGood, 'countGood__')
    // console.log(countPrice, "countPrice__")
  },
  /* 全部参数 */
  params: {
    page: 1,
    promotionId: "",
    productName: '',
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  // 获取热销数据
  getHotProduct: function () {
    let param = {
      page: this.params.page
    }
    var customIndex = app.AddClientUrl("/more_product_list.html", param, 'get', '1')
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {

        that.params.pageSize = res.data.pageSize
        that.params.curPage = res.data.curPage
        that.params.totalSize = res.data.totalSize

        if (that.data.hotProduct && that.data.hotProduct.length != "0") {
          let products = that.data.hotProduct
          products = products.concat(res.data.result)
          that.setData({
            hotProduct: products
          })
        }
        else {
          that.setData({
            hotProduct: res.data.result
          })
        }

        console.log("主页面获取热销数据总", that.data.hotProduct)





      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      }
    })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "shoppingcard", params: {} })
    this.setData({ sendIndexData: sendIndexData })
    this.setData({
      sysWidth: app.globalData.sysWidth,
      loginUser: app.loginUser,
      setting: app.setting
    });
    this.getCart('init')
    this.getHotProduct();
    this.getQrCode();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  openShow: false,
  onShow: function () {
    if (!!app.loginUser) {
      this.setData({
        loginUser: app.loginUser
      })
    }
    this.setData({
      maskLoad: false
    })
    if (this.openShow) {
      this.getCart('init')
    }
    this.openShow = true
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
    this.getCart("init")
    this.getHotProduct()
    this.setData({
      hasMore: false
    })

    this.params.onPullDownRefresh = true;
    // 组件内的事件
    // this.selectComponent('#productLists').getHotProduct(1, this.params.onPullDownRefresh)
    let that = this;
    setTimeout(function () {
      that.params.onPullDownRefresh = true;
    }, 500)

    wx.stopPullDownRefresh()
  },
  //点击购物车中的商品，跳转到详情页面
  clickToDetail: function (e) {
    console.log("点击购物车中的商品，跳转到详情页面")
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset)
    let promotionId = e.currentTarget.dataset.promotionid;
    let productId = e.currentTarget.dataset.id;

    console.log(e)
    console.log("============productId", productId)
    let description = e.currentTarget.dataset.description;
    if (!description || description == "undefined") {
      description = ""
    }
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + productId + "&addShopId=0",
    })
  },

  /* 分享 */
  onShareAppMessage: function (res) {
    if (res.from == "button") {
      console.log(res)
      // 商品id
      let id = res.target.dataset.id
      let products = this.data.hotProduct

      console.log("this.data.products", this.data.hotProduct)
      let index = 0;

      for (let i = 0; i < products.length; i++) {

        if (products[i].id == id) {
          console.log(products[i], i)
          index = i;
        }
      }
      let focusData = products[index]

      let imageUrl = focusData.imagePath
      let shareName = '活动价：￥' + focusData.price + '(原价：￥' + focusData.tagPrice + ')' + focusData.brandName + focusData.name
      let shareParams = {}
      shareParams.productName = focusData.productCode
      console.log('nnnnnnnnnn' + shareName)

      shareParams.id = id
      console.log("shareParams", shareParams)

      return app.shareForFx2('promotion_products', shareName, shareParams, imageUrl)
    } else {

      // 分享页面
      console.log("分享页面")
      return app.shareForFx2(app.miniIndexPage)
    }
  },
  onReachBottom: function () {
    var that = this
    // 商品数目过多会导致setData的失败，setData有最大数目所以加载8页
    if (that.params.totalSize > that.params.curPage * that.params.pageSize && that.params.page < 8) {
      that.params.page++
      // that.getHotProduct()
      // 组件内的事件
      // this.selectComponent('#productLists').getHotProduct( that.params.page)

    }

    this.setData({
      listEnd: true
    })
  },

  /* 处理热销 */
  //切割数组
  sliceArray: function (array, size) {
    var result = [];
    if (!array) {
      return result;
    }
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
      let start = x * size;
      let end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  },
  //获取图片数组 用来预览用
  getImageUrlList: function (array) {
    let result = [];
    if (!array) {
      return result;
    }
    for (let x = 0; x < array.length; x++) {
      result.push(array[x].imagePath);
    }
    return result;
  },
  sliceProductImageList: function (arr) {
    let that = this
    for (let i = 0; i < arr.length; i++) {
      arr[i].imageListArr = that.sliceArray(arr[i].itemImages, 4)
      arr[i].imageListWatcher = that.getImageUrlList(arr[i].itemImages)
      arr[i].showShare = false //显示分享
    }
    return arr
  },
  //处理图片，只要四张
  dellProductImage: function (products) {

    let productsResult = this.sliceProductImageList(products)
    this.setData({
      products: productsResult
    })
  },
  /* 热销操作 */
  //点击 ...  显示分享
  showCardShare: function (e) {
    let oldIndex = this.data.focusIndex
    let index = e.currentTarget.dataset.index;
    let products = this.data.products
    let focusData = products


    let showShare = this.data.showShare

    if (oldIndex == index) {
      focusData[index].showShare = !focusData[index].showShare
      showShare[index] = !showShare[index];
    } else {
      this.closeCardShare(oldIndex)
      focusData[index].showShare = !focusData[index].showShare
      showShare[index] = !showShare[index];
    }

    console.log('--------1--------' + index, showShare)
    console.log("focusData", focusData)
    this.setData({
      products: focusData,
      focusIndex: index,
      showShare: showShare,
    })
  },
  //关闭 ... 
  closeCardShare: function (oldIndex) {

    let index = this.data.focusIndex
    if (!isNaN(oldIndex) && oldIndex > -1) {
      index = oldIndex
    }
    console.log('--------2--------' + index)
    if (index == -1) {
      return
    }

    let products = this.data.hotProduct
    console.log("hotProduct", this.data.hotProduct)
    let focusData = products

    if (focusData[index].showShare == false) {
      return
    }
    focusData[index].showShare = false
    this.setData({
      hotProduct: products
    })
  },
  //开关显示客服的
  showKefuWechatCode: function (e) {

    let index = e.currentTarget.dataset.index;
    this.closeCardShare(index)
    this.setData({
      showKefu: true
    })
  },
  //查看客服里面的二维码
  lookBigWxCode: function (e) {
    let url = e.currentTarget.dataset.url;
    if (!url) {
      return
    }
    let urls = []
    urls.push(url)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  closeKefu: function () {
    this.setData({
      showKefu: false
    })
  },

  //看大图
  watchBigImage: function (e) {
    let urls = e.currentTarget.dataset.urls;
    let myurl = e.currentTarget.dataset.me
    console.log(urls)
    wx.previewImage({
      current: myurl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },


  /* 规格和加入购物车部分 */
  byNowParams: {
    productId: '',
    itemCount: 1,
    shopId: '',
    cartesianId: '0',
    orderType: ''
  },
  subNum: function () {
    if (this.data.measurementJson.id) {
      this.setData({ minCount: this.data.measurementJson.minSaleCount })
    } else {
      this.setData({ minCount: 1 })
    }
    if (this.byNowParams.itemCount == this.data.minCount) {
      return
    }
    this.byNowParams.itemCount--;
    this.setData({
      byNowParams: this.byNowParams
    })
  },
  addNum: function (e) {
    let cantadd = e.currentTarget.dataset.cantadd;
    if (cantadd == 1) {
      return
    } else {
      this.byNowParams.itemCount++;
      this.setData({
        byNowParams: this.byNowParams
      })
    }
  },
  selectFun: function (data) {
    let that = this
    console.log('===selectFun====', data)
    let typeData = data.detail.sendData.type;
    let reqdata = data.detail.sendData.data;
    if (typeData == 'addCat') {
      that.bindBuy(reqdata)
    } else if (typeData == 'getProData') {
      that.resProData(reqdata)
    }
  },
  //点击加入购物车或立即下单

  bindBuy: function (e) {
    console.log(e)
    let index = e.index;
    let bindBuy = e.bindbuy;
    console.log('this.data.hotProduct', this.data.hotProduct)
    let products = this.data.hotProduct
    let focusData = e.info
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
  addtocart: function () {

    if (!app.checkIfLogin()) {

      return
    }
    var params = {
      cartesianId: '',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }

    if (!this.data.focusData.measureItem || this.data.focusData.measureTypes.length == 0) {
      params.cartesianId = '0'
    } else {
      params.cartesianId = this.data.measurementJson.id
    }

    params.productId = this.data.focusData.id
    params.shopId = this.data.focusData.belongShopId
    params.count = this.byNowParams.itemCount
    params.type = 'add'

    this.postParams_hot(params)

  },

  postParams_hot: function (data) {
    var that = this
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---------------change_shopping_car_item-----------------')
        console.log(res.data)
        wx.hideLoading()

        if (that.data.bindType == 'addto') {
          that.setData({
            showCount: false
          })
        }
        if (res.data.productId && res.data.productId != 0) {
          that.setData({
            carCount: res.data.totalCarItemCount
          })
          if (data.count == 0) {
            console.log('通过加入购物车来确定购物车里面的商品数量')
          } else {
            wx.showToast({
              title: '加入购物车成功',
            })
            that.setData({
              hasMore: true
            })
          }

        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 3000
          })
        }


      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /* 创建订单 */
  createOrder22: function (o) {
    var customIndex = app.AddClientUrl("/buy_now.html", o, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (!!res.data.orderNo) {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 3000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      },
      complete: function (res) {

      }
    })
  },
  closeZhezhao: function () {
    this.MeasureParams = []
    this.setData({
      showCount: false,
      focusData: null
    })
  },
  //获取规格价格参数
  get_measure_cartesion: function () {
    this.setData({ measurementJson: { waitDataState: false } })
    this.byNowParams.cartesianId = -1
    let productId = this.data.focusData.id
    let postStr = ''

    if (!this.data.focusData.measureItem || this.MeasureParams.length == 0) {
      this.byNowParams.cartesianId = '0'
      this.setData({ measurementJson: { waitDataState: true } })//没有规格时 不需要等待请求
      return
    }
    for (let i = 0; i < this.MeasureParams.length; i++) {
      postStr += this.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)

    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        if (!res.data.id) {
          // 没有这个参数
          //......
          console.log('error')
          //.....
        }
        console.log(res.data)
        that.byNowParams.cartesianId = res.data.id
        that.setData({ measurementJson: res.data })
        that.data.measurementJson.waitDataState = true
        that.setData({ measurementJson: that.data.measurementJson })
        that.byNowParams.itemCount = that.data.measurementJson.minSaleCount
        that.setData({ byNowParams: that.byNowParams })
        that.setData({ minCount: that.byNowParams.itemCount })
        console.log('minCount', that.data.minCount)
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () { },
    })
  },
  /* 初始化 选规格 */
  chooseMeasureItem: function (focusData) {
    console.log('----------初始化规格参数-----------')
    if (!focusData.measureItem) {
      return
    }
    for (let i = 0; i < focusData.measureTypes.length; i++) {
      focusData.measureTypes[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      param.name = focusData.measureTypes[i].name
      param.value = focusData.measureTypes[i].productAssignMeasure[0].id

      this.MeasureParams.push(param)

    }
    this.setData({
      focusData: focusData
    })
    this.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)

    let focusData = this.data.focusData
    focusData.measureTypes[indexJson.str1].checkedMeasureItem = indexJson.str2
    this.setData({
      focusData: focusData
    })
  },
  //选择规格小巷---获取数据
  chooseMeasure: function (e) {
    console.log(e.detail.value)
    let chooseMeasureJson = app.getSpaceStr(e.detail.value, '-')
    console.log(chooseMeasureJson)

    for (let i = 0; i < this.MeasureParams.length; i++) {
      if (this.MeasureParams[i].name == chooseMeasureJson.str1) {
        this.MeasureParams[i].value = chooseMeasureJson.str2
      }
    }
    this.get_measure_cartesion()
  },
  // 跳转到详情页
  tolinkUrl: function (e) {
    console.log(e)
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
    app.linkEvent(a);
  },
  // 跳转到首页
  toIndex: function () {
    app.toIndex()
  },
  // 展示海报
  showPosters(e) {
    console.log("showPostersEEEE", e.detail.e.currentTarget.dataset.id)
    let that = this;
    this.setData({
      proId: e.detail.e.currentTarget.dataset.id,
      shopId: "236",
      posterState: true,

    })


  },
  // 关闭海报
  getChilrenPoster(e) {

    let that = this;
    that.setData({
      posterState: false,
    })

  },
  // 获取二维码
  getQrCode: function () {

    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
    console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    postParam.SHARE_PRODUCT_DETAIL_PAGE = this.data.proId;
    postParam.scene = userId

    // 上面是需要的参数下面的url
    var customIndex = app.AddClientUrl("/super_shop_manager_get_mini_code.html?path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d" + this.data.proId + "%26scene%3d" + userId, postParam, 'get', '1')
    var result = customIndex.url.split("?");

    customIndex.url = result[0] + "?" + result[1]

    console.log("customIndex", customIndex.url, result[0])

    var that = this
    that.setData({
      qrCodeUrl: customIndex.url
    })

  }


})