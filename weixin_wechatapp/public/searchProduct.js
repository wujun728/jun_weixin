function getSearchProductName (e) {
  SearchProductName = e.detail.value

}

//给各个页面用的
function searchProduct(event) {
  var that = this;
  console.log(event.currentTarget.dataset)
  var focusKey = event.currentTarget.dataset;

  var url = this.more_product_list_URL(this.params);
  console.log(url)
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      that.setData({ productData: res.data })
    }
  })
}

 function more_product_list_URL(params) {
   var more_product_list = app.AddClientUrl("/more_product_list.html")
  var more_product_list_URL = more_product_list.url
  more_product_list_URL += "?jsonOnly=1";
  for (let i in params) {
    more_product_list_URL += "&" + i + "=" + params[i]
  }

  return more_product_list_URL;
}