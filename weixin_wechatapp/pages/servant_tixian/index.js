
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 10,
    butn_show_loading:false,
    mendian: null,
    properties: {},
  },
  
  getUserAmount: function (e) {
    this.setData({ tixianAmount: e.detail.value })
  },
  getUserTrueName: function (e) {
    this.setData({ reqUserTrueName: e.detail.value })
  },
  getUserTrueBankName: function (e) {
    this.setData({ reqBankName: e.detail.value })
  },
  getUserTruBankCardNo: function (e) {
    this.setData({ reqBankCardNo: e.detail.value })
  },
  getMendianInfo: function () {
    console.log('-------门店-1-------')
    let params = {}
    var customIndex = app.AddClientUrl("/super_shop_manager_get_manager_servant_info.html", params, 'post')
    var that = this
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          let mendian = res.data.relateObj
          if (mendian.account && mendian.account.account) {
            mendian = that.dellMoney(mendian)
          } else {

          }
          //account 账户余额
          that.setData({
            mendian: mendian,
            reqBankName: mendian.bankName || "",
            reqUserTrueName: mendian.trueName || "",
            reqBankCardNo: mendian.bankCarNo || "",
          })
        }
      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  dellMoney: function (mendian) {
    mendian.account.account = app.toFix(mendian.account.account)
    return mendian
  },
  subMitButn: function () {
    var that = this
    let tixianAmount = Number(this.data.tixianAmount||0)
    let reqUserTrueName = this.data.reqUserTrueName || ""
    let reqBankName = this.data.reqBankName || ""
    let reqBankCardNo = this.data.reqBankCardNo || ""
    if (tixianAmount < 1  || reqUserTrueName==''){
      console.log('--------1------')
      wx.showModal({
        title: '提示',
        content: '请确认金额与姓名符合要求',
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    let wxChatPayParam = {
      tixianAmount: '',
      reqUserTrueName: '',
      reqBankName: '',
      reqBankCardNo: '',
    }
    wxChatPayParam.tixianAmount = Number(tixianAmount)
    wxChatPayParam.reqUserTrueName = reqUserTrueName
    wxChatPayParam.reqBankName = reqBankName
    wxChatPayParam.reqBankCardNo = reqBankCardNo
    this.setData({ butn_show_loading:true })
    let customIndex = app.AddClientUrl("/super_shop_manager_req_servant_tixian.html", wxChatPayParam, 'post')
    wx.showModal({
      title: '提示',
      content: '确认提现？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.id) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000          
                })
                setTimeout(function () { wx.navigateBack() }, 2000)
              }else{
                wx.showToast({
                  title: res.data.errMsg||'未知异常',
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              };
              setTimeout(function () { wx.navigateBack() }, 2000)
            },
            fail: function () {
            },
            complete: function () {
              that.setData({ butn_show_loading: false })
            }
          })
        } else if (res.cancel) {
          that.setData({ butn_show_loading: false })
          console.log('用户点击取消')
        }
      }
    })

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMendianInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, loginUser: app.loginUser, properties: app.properties })
    if (app.properties.alias_yue){
      wx.setNavigationBarTitle({
        title: app.properties.alias_yue +'提现',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})