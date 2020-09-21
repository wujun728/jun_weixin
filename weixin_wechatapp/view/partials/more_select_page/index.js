const app = getApp();
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
    showBtn: {
      type: String,
    },
    showTitle: {
      type: String,
    },
    userAddressCustomFormCommitId: {
      type: String,
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    sysWidth:"",
    selectTab:[],
    selectResultsData:{},
    selectTypeAttrResultsData:{},
    productTypePopupState:false,
    productType:null,
    curProTypeId:0,
    haveProTyeData:null,
    getProAttrsFaceUrl:'wx_get_attrs_by_product_type_id'
  },
  ready:function(){
    console.log("====jifen======", this.data.data,app.setting)
    let that=this;
    that.getProductType();
    let selectResultsData = that.data.selectResultsData
    let selectTab=[
      { title: '价格区间', type: 'price_select', listValues: '', state: false, nameOne: "startPrice", nameTwo:'endPrice' },
      { title: '商品分类', type: 'pro_type_select', listValues: '', state: false, name: "categoryId" },
      { title: '商品标签', type: 'tag_select', listValues: '', state: false, name: "tag"  },
      { title: '营销标志', type: 'sale_flag_select', listValues: '', state: false, name: "saleTypeId" },
      { title: '特卖分类', type: 'special_sale_type_select', listValues: '', state: false, name: "itemSpecialSaleType"  },
    ] 
    for (let i = 0; i < selectTab.length;i++){
      if (selectTab[i].type == 'price_select'){
        selectResultsData[selectTab[i].nameOne] = ''
        selectResultsData[selectTab[i].nameTwo] = ''
      }else{
        selectResultsData[selectTab[i].name] = ''
      }
      if (app.setting && app.setting.platformSetting.tagsMap['产品'].length!=0 && selectTab[i].type=='tag_select') {
        selectTab[i].listValues=[]
        let listValues = app.setting.platformSetting.tagsMap['产品'];
        console.log("=======listValues=========", listValues)
        for (let j = 0; j < listValues.length; j++) {
          listValues[j].state = false;
          listValues[j].value = listValues[j].tagName;
          listValues[j].id = listValues[j].tagName;
        }
        selectTab[i].listValues = listValues
      } else if (selectTab[i].type == 'sale_flag_select') {
        selectTab[i].listValues = [
          { value: '新品', id: -100, state: false },
          { value: '热销', id: -101, state: false },
          { value: '折扣', id: -102, state: false },
          { value: '精品', id: -103, state: false },
        ]
      } else if (selectTab[i].type == 'special_sale_type_select') {
        selectTab[i].listValues = [
          { value: '满减特卖', id:1, state: false },
          { value: '买赠特卖', id:2, state: false },
          { value: '限购特卖', id:3, state: false },
          { value: '日限购', id:4, state: false },
          { value: '周限购', id:5, state: false },
          { value: '月限购', id:6,state: false },
        ]
      }
    }
    console.log("=======selectTab=========", selectTab, selectResultsData)
    that.setData({
      selectTab:selectTab,
      sysWidth: app.globalData.sysWidth,
      setting:app.setting,
      selectResultsData: selectResultsData,
    });
  },
  methods: {
    clearSelect: function () {
      let that = this;
      let selectTab = that.data.selectTab;
      let selectResultsData = that.data.selectResultsData;
      let selectTypeAttrResultsData = that.data.selectTypeAttrResultsData;
      let haveProTyeData = null
      wx.showModal({
        title: '提示',
        content: '主人~您确定要重置嘛?',
        success: function (res) {
          if (res.confirm) {
            for (let i in selectResultsData){
              selectResultsData[i]=''
            }
            selectTypeAttrResultsData={};
            let selectTabCopy = [];
            for (let i = 0; i < selectTab.length; i++) {
              console.log("==selectTab[i].type===", selectTab[i].type)
              if (selectTab[i].type.indexOf('attr_') == -1) {
                console.log("==selectTab[i]===", selectTab[i])
                selectTabCopy.push(selectTab[i])
              }
            }
            selectTab = selectTabCopy;
            for (let i = 0; i < selectTab.length;i++){
              for (let j = 0; j < selectTab[i].listValues.length; j++){
                selectTab[i].listValues[j].state=false;
              }
            }
            that.setData({ selectResultsData: selectResultsData, selectTypeAttrResultsData: selectTypeAttrResultsData, selectTab: selectTab, haveProTyeData: haveProTyeData});
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    sureSelect: function () {
      console.log("============sureSelect==========");
      let that=this;
      let selectTab = that.data.selectTab;
      let selectResultsData = that.data.selectResultsData;
      let selectTypeAttrResultsData = that.data.selectTypeAttrResultsData;
      let attrKeyValues=[]
      for (let i in selectTypeAttrResultsData){
        let str = selectTypeAttrResultsData[i].name + '-' + (selectTypeAttrResultsData[i].value || '')
        attrKeyValues.push(str) 
      }
      selectResultsData['attrKeyValues'] = attrKeyValues.join("|_|")
      console.log("============selectResult==========", selectResultsData, selectTab, selectTypeAttrResultsData);
      that.setData({ selectResultsData: selectResultsData});
      console.log("设置成功", that.data.selectResultsData)
      let params=''
      for (let i in selectResultsData){
        if (selectResultsData[i]){
          params += (i + "=" + selectResultsData[i] + '&')
        }
      }
      params = params.slice(0,-1)
      console.log("params", params);
      let link = (app.properties.style_product_list ? app.properties.style_product_list +".html" : "search_product.html") +'?' + params
      app.linkEvent(link)
      // let pages = getCurrentPages();//当前页面
      // let prevPage = pages[pages.length - 2];//上一页面
      // prevPage.setData({//直接给上移页面赋值
      //   selectResultsData: that.data.selectResultsData,
      // });
      // wx.navigateBack(
      //   { delta: 1, }
      // )
    },
    savePriceFun:function(e){
      console.log("savePriceFun",e)
      let selectResultsData = this.data.selectResultsData;
      let type = e.currentTarget.dataset.type
      let value = Number(e.detail.value) 
      if (type =='startPrice'){
        selectResultsData['startPrice'] = value
      } else if (type == 'endPrice') {
        selectResultsData['endPrice'] = value
      }
      console.log("selectResultsData", selectResultsData)
      this.setData({ selectResultsData: selectResultsData})
    },
    selectResult:function(e){
      console.log("============selectResult==========",e);
      let that = this;
      let index = e.currentTarget.dataset.index;
      let type = e.currentTarget.dataset.type;
      let selectTab = that.data.selectTab;
      let selectResultsData = that.data.selectResultsData;
      let selectTypeAttrResultsData = that.data.selectTypeAttrResultsData;
      let fatherIndex = e.currentTarget.dataset.father;
      let value = ''
      let haveProTyeData = null
      for (let i = 0; i < selectTab[fatherIndex].listValues.length; i++) {
        selectTab[fatherIndex].listValues[i].state = false
      }
      if (index!='-1'){
        value = selectTab[fatherIndex].listValues[index].id
        selectTab[fatherIndex].listValues[index].state = true
        
      } else {
        value = ''
      }
      if (type == 'attr_block'){
        console.log("value", value)
        selectTypeAttrResultsData[selectTab[fatherIndex].name].value = value
      } else if (type == 'type_select'){
        selectResultsData['categoryId'] = value
        if (value){
          haveProTyeData = { name: selectTab[fatherIndex].listValues[index].name, id: selectTab[fatherIndex].listValues[index].id }
          that.getProductTypeAttrData(value)
        }else{
          console.log("产品类别不限")
          let selectTabCopy = [];
          for (let i = 0; i < selectTab.length; i++) {
            console.log("==selectTab[i].type===", selectTab[i].type)
            if (selectTab[i].type.indexOf('attr_') == -1) {
              console.log("==selectTab[i]===", selectTab[i])
              selectTabCopy.push(selectTab[i])
            }
          }
          selectTab = selectTabCopy;
        }
        that.setData({ haveProTyeData: haveProTyeData })
      }else{
        selectResultsData[selectTab[fatherIndex].name] = value
      }
      console.log("============selectResult==========", selectResultsData, selectTab, selectTypeAttrResultsData);
      that.setData({ selectTab: selectTab, selectResultsData: selectResultsData, selectTypeAttrResultsData: selectTypeAttrResultsData, })
    },
    selectPopupType:function(){
      let that=this;
      that.setData({ productTypePopupState:true})
    },
    getChilrenPopupType(e) {
      console.log("======getChilrenPopupType=========",e)
      let that=this
      let selectTab = that.data.selectTab;
      let selectResultsData = this.data.selectResultsData;
      let listValues = selectTab[1].listValues
      if (e.detail.id){
        for (let i = 0; i < selectTab[1].listValues.length; i++) {
          selectTab[1].listValues[i].state = false
          if (selectTab[1].listValues[i].id == e.detail.id){
            selectTab[1].listValues[i].state=true
          }
        }
        selectResultsData['categoryId'] = e.detail.id
        that.getProductTypeAttrData(e.detail.id)
        console.log("======selectResultsData=========", selectResultsData, selectTab)
        that.setData({ selectResultsData: selectResultsData, curProTypeId: e.detail.id, selectTab: selectTab, haveProTyeData: { name: e.detail.name, id: e.detail.id}})

      }
      that.setData({
        productTypePopupState: false,
      })
    },
    //获取产品分类的相关属性
    getProductTypeAttrData: function (id) {
      console.log("====getProductTypeAttrData=====", id);
      var that = this
      let selectTab = that.data.selectTab;
      let selectTabCopy=[];
      for (let i = 0; i < selectTab.length; i++) {
        console.log("==selectTab[i].type===", selectTab[i].type)
        if (selectTab[i].type.indexOf('attr_') == -1) {
          console.log("==selectTab[i]===", selectTab[i])
          selectTabCopy.push(selectTab[i])
        }
      }
      selectTab = selectTabCopy;
      let selectTypeAttrResultsData = {}
      let selectResultsData = that.data.selectResultsData
      var customIndex = app.AddClientUrl("/wx_get_attrs_by_product_type_id.html", { type: id})
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("==res====", res.data)
          if (res.data.errcode == 0) {
            let productTypeAttrData = res.data.relateObj;
            let index=0;
            for (let i = 0; i < productTypeAttrData.length;i++){
              if (productTypeAttrData[i].attrType == 3 && productTypeAttrData[i].attrValue){
                selectTypeAttrResultsData['attr_' + productTypeAttrData[i].id] = { name: productTypeAttrData[i].attrShowName, value:''}
                let obj = { title: productTypeAttrData[i].attrShowName, type: 'attr_value', listValues: '', state: false, name: 'attr_' + productTypeAttrData[i].id };
                let listValues = productTypeAttrData[i].attrValue.split(',')
                for (let j = 0; j < listValues.length; j++) {
                  let listValuesObj = {};
                  listValuesObj.state = false;
                  listValuesObj.value = listValues[j];
                  listValuesObj.id = listValues[j];
                  listValues[j] = listValuesObj
                }
                obj.listValues = listValues
                console.log("=====index====", index, selectTypeAttrResultsData)
                selectTab.splice(2 + index, 0, obj)
                index++
                // selectTabTwo.splice(selectTabTwo.length, 0, obj)
              }
            }
            // selectTypeAttrResultsData['attrKeyValues'] = selectTypeAttrResultsData['attrKeyValues'].join("|_|")
            console.log("=====selectTypeAttrResultsData====", selectTypeAttrResultsData, selectTab)
            that.setData({ selectTab: selectTab, selectTypeAttrResultsData: selectTypeAttrResultsData})
          } else {
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
    //获取产品分类
    getProductType: function (e, typeText) {
      console.log("====e=====", e);
      var that = this
      var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html")
      // wx.showLoading({
      //   title: 'loading'
      // })
      app.showToastLoading('loading', true)
      wx.request({
        url: customIndex.url,
        header: app.header,
        success: function (res) {
          wx.hideLoading()
          console.log("==res====", res.data)
          if (res.data.errcode == 0) {
            let productType = res.data.relateObj;
            let selectTab = that.data.selectTab;
            for (let i = 0; i < selectTab.length; i++) {
              if (selectTab[i].type == 'pro_type_select') {
                selectTab[i].listValues = []
                let listValues = productType
                console.log("=======listValues=========", listValues)
                for (let j = 0; j < listValues.length; j++) {
                  listValues[j].state = false;
                  listValues[j].value = listValues[j].name;
                  listValues[j].id = listValues[j].id;
                }
                selectTab[i].listValues = listValues
                
              }
            }
            that.setData({
              productType: productType,
              selectTab: selectTab, 
            })
            console.log("productType", that.data.productType)
          } else {
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
    // 这里是一个自定义方法
    buttom: function () {
      // console.log("1111111111111")
      app.wxLogin(1011)
      // wx.chooseAddress({
      //   success: function (res) {
      //     console.log(res.userName)
      //     console.log(res.postalCode)
      //     console.log(res.provinceName)
      //     console.log(res.cityName)
      //     console.log(res.countyName)
      //     console.log(res.detailInfo)
      //     console.log(res.nationalCode)
      //     console.log(res.telNumber)
      //   }
      // })
    },
    tolinkUrl: function (e) {
      console.log(e.currentTarget.dataset.info)
      let info = e.currentTarget.dataset.info
      let jifenId = info.id
      let productId = info.productId
      let couponId = info.couponId
      let jifenNum = info.needJifen
      let jifenCount = info.count
      if (productId) {
        var a = "jifen_product_detail.html?type=jifen&productId=" + productId + '&jifenNum=' + jifenNum + '&jifenId=' + jifenId + '&jifenCount=' + jifenCount;
      }
      if (couponId) {
        var a = "coupon_detail.html?type=jifen&couponId=" + couponId;
      }
      app.linkEvent(a);
    },
  },
})