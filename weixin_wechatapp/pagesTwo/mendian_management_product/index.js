
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mendianProductsList:null,
    tabItem: [
      { text: "出售中", status: 1, params: { status: 1 } },
      { text: "已售罄", status: 2, params: { status: 2 } },
      { text: "商品库", status: 0, params: { status: 0 } },
    ],
    currentIndex: 1,
    showHandleListState:{},
    showMeasureListState: {},
    animationData: {}, //抽屉
    showMask:false,
    selectProductItem:null,
    range: ['缺货','有货'],
    stateIndex:1,
    searchProductName:'',
    productType:null,
    productTypePopupState:false,
  },
  selectPopupType: function () {
    let that = this;
    that.setData({ productTypePopupState: true })
  },
  getChilrenPopupType(e) {
    console.log("======getChilrenPopupType=========", e)
    let that = this
    that.params.categoryId = e.detail.id
    that.setData({productTypePopupState: false})
    if (that.params.categoryId) {
      that.findMendianProductsList();
    }
  },
  //获取产品分类
  getProductType: function (e, typeText) {
    console.log("====e=====", e);
    var that = this
    var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html")
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log("==res====", res.data)
        if (res.data.errcode == 0) {
          let productType = res.data.relateObj;
          that.setData({
            productType: productType,
          })
          console.log("productType", that.data.productType)
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
  /* 查找商品 */
  getSearchProductName: function (e) {
    var that = this;
    console.log("getSearchProductName", e.detail.value)
    if (e.detail.value) {
      that.params.name = e.detail.value
    } else {
      that.params.name = ''
      that.setData({ searchProductName: that.params.name })
    }
    that.findMendianProductsList();
  },
  bindPickerChange: function (event) {
    console.log('====index=====', event)
    let that = this;
    let value = event.detail.value;
    that.setData({ stateIndex: Number(value)})
    console.log("===stateIndex====", that.data.stateIndex)
  },
  soldOutFun:function(e){
    let that = this;
    console.log("=======soldOutFun========", e)
    let productInfo = e.currentTarget.dataset.info;
    that.setData({ selectProductItem: productInfo })
    let productId = productInfo.id;
    let params = { productId: productId, stock: -1, cartesianId:0}
    wx.showModal({
      title: '提示',
      content: '您确定要下架该产品嘛！',
      success: function (res) {
        if (res.confirm) {
          that.setMendianProductStorage(params)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  putAwayFun:function(e){
    let that = this;
    console.log("=======putAwayFun========", e)
    let productInfo = e.currentTarget.dataset.info;
    that.setData({ selectProductItem: productInfo})
    wx.showModal({
      title: '提示',
      content: '您确定要上架该产品嘛！',
      success: function (res) {
        if (res.confirm) {
          that.setData({ showMask: true ,stateIndex: 1 })
          // that.setMendianProductStorage(params)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  editProductData:function(e){
    let that = this;
    console.log("=======editProductData========", e)
    let productInfo = e.currentTarget.dataset.info;
    let type = e.currentTarget.dataset.type;
    let productId = productInfo.itemId;
    let cartesianId = productInfo.id;
    that.setData({ selectProductItem: productInfo, })
    that.setData({ showMask: true, stateIndex: productInfo.storage ? Number(productInfo.storage.stock) : productInfo.mendianStorages[0].stock })
    // if (type=='down'){
    //   let params = { productId: productId, stock: -1, cartesianId: cartesianId }
    //   wx.showModal({
    //     title: '提示',
    //     content: '您确定要下架该产品嘛！',
    //     success: function (res) {
    //       if (res.confirm) {
    //         that.setMendianProductStorage(params)
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }else{
    //   that.setData({ showMask: true, stateIndex: productInfo.storage ? Number(productInfo.storage.stock) : 1})
    // }
  },
  tolinkUrl: function (e) {
    console.log(e.currentTarget.dataset.info)
    // product_detail.html?productId= 9219;
    let productData = e.currentTarget.dataset.info
    let link = "";
    if (productData.productType == 6) {
      link = "ticket_detail.html?productId=" + productData.id;
    } else {
      link = "product_detail.html?productId=" + productData.id;
    }
    // var a = "product_detail.html?productId=" + e.currentTarget.dataset.id; 
    app.linkEvent(link);
  },
  closeZhezhao: function () {
    let that=this;
    let showHandleListState = that.data.showHandleListState
    for (let i in showHandleListState) {
      showHandleListState[i] = false;
    }
    this.setData({ showMask: false, showHandleListState: showHandleListState })
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation.bottom('-100rpx').step()
    let setData = animation.export()
    this.setData({
      animationData: setData,
    })
  },
  sureMeasuresData: function (e) {
    console.log("======sureMeasuresData=======", e)
    let that = this;
    let selectProductItem = that.data.selectProductItem;
    let resultData = e.detail.value;
    if (!selectProductItem.measuresShow){
      resultData = Object.assign({}, resultData, {
        productId: selectProductItem.id,
      })
    } else {
      resultData = Object.assign({}, resultData, {
        productId: selectProductItem.itemId,
        cartesianId: selectProductItem.id,
      })
    }
    that.setMendianProductStorage(resultData)
    that.closeZhezhao()
  },
  setMendianProductStorage:function(data){
    let that = this
    let selectProductItem = that.data.selectProductItem;
    app.showToastLoading('loading', true)
    let customIndex = app.AddClientUrl("/wx_set_mendian_product_storage.html", data)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====setMendianProductStorage-res===', res)
        let successData = res.data.relateObj;
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '操作成功~',
            icon:'success',
            duration: 1000
          })
          let mendianProductsList = that.data.mendianProductsList
          for (let i = 0; i < mendianProductsList.length; i++) {
            if (!selectProductItem.measuresShow) {
              console.log("=====主产品======",selectProductItem)
              if (mendianProductsList[i].id == selectProductItem.id) {
                mendianProductsList.splice(i, 1)
              }
            } else {
              console.log("=====产品规格======", selectProductItem)
              if (mendianProductsList[i].id == successData.itemId) {
                console.log("=======1======", mendianProductsList[i])
                for (let j = 0; j < mendianProductsList[i].cartesians.length;j++){
                  if (mendianProductsList[i].cartesians[j].id == successData.id){
                    console.log("=======2======", mendianProductsList[i].cartesians[j])
                    mendianProductsList[i].cartesians.splice(j, 1, successData)
                  }
                }
              }
            }
          }
          that.setData({ mendianProductsList: mendianProductsList})
          that.closeZhezhao()
        } else {
          wx.showModal({
          title: '提示',
          content: res.data.errMsg + '~',
          success: function (res) {
              if (res.confirm) {
                // that.setMendianProductStorage(params)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          // wx.showToast({
          //   title: res.data.errMsg+'~',
          //   image: '/images/icons/tip.png',
          //   duration: 1000
          // })
        }
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  showMeasureListFun:function(e){
    let that=this;
    console.log("=======showMeasureListFun========",e)
    let productId = e.currentTarget.dataset.id;
    let showMeasureListState = that.data.showMeasureListState
    let state = showMeasureListState['showMeasureListState_' + productId]
    for (let i in showMeasureListState){
      showMeasureListState[i]=false;
    }
    showMeasureListState['showMeasureListState_' + productId] = !state
    that.setData({ showMeasureListState: showMeasureListState })
    let showMeasureListState2 = showMeasureListState['showMeasureListState_' + productId]
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    console.log("=======popupFormPage==========", animation, this.data.showMeasureListState2)
    if (showMeasureListState2) {
      animation.bottom('100rpx').step()
    } else {
      animation.bottom('-100rpx').step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  showHandleListFun:function(e){
    let that=this;
    console.log("=======showHandleListFun========", e)
    let productId = e.currentTarget.dataset.id;
    let showHandleListState = that.data.showHandleListState
    let state = showHandleListState['showHandleListState_' + productId]
    console.log("=======showHandleListState1========", showHandleListState)
    for (let i in showHandleListState) {
      showHandleListState[i] = false;
    }
    showHandleListState['showHandleListState_' + productId] = !state
    console.log("=======showHandleListState2========", showHandleListState)
    that.setData({ showHandleListState: showHandleListState })
    let showHandleListState2 = !state
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    console.log("=======popupFormPage==========", animation, this.data.showHandleListState2)
    if (showHandleListState2) {
      animation.height('70rpx').step()
    } else {
      animation.height('0rpx').step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  //扫一扫 核销
  getVerificationCode: function (e) {
    let that=this;
    console.log("getVerificationCode", e)
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: (scanRes) => {
        console.log("getVerificationCode", scanRes, scanRes.result)

        that.params.name = scanRes.result
        that.setData({ searchProductName: scanRes.result })
        that.findMendianProductsList();
        // wx.navigateTo({
        //   url: "/" + scanRes.path
        // })
      }
    })
  },
  changeProductState: function (e) {
    let that = this;
    console.log("===changeStateProcess===", e)
    let index = e.currentTarget.dataset.index
    that.listPage.page = 1
    that.data.currentIndex=index
    that.setData({ currentIndex: index })
    that.findMendianProductsList();
  },
  /* 获取数据 */
  findMendianProductsList: function () {
    let that = this
    app.showToastLoading('loading', true)
    let params = Object.assign({}, that.params, { status: that.data.currentIndex, page: that.listPage.page })
    let customIndex = app.AddClientUrl("/wx_find_mendian_products.html", params)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====findMendianProductsList-res===',res)
        if(res.data.errcode == 0){
          let dataArr = that.data.mendianProductsList
          that.listPage.pageSize = res.data.relateObj.pageSize
          that.listPage.totalSize = res.data.relateObj.totalSize
          if ((!res.data.relateObj.result || res.data.relateObj.result.length == 0) || that.listPage.page == 1) {
            dataArr = [];
          }
          dataArr = dataArr.concat(res.data.relateObj.result)
          let showMeasureListState = that.data.showMeasureListState
          let showHandleListState = that.data.showHandleListState
          for (let i = 0; i < dataArr.length;i++){
            showMeasureListState['showMeasureListState_' + dataArr[i].id]=false
            showHandleListState['showHandleListState_' + dataArr[i].id] = false
          }
          that.setData({ mendianProductsList: dataArr, showMeasureListState: showMeasureListState, showHandleListState: showHandleListState})
        }else{
          wx.showModal({
            title: '提示',
            content: '主人~请求超时！确认重新加载',
            success: function (res) {
              if (res.confirm) {
                that.getUserCardPackage()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  params:{},
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('===options===', options)
    let that=this;
    that.findMendianProductsList();
    that.getProductType()
    console.log("===loginUser====", that.data.loginUser)
    console.log("===setting====", that.data.setting)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({ setting: app.setting, loginUser: app.loginUser })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    this.listPage.page = 1
    this.findMendianProductsList();
    wx.stopPullDownRefresh()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    var that = this
    if (that.listPage.totalSize > that.listPage.page * that.listPage.pageSize) {
      that.listPage.page++
      this.findMendianProductsList();
    }else{
      wx.showToast({
        title: '到底啦~',
        image: '/images/icons/tip.png',  //image的优先级会高于icon
        duration: 1000
      })
    }
  },

})