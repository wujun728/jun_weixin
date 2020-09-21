function requestLoading(url, success, fail, data,flag){
  if (flag == undefined){
    wx.showLoading({
      title: '加载中...',
    })
  }
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    method: 'get',
    success: function(res){
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    },
    fail: function(){
      wx.hideNavigationBarLoading()
      fail()
    },
    complete: function(){
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }
  })
}

function request(url, success, fail,data) {
  this.requestLoading(url, success, fail, data,"false")
}

module.exports = {
  request: request,
  requestLoading: requestLoading
}