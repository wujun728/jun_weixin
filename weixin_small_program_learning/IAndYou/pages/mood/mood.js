// pages/mood/mood.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: "一月",
    day: "18",
    week: "星期天",
    title: "",
    content: "",
    weather: "晴天",
    photoList: [],
    flag: "false",
    id: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);

    //判断是否有ID传递过来
    if (options.id) {
      console.log("有ID传递过来");
      this.setData({
        id: options.id
      })
    }
    if (options.topIndex == "1") {
      this.setData({
        flag: "true"
      })
    } else {
      this.setData({
        flag: "false"
      })
    }

    var that = this;
    app.userLogin();
    var in_index = 1;
    var times = setInterval(function() {
      in_index++;
      if (in_index > 10) {
        clearTimeout(times);
      }
      var rd_session = wx.getStorageSync("rd_session");

      var account = app.globalData.userId;

      if (rd_session) {
        clearTimeout(times);


        //业务逻辑----------start------------
      if (that.data.id != null || that.data.id != undefined) {

          wx.request({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/getDiaryById",
            data: {
              "id": that.data.id,
              "flag": that.data.flag
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function(response) {
              console.log(response);
              if (!response.data.status) {
                return;
              }
              var data = response.data.data[0];
              var photoList = [];
              photoList.push(data.photoUrl);
              that.setData({
                month: data.month,
                week: data.dayOfWeek,
                day: data.dayOfMonth,
                title: data.title,
                content: data.msg,
                weather: data.weather,
                photoList: photoList
              })
            }
          })
        } else {

          //新增状态

          var a = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

          var monthList = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");

          var data = new Date();

          var month = data.getMonth();

          var week = data.getDay();

          var today = data.getDate();

          that.setData({
            month: monthList[month],
            week: a[week],
            day: today,
          })
        }
        //业务逻辑----------end------------

      }
    }, 1000)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //用户名获取
  contentInput: function(e) {

    this.setData({
      content: e.detail.value
    })

  },

  //用户名签名获取
  titleInput: function(e) {

    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 添加图片
   */
  addPhoto: function() {
    var that = this;
    var PhotoCount = this.data.photoList.length;
    if (PhotoCount >= 9) {
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'error',
        duration: 2000
      })
      return;
    }
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths);

        if (tempFilePaths.length >= 1) {

          if (tempFilePaths.length + PhotoCount > 9) {
            wx.showToast({
              title: '最多只能上传9张图片',
              icon: 'error',
              duration: 2000
            })
            return;
          }

          var photoList = that.data.photoList;
          photoList = photoList.concat(tempFilePaths); //将两个数组合并          
          that.setData({
            photoList: photoList
          })
        }
      }
    })
  },
  /**
   * 提交
   */
  submit: function() {
    var that = this;
    var account = app.globalData.userId;
    var title = this.data.title;
    var message = this.data.content;
    var weather = this.data.weather;
    var flag = this.data.flag;

    console.log("id:", this.data.id);

    console.log(title);
    console.log(message);
    console.log(weather);
    console.log(flag);

    if (message == "" || title == "") {
      wx.showToast({
        icon: 'none',
        title: '标题和内容不能为空~',
      })
      return;
    }

    //如果ID不为空，就代表是编辑状态发送内容的
    if (that.data.id != null || that.data.id != undefined) {

      var photoUrl = this.data.photoList[0];
      
      //如果没有图片的时候
      if (photoUrl == undefined || photoUrl == "" || photoUrl == null) {
        console.log("我进来了，删掉了图片");
        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/modifyDiary",
          data: {
            "diaryId": that.data.id,
            "account": account,
            "title": title,
            "message": message,
            "weather": weather,
            "flag": flag,
            "photoUrl": "",
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            console.log(response);
            wx.switchTab({
              url: '/pages/task/task',
            })
          }
        })

      } else {
        
        //判断图片是选择的，还是本来的

        //表示是选择的图片
        if (photoUrl.indexOf("http://tmp") >= 0) {
          console.log("我进来了，修改了图片");
          wx.uploadFile({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/modifyDiary",
            filePath: this.data.photoList[0],
            name: 'photos',
            header: {
              'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            formData: {
              "diaryId": that.data.id,
              "account": account,
              "title": title,
              "message": message,
              "weather": weather,
              "flag": flag,
              "photoURL": this.data.photoList[0]
            },
            success: function (res) {

              wx.switchTab({
                url: '/pages/task/task',
              })
            }
          })
        } else {
          console.log("我进来了，没有修改图片");
          wx.request({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/modifyDiary",
            data: {
              "diaryId": that.data.id,
              "account": account,
              "title": title,
              "message": message,
              "weather": weather,
              "flag": flag,
              "photoURL": this.data.photoList[0]
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function (response) {
              console.log(response);
              wx.switchTab({
                url: '/pages/task/task',
              })
            }
          })
        }

      }

    } else {

      if (this.data.photoList.length <= 0) {

        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/pubDiary",
          data: {
            "account": account,
            "title": title,
            "message": message,
            "weather": weather,
            "flag": flag
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function(response) {
            console.log(response);
            wx.switchTab({
              url: '/pages/task/task',
            })
          }
        })

      } else {

        wx.uploadFile({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/pubDiary",
          filePath: this.data.photoList[0],
          name: 'photos',
          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 header
          formData: {
            "account": account,
            "title": title,
            "message": message,
            "weather": weather,
            "flag": flag
          },
          success: function(res) {
            wx.switchTab({
              url: '/pages/task/task',
            })
          }
        })
      }

    }



  },
  delPhoto: function() {
    console.log("删除相片");
    this.setData({
      photoList: []
    })
  },
  //选择天气
  addWeather: function(e) {

    var weather = e.currentTarget.dataset.weather;
    this.setData({
      weather: weather
    })
    console.log(this.data.weather);
  }
})