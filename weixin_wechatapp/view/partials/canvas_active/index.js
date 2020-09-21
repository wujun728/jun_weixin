const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    activeId: {
      type: String,
      value: '0',
    },
    shopId: {
      type: String,
      value: '0',
    },
    ewmImgUrl: {
      type: String,
      value: '0',
    },
  },
  data: {
    // 这里是一些组件内部数据
    maskHidden:true,
    someData: {},
    activetData:{},
    imgInfo: {scale_y:0, scale_x:0,w:0,h:0},
    color:'',

  },
  ready:function(){
    this.setData({
      color: app.setting.platformSetting.defaultColor,
      platformName: app.setting.platformSetting.platformName
    })
    this.getActiveInfo();
    console.log('11111111111111111',this.data.ewmImgUrl)
    console.log('=======', app.setting)
  },
  methods: {
    saveImgToPhotosAlbumTap: function () {
      let that = this;
      wx.showToast({
        title: '保存图片中...',
        icon: 'loading',
        duration: 1000
      });
      wx.saveImageToPhotosAlbum({
        filePath: that.data.imagePath,
        success: function (res) {
          console.log(res)
          wx.hideToast()
          wx.showToast({
            title: '保存图片成功',
            icon: 'success',
            duration: 1000
          });
        },
        fail: function (res) {
          console.log(res)
          console.log('fail')
        }
      })
    },
    downFileFun: function (url,typeData,completeCallback) {
      console.log('=====url=====', url);
      let that = this
      const downloadTask = wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          console.log('=======downloadTask======', res)
          if (res.statusCode === 200) {
            if (typeData === 'proImg') {
              console.log('=======proImg======', res)
              that.setData({
                img_l: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
              that.downFileFun(that.data.ewmImgUrl, 'showEwm',completeCallback)
            } else if (typeData ==='showEwm') {
              console.log('=======showEwm======', res)
              that.setData({
                img_ewm: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
              that.getImgBiLi(that.data.img_l)
              completeCallback()
            }
          }
        },
        fail: function (res) {
          wx.hideLoading()
          console.log("fail")
          if (commpleteCallback) {
            try {
              commpleteCallback();
            } catch (e) { }
          }
        }
      })
    },
    getImgBiLi:function(url){
      let that = this;
      console.log("======url=====", url);
      var clientWidth = wx.getSystemInfoSync().screenWidth;
      var imgInfo = { scale_y: 0, scale_x: 0, w: 0, h: 0};
      wx.getImageInfo({
        src: url,
        success: function (res) {
          console.log('==getImageInfo===', res.width)
          console.log('==getImageInfo===', res.height)
          imgInfo.w = res.width     //图片真实宽度
          imgInfo.h = res.height   //图片真实高度
          imgInfo.scale_x = clientWidth * imgInfo.w / imgInfo.h;
          imgInfo.scale_y = clientWidth * imgInfo.h / imgInfo.w ;
          that.setData({
            imgInfo: imgInfo //将下载的图片临时路径赋值给img_l,用于预览图片
          })
          console.log('==getImageInfo===', that.data.imgInfo)
          that.customMethod();
        }
      })
    },
    getActiveInfo: function () {
      let that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      let postParam = { promotionId:that.data.activeId}
      let customIndex = app.AddClientUrl("/get_promotions_detail.html", postParam)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log("=======active====",res.data)
          let activetData = res.data.relateObj;
          that.setData({ activetData: activetData })
          console.log("=======that.data.activetData ====", that.data.activetData )
          let url = that.data.activetData.promotionBanner + '?x-oss-process=style/normal'
          that.downFileFun(url.replace('http','https'),'proImg',function(){
            wx.hideLoading()
          })
         
        },
        fail: function (res) {
          wx.hideLoading()
          console.log("fail")
          app.loadFail()
        }
      })
    },
    // 这里是一个自定义方法
    customMethod: function () {
      let that=this;
      console.log('4444444444444')
      var clientWidth = wx.getSystemInfoSync().screenWidth;
      var clientHeight = wx.getSystemInfoSync().screenHeight;
      var context = wx.createCanvasContext('shareCanvas', this)

      context.setFillStyle('#fff')  // 画布背景白色填充
      context.fillRect(0, 0, clientWidth, clientHeight);
      context.drawImage(that.data.img_l, 16, 16, clientWidth * 0.65, clientWidth * 0.25)
      context.setTextAlign('center')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.lineWidth = 0.8;
      var str = that.data.activetData.name
      context.fillText("---" + str.substring(0, 21) + '---', clientWidth*0.36, clientWidth * 0.3+16)
      context.setTextAlign('center')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.lineWidth = 0.8;
      var str = that.data.activetData.name
      context.fillText('【活动时间】', clientWidth * 0.36, clientWidth * 0.35 + 16)
      context.setTextAlign('center')    // 文字居中
      context.setFillStyle('#ff4444')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      var str1 = that.data.activetData.startDate
      context.fillText(' 开始时间 ：' + str1, clientWidth * 0.36, clientWidth * 0.4 + 16)
      context.setTextAlign('center')    // 文字居中
      context.setFillStyle('#ff4444')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      var str2 = that.data.activetData.endDate
      context.fillText(' 结束时间 ：' + str2, clientWidth * 0.36, clientWidth * 0.45 + 16)



      context.drawImage(that.data.img_ewm, clientWidth * 0.16, clientWidth * 0.5 + 16, clientWidth * 0.4, clientWidth * 0.4)
      // 横线
      context.moveTo(16, clientWidth * 0.95 + 16);
      context.strokeStyle = "#ababab"  // 文字颜色：黑色
      context.lineTo(clientWidth * 0.68, clientWidth * 0.95 + 16);

      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#777')  // 文字颜色：黑色
      context.setFontSize(11)         // 文字字号：22px
      context.fillText("长按识别小程序码访问【" + that.data.platformName+'】- 好东西尽在囤仔', 16, clientWidth + 16)
      context.stroke()

      context.draw()
      //绘制图片
      wx.showToast({
        title: '分享图片生成中...',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          fileType:'jpg',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            console.log(tempFilePath);
            that.setData({
              imagePath: tempFilePath,
              maskHidden: false
              // canvasHidden:true
            });
            wx.hideToast()
          },
          fail: function (res) {
            console.log(res);
          }
        },that);
      }, 500);
     },
    saveImageToLocal: function (e) {
      let imgSrc = this.data.imagePath
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
    closeFun:function(){
      this.triggerEvent('closePoaster', 0) //myevent自定义名称事件，父组件中使用
    },
    InterceptStr: function (str, canvasWidth, canvasHeight, context){
      var lineWidth = 0;
      var canvasWidth = canvasWidth;//计算canvas的宽度
      var initHeight = canvasHeight;//绘制字体距离canvas顶部初始的高度
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
        lineWidth += context.measureText(str[i]).width;
        console.log('====-lineWidth-----', lineWidth)
        console.log('====-canvasWidth-----', canvasWidth)
        if (lineWidth > canvasWidth) {
          console.log('====');
          context.fillText(str.substring(lastSubStrIndex, i), 16, initHeight);//绘制截取部分
         }
      }
    },
    strFun: function (str, canvasWidth, canvasHeight, context){
       var lineWidth = 0;
       var canvasWidth = canvasWidth;//计算canvas的宽度
       var initHeight = canvasHeight;//绘制字体距离canvas顶部初始的高度
       var lastSubStrIndex = 0; //每次开始截取的字符串的索引
       for (let i = 0; i < str.length; i++) {
         lineWidth += context.measureText(str[i]).width;
         if (lineWidth > canvasWidth) {
           context.fillText(str.substring(lastSubStrIndex, i), 0, initHeight);//绘制截取部分
           initHeight += 20;//20为字体的高度
           lineWidth = 0;
           lastSubStrIndex = i;
         }
         if (i == str.length - 1) {//绘制剩余部分
           context.fillText(str.substring(lastSubStrIndex, i + 1), 0, initHeight);
         }
       }
     }
  }
})