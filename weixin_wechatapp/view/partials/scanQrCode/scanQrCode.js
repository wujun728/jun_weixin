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
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/news_detail/index?id=' + event.currentTarget.dataset.id,
      })
    },

    scanQrCode:function(){
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          console.log("========res=========",res)
          console.log("========res.result=========", "{"+res.result+"}")
          let json = "{" + res.result + "}";
          json = json.replace(/&/g, ',')
          json = json.replace(/=/g, ':')
          console.log(json)
          console.log(JSON.stringify(json))


          let json1 = res.result.replace(/=/g, ':')
          var surls = json1.split('&')
          console.log(surls[1])
          let aaa = surls[1].split(':')
          console.log(aaa);
            let ccc=JSON.stringify(aaa[0])
            let ddd =aaa[1]
          let bbb={
            ccc:ddd
          }
         console.log("=======bbb==========",bbb)
        
          
        }
      })
    }
  },
})