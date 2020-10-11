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

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getList();
      } else {
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
  showMenu: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['查看仓库', '取消Watch'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../repos/detail?namespace=' + e.mark.namespace + "&path=" + e.mark.path,
            });
            break;
          case 1:
            wx.showModal({
              title: '取消Watch',
              content: "是否确定取消对这个仓库的Watch?",
              showCancel: true,
              confirmText: "确定",
              confirmColor: "#ff4500",
              cancelText: "保留",
              success(res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '正在取消',
                  });
                  var url = app.config.apiUrl + "api/v5/user/subscriptions/" + e.mark.namespace + "/" + e.mark.path;
                  wx.request({
                    url: url,
                    method: "POST",
                    data: {
                      access_token: app.access_token,
                      method: 'delete'
                    },
                    success: function (result) {
                      wx.hideLoading();
                      wx.showModal({
                        title: '取消成功',
                        content: '已经成功取消对这个仓库的Watch',
                        showCancel: false,
                        success: function (res) {
                          that.getList();
                        }
                      });
                    }
                  });
                }
              }
            });
            break;
          default:
        }
      }
    })
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
      url: app.config.apiUrl + "api/v5/user/subscriptions",
      method: "POST",
      data: {
        access_token: app.access_token,
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
  },
})