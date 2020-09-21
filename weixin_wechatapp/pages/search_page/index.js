

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    searchStorage:[],
    searchValue:"",
    hotSearchList:[],
  },
  searchValue: "",
  toIndex(){
    app.toIndex()
  },
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
    this.setData({
      searchStorage: [],
    })
  },
  /* 查找商品 */
  getSearchProductName: function (e) {
    console.log("===getSearchProductName===")
    let that = this;
    let searchData = that.data.searchStorage;
    console.log("===searchStorage-start==", searchData)
    if (searchData.length != 0) {
      console.log("历史有数据")
      let count=0;
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i].name != that.searchValue && that.searchValue!="") {
          count++
        }
      }
      if (count == searchData.length){
        searchData.push({
          id: searchData.length,
          name: that.searchValue
        })
      }
    } else {
      console.log("历史没数据")
      if (that.searchValue != ""){
        searchData.push({
          id: searchData.length,
          name: that.searchValue
        })
      }
    }
    console.log("===searchStorage-end==", searchData)
    wx.setStorageSync('searchData', searchData);
    // let pages = getCurrentPages();//当前页面
    // let prevPage = pages[pages.length - 2];//上一页面
    // prevPage.setData({//直接给上移页面赋值
    //   searchValue: that.searchValue,
    // });
    // wx.navigateBack(
    //   { delta: 1, }
    // )
    that.tolinkUrl("milk_product_list.html?productName=" + that.searchValue)
  },
  saveSearchValue:function(e){
    console.log("===saveSearchValue===", e)
    let that = this
    if (e.detail.value || e.currentTarget.dataset.value){
      that.searchValue = e.currentTarget.dataset.value ? e.currentTarget.dataset.value:e.detail.value.replace(/\s+/g, '')
    }else{
      that.searchValue = ""
    }
    if (e.currentTarget.dataset.value){
      that.getSearchProductName();
    }
    that.setData({ searchValue: that.searchValue})
    console.log("that.searchValue", that.searchValue)
  },
  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/wx_find_space_assets.html", param)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.assetsList
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
          that.setData({ assetsList: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.relateObj.result)
          that.setData({ assetsList: dataArr })
        }
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget ? e.currentTarget.dataset.link : e
    app.linkEvent(linkUrl)
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.initSetting();
    let searchStorage= wx.getStorageSync('searchData') || [];
    console.log("===searchStorage====", searchStorage)
    that.setData({ searchStorage: searchStorage})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initSetting(){
    console.log("===setting===", app.setting, app.properties)
    let hotSearchList = app.setting.platformSetting.tagsMap["产品热搜"]||[]
    this.setData({ setting: app.setting, hotSearchList: hotSearchList, properties: app.properties})
    wx.setNavigationBarColor({
      frontColor: app.setting.platformSetting.topColor.toLowerCase(),
      backgroundColor: app.setting.platformSetting.topBgColor,
    })
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
    this.params.page = 1
    this.getData(this.params, 2)

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      that.params.page++
      this.getData(this.params);
    }
  },

})