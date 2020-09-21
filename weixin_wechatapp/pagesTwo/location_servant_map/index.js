

const app = getApp()

Page({

  data: {
    setting: null, // setting   
    servantData: null, // 商品数据 
    servantType: [], // 商品数据 
    servantshowWay: 2, // servantshowWay列表显示方法 (默认显示地图)
    colorAtive: '#888',
    localPoint: { longitude: '0', latitude:'0'},
    mapCtx:{},
    currentType:null,
    currentScale:4,
    markers: [{
      iconPath: "",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }],
    selectTab: [{
      title: '全部分类',
      type: 'pull-down',
      name: 'servantTypeId',
      state: false,
      value: '',
      listValues: [],
    }, {
        title: '默认排序',
        value:'',
        type: 'pull-down',
        name: '默认排序',
        state: false,
        listValues: [],
      }],
    selectTabIndex: -1,
    selectResultsValue: {},
    selectResultsObj: {},
  },
  getServantTypeRelateData:function(){

  },
  calling:function(e){
    let that=this;
    console.log("======calling======", e)
    let telno = e.currentTarget.dataset.telno
    console.log("========telno========", telno)
    app.calling(telno)
  },
  selectTabFun: function (e) {
    console.log("====selectTab====", e)
    let that = this;
    that.closeZhezhao()
    let selectTab = that.data.selectTab
    let index = e.currentTarget.dataset.index;
    if (that.data.selectTabIndex != index) {
      that.setData({ showCount: true, showMoreSelectState: false })
      that.setData({ selectTabIndex: index })
      for (let i = 0; i < selectTab.length; i++) {
        selectTab[i].state = false;
      }
      that.data.selectTab[index].state = true
      that.setData({ selectTab: selectTab })
    } else {
      that.closeZhezhao()
    }
  },
  closeZhezhao: function () {
    let that = this;
    let selectTab = that.data.selectTab;
    that.setData({ selectTabIndex: -1 })
    for (let i = 0; i < selectTab.length; i++) {
      selectTab[i].state = false;
    }
    that.setData({
      showCount: false,
      showMoreSelectState: false,
      selectTab: selectTab,
    })
  },
  selectResult: function (e) {
    let that = this;
    console.log("===selectResult===", e);
    let index = e.currentTarget.dataset.index;//选项的位置
    let type = e.currentTarget.dataset.type;//选项的类型
    let indexFather = e.currentTarget.dataset.father;//tab的位置(更多里面点击时传的)
    let selectTabIndex = indexFather || that.data.selectTabIndex;//tab的位置
    let selectTab = that.data.selectTab//tab数据
    let params = that.params//搜索数据
    let selectResultsValue = that.data.selectResultsValue//搜索数据
    if (selectTab[selectTabIndex].type == 'pull-down') {
      if (index == -1) {
        console.log("======pull-down选择了全部=====")
        selectResultsValue[selectTab[selectTabIndex].name] = ""
        params[selectTab[selectTabIndex].name] = 0
      } else {
        console.log("======pull-down选择了其他选项=====")
        selectResultsValue[selectTab[selectTabIndex].name] = selectTab[selectTabIndex].listValues[index].value
        params[selectTab[selectTabIndex].name] = selectTab[selectTabIndex].listValues[index].id
        for (let i = 0; i < selectTab[selectTabIndex].listValues.length; i++) {
          selectTab[selectTabIndex].listValues[i].state = false;
        }
        selectTab[selectTabIndex].listValues[index].state = true
      }
      if (!type && type != 'more_select') {
        that.closeZhezhao()
        that.getServantData(params,2);
      }
    } else if (selectTab[selectTabIndex].type == 'multi-select') {
      if (index == -1) {
        console.log("======multi-select选择了全部=====")
        params[selectTab[selectTabIndex].name] = 0
        selectResultsValue[selectTab[selectTabIndex].name] = ""
        for (let i = 0; i < selectTab[selectTabIndex].listValues.length; i++) {
          selectTab[selectTabIndex].listValues[i].state = false;
        }
      } else {
        console.log("======multi-select选择了其他选项=====")
        let resultData = []
        if (params[selectTab[selectTabIndex].name]) {
          resultData = params[selectTab[selectTabIndex].name]
        }
        if (!selectTab[selectTabIndex].listValues[index].state) {
          resultData.push(selectTab[selectTabIndex].listValues[index].value)
        } else {
          for (let i = 0; i < resultData.length; i++) {
            if (resultData[i] == selectTab[selectTabIndex].listValues[index].value) {
              resultData.splice(i, 1)
            }
          }
        }
        params[selectTab[selectTabIndex].name] = resultData;
        selectTab[selectTabIndex].listValues[index].state = selectTab[selectTabIndex].listValues[index].state ? false : true;
      }
    } else if (selectTab[selectTabIndex].type == 'multistage-style') {//级联
      let level = e.currentTarget.dataset.level;//选项的级别;
      let itemData = e.currentTarget.dataset.item;//选项的数据;
      let allTwoMultistageData = that.data.twoMultistageData
      let allThreeMultistageData = that.data.threeMultistageData
      // let twoMultistageData
      // let threeMultistageData
      let resultData = params[selectTab[selectTabIndex].name]
      if (index == -1) {
        console.log("======multistage-style选择了全部=====")
        if (level == "two") {
          console.log("====two-1====")
          allTwoMultistageData[selectTab[selectTabIndex].name] = null;
          allThreeMultistageData[selectTab[selectTabIndex].name] = null;
          resultData = ""
          for (let i = 0; i < selectTab[selectTabIndex].listValues.length; i++) {
            selectTab[selectTabIndex].listValues[i].state = false;
          }
        } else if (level == "three") {
          console.log("====three-1====")
          allThreeMultistageData[selectTab[selectTabIndex].name] = null;
          console.log("====resultData===", resultData)
          if (resultData.length == 3) {
            resultData.splice(2, 1)
          }
          if (resultData.length == 2) {
            resultData.splice(1, 1)
          }
          if (allTwoMultistageData[selectTab[selectTabIndex].name] && allTwoMultistageData[selectTab[selectTabIndex].name].length != 0) {
            for (let i = 0; i < allTwoMultistageData[selectTab[selectTabIndex].name].length; i++) {
              allTwoMultistageData[selectTab[selectTabIndex].name][i].state = false;
            }
          }
          // threeMultistageData = null
        } else {
          console.log("====three-2====")
          if (resultData.length == 3) {
            resultData.splice(2, 1)
          }
          if (allThreeMultistageData[selectTab[selectTabIndex].name] && allThreeMultistageData[selectTab[selectTabIndex].name].length != 0) {
            for (let i = 0; i < allThreeMultistageData[selectTab[selectTabIndex].name].length; i++) {
              allThreeMultistageData[selectTab[selectTabIndex].name][i].state = false;
            }
          }
        }
      } else {
        console.log("======multi-select选择了其他选项=====")
        if (level == "two") {
          console.log("====显示two，点击one====")
          // twoMultistageData = itemData.children
          allTwoMultistageData[selectTab[selectTabIndex].name] = itemData.children
          for (let i = 0; i < selectTab[selectTabIndex].listValues.length; i++) {
            selectTab[selectTabIndex].listValues[i].state = false;
          }
          selectTab[selectTabIndex].listValues[index].state = true
          if (!resultData) {
            resultData = [];
          }
          resultData.splice(0, 1, itemData.name)
          // threeMultistageData = null
          allThreeMultistageData[selectTab[selectTabIndex].name] = null;
          resultData.splice(2, 1)
          resultData.splice(1, 1)
        } else if (level == "three") {
          console.log("====显示three，点击two====")
          // threeMultistageData = itemData.children
          allThreeMultistageData[selectTab[selectTabIndex].name] = itemData.children
          for (let i = 0; i < allTwoMultistageData[selectTab[selectTabIndex].name].length; i++) {
            allTwoMultistageData[selectTab[selectTabIndex].name][i].state = false;
          }
          allTwoMultistageData[selectTab[selectTabIndex].name][index].state = true
          resultData.splice(1, 1, itemData.name)
          resultData.splice(2, 1)
        } else {
          console.log("====点击three====")
          for (let i = 0; i < allThreeMultistageData[selectTab[selectTabIndex].name].length; i++) {
            allThreeMultistageData[selectTab[selectTabIndex].name][i].state = false;
          }
          allThreeMultistageData[selectTab[selectTabIndex].name][index].state = true
          resultData.splice(2, 1, itemData.name)
        }
      }
      params[selectTab[selectTabIndex].name] = resultData
      console.log("==threeMultistageData===", allThreeMultistageData, allTwoMultistageData)
      that.params = params
      that.setData({ threeMultistageData: allThreeMultistageData, twoMultistageData: allTwoMultistageData, params: params, selectResultsValue: selectResultsValue })
    }
    that.params = params
    console.log("==params===", params)
    that.setData({ params: params, selectTab: selectTab, selectResultsValue: selectResultsValue})
  },
  //获取产品分类
  getServantType: function (servantTypeId) {
    var customIndex = app.AddClientUrl("/find_servant_types.html")
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
        console.log("getServantType", res.data)
        if (res.data.errcode == 0) {
          let resultData = res.data.relateObj.result
          for (let i = 0; i < resultData.length;i++){
            resultData[i].value = resultData[i].name
            resultData[i].state = false
          }
          console.log("========resultData=========", resultData)
          that.data.selectTab[0].listValues = resultData
          that.setData({ servantType: resultData, selectTab: that.data.selectTab })
        } else {
          that.setData({ servantType: that.data.servantType })
        }
        // that.data.servantType.unshift({ id: servantTypeId || 0, name: "全部" })
        for (let i = 0; i < that.data.servantType.length; i++) {
          that.data.servantType[i].colorAtive = '#888';
        }
        that.data.servantType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.data.servantType[0].active = true;
        that.setData({ servantType: that.data.servantType, currentType: that.data.servantType[0]  })
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
    let that=this;
    let onId;
    that.hiddenProInfo()
    if (event && event.currentTarget) {
      onId = event.currentTarget.dataset.type.id
      console.log('====bindTypeItem currentTarget====', onId)
    } else if (event && !event.currentTarget) {
      onId = event
      console.log('====bindTypeItem event====', onId)
    }
    for (let i = 0; i < that.data.servantType.length; i++) {
      if (that.data.servantType[i].id == onId) {
        that.data.servantType[i].active = true
        console.log(that.data.setting.platformSetting.defaultColor)
        that.data.servantType[i].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.setData({ currentType: that.data.servantType[i] })
      }
      else {
        that.data.servantType[i].active = false
        that.data.servantType[i].colorAtive = '#888';
        that.setData({ currentType: that.data.servantType[i]})
      }
    }
    that.setData({
      servantType: that.data.servantType,
    })

    that.listPage.page = 1
    that.params.page = 1
    that.params.servantTypeId = onId
    that.getServantData(that.params, 2)
    console.log("===currentType===", that.data.currentType)
  },
  getSearchservantName: function (data) {
    console.log("getSearchservantName", data);
    var servant = data.detail.value
    console.log(servant)
    this.params.servantName = servant
    this.bindservantshowWay(2);
  },
  toIndex(){
    app.toIndex()
  },
  getCenterPoint(callback){
    console.log("===getCenterPoint==")
    let that = this;
    that.mapCtx.getCenterLocation({
      success: function (res) {
        console.log('res', res)
        that.params.latitude = res.latitude;
        that.params.longitude = res.longitude;
        that.setData({
          params: that.params,
        })
        if (callback){
          callback()
        }
      }
    }) //获取当前地图的中心经纬度
  },
  regionchange(e) {
    console.log('===regionchange===',e)
    let that=this;
    if (e.type == 'end') {
      if (e.causedBy =='scale'){
        that.getScale();
      } else if(e.causedBy == 'drag') {
        console.log('====drag====');
        that.getCenterPoint(that.getServantData(that.params, 2));
        }else{
        console.log('====all====');
        that.getCenterPoint(that.getServantData(that.params, 2));
        }
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.toServantDetailMap(e.markerId);
  },
  toServantDetailMap: function (markerId){
    console.log("markerId", markerId)
    let that=this;
    for (let i = 0; i < that.data.servantData.length;i++){
      if (that.data.servantData[i].id == markerId){
        that.setData({
          servantDetail: that.data.servantData[i]
        })
        console.log("that.data.servantData[i]",that.data.servantData[i])
      }
    }
  },
  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let that=this;
    console.log("===========params==========", that.params)
    let params=''
    let link = e.currentTarget.dataset.link
    if (that.params.servantTypeId) {
      console.log("========servantTypeId==========", that.params.servantTypeId)
      if (link.indexOf("?")!=-1){
        params = "&servantTypeId=" + that.params.servantTypeId
      }else{
        params = "?servantTypeId=" + that.params.servantTypeId
      }
    }
    
    let linkUrl = e.currentTarget ? e.currentTarget.dataset.link + params : e
    app.linkEvent(linkUrl)
  },
  getScale: function () {
    console.log('====scale====')
    let that=this;
    that.mapCtx.getScale({
      success: function (res) {
        console.log("==getScale==", res)
        that.data.currentScale = res.scale
        that.getServantData(that.params, 2)
      }
    })
  },
  controltap(e) {
    console.log(e)
  },

  clickcontrol(e) {//回到定位的
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();

  },
  hiddenProInfo(e){
    console.log(e)
    this.setData({servantDetail:null})
  },/* 获取数据 */
  getServantData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/wx_find_servants.html", param)
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
        console.log(res.data)
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.servantData
        let tagArray = [];
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
          that.setData({ servantData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.relateObj.result)
          for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].tags && dataArr[i].tags != '') {
              tagArray = dataArr[i].tags.slice(1, -1).split("][")
              dataArr[i].tagArray = tagArray;
            }
          }
          that.setData({ servantData: dataArr })
        }
        console.log("that.data.servantData", that.data.servantData)
        that.setData({ markers: that.data.servantData })
        let conut = 0;
        if (that.data.markers) {
          for (let i = 0; i < that.data.markers.length; i++) {
            if (that.data.markers[i].icon) {
              that.downProIcon(that.data.markers[i].icon, function (url) {
                conut++;
                that.data.markers[i].iconPath = url;
                that.data.markers[i].width = 32;
                that.data.markers[i].height = 32;
                if (conut == that.data.markers.length) {
                  that.setData({ markers: that.data.markers })
                  console.log('==that.data.markersHave===', that.data.markers);
                }
              })
            } else {
              conut++;
              that.data.markers[i].iconPath = '../../images/icon/mapItem.png';
              that.data.markers[i].width = 32;
              that.data.markers[i].height = 32;
              if (conut == that.data.markers.length) {
                that.setData({ markers: that.data.markers })
                console.log('==that.data.markers===', that.data.markers);
              }
            }

          }
        }
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  downProIcon: function (url, callback) {
    var _this = this;
    if (app.mapProIconArray[encodeURIComponent(url)]) {
      console.log('已存在', encodeURIComponent(url))
      callback(app.mapProIconArray[encodeURIComponent(url)])
      return
    }
    wx.downloadFile({
      url: url.replace('http', 'https'),
      success: function (res) {
        console.log('下载图片', res)
        if (res.statusCode == 200) {
          callback(res.tempFilePath);
          app.mapProIconArray[encodeURIComponent(url)] = res.tempFilePath
        }
      }
    })
  },
  /* 全部参数 */
  params: {
    page: 1,
    latitude:'0',
    longitude:'0',
    servantName:"",
  },
  /* 商品显示方法 */

  bindservantshowWay: function (state) {
    let that=this;
    if (this.data.servantshowWay == 1 || state==2) {
      this.setData({ servantshowWay: 2 })
      this.getServantData(that.params, 2)
    } else{
      this.setData({ servantshowWay: 1 })
    }

  },
  listPage: {
    pageSize: 0,
    totalSize: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("options", options)
    that.setData({ options: options })
    that.initSetting();
    if (options.parentServantTypeId) {
      that.setData({ positionTab: options.parentServantTypeId })
      options.servantTypeId = options.parentServantTypeId
      that.getServantType(options.servantTypeId, that.bindTypeItem)
    } else {
      that.getServantType(options.servantTypeId)
    }
    for (let i in options) {
      for (let j in that.params) {
        if (i.toLowerCase() == j.toLowerCase()) { that.params[j] = options[i] }
      }
    }
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('==getLocation==',res)
        that.data.localPoint.latitude = res.latitude
        that.data.localPoint.longitude = res.longitude
        that.params.latitude = res.latitude
        that.params.longitude = res.longitude
        that.setData({
          params: that.params,
          localPoint: that.data.localPoint
        })
        that.getServantData(that.params, 2);
      }
    })
    that.getServantData(that.params, 2);
    console.log(that.params)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    that.mapCtx = wx.createMapContext('map')
  },
  initSetting(){
    let that=this;
    that.setData({ setting: app.setting })
    for (let i = 0; i < that.data.setting.platformSetting.categories.length; i++) {
      that.data.setting.platformSetting.categories[i].colorAtive = '#888';
    }
    that.data.setting.platformSetting.categories[0].colorAtive = that.data.setting.platformSetting.defaultColor;
    that.setData({
      setting: that.data.setting,
      properties: app.properties
    })
    console.log("properties", that.data.properties)
    wx.setNavigationBarTitle({
      title: (that.data.properties.alias_yewuyuan || "服务员")+"列表",
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
    let that=this;
    that.params.page = 1
    that.getServantData(that.params, 2)
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.params.page) {
      that.params.page++
      this.getServantData(that.params, 2);
    }
  },
})