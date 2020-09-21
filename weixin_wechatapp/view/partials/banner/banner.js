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
    sysWidth:"",
    setting:{},
    imgs:null,
  },
  ready:function(){
    let that=this;
    that.setData({
      sysWidth: app.globalData.sysWidth,
      setting:app.setting
    });
    console.log("=====banner--setting=====", that.data.setting)
    console.log("=====banner--data=====", that.data.data)
  },
  methods: {
    // 这里是一个自定义方法
    imageLoad: function (e) {
      console.log("=====imageLoad====",e)
      let index = e.currentTarget.dataset.index;
      let width = e.detail.width;
      let height = e.detail.height;
      let imgData = this.data.data.jsonData.images;
      let fixedHeght = this.data.data.jsonData.height * this.data.sysWidth;
      imgData[index].height = fixedHeght;
      imgData[index].width = (width / height ) * fixedHeght;
      this.setData({ imgs: imgData })
      console.log("=====imageLoad====", this.data.imgs)
      // var $width = e.detail.width,    //获取图片真实宽度
      //   $height = e.detail.height,
      //   ratio = $width / $height;    //图片的真实宽高比例
      // var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      //   viewHeight = 718 / ratio;    //计算的高度值
      // var image = this.data.images;
      // //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      // image[e.target.dataset.index] = {
      //   width: viewWidth,
      //   height: viewHeight
      // }
      // this.setData({
      //   images: image
      // })
    },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);
   
     
      // wx.navigateTo({
      //   url: '/pages/' + event.currentTarget.dataset.page + '/index'
      // })
    }
  },
})