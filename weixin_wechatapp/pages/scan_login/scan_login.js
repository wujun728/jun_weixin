// pages/scan_login/scan_login.js
let scan_result = ''

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        scan_result = options.scan_result
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 处理确认/取消操作
    handleLoginAction(e) {
        let { type } = e.currentTarget.dataset
        /*
        var customIndex = app.AddClientUrl("/delete_shopping_car_list_item.html", params, 'post')
        wx.request({
          url: customIndex.url,
          data: customIndex.params,
          header: app.headerPost,
          method: 'POST',
          */
        if (type == 'confirm') {
            try {
                let username = wx.getStorageSync('loginUser').name
                console.log(username)
                wx.request({
                  url: 'http://106.14.213.48:8080/chainalliance/tunzai/wx_mini_scan_login.html',
                    data: {
                        username: username,
                        uuid: scan_result
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                        // 返回-我是服务商
                        wx.navigateBack({
                            delta: 1
                        })
                    },
                    fail: function (res) {

                    }
                })
            } catch (e) {

            }
        } else if (type == 'cancel') {
            // 返回-我是服务商
            wx.navigateBack({
                delta: 1
            })
        }
    }

})
