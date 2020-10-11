const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    //分页开始
    page: 1,
    isGetingData: false,
    list: [],
    keyword: ""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},
  searchTimer: null,
  search: function (e) {
    var that = this;
    this.setData({
      keyword: e.detail.value,
    });
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(function () {
      that.getList(false);
    }, 1000);
  },
  /**
   * 页面显示事件
   */
  onShow: function () {
    app.getUserInfo(function (result) {
      if (!result) {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.setData({
      page: 1
    });
    this.getList();
  },
  /**
   * 上拉加载时间
   */
  onReachBottom: function () {
    if (!this.data.isGetingData) {
      this.setData({
        page: this.data.page + 1
      });
      this.getList();
    }
  },
  /**
   * 获取数据列表
   */
  getList: function (loading = true) {
    var that = this;
    if (loading) {
      wx.showLoading({
        title: '数据加载中',
      });
    }
    if (that.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    that.isGetingData = true;
    wx.request({
      url: app.config.apiUrl + "api/v5/search/repositories",
      method: "POST",
      data: {
        access_token: app.access_token,
        q: that.data.keyword,
        page: that.data.page,
        method: 'get'
      },
      success: function (result) {
        that.isGetingData = false;
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '获取失败',
            content: "你可以尝试重新登录或稍后再试",
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        } else {
          if (that.data.page == 1) {
            that.setData({
              list: result.data
            });
          } else {
            var _list = that.data.list;
            for (var i = 0; i < result.data.length; i++) {
              _list.push(result.data[i]);
            }
            that.setData({
              list: _list
            });
          }
        }
      }
    });
  }
})