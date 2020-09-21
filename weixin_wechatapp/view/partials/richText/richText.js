const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
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
  ready:function(){
    var that = this
       var oldData=this.data;
       console.log("oldData" + JSON.stringify(oldData.data.jsonData.content))
    WxParse.wxParse('article', 'html', oldData.data.jsonData.content, that, 10);
    console.log("oldData", this.data.article.nodes)
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);

    }
  },
})