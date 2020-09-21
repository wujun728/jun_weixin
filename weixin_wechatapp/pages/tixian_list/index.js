const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data: [],
        moneyAmount: 0,
        properties: {},
    },
    userRecharge: function () {
        this.setData({
            reflesh: 1
        })
        wx.navigateTo({
            url: "/pages/req_tixian_section/index",
        })
    },
    /* 获取数据 */
    getData: function () {
        if (!app.checkIfLogin()) {
            return
        }

        var getParams = {}
        getParams.page = this.listPage.page
        var customIndex = app.AddClientUrl("/get_tixian_list.html", getParams)
        var that = this

        wx.request({
            url: customIndex.url,
            header: app.header,
            success: function (res) {
                console.log(res.data)

                that.listPage.pageSize = res.data.pageSize
                that.listPage.curPage = res.data.curPage
                that.listPage.totalSize = res.data.totalSize
                let dataArr = that.data.Data
                dataArr = dataArr.concat(res.data.result)

                if (!res.data.result || res.data.result.length == 0) {
                    that.setData({
                        Data: null
                    })
                } else {
                    //that.setData({ moneyAmount: dataArr[0].afterAmount })
                    that.setData({
                        Data: dataArr
                    })
                }

            },
            complete: function (res) {

            }
        })
    },
    getAmoutMoney() {
        if (!app.checkIfLogin()) {
            return
        }
        // wx.showLoading({
        //     title: 'loading',
        // })
        app.showToastLoading('loading', true)
        var customIndex = app.AddClientUrl("/get_fx_yongjin_list.html")
        var that = this
        wx.request({
            url: customIndex.url,
            header: app.header,
            success: function (res) {
                console.log(res.data)


                let dataArr = res.data.result

                if (!res.data.result || res.data.result.length == 0) {
                    //that.setData({ Data: null })
                } else {
                    that.setData({
                        moneyAmount: dataArr[0].afterAmount
                    })
                    //that.setData({ Data: dataArr })
                }

            },
            complete: function (res) {
                wx.hideLoading()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData();
        this.getAmoutMoney()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            setting: app.setting,
            properties: app.properties
        })
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
        this.data.Data = []

        this.listPage.page = 1
        this.getData();

        wx.stopPullDownRefresh()
    },


    listPage: {
        page: 1,
        pageSize: 0,
        totalSize: 0,
        curpage: 1
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this
        if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
            that.listPage.page++
            this.getData();
        }
    },

})
