const app = getApp();
var part_urls = {};
var videoPage;
var pageArr = new Array()
const txvContext = requirePlugin("tencentvideo");
const config = require('../../../public/config')
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    vid: '',
    changingvid: '',
    controls: true,
    autoplay: true,
    posterState:true,
    playState: '',
    showProgress1: true,
    width: "100%",
    file_id:null,
    poster:null,
    height: "auto"
  },
  ready: function () {
    var that = this;
    console.log('=====readyvideo====', that.data.data)
    that.setData({
      autoplay: that.data.data.jsonData.autoPlay == 0 ? "" :"autoplay",
      poster: that.data.data.jsonData.poster,
    })
    let url = that.data.data.jsonData.source;
    if (url.indexOf('https://v.qq.com/')!=-1){
      console.log('====1====')
     url = url.match(/https:\/\/v.qq.com\/x\/(\S*).html/)[1]
     console.log('url===', url)
     let urlArray = url.split('/')
     console.log('urlArray===', urlArray)
     this.setData({ vid: urlArray[urlArray.length - 1] })
      // 处理视频
      if (this.data.vid != undefined) {
        this.setData({
          file_id: this.data.vid
        });
      } else {
        wx.showToast({
          title: '未传入视频id',
        })
      }
    } else {
      console.log('====2====')
      wx.showToast({
        title: '您这个不是腾讯链接~',
      })
   }
  },
  methods: {
    // 这里是一个自定义方法
    onStateChange:function(){
     let that=this
      if (that.data.data.jsonData.poster) {
        posterState: true
      }
    },
    onTimeUpdate:function(){

    },
    onFullScreenChange: function () {

    },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);

    },
   
  },
})