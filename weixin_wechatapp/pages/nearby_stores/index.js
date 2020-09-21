const app = getApp()
Page({

  /**
   * 页面的初始数据 
   */
  // arr不能为空的原因：组件的ready事件在页面的加载事件之后，如果为空，那么就会先把arr判断为空。页面上就会先跳出来暂无门店。然后才会去更改
  data: {
     arr:null,
     reqDataState:false,
     reqType:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clickCatch:function(e){
    console.log(e.currentTarget.dataset.info)
    var info = e.currentTarget.dataset.info;
    let latitude = info.latitude;
    let longitude = info.longitude;
    let name = info.name;
    let address = info.address;
    // 判断金纬度是否为空
    if (latitude == "" || longitude==""){
      console.log("判断金纬度是否为空");
      wx.showModal({
        title: '提示',
        content: '主人~该门店没有设置位置哦!',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    else{
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 12,
        name: name,
        address: address,
      })
    }
  },
  onLoad: function (option) {
    console.log("===option===",option)
    let that=this;
    if (option.order){
      that.setData({ reqType:'order'})
    }else{
      that.setData({ reqType: 'store' })
    }
    that.getMendianData()
  },
  getMendianData: function (){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude1 = res.latitude
        var longitude1 = res.longitude;
        console.log(longitude1 + "..............." + latitude1)
        let menDian = {
          longitude: longitude1,
          latitude: latitude1
        }
        that.setData({
          menDian: menDian
        })
        // longitude 经度        
        // 获取门店的样式
        that.getData(that.data.menDian);

      },
      fail: function (err) {
        console.log(err)
        let menDian = {
          longitude:0,
          latitude: 0
        }
        // longitude 经度        
        // 获取门店的样式
        that.getData(menDian);
      },

    })
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  getData: function (menDian,isAdd){
    let that=this;
    if (!isAdd){isAdd=2}
    let la1 = that.data.menDian.latitude
    let lo1 = that.data.menDian.longitude
    console.log("========menDian===========", menDian)
    let menDianYangShi = app.AddClientUrl("/find_mendians.html", menDian, 'get')
    wx.request({
      url: menDianYangShi.url,
      data: menDianYangShi.params,
      header: app.headerPost,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.errcode == "-1") {
          console.log('-------')
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }else {
          console.log('========')
          that.listPage.pageSize = res.data.relateObj.pageSize
          that.listPage.curPage = res.data.relateObj.curPage
          that.listPage.totalSize = res.data.relateObj.totalSize
          let dataArr = that.data.arr
          if (isAdd == 1) {
            dataArr = []
          }
          if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
            that.setData({ arr: null })
          } else {
            if (dataArr == null) { dataArr = [] }
            dataArr = dataArr.concat(res.data.relateObj.result)
            console.log('===1111====', dataArr)
            for (let i = 0; i<dataArr.length;i++){
              if (dataArr[i].latitude && dataArr[i].latitude != 0 && dataArr[i].longitude&&dataArr[i].longitude != 0){
                dataArr[i].distance = app.getDistance(la1, lo1, dataArr[i].latitude, dataArr[i].longitude)
              }
            }
            that.setData({ arr: dataArr })
            console.log('===1111====', that.data.arr)
          }
        }
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      },
      complete: function () {
        that.setData({ reqState: true })
      },
    })
  },
  // 设置门店
  setUpMenDian: function (MenDianID) {
    var id = MenDianID
    let menDianParameter = {
      mendianId: id
    }

    let menDianYangShi = app.AddClientUrl("/location_mendian.html", menDianParameter, 'get')
    wx.request({
      url: menDianYangShi.url,
      data: menDianYangShi.params,
      header: app.headerPost,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.errcode == "-1") {
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
        else {
          console.log("设置成功")

        }
      }
    })
  },
  click: function (e) {
    let that=this;
    if (that.data.reqType == 'order') {
      console.log("订单选择门店")
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      prevPage.setData({//直接给上移页面赋值
        selectStore: e.currentTarget.dataset.info,
      });
    } else {
      console.log("变化门店")
      var info = e.currentTarget.dataset.info;
      app.currentMendianComponentCallback(info);
      console.log(info);
      this.setUpMenDian(info.id)
    }
    wx.navigateBack({
      delta: 1,
    })
    return;
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
    that.listPage.page=1
    that.getData(that.data.menDian, 1)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this
    if(that.data.reqState){
      that.setData({ reqState:false})
      if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
        that.listPage.page++
      // 组件内的事件
      that.getData(that.data.menDian,1)
    } else {
        console.log('到底了', that.listPage.curPage)
    }
    }
  },

})
