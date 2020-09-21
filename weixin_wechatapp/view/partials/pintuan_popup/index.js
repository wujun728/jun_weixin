const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    pintuanParam: {
      type: JSON,
      value: '0',
    },
  },
  data: {
    // 这里是一些组件内部数据
    maskHidden:true,
   

  },
  ready:function(){
    console.log('=====ready====', this.data.pintuanParam)
    this.setData({
      platformSetting: app.setting.platformSetting,
    })
    this.getPintuanData()
  },
  methods: {
    goToPintuan:function(e){
      console.log("==goToPintuan===",e)
      let pintuanid;
      if (e.currentTarget.dataset.pintuanid){
        pintuanid = e.currentTarget.dataset.pintuanid
      }
      let data = { way: 'addPintuan', pintuanid: pintuanid}
      this.triggerEvent("goPintuan", { data});
    },
    getPintuanData: function () {
      let that = this;
      let data = this.data.pintuanParam
      var pintuanUrl = app.AddClientUrl("/wx_find_pintuan_records.html", data, 'post')
      wx.request({
        url: pintuanUrl.url,
        data: pintuanUrl.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log('--------add----------')
          console.log(res.data)
          that.setData({ pintuanListData: res.data.relateObj.result })

        },
        fail: function (res) {
          app.loadFail()
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    },
    closeFun:function(){
      this.triggerEvent('closePintuan', 0) //myevent自定义名称事件，父组件中使用
    },
  }
})