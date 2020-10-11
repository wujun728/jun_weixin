const app = getApp()
/**
 * 页面的初始数据
 */
Page({
  data: {
    isGetingData: false,
    keyList: [],
    KeyFormShow: false
  },
  onLoad: function (e) {},
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getKeys();
      }else{
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.getKeys();
  },
  showMenu: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: [
        '查看公钥',
        '删除公钥'
      ],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            wx.showModal({
              title: '查看公钥',
              content: e.mark.key,
              showCancel: true,
              confirmText: "复制",
              cancelText: "返回",
              success(res) {
                if (res.confirm) {
                  wx.setClipboardData({
                    data: e.mark.key,
                    success(res) {
                      wx.showToast({
                        title: '复制成功',
                      });
                    }
                  })
                }
              }
            });
            break;
          case 1:
            wx.showModal({
              title: '删除',
              content: "你是否确定删除公钥:" + e.mark.title,
              showCancel: true,
              confirmText: "删除",
              cancelText: "返回",
              success(res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '公钥删除中',
                  });
                  var url = app.config.apiUrl + "api/v5/user/keys/" + e.mark.id;
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
                        title: '删除成功',
                        content: '你将无法再使用该公钥进行SSH操作码云仓库',
                        showCancel: false,
                        success: function (res) {
                          that.getKeys();
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
  doKeyFormSubmit: function (e) {
    var that = this;
    var key = e.detail.value.key;
    var arr = key.split(' ');
    var title = arr[arr.length - 1] + "-" + app.nowdate();
    if (!key || !title) {
      wx.showModal({
        title: '添加失败',
        content: '请仔细填写你生成的公钥后添加',
        showCancel: false,
      });
    }
    wx.showLoading({
      title: '正在添加',
    });
    wx.request({
      url: app.config.apiUrl + "api/v5/user/keys",
      method: "POST",
      data: {
        ...{
          access_token: app.access_token,
          method: 'post'
        },
        ...{
          key: key,
          title: title
        }
      },
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '添加失败',
            content: result.data.message,
            showCancel: false,
          });
        } else {
          wx.showModal({
            title: '添加成功',
            content: '公钥添加成功,你可以使用该公钥了',
            showCancel: false,
            success: function () {
              that.getKeys();
            }
          });
        }
      }
    });
  },
  hideAddForm: function () {
    this.setData({
      KeyFormShow: false,
    });
  },
  showAddForm: function () {
    this.setData({
      KeyFormShow: true
    });
  },
  getKeys: function (loading = true) {
    var that = this;
    if (that.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    if (loading) {
      wx.showLoading({
        title: '公钥读取中',
      });
    }
    var url = app.config.apiUrl + "api/v5/user/keys";
    wx.request({
      url: url,
      method: "POST",
      data: {
        access_token: app.access_token,
        method: 'get'
      },
      success: function (result) {
        that.isGetingData = false;
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (!result.data.hasOwnProperty("message")) {
          that.setData({
            keyList: result.data
          });
        } else {
          wx.showModal({
            title: '读取公钥失败',
            content: result.data.message,
            showCancel: false,
          });
        }
      }
    });
  },
})