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
    display:""
  },
  ready:function(){
    let that=this;
    console.log("客服数据", this.data.data)
    this.setData({
      settingData: app.setting.platformSetting
    })
    console.log('settingData', this.data.settingData)
  },
  methods: {
    // 这里是一个自定义方法
    calling: function (e) {
      console.log('====e===',e)
      let phoneNumber = e.currentTarget.dataset.phonenumber
      wx.makePhoneCall({
        phoneNumber: phoneNumber, //此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      console.log("===========e==========", event.currentTarget.dataset.url)
      // 缓存
      try {
        wx.setStorageSync('客服数据', event.currentTarget.dataset.url)
      } catch (e) {
      }
      this.setData({
        display: 'none'
      })
      app.linkEvent(event.currentTarget.dataset.link);

    },
  },
})