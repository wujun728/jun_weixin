const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
    }
  },
  data: {
    // 这里是一些组件内部数据
    item: {},
    color:'#888',
    tipText:"",
    count:152366544,
  },
    interval:null ,
  
   ready:function(){
     let that=this;
     console.log("component-price-group",that.data.data)
     that.setData({ item: that.data.data})
   },
  methods: {
    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      app.linkEvent(event.currentTarget.dataset.link);

    }
  },
})