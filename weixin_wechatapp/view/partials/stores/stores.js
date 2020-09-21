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
    belongShopName: "",
    longitude: "",
    latitude: "",
    logo: "",
    arr: [],
    img: ""
  },


  moved: function () {
    console.log("===================");
  },
  ready: function () {
    console.log("===========store======", this.data.data)
    var oldData = this.data;
    var that = this;
    //  封装一个函数把mendianType传进去
    that.getMenDianIfon(oldData.data.jsonData.mendianType)
  },

  methods: {
    // 这里是一个自定义方法



    // 您还没有归属店铺的跳转
    click: function (e) {
      console.log(this.data.arr)
      if (this.data.arr.name == "您还没有归属店铺") {
        return;
      }
      else if (this.data.arr.name == "您还未登录") {

        return;
      } else if (!this.data.arr.latitude && !this.data.arr.longitude){
        wx.showModal({
          title: '提示',
          content: '主人~该门店没有设置位置哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }
      else {
        console.log(this.data.arr.latitude)
        console.log(this.data.arr.longitude)
        var latitude = this.data.arr.latitude;
        var longitude = this.data.arr.longitude;
        var address = this.data.arr.address;
        var name = this.data.arr.name;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 12,
          address: address,
          name: name
        })
      }

    },

    // 跳转（附近门店跳到下一个页面）
    click1: function (e) {
      var that = this;
      wx.navigateTo({
        url: '../../pages/nearby_stores/index',
        success: function () {
          app.currentMendianComponentCallback = that.callback;
          app.currentMendianComponent = that;
        }

      })



    },
    // 返回的信息
    callback: function (mendianBean) {
      console.log("===call back====", mendianBean)

      app.currentMendianComponent.setData({
        arr: mendianBean,
      })
    },
    // 附近门店的定位
    clickCatch: function (e) {
      console.log(this.data.arr)
      let latitude = this.data.arr.latitude;
      let longitude = this.data.arr.longitude;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,

      })
    },




    // 封装的新函数
    getMenDianIfon: function (mendianType) {
      let that = this;
      console.log(mendianType)
      // 附近门店内，当传入的参数为门店ID的时候先用传进去的(扫码优先)
      if (app.enterMenDianID && app.enterMenDianID != "") {
        console.log("二维码携带的enterMenDianID" + app.enterMenDianID)
        //  app.enterMenDianID即扫码所带的id，先查询该id所指的门店的具体信息，将信息改到附近门店。
        that.findMenDianIfon(app.enterMenDianID)
      }
      else {
        // 以下三种情况非扫码登录
        //1. 默认门店
        if (mendianType == 0 && app.defaultMendianID != "") {
          console.log("门店ID" + app.defaultMendianID)
          // 获取门店数据app.defaultMendianID
          var menDianID = app.defaultMendianID
          that.getMenDian(menDianID)
        }

        //2. 下单人员所属门店(确定用户登录，然后获取用户信息得到用户所属门店)
        if (mendianType == 2) {
          //  已经登录
          if (app.loginUser && app.loginUser != "") {
            //  mendian可能不存在
            if (app.loginUser.platformUser.mendian && app.loginUser.platformUser.mendian != "") {
              console.log("登录了", app.loginUser)
              var userIfon = app.loginUser.platformUser.mendian.name;
              var userIfonMendianID = app.loginUser.platformUser.mendian.id;
              // 有个人信息且信息不为空（有被设置成归属店铺）
              if (userIfon != "" && userIfonMendianID > 0) {
                that.setData({
                  arr: app.loginUser.platformUser.mendian,
                })
              }
            }
            // 没被设置成归属店铺
            else {
              that.setData({
                arr: { name: "您还没有归属店铺" }
              })
            }
          }
          else {
            // 未登录的时候将店铺的名字改为您还未登录
            that.setData({
              arr: { "name": "您还未登录" }
            })
          }
        }


        //3.附近门店
        if (mendianType == 1) {
          that.getNearMenDian();

        }
      }

      // 当存在mendianId

    },
    // 扫描二维码所带的id查看门店信息
    findMenDianIfon: function (mendianId) {
      console.log(mendianId)
      // 获取门店的样式
      var that = this
      let menDian = {
        mendianId: mendianId,
      }
      let menDianYangShi = app.AddClientUrl("/mendian_detail.html", menDian, 'get')
      wx.request({
        url: menDianYangShi.url,
        data: menDianYangShi.params,
        header: app.headerPost,
        method: 'get',
        success: function (res) {
          console.log(res)
          if (res.data.errcode == "-1") {
            wx.showToast({
              title: res.data.errMessage,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
          else {
            that.setData({
              arr: res.data.relateObj,
            })
            // 设置门店
            that.setUpMenDian(mendianId)
          }
        }
      })
    },

    // 默认门店获取数据
    getMenDian: function (mendain) {
      console.log("======a=======")
      var that = this
      let menDian = {
        mendianId: mendain,
      }
      let menDianYangShi = app.AddClientUrl("/mendian_detail.html", menDian, 'get')
      wx.request({
        url: menDianYangShi.url,
        data: menDianYangShi.params,
        header: app.headerPost,
        method: 'get',
        success: function (res) {
          console.log("======a=======", res)
          if (res.data.errcode == "-1") {
            wx.showToast({
              title: res.data.errMessage,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
          else {
            // 直接拿到arr数据，放到wxml中去渲染
            that.setData({
              arr: res.data.relateObj,
            })
            // 设置门店
            that.setUpMenDian(mendain)
          }
        }
      })
    },
    //  附近门店取第一个
    getNearMenDian: function (callback) {
      var that = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log("===getNearMenDian==",res)
          var latitude = res.latitude
          var longitude = res.longitude
          let menDian = {
            longitude: longitude,
            latitude: latitude

          }
          // longitude 经度        
          // 获取门店的样式
          let menDianYangShi = app.AddClientUrl("/find_mendians.html", menDian, 'get')
          wx.request({
            url: menDianYangShi.url,
            data: menDianYangShi.params,
            header: app.headerPost,
            method: 'GET',
            success: function (res) {
              console.log("===附近门店取第一个",res.data)
              if (res.data.errcode == "-1") {
                wx.showToast({
                  title: res.data.errMessage,
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              }
              else {
                //  把数组化成数据
                that.setData({
                  arr: res.data.relateObj.result[0],
                })
                var mendian = that.data.arr.id;
                if (mendian && mendian != "") {
                  // 当数据都存在，然后就开始设置门店
                  that.setUpMenDian(mendian);
                }
              }
            }
          })
        }
      })
    },

    // 设置门店（当门店信息都有的时候，将门店id传到服务器。）
    setUpMenDian: function (menDianID) {
      var id = menDianID
      let menDianParameter = {
        mendianId: id
      }

      let menDianYangShi = app.AddClientUrl("/location_mendian.html", menDianParameter, 'get')
      wx.request({
        url: menDianYangShi.url,
        data: menDianYangShi.params,
        header: app.headerPost,
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.errcode == "-1") {
            wx.showToast({
              title: res.data.errMessage,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
          else {
            console.log("设置成功")

          }
        }
      })
    },

    // 拨打电话
    callPhone: function (e) {
      if (e.currentTarget.dataset.phone && e.currentTarget.dataset.phone != "") {
        console.log("=====phone======", e.currentTarget.dataset.phone)
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone
        })
      }

    }

  },
})