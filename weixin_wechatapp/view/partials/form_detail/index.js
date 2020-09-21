const app = getApp();
import { dateTimePicker, getMonthDay } from "../../../public/requestUrl.js";
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: Object,
      value: 'default value',
    },
    locationList2: {
      type: Object,
    },
    showBtn:{//是否显示提交按钮
      type: String,
    },
    showTitle: {//是否显示标题
      type: String,
    },
    showSubmitPopup: {//是否需要提交数据后弹窗确认
      type: String,
    },
    userAddressCustomFormCommitId:{
      type: String,
    }
  },
  data: {
    formData:null,
    sexArray:['男','女'],
    selectPicker:{},
    upLoadImageList:{},
    dataAndTime:{},
    commonData:{},
    showformSubmitBtn:false,
    showSubmitPopup:false,
    processType: false,
    refProductFormType: false,
    productId:0,
    skuData: {
      productId: 0,
      itemCount: 1,
      shopId: 0,
      cartesianId: 0,
      fromSource: 'mini',
      orderType: 0,
      pintuanCreateType: 0,
      pintuanRecordId: 0
    },
    gainActionEvent: {},
    region: {},
    checkboxList: {},
    formId:0,
    reqLocation:false,
    locationList:{},
    inputValue:{},
    locationIndex:"",
    multistageData:{},//级联数据
    multiIndex:{},//选择级联位置
    currentMultiData:{},
    haveFormData:null,
    showCheckBoxState: [],
    showRadioState: [],
    measurePriceList: [],
    showMask: false,
    animationData: {}, //抽屉
    limitStockData:['不限制','限制'],
    selectLimitStockIndex:0,
    controlFieldShow:{},//控制字段的显示隐藏
    dateTimeObj: {},
    dateTimeIndexObj: {},
    processLineData: {},//进程
    showMaskTwo:false,
    currentProcessLineData:{},
  },
  ready: function () {
    let that = this;
    that.setData({ setting: app.setting,loginUser: app.loginUser  })
    console.log(that.data.data)
    console.log("====userAddressCustomFormCommitId===", that.data.userAddressCustomFormCommitId)
    console.log("====showBtn===", that.data.showBtn)
    console.log("==locationList==", that.data.locationList)
    console.log("===selectAddress=====", that.data.selectAddress)
    let options = that.data.data
    that.data.gainActionEvent = options.actionEvent||0
    that.setData({ formId: options.customFormId })
    if (that.data.showBtn =='true'){
      that.setData({ showformSubmitBtn:true})
    } else {
      that.setData({ showformSubmitBtn: false })
    }
    if (options && options.actionEvent) {
      that.data.processType = true;
    } else {
      that.data.processType = false;
    }
    if (options && options.productId) {
      that.data.refProductFormType = true;
      that.data.productId = options.productId
      if (options.params) {
        that.data.skuData = JSON.parse(options.params)
      } else {
        that.data.skuData = that.skuData;
      }
    } else {
      that.data.refProductFormType = false;
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
        let formData = res.data.relateObj;
        if (that.data.userAddressCustomFormCommitId){
          that.getDetail(that.data.userAddressCustomFormCommitId, formData)
        }else{
          that.setFormDataFun(formData)
        }
        if (that.data.showTitle!='false'){
          wx.setNavigationBarTitle({
            title: res.data.relateObj.formName
          })
        }
      }
    })
  },
  methods: {
    addProcessLineItemFun:function(e){
      console.log("====addProcessLineItemFun====",e)
      let that=this;
      let itemData = e.currentTarget.dataset.item;
      that.setData({ currentProcessLineData: itemData, showMaskTwo:true})
    },
    sureProcessData: function (e) {
      console.log("======sureProcessData=======", e)
      let that = this;
      let processLineData = that.data.processLineData;
      let currentProcessLineData = that.data.currentProcessLineData;
      console.log("currentProcessLineData", currentProcessLineData)
      let resultData = e.detail.value;
      if (!resultData.title) {
        let content = currentProcessLineData.remark && currentProcessLineData.remark.title ? currentProcessLineData.remark.title : "标题"
        wx.showModal({
          title: '提示',
          content: '主人~您的' + content +'还没填写哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      } else if(!resultData.content) {
        let content = currentProcessLineData.remark && currentProcessLineData.remark.content ? currentProcessLineData.remark.content : "内容"
        wx.showModal({
          title: '提示',
          content: '主人~您的' + content+'还没填写哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }  else {
        processLineData[currentProcessLineData.name].splice(processLineData[currentProcessLineData.name].length, 0, resultData)
        that.setData({ processLineData: processLineData })
        that.closeZhezhao()
      }
    },
    deleteProcessItem:function(e){
      console.log("======deleteProcessItem=======", e)
      let that = this;
      let index = e.currentTarget.dataset.index;
      let name = e.currentTarget.dataset.name;
      let processLineData = that.data.processLineData
      processLineData[name].splice(index, 1)
      that.setData({ processLineData: processLineData })
    },
    limitStockStateFun:function(e){
      console.log("======limitStockStateFun=======", e)
      let selectLimitStockIndex=e.detail.value;
      this.setData({ selectLimitStockIndex: selectLimitStockIndex})
    },
    deleteMeasureItem:function(e){
      console.log("======deleteMeasureItem=======",e)
      let that=this;
      let index = e.currentTarget.dataset.index;
      let measurePriceList = that.data.measurePriceList
      measurePriceList.splice(index, 1)
      that.setData({ measurePriceList: measurePriceList })
    },
    sureMeasuresData:function(e){
      console.log("======sureMeasuresData=======", e)
      let that=this;
      let measurePriceList = that.data.measurePriceList
      let resultData = e.detail.value;
      if (!resultData.attendMeasureName){
        wx.showModal({
          title: '提示',
          content: '主人~您的规格名还没填写哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }else if (!resultData.attendPrice) {
        wx.showModal({
          title: '提示',
          content: '主人~您的规格价格还没填写哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      } else if (!resultData.attendStock) {
        wx.showModal({
          title: '提示',
          content: '主人~您的规格库存还没填写哦!',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return;
      }else{
        measurePriceList.splice(measurePriceList.length, 0, resultData)
        that.setData({ measurePriceList: measurePriceList})
        that.closeZhezhao()
      }
    },
    addMeasuresItemFun:function(){
      let that=this;
      console.log("=======addMeasuresItemFun=======", that.data.measurePriceList)
      that.setData({ showMask: !that.data.showMask })
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      console.log("=======popupFormPage==========", animation, that.data.showMask)
      if (that.data.showMask) {
        animation.bottom('100rpx').step()
      } else {
        animation.bottom('-100rpx').step()
      }
      that.setData({
        animationData: animation.export()
      })
    },
    closeZhezhao: function () {
      this.setData({ showMask: false,showMaskTwo: false })
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      animation.bottom('-100rpx').step()
      let setData = animation.export()
      this.setData({
        animationData: setData,
      })
    },
    toImgUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      console.log("===========e==========", event.currentTarget.dataset.url)
      app.linkEvent(event.currentTarget.dataset.link);
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
    getDetail: function (formCommitId, data) {
      let that = this;
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
          console.log("====success====", res)
          if (res.data.errcode == 0) {
            wx.hideLoading()
            // that.setData({ haveFormData: res.data.relateObj.commitJson, loading: false })
            that.setFormDataFun(data, JSON.parse(res.data.relateObj.commitJson))
          } else {
            wx.showToast({
              title: '加载失败...',
              icon: 'none',
              duration: 2000,
            })
            wx.navigateBack(
              { delta: 1, }
            )
          }
        }
      })
    },
    setFormDataFun: function (formData,jsonData){
      let that=this;
      console.log("===jsonData===", jsonData)
      console.log("===formData===", formData)
      let haveFormData=[];
      for (let i = 0; i < formData.items.length;i++){
        if (formData.items[i].formHide==0){
          haveFormData.push(formData.items[i])
        }
      }
      formData.items = haveFormData;
      if (formData.items.length > 0) {
        let upLoadImageList = {};
        let region = {};
        let dataAndTime = {};
        let selectPicker = {};
        let controlFieldShow = that.data.controlFieldShow
        for (let i = 0; i < formData.items.length; i++) {
          controlFieldShow[formData.items[i].name] = true;
        }
        for (let i = 0; i < formData.items.length; i++) {
          if (formData.items[i].listValues && (formData.items[i].type == 2 || formData.items[i].type == 4 || formData.items[i].type == 3)) {
            if (formData.items[i].type != 3){
              formData.items[i].listValues = formData.items[i].listValues.split(",")
            }
            let name = "picker_";
            if (formData.items[i].type == 4){
              name ='checkbox_'
            }
            if (formData.items[i].type == 3) {
              name = 'radio_'
            } 
            if (jsonData&&jsonData[formData.items[i].name]){
              selectPicker[name + i] = jsonData[formData.items[i].name].value
            }else{
              if (formData.items[i].defaultValue) {
                console.log("下拉框有值")
                selectPicker[name + i] = formData.items[i].defaultValue
              } else {
                console.log("下拉框没值")
                selectPicker[name + i] = ""
              }
            }
            if (formData.items[i].type == 3) {
              formData.items[i].listValues = JSON.parse(formData.items[i].listValues)
              let listValues = formData.items[i].listValues
              selectPicker['radio_' + i] = formData.items[i].defaultValue||'0'
              let showRadioState = [];
              for (let j=0;j<listValues.length;j++){
                showRadioState[j]=false;
                if (listValues[j].children){
                  let childrenList = listValues[j].children.split(',')
                  console.log("====childrenList====", childrenList)
                  for (let k = 0; k < childrenList.length; k++) {
                    console.log("=======childrenList[k]==========", childrenList[k])
                    if (controlFieldShow[childrenList[k]]){
                      controlFieldShow[childrenList[k]]=false;
                    }
                  }
                }
                if (formData.items[i].defaultValue && listValues[j].value == formData.items[i].defaultValue){
                  console.log("====单选===")
                  showRadioState[j] = true;
                  if (listValues[j].children) {
                    let childrenList = listValues[j].children.split(',')
                    console.log("==childrenList===", childrenList)
                    for (let k = 0; k < childrenList.length; k++) {
                      console.log("=======childrenList[k]==========", childrenList[k], controlFieldShow[childrenList[k]])
                      controlFieldShow[childrenList[k]] = true;
                    }
                  }
                }
              }
              console.log("=======showRadioState========", showRadioState)
              that.setData({ showRadioState: showRadioState })
            }
            console.log("=======selectPicker========", selectPicker)
            that.setData({
              selectPicker: selectPicker
            })
            if (formData.items[i].type == 4){
              let checkboxList=selectPicker['checkbox_' + i];
              let listValues =formData.items[i].listValues;
              let showCheckBoxState=[]
              for (let j = 0; j < listValues.length; j++) {
                console.log("====listValues=====", listValues[j])
                let count = 0;
                for (let k = 0; k < checkboxList.length; k++) {
                  console.log("====checkbox=====", checkboxList[k])
                  if (listValues[j] != checkboxList[k]) {
                    console.log("======", listValues[j], checkboxList[k])
                    count++
                  } else {
                    console.log("!======", listValues[j], checkboxList[k])
                  }
                }
                if (count != checkboxList.length) {
                  console.log("===count===", count)
                  showCheckBoxState.splice(j, 1, true)
                } else {
                  console.log("!count======", count)
                  showCheckBoxState.splice(j, 1, false)
                }
              }
              that.setData({ showCheckBoxState: showCheckBoxState})
            }
            console.log("=======selectPicker======", selectPicker)
          } else if (formData.items[i].listValues && formData.items[i].type == 13) {//多级联的初始化
            let one=0;
            let two=0;
            let three = 0;
            let four = 0;
            let five = 0;
            let index = 0
            try {
              formData.items[i].listValues = JSON.parse(formData.items[i].listValues)
            } catch (e) {
              console.log(e);
              wx.showModal({
                title: '提示',
                content: formData.items[i].title + "(" + formData.items[i].name+")" + "字段的JSON数据格式不对",
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateBack()
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateBack()
                  }
                }
              })
              return
            }
            let listValues = formData.items[i].listValues
            // that.setData({ currentMultiData: formData.items })
            console.log("=======listValues2======", i,listValues)
            // that.setMultiPicker(formData.items[i], 0, 0, 0, 0, 0);
            if (formData.items[i].defaultValue){
              let defaultValue = JSON.parse(formData.items[i].defaultValue);
              console.log("=====defaultValue----13====", defaultValue)
              for (let k = 0; k < listValues.length; k++) {
                if (listValues[k].name == defaultValue[index]) {
                  // 一级
                  one = k;
                  index++ 
                  let childrenTwo = listValues[k].children
                  for (let l = 0; l < childrenTwo.length; l++) {
                    if (childrenTwo[l].name == defaultValue[index]) {
                      // 二级
                      two = l;
                      index++
                      let childrenThree = childrenTwo[l].children
                      for (let n = 0; n < childrenThree.length; n++) {
                        if (childrenThree[n].name == defaultValue[index]) {
                          // 三级
                          three = n;
                          index++
                          let childrenFour = childrenThree[n].children
                          if (childrenFour&&childrenFour.length!=0){
                            for (let m = 0; m < childrenFour.length; m++) {
                              if (defaultValue && defaultValue.length>=4&&childrenFour[m].name == defaultValue[index]) {
                                // 四级
                                four = m;
                                index++
                                let childrenfive = childrenFour[m].children
                                if (childrenfive&&childrenfive.length!=0){
                                  for (let o = 0; o < childrenfive.length; o++) {
                                    if (defaultValue &&defaultValue.length>=5&&childrenfive[o].name == defaultValue[index]) {
                                      // 五级
                                      five = o;
                                    }
                                  }
                                }else{
                                  five=0
                                }
                              }else{
                                four=0
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              that.setMultiPicker(formData.items[i], one, two, three, four,five);
            }else{
              that.setMultiPicker(formData.items[i], 0, 0, 0, 0, 0);
            }
          } else if (formData.items[i].type == 9999) {
            formData.items[i].splitStyle = JSON.parse(formData.items[i].splitStyle);
          } else if (formData.items[i].type == 7 || formData.items[i].type == 11) {
            upLoadImageList['img_' + i] = [];
            if (jsonData && jsonData[formData.items[i].name]) {
              let defaultValue = jsonData[formData.items[i].name].value
              if(defaultValue){
                if (typeof (defaultValue) == 'object') {
                  upLoadImageList['img_' + i] = defaultValue
                } else {
                  upLoadImageList['img_' + i].push(defaultValue)
                }
              }
            } else {
              if (formData.items[i].defaultValue) {
                let defaultValue;
                try {
                  defaultValue = JSON.parse(formData.items[i].defaultValue);
                } catch (e) {
                  defaultValue = formData.items[i].defaultValue
                  console.log(e);
                }
                if (typeof (defaultValue) == 'object') {
                  upLoadImageList['img_' + i] = defaultValue
                } else {
                  upLoadImageList['img_' + i].push(defaultValue)
                }
              }
            }
            that.setData({
              upLoadImageList: upLoadImageList
            })
          } else if (formData.items[i].type == 10) {
            if (formData.items[i].defaultValue) {
              console.log("地址有值")
              let defaultRegion;
              try {
                defaultRegion = JSON.parse(formData.items[i].defaultValue).join(",")
              } catch (e) {
                defaultRegion = formData.items[i].defaultValue
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
          } else if (formData.items[i].type == 5 || formData.items[i].type == 6) {
            if (formData.items[i].defaultValue) {
              console.log("日期时间有值")
              dataAndTime[formData.items[i].name] = formData.items[i].defaultValue
            } else {
              console.log("日期时间没值")
              dataAndTime[formData.items[i].name] = ""
            }
            that.setData({
              dataAndTime: dataAndTime
            })
          } else if (formData.items[i].type == 8) {
            let name = formData.items[i].name
            let dateTimeObj = that.data.dateTimeObj
            let dateTimeIndexObj = that.data.dateTimeIndexObj
            let dataAndTime = that.data.dataAndTime
            let obj = dateTimePicker(2019, 2050);
            if (formData.items[i].defaultValue) {
              console.log("日期时间有值", formData.items[i].defaultValue)
              let defaultValue = formData.items[i].defaultValue 
              let oldData = [...defaultValue.split(' ')[0].split('-'), ...defaultValue.split(' ')[1].split(':')]
              let year = oldData[0] + '年';
              let month = oldData[1] + '月';
              let date = oldData[2] + '日';
              let hours = oldData[3] + '时';
              let minutes = oldData[4] + '分';
              console.log("defaultValue", defaultValue)
              let value = [year, month, date].join('-') + " " + [hours, minutes].join(':')
              console.log("==value====", value)
              obj = dateTimePicker(2019, 2050, value)
            } else {
              console.log("日期时间没值")
            }
            let lastArray = obj.dateTimeArray.pop();
            let lastTime = obj.dateTime.pop();
            dateTimeObj[name] = obj.dateTimeArray
            dateTimeIndexObj[name] = obj.dateTime
            dataAndTime[name] = dateTimeObj[name][0][dateTimeIndexObj[name][0]].slice(0, -1) + "-" + dateTimeObj[name][1][dateTimeIndexObj[name][1]].slice(0, -1) + "-" + dateTimeObj[name][2][dateTimeIndexObj[name][2]].slice(0, -1) + " " + dateTimeObj[name][3][dateTimeIndexObj[name][3]].slice(0, -1) + ":" + dateTimeObj[name][4][dateTimeIndexObj[name][4]].slice(0, -1);
            that.setData({
              dataAndTime: dataAndTime,
              dateTimeObj: dateTimeObj,
              dateTimeIndexObj: dateTimeIndexObj,
            })
            console.log("=============obj=============", obj)
          } else if (formData.items[i].type == 15) {
            let processLineData = that.data.processLineData;
            let commonData = that.data.commonData;
            if (formData.items[i].remark){
              formData.items[i].remark = JSON.parse(formData.items[i].remark)
            }
            if (formData.items[i].defaultValue) {
              console.log("进程有值", formData.items[i].defaultValue)
              commonData[formData.items[i].name] = formData.items[i].defaultValue
              try {
                processLineData[formData.items[i].name] = JSON.parse(formData.items[i].defaultValue)
              } catch (e) {
                processLineData[formData.items[i].name] = formData.items[i].defaultValue
                console.log(e);
              }
            } else {
              console.log("进程没值")
              commonData[formData.items[i].name] = ""
              processLineData[formData.items[i].name] = []
            }
            that.setData({
              commonData: commonData,
              processLineData: processLineData
            })
          }else {
            if (jsonData && jsonData[formData.items[i].name]){
              formData.items[i].defaultValue = jsonData[formData.items[i].name].value
            }
          }
        }
        that.setData({ formData: formData, controlFieldShow: controlFieldShow })
        console.log(that.data.formData, that.data.controlFieldShow)
      }
    },
    saveSearchValue: function (e) {
      console.log("====saveSearchValue======", e)
      let that=this;
      let name = e.currentTarget.dataset.name;
      let value = e.detail.value
      let inputValue = that.data.inputValue;
      inputValue[name] = value;
      that.setData({ inputValue: inputValue })
      console.log("====inputValue======", that.data.inputValue)
    },
    // 时间日期
    changeDateTimeColumn1(e) {
      console.log("===changeDateTimeColumn1===", e)
      let that = this;
      let itemData = e.currentTarget.dataset.itemdata
      let dateTimeObj = that.data.dateTimeObj
      let dateTimeIndexObj = that.data.dateTimeIndexObj
      let dataAndTime = that.data.dataAndTime
      console.log("===dateTimeIndexObj===", dateTimeIndexObj, dateTimeObj)
      dateTimeIndexObj[itemData.name][e.detail.column] = e.detail.value;
      let year = dateTimeObj[itemData.name][0][dateTimeIndexObj[itemData.name][0]].slice(0, -1);
      let month = dateTimeObj[itemData.name][1][dateTimeIndexObj[itemData.name][1]].slice(0, -1)
      dateTimeObj[itemData.name][2] = getMonthDay(year, month);
      if (dateTimeIndexObj[itemData.name][2] >= dateTimeObj[itemData.name][2].length){
        dateTimeIndexObj[itemData.name][2] = dateTimeObj[itemData.name][2].length - 1
      }
      dataAndTime[itemData.name] = dateTimeObj[itemData.name][0][dateTimeIndexObj[itemData.name][0]].slice(0, -1) + "-" + dateTimeObj[itemData.name][1][dateTimeIndexObj[itemData.name][1]].slice(0, -1) + "-" + dateTimeObj[itemData.name][2][dateTimeIndexObj[itemData.name][2]].slice(0, -1) + " " + dateTimeObj[itemData.name][3][dateTimeIndexObj[itemData.name][3]].slice(0, -1) + ":" + dateTimeObj[itemData.name][4][dateTimeIndexObj[itemData.name][4]].slice(0, -1)
      this.setData({
        dateTimeObj: dateTimeObj,
        dateTimeIndexObj: dateTimeIndexObj,
        dataAndTime: dataAndTime
      });
    },
    changeDateTime1(e) {
      console.log("====changeDateTime1====", e)
      let that = this;
      let itemData = e.currentTarget.dataset.itemdata
      let dateTimeIndexObj = that.data.dateTimeIndexObj
      dateTimeIndexObj[itemData.name] = e.detail.value
      this.setData({ dateTimeIndexObj: dateTimeIndexObj });
    },
    // 多级联
    getCurrentData: function (e) {
      console.log("getCurrentData", e);
      let that = this;
      let itemData = e.currentTarget.dataset.itemdata
      that.setData({ currentMultiData: itemData })
    },
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      // let that = this;
      // let currentMultiData = that.data.currentMultiData//当前多级联项数据
      // let dataA = that.data.multistageData;
      // let multiIndex = that.data.multiIndex;
      // let objName = currentMultiData.name
      // let currentData = currentMultiData.listValues
      // multiIndex[currentMultiData.name] = e.detail.value
      // console.log('====currentMultiData=====', currentMultiData);
      // let multiIndex = this.data.multiIndex
      // multiIndex[currentMultiData.name] = e.detail.value
      // this.setData({
      //   confirmMultiIndex: multiIndex
      // })
    },
    bindMultiPickerColumnChange: function (e) {
      let that = this;
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let currentMultiData = that.data.currentMultiData
      console.log('====currentMultiData=====', currentMultiData);
      let multiIndex = that.data.multiIndex
      switch (e.detail.column) {
        // 一级联
        case 0:
          that.setMultiPicker(currentMultiData, e.detail.value, 0, 0, 0, 0);
          break;
        // 二级联
        case 1:
          that.setMultiPicker(currentMultiData, multiIndex[currentMultiData.name][0], e.detail.value, 0,0,0);
          break;
        //三级联
        case 2:
          that.setMultiPicker(currentMultiData, multiIndex[currentMultiData.name][0], multiIndex[currentMultiData.name][1], e.detail.value,0,0);
          break;
        //四级联
        case 3:
          that.setMultiPicker(currentMultiData, multiIndex[currentMultiData.name][0], multiIndex[currentMultiData.name][1], multiIndex[currentMultiData.name][2],e.detail.value,0);
          break;
        //五级联
        case 4:
          that.setMultiPicker(currentMultiData, multiIndex[currentMultiData.name][0], multiIndex[currentMultiData.name][1],multiIndex[currentMultiData.name][2],multiIndex[currentMultiData.name][3], e.detail.value);
          break;
      }
    },
    setMultiPicker: function (itemData, indexOne, indexTwo, indexThree, indexFour, indexFive){
      let that=this;
      let dataA = that.data.multistageData;
      let multiIndex = that.data.multiIndex;
      let objName = itemData.name
      let currentData = itemData.listValues
      console.log("====currentData====", currentData)
      dataA[objName] = [];
      dataA[objName][0] = [];
      multiIndex[objName] = [indexOne, indexTwo, indexThree, indexFour, indexFive];//当前多级联的选择数据
      // 一级
      for (let j = 0; j < currentData.length; j++) {
        dataA[objName][0].push(currentData[j].name)
      }
      //二级
      if (currentData[indexOne].children&&currentData[indexOne].children.length != 0) {
        dataA[objName][1] = [];
        for (let k = 0; k < currentData[indexOne].children.length; k++) {
          dataA[objName][1].push(currentData[indexOne].children[k].name)
        }
      }
      //三级
      if (currentData[indexOne].children[indexTwo].children&&currentData[indexOne].children[indexTwo].children.length != 0) {
        dataA[objName][2] = [];
        for (let l = 0; l < currentData[indexOne].children[indexTwo].children.length; l++) {
          dataA[objName][2].push(currentData[indexOne].children[indexTwo].children[l].name)
        }
      }
      //四级
      if (currentData[indexOne].children[indexTwo].children&&currentData[indexOne].children[indexTwo].children.length!=0&&currentData[indexOne].children[indexTwo].children[indexThree].children && currentData[indexOne].children[indexTwo].children[indexThree].children.length != 0) {
        dataA[objName][3] = [];
        for (let m = 0; m < currentData[indexOne].children[indexTwo].children[indexThree].children.length; m++) {
          dataA[objName][3].push(currentData[indexOne].children[indexTwo].children[indexThree].children[m].name)
        }
      }
      //五级
      if (currentData[indexOne].children[indexTwo].children&&currentData[indexOne].children[indexTwo].children.length != 0 && currentData[indexOne].children[indexTwo].children[indexThree].children && currentData[indexOne].children[indexTwo].children[indexThree].children.length!=0&&currentData[indexOne].children[indexTwo].children[indexThree].children[indexFour].children && currentData[indexOne].children[indexTwo].children[indexThree].children[indexFour].children.length != 0) {
        dataA[objName][4] = [];
        for (let n = 0; n < currentData[indexOne].children[indexTwo].children[indexThree].children[indexFour].children.length; n++) {
          dataA[objName][4].push(currentData[indexOne].children[indexTwo].children[indexThree].children[indexFour].children[n].name)
        }
      }
      console.log("===dataA====", dataA)
      console.log("===multiIndex====", multiIndex)
      that.setData({
        multistageData: dataA,
        multiIndex: multiIndex
      })
    },
    selectAddress:function(){
      let that=this;
      this.setData({ locationList: that.data.locationList2})
    },
    checkboxChange:function(e){
      console.log('checkbox发生change事件，携带value值为：', e)
      let index = e.target.dataset.index
      let that = this;
      let selectPicker = that.data.selectPicker;
      selectPicker['checkbox_' + index] = e.detail.value
      this.setData({
        selectPicker: selectPicker
      })
      console.log("=====selectPicker=====", selectPicker)
    },
    radioChange: function (e) {
      console.log('radioChange发生change事件，携带value值为：', e)
      let that = this;
      let index = e.target.dataset.index;
      let itemValue = e.target.dataset.value;
      let value = e.detail.value
      let name = e.currentTarget.dataset.name
      let controlFieldShow = that.data.controlFieldShow;
      if (name !='_selfMulBuyObject'){
        for (let i in controlFieldShow) {
          controlFieldShow[i] = true;
        }
        for (let i = 0; i < itemValue.length; i++) {
          if (value != itemValue[i].value && itemValue[i].children) {
            let childrenData = itemValue[i].children.split(",")
            for (let j = 0; j < childrenData.length; j++) {
              controlFieldShow[childrenData[j]] = false
            }
          }
        }
        that.setData({ controlFieldShow: controlFieldShow})
      }
      let selectPicker = that.data.selectPicker;
      selectPicker['radio_' + index] = value
      this.setData({
        selectPicker: selectPicker,
      })
      console.log("=====selectPicker=====", selectPicker)
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
    console.log('===showPoster====', that.data.formId)
    let ewmImgUrl = app.getQrCode({ type: "form_detail", id: that.data.formId })
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
      that.triggerEvent('selectPsotion', { locationIndex: "position_" + index}) //myevent自定义名称事件，父组件中使用
      that.setData({ reqLocation: true, locationIndex: "position_" + index})
    } else {
      that.setData({ reqLocation: false })
    }
    app.linkEvent(linkUrl + "?locationIndex=" + "position_" + index)
  },
  // 返回首页
  toFormCommitList: function (){
    var a = "form_commit_list.html?self=1&customFormId=" + this.data.formId;
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
    formSubmit: function (e, measureData){
    console.log('form发生了submit事件，携带数据为：', e)
    var that = this;
    let measurePriceList = that.data.measurePriceList;
    console.log('===that.data.formData.items===', that.data.formData.items, that.data.formData.userCanCommit)
    if (that.data.formData.userCanCommit == 0) {
      wx.showModal({
        title: '提示',
        content: '您没有权限提交数据',
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
      return;
    };
    let newObj={}
    // console.log(that.params);
    let params={};
    let value={}
    params.customFormId = that.data.formId;
    if (that.data.formData.attendSupportMeasures == 1) {
      params.measurePriceList = JSON.stringify(measurePriceList);
    }
    if (measureData){
      console.log("=======传了多规格数据=========", measureData)
      params = Object.assign({}, params, { attendMeasureList:measureData})
      // params.attendMeasureName = measureData.attendMeasureName
    }
    if (e && e.currentTarget){
      value = e.detail.value
      params.miniNotifyFormId = e.detail.formId;
    }else{
      if(e){
        params.parentCommitId=e//子组件传过来的记录id
      }
      for (let i = 0; i < that.data.formData.items.length; i++) {
        let name = that.data.formData.items[i].name;
        if ((that.data.formData.items[i].type == 0 || that.data.formData.items[i].type == 9 || that.data.formData.items[i].type == 1 || that.data.formData.items[i].type == 14)&& (!that.data.inputValue[name] && that.data.inputValue[name]!=='')){
          that.data.inputValue[name] = that.data.formData.items[i].defaultValue||"";
        }
      }
      value =that.data.inputValue;
    }
    console.log('===value1=====', value)
    let imgObj = {};
    let positionObj = {};
    let dataAndTime = {};
    let selectPicker = {};
    let region = {}
    let checkboxList = {}
    let radioList = {}
    let multistageData = {}
    let processLineData = {}
    for (let i = 0; i<that.data.formData.items.length;i++){
      if (that.data.formData.items[i].type == 7||that.data.formData.items[i].type ==11){
        imgObj[that.data.formData.items[i].name] = that.data.upLoadImageList['img_' + i]||""
      }else if (that.data.formData.items[i].type == 10) {
        region[that.data.formData.items[i].name] = that.data.region['address_' + i] !='请选择您的地址'?that.data.region['address_' + i] : ""
      } else if (that.data.formData.items[i].type == 5 || that.data.formData.items[i].type == 6 ) {
        dataAndTime[that.data.formData.items[i].name] = that.data.dataAndTime[that.data.formData.items[i].name] || ""
      } else if ( that.data.formData.items[i].type == 8) {
        dataAndTime[that.data.formData.items[i].name] = that.data.dataAndTime[that.data.formData.items[i].name]+":00" || ""
      } else if (that.data.formData.items[i].type == 2) {
        selectPicker[that.data.formData.items[i].name] = that.data.selectPicker['picker_' + i] || ""
      } else if (that.data.formData.items[i].type == 3) {
        radioList[that.data.formData.items[i].name] = that.data.selectPicker['radio_' + i] || ""
      } else if (that.data.formData.items[i].type == 4) {
        checkboxList[that.data.formData.items[i].name] = that.data.selectPicker['checkbox_' + i] || ""
      }else if (that.data.formData.items[i].type == 12) {
        positionObj[that.data.formData.items[i].name] = that.data.locationList['position_' + i] || ""
      } else if (that.data.formData.items[i].type == 15) {
        processLineData[that.data.formData.items[i].name] = JSON.stringify(that.data.processLineData[that.data.formData.items[i].name]) || ""
      } else if (that.data.formData.items[i].type == 13) {
        console.log("that.data.formData.items[i].name", that.data.formData.items[i].name)
        let multistageDataObj = that.data.multistageData[that.data.formData.items[i].name];
        let multiIndexObj = that.data.multiIndex[that.data.formData.items[i].name]
        console.log("===multiIndexObj====", multistageDataObj, multiIndexObj)
        multistageData[that.data.formData.items[i].name] = []
        if (multistageDataObj.length != 0) {
          for (let j = 0; j < multistageDataObj.length; j++) {
            console.log(multistageDataObj[j][multiIndexObj[j]])
            multistageData[that.data.formData.items[i].name].push(multistageDataObj[j][multiIndexObj[j]])
          }
        }
        console.log("====multistageData=====", multistageData)
        // multistageData[that.data.formData.items[i].name] = that.data.multistageData[that.data.formData.items[i].name] || ""
      }else if (that.data.formData.items[i].type ==0){

      }
    }
      value = Object.assign({}, value, imgObj, positionObj, region, dataAndTime, selectPicker, multistageData, checkboxList, radioList, processLineData)
    console.log('===value2=====', value, that.data.formData)
    let itemData = that.data.formData.items
    // return
    console.log('===itemData====', itemData)
    let controlFieldShow = that.data.controlFieldShow;
    for (let i = 0; i < itemData.length;i++){
      newObj[itemData[i].name] = { value: value[itemData[i].name] || "", title: itemData[i].title, type: itemData[i].type, showInList: itemData[i].showInList, showInListOrder: itemData[i].showInListOrder }
      console.log("===controlFieldShow====", itemData[i].name, controlFieldShow[itemData[i].name])
      if ((itemData[i].mustInput == 1 && (!value[itemData[i].name] || value[itemData[i].name].length == 0)) && controlFieldShow[itemData[i].name]) {
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
    console.log("==newObj====", newObj)
    params.formJson = JSON.stringify(newObj);
    if (that.data.userAddressCustomFormCommitId){//编辑表单的提交ID
      params.customFromCommitId = that.data.userAddressCustomFormCommitId
    }
    if (that.data.showSubmitPopup&&that.data.showSubmitPopup == 'false') {
      that.sureSubimtFun(params)
    } else {
      wx.showModal({
        title: '提示',
        content: '您确认提交嘛?',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.sureSubimtFun(params)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  sureSubimtFun: function (params){
    let that=this;
    app.showToastLoading("请稍等~",true)
    var formData = app.AddClientUrl("/wx_commit_custom_form.html", params, 'post')
    wx.request({
      url: formData.url,
      data: formData.params,
      header: app.headerPost,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          if (!that.data.showformSubmitBtn) {
            let param = {};
            console.log("======1===========")
            if (res.data.relateObj.result_type) {
              param = { formId: res.data.relateObj.result.id, result: res.data.relateObj.result }
            } else {
              param = { formId: res.data.relateObj.id }
            }
            that.triggerEvent('sendDataFun', param) //myevent自定义名称事件，父组件中使用
          }
          if (that.data.processType) {
            console.log("======2===========")
            setTimeout(function () {
              that.toProcessList(res.data.relateObj.id)
            }, 1000)
          } else if (that.data.refProductFormType) {
            console.log("======3===========")
            let baseProData = {
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
            console.log("======4===========")
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
          } else if (!that.data.showformSubmitBtn) {
            console.log("======5===========")
          } else {
            console.log("======6===========")
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
  },
})