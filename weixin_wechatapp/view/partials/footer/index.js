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
  },
  ready:function(){
    this.setData({
      sysWidth: app.globalData.sysWidth,
      setting:app.setting
    });
  },
  methods: {
    // 这里是一个自定义方法
    buttom: function () {
      // console.log("1111111111111")
      app.wxLogin(1011)
      // wx.chooseAddress({
      //   success: function (res) {
      //     console.log(res.userName)
      //     console.log(res.postalCode)
      //     console.log(res.provinceName)
      //     console.log(res.cityName)
      //     console.log(res.countyName)
      //     console.log(res.detailInfo)
      //     console.log(res.nationalCode)
      //     console.log(res.telNumber)
      //   }
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