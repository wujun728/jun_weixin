
const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    },
    showDetailBtn: {
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
    console.log("====processInstanceItem====", that.data.data, that.data.showDetailBtn)
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
    if (that.data.data.payedAmount==0){
      processNum = that.data.data.process.stages.length + 4
    }else{
      processNum = that.data.data.process.stages.length + 5
    }
    that.setData({ lineWidth: ((processNum - 2) * 140) + 2* 70 })
    let lineMarginLeft = (((processNum - 2) * 140) + 2 * 70) / 2;
    that.setData({ lineMarginLeft: lineMarginLeft})
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
    commentProcessOrder:function(e){
      console.log("=======commentProcessOrder======",e)
      let info = e.currentTarget.dataset.info
      let servantName = info.belongServantName
      let processInstanceId = info.id
      let servantIcon = info.belongServantIcon || ""
      let commentContent = info.commentContent || ""
      let pingfen = info.pingfen || ""
      let type = e.currentTarget.dataset.type || ""
      let linkUrl;
      if (!type){
        linkUrl = "servant_process_comment.html?servantName=" + servantName + "&processInstanceId=" + processInstanceId + "&servantIcon=" + servantIcon
      }else{
        linkUrl = "servant_process_comment.html?servantName=" + servantName + "&type=" + type + "&servantIcon=" + servantIcon + "&commentContent=" + commentContent + "&pingfen=" + pingfen
      }
      app.linkEvent(linkUrl)
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
    bindPickerChange:function(e){
      console.log("====bindPickerChange=====",e)
      let that=this;
      let index = e.detail.value;
      wx.showModal({
        title: '提示',
        content: '主人~您确定要取消该订单嘛?',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            let params={};
            params.processStageActionId = -1
            params.cancelRemark = that.data.tagsArr[index];
            params.processInstanceId = that.data.processItem.id;

            that.doAction(params)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    deleteProcessOrder: function (e) {
      console.log("====deleteProcessOrder=====", e)
      let that = this;
      let processStageActionId = e.currentTarget.dataset.actionid;
      wx.showModal({
        title: '提示',
        content: '主人~您确定要删除该订单嘛?',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            let params = {};
            params.processStageActionId = processStageActionId
            params.cancelRemark = '';
            params.processInstanceId = that.data.processItem.id;

            that.doAction(params)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
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
      console.log("====data===", data)
      let formId = data.currentTarget.dataset.id ? data.currentTarget.dataset.id : 0;
      let processInstanceId = data.currentTarget.dataset.processinstanceid ? data.currentTarget.dataset.processinstanceid : 0;
      let orderNo = data.currentTarget.dataset.orderno ? data.currentTarget.dataset.orderno : 0;
      let processSource = that.data.data.processSource
      let processLinkUrlList = data.currentTarget.dataset.processlinklist ? data.currentTarget.dataset.processlinklist : '';
      let itemList = []
      let text = processSource == 1 ? '查看订单详情' : '查看用户提交的表单'
      itemList.push(text)
      if (processLinkUrlList){
        processLinkUrlList = JSON.parse(processLinkUrlList)
        console.log("===processLinkUrlList===", processLinkUrlList)
        for (let i = 0; i < processLinkUrlList.length;i++){
          itemList.push(processLinkUrlList[i].title)
        }
      }
      wx.showActionSheet({
        itemList: itemList,
        success: function (res) {
          console.log(res.tapIndex)
          let curIndex = res.tapIndex
          if (curIndex==0) {
            if (processSource == 0) {
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
            } else {
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
          }else{
            let processLinkUrl = processLinkUrlList[curIndex-1].linkUrl;
            if (processLinkUrl.indexOf("?")!=-1){
              console.log("====有问号====",)
              processLinkUrl += "&processInstanceId=" + processInstanceId
            } else {
              console.log("====没问号====")
              processLinkUrl += "?processInstanceId=" + processInstanceId
            }
            console.log("processLinkUrl", processLinkUrl)
            that.tolinkUrl(processLinkUrl)
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },
    createPaymentCode: function (event){
      wx.showToast({
        title: '生成中...',
        icon: 'loading',
      })
      let that = this;
      that.setData({ paymentCodeState: false })
      let processInstanceId = event.currentTarget.dataset.id || 0;
      let getParams={};
      getParams.processInstanceId = processInstanceId;
      let customIndex = app.AddClientUrl("/pay_process_instance_with_wx_qr_code.html", getParams)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading();
          console.log('====createPaymentCode===', res)
          if (res.data.errcode == 0) {
            that.setData({ paymentCodeState: true, paymentCodeUrl: { imageUrl: res.data.relateObj, price: that.data.processItem.serviceAmount}})
          } else {
            wx.showToast({
              title: res.data.errMsg,
              icon: 'success',
              duration: 2000
            })
          }
        },
        complete: function (res) {
          wx.hideLoading()
        }
      })
    },
    doProcessAction: function (event) {
      console.log(event)
      let that = this;
      let params = {};
      let customFormId = event.currentTarget.dataset.formid || 0;
      if (event) {
        params.processStageActionId = event.currentTarget.dataset.actionid;
        params.processInstanceId = event.currentTarget.dataset.processinstanceid||0;
      }
      if (customFormId && customFormId != 0) {
        app.preCallbackObj = { 'processInstanceItem':{callback:function(obj){
          params.formCommitId = obj;
          console.log("==========process intance item  hello===="+obj);
          that.doAction(params)
        }}
        };
        let linkUrl = "form_detail.html?customFormId=" + customFormId + "&actionEvent=" + JSON.stringify(params);
        app.linkEvent(linkUrl);
      } else {
        params.formCommitId = 0;
        wx.showModal({
          title: '提示',
          content: '主人~您是否确认执行!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.doAction(params)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    doAction: function (params) {
      let that=this;
      let getParams = params;
      let customIndex = app.AddClientUrl("/wx_doProcess_instance_action.html", getParams)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log('====doAction-res===', res)
          if (res.data.errcode == 0) {
            that.setData({ processItem: res.data.relateObj})
            wx.showToast({
              title: res.data.errMsg,
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.errMsg,
              icon: 'success',
              duration: 2000
            })
          }
        },
        complete: function (res) {

        }
      })
    },
    confirmProcessOrder: function (event) {
      console.log(event)
      let that = this;
      let params = {};
      let processInstanceId;
      let confirmStatus;
      if (event && event.currentTarget) {
        processInstanceId = event.currentTarget.dataset.id
        confirmStatus = event.currentTarget.dataset.confirmstatus
      }
      params.processInstanceId = processInstanceId || 0;
      params.confirmStatus = confirmStatus || 1;
      let customIndex = app.AddClientUrl("/wx_confirm_process_instance_servant.html", params)
      wx.showModal({
        title: '提示',
        content: '主人~您是否确认执行!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: customIndex.url,
              header: app.header,
              success: function (res) {
                console.log('====confirmProcessOrder-res===', res)
                if (res.data.errcode == 0) {
                  wx.showToast({
                    title: "接单成功",
                    icon: 'success',
                    duration: 2000
                  })
                  that.setData({ processItem: res.data.relateObj })
                }
              },
              complete: function (res) {

              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  },
})