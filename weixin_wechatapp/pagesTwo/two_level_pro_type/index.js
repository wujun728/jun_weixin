  

const app = getApp()

Page({

  data: {
    animationData:{},
    setting: null, // setting   
    productTypeTwo: [], // 商品数据 
    productType:[],
    currentItem: {},
    sendIndexData: null,
    sysWidth: 320,//图片大小
    tab:'',
    topName: {
      SearchProductName: "",//头部搜索的
    },
    canRefresh:true,
    title:null,
  },
  //获取产品分类
  getProductType: function (e,typeText) {
    console.log("====e=====", e);
    var that = this
    let categoryId;
    let type ="init";
    let productType = that.data.productType;
    let productTypeTwo=[]
    if (e){
      if (e.currentTarget){
        categoryId = e.currentTarget.dataset.id
        type = e.currentTarget.dataset.type
      } else {
        categoryId = e
        type = typeText;
      }
    }else{
      categoryId=0
    }
    console.log("===type==", type)
    var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: categoryId })
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
          if (type == "init") {
            productType = res.data.relateObj;
            that.setData({ productType: productType })
            console.log("productType", that.data.productType)
            that.getProductType(productType[0].id,'first')
          } else {
            productTypeTwo = res.data.relateObj;
            let all = { id: categoryId, name: '全部', parentId: categoryId, iconImage:'http://image1.sansancloud.com/cangku/2019_9/23/15/7/49_575.jpg?x-oss-process=style/preview_120'}
            productTypeTwo.splice(0,0,all)
            that.setData({ productTypeTwo: productTypeTwo })
            console.log("productTypeTwo", that.data.productTypeTwo)
          }
        } else {
        }
        console.log("==productType==", productType)
        if (productType.length!=0){
          for (let i = 0; i < productType.length; i++) {
            productType[i].colorAtive = '#888';
            productType[i].active = false;
          }
          if (type == "init"){
            productType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
            productType[0].active = true;
            that.setData({ currentItem: productType[0] })
         }else{
            for (let i = 0; i < productType.length; i++) {
              if (categoryId == productType[i].id) {
                that.setData({ currentItem: productType[i] })
                productType[i].colorAtive = that.data.setting.platformSetting.defaultColor;
                productType[i].active = true;
              }
            }
         }
        }
        that.setData({ productType: productType})
        console.log("that.data.productType", that.data.productType)
        console.log("that.data.productTypeTwo", that.data.productTypeTwo)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //跳转到订单页面
  linkUrl:function(e){
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 全部参数 */
  params: {
    categoryId: "",
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("===options=====", options)
    let that=this;
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "product_type_list", params: { } })
    that.setData({ sendIndexData: sendIndexData })
    that.setData({ setting: app.setting, title: { androidTemplate: "pupu_product_search", jsonData: { bgColor: app.setting.platformSetting.topBgColor == '#FFFFFF' ? '#333333' : app.setting.platformSetting.topBgColo,title:"请输入关键词搜索"}}})
    wx.setNavigationBarColor({
      frontColor: app.setting.platformSetting.topColor.toLowerCase(),
      backgroundColor: app.setting.platformSetting.topBgColor,
    })
    if (options.parentCategoryId) {
      that.setData({ positionTab: options.parentCategoryId })
      options.categoryId = options.parentCategoryId
      that.getProductType(options.categoryId)
    } else {
      that.getProductType(options.categoryId)
    }
    for (let i in options) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = options[i] }
      }
    }
    console.log(this.params)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom2: function () {
  
    
  },

})