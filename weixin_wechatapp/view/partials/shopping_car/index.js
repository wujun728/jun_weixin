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
    shoppingCarData: {},
    cartData:{},
    countGood:0,
    countPrice:0,
    sysWidth:"",
  },

  ready:function(){
    console.log("=======购物车组件==========",this.data.data)
    this.setData({
      sysWidth: app.globalData.sysWidth,
      setting:app.setting
    });
    app.addCarChangeNotify(this);
    this.getCart();
  },
  methods: {
    carChangeNotify:function(data){
      console.log("====car change=====", data)
      let that=this;
      if (data =='clear'){
        this.setData({
          pushItem: [],
          countGood: 0,
          countPrice: 0
        })
      }
      else{
        this.getCart();
      }
    },
    getCart: function (type) {
      console.log('==========')
      var customIndex = app.AddClientUrl("/get_shopping_car_list_item.html")
      var that = this
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log('------error-------')
          console.log("加载的数据", res.data)
          if (res.data.errcode == '10001') {
            that.data.cartData = null
            that.setData({
              cartData: that.data.cartData
            })
            app.loadLogin()
          } else if (res.data.result.errcode == '-1') {
            that.data.cartData = null
            that.setData({
              cartData: that.data.cartData
            })
            app.echoErr(res.data.result.errMsg)
          } else {
            if (!res.data.result || res.data.result.length == 0) {
              that.data.cartData = null
              that.setData({
                cartData: that.data.cartData
              })
            } else if (res.data.result.errcode) {
              that.data.cartData = null
              that.setData({
                cartData: that.data.cartData
              })
             // app.echoErr(res.data.result.errMsg)
            } else {
              console.log("======success====")
              that.data.cartData = res.data.result;
              that.setData({
                cartData: that.data.cartData,
              })
              console.log("======successcartData====", that.data.cartData)
            }
            that.showPrice()
          }

        },
        fail: function (res) {

        }
      })
    },
    showPrice: function () {
      let that=this;
      let resultData = app.showPrice(that.data.cartData);
      console.log("===========resultData==========", resultData)
      this.setData({
        pushItem: resultData.pushItem||[],
        countGood: resultData.countGood,
        countPrice: resultData.countPrice
      })
    },
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);
    }
  },
})