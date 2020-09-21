  
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    setting: null, // setting 
    assetData: null, // 商品数据 
    targs:null,
    posterState: false,
    qrCodeUrl:"",
    swiperIndex: 1,
    totalImg:0,
    organizesList: [],
    color:'',
    secondColor:"",
    sendAssetData:"",
    sendIndexData: "",
  },
  /*轮播图下标*/
  swiperChange: function (e) {
    this.setData({ swiperIndex: e.detail.current + 1 })
  },

  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  showPoster:function(){
    console.log('===showPoster====', app.clientNo)
    let that = this;
    this.getQrCode();
    that.setData({
      posterState: true,
    })
  },
  toIndex: function () {
    app.toIndex()
  }, 
  posterStateFun:function(state){
    console.log('====state====',state)
    this.setData({
      posterState: true
    })
  },
  getChilrenPoster:function(e){
    console.log('=======',e)
    this.setData({
      posterState: false
    })
  },
  tolinkUrl: function (e) {
    if (!app.loginUser) {
      wx.showModal({
        title: '提示',
        content: '主人~您还在登陆哦!稍等片刻',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  lookBigImage: function (e) {
    console.log("111111111", e.currentTarget.dataset)
    let imgSrc = e.currentTarget.dataset.imageurl
    let imgArray=[]
    let index = e.currentTarget.dataset.index
    let PostImageSrc=[];
    console.log(imgSrc)
    for (let i = 0; i < imgSrc.length;i++){
      imgArray.push(imgSrc[i].imagePath)
      PostImageSrc.push(imgSrc[i].imagePath.replace(/http/, "https"))
    }
    // let PostImageSrc = imgSrc
    console.log(PostImageSrc)
    if (!imgSrc) {
      return
    }
    // let urls = []
    // urls.push(imgSrc)
    wx.previewImage({
      current: imgArray[index], // 当前显示图片的http链接
      urls: imgArray // 需要预览的图片http链接列表
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  orderAsset:function(){
  },
  getOrganizesData: function (spaceId){
    let that=this;
    let data={
      spaceId: spaceId,
    }
    that.setData({ pintuanParam: data})
    var pintuanUrl = app.AddClientUrl("/wx_find_asset_space_organizes.html", data, 'post')
    wx.request({
      url: pintuanUrl.url,
      data: pintuanUrl.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------add----------')
        console.log(res.data)
        that.setData({ organizesList: res.data.relateObj.result })
        if (that.data.organizesList.length==1){
          that.setData({ visiblePintuanNum: 1 })
        }else{
          that.setData({ visiblePintuanNum: 2 })
        }

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  getData:function(options){
    let param = {}
    let that = this
    if (!options){
      param = that.dataFOr_getData
    }else{
      param = options
    }
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    console.log('==param===', param)
    let postParam = {}
    postParam.assetId = param.assetId
    let customIndex = app.AddClientUrl("/wx_get_asset_detail.html", postParam)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res)
        that.setData({ pintuanState: false })
        console.log('--------------getData-------------')
        if (res.data.relateObj.firstImage){
          that.setData({ totalImg: 1, imgArr: [{ firstImage: res.data.relateObj.firstImage}]}, )
        }
        if (res.data.relateObj && res.data.relateObj.tags){
          let tagsStr = res.data.relateObj.tags
          let tagsStr2 = tagsStr.replace(/\[/g, '');
          let tagArr = tagsStr2.split(']')
          tagArr.length --;
          that.setData({
            targs: tagArr
          })
          console.log('targs', that.data.targs)
        }
        if (res.data.relateObj.text){
          WxParse.wxParse('article', 'html', res.data.relateObj.text, that, 10);
          console.log('====article====', that.data.article)
        }
        if (res.data.relateObj.leaseStartDatetime || res.data.relateObj.leaseEndDatetime) {
          let reg = new RegExp('-', "g")
          res.data.relateObj.leaseStartDatetime = res.data.relateObj.leaseStartDatetime.replace(reg , ".")
          res.data.relateObj.leaseEndDatetime = res.data.relateObj.leaseEndDatetime.replace(reg , ".")
          res.data.relateObj.leaseStartDatetime = res.data.relateObj.leaseStartDatetime.slice(0, -9)
          res.data.relateObj.leaseEndDatetime = res.data.relateObj.leaseEndDatetime.slice(0, -9)
        }
        that.setData({ assetData: res.data.relateObj })
        console.log('assetData', that.data.assetData)
      },
      fail: function (res) {
        console.log("====fail=====")
        app.loadFail()
      },
      complete:function(res){
        wx.hideLoading()
      },
    })
  },
  dataFOr_getData:{
    assetId:'',
  }, 
  onError:function(options){
    console.log("on error!!!");
  },
  onLoad: function (options) {
    console.log('--------product----------', options)
    let that = this;
    that.setData({ setting: app.setting })
    that.setData({
      assetId: options.assetId,
      color: app.setting.platformSetting.defaultColor,
      secondColor: app.setting.platformSetting.secondColor
    });
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "asset", params: { pageObjectId: options.assetId }})
    that.setData({ sendIndexData: sendIndexData })
    let sendAssetData = JSON.stringify({ title: 'noTitle', url: "asset_" + options.assetId })
    that.setData({ sendAssetData: sendAssetData })
    console.log("商品id和店铺id",options)
    that.dataFOr_getData.id = options.assetId
    that.setData({ dataFOr_getData:that.dataFOr_getData})
    that.getData(options)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    
    
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
  onReachBottom: function () {
  
  },
 
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function (res) {
    console.log(res)
    let that = this
    let params = that.dataFOr_getData;
    let productItem = that.data.assetData;
    if (!productItem.brandName || productItem.brandName == "") {
      productItem.brandName = ""
    };
    let shareName = '活动价：￥' + productItem.price + '(原价：￥' + productItem.tagPrice + ')' + productItem.brandName + productItem.name;
    console.log('params:', params, that.data.assetData)
    return app.shareForFx2('productDetail', shareName, params)
  },
  // 获取二维码
  getQrCode:function() {

    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
   // console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    postParam.SHARE_PRODUCT_DETAIL_PAGE = this.data.proId;
    postParam.scene = userId

    // 上面是需要的参数下面的url
    console.log('====pp======',"/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d" + this.data.proId + "%26scene%3d" + userId)
    var customIndex = app.AddClientUrl("/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fSHARE_PRODUCT_DETAIL_PAGE%3d" + this.data.proId + "%26scene%3d" + userId, postParam, 'get', '1')
    var result = customIndex.url.split("?");

    customIndex.url = result[0] + "?" + result[1]

    console.log("customIndex", customIndex.url, result[0])

    var that = this
    that.setData({
      qrCodeUrl: customIndex.url
    })

  },
  // 定位
  clickCatch: function (e) {
    console.log(this.data.assetData)
    let latitude = this.data.assetData.latitude;
    let longitude = this.data.assetData.longitude;
    let name = this.data.assetData.name;
    let address = this.data.assetData.province + this.data.assetData.city + this.data.assetData.area +this.data.assetData.address 
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 12,
      name: name,
      address: address
    })
  },
})