

const app = getApp()

Page({

  data: {
    options:null,
    searchSpaceName:'',
    params:{},
  },
  /* 全部参数 */
  params: {
    name: "", 
    addressStr: "", 
    page: 1,
    latitude:'0',
    longitude:'0',

  },
  /* 查找商品 */
  getSearchSpaceName: function (e) {
    console.log(e)
    var that = this
    if (e.detail.value){
      that.params.name = e.detail.value
    }else{
      that.params.name=''
    }
    that.setData({ searchSpaceName: that.params.name})
    that.selectComponent("#spaceList").getSearchSpaceName(that.params);
  },
  /* 商品显示方法 */

  bindSpaceshowWay: function () {
    if (this.data.SpaceshowWay == 1) {
      this.setData({ SpaceshowWay: 2 })
    } else{
      this.setData({ SpaceshowWay: 1 })
    }

  },
  /* 组件事件集合 */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({ options: options})
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

    let that = this;
    that.setData({ searchSpaceName: "" })
    that.selectComponent("#spaceList").onPullDownRefresh();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.selectComponent("#spaceList").onReachBottom();
  },

})