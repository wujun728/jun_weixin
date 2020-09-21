
const app = getApp()
import { socketFun} from "../../public/json2Form.js";
var wxst;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatMsgList: [],
    windowHeight: 0,
    windowWidth: 0,
    scrollViewHeight: 0,
    inputBottom:0,
    bottomSendBlockHeight:0,
    sendValue:'',
    rpxScalePx:1,
    initState:true,
    toView:'msg_0',
    inputAnimation: {},
    otherMethodsAnimation: {},
    showMethodsState:false,
    focus:false,
    otherMethodsList:[
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 },
      { icon: 'http://image1.sansancloud.com/xianhua/2019_9/6/16/5/8_273.jpg?x-oss-process=style/preview_120', title: '照片', handler: 'sendImgFun', type: 1 }
    ]
  },
  toIndex:function(){
    app.toIndex()
  },
  lookBigImage: function (e) {
    let that=this;
    console.log("111111111", e.currentTarget.dataset)
    let chatMsgList = that.data.chatMsgList
    let imgArray = []
    let index = e.currentTarget.dataset.index;
    let imgIndex=0
    let imgId = that.data.chatMsgList[index].id
    let chatMsgImgList = [];
    console.log("===imgId====", imgId)
    if (that.data.chatMsgList[index].msgType == 1){
      for (let i = 0; i < chatMsgList.length; i++) {
        if (chatMsgList[i].msgType == 1) {
          if (chatMsgList[i].content.indexOf("https") == -1) {
            chatMsgList[i].content = chatMsgList[i].content.replace(/http/, "https")
          }
          chatMsgImgList.push(chatMsgList[i])
          imgArray.push(chatMsgList[i].content)
        }

      }
      for (let i = 0; i < chatMsgImgList.length; i++) {
        if (chatMsgImgList[i].id == imgId) {
          imgIndex = i
        }
      }
      console.log("===imgIndex====", imgIndex)
      console.log(chatMsgImgList, imgArray)
      if (!chatMsgList) {
        return
      }
      wx.previewImage({
        current: imgArray[imgIndex], // 当前显示图片的http链接
        urls: imgArray // 需要预览的图片http链接列表
      })
    }
  },
  upper:function(){
    console.log("====upper====")
    this.onReachBottom();
  },
  lower: function () {
    console.log("====lower====")
  },
  hiddenMethodsListFun: function () {
    console.log("===hiddenMethodsListFun===")
    let that=this;
    let otherMethodsAnimation = that.animationFun('bottom', 'linear', 100, '-450rpx')
    let animationData = that.animationFun('bottom', 'linear', 100, 0)
    this.setData({
      otherMethodsAnimation: otherMethodsAnimation,
      inputAnimation: animationData,
      showMethodsState:false,
      scrollViewHeight: that.data.windowHeight - that.data.bottomSendBlockHeight,
    })
  },
  showOtheMethodsListFun:function(){
    console.log("===showOtheMethodsListFun===")
    let that = this;
    let rpxScalePx = that.data.rpxScalePx
    let otherMethodsAnimation = that.data.otherMethodsAnimation
    let animationData = that.data.inputAnimation;
    let focus = that.data.focus;
    let showMethodsState = that.data.showMethodsState;
    let chatMsgList = that.data.chatMsgList
    that.setData({ showMethodsState: !showMethodsState })
    showMethodsState = !showMethodsState
    if (showMethodsState) {
      otherMethodsAnimation = that.animationFun('bottom', 'linear', 100, 0)
      animationData = that.animationFun('bottom', 'linear', 100, '450rpx')
      console.log("scrollViewHeight", that.data.windowHeight, (450 * rpxScalePx), that.data.windowHeight - (450 * rpxScalePx) - that.data.bottomSendBlockHeight)
      that.setData({
        otherMethodsAnimation: otherMethodsAnimation,
        inputAnimation: animationData,
        scrollViewHeight: that.data.windowHeight - (450 * rpxScalePx) - that.data.bottomSendBlockHeight,
      })
      setTimeout(function () {
        that.setData({ toView: 'msg_' + (chatMsgList.length - 1) })
      }, 500)
    }else{
      focus=true
      otherMethodsAnimation = that.animationFun('bottom', 'linear', 100, '-450rpx')
      // animationData = that.animationFun('bottom', 'linear', 100, 0)
      that.setData({
        focus: focus,
        otherMethodsAnimation: otherMethodsAnimation,
        })
    }
  },
  // 发送图片
  sendImgFun: function (e) {
    console.log("====sendImgFun=====", e)
    let that = this;
    let type = e.currentTarget.dataset.type
    socketFun.sendImgFun(type, that.params);
    
  },
  //发送内容
  sendOne: function (e) {
    console.log("====sendOne=====", e)
    let that = this;
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    
    that.setData({ sendValue: value })
    if (value){
      socketFun.sendMsgFun(value,type,that.params);
    }else{
      app.echoErr('不能发空消息~')
    }
  },
  /**
   * 获取聚焦
   */
  focus: function (e) {
    let that=this;
    console.log("====focus====", e, e.detail.height)
    let chatMsgList = that.data.chatMsgList
    let keyHeight = e.detail.height;
    let showMethodsState = that.data.showMethodsState;
    let otherMethodsAnimation = that.data.otherMethodsAnimation;
    that.setData({
      scrollViewHeight: that.data.windowHeight - keyHeight - that.data.bottomSendBlockHeight ,
    });
    setTimeout(function () {
      that.setData({ toView: 'msg_' + (chatMsgList.length - 1) })
    }, 500)
    // 动画start
    if (showMethodsState) {
      showMethodsState = !showMethodsState
      otherMethodsAnimation = that.animationFun('bottom', 'linear', 100, '-450rpx')
    }
    let animationData=that.animationFun('bottom', 'linear', 100, keyHeight)
    this.setData({
      inputAnimation: animationData,
      otherMethodsAnimation: otherMethodsAnimation,
      showMethodsState: showMethodsState
    })
    // 动画end
  },
  animationFun: function (type, timingFunction,time,value){
    console.log("animationFun", type)
    let animation = wx.createAnimation({
      duration: time,
      timingFunction: timingFunction,
    })
    animation[type](value).step()
    let animationData = animation.export()
    console.log("==animationData==", animationData)
    return animationData
  },
  //失去聚焦(软键盘消失)
  blur: function (e) {
    let that = this;
    let chatMsgList = that.data.chatMsgList
    let showMethodsState = that.data.showMethodsState;
    console.log("====blur===", e, that.data.windowHeight, that.data.bottomSendBlockHeight)
    that.setData({
      scrollViewHeight: that.data.windowHeight - that.data.bottomSendBlockHeight,
      // inputBottom: -that.data.bottomSendBlockHeight,
    })
    setTimeout(function(){
      that.setData({ toView: 'msg_' + (chatMsgList.length - 1)})
    }, 500)
    // 动画start
    if (!showMethodsState){
      let animationData = that.animationFun('bottom', 'linear', 100, 0)
      this.setData({
        inputAnimation: animationData
      })
    }
    // 动画end
  },
  saveSearchValue:function(e){
    console.log("====saveSearchValue====",e)
    let that=this;
    that.setData({ resourceValidateInput: e.detail.value})
  },
  /* 获取数据 */
  setNavColor: function () {
    console.log('setNavColor', app.setting)
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f9f9f9'

    })
  },
  setNav: function (name) {
    console.log('setNav', app.setting)
    wx.setNavigationBarTitle({
      title: name,
    })
  },
  getChatMsgList: function (paramData,typeState) {
    let that = this
    let params = { 
      toPlatformUserId: paramData.puid,
      page: paramData.page,
    }
    that.setData({ curPage: paramData.page, toView:''})
    let customIndex = app.AddClientUrl("/wx_find_chat_msg.html", params, 'post')
    wx.request({
      url: customIndex.url, //仅为示例，并非真实的接口地址
      data: customIndex.params,
      header: app.headerPost,
      success: function (res) {
        console.log('===========getChatMsgList============', res)
        if (res.data.errcode == 0) {
          wx.hideLoading()
          console.log(res.data.relateObj)
          let resultData = res.data.relateObj.result
          let dataList = that.data.chatMsgList;
          that.listPage.pageSize = res.data.relateObj.pageSize
          that.listPage.totalSize = res.data.relateObj.totalSize
          if (that.params.page==1){
            dataList = resultData.reverse()
          }else{
            for (let i = 0; i < resultData.length;i++){
              dataList.unshift(resultData[i]) 
            }
            // dataList = dataList.concat(resultData)
          }
          console.log("===toView===", that.data.toView)
          that.setData({ chatMsgList: dataList }, function () {
            console.log("更新数据成功",)
            let toView = ''
            setTimeout(function () {
              if (that.params.page == 1) {
                console.log("初始化数据位置")
                toView = 'msg_' + (dataList.length - 1)
              } else {
                toView = 'msg_' + (resultData.length - 1)
              }
              console.log("===toView===", toView)
              that.setData({ toView: toView })
            },500)
          })
          console.log("===chatMsgList===", that.data.chatMsgList)
          // setTimeout(function () {
          //   let toView=''
          //   if(that.params.page==1){
          //     console.log("初始化数据位置")
          //     toView = 'msg_' + that.data.chatMsgList[(dataList.length - 1)].id
          //   } else {
          //     toView = 'msg_' + that.data.chatMsgList[(resultData.length - 1)].id
          //   }
          //   console.log("===toView===", toView)
          //   that.setData({ toView: toView })
          // }, 2000)
        } else {
          console.log("接口错误")
        }

      },
      fail: function (res) {

      }
    })
  },
  loginSuccess: function (user) {
    console.log("pre apply mendian login success call back!", user);
    this.checkState();
  },
  loginFailed: function (err) {
    console.log("login failed!!");

  },
  checkState: function () {
    let that=this;
    console.log('======checkState.loginUser======', app.loginUser, app.socketLinkListener)
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser
    })
    console.log("jhellpo!!!!!!");
    // var connect = socketFun.socketConnect();
    console.log("jhellp222o!!!!!!");
    that.getChatMsgList(that.params)
    that.setNavColor();
    that.setNav(that.params.puname)
    var chatlistener=function(res){
      console.log("===onMessage==", res)
      let chatMsgList = that.data.chatMsgList
      let data = ''
      try {
        data = JSON.parse(res.data);
      } catch (e) {
        data = res.data
      }
      console.info(data);
      if ((data.fromUserId == that.params.puid && data.toUserId == app.loginUser.platformUser.id) || (data.fromUserId == app.loginUser.platformUser.id && data.toUserId == that.params.puid)){
        res.isHandler = true;
        chatMsgList.splice(chatMsgList.length, 0, data)
        that.setData({ chatMsgList: chatMsgList, sendValue: '', })
        setTimeout(function () {
          that.setData({ toView: 'msg_' + (chatMsgList.length - 1) })
        }, 500)
      }
      console.log("===toView==", that.data.toView)
      var nextListenerHandlerNextMsg=false;
      return nextListenerHandlerNextMsg;
    }
    console.log("====chatlistener=====", chatlistener)
   // var connect = socketFun.socketConnect(app);
    socketFun.addListener("chat","userChat",chatlistener,9999);

  
  },

  setTimeoutLogin: function (conuData) {
    let that = this;
    console.log("====setTimeout-init=====", conuData)
    that.conut = conuData;
    that.conut += 2;
    if (that.conut <= 5) {
      setTimeout(function () {
        if (app.loginUser) {
          wx.hideLoading()
        } else {
          that.setTimeoutLogin(that.conut)
        }
      }, that.conut * 1000)
    } else {
      wx.showModal({
        title: '失败了',
        content: '请求失败了，请下拉刷新！',
      })
    }
  },
  params:{
    page:1
  },
  listPage: {
    pageSize: 20,
    totalSize: 0,
  },
  conut: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log("===getSystemInfo===", res)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          rpxScalePx: res.windowWidth / 750
        });
      }
    });
    console.log('===rpxScalePx===', that.data.rpxScalePx)
    // 然后取出navbar和header的高度
    // 根据文档，先创建一个SelectorQuery对象实例
    let query = wx.createSelectorQuery().in(that);
    // 然后逐个取出navbar和header的节点信息
    // 选择器的语法与jQuery语法相同
    query.select('#bottom_send_block').boundingClientRect();
    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    query.exec((res) => {
      console.log("res", res)
      // 分别取出navbar和header的高度
      let bottomSendBlock = res[0].height;
      console.log("bottomSendBlock", bottomSendBlock)
      // 然后就是做个减法
      let scrollViewHeight = that.data.windowHeight - bottomSendBlock;
      // 算出来之后存到data对象里面
      that.setData({
        scrollViewHeight: scrollViewHeight ,
        bottomSendBlockHeight: bottomSendBlock,
        inputBottom: 0
      });
    });
    that.params = Object.assign({}, that.params, options)
    if (app.loginUser) {
      that.checkState();
    } else {
      app.addLoginListener(that);
      app.showToastLoading('loading', true)
      console.log("====setTimeout1=====")
      that.setTimeoutLogin(that.conut)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, properties: app.properties })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.reflesh == 1) {
      this.onPullDownRefresh()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    socketFun.removeListener("userChat");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that=this;
    that.params.page=1;
    that.getChatMsgList()
    wx.stopPullDownRefresh()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this;
    if (that.listPage.totalSize > that.params.page * that.listPage.pageSize) {
      that.params.page++
      app.showToastLoading('加载中~', true)
      that.getChatMsgList(that.params,'addType');
    }else{
      if (that.params.page>1){
       wx.showToast({
         title: '到头啦~',
         image: '/images/icons/tip.png',
         duration: 2000
       })
     }
    }
  },

})