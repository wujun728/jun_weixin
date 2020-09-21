const app = getApp();
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
    someData: {},
    display:"none"
  },
  ready:function(){
    console.log("popimage数据", this.data.data)
    let that=this;
    if (this.data.data.androidTemplate == "popimage"){
      try {
        var imageUrl = wx.getStorageSync('popimage_' + this.data.data.id)
        // 当缓存的图片地址存在以及他的图片不变的时候不需要弹窗
        console.log("imageUrl", imageUrl, that.data.data.jsonData.imageUrl, imageUrl == that.data.data.jsonData.imageUrl)
        if (imageUrl && imageUrl == that.data.data.jsonData.imageUrl) {
          console.log("存在imageUrl", imageUrl)
          that.setData({
            display: "none"
          })
        }
        // 其余的时候显示弹窗
        else {
          console.log("不存在imageUrl", imageUrl)
          setTimeout(function () {
            that.setData({
              display: "block"
            })
          }, 1000)
        }
      } catch (e) { }
    }
  },
  methods: {
    // 这里是一个自定义方法
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
    },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      console.log("===========e==========", event.currentTarget.dataset.url)
      // 缓存
      console.log("popimage", this.data.data.androidTemplate)
      let state=app.linkEvent(event.currentTarget.dataset.link);
      console.log("============state===============", state)
      if (state !='authorization'){
        if (this.data.data.androidTemplate == "popimage") {
          try {
            wx.setStorageSync('popimage_' + this.data.data.id, event.currentTarget.dataset.url)
          } catch (e) { }
          this.setData({
            display: 'none'
          })
        }
      }

    },
    closeFun:function(e){
      console.log("===========e==========", e.currentTarget.dataset.url)
      // 缓存
      try {
        wx.setStorageSync('popimage_' + this.data.data.id,e.currentTarget.dataset.url)
      } catch (e) {
      }
      this.setData({
        display:'none'
      })
    }
  },
})