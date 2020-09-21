const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    proId: {
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
    productData:{},
    imgInfo: {scale_y:0, scale_x:0,w:0,h:0},
    color:'',

  },
  ready:function(){
    this.setData({
      color: app.setting.platformSetting.defaultColor,
      platformName: app.setting.platformSetting.platformName
    })
    this.getProInfo();
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
        header:'Content-type:image/jpg',
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
              console.log('=======showEwm======', res.tempFilePath)
              that.setData({
                img_ewm: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
              that.getImgBiLi(that.data.img_l)
              completeCallback()
            }
          }
        },
        fail: function (res) {
          console.log("fail")
          if (completeCallback) {
            try {
              completeCallback();
            } catch (e) { }
          }
          wx.showToast({
            title: '下载图片失败',
            icon: 'fail',
            duration: 1000
          });
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
          console.log('==getImageInfo===', that.data.imgInfo, clientWidth,)
          that.customMethod();
        }
      })
    },
    getProInfo: function () {
      let that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      let postParam = {}
      postParam.productId =this.data.proId
      postParam.addShopId = this.data.shopId
      let customIndex = app.AddClientUrl("/product_detail.html", postParam)
      wx.request({
        /* url: app.clientUrl + app.clientNo + "/product_detail_" + param.id + ".html?jsonOnly=1" + "&addShopId=" + param.addShopId, */
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log(res.data)
          that.setData({ productData: res.data })
          let url = that.data.productData.productInfo.imagePath + '?x-oss-process=style/normal';
          that.downFileFun(url.replace('http','https'),'proImg',function(){
            wx.hideLoading()
          })
         
        },
        fail: function (res) {
          console.log("fail")
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    // 这里是一个自定义方法
    customMethod: function () {
      let that=this;
      var clientWidth = wx.getSystemInfoSync().screenWidth;
      var clientHeight = wx.getSystemInfoSync().screenHeight;
      var context = wx.createCanvasContext('shareCanvas', this)

      context.setFillStyle('#fff')  // 画布背景白色填充
      context.fillRect(0, 0, clientWidth, clientHeight);
      //context.drawImage(that.data.img_l, 16, 16, clientWidth * 0.65, clientWidth * 0.65)
      if (that.data.imgInfo.w === that.data.imgInfo.h) {
        console.log('===that.data.imgInfo.w === that.data.imgInfo.w===')
        context.drawImage(that.data.img_l, 16, 16, clientWidth * 0.65, clientWidth * 0.65)
      } else if (that.data.imgInfo.w > that.data.imgInfo.h) {
        console.log('===that.data.imgInfo.w > that.data.imgInfo.h===')
        context.drawImage(that.data.img_l, (that.data.imgInfo.w - that.data.imgInfo.h) / 2, 0, that.data.imgInfo.h, that.data.imgInfo.h, 16, 16, clientWidth * 0.65, clientWidth * 0.65)
      } else if (that.data.imgInfo.w < that.data.imgInfo.h) {
        console.log('===that.data.imgInfo.w < that.data.imgInfo.h===')
        context.drawImage(that.data.img_l, 0, (that.data.imgInfo.h - that.data.imgInfo.w) / 2, that.data.imgInfo.w, that.data.imgInfo.w, 16, 16, clientWidth * 0.65, clientWidth * 0.65)
      }
      console.log("55555");
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.lineWidth = 0.8;
      var str = that.data.productData.productInfo.name
      context.fillText(str.substring(0, 20), 16, clientWidth * 0.7+16)
      console.log("6666");
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#ff4444')  // 文字颜色：黑色
      context.setFontSize(18)         // 文字字号：22px
      var str1 = that.data.productData.productInfo.price
      //that.InterceptStr("￥"+str1, clientWidth * 0.62, clientWidth * 0.9 + 16, context)
      let priceLength = String(str1).length+1
      console.log('priceLength', priceLength)
      context.fillText("￥" + str1, 16, clientWidth * 0.78 + 16)
      // 单位
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#ccc')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      var str2='';
      if (that.data.productData.productInfo.unitShow){
        str2 = "/" +that.data.productData.productInfo.unitShow 
      }else{
        str2 = "￥" + that.data.productData.productInfo.tagPrice
        let tagPriceLength = String(str2).length
        context.moveTo(16 + priceLength * 14, clientWidth * 0.78+12);
        context.strokeStyle = "#999"  // 文字颜色：黑色
        context.lineTo((16 + priceLength * 14) + (tagPriceLength * 9), clientWidth * 0.78 + 12);
      }
      //that.InterceptStr("￥"+str1, clientWidth * 0.62, clientWidth * 0.9 + 16, context)
      context.fillText( str2, 16+priceLength*14, clientWidth * 0.78 + 16)
      // 横线
      console.log("7777");
      context.moveTo(16, clientWidth * 0.8 + 16);
      context.strokeStyle = "#999"  // 文字颜色：黑色
      context.lineTo(clientWidth * 0.68, clientWidth * 0.8 + 16);

      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.fillText("长按识别小程序码访问", 16, clientWidth * 0.88 + 16)
      context.stroke()

      console.log("8888");
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#999')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.fillText("好东西尽在"+that.data.platformName, 16, clientWidth * 0.93 + 16)
 
      console.log("9999:" , that.data.imgInfo); 
      context.drawImage(that.data.img_ewm, clientWidth * 0.5 - 16, clientWidth * 0.82 + 16, 70, 70)
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
      // context.draw(false, wx.canvasToTempFilePath({
      //   canvasId: 'shareCanvas',
      //   success: function (res) {
      //     var tempFilePath = res.tempFilePath;
      //     console.log('99999999',tempFilePath);
      //     that.setData({
      //       imagePath: tempFilePath,
      //       maskHidden: false
      //       // canvasHidden:true
      //     });
      //     wx.hideToast()
      //   },
      //   fail: function (res) {
      //     console.log(res);
      //   }
      //   },this))
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
      wx.hideLoading()
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
        //else{
        //   context.fillText(str.substring(lastSubStrIndex, i), 16, initHeight);//绘制截取部分
        // }
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