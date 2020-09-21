// pages/lover/lover.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    sex: "",
    isEditUser: false,
    isEditMood: false,
    userInfo: {
      flag: 0,
      userBanner: null,
      userName: "",
      userPhoto: null,
      userTag: "",
      userMood: {
        mood1: 0,
        mood2: 0,
        mood3: 0,
      },      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("传递过来的sex:", options );
    if(options.sex) {
      this.setData({
        sex: options.sex
      })
    }
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
    var sex = "";
    if(this.data.sex == undefined || this.data.sex == null) {

    } else {
      sex = this.data.sex;
    }
    var that = this;
    app.userLogin();
    var in_index = 1;
    var times = setInterval(function () {
      in_index++;
      if (in_index > 10) {
        clearTimeout(times);
      }
      var rd_session = wx.getStorageSync("rd_session");
      
      var account = app.globalData.userId;

      if (rd_session) {
        clearTimeout(times);


        //业务逻辑----------start------------
        console.log("输入account:", account)
        wx.request({
          url: "http://47.106.108.224/mavenSprngMVC/wxUser/login",
          data: {
            account: account,
            sex: sex
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (response) {
            console.log(response);
            var userBanner = 'userInfo.userBanner';
            var flag = 'userInfo.flag';
            var userName = 'userInfo.userName';
            var userPhoto = 'userInfo.userPhoto';
            var userTag = 'userInfo.userTag';
            var userMood1 = 'userInfo.userMood.mood1';
            var userMood2 = 'userInfo.userMood.mood2';
            var userMood3 = 'userInfo.userMood.mood3';

            that.setData({
              [userBanner]: response.data.data.background_url,
              [flag]: response.data.data.flag,
              [userName]: response.data.data.nickname,
              [userPhoto]: response.data.data.avatar,
              [userTag]: response.data.data.hobby,
              [userMood1]: response.data.data.mood,
              [userMood2]: response.data.data.upset,
              [userMood3]: response.data.data.girly,
            })
                        
          }
        })
      
        //业务逻辑----------end------------

      }
    }, 1000)

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
  changeBannerPhoto: function() {
    //修改Banner的时候，判断是否处于编辑状态
    if (!this.data.isEditUser) {
      return;
    }
    var account = app.globalData.userId;
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);

        if (tempFilePaths.length >= 1) {
          var userBanner = 'userInfo.userBanner';

          wx.uploadFile({
            url: "http://47.106.108.224/mavenSprngMVC/wxUser/modifyBackground",
            filePath: tempFilePaths[0],
            name: 'photo',
            header: {
              'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            formData: {
              "account": account,
            },
            success: function (res) {
              console.log(res);
            }
          })


          that.setData({
            [userBanner]: tempFilePaths[0]
          })
        }
      }
    })
  },
  //改变用户头像
  changeUserPhoto: function() {
    var account = app.globalData.userId;
    //修改头像的时候，判断是否处于编辑状态
    if(!this.data.isEditUser) {
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        if(tempFilePaths.length >=1 ) {
          var userPhoto = 'userInfo.userPhoto';

          that.setData({
            [userPhoto]: tempFilePaths[0]
          })


        }        
      }
    })

  },
  //用户名获取
  userNameInput: function(e) {
    var userName = 'userInfo.userName';
    this.setData({
      [userName]: e.detail.value
    })
    console.log(this.data.userInfo);
  },

  //用户名签名获取
  userTagInput: function(e) {
    var userTag = 'userInfo.userTag';
    this.setData({
      [userTag]: e.detail.value
    })
    console.log(this.data.userInfo);
  },

  editorUser: function() {
    console.log("点击了编辑用户信息");
    var isEditUser = this.data.isEditUser;
    this.setData({
      isEditUser: !isEditUser
    })
    console.log(this.data.isEditUser);
  },
  //提交用户编辑
  submitUser: function() {
    var that = this;
    var account = app.globalData.userId;
    wx.request({
      url: "http://47.106.108.224/mavenSprngMVC/wxUser/modifyUserInfo",

      data: {
        "account": account,
        "nickname": this.data.userInfo.userName,
        "hobby": this.data.userInfo.userTag,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (response) {
        console.log(response);
        wx.showToast({
          title: '编辑成功~',
        })
        that.setData({
          isEditMood: false
        })
      }
    })

    this.setData({
      isEditUser: false
    })
  },
  //取消用户编辑
  cancelUser: function() {
    this.setData({
      isEditUser: false
    })
  },
  editorMood: function() {
    
    console.log("点击了编辑用户心情");
    this.setData({
      isEditMood: true
    })
  },
  submitMood: function() {
    console.log("提交用户心情");
    var that = this;
    var account = app.globalData.userId;
    wx.request({
      url: "http://47.106.108.224/mavenSprngMVC/wxUser/setMood",
      data: {
        account: account,
        mood: this.data.userInfo.userMood.mood1,
        upset: this.data.userInfo.userMood.mood2,
        girly: this.data.userInfo.userMood.mood3,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (response) {
        console.log(response);
        wx.showToast({
          title: '编辑成功~',
        })
        that.setData({
          isEditMood: false
        })
      }
    })


  },
  cancelMood: function() {
    console.log("取消编辑用户心情");
    this.setData({
      isEditMood: false
    })
  },
  //增加心情
  addMood: function(e) {
    if (!this.data.isEditMood) {
      return;
    }
    let count = e.target.dataset.count;
    var userMood1 = 'userInfo.userMood.mood1';
    this.setData({
      [userMood1]: count
    });
  },

  //增加烦恼
  addMood2: function(e) {
    if (!this.data.isEditMood) {
      return;
    }
    let count = e.target.dataset.count;
    var userMood2 = 'userInfo.userMood.mood2';
    this.setData({
      [userMood2]: count
    });
    console.log(this.data.userInfo);
  },

  //增加撒娇
  addMood3: function(e) {
    if (!this.data.isEditMood) {
      return;
    }
    let count = e.target.dataset.count;
    var userMood3 = 'userInfo.userMood.mood3';
    this.setData({
      [userMood3]: count
    });
  },
})