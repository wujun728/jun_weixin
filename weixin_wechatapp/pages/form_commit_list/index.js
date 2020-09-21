
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    moneyAmount: 0,
    mendian: null,
    loading:true,
    publishState:false,
    customFormId:0,
    showCount:false,
    formType:[],
    showTop:false,
    sendOptionData:null,
  },
  getDataFun: function (e) {
    let that = this;
    console.log("===getDataFun===", e)
    let data=e.detail
    wx.setNavigationBarTitle({
      title: data.formName,
    })
  },
  showMore:function(e){
    console.log("==showMore===",e)
    let that=this;
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let length = e.currentTarget.dataset.length||2;
    let state = type == "show" ? true:false;
    let showNum = type == "show" ? length : 2;
    that.data.formCommitList[index].showMoreState = state
    that.data.formCommitList[index].showNum = showNum
    that.setData({ formCommitList: that.data.formCommitList})
  },
  /* 组件事件集合 */
  tolinkUrl: function (data) {
    let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
    console.log("==linkUrl===", linkUrl)
    app.linkEvent(linkUrl)
  },
  getFormDetail: function (customFormId){
    let that=this;
    let formDetailData = app.AddClientUrl("/wx_get_custom_form.html", { customFormId: customFormId || "" }, 'get')
    console.log('==formDetailData===', formDetailData)
    wx.request({
      url: formDetailData.url,
      data: formDetailData.params,
      header: app.headerPost,
      method: 'get',
      success: function (res) {
        console.log(res)
        if(res.data.errcode==0){
          let data = res.data.relateObj;
          
          that.setData({ formData: data})
        }else{
          that.setData({ selectTab: [] })
        }
       }
    })
  },
  closeZhezhao: function () {
    let that = this;
    let selectTab = that.data.selectTab
    that.setData({ showCount: false })
    that.setData({ selectTabIndex: -1 })
    for (let i = 0; i < selectTab.length; i++) {
      selectTab[i].state = false;
    }
    that.setData({ selectTab: selectTab })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params:{},
  onLoad: function (options) {
    let that=this;
    that.initSetting();
    console.log('===options===', options)
    that.setData({ sendOptionData: options })
    that.getFormDetail(options.customFormId);
    // if (options.customFormId){
    //   console.log("提交按钮后返回的页面")
    //   that.setData({ showTop:false})
    //   this.listPage.page = 1
    //   this.listPage.customFormId = options.customFormId
    // } else {
    //   console.log("点击类型返回的页面")
    //   that.setData({ showTop: true })
    //   let groupName = options.groupName ? options.groupName : "";
    //   that.getFormType(groupName, that.getData);
    //   that.params = options;
    // }
  },
  initSetting() {
    this.setData({ setting: app.setting })
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
    that.data.Data = []
    let sendOptionData = that.data.sendOptionData
    console.log("========onPullDownRefresh============", that.data.selectResultsObj)
    that.selectComponent("#formCommitList").onPullDownRefresh();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },


  listPage: {
    page: 1,
    pageSize: 20,
    totalSize: 0,
    customFormId: "",
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    let that = this
    that.selectComponent("#formCommitList").onReachBottom();
    // if (that.listPage.totalSize > that.listPage.page * that.listPage.pageSize) {
    //   that.listPage.page++
    //   this.getData();
    // }
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function (res) {
    console.log(res)
    let that = this
    that.closeZhezhao();
    let customFormData = that.selectComponent("#formCommitList").data.customFormData;
    console.log('that.data.customFormData:', customFormData)
    let params = { customFormId: customFormData.id };
    let shareName =customFormData.name ;
    console.log('params:', params)
    let shareAppMessageData = app.shareForFx2('form_commit_list', shareName, params, '', 'customFormId')
    return shareAppMessageData
  },
})