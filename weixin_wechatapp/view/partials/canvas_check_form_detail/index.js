const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    posterTitle: {
      type: String,
      value: '0',
    },
    formCommitId: {
      type: String,
      value: '0',
    },
    ewmImgUrl: {
      type: String,
      value: '0',
    },
    bannerImgUrl: {
      type: String,
      value: '0',
    },
  },
  data: {
    // 这里是一些组件内部数据
    maskHidden:true,
    someData: {},
    userInfo:{},
    imgInfo: {scale_y:0, scale_x:0,w:0,h:0},
    color:'',

  },
  ready:function(){
    let that=this;
    that.setData({
      color: app.setting.platformSetting.defaultColor,
      platformName: app.setting.platformSetting.platformName
    })
    if (that.data.bannerImgUrl){
      that.downFileFun(that.data.bannerImgUrl, 'banner', function () {
        wx.hideLoading()
      })
    }
    that.getUserInfo();
    console.log('ewmImgUrl', that.data.ewmImgUrl)
    console.log('====check_form_detail===', app.setting)
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
            } else if (typeData === 'banner') {
              console.log('=======banner======', res)
              that.setData({
                img_banner: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
            }else if (typeData ==='showEwm') {
              console.log('=======showEwm======', res)
              that.setData({
                img_ewm: res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
              })
              that.getImgBiLi(that.data.img_l)
              if (completeCallback){
                completeCallback()
              }
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
    getUserInfo: function () {
      let that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      let customIndex = app.AddClientUrl("/get_session_userinfo.html",{mini:1})
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        success: function (res) {
          console.log("=======getUserInfo====",res.data)
          let userInfo = res.data.relateObj;
          that.setData({ userInfo: userInfo })
          console.log("=======that.data.getUserInfo ====", that.data.userInfo )
          let url = that.data.userInfo.userIcon + '?x-oss-process=style/normal'
          if (url.indexOf("https")==-1){
            url=url.replace('http', 'https')
          }
          that.downFileFun(url,'proImg',function(){
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
      var avatarurl_width = 34;    //绘制的头像宽度
      var avatarurl_heigth = 34;   //绘制的头像高度
      var avatarurl_x = 70;   //绘制的头像在画布上的位置
      var avatarurl_y = 8;   //绘制的头像在画布上的位置
      console.log('4444444444444', wx.getSystemInfoSync().screenWidth)
      var clientWidth = wx.getSystemInfoSync().screenWidth;
      var clientHeight = wx.getSystemInfoSync().screenHeight;
      var context = wx.createCanvasContext('shareCanvas', this)

      context.setFillStyle('#fff')  // 画布背景白色填充
      context.fillRect(0, 0, clientWidth, clientHeight);
      if (!that.data.bannerImgUrl){
        that.drawRoundedRect(context, 16, -clientWidth * 0.65 + 50, clientWidth * 0.65, clientWidth * 0.65, 50, true, false)
        context.setFillStyle('#fff')  // 文字颜色：黑色
        context.setTextAlign("center");  // 文字居中
        context.setFontSize(14)         // 文字字号：22px
        context.lineWidth = 0.8;
        var str = that.data.userInfo.nickName
        context.fillText(str, clientWidth * 0.4, 32)
        //二维码
        context.drawImage(that.data.img_ewm, 30, clientWidth * 0.25, clientWidth * 0.58, clientWidth * 0.58)
        // 横线
        context.moveTo(16, clientWidth * 0.9);
        context.strokeStyle = "#ababab"  // 文字颜色：黑色
        context.lineTo(clientWidth * 0.68, clientWidth * 0.9);

        context.setTextAlign('center')    // 文字居中
        context.setFillStyle('#777')  // 文字颜色：黑色
        context.setFontSize(16)         // 文字字号：22px
        that.strFun(that.data.posterTitle, clientWidth * 0.62, clientWidth - 18, context, 20)
        context.stroke()

        // 头像
        context.save();
        context.beginPath(); //开始绘制
        //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
        context.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
        context.drawImage(that.data.img_l, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
        context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
      }else{
        //  clientWidth * 0.6, clientWidth * 1.067
        context.drawImage(that.data.img_banner, 0, 0, clientWidth * 0.606, clientWidth * 1.07)
        context.drawImage(that.data.img_ewm, clientWidth * 0.4, clientWidth * 0.86, clientWidth * 0.15, clientWidth * 0.15)
      }


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
    circleImg: function (ctx, img, x, y, r) {
      ctx.save();
      var d = 2 * r;
      var cx = x + r;
      var cy = y + r;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, x, y, d, d);
      ctx.restore();
    },
    drawRoundedRect: function (ctx, x, y, width, height, r, fill, stroke) {
      ctx.fillStyle = this.data.color || "#000"; //若是给定了值就用给定的值否则给予默认值  
      ctx.save(); ctx.beginPath(); // draw top and top right corner 
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
      ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
      ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
      ctx.arcTo(x, y, x + r, y, r);
      if(fill) { ctx.fill(); }
              if(stroke) { ctx.stroke(); }
              ctx.restore();
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
    strFun: function (str, canvasWidth, canvasHeight, context, lineHeight) {
      var lineWidth = 0;
      let h = 0;
      var clientWidth = wx.getSystemInfoSync().screenWidth;
      var canvasWidth = canvasWidth;//计算canvas的宽度
      var initHeight = canvasHeight;//绘制字体距离canvas顶部初始的高度
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
        lineWidth += context.measureText(str[i]).width;
        if (lineWidth > canvasWidth) {
          h++
          context.fillText(str.substring(lastSubStrIndex, i), clientWidth * 0.37, initHeight);//绘制截取部分
          initHeight += lineHeight || 16;//20为字体的高度
          lineWidth = 0;
          lastSubStrIndex = i;
          if (h > 0) {
            console.log(h + 1)
            context.fillText(str.substring(lastSubStrIndex, i + 10) + '......', clientWidth * 0.37, initHeight);
            return h + 1
          }
        }if (i == str.length - 1) {//绘制剩余部分
          context.fillText(str.substring(lastSubStrIndex, i + 1), clientWidth * 0.37, initHeight);
        }
      }
      console.log(h + 1)
      return h + 1
    },
  }
})