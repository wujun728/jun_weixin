const app = getApp()
/**
 * 页面的初始数据
 */
Page({
  data: {
    userInfo: {},
    isLogin: false,
    defaultInfo: {
      avatar_url: "../../res/image/logo.png",
      name: "点击登录",
      bio: "登录即可享受更多优质的服务",
      followers: 0,
      following: 0,
      stared: 0,
      watched: 0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // wx.navigateTo({url:'../user/detail?login=ld'});//拿红薯的帐号做页面测试
    
    this.setData({
      userInfo: this.data.defaultInfo
    });
    wx.setNavigationBarTitle({
      title: app.product.name,
    });
    wx.showLoading({
      title: '数据加载中',
    });
  },
  onShow: function () {
    this.getUserInfo();
  },
  ifNeedLogin: function () {
    if (!this.data.isLogin) {
      app.login();
    }
  },
  getUserInfo: function () {
    var that = this;
    app.getUserInfo(function (result) {
      wx.hideLoading();
      if (result) {
        that.setData({
          userInfo: app.userInfo,
          isLogin: true
        });
      } else {
        that.setData({
          userInfo: that.data.defaultInfo,
          isLogin: false
        });
      }
    });
  },
  openSetting: function () {
    wx.showActionSheet({
      itemList: ['关于我们', '退出登录'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../about/index',
            });
            break;
          case 1:
            var that = this;
            wx.showModal({
              title: '退出提醒',
              content: '是否退出当前登录的码云帐号？',
              showCancel: true,
              confirmText: "退出",
              confirmColor: "#ff4500",
              cancelText: "返回",
              success(res) {
                if (res.confirm) {
                  app.logout();
                  app.login();
                }
              }
            });
            break;
          default:
        }
      }
    });
  },
  showMyFriends: function () {
    wx.showActionSheet({
      itemList: ['好友动态', '我关注的', '关注我的'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../activity/events?other=yes',
            });
            break;
          case 1:
            wx.navigateTo({
              url: '../user/following',
            });
            break;
          case 2:
            wx.navigateTo({
              url: '../user/followers',
            });
            break;
          default:
        }
      }
    })
  },
  showMyActivity: function () {
    wx.showActionSheet({
      itemList: ['我的动态', '我的通知', '我的私信'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../activity/events',
            });
            break;
          case 1:
            wx.navigateTo({
              url: '../activity/notifications',
            });
            break;
          case 2:
            wx.navigateTo({
              url: '../activity/mails',
            });
            break;
          default:
        }
      }
    });
  },
  showMyFavRepo: function () {
    wx.showActionSheet({
      itemList: ['我Watch的仓库', '我Star的仓库'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../repos/watched',
            });
            break;
          case 1:
            wx.navigateTo({
              url: '../repos/starred',
            });
            break;
          default:
        }
      }
    });
  },
  openAccount: function () {
    wx.showActionSheet({
      itemList: ['修改资料', '公钥管理'],
      success: function (ret) {
        switch (ret.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '../user/motify',
            });
            break;
          case 1:
            wx.navigateTo({
              url: '../user/key',
            });
            break;
          default:
        }
      }
    })
  }
})