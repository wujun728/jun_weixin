const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
      distanceObj:{},

    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    sysWidth: "",
    arr: [],
    currentTab: 0,
    currentPageName: "",
    show: false,
    scroll:0,
    distance:300,
    firstDistance:'',
  },

  ready: function () {
    let that = this;
    console.log("====tab====", that.data.data)
    that.setData({
      sysWidth: app.globalData.sysWidth,
      arr: that.data.data.jsonData.tabs
    });
    let firstTabData = that.data.data.jsonData.tabs[0];
    let linkUrl = firstTabData.linkUrl;
    let pageName = linkUrl.replace("custom_page_", "").replace(".html", "")
    let sendData = JSON.stringify({ title: 'noTitle', url: pageName })
    if (pageName!='index'){
      that.setData({
        currentTab: 0,
        show: true,
        sendData: sendData
      })
    }
    that._observer = wx.createIntersectionObserver(that)
    that._observer
      .relativeTo('.tab-h')
      .observe('.tab-item', (res) => {
        // console.log("createIntersectionObserver", res.boundingClientRect.top);
        if (!that.data.firstDistance) {
          that.setData({
            firstDistance: res.boundingClientRect.top,
          })
        }
        // console.log("==firstDistance====", that.data.firstDistan
      })
  },


  methods: {
    // 点击标题切换当前页时改变样式
    renderPage: function (linkUrl, index){
      let that = this;
      that.setData({ show: false })
      // wx.showLoading({
      //   title: 'loaing',
      // })
      app.showToastLoading('loading', true)
      let pageName = linkUrl.replace("custom_page_", "").replace(".html", "")
      console.log("这是值pageName currentTab", pageName, that.data.currentTab)
      console.log("index", index)
      console.log("currentTab", that.data.currentTab, that.data.currentTab==index)
      let sendData = JSON.stringify({ title: 'noTitle', url: pageName })
      if (that.data.currentTab == index) {
        console.log("当前")
        that.setData({ show: true })
        wx.hideLoading();
        return false;
      } else {
        console.log("其他")
        that.setData({
          currentTab: index,
          show: true,
          sendData: sendData
        })
      }
      if (that.data.show) {
        wx.hideLoading();
      }
      console.log("======currentPageName=====", that.data.currentPageName)
    },
    swichNav: function (e) {
      let that = this;
      console.log("===e====", e)
      let index = e.target.dataset.index;
      let currentItem = e.target.dataset.item;
      let linkUrl = currentItem.linkUrl;
      that.renderPage(linkUrl, index)
    },
    scrollTo:function(object){
      let that=this;
      // console.log("....scroll recieve in- tab222---", object.scrollTop);
      that.setData({
        scroll: object.scrollTop
      })
     
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
      if (this.data.currentTab > 4) {
        this.setData({
          scrollLeft: 300
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
    },
  },
})