export default Page({
  data: {
    '__code__': {
      readme: ''
    },
    wechatInfo: {
      image: "/common/assets/images/yige.jpg"
    }
  },
  onShareAppMessage: function () {
    return {
      title: '爪哇妹-互联网搜妹小分队',
      path: '/pages/about/index'
    };
  },
  onWechatImage(e) {
    let image = e.currentTarget.dataset.image;
    wx.previewImage({
      current: image,
      urls: [image]
    });
  },
  onImageTap(param) {
    wx.previewImage({
      current: this.data.weApps[param.currentTarget.id].qrcode,
      urls: [this.data.weApps[param.currentTarget.id].qrcode]
    });
  }
});