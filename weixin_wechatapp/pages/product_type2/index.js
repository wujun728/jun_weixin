 

const app = getApp()

Page({
 
  data: {
    focusTypeItem:null
  },
  bindTypeItem: function (event) {
    console.log(event.currentTarget.dataset.type)
    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      if (this.data.setting.platformSetting.categories[i].id == event.currentTarget.dataset.type.id) {
        this.data.setting.platformSetting.categories[i].active = true
      }
      else {
        this.data.setting.platformSetting.categories[i].active = false
      }
    }
    this.setData({
      setting: this.data.setting,
    })

      this.setData({
        focusTypeItem: event.currentTarget.dataset.type,
      })
      var focus = event.currentTarget.dataset.type

      /*
      if (focus.children.length == 0) {
        this.params.categoryId = focus.id
        this.getData(this.params, 2)
        this.setData({ showType: false, bindProductTypeIndex: null })
      }*/

    

  },
  //点击右侧二级目录
  bind_erji_type: function (e){
    console.log(e.currentTarget.dataset.type)
    let typeItem = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/search_product/index?categoryId=' + typeItem.id,
    })
  },
  /* 广告图跳转 */
  toAdverLink:function(e){
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url
    if (!url || url.length<5){
      return
    }else{
      //product_detail_7942.html
      let productId = url.replace(/[^0-9]/ig, "");
      wx.navigateTo({
        url: '/pages/productDetail/index?id=' + productId + "&addShopId=236",
      })
    }
  },
  setDefaultType:function(){
    let categories = this.data.setting.platformSetting.categories
    categories[0].active = true
    this.setData({
      setting:this.data.setting,
      focusTypeItem: categories[0]
    })
  },
  onload:function(){

  },
  onReady:function(){
    this.setData({ setting: app.setting })
    if (!!this.data.setting) {
      let categories = this.data.setting.platformSetting.categories
      for (let i = 0; i < categories.length; i++) {
        categories[i].active = false
      }
    }
    this.setData({ setting: this.data.setting })
    console.log(this.data.setting )
    this.setDefaultType()
  },
  onshow:function(){

  },

})