
const app = getApp()
import { socketConnect } from "../../public/json2Form.js";
var wxst;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatMsgList: [],
    windowHeight: 0,
    scrollViewHeight: 0,
    inputBottom:0,
    bottomSendBlockHeight:0,
    sendValue:'',
    initState:true,
    toView:'msg_0',
  },
  toIndex:function(){
    app.toIndex()
  },
  upper:function(){
    console.log("====upper====")
    this.onReachBottom();
  },
  lower: function () {
    console.log("====lower====")
  },
  /**
   * 获取聚焦
   */
  focus: function (e) {
    let that=this;
    console.log("====focus====", e, e.detail.height)
    let keyHeight = e.detail.height;
    that.setData({
      scrollViewHeight: that.data.windowHeight - keyHeight - that.data.bottomSendBlockHeight ,
      inputBottom: keyHeight
    });
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    let that = this;
    console.log("====blur===", e, that.data.windowHeight, that.data.bottomSendBlockHeight)
    that.setData({
      scrollViewHeight: that.data.windowHeight - that.data.bottomSendBlockHeight,
      inputBottom: 0
    })
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
  getChatMsgList: function (paramData) {
    let that = this
    let params = { 
      toPlatformUserId: paramData.puid,
      page: paramData.page,
    }
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
          that.setData({ chatMsgList: dataList})
          setTimeout(function () {
            if(that.params.page==1){
              that.setData({ toView: 'msg_' + (dataList.length - 1) })
            } else {
              that.setData({ toView: 'msg_' + (resultData.length - 1) })
            }
          }, 500)
        } else {
          console.log("接口错误")
        }

      },
      fail: function (res) {

      }
    })
  },
  websocketLink: function (paramData) {
    let that = this
    let params = { puid: paramData.puid }
    let customIndex = app.AddClientUrl("/connect_chat.socket", params, 'get')
    console.log("===customIndex.url======", customIndex)
    wxst=wx.connectSocket({
      url: customIndex.url,
      header: {
        'content-type': app.header
      },
      success:function(res){
        console.log("====success====",res)
      },
      fail: function (res) {
        console.log("====fail====", res)
      },
      complete: function (res) {
        console.log("====complete====", res)
      },
    })
    that.initSocketLink();
  },
  initSocketLink:function(){
    let that=this
    console.log("===property====", wxst)
    wxst.onOpen(res => {
      console.info('连接打开成功');
      let socketLinkListener = {}
      if (!app.socketLinkListener["puid_" + that.params.puid]) {
        socketLinkListener["puid_" + that.params.puid]
        socketLinkListener["puid_" + that.params.puid] = wxst
        console.log("===socketLinkListener===", socketLinkListener);
        app.addSocketLinkListener(socketLinkListener)
      }
    });
    wxst.onError(res => {
      console.info('连接识别');
      console.error(res);
    });
    wxst.onMessage(res => {
      let that = this;
      console.log("===onMessage==", res)
      let chatMsgList = that.data.chatMsgList
      let data = ''
      try {
        data = JSON.parse(res.data);
      } catch (e) {
        data = res.data
      }
      console.info(data);
      if (!that.data.initState) {
        chatMsgList.splice(chatMsgList.length, 0, data)
        that.setData({ chatMsgList: chatMsgList, sendValue: '', })
        setTimeout(function () {
          that.setData({ toView: 'msg_' + (chatMsgList.length - 1) })
        }, 500)
        console.log("===toView==", that.data.toView)
      } else {
        that.setData({ initState: false })
      }
    });
    wxst.onClose(() => {
      console.info('连接关闭');
      that.closeOne()
      wx.showModal({
        title: '连接已断',
        content: '你需要再次创建连接吗~!',
        success: function (res) {
          if (res.confirm) {
            console.log('点击确认回调')
            that.params.page == 1
            that.setData({ initState: true })
            that.websocketLink(that.params);
            that.getChatMsgList(that.params)
          } else {
            console.log('点击取消回调')
            wx.navigateBack(
              { delta: 1, }
            )
          }
        }
      })
    });
  },
  //发送内容
  sendOne: function (e) {
    console.log("====sendOne=====",e)
    let that=this;
    let value = e.detail.value
    that.setData({ sendValue: value})
    if (wxst.readyState == wxst.OPEN) {
      wxst.send({
        data: '{"viewHandler":"chat","content":"' + value + '","toUserId":' + that.params.puid + ',"fromUserId":' + that.data.loginUser.platformUser.id+',"msgType":0}',
        success: () => {
          console.info('客户端发送成功');
        }
      });
    } else {
      console.error('连接已经关闭');
    }
  },
  //关闭连接
  closeOne: function () {
    wxst.close();
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
    that.setNavColor();
    that.setNav(that.params.puname)
    if (!app.socketLinkListener["puid_" + that.params.puid]){
      console.log("未连接",)
      that.websocketLink(that.params);
    } else {
      console.log("已连接")
      wxst = app.socketLinkListener["puid_" + that.params.puid]
      that.initSocketLink();
    }
    that.getChatMsgList(that.params)
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

console.log("jhellpo!!!!!!");
    var connect = socketConnect(app);
    console.log("jhellp222o!!!!!!");
    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
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
        bottomSendBlockHeight: bottomSendBlock
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
      that.getChatMsgList(that.params);
    }else{
      wx.showToast({
        title: '到头啦~',
        image: '/images/icons/tip.png',
        duration: 2000
      })
    }
  },

})