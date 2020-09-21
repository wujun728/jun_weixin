
/**
 * tab选项页面
 * 主要操作
 * upData.showState   这个是当前被选中
 * upData.url   处理后的url
 * upData.params 处理后的参数
 * 
 * 主函数入口区
 * 
 **/
function detailList(page, app, componentData) {
  var that = page
  if (!app.globalData.sysWidth){
    app.sysWidth = wx.getSystemInfoSync().windowWidth
  }
  componentData.sysWidth = app.globalData.sysWidth
  that.setData({
    componentData: componentData
  }); 
  
}


function bindDetail(that,url) {
 wx.navigateTo({
   url: '',
 })
}

module.exports = {
  detailList: detailList,
  bindDetail: bindDetail
}


