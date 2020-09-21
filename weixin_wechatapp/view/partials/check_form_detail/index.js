
var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    formCommitId:{
      type: String,
    },
    showBtn: {
      type: String,
    },
    showTitle: {
      type: String,
    }
  },
  data: {
    formData:null,
    upLoadImageList:{},
    commentValue:"",
    conmmentList:[],
    recommentId:0,
    markers:[],
    loading:true,
    recommentReturn:false,
    address:null,
    formDetailStyle:null,
    commitJson:null,
    pageData:{
      totalPage: 1,
      totalSize: 1,
      pageSize: 1,
      curPage: 1,
    },
    richTextList:{},
    animationData: {}, //抽屉
    showType: false,
    showTypeTwo: false,
    userInfoFormCommitId:'',
    posterState:false,
    measurePriceList:'',
    selectMeasureIndex: 0,
    selectMeasureData: '',
    buyCount: 0,
    totalPrice: 0,
    nextStepState:false,
    processLineData:{},
  },
  // 返回
  ready: function () {
    let that=this;
    console.log("======formCommitId=====", that.data.formCommitId)
    console.log("======showBtn=====", that.data.showBtn)
    that.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      color: app.setting.platformSetting.defaultColor,
      secondColor: app.setting.platformSetting.secondColor,
      width: app.globalData.sysWidth
    });
    that.getDetail(that.data.formCommitId)
  },
  methods: {
    sureDeleteFormItemFun:function(){
      let that=this;
      console.log("====sureDeleteFormItemFun====",)
      wx.showModal({
        title: '提示',
        content: '您确定要删除该表单嘛！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.deleteFormItemFun()
          } else if (res.cancel) {
            console.log('用户点击取消')
            
          }
        }
      })
    },
    deleteFormItemFun:function(){
      let that = this;
      let params = { formCommitId: that.data.formCommitId }
      let customIndex = app.AddClientUrl("/wx_delete_custom_form_commit.html", params)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.header,
        success: function (res) {
          console.log('====sssssss===', res)
          wx.showToast({
            title: '删除成功!',
            icon: 'success',    //如果要纯文本，不要icon，将值设为'none'
            duration: 1000
          })
          setTimeout(function () { wx.navigateBack() }, 1000);
        },
        fail: function (res) {//获取数据失败就会进入这个方法
          wx.hideLoading()
        }
      })
    },
    nextStepFun: function () {
      console.log("========nextStepFun=====")
      let that = this;
      let countState=false
      let measurePriceList = that.data.measurePriceList;
      for (let i = 0; i < measurePriceList.length; i++) {
        if (measurePriceList[i].buyCount!=0){
          countState=true;
        }
      }
      if (!countState){
        wx.showToast({
          title: '您购买的数量不能为0!',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })  
      }else{
        let nextStepState = that.data.nextStepState
        that.setData({ nextStepState: !nextStepState })
      }
    },
    subBuyCount:function(){
      console.log("========subBuyCount=====")
      let that=this;
      let totalPrice = 0
      let buyCount = that.data.buyCount;
      let selectMeasureData = that.data.selectMeasureData;
      let measurePriceList = that.data.measurePriceList;
      let selectMeasureIndex = that.data.selectMeasureIndex
      if (buyCount==0){
        wx.showToast({
          title: '数量不能小于0!',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })  
      }else{
        buyCount--
      }
      measurePriceList[selectMeasureIndex].buyCount = buyCount
      // let totalPrice = (buyCount * selectMeasureData.attendPrice)
      for (let i = 0; i < measurePriceList.length;i++){
        totalPrice +=(measurePriceList[i].buyCount * measurePriceList[i].attendPrice)
      }
      that.setData({ buyCount: buyCount, totalPrice: totalPrice, measurePriceList: measurePriceList})
    },
    addBuyCount:function(){
      console.log("========addBuyCount=====")
      let that = this;
      let totalPrice =0
      let selectMeasureData = that.data.selectMeasureData;
      let measurePriceList = that.data.measurePriceList;
      let selectMeasureIndex = that.data.selectMeasureIndex
      let buyCount = that.data.buyCount;
      if (!selectMeasureData.attendStock||(selectMeasureData.attendStock > buyCount)){
        buyCount++
      }else{
        wx.showToast({
          title: '库存不足~',
          image: '/images/icons/tip.png',  //image的优先级会高于icon
          duration: 2000
        })
      }
      measurePriceList[selectMeasureIndex].buyCount = buyCount
      // let totalPrice = (buyCount * selectMeasureData.attendPrice)
      for (let i = 0; i < measurePriceList.length; i++) {
        console.log("====measurePriceList=========", measurePriceList[i])
        console.log("===totalPrice-for====",totalPrice)
        totalPrice +=(measurePriceList[i].buyCount * Number(measurePriceList[i].attendPrice))
      }
      console.log("====totalPrice====", totalPrice)
      that.setData({ buyCount: buyCount, totalPrice: totalPrice, measurePriceList: measurePriceList })
    },
    selectMeasureItem:function(e){
      console.log("==selectMeasureItem==",e)
      let that=this;
      let totalPrice;
      let index = e.currentTarget.dataset.index;
      let measurePriceList = that.data.measurePriceList;
      if (that.data.allFormData.mulBuyObject==0){
        for (let i = 0; i < measurePriceList.length;i++){
          if (i == index){
            measurePriceList[i].buyCount=1
          }else{
            measurePriceList[i].buyCount = 0
          }
        }
      }
      let buyCount = measurePriceList[index].buyCount
      let selectMeasureData = measurePriceList[index];
      if (that.data.allFormData.mulBuyObject == 0){
        let totalPrice = (buyCount * selectMeasureData.attendPrice);
        that.setData({totalPrice: totalPrice})
      }
      that.setData({ selectMeasureData: selectMeasureData, selectMeasureIndex: index, buyCount: buyCount})
    },
    
    popupFormPage: function () {
      console.log("=======popupFormPage==========")
      if (this.data.allFormData.canAttendStatus==1){
        this.setData({ showAddressForm: true, sendOptionData: { customFormId: this.data.customForm.replyFormId }, showType: !this.data.showType  })
        let showType2 = this.data.showType
        let animation = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        console.log("=======popupFormPage==========", animation, this.data.showType)
        if (showType2) {
          animation.bottom('100rpx').step()
        } else {
          animation.bottom('-100rpx').step()
        }
        this.setData({
          animationData: animation.export()
        })
      } else if (this.data.allFormData.canAttendStatus == 0){
        wx.showModal({
          title: '提示',
          content: '不可报名参加',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              app.navigateBack(1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
              app.navigateBack(1000)
            }
          }
        })
      } else if (this.data.allFormData.canAttendStatus == 2) {
        wx.showModal({
          title: '提示',
          content: '报名名额已满',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              app.navigateBack(1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
              app.navigateBack(1000)
            }
          }
        })
      } else if (this.data.allFormData.canAttendStatus == 3) {
        wx.showModal({
          title: '提示',
          content: '已报名成功,无需再报名!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              app.navigateBack(1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
              app.navigateBack(1000)
            }
          }
        })
      } else if (this.data.allFormData.canAttendStatus == 4) {
        wx.showModal({
          title: '提示',
          content: '未开始报名',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              app.navigateBack(1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
              app.navigateBack(1000)
            }
          }
        })
      } else if (this.data.allFormData.canAttendStatus == 5) {
        wx.showModal({
          title: '提示',
          content: '已结束报名',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              app.navigateBack(1000)
            } else if (res.cancel) {
              console.log('用户点击取消')
              app.navigateBack(1000)
            }
          }
        })
      }
    },
    closeZhezhao: function () {
      let nextStepState=false;
      console.log("======closeZhezhao=========", this.data.measurePriceList)
      if (!this.data.measurePriceList){
        nextStepState = true
      }
      this.setData({ showType: false, showTypeTwo: false, showAddressForm: false, nextStepState: nextStepState })
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      animation.bottom('-100rpx').step()
      let setData = animation.export()
      this.setData({
        animationData: setData,
        animationDataTwo: setData
      })
    },
    submitData: function (e) {
      let that = this;
      let selectMeasureData = that.data.selectMeasureData;
      let measurePriceList = that.data.measurePriceList
      let resultData =''
      if (selectMeasureData){
        // resultData={ attendMeasureName: selectMeasureData.attendMeasureName, buyCount: that.data.buyCount }
        resultData = JSON.parse(JSON.stringify(measurePriceList))
        for (let i = 0; i < resultData.length;i++){
          if (resultData[i].buyCount==0){
            resultData.splice(i,1)
            i--
          }
        }
      }
      console.log("===getDataFun===", e, e.detail.formId)
      that.selectComponent("#submitForm").formSubmit(that.data.formCommitId, resultData);
    },
    getDataFun: function (e) {
      let that = this;
      console.log("===getDataFun===", e, e.detail.formId)
      if (e.detail.result) {
        // that.toPayApplyCost(e.detail.result)
        let link = 'edit_order.html?orderNo='+ e.detail.result.orderNo
        that.toOrderDetail(link)
      }else{
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        })
        that.getDetail(that.data.formCommitId)
        that.closeZhezhao()
      }
    },
    toPayApplyCost: function (result){
      var that = this
      let loginUser = app.loginUser
      console.log(loginUser)
      let wxChatPayParam = {
        openid: '',
        orderNo: '',
        app: 3
      }
      wxChatPayParam.openid = loginUser.platformUser.miniOpenId
      wxChatPayParam.orderNo = result.orderNo
      console.log(wxChatPayParam)
      let customIndex = app.AddClientUrl("/unifined_order.html", wxChatPayParam, 'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          let PayStr = res.data
          PayStr = '{' + PayStr + '}'
          let wechatPayStr = JSON.parse(PayStr)
          console.log(wechatPayStr)
          wx.requestPayment({
            'timeStamp': wechatPayStr.timeStamp,
            'nonceStr': wechatPayStr.nonceStr,
            'package': wechatPayStr.package,
            'signType': wechatPayStr.signType,
            'paySign': wechatPayStr.paySign,
            'success': function (res) {
              console.log('------成功--------')
              console.log(res)
              wx.showToast({
                title: '报名成功',
                icon: 'success',
                duration: 2000
              })
              that.getDetail(that.data.formCommitId)
              that.closeZhezhao()
            },
            'fail': function (res) {
              console.log('------fail--------')
              console.log(res)
              wx.showToast({
                title: '支付失败',
                image: '/images/icons/tip.png',
                duration: 2000
              })
              app.navigateBack(2000)
            },
            'complete': function () {
              console.log('------complete--------')
              console.log(res)
            }
          })
        }
      })
    },
    //物流单号 一键复制的事件
    copyText: function (e) {
      console.log("====copyText====",e)
      let value = e.currentTarget.dataset.value
      let that = this;
      wx.setClipboardData({
        data: value,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    toOrderDetail: function (event) {
      console.log(event)
      let linkUrl = event.currentTarget ? event.currentTarget.dataset.link : event
      if (!linkUrl){
        return
      }
      app.linkEvent(linkUrl);
    },
    saveImageToLocal: function (e) {
      let imgSrc = e.currentTarget.dataset.imageurl
      console.log(imgSrc)
      let PostImageSrc = imgSrc.replace(/http/, "https")
      // let PostImageSrc = imgSrc
      console.log(PostImageSrc)
      if (!imgSrc) {
        return
      }
      let urls = []
      urls.push(imgSrc)
      wx.previewImage({
        current: imgSrc, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    back:function(){
      wx.navigateBack()
    },
    // 定位
    // clickCatch: function (e) {
    //   let latitude = 26.074790;
    //   let longitude = 119.272080;
    //   let name = "福州至诚学院";
    //   let address = "福州至诚学院";
    //   wx.openLocation({
    //     latitude: latitude,
    //     longitude: longitude,
    //     scale: 12,
    //     name: name,
    //     address: address
    //   })
    // },
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
    tolinkUrl: function (e) {
      let that=this;
      that.data.recommentReturn=true;
      let linkUrl = e.currentTarget ? e.currentTarget.dataset.link : e
      app.linkEvent(linkUrl)
    },
    saveData:function(data){
      let that=this
      console.log("===saveData==",data)
      that.data.commentValue = data.detail.value;
    },
    sendComments: function (e) {
      console.log("===sendComments==", e)
      var that = this
      let value = e.detail && e.detail.value ? e.detail.value : that.data.commentValue
      if (!value){
        wx.showModal({
          title: '提示',
          content: '发布消息不能为空',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      }
      that.commentInput(value)
      that.setData({ commentValue: '' })
    },
    //添加评论
    commentInput: function (commentValue) {
      console.log("===sendComments==", commentValue)
      var that = this
      let data = {
        customFormInstanceId: that.data.allFormData.id,
        comment: commentValue || that.data.commentValue,
      }
      console.log('文本输入框: input_value :', data);
      let customIndex = app.AddClientUrl("/add_bbs_comments.html", data, 'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log('==res===', res)
          if (res.data.errcode==0){
            that.getCommentData(that.data.allFormData.id, 1)
            wx.showToast({
              title: "评论成功",
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: "评论失败",
              icon: "none",
              duration: 2000
            })
          }
        },

      })

    },
    //获取评论数据
    getCommentData: function (customFormInstanceId, page) {
      let that = this;
      let data = {
        customFormInstanceId: customFormInstanceId,
        page: page
      }
      let customIndex = app.AddClientUrl("/get_news_bbs_comments.html", data)
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.header,
        success: function (res) {
          console.log('====sssssss===', res)
          if (page == 1) {
            that.setData({ conmmentList: res.data.relateObj.result })
          } else {
            console.log("====more page====");
            that.setData({ conmmentList: that.data.conmmentList.concat(res.data.relateObj.result) })
          }
          that.data.pageData.totalSize = res.data.relateObj.totalSize;
          that.data.pageData.curPage = page;
          that.data.pageData.pageSize = res.data.relateObj.pageSize;
        },
        fail: function (res) {//获取数据失败就会进入这个方法
          wx.hideLoading()
        }
      })
    },
    payToCheckForm:function(e){
      console.log("========payToCheckForm=========",e)
      let that = this
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      let formCommitId = e.currentTarget.dataset.commitid
      let wxChatPayParam = {
        formCommitId: formCommitId,
        payType: 3
      }
      console.log(wxChatPayParam)
      let customIndex = app.AddClientUrl("/create_form_commit_limit_order.html", wxChatPayParam, 'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          let data = res.data.relateObj
          //这里拿到订单数据
          //下面应该吊起支付
          let orderNo = data.orderNo
          if (!data || !data.payType) {
            console.log('--------失败-------')
          }
          if (data.payType == 3) {
            that.payByWechat(orderNo)
          }
        },
        fail: function () {

        },
        complete: function () {
        }

      })
    },
    payByWechat: function (orderNo) {
      var that = this
      let loginUser = app.loginUser
      console.log(loginUser)
      let wxChatPayParam = {
        openid: '',
        orderNo: '',
        app: 3
      }
      wxChatPayParam.openid = loginUser.platformUser.miniOpenId
      wxChatPayParam.orderNo = orderNo
      console.log(wxChatPayParam)
      let customIndex = app.AddClientUrl("/unifined_order.html", wxChatPayParam, 'post')
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header: app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          let PayStr = res.data
          PayStr = '{' + PayStr + '}'
          let wechatPayStr = JSON.parse(PayStr)
          console.log(wechatPayStr)
          wx.requestPayment({
            'timeStamp': wechatPayStr.timeStamp,
            'nonceStr': wechatPayStr.nonceStr,
            'package': wechatPayStr.package,
            'signType': wechatPayStr.signType,
            'paySign': wechatPayStr.paySign,
            'success': function (res) {
              wx.hideLoading()
              console.log('------成功--------')
              console.log(res)
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              that.getDetail(that.data.formCommitId)
            },
            'fail': function (res) {
              console.log('------fail--------')
              console.log(res)
              wx.showToast({
                title: '支付失败',
                image: '/images/icons/tip.png',
                duration: 2000
              })
            },
            'complete': function () {
              console.log('------complete--------')
              console.log(res)
              // app.navigateBack(2000)
            }
          })
        }
      })
    },
    // 定位
    clickCatch: function (e) {
      console.log("===定位====",e)
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
    getDetail: function (formCommitId){
      let that=this;
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
      })
      let formDetailData = app.AddClientUrl("/wx_get_custom_form_commit.html", { formCommitId: formCommitId }, 'get')
      wx.request({
        url: formDetailData.url,
        data: formDetailData.params,
        header: app.headerPost,
        method: 'get',
        success: function (res) {
          console.log("====success====",res)
          if (res.data.errcode == 0) {
            let data = res.data.relateObj
            wx.hideLoading()
            let measurePriceList='';
            if (data.measurePriceList && data.measurePriceList!='[]'){
              measurePriceList = JSON.parse(data.measurePriceList)
              for (let i = 0; i < measurePriceList.length;i++){
                measurePriceList[i].buyCount=0
              }
              let buyCount = that.data.buyCount;
              let selectMeasureData = measurePriceList[that.data.selectMeasureIndex]
              if (data.mulBuyObject == 0) {
                selectMeasureData.buyCount = 1
                buyCount=1
              }
              let totalPrice = (buyCount * selectMeasureData.attendPrice);
              that.setData({ selectMeasureData: selectMeasureData, totalPrice: totalPrice})
            }else{
              that.setData({ nextStepState:true})
            }
            console.log("=====measurePriceList====", measurePriceList)
            that.setData({ allFormData: data, loading: false, measurePriceList: measurePriceList})
            let customForm = that.data.allFormData.customForm;
            that.getCommentData(that.data.allFormData.id, 1)
            let commitJson = JSON.parse(that.data.allFormData.commitJson);
            console.log("====commitJson=====", commitJson)
            customForm.commitArr = [];
            let banner = {};
            if (data.customForm && data.customForm.decorateDetailStyle){
              let formDetailStyle = JSON.parse(data.customForm.decorateDetailStyle);
              console.log("formDetailStyle", formDetailStyle)
              let resultPointerData = formDetailStyle.resultPointerData
              if (formDetailStyle.length!=0){
                let formDetailStyleArray=formDetailStyle
                for (let i = 0; i < formDetailStyleArray.length;i++){
                  console.log("=======name======", formDetailStyleArray[i].data.propertieName,)
                  if (formDetailStyleArray[i].type == 1) {
                    let detailViewMagic = formDetailStyleArray[i].data.detailViewMagic;
                    console.log("===detailViewMagic===", detailViewMagic)
                    for (let j = 0; j < detailViewMagic.length;j++){
                      if (commitJson[detailViewMagic[j].propertieName]&&commitJson[detailViewMagic[j].propertieName].type == 11 && !banner['banner_' + detailViewMagic[j].propertieName]) {
                        banner['banner_' + detailViewMagic[j].propertieName] = { androidTemplate: '', jsonData: { height: Math.abs((Number(detailViewMagic[j].endPointY) - Number(detailViewMagic[j].startPointY) + 1) * 750 / 12), images: commitJson[detailViewMagic[j].propertieName].value } }
                        that.setData({
                          banner: banner
                        })
                      }
                    }
                  }
                }
              }
              that.setData({ formDetailStyle: formDetailStyle })
            }
            console.log("===formDetailStyle====", that.data.formDetailStyle, banner)
            for (let key in commitJson) {
              commitJson[key].name = key
              if (commitJson[key].type == 14) {
                customForm.telno = commitJson[key].value
              } 
              console.log("====1commitJson======", commitJson)
              customForm.commitArr.push(commitJson[key])
            }
            console.log("===commitJson==", commitJson)
            that.setData({ commitJson: commitJson })
            let richTextList = that.data.richTextList
            if (customForm.items.length > 0) {
              let upLoadImageList = {};
              for (let i = 0; i < customForm.items.length; i++) {
                let name = customForm.items[i].name
                console.log("===img_======", customForm.items[i].type, customForm.items[i].type == 7 || customForm.items[i].type == 11)
                if (customForm.items[i].type == 7 || customForm.items[i].type == 11) {
                  upLoadImageList['img_' + customForm.items[i].name] = [];
                  if (typeof (commitJson[name]) == "object") {
                    console.log("imgobject", commitJson[name].value)
                    if (typeof (commitJson[name].value) == "object") {
                      upLoadImageList['img_' + customForm.items[i].name] = commitJson[name].value
                    } else {
                      if (commitJson[name].value) {
                        upLoadImageList['img_' + customForm.items[i].name].push(commitJson[name].value)
                      }
                    }
                  } else {
                    console.log("imgstring", commitJson[name])
                    if (commitJson[name]) {
                      upLoadImageList['img_' + customForm.items[i].name].push(commitJson[name])
                    }
                  }
                  console.log("===upLoadImageList====", upLoadImageList)
                } else if (customForm.items[i].type == 9) {
                  if (typeof (commitJson[name]) == "object") {
                    WxParse.wxParse(name, 'html', commitJson[name].value, that, 10);
                    richTextList[name]=that.data[name]
                    console.log("=====9======", richTextList)
                    customForm.items[i].defaultValue = commitJson[name].value
                  } else {
                    customForm.items[i].defaultValue = commitJson[name]
                    WxParse.wxParse(name, 'html', commitJson[name].value, that, 10);
                    richTextList[name] = that.data[name]
                    console.log("=====9======", richTextList)
                  }
                } else if (customForm.items[i].type == 12) {
                  if (typeof (commitJson[name]) == "object") {
                    customForm.items[i].defaultValue = commitJson[name].value.value
                  }
                } else if (customForm.items[i].type == 9999) {
                  // if (customForm.items[i].splitStyle){
                  //   customForm.items[i].splitStyle = JSON.parse(customForm.items[i].splitStyle);
                  // }
                } else if (customForm.items[i].type == 15 && commitJson[name]) {
                  if (commitJson[name].value && JSON.stringify(commitJson[name].value)!="[]") {
                    console.log("进程有值", commitJson[name].value, customForm.items[i].defaultValue)
                    try {
                      commitJson[name].value = JSON.parse(commitJson[name].value)
                      customForm.items[i].defaultValue = JSON.parse(customForm.items[i].defaultValue)
                    } catch (e) {
                      commitJson[name].value = commitJson[name].value
                      customForm.items[i].defaultValue = customForm.items[i].defaultValue
                      console.log(e);
                    }
                  } else {
                    console.log("进程没值")
                  }
                }else {
                  if (typeof (commitJson[name]) == "object") {
                    customForm.items[i].defaultValue = commitJson[name].value
                  } else {
                    customForm.items[i].defaultValue = commitJson[name]
                  }
                }
              }
              that.setData({ upLoadImageList: upLoadImageList, customForm: customForm, richTextList: richTextList })
              console.log("===customForm====", that.data.customForm)
              console.log("===upLoadImageList====", that.data.upLoadImageList)
            }
            if(that.data.showTitle!='false'){
              wx.setNavigationBarTitle({
                title: that.data.customForm.formName
              })
            }
          }else{
            wx.showToast({
              title: '加载失败...',
              icon: 'none',
              duration: 2000,
            })
            setTimeout(function () {
              wx.navigateBack(
                { delta: 1, }
              )}, 2000);
            
          }
          return res.data.relateObj;
        }
      })
  },
  onShow: function () {
    let that = this;
    if (that.data.recommentReturn) {
      that.getCommentData(that.data.allFormData.id, 1)
    }
  },
  onReachBottom: function () {
    let that = this;
    console.log('dddddddddddddd', that.data.pageData.totalSize)
    if (that.data.pageData.totalSize) {
      if (that.data.pageData.totalSize > that.data.pageData.curPage * that.data.pageData.pageSize) {
        that.getCommentData(that.data.allFormData.id, ++that.data.pageData.curPage);
      } else {
        console.log("没有更多数据了");
      }
    } else {

    }
  },
  onPullDownRefresh: function () {
    let that = this;
    that.getCommentData(that.data.allFormData.id, 1);
    that.getDetail(that.data.formCommitId)
  },
  }
})