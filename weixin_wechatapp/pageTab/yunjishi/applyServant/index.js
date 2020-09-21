var code = require('../../../utils/com.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteCode: "",//渠道邀请码
    phone: '',
    password: '',

    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60"　,　　　　　　　//设定倒计时的秒数
    colorB:"#FF5146", //性别男
    colorG: "#333333", //性别女
  

    upLoadImageList: {},
    isRegion: false,        
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    //店铺信息这部分
    shopName:"",
    //个人信息这部分
    userName:"",
    phone:"",
    age:"",
    code:"",
    sex:"男",
    // 院校信息
    province: "",
    city: "",
    area: "",
    schoolName:"", //学校名称
    learn:"",   //专业

    // 银行信息
    bankName:"",  //开户行
    bankPhone:"",    //银行卡绑定的手机号
    bankNumber:"",    //银行卡号码
    bankUserName:"",  //开户人姓名
    applyServantType:true,
  },
  removeImg: function (event) {
    let that = this;
    console.log('======event==', event);
    let index = event.currentTarget.dataset.index;
    that.data.upLoadImageList['img_' + index] = '';
    console.log('that.data.upLoadImageList', that.data.upLoadImageList);
    that.setData({ upLoadImageList: that.data.upLoadImageList })
  },
  addCommitImage: function (e) {
    console.log('===addCommitImage=', e)
    var that = this;
    let index = e.currentTarget.dataset.index;
    let upLoadImageList = that.data.upLoadImageList
    if (upLoadImageList.length == 1) {
      return
    }
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        that.uploadImage(tempFilePaths, tempFilePaths.length, index)
      }
    })
  },
  uploadImage: function (tempFilePaths, count, index) {
    if (!app.loginUser) {
      app.echoErr('用户未登录')
      return
    }
    console.log(count)
    let that = this
    let param = {
      userId: app.loginUser.id
    }
    var customIndex = app.AddClientUrl("/file_uploading.html", param, 'POST')
    wx.uploadFile({
      url: customIndex.url, //仅为示例，非真实的接口地址
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: tempFilePaths[count - 1],
      name: 'file',
      formData: customIndex.params,
      success: function (res) {
        let upLoadImageList = that.data.upLoadImageList
        var data = res.data
        console.log(data)

        if (typeof (data) == 'string') {
          data = JSON.parse(data)
          console.log(data)
          if (data.errcode == 0) {
            upLoadImageList['img_' + index] = data.relateObj.imageUrl
            // upLoadImageList.push(data.relateObj.imageUrl)
            that.setData({
              upLoadImageList: upLoadImageList
            })
          }
        } else if (typeof (data) == 'object') {
          if (data.errcode == 0) {
            upLoadImageList.push(data.relateObj.imageUrl)
            that.setData({
              upLoadImageList: upLoadImageList
            })
          }
        }
        console.log('==upLoadImageList==', that.data.upLoadImageList)
        //do something
      }, fail: function (e) {
        console.log(e)
      }, complete: function (e) {
        if (count == 1 || count < 1) {
          return false;
        } else {
          that.uploadImage(tempFilePaths, --count)
        }

      }
    })
  },
  loginSuccess: function (user) {
    console.log("pre apply mendian login success call back!", user);
    this.checkState();
  },
  loginFailed: function (err) {
    console.log("login failed!!");

  },
  checkState: function () {
    console.log('======checkState.loginUser======', app.loginUser)
    if (app.loginUser.platformUser.managerServantId) {
      console.log("=========有归属服务员=========")
      this.setData({ applyServantType: false })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    console.log("options", options.code)
    console.log('======app.loginUser======', app.loginUser)
    // 渠道邀请码
    if (app.loginUser) {
      this.checkState();
    } else {
      console.log('======111222333======')
      app.addLoginListener(this);
    }
    let inviteCode = options.code;
    let reqType = options.reqType;
    this.getLocates()
    this.setData({
      inviteCode: inviteCode||"",
      reqType: reqType
    })
  },
  getLocates: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        // success  
        console.log("===getLocates===",res)
        var longitude = res.longitude
        var latitude = res.latitude
        that.setData({ longitude: longitude, latitude: latitude })
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })

  },
  // 店铺信息这部分
  //----------------------------------------------------------------
// 1.店铺名
  shopNameInput:function(e){
    console.log("店铺名", e.detail.value)
  this.setData({
    shopName: e.detail.value  
  })
  },
//个人经验介绍
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
    this.setData({
      introduce: e.detail.value
    })
  },
  // 个人信息这部分
  //----------------------------------------------------------------
