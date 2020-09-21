const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    processItem:{},
    paymentCodeUrl:"",
    paymentCodeState:false,
    lineWidth: 700,
    lineMarginLeft: 50,
    sentTagId:null,
    tagsArr:[],
    telno:"",
    showTelnoIcon:false,
  },

  ready: function () {
    let that = this;
    console.log("====processInstanceItem====", that.data.data)
    if (that.data.data.productCustomFormCommit&&that.data.data.productCustomFormCommit.commitJson){
      let formCommitData = JSON.parse(that.data.data.productCustomFormCommit.commitJson);
      console.log("====formCommitData====", formCommitData)
      for (let i in formCommitData){
        console.log("formCommitItem", formCommitData[i],i)
        if (formCommitData[i].type==14){
          that.setData({ telno: formCommitData[i].value })
        }
      }
      // if (formCommitData.phone){
      //   that.setData({ telno: formCommitData.phone.value})
      // }
    }
    if (app.loginUser.platformUser.managerServantId == that.data.data.belongServantId && that.data.data.belongServantId != 0 ){
      that.setData({ showTelnoIcon: true })
    }else{
      that.setData({ showTelnoIcon: false })
    }
    
    console.log("===telno====", that.data.telno)
    let processNum = 0
    let setting = app.setting
    let tags = setting.platformSetting.tagsMap['意见反馈']
    let tagsArr=[];
    if (tags&&tags.length!=0){
      for (let i = 0; i < tags.length; i++) {
        tagsArr.push(tags[i].tagName)
      }
    }
    console.log(tagsArr)
    that.setData({ 
      processItem: that.data.data, 
      setting: setting, 
      loginUser: app.loginUser,
      tagsArr: tagsArr,
      })
  },
  methods: {
    clickGrabOrder: function (e) {
      console.log('==clickGrabOrder==', e)
      let that=this;
      let processInstanceId = e.currentTarget.dataset.id
      wx.showModal({
        title: '提示',
        content: '主人~您确定要抢该订单嘛？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.grabOrder(processInstanceId)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    grabOrder: function (processInstanceId){
      let that = this
      let params = {};
      params.processInstanceId = processInstanceId
      let customIndex = app.AddClientUrl("/wx_snatch_process_instance.html", params)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log('====grabOrder-res===', res)
          if (res.data.errcode == 0) {
            let pages = getCurrentPages();//当前页面
            let prevPage = pages[pages.length - 2];//上一页面
            prevPage.setData({//直接给上移页面赋值
              currentIndex: 1,
            });
            wx.navigateBack(
              { delta: 1, }
            )
          }
        },
        complete: function (res) {

        }
      })
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
    /* 组件事件集合 */
    tolinkUrl: function (data) {
      let linkUrl = data.currentTarget ? data.currentTarget.dataset.link : data;
      console.log("==linkUrl===", linkUrl)
      app.linkEvent(linkUrl)
    },
    check_form_detail: function (data){
      let that=this;
      console.log("====data===", data, that.data.data)
      let formId = data.currentTarget.dataset.id ? data.currentTarget.dataset.id : 0;
      let orderNo = data.currentTarget.dataset.orderno ? data.currentTarget.dataset.orderno : 0;
      let processSource = that.data.data.processSource
      let text = (processSource == 1 ? '查看订单详情' : '查看用户提交的表单')
      wx.showActionSheet({
        itemList: [text],
        success: function (res) {
          console.log(res.tapIndex)
          if (processSource==0){
            if (!formId) {
              wx.showModal({
                title: '提示',
                content: '主人~该流程没有内容哦!',
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
          }else{
            if (!orderNo) {
              wx.showModal({
                title: '提示',
                content: '主人~该流程没有生成订单哦!',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              let url = "order_detail.html?orderNo=" + orderNo
              that.tolinkUrl(url)
            }
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },
  },
})