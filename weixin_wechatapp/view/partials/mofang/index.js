const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
    },
  },
  data: {
    // 这里是一些组件内部数据
   

  },
  ready:function(){
    console.log('=====ready-MoFang====', this.data.data)
    this.setData({ items: this.data.data.jsonData.items || []})
    this.setData({ width: Number(this.data.data.jsonData.width)||0})
    this.setData({ height: Number(this.data.data.jsonData.height) || 0})
    this.setData({ imagePadding: Number(this.data.data.jsonData.imagePadding) || 0})
    console.log('=====MoFang-width====', this.data.width)
    console.log('=====MoFang-height====', this.data.height)
    console.log('=====MoFang-imagePadding====', this.data.imagePadding)
  },
  methods: {
    tolinkUrl: function (e) {
      let linkUrl = e.currentTarget.dataset.link
      app.linkEvent(linkUrl)
    }
  }
})