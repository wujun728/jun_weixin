const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    },
    formListStyle: {
      type: Object,
      value: 'default value',
    },
    controlLimitState: {
      type: JSON,
      value: 'default value',
    },
  },
  data: {
    setting: null, // setting   
    formCommitItem:{},
    width:0,
    height:0,
    replyText:"",
    bannerList:{},
  },
  ready: function () {
    let that = this;
    console.log("====form-item-formCommitItem======", that.data.data);
    console.log("====form-item-formListStyle=====", that.data.formListStyle);
    console.log("====form-item-controlLimitState=====", that.data.controlLimitState);
    that.initData('init')
    this.setData({
      setting: app.setting,
    })
  },
  methods: {
    initData: function (data) {
      console.log("=========initData========", data)
      let that = this;
      let reqData;
      if (typeof (that.data.data) == 'object') {
        reqData = that.data.data
      } else {
        reqData = JSON.parse(that.data.data)
      }
      reqData.showFunState = false;
      reqData.showFunBan = false;
      let commitJson = reqData.commitJson
      let bannerList = that.data.bannerList
      let formListStyle = that.data.formListStyle
      for (let i in commitJson){
        if (commitJson[i].type == 11){
          bannerList[i]={
            jsonData:{ images: commitJson[i].value}
          }
        }
      }
      console.log("=====bannerList======", bannerList)
      if (formListStyle&&formListStyle.length!=0){
        for (let i = 0; i < formListStyle.length; i++) {
          if (formListStyle[i].data.detailViewMagic && formListStyle[i].data.detailViewMagic.length != 0) {
            let detailViewMagic = formListStyle[i].data.detailViewMagic
            for (let j = 0; j < detailViewMagic.length; j++) {
              for (let key in bannerList) {
                if (detailViewMagic[j].propertieName == key) {
                  bannerList[key].jsonData.height = Math.abs(detailViewMagic[j].startPointY - detailViewMagic[j].endPointY) / Math.abs(detailViewMagic[j].startPointX - detailViewMagic[j].endPointX)
                }
              }
            }
          }
        }
      }
      that.setData({ bannerList: bannerList , formCommitItem: reqData, })
      console.log("=====databannerList======", that.data.bannerList)

      if (that.data.formListStyle) {
        that.setData({ width: Number(that.data.formListStyle.width) || 0 })
        that.setData({ height: Number(that.data.formListStyle.height) || 0 })
      }
      // console.log("====form-item-width=====", that.data.width);
      // console.log("====form-item-height=====", that.data.height);
    },
    replyTextStateFun:function(e){
      console.log("=========replyTextStateFun=====")
      let that = this;
      let type = e.currentTarget ? e.currentTarget.dataset.type : e;
      let state = (type == "show" ? true : false);
      that.data.formCommitItem.showFunBan = state
      that.setData({ formCommitItem: that.data.formCommitItem })
    },
    bindTextAreaBlur:function(e){
      console.log("=====bindTextAreaBlur====", e);
      let that=this;
      let value = e.detail.value;
      that.setData({ replyText: value})
    },
    replyTextData:function(){
      console.log("=====replyTextData====");
      let that = this;
      let params = {
        reply: that.data.replyText,
        commitId: that.data.formCommitItem.id
      }
      var customIndex = app.AddClientUrl("/super_shop_manager_reply_custom_form_commit.html", params)
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("setStateFun", res.data)
          that.showMoreFun("hidden")
          that.replyTextStateFun('hidden')
          if (res.data.errcode == 0) {
            that.data.formCommitItem.reply = res.data.relateObj.reply
            that.setData({ formCommitItem: that.data.formCommitItem })
          } else {
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icons/tip.png',
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
    setStateFun:function(e){
      console.log("=====setStateFun====", e);
      let that=this;
      let commitStatus = e.currentTarget.dataset.commitstatus;
      let params={
        commitStatus: commitStatus,
        commitId: that.data.formCommitItem.id
      }
      var customIndex = app.AddClientUrl("/super_shop_manager_set_commit_form_flag.html", params)
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("setStateFun", res.data)
          if (res.data.errcode==0){
            that.showMoreFun("hidden")
            that.data.formCommitItem.recordStatus = res.data.relateObj.recordStatus
            that.setData({ formCommitItem: that.data.formCommitItem})
          }else{
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icons/tip.png',
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
    showMoreFun:function(e){
      console.log("=====showMoreFun====", e)
      let that = this;
      let type = e.currentTarget ? e.currentTarget.dataset.type:e;
      let state = (type == "show" ? true : false);
      that.data.formCommitItem.showFunState = state
      that.setData({ formCommitItem: that.data.formCommitItem })
    },
    showMore: function (e) {
      console.log("==showMore===", e)
      let that = this;
      let type = e.currentTarget.dataset.type;
      // let index = e.currentTarget.dataset.index;
      let length = e.currentTarget.dataset.length || 2;
      let state = (type == "show" ? true : false);
      let showNum = type == "show" ? length : 2;
      that.data.formCommitItem.showMoreState = state
      that.data.formCommitItem.showNum = showNum
      that.setData({ formCommitItem: that.data.formCommitItem })
    },
    calling: function (e) {
      console.log('====e===', e)
      let phoneNumber = e.currentTarget.dataset.phonenumber
      wx.makePhoneCall({
        phoneNumber: phoneNumber, //此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
    checkFormDetail: function (data) {
      let that = this;
      console.log("====data===", data)
      let formId = data.currentTarget.dataset.id ? data.currentTarget.dataset.id : 0;
      let belongFormType = data.currentTarget.dataset.belongformtype ? data.currentTarget.dataset.belongformtype : 0;
      if (belongFormType == 0) {
        console.log("普通表单")
        wx.showActionSheet({
          itemList: ['查看用户提交的表单'],
          success: function (res) {
            console.log(res.tapIndex)
            if (!formId) {
              wx.showModal({
                title: '提示',
                content: '主人~该表单没有内容哦!',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              let url = "check_form_detail.html?custom_form_commit_id=" + formId
              that.tolinkUrl(url)
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      } else {
        console.log("信息发布表单")
        if (!formId) {
          wx.showModal({
            title: '提示',
            content: '主人~该表单没有内容哦!',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          let url = "check_form_detail.html?custom_form_commit_id=" + formId
          that.tolinkUrl(url)
        }
      }
    },
    // 定位
    clickCatch: function (e) {
      console.log("===定位====", e)
      let itemData = e.currentTarget.dataset.item
      let latitude = itemData.latitude;
      let longitude = itemData.longitude;
      let name = itemData.value;
      let address = itemData.value
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,
        name: name,
        address: address
      })
    },
    //获取产品分类
    getOrganizesType: function (parentCategoryId, categoryId, callback) {
      var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: parentCategoryId })
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      var that = this
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("getOrganizesType", res.data)
          if (res.data.errcode == 0) {
            that.setData({ organizesType: res.data.relateObj })
          } else {
            that.setData({ organizesType: that.data.organizesType })
          }
          that.data.organizesType.unshift({ id: categoryId || parentCategoryId, name: "全部" })
          for (let i = 0; i < that.data.organizesType.length; i++) {
            that.data.organizesType[i].colorAtive = '#888';
          }
          that.data.organizesType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
          that.data.organizesType[0].active = true;
          that.setData({ organizesType: that.data.organizesType })
          wx.hideLoading()
        },
        fail: function (res) {
          console.log("fail")
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    toIndex() {
      app.toIndex()
    },
    tolinkUrl: function (data) {
      let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
      console.log("==linkUrl===", linkUrl)
      app.linkEvent(linkUrl)
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

      this.data.params.name = ""
      this.data.listPage.page = 1
      this.data.params.page = 1
      this.getData(this.data.params)

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      var that = this
      if (that.data.listPage.totalSize > that.data.listPage.curPage * that.data.listPage.pageSize) {
        that.data.listPage.page++
        that.data.params.page++
        that.getData(that.data.params);
      }
    },
  }
})