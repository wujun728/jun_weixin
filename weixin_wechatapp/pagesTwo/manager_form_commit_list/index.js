
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formCommitList: [],
    moneyAmount: 0,
    mendian: null,
    loading:true,
    publishState:false,
    customFormId:0,
    selectTab:[],
    selectTabIndex:-1,
    selectResultsObj:{},
    showCount:false,
    formType:[],
    showTop:false,
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
  checkFormDetail: function (data) {
    let that = this;
    console.log("====data===", data)
    let formId = data.currentTarget.dataset.id ? data.currentTarget.dataset.id : 0;
    let belongFormType = data.currentTarget.dataset.belongformtype ? data.currentTarget.dataset.belongformtype : 0;
    if (belongFormType != 2){
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
  toFormRewardList: function (event) {
    console.log('===event===', event)
    let id = event.currentTarget.dataset.id
    var a = "form_reward_list.html?bussinessRecordId=" + id;
    app.linkEvent(a);
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
  //获取表单分类
  getFormType: function (groupName, callback) {
    var customIndex = app.AddClientUrl("/wx_find_custom_forms.html", { groupName: groupName })
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
        console.log("getFormType", res.data)
        if (res.data.errcode == 0) {
          that.data.formType = res.data.relateObj.result
        }
        if (that.data.formType.length != 0) {
          for (let i = 0; i < that.data.formType.length; i++) {
            that.data.formType[i].colorAtive = '#888';
          }
          that.data.formType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
          that.data.formType[0].active = true;
          if (callback) {
            that.listPage.customFormId = that.data.formType[0].id
            that.getFormDetail();
            that.setData({ customFormId: that.data.formType[0].id })
            callback()
          }
        } else {
          that.setData({ formType: null })
        }

        that.setData({ formType: that.data.formType })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event)
    let onId;
    if (event && event.currentTarget) {
      onId = event.currentTarget.dataset.type.id
      console.log('====bindTypeItem currentTarget====', onId)
    } else if (event && !event.currentTarget) {
      onId = event
      console.log('====bindTypeItem event====', onId)
    }
    for (let i = 0; i < this.data.formType.length; i++) {
      if (this.data.formType[i].id == onId) {
        this.data.formType[i].active = true
        this.data.formType[i].colorAtive = this.data.setting.platformSetting.defaultColor;
      }
      else {
        this.data.formType[i].active = false
        this.data.formType[i].colorAtive = '#888';
      }
    }
    this.setData({
      formType: this.data.formType,
    })

    this.listPage.page = 1
    this.listPage.customFormId = onId
    this.setData({ customFormId: onId })
    this.getData()
    this.getFormDetail()
  },
  /* 获取数据 */
  getData: function (selectData) {
    if (!app.checkIfLogin()) {
      return
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })
    var getParams = this.listPage;
    if (selectData){
      let jsonData = JSON.stringify(selectData);
      getParams = Object.assign({}, getParams, { search: jsonData})
    }
    var customIndex = app.AddClientUrl("/wx_find_decorate_custom_form_commits.html", getParams)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == 0) {
          that.listPage.pageSize = res.data.relateObj.pageSize
          that.listPage.totalSize = res.data.relateObj.totalSize
          let dataArr = that.data.formCommitList
          if ((!res.data.relateObj.result || res.data.relateObj.result.length == 0) || that.listPage.page==1) {
            dataArr=[];
          } 
          dataArr = dataArr.concat(res.data.relateObj.result)
          for (let i = 0; i < dataArr.length; i++) {
            dataArr[i].showMoreState =false;
            dataArr[i].showNum = 2;
            dataArr[i].commitArr=[];
            if (dataArr[i].commitJson){
              let obj = JSON.parse(dataArr[i].commitJson)
              for (let key in obj){
                if (key == 'telno') {
                  dataArr[i].telno = obj[key].value||""
                }
                dataArr[i].commitArr.push(obj[key])
              }
            }
          }
          that.setData({ formCommitList: dataArr })
          wx.hideLoading();
          that.setData({ loading: false })
        }else{
          wx.showToast({
            title: '加载失败...',
            icon: 'none',
            duration: 2000,
          })
          wx.navigateBack(
            { delta: 1, }
          )
        }
        console.log('===formCommitList===', that.data.formCommitList);
      },
      complete: function (res) {

      }
    })
  },
  getFormDetail:function(){
    let that=this;
    let formDetailData = app.AddClientUrl("/wx_get_custom_form.html", { customFormId: that.listPage.customFormId || "" }, 'get')
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
          if (res.data.relateObj.formType==2){
            that.setData({ publishState:true})
          }
          if (data.items.length != 0) {
            let selectTab = [];
            let selectResultsObj = {};
            for (let i = 0; i < data.items.length; i++) {
              let listValues = [];
              let selectTabItem = {};
              if (data.items[i].type==2){
                selectResultsObj[data.items[i].name]=""
                selectTabItem.title = data.items[i].title;//选择标题
                selectTabItem.name = data.items[i].name;//选择键值
                selectTabItem.state = false;//选择状态
                if (data.items[i].listValues){//选择的值
                  if (data.items[i].listValues.indexOf(",") != -1) {
                    listValues = data.items[i].listValues.split(',')
                  } else {
                    listValues=[data.items[i].listValues]
                  }
                  selectTabItem.listValues = listValues;
                }
                console.log("===selectTabItem===", selectTabItem)
                selectTab.push(selectTabItem)
              }
            }
            console.log("==selectTab===", selectTab)
            console.log("==selectResultsObj===", selectResultsObj)
            that.setData({ selectTab: selectTab, selectResultsObj: selectResultsObj})
          }else{
            that.setData({ selectTab: [] })
          }
        }
      }
    })
  },
  selectTab:function(e){
    console.log("====selectTab====",e)
    let that=this;
    let selectTab = that.data.selectTab
    let index = e.currentTarget.dataset.index;
    if (that.data.selectTabIndex!=index){
      that.setData({ showCount: true })
      that.setData({ selectTabIndex: index })
      for (let i = 0; i < selectTab.length;i++){
        selectTab[i].state=false;
      }
      that.data.selectTab[index].state=true
      that.setData({ selectTab: selectTab })
    } else {
      that.closeZhezhao()
    }
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
  selectResult:function(e){
    let that=this;
    console.log("===selectResult===",e);
    let index = e.currentTarget.dataset.index;
    let selectTabIndex = that.data.selectTabIndex;
    let selectTab = that.data.selectTab
    let selectResultsObj = that.data.selectResultsObj
    if (index==-1){
      selectResultsObj[selectTab[selectTabIndex].name]=""
    }else{
      selectResultsObj[selectTab[selectTabIndex].name] = selectTab[selectTabIndex].listValues[index]
    }
    console.log("==selectResultsObj===", selectResultsObj)
    that.setData({ selectResultsObj: selectResultsObj})
    that.getData(selectResultsObj);
    that.closeZhezhao()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  params:{},
  onLoad: function (options) {
    let that=this;
    that.initSetting();
    console.log('===options===', options)
    if (options.customFormId){
      console.log("提交按钮后返回的页面")
      that.setData({ showTop:false})
      // that.setData({ customFormId: options.customFormId })
      this.listPage.page = 1
      this.listPage.customFormId = options.customFormId
      that.getData();
    } else {
      console.log("点击类型返回的页面")
      that.setData({ showTop: true })
      let groupName = options.groupName ? options.groupName : "";
      that.getFormType(groupName, that.getData);
      that.params = options;
    }
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
    this.data.Data = []

    this.listPage.page = 1
    this.getData();
    wx.stopPullDownRefresh()
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
    var that = this
    if (that.listPage.totalSize > that.listPage.page * that.listPage.pageSize) {
      that.listPage.page++
      this.getData();
    }
  },

})