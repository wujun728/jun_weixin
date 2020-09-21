// pages/richText/index.js

var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  opt: null,
  onLoad: function (options) {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log("========res=========", res)
        console.log("========res.result=========", "{" + res.result + "}")
        let json = "{" + res.result + "}";
        json = json.replace(/&/g, ',')
        json = json.replace(/=/g, ':')
        console.log(json)
        console.log(JSON.stringify(json))


        let json1 = res.result.replace(/=/g, ':')
        var surls = json1.split('&')
        console.log("=======surls=======", surls)
        // 循环几个参数
        let params = {};
        for (let i = 0; i < surls.length; i++) {
          let arr = surls[i].split(':')
          console.log(arr);
          // 判断各种参数并赋值给params

          if (arr[0] == "addShopId") {
            params.addShopId = arr[1]
          }


          // 第一个预览页面
          if (arr[0] == "ENTER_PLATFORM_NO") {
            params.ENTER_PLATFORM_NO = arr[1]
          }
          // 第二个更改用户推广人
          if (arr[0] == "scene") {
            params.scene = arr[1]
          }
          // 第三个传入值携带桌子二维码的跳到订餐页面
          if (arr[0] == "ENTER_ORDER_MEAL_TABLEID") {
            params.ENTER_ORDER_MEAL_TABLEID = arr[1]
          }
          if (arr[0] == "ADDSHOPID") {
            params.ADDSHOPID = arr[1]
          }
          // 第四个进服务商页面
          if (arr[0] == "APPLY_SERVER_CHANNEL_CODE") {
            params.APPLY_SERVER_CHANNEL_CODE = arr[1]
          }
          // 第五个SHARE_PRODUCT_DETAIL_PAGE跳到产品详情页
          if (arr[0] == "SHARE_PRODUCT_DETAIL_PAGE") {
            params.SHARE_PRODUCT_DETAIL_PAGE = arr[1]
          }
          // 第六个SHARE_PROMOTION_PRODUCTS_PAGE进入特卖页面
          if (arr[0] == "SHARE_PROMOTION_PRODUCTS_PAGE") {
            params.SHARE_PROMOTION_PRODUCTS_PAGE = arr[1]
          }
          //第七个如果传入的是  ENTER_MENDIAN   ENTER_SHOP
          if (arr[0] == "ENTER_MENDIAN") {
            params.ENTER_MENDIAN = arr[1]
          }
          if (arr[0] == "ENTER_SHOP") {
            params.ENTER_SHOP = arr[1]
          }
          //第八个门店付款 ENTER_MENDIAN_OFF_PAY
          if (arr[0] == "ENTER_MENDIAN_OFF_PAY") {
            params.ENTER_MENDIAN_OFF_PAY = arr[1]
          }





        }

        console.log("=======params==========", params)
        wx.navigateTo({
          url: '/pageTab/index/index?params=' + JSON.stringify(params),
        })


      }
    })
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