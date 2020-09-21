var Network = require("network.js")
var Constant = require("constant.js")

// 获取全局应用程序实例对象
var app = getApp();

function requestDetailData(that, url){
  Network.requestLoading(Constant.BASE_URL.concat(url).concat("?v=" + Constant.time()), function(res){ 
    if (res.msg!=null){
      that.title = res.msg.title
      let data_parse = app.towxml(res.msg.content, 'markdown', {
        events: {//图片放大效果
          tap: bindtap => {
            if (that.data.girlArray.length == 0) {
              let images = bindtap.currentTarget.dataset.data.child
              let length = images.length;
              for (let i = 0; i < length; ++i) {
                if (images[i].tag == "img") {
                  that.data.girlArray.push(images[i].attr.src);
                }
              }
            }
            var current = bindtap.currentTarget.dataset.data.child[0].attr.src
            wx.previewImage({
              current,
              urls: that.data.girlArray
            })
          }
        }
      });
      that.setData({
        content: data_parse,
        id: res.msg.id
      })
    }
  }, function () {
    that.setData({
      hidden: false
    })
    wx.showToast({
      title: '加载数据失败'
    })
  })
}
module.exports = {
  requestDetailData: requestDetailData
}