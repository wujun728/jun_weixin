
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    processDetail: {},
    stages:[],
  },
  /* 获取数据 */
  getProcessDetail: function () {
    console.log('==getProcessDetail==')
    let that = this
    let params = that.params;
    let customIndex = app.AddClientUrl("/wx_get_process_instance_detail.html", params)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('====getProcessDetail-res===', res)
        if (res.data.errcode == 0) {
          if (res.data.relateObj.process && res.data.relateObj.process.stages){
            let processDetail = res.data.relateObj;
            for (let i = 0; i < processDetail.process.stages.length;i++){
              if (i == res.data.relateObj.currentStageSequence){
                wx.setNavigationBarTitle({
                  title: processDetail.process.stages[i].name
                })
              }
            }
            that.setData({ processDetail: processDetail, stages: processDetail.process.stages })
          }
        }
      },
      complete: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params:{},
  onLoad: function (options) {
    console.log('===options===', options)
    this.params=options
    this.getProcessDetail();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    console.log(this.data.setting)
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
    this.getProcessDetail();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
  },

})