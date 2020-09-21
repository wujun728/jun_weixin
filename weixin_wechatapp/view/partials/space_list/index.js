const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: Object,
      value: 'default value',
    },
    params: {
      type: Object,
      value: {},
    },
  },
  data: {
    setting: null, // setting   
    spaceData: [], // 商品数据 
    sysWidth: 320,//图片大小
    positionTab:'',
    SpaceshowWay: 2, // SpaceshowWay列表显示方法 (默认显示地图)
    localPoint: { longitude: '0', latitude:'0'},
    spaceDetail: null,
    limitState: 0,
    markers: [{
      iconPath: "../../images/icon/mapItem.png",
      id: 0,
      width:20,
      heigth:20,
      latitude: 26.060701172100124,
      longitude: 119.30130341796878,
    }],
    /* 全部参数 */
    params: {
      name: "",
      addressStr: "",
      page: 1,
      latitude: '0',
      longitude: '0',
    },
    listPage: {
      page: 1,
      pageSize: 0,
      totalSize: 0,
      curpage: 1
    },
  },
  ready: function () {
    let that = this;
    console.log("====space-data=====", that.data.data);
    if (that.data.data.jsonData&&that.data.data.jsonData.count){
      that.setData({ limitState: that.data.data.jsonData.count})
    }
    console.log("====space-limitState=====", that.data.limitState)
    console.log("====space-params=====", that.data.params)
    let options = that.data.data;
    that.initSetting();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        that.data.localPoint.latitude = res.latitude
        that.data.localPoint.longitude = res.longitude
        that.data.params.latitude = res.latitude
        that.data.params.longitude = res.longitude
        console.log("options", options)
        if (options.spaceTypeId) {
          that.setData({ positionTab: options.spaceTypeId })
          options.categoryId = options.spaceTypeId
          that.bindTypeItem(options.spaceTypeId)
        }
        if (!!options.forceSearch && options.forceSearch == 2) {
          that.setData({ SpaceshowWay: 2 })
        } else {
          that.setData({ SpaceshowWay: 2 })
        }
        for (let i in options) {
          for (let j in that.data.params) {
            if (i.toLowerCase() == j.toLowerCase()) { that.data.params[j] = options[i] }
          }
        }
        that.setData({
          params: that.data.params,
          localPoint: that.data.localPoint
        })
        console.log(that.data.params)
        that.getData(that.data.params);
      }
    })
  },
  methods: {
    //获取产品分类
    getSpaceType: function (parentCategoryId,categoryId,callback){
      var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: parentCategoryId})
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
          console.log("getSpaceType",res.data)
          if (res.data.errcode==0){
            that.setData({ spaceType: res.data.relateObj })
          }else{
            that.setData({ spaceType: that.data.spaceType })
          }
          that.data.spaceType.unshift({ id: categoryId || parentCategoryId,name:"全部"})
          for (let i = 0; i < that.data.spaceType.length; i++) {
            that.data.spaceType[i].colorAtive = '#888';
          }
          that.data.spaceType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
          that.data.spaceType[0].active = true;
          that.setData({ spaceType: that.data.spaceType })
          wx.hideLoading()
        },
        fail: function (res) {
          console.log("fail")
          wx.hideLoading()
          app.loadFail()
        }
      })
    },
    toIndex(){
      app.toIndex()
    },
    clickcontrol(e) {//回到定位的
      let mpCtx = wx.createMapContext("map");
      mpCtx.moveToLocation();
      
    },
    getCenterPoint(callback){
      let that = this;
      var mapCtx = wx.createMapContext('map')
      mapCtx.getCenterLocation({
        success: function (res) {
          console.log('res', res)
          that.data.params.latitude = res.latitude;
          that.data.params.longitude = res.longitude;
          that.setData({
            params: that.data.params,
          })
          if (callback){
            callback
          }
        }
      }) //获取当前地图的中心经纬度
    },
    regionchange(e) {
      console.log('===regionchange===',e)
      if (e.type == 'end') {
        if (e.causedBy =='scale'){
          console.log('====scale====')
        } else if(e.causedBy == 'drag') {
          console.log('====drag====');
          this.getCenterPoint(this.getData(this.data.params));
          }else{
          console.log('====all====');
          this.getCenterPoint(this.getData(this.data.params));
          }
      }
    },
    markertap(e) {
      console.log(e.markerId)
      this.toSpaceDetailMap(e.markerId);
    },
    controltap(e) {
      console.log(e)
    },
    hiddenProInfo(e){
      console.log(e)
      this.setData({spaceDetail:null})
    },
    /* 点击分类大项 */
    bindTypeItem: function (event) {
      let onId;
      if (event && event.currentTarget){
        onId = event.currentTarget.dataset.type.id
        console.log('====bindTypeItem currentTarget====',onId)
      } else if (event && !event.currentTarget){
        onId = event
        console.log('====bindTypeItem event====',onId)
      }
      console.log(event)
      console.log("this.data.setting.platformSetting",this.data.setting)
      for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
        if (this.data.setting.platformSetting.categories[i].id == onId ) {
          this.data.setting.platformSetting.categories[i].active = true
          console.log(this.data.setting.platformSetting.defaultColor)
          this.data.setting.platformSetting.categories[i].colorAtive =this.data.setting.platformSetting.defaultColor;
        }
        else {
          this.data.setting.platformSetting.categories[i].active = false
          this.data.setting.platformSetting.categories[i].colorAtive = '#888';
        }
      }
      this.setData({
        setting: this.data.setting,
      })

      this.data.listPage.page = 1
      this.data.params.page = 1

      if (onId == "all") {

        this.data.params.categoryId = ''
        this.getData(this.params)
      } else {
        this.data.params.categoryId = onId
        this.getData(this.data.params)
      }
    },
    /* 获取数据 */
    getData: function (param) {
      var that = this
      let la1 = that.data.localPoint.latitude
      let lo1 = that.data.localPoint.longitude
      var customIndex = app.AddClientUrl("/wx_find_asset_space.html", param)
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          that.data.listPage.pageSize = res.data.relateObj.pageSize
          that.data.listPage.curPage = res.data.relateObj.curPage
          that.data.listPage.totalSize = res.data.relateObj.totalSize
          let dataArr = that.data.spaceData
          let tagArray=[];
          if (param.page==1) {
            dataArr = []
          }
          if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
            that.setData({ spaceData: null })
          } else {
            if (dataArr == null) { dataArr = [] }
            dataArr = dataArr.concat(res.data.relateObj.result)
            for (let i = 0; i < dataArr.length; i++) {
              if (dataArr[i].tags && dataArr[i].tags!=''){
                tagArray = dataArr[i].tags.slice(1,-1).split("][")
                dataArr[i].tagArray = tagArray;
              }
            }
            for (let i = 0; i < dataArr.length; i++) {
              if (dataArr[i].latitude && dataArr[i].latitude != 0 && dataArr[i].longitude && dataArr[i].longitude != 0) {
                dataArr[i].distance = app.getDistance(la1, lo1, dataArr[i].latitude, dataArr[i].longitude)
              }
            }
            that.setData({ spaceData: dataArr })
          }
          that.setData({ markers: that.data.spaceData })
          let conut=0;
          if (that.data.markers) {
            for (let i = 0; i < that.data.markers.length; i++) {
              if (that.data.markers[i].categoryIcon) {
                that.downProIcon(that.data.markers[i].categoryIcon,function(url){
                  conut++;
                  that.data.markers[i].iconPath = url;
                  that.data.markers[i].width=32;
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
    downProIcon:function(url,callback){
      var _this = this;
      if (app.mapProIconArray[encodeURIComponent(url)]){
        console.log('已存在', encodeURIComponent(url))
        callback(app.mapProIconArray[encodeURIComponent(url)])
        return
      }
      wx.downloadFile({ 
        url: url.replace('http', 'https'),
        success: function (res) {
          console.log('下载图片',res)       
          if (res.statusCode == 200) {
            callback(res.tempFilePath);   
            app.mapProIconArray[encodeURIComponent(url)] = res.tempFilePath     
          }      
        }    
      })    
    },
    /* 查找商品 */
    getSearchSpaceName: function (params) {
      console.log("====getSearchSpaceName====", params)
      var that = this
      that.getData(params)
    },
    /* 商品显示方法 */

    bindSpaceshowWay: function () {
      if (this.data.SpaceshowWay == 1) {
        this.setData({ SpaceshowWay: 2 })
      } else{
        this.setData({ SpaceshowWay: 1 })
      }

    },
    /* 组件事件集合 */

    // 定位
    toNavigate: function (e) {
      console.log("===toNavigate=====",e)
      let itemInfo = e.currentTarget.dataset.info;
      let latitude = itemInfo.latitude;
      let longitude = itemInfo.longitude;
      let name = itemInfo.name;
      let address = itemInfo.province + itemInfo.city + itemInfo.area + itemInfo.address;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,
        name: name,
        address: address
      })
    },
    tolinkUrl: function (e) {
      let linkUrl = e.currentTarget.dataset.link
      app.linkEvent(linkUrl)
    },
    toSpaceDetail: function (event) {
      console.log("--------toSpaceDetail------", event)
      console.log(event.currentTarget.dataset.info)
      var info = event.currentTarget.dataset.info
      let id;
      if (info.spaceId){
        id = info.spaceId
      }else{
        id = info.id
      }
      wx.navigateTo({
        url: '../spaceDetail/index?id=' + id ,
      })
    },
    toSpaceDetailMap: function (id) {
      console.log("--------toSpaceDetailMap------")
      console.log(id)
      var param = { spaceId: id}
      let customIndex = app.AddClientUrl("/space_detail.html", param)

      var that = this
      that.setData({
        spaceDetail: null
      })
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          console.log(res.data)
          that.setData({
            spaceDetail: res.data
          })
        },
        fail: function (res) {
          console.log("fail")
          app.loadFail()
        },
        complete: function () {
        },
      })
    },
    initSetting(){
      this.setData({ setting: app.setting })
      for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
        this.data.setting.platformSetting.categories[i].colorAtive = '#888';
      }
      this.data.setting.platformSetting.categories[0].colorAtive = this.data.setting.platformSetting.defaultColor;
      this.setData({
        setting: this.data.setting,
      })
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