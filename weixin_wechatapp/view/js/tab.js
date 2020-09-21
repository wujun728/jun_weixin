
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
function tab(page, partials, json2Form, app, componentData) {
  var that = page
 /*  if (!partials){
    partials = null
  }
  if (!!partials){
    let url = partials.jsonData.tabs[0].linkUrl
    console.log(url)
    if (url == ''){
      return
    }else{
      bindTap(url, that, json2Form, app, componentData)
    }
  } */


  componentData.showState = 0
  that.setData({ componentData: componentData })
  console.log(that.data.componentData)
}
function bindTap(url, page, json2Form, app, componentData) {
  console.log('bindTap')
  var that = page

  var urlData = GetRequest(url)
  bindTabUrl(that, urlData, json2Form, app)

  componentData.showState = urlData.index
  that.setData({ componentData: componentData})
  console.log(urlData)
}

function GetRequest(url) {
  let theResult ={
    index:'',
    url: '',
    param: ''
  }
  if (url.indexOf('!') != -1 && url.indexOf('?') != -1) {
    let str1 = url.substr(0,url.indexOf('!'));
    let str2 = url.substr(url.indexOf('!') + 1,url.indexOf('?') - 2);
    let str3 = url.substr(url.indexOf('?') + 1);
    theResult.index = str1
    theResult.url = str2
    theResult.param = str3
  } else{
    let str1 = '0';
    let str2 = url.substr(0,url.indexOf('?') );
    let str3 = url.substr(url.indexOf('?') + 1);
    theResult.index = str1
    theResult.url = str2
    theResult.param = str3
  }
  return theResult;
}
function bindTabUrl(that,urlData, json2Form, app){
  // wx.showLoading({
  //   title: 'loading',
  // })
  app.showToastLoading('loading', true)
  let GetParamStr = (urlData.param)
  console.log('bindTabUrl') 
  if (urlData.url == 'news_list.html'){
    urlData.url = 'more_news_bbs_list.html'
    var cusUrl = app.AddClientUrl('/'+urlData.url)
    wx.request({
      url: cusUrl.url + "&" + GetParamStr,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        if (res.data.result.length == 0) {
          that.setData({ tabData: null })
        }
        else {
          that.setData({ tabData: res.data.result })
        }
      },
      fail: function (res) {
        app.loadFail()
      },
      complete:function(){
        wx.hideLoading()
      },
    })
  }
}

module.exports = {
  tab: tab,
  bindTap: bindTap
}


