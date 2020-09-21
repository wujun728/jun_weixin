// pages/fx_qrcode/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FxImage: "",
    kefuImage:"",
  },
  lookBigImage: function (e) {
    let imgSrc = e.currentTarget.dataset.imageurl
    console.log(imgSrc)
    let PostImageSrc = imgSrc.replace(/http/, "https")
    // let PostImageSrc = imgSrc
    console.log(PostImageSrc)
    if (!imgSrc) {
      return
    }
    let urls = []
    urls.push(imgSrc)
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  saveImageToLocal: function (e) {
    let imgSrc = e.currentTarget.dataset.imageurl
    console.log(imgSrc)
    let PostImageSrc = imgSrc.replace(/http/, "https")
    // let PostImageSrc = imgSrc
    console.log(PostImageSrc)
    if (!imgSrc) {
      return
    }
    let urls = []
    urls.push(imgSrc)
    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
    /* wx.downloadFile({
      url: PostImageSrc,
      success:function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log(data);
            wx.showToast({
              title: '保存成功',
            })
          },
          fail:function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              console.log('打开设置窗口')
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    wx.showToast({
                      title: '获取权限成功,请再次保存图片',
                    })
                  }
                  else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    wx.showToast({
                      title: '获取权限失败',
                      image: '/images/icons/tip.png',
                    })
                  }
                }
              })
            }
          }
        })
      },
      fail:function(res){
        console.log('url就错了')
        console.log(res)
      }
    }) */
  },
  get_qrcode: function () {
    console.log('-------获取推广二维码信息--------')
    var customIndex = app.AddClientUrl("/get_qrcode.html")
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        if (res.data.errcode == '0') {
          that.setData({
            FxImage: res.data.relateObj
          })
        }
        else {
          wx.showToast({
            title: res.data.errMsg,
            icon: '/images/icons/tip.png',
            duration: 1500
          })
        }
        console.log(res.data)
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('===options====', options)
    if (options.imgData!==''){
      console.log('111111')
      this.setData({
        kefuImage: options.imgData
      })
    } else {
      console.log('22222')
      wx.showToast({
        title: '囤主未设二维码',
        icon: '/images/icons/tip.png',
        duration: 1500
      })
    }
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
  onReachBottom: function () {

  },


})