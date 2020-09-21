
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formCommitId:0,
    showTypeTwo:false,
    animationDataTwo: null,
    shareTypeData: [{ name: '发送给朋友', type: 'botton' }, { name: '生成海报', type: 'text' }],
    haveValueList:[],
    allFormData:null,
    posterState:false,
    posterTitle: '',
    sendFormData: null,
  },
  closeZhezhao: function () {
    this.setData({  showTypeTwo: false })
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    })
    animation.height(0).step()
    let setData = animation.export()
    this.setData({
      animationDataTwo: setData
    })
  },
  showShare: function () {
    this.setData({ showTypeTwo: !this.data.showTypeTwo })
    let showTypeTwo = this.data.showTypeTwo
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
    })
    console.log("=======popupFormPage==========", animation, this.data.showType)
    if (showTypeTwo) {
      animation.height(150).step()
    } else {
      animation.height(0).step()
    }
    this.setData({
      animationDataTwo: animation.export()
    })
  }, 
  getDetail: function (formCommitId) {
    let that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })
    let formDetailData = app.AddClientUrl("/wx_get_custom_form_commit.html", { formCommitId: formCommitId }, 'get')
    wx.request({
      url: formDetailData.url,
      data: formDetailData.params,
      header: app.headerPost,
      method: 'get',
      success: function (res) {
        console.log("====success====", res)
        if (res.data.errcode == 0) {
          wx.hideLoading()
          let sendFormData = JSON.stringify({ title: 'noTitle', url: "form_" + res.data.relateObj.belongFormId })
          that.setData({ sendFormData: sendFormData })
          that.setData({ allFormData: res.data.relateObj, loading: false })
          let commitJson = JSON.parse(that.data.allFormData.commitJson);
          console.log("=======commitJson========", commitJson)
          let haveValueList = [];
          for (let key in commitJson) {
            if (commitJson[key].value && commitJson[key].value.length != 0 && commitJson[key].type != 7 && commitJson[key].type != 11 && commitJson[key].showInList ==1 ){
              let value = commitJson[key].value.value || commitJson[key].value
              haveValueList.push(value)
            }
          }
          console.log("=========haveValueList==========", haveValueList)
          that.setData({ haveValueList: haveValueList})
        } else {
          wx.showToast({
            title: '加载失败...',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(function () {
            wx.navigateBack(
              { delta: 1, }
            )
          }, 2000);

        }
      }
    })
  },
  showPoster:function(){
    let that = this;
    let ewmImgUrl = app.getQrCode({ type: "check_form_detail", id: that.data.formCommitId })
    let posterTitle = that.data.allFormData.belongFormName + "(" + that.data.haveValueList.join("/") + ")";
    that.setData({ posterState: true, ewmImgUrl: ewmImgUrl, posterTitle: posterTitle})
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
    that.getDetail(options.custom_form_commit_id)
    that.setData({ formCommitId: options.custom_form_commit_id,setting:app.setting})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    that.selectComponent("#checkFormDetail").onShow();
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
    that.selectComponent("#checkFormDetail").onPullDownRefresh();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    console.log('onReachBottom')
    that.selectComponent("#checkFormDetail").onReachBottom();
    // if (that.totalSize) {
    //   if (that.totalSize > that.curPage * that.pageSize) {
    //     that.getCommentData(that.data.allFormData.id, ++that.curPage);
    //   } else {
    //     console.log("没有更多数据了");
    //   }
    // }else{

    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    let that = this
    that.closeZhezhao();
    console.log('that.data.haveValueList:', that.data.haveValueList)
    let params = { custom_form_commit_id: that.data.formCommitId};
    let shareName = that.data.allFormData.belongFormName + "(" + that.data.haveValueList.join("/") + ")";
    let shareAppMessageData = app.shareForFx2('check_form_detail', shareName, params, '','custom_form_commit_id')
    console.log('params:', params)
    return shareAppMessageData
  },
})