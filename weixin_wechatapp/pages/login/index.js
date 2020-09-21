const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        /* seeting */
        setting: null,
        userData: null,
        userSign: null,

        loginUser: null
    },
    userInfo: {
        username: "",
        passworld: ""
    },
    formSubmit: function (e) {
        //console.log(e.detail.value)
        var info = e.detail.value;
        if (!info.username || !info.password) {
            wx.showToast({
                title: '输入为空',
                icon: 'loading',
                duration: 1000
            })
        } else {

            this.loginIn(info)
        }
    },

    loginIn: function (data) {
        console.log(data)
        data.scene = app.more_scene
        var that = this;
        // wx.showLoading({
        //     title: 'loading',
        //     mask: true
        // })
        app.showToastLoading('loading', true)
        var loginUrl = app.AddClientUrl("Client.User.Login", data, 'post')
        wx.request({
            url: loginUrl.url,
            data: loginUrl.params,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

                console.log(res)
                console.log(res.data.relateObj.platformUser.mendian)
                
                var header = res.header
                var cookie = null
                if (!!header['Set-Cookie']) {
                    cookie = header['Set-Cookie']
                }
                if (!!header['set-cookie']) {
                    cookie = header['set-cookie']
                }

                console.log(cookie)


                wx.hideLoading()
                //console.log(res.data)
                if (res.data.errcode == 0) {
                    app.userSign = data
                    wx.setStorage({
                        key: "userSign",
                        data: data
                    })

                    wx.setStorage({
                        key: "cookie",
                        data: cookie
                    })
                    app.header = {
                        'content-type': 'application/json', // 默认值
                        'Cookie': cookie
                    }
                    // wx.setStorageSync('cookie', cookie)
                    app.cookie = cookie
                    app.loginUser = res.data.relateObj
                    that.setData({
                        loginUser: res.data.relateObj
                    })
                    wx.setStorage({
                        key: "loginUser",
                        data: res.data.relateObj
                    })

                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000,
                        success: function () {
                            wx.getStorageInfo({
                                success: function (res) {
                                    console.log("本地缓存.............")
                                    console.log(res.keys)
                                    for (let i = 0; i < res.keys.length; i++) {
                                        wx.getStorage({
                                            key: res.keys[i],
                                            success: function (res) {
                                                console.log(res.data)
                                            }
                                        })
                                    }

                                }
                            })
                            app.toIndex()

                        }
                    })


                } else { //
                    wx.showToast({
                        title: res.data.errMsg,
                        icon: '/images/icons/tip.png',
                        duration: 1500
                    })
                }



            },
            fail: function (res) {
                console.log("fail")
                wx.hideLoading()
                app.loadFail()
            }
        })
    },

    toSignUpPage: function () {
        wx.navigateTo({
            url: '../regist/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // this.wxLogin()
        return
        var userSign = app.userSign
        this.setData({
            userSign: userSign
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            setting: app.setting
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
    wxLogin: function () {
        console.log('--------------微信登录--------------')
        // wx.showLoading({
        //     title: '微信自动登录中',
        //     mask: true
        // })
        app.showToastLoading('微信自动登录中', true)
        var that = this


        wx.login({
            success: function (res) {

                if (res.code) {
                    //发起网络请求
                    let loginParam = {}
                    loginParam.code = res.code
                    loginParam.scene = app.more_scene
                    let customIndex = app.AddClientUrl("/wx_mini_code_login.html", loginParam, 'post')
                    wx.request({
                        url: customIndex.url,
                        data: customIndex.params,
                        header: app.headerPost,
                        method: 'POST',
                        success: function (e) {
                            console.log('----22222   success------')

                            console.log(e)
                            if (e.data.errcode == 0) {

                                let header = e.header
                                let cookie = null
                                if (!!header['Set-Cookie']) {
                                    cookie = header['Set-Cookie']
                                }
                                if (!!header['set-cookie']) {
                                    cookie = header['set-cookie']
                                }
                                let loginJson = e.data.relateObj

                                app.setCookie(cookie)
                                app.setloginUser(e.data.relateObj, cookie)
                                console.log('登陆成功')
                                app.loginUser = e.data.relateObj
                                app.globalData.sansanUser = e.data.relateObj

                                wx.hideLoading()

                                app.get_session_userinfo()

                                if (!loginJson.nickName || loginJson.nickName == loginJson.name) {
                                    app.sentWxUserInfo()
                                }
                                app.toIndex()
                            } else {
                                wx.hideLoading()

                                wx.showModal({
                                    title: '微信登录失败',
                                    content: '使用账号密码登录',
                                    success: function (res) {
                                        if (res.confirm) {

                                        } else if (res.cancel) {
                                            //that.wxLogin()
                                        }
                                    }
                                })
                            }
                        },
                        fail: function (e) {
                            console.log('----fail------')
                            console.log(e)
                            wx.showModal({
                                title: '提示',
                                content: '微信登录失败，账号密码登录',
                                success: function (res) {
                                    if (res.confirm) {

                                    } else if (res.cancel) {
                                        that.wxLogin()
                                    }
                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            },
            fail: function (res) {
                console.log('---------111111  fail----------')
                console.log(res)
            },
            complete: function (res) {
                console.log('---------111111  complete----------')
                console.log(res)
                wx.hideLoading()
            },
        });
    },
})
