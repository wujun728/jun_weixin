const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        setting: null,
        sentTagId: '',

        tags: [],
        chooseTag: 0,
    },

    radioChange: function (e) {
        let index = e.currentTarget.dataset.index
        this.setData({ chooseTag: index })
    },
    chooseTag: function (e) {
        console.log(e.detail.value)
        this.setData({
            sentTagId: e.detail.value
        })

    },


    // 上传
    sureBackItem: function (e) {
        let formResult = e.detail.value

        let tag = this.data.sentTagId
        if (!formResult.content) {
            wx.showToast({
                title: "您的意见为空",
                image: '/images/icons/tip.png',
                duration: 2000
            })
            return
        }

        if (formResult.telno) {
            let phoneTest = new RegExp('^1[3|4|5|7|8][0-9]{9}$', 'g');
            if (!phoneTest.test(formResult.telno)) {
                wx.showToast({
                    title: "号码格式错误",
                    image: '/images/icons/tip.png',
                    duration: 2000
                })
                return;
            }
        }
        console.log(formResult)


        var that = this
        wx.showModal({
            title: '提示',
            content: '确认提交？',
            success: function (res) {
                if (res.confirm) {
                    var customIndex = app.AddClientUrl("/user_guest_book.html", formResult, 'post')
                    wx.request({
                        url: customIndex.url,
                        data: customIndex.params,
                        header: app.headerPost,
                        method: 'POST',
                        success: function (res) {
                            console.log(res.data)
                            if (res.data.errcode == '0') {
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                setTimeout(function () {
                                    wx.navigateBack()
                                }, 2000)
                            } else {
                                wx.showToast({
                                    title: res.data.errMsg,
                                    image: '/images/icons/tip.png',
                                    duration: 2000
                                })
                            }
                        },
                        fail: function (res) {

                        }
                    })
                } else if (res.cancel) {

                }
            }
        })

    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let setting = app.setting
        let tags = setting.platformSetting.tagsMap['意见反馈']

        console.log(tags)
        this.setData({
            setting: app.setting,
            tags: tags,
            sentTagId: tags[0].id
        })

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