// 1.用户名
  userName: function (e) {
    console.log("用户名", e.detail.value)
    this.setData({
      userName: e.detail.value
    })
  },
  // 2.手机号
  // 获取输入手机号码
  phoneInput: function (e) {
    console.log("手机号", e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  // 3.验证码
  // 获取输入密码 
  codeInput: function (e) {
    console.log("验证码", e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  // 验证码识别
  getCode: function () {
     
    if (!this.data.phone || this.data.phone.length!=11) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'loading',
        duration: 2000
      })
    } else {
    // 在这里访问查看验证码是否正确


      var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
      var time = _this.data.sec　　//获取最初的秒数
      code.getCode(_this, time);　　//调用倒计时函数
    }
  },
 



// 4.年龄
  ageInput:function(e) {
    console.log("年龄", e.detail.value)
    this.setData({
      age: e.detail.value
    })
  },
// 5性别
  changeColor:function(e){
    console.log("1为男2为女",e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    if(id=="1"){
    this.setData({
      colorB: "#FF5146", 
      colorG: "#333333",
      sex:"男"
    })
    }
    else{
      this.setData({
        colorB: "#333333",
        colorG: "#FF5146",
        sex:"女"
      })
    }
  },

  // 院校信息
 //--------------------------------------------------------------------
//  1.获取城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)   
    let   province = e.detail.value[0]
    let  city = e.detail.value[1]
    let  area = e.detail.value[2]
    this.setData({
      isRegion:true,
      province: province,
      city: city,
      area: area,
      region: e.detail.value
    })
  },
  // 2.校区
  schoolInput: function (e) {
    console.log("学校", e.detail.value)
    this.setData({
      schoolName: e.detail.value
    })
  },
  // 3.专业
  learn: function (e) {
    console.log("专业", e.detail.value)
    this.setData({
      learn: e.detail.value
    })
  },

    // 银行信息
 //--------------------------------------------------------------------
//  1.开户姓名
  bankUserName: function (e) {
    console.log("开户姓名", e.detail.value)
    this.setData({
      bankUserName: e.detail.value
    })
  },
  // 2.绑定手机号
  bankPhone: function (e) {
    console.log("绑定手机号", e.detail.value)
    this.setData({
      bankPhone: e.detail.value
    })
  },
// 3.银行卡号
  bankNumber: function (e) {
    console.log("银行卡号", e.detail.value)
    this.setData({
      bankNumber: e.detail.value
    })
  },
// 4.开户行
  bankName: function (e) {
    console.log("开户行", e.detail.value)
    this.setData({
      bankName: e.detail.value
    })
  },
 


  // -----------------提交
  submit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
    let formId = e.detail.formId;
  
       let that=this;
       if (that.data.userName == ""){
            wx.showModal({
              content: '请填写真实姓名',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
       } else if (!that.data.phone || that.data.phone.length != 11){
            wx.showModal({
              content: '请填写正确的手机号',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
       } else if (that.data.age == ""){
            wx.showModal({
              content: '请填写年龄',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
       } else if (that.data.province == "" || that.data.city == "" || that.data.area == ""){
            wx.showModal({
              content: '请选择城市',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
       }  else if (that.data.shopName.length > 9){
            wx.showModal({
              content: '名称不能超过9个字符',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
       } else if (!that.data.upLoadImageList['img_headImg']) {
         wx.showModal({
           content: '请上传您的头像',
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               console.log('用户点击确定')
             }
           }
         });
       }else{
         console.log("成功了")
         let params = {
           invitationCode: this.data.inviteCode,
           userName: this.data.userName,
           telno: this.data.phone,
           idCard: "",
           age: this.data.age,
           sex: this.data.sex,
           province: this.data.province,
           city: this.data.city,
           area: this.data.area,
           school: this.data.schoolName,
           learn: this.data.learn,
           longitude: this.data.longitude,
           latitude: this.data.latitude,
           reqType: 2,
           headImg: this.data.upLoadImageList['img_headImg'],
           introduce: this.data.introduce||"",
           formId: formId,
         }
         var customIndex = app.AddClientUrl("/applyServer.html", params, 'post')

        //  wx.showLoading({
        //    title: 'loading'
        //  })
        app.showToastLoading('loading', true)
         wx.request({
           url: customIndex.url,
           data: customIndex.params,
           header: app.headerPost,
           method: 'POST',
           success: function (res) {
             console.log("数据", res)
             if (res.data.errcode == '0') {
               setTimeout(function () {
               wx.reLaunch({
                 url: '../success/index'
                 })
               }, 200);
             } else {
               console.log('error')
               wx.showModal({
                 content: res.data.errMsg,
                 showCancel: false,
                 success: function (res) {
                   if (res.confirm) {
                     console.log('用户点击确定')
                   }
                 }
               });
              //  wx.showToast({
              //    title: res.data.errMsg,
              //    icon: 'success',
              //    duration: 2000
              //  })
             }
             wx.hideLoading()
           },
           fail: function (res) {
             wx.hideLoading()
             app.loadFail()
           }
         })

       }
//        
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})