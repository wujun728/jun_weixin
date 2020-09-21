const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    newsId: {
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
    newsDetail:{},
    imgInfo: {scale_y:0, scale_x:0,w:0,h:0},
    color:'',
    logoUrl:"http://image1.sansancloud.com/yunjishi/2018_12/11/11/52/36_652.jpg",

  },
  ready:function(){
    this.setData({
      color: app.setting.platformSetting.defaultColor,
      platformName: app.setting.platformSetting.platformName
    })
    this.getNewsInfo();
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
            }else{
              console.log('=======logo======', res)
              console.log('=======logo======', res.tempFilePath)
              that.setData({
                logo: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
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
    getNewsInfo: function () {
      let that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      let postParam = {}
      postParam.newsId =this.data.newsId
      let customIndex = app.AddClientUrl("/get_news_bbs_detail.html", postParam)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log(res.data)
          that.setData({ newsDetail: res.data })
          let url = that.data.newsDetail.imagePath + '?x-oss-process=style/normal';
          if (app.setting.platformSetting && app.setting.platformSetting.logo){
            that.downFileFun(app.setting.platformSetting.logo.replace('http', 'https'), '', function () {
              wx.hideLoading()
            })
          }else{
            that.downFileFun(that.data.logoUrl.replace('http', 'https'), '', function () {
              wx.hideLoading()
            })
          }
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
      //标题
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.font = "normal normal bold 14px arial"       // 文字字号：22px
      context.lineWidth = 0.8;
      var title = that.data.newsDetail.title
      that.strFun(title, clientWidth * 0.62, 26, context)
      //小标题
      let lineHeight = that.strFun(title, clientWidth * 0.62, 26, context)
      console.log("lineHeight",lineHeight)
      context.drawImage(that.data.logo, 16, lineHeight*20+16,30,30)
      // 新闻类型
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.font = "normal normal normal 10px arial"       // 文字字号：22px
      context.lineWidth = 0.8;
      var typeName = that.data.newsDetail.typeName
      context.fillText(typeName.substring(0, 20), 50, lineHeight * 20 + 26 )
      // 发布时间
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.font = "normal normal normal 10px arial"       // 文字字号：22px
      context.lineWidth = 0.8;
      var publishTime = that.data.newsDetail.publishTime
      context.fillText(publishTime.substring(0, 20), 50, lineHeight * 20+42)
      //内容
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000000')  // 文字颜色：黑色
      context.font = "normal normal normal 14px arial"       // 文字字号：22px
      context.lineWidth = 1;
      var content
      if (that.data.newsDetail.description){
        content = that.repalceHtml(that.data.newsDetail.description)
      }else{
        content = that.repalceHtml(that.data.newsDetail.contentWithNoImg)
      }
      that.strFun(content, clientWidth * 0.62, lineHeight*26+60, context,20)
      // 横线
      console.log("7777");
      context.moveTo(16, clientWidth * 0.8 + 16);
      context.strokeStyle = "#999"  // 文字颜色：黑色
      context.lineTo(clientWidth * 0.68, clientWidth * 0.8 + 16);

      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#000')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.fillText("长按识别小程序码查看详情", 16, clientWidth * 0.88 + 16)
      context.stroke()

      console.log("8888");
      context.setTextAlign('left')    // 文字居中
      context.setFillStyle('#999')  // 文字颜色：黑色
      context.setFontSize(12)         // 文字字号：22px
      context.fillText("好东西尽在"+that.data.platformName, 16, clientWidth * 0.93 + 16)
 
      console.log("9999:" , that.data.imgInfo); 
      context.drawImage(that.data.img_ewm, clientWidth * 0.5 - 16, clientWidth * 0.82 + 16, 70, 70)
      console.log("55555");
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
    repalceHtml:function (str){
      var dd = str.replace(/<\/?.+?>/g, ""); 
      var dds = dd.replace(/ /g, "");//dds为得到后的内容 return dds; 
      return dds;
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
    strFun: function (str, canvasWidth, canvasHeight, context,lineHeight){
       var lineWidth = 0;
       let h=0;
       var canvasWidth = canvasWidth;//计算canvas的宽度
       var initHeight = canvasHeight;//绘制字体距离canvas顶部初始的高度
       var lastSubStrIndex = 0; //每次开始截取的字符串的索引
       for (let i = 0; i < str.length; i++) {
         lineWidth += context.measureText(str[i]).width;
         if (lineWidth > canvasWidth) {
           h++
           context.fillText(str.substring(lastSubStrIndex, i), 16, initHeight);//绘制截取部分
           initHeight += lineHeight||16;//20为字体的高度
           lineWidth = 0;
           lastSubStrIndex = i;
           if (h>11){
             console.log(h + 1)
             context.fillText(str.substring(lastSubStrIndex, i + 10)+'......', 16, initHeight);
             return h+1
           }
         }
         if (i == str.length - 1) {//绘制剩余部分
           context.fillText(str.substring(lastSubStrIndex, i + 1), 16, initHeight);
         }
      }
      console.log(h + 1)
      return h+1
     }
  }
})