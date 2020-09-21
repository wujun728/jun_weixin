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
    someData: {}
  },
  ready: function () {
    console.log("xinwen ",this.data.data)
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/news_detail/index?id=' + event.currentTarget.dataset.id,
      })
    }
  },
})