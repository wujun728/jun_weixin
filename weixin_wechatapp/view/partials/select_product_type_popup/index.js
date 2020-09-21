const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    productType: {
      type: JSON,
      value: '0',
    },
  },
  data: {
    // 这里是一些组件内部数据
    maskHidden:true,
    productTypeTwo:null,
    productTypeThree:null,
    curProTypeDate:"",

  },
  ready:function(){
    let that=this;
    console.log('=====ready====', that.data.productType)
    if (that.data.productType.length != 0) {
      that.setData({ curProTypeDate: that.data.productType[0] })
      for (let i = 0; i < that.data.productType.length; i++) {
        that.data.productType[i].active = false;
      }
      that.data.productType[0].active = true;
      that.setData({ productType: that.data.productType })
      that.getProductType(that.data.productType[0].id,'two')
    }else{
      that.setData({ curProTypeDate:null })
    }
    console.log('=====ready====', that.data.productType)
    that.setData({
      platformSetting: app.setting.platformSetting,
    })
    // this.getPintuanData()
  },
  methods: {
    sureSelect:function(){
      let that=this;
      that.triggerEvent('sureSelect', { name: this.data.curProTypeDate.name, id: this.data.curProTypeDate.id}) //myevent自定义名称事件，父组件中使用
    },
    cancelSelect: function () {
      this.triggerEvent('sureSelect', 0) //myevent自定义名称事件，父组件中使用
    },
    /* 点击分类大项 */
    bindTypeItem: function (event) {
      let that=this;
      console.log(event.currentTarget.dataset)
      let itemData = event.currentTarget.dataset.item
      let itemIndex = event.currentTarget.dataset.index
      let itemType = event.currentTarget.dataset.type
      that.setData({ curProTypeDate: itemData})
      console.log("===itemIndex====", itemIndex, that.data.curProTypeId)
      if (itemType=='two'){
        let productType = that.data.productType
        for (let i = 0; i < productType.length; i++) {
          productType[i].active = false;
          if (i == itemIndex) {
            productType[i].active = true;
          }
        }
        that.setData({ productType: productType })
        that.getProductType(itemData.id, 'two')
      } else if (itemType == 'three'){
        let productTypeTwo = that.data.productTypeTwo
        for (let i = 0; i < productTypeTwo.length; i++) {
          productTypeTwo[i].active = false;
          if (i == itemIndex) {
            productTypeTwo[i].active = true;
          }
        }
        that.setData({ productTypeTwo: productTypeTwo })
        that.getProductType(itemData.id, 'three')
      }else{
        let productTypeThree = that.data.productTypeThree
        for (let i = 0; i < productTypeThree.length; i++) {
          productTypeThree[i].active = false;
          if (i == itemIndex) {
            productTypeThree[i].active = true;
          }
        }
        that.setData({ productTypeThree: productTypeThree })
      }
    },
    //获取产品分类
    getProductType: function (categoryId,type) {
      console.log("====categoryId=====", categoryId);
      var that = this
      var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: categoryId || 0 })
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("==res====", res.data)
          if (res.data.errcode == 0) {
            if(type=='two'){
              console.log("=========two=========")
              let productTypeTwo = res.data.relateObj;
              if (productTypeTwo.length != 0) {
                for (let i = 0; i < productTypeTwo.length; i++) {
                  productTypeTwo[i].active = false;
                }
                // productTypeTwo[0].active = true;
                // that.getProductType(productTypeTwo[0].id, 'three')
              }
              that.setData({ productTypeTwo: productTypeTwo })
            } else if (type == 'three'){
              console.log("=========three=========")
              let productTypeThree = res.data.relateObj;
              if (productTypeThree.length != 0) {
                for (let i = 0; i < productTypeThree.length; i++) {
                  productTypeThree[i].active = false;
                }
                // productTypeThree[0].active = true;
              }
              that.setData({ productTypeThree: productTypeThree })
            }
          } else {
          }
          wx.hideLoading()
        },
        fail: function (res) {
          console.log("fail")
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
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