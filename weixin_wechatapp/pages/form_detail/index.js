
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:null,
    sexArray:['男','女'],
    selectPicker:{},
    upLoadImageList:{},
    dataAndTime:{},
    processType: false,
    refProductFormType: false,
    productId:0,
    skuData:{},
    gainActionEvent: {},
    region: {},
    formId:0,
    reqLocation:false,
    locationList:{},
    locationIndex:"",
    sendOptionData:null,
    sendPageDataState:false,
    sendFormData:null,
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  showPoster: function () {
    let that = this;
    console.log('===showPoster====', that.params.customFormId)
    let ewmImgUrl = app.getQrCode({ type: "form_detail", id: that.params.customFormId })
    that.setData({
      posterState: true,
      ewmImgUrl: ewmImgUrl,
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e, this.data.formData)
    let index = e.target.dataset.index
    this.data.dataAndTime[this.data.formData.items[index].name] = e.detail.value
    this.data.formData.items[index].defaultValue = e.detail.value
    this.setData({
      dataAndTime: this.data.dataAndTime
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e, this.data.formData)
    let index = e.target.dataset.index
    this.data.dataAndTime[this.data.formData.items[index].name] = e.detail.value
    this.data.formData.items[index].defaultValue = e.detail.value
    this.setData({
      dataAndTime: this.data.dataAndTime
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.target.dataset.index
    let that=this;
    let region = that.data.region;
    region['address_' + index] = e.detail.value
    this.setData({
      region: region
    })
  },

  tolinkUrl: function (e) {
    if (!app.loginUser) {
      wx.showModal({
        title: '提示',
        content: '主人~您还在登陆哦!稍等片刻',
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
    let that = this;
    let linkUrl = e.currentTarget.dataset.link
    let index = e.currentTarget.dataset.index
    if (linkUrl.indexOf("select_location.html") != -1) {
      console.log("选择位置")
      that.setData({ reqLocation: true, locationIndex: "position_" + index})
    } else {
      that.setData({ reqLocation: false })
    }
    app.linkEvent(linkUrl)
  },
  selectPsotion: function (e) {
    let that = this;
    console.log("===selectPsotion===",e)
    let locationIndex = e.detail.locationIndex
    that.setData({ reqLocation: true, locationIndex: locationIndex })
  },
  // 返回首页
  toFormCommitList: function (){
    var a = "form_commit_list.html?customFormId=" + this.params.customFormId;
    app.linkEvent(a);
  },
  toProcessList: function (formCommitId) {
    let that=this;
   /* let gainActionEvent = JSON.parse(that.data.gainActionEvent)
    gainActionEvent.formCommitId = formCommitId;
    var a = "process_list.html?processId=0&actionEvent=" + JSON.stringify(gainActionEvent);
    app.linkEvent(a);*/
    setTimeout(function () { wx.navigateBack() }, 200);
    if (app.preCallbackObj['processInstanceItem'] && app.preCallbackObj['processInstanceItem'].callback){
      app.preCallbackObj['processInstanceItem'].callback(formCommitId);
    }
  },
  login: function(e) {
    wx.switchTab({
      url: '../../pageTab/custom_page_index/index',
    })
  },
  bindPickerChange:function(event){
    console.log('====index', event)
    let that=this;
    let value = event.currentTarget.dataset.value
    let index = event.currentTarget.dataset.index
    let selectIndex = event.detail.value
    that.data.selectPicker["picker_" + index] = value[selectIndex]
    that.setData({ selectPicker: that.data.selectPicker})
  },
  params:{
    formJson:'',
    customFormId:'',
    miniNotifyFormId:'',
  },
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e)
    var that = this;
    let newObj={}
    console.log(that.params);
    let value = e.detail.value;
    let imgObj = {};
    let positionObj = {};
    let dataAndTime = {};
    let selectPicker = {};
    let region={}
    for (let i = 0; i<that.data.formData.items.length;i++){
      if (that.data.formData.items[i].type == 7||that.data.formData.items[i].type ==11){
        imgObj[that.data.formData.items[i].name] = that.data.upLoadImageList['img_' + i]||""
      }else if (that.data.formData.items[i].type == 10) {
        region[that.data.formData.items[i].name] = that.data.region['address_' + i] || ""
      } else if (that.data.formData.items[i].type == 5||that.data.formData.items[i].type == 6) {
        dataAndTime[that.data.formData.items[i].name] = that.data.dataAndTime[that.data.formData.items[i].name] || ""
      } else if (that.data.formData.items[i].type == 2) {
        selectPicker[that.data.formData.items[i].name] = that.data.selectPicker['picker_' + i] || ""
      } else if (that.data.formData.items[i].type == 12) {
        positionObj[that.data.formData.items[i].name] = that.data.locationList['position_' + i] || ""
      } else if (that.data.formData.items[i].type ==2){
      }
    }
    value = Object.assign({}, value, imgObj, positionObj, region, dataAndTime, selectPicker)
    console.log('===value=====', value, that.data.formData)
    that.params.miniNotifyFormId = e.detail.formId;
    let itemData = that.data.formData.items
    // return
    console.log('===itemData====', itemData)
    for (let i = 0; i < itemData.length;i++){
      for (let j in value) {
        if(itemData[i].name == j){
          newObj[itemData[i].name] = { value: value[j] || "", title: itemData[i].title, type: itemData[i].type, showInList: itemData[i].showInList, showInListOrder: itemData[i].showInListOrder }
        }
        if (itemData[i].name == j && itemData[i].mustInput==1&& !value[j]){
          wx.showModal({
            title: '提示',
            content: '请填写完整',
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
      }
    }
    console.log("==newObj====", newObj)
    that.params.formJson = JSON.stringify(newObj);
    var formData = app.AddClientUrl("/wx_commit_custom_form.html", that.params, 'post')
    wx.request({
      url: formData.url,
      data: formData.params,
      header: app.headerPost,
      success: function (res) {
        console.log(res.data)

        if (res.data.errcode == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          if (that.data.processType){
            setTimeout(function () {
              that.toProcessList(res.data.relateObj.id)
            }, 1000)
          } else if (that.data.refProductFormType){
            let baseProData={
              productId: that.data.skuData.productId,
              itemCount: that.data.skuData.itemCount,
              shopId: that.data.skuData.shopId,
              cartesianId: that.data.skuData.cartesianId,
              fromSource: 'mini',
              orderType: that.data.skuData.orderType,
            };
            let pintuanData = {
              pintuanCreateType: that.data.skuData.pintuanCreateType,
              pintuanRecordId: that.data.skuData.pintuanRecordId,
              };
            app.createOrder(baseProData, pintuanData, res.data.relateObj.id)
          } else if (that.data.formData.refProductId && that.data.formData.refProductId != 0) {
            let baseProData = {
              productId: that.data.formData.refProductId,
              itemCount: 1,
              shopId: 0,
              cartesianId: 0,
              fromSource: 'mini',
              orderType: 0,
            };
            let pintuanData = {
              pintuanCreateType: 0,
              pintuanRecordId: 0
            };
            app.createOrder(baseProData, pintuanData, res.data.relateObj.id)
          }else{
            setTimeout(function () {
              that.toFormCommitList()
            }, 1000)
          }
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        console.log(res.data)
      },
      complete: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  removeImg:function(event){
    let that=this;
    console.log('======event==',event);
    let index = event.currentTarget.dataset.index;
    let num = event.currentTarget.dataset.num;
    that.data.upLoadImageList['img_' + index].splice(num, 1);
    console.log('that.data.upLoadImageList', that.data.upLoadImageList);
    that.setData({ upLoadImageList: that.data.upLoadImageList })
  },
  addCommitImage: function (e) {
    console.log('===addCommitImage=',e)
    var that = this;
    let index = e.currentTarget.dataset.index;
    let count=1;
    let type = e.currentTarget.dataset.type;
    let upLoadImageList = that.data.upLoadImageList
    if (!that.data.upLoadImageList['img_' + index]){
      that.data.upLoadImageList['img_' + index]=[];//初始化数据
    }
    if (type == 7 ){
      count=1;
      if (upLoadImageList['img_' + index]&&upLoadImageList['img_' + index].length == 1){
        console.log("只能选一张")
        wx.showToast({
          title: "只能选一张",
          icon: 'none',
          duration: 2000
        })
        return
      }
    } else if (type == 11) {
      console.log("可选多张")
      count=9
    }
    wx.chooseImage({
      count: count - upLoadImageList['img_' + index].length, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("===chooseImage===",res)
        let tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length;i++){
          that.uploadImage(tempFilePaths[i], tempFilePaths.length, index)
        }
      }
    })
  },
  uploadImage: function (tempFilePaths, count,index) {
    if (!app.loginUser) {
      app.echoErr('用户未登录')
      return
    }
    console.log(count)
    let that = this
    let param = {
      userId: app.loginUser.id
    }
    console.log("==upLoadImageList===", that.data.upLoadImageList)
    var customIndex = app.AddClientUrl("/file_uploading.html", param, 'POST')
    wx.uploadFile({
      url: customIndex.url, //接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: customIndex.params,
      header: {'content-type': 'multipart/form-data'},
      success: function (res) {
        let upLoadImageList = that.data.upLoadImageList
        var data = res.data
        console.log("===success===",data)
        if (typeof (data) == 'string') {
          data = JSON.parse(data)
          console.log("====string====",data)
          if (data.errcode == 0) {
            upLoadImageList['img_' + index].push(data.relateObj.imageUrl)
            that.setData({
              upLoadImageList: upLoadImageList
            })
          }
        } else if (typeof (data) == 'object') {
          console.log("===object====", data)
          if (data.errcode == 0) {
            upLoadImageList['img_' + index].push(data.relateObj.imageUrl)
            that.setData({
              upLoadImageList: upLoadImageList
            })
          }
        }
        console.log('==upLoadImageList==',that.data.upLoadImageList)
        //do something
      }, fail: function (e) {
        console.log(e)
      }, complete: function (e) {
        // if (count == 1 || count < 1) {
        //   return false;
        // } else {
        //   that.uploadImage(tempFilePaths, --count)
        // }

      }
    })
  },
  skuData:{
    productId: 0,
    itemCount: 1,
    shopId: 0,
    cartesianId: 0,
    fromSource: 'mini',
    orderType: 0,
    pintuanCreateType: 0,
    pintuanRecordId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({ sendOptionData: options })
    let sendFormData = JSON.stringify({ title: 'noTitle', url: "form_" + options.customFormId })
    that.setData({ sendFormData: sendFormData })
    that.data.gainActionEvent = options.actionEvent
    that.setData({ formId: options.customFormId})
    that.params.customFormId = options.customFormId;
    if (options && options.actionEvent) {
      that.data.processType = true;
    } else {
      that.data.processType = false;
    }
    if (options && options.productId){
      that.data.refProductFormType=true;
      that.data.productId = options.productId
      if (options.params) {
        that.data.skuData = JSON.parse(options.params)
      }else{
        that.data.skuData = that.skuData;
      }
    }else{
      that.data.refProductFormType = false;
    }
    if (options.servantId){
      that.params.servantId = options.servantId 
    }
    let formDetailData = app.AddClientUrl("/wx_get_custom_form.html", { customFormId: options.customFormId }, 'get')
    console.log('==formDetailData===', formDetailData)
    wx.request({
      url: formDetailData.url,
      data: formDetailData.params,
      header: app.headerPost,
      method: 'get',
      success: function (res) {
        console.log(res)
        that.setData({ formData: res.data.relateObj})
        if (that.data.formData.items.length > 0) {
          let upLoadImageList = {};
          let region = {};
          let dataAndTime = {};
          let selectPicker = {};
          for (let i = 0; i < that.data.formData.items.length; i++) {
            if (that.data.formData.items[i].listValues && (that.data.formData.items[i].type == 2 || that.data.formData.items[i].type == 4)) {
              that.data.formData.items[i].listValues=that.data.formData.items[i].listValues.split(",")
              if (that.data.formData.items[i].defaultValue) {
                console.log("下拉框有值")
                selectPicker["picker_" + i] = that.data.formData.items[i].defaultValue
              } else {
                console.log("下拉框没值")
                selectPicker["picker_" + i] = ""
              }
              that.setData({
                selectPicker: selectPicker
              })
            }else if (that.data.formData.items[i].type == 7||that.data.formData.items[i].type == 11){
              if (that.data.formData.items[i].defaultValue){
                let defaultValue;
                try {
                  defaultValue = JSON.parse(that.data.formData.items[i].defaultValue);
                } catch (e) {
                  defaultValue = that.data.formData.items[i].defaultValue
                  console.log(e);
                }
                upLoadImageList['img_' + i]=[];
                if (typeof (defaultValue) == 'object' && defaultValue){
                  upLoadImageList['img_' + i] = defaultValue
                }else{
                  upLoadImageList['img_' + i].push(defaultValue)
                }
                that.setData({
                  upLoadImageList: upLoadImageList
                })
              }
            } else if (that.data.formData.items[i].type == 10){
              if (that.data.formData.items[i].defaultValue) {
                console.log("地址有值")
                let defaultRegion;
                try {
                  defaultRegion = JSON.parse(that.data.formData.items[i].defaultValue).join(",")
                } catch (e) {
                  defaultRegion = that.data.formData.items[i].defaultValue
                  console.log(e);
                }
                region['address_' + i] = defaultRegion
              } else {
                console.log("地址没值")
                region['address_' + i] = "请选择您的地址"
              }
              that.setData({
                region: region
              })
            } else if (that.data.formData.items[i].type == 5 || that.data.formData.items[i].type == 6) {
              if (that.data.formData.items[i].defaultValue) {
                console.log("日期时间有值")
                dataAndTime[that.data.formData.items[i].name] = that.data.formData.items[i].defaultValue
              } else {
                console.log("日期时间没值")
                dataAndTime[that.data.formData.items[i].name]  = ""
              }
              that.setData({
                dataAndTime: dataAndTime
              })
            }
          }
          that.setData({ formData: that.data.formData, sendPageDataState: true})
          console.log(that.data.formData)
        }
        wx.setNavigationBarTitle({
          title: that.data.formData.formName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    if (that.data.reqLocation) {
      // that.setData({ sendPageDataState: false })
      // that.setData({ sendPageDataState: true })
      let locationList = {};
      console.log("从选择地点页面返回", that.data.selectAddress)
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      console.log(currPage) //就可以看到data里mydata的值了
      if (that.data.selectAddress) {
        console.log("选择了地点")
        console.log("locationIndex", that.data.locationIndex)
        locationList[that.data.locationIndex] = that.data.selectAddress
        that.data.locationList = Object.assign({}, that.data.locationList, locationList)
        that.setData({ locationList: that.data.locationList })
        console.log("==locationList==", locationList)
        console.log("==that.data.locationList ==", that.data.locationList )
      }else{
        console.log("没选择地点")
      }
      that.selectComponent("#selectAddress").selectAddress();
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})