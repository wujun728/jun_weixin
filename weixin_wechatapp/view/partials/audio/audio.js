const app = getApp();
Component({
  properties: {
    

    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: '../../../images/icons/play.png',
   
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    imgSrc:"../../../images/icons/play.png"
  },
  // 组件本身自带ready方法，自带的方法写在methods之外
   ready:function(){

   },
  methods: {
    
    // 这里是一个自定义方法
    audioPlay: function (e) {
      console.log(e.currentTarget.dataset.index)
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src ="http://p08e0oy3g.bkt.clouddn.com/%E8%A5%BF%E5%96%B5iy%20-%20%E4%BD%A0%E8%8B%A5%E6%88%90%E9%A3%8E.mp3"
      console.log(innerAudioContext.currentTime)
      
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },

  },

})