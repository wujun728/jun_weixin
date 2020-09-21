/**
 * The MIT License (MIT)
 * 下拉刷新上拉加载
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

//mocklist 模拟数据库数据表数据
var mocklist = require("./mocklist.js").mocklist;
//代码实例供参考
// pages/pullReachForPage/pullReachForPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ispro:false,//是否在请求中
    current:1,//页数，开始是1从第一页开始请求
    size:20,//请求的个数，可自定义设置
    isnext:true,//是否有下一页
    list:[]//接口实际数据
  },
  //模拟后台返回数据
  SEVER_PHP: function (objs){
    var that=this;
    var res={};
    setTimeout(function(){
      res.current = objs.current;//第几页
      res.allcount = mocklist.length;//总记录个数
      res.allpage = Math.ceil(mocklist.length / objs.size)//总页数
      res.list = mocklist.slice((objs.current - 1) * objs.size, (objs.current - 1) * objs.size + objs.size);//实际数据
      res.isnext = (objs.current - 1) * objs.size + objs.size > mocklist.length ? false : true//是否有下一页
      objs.success(res);
    },500);
   
  },
  //ajax请求数据  依据实际请求进行修改
  $_get: function (current, size, success, err){
      var that = this;
      that.SEVER_PHP({
        current: current,
        size: size,
        success: function (res) {
          console.log(res, "接口返回结果");
          success();//回调
          that.setData({ list: that.data.list.concat(res.list) })//接口实际数据
          that.setData({ current: res.current })//第几页
          that.setData({ isnext: res.isnext })//是否有下一页
          setTimeout(function(){//避免过快请求
            that.setData({ ispro: false })//标记不在请求中
          },1000) 
          
        },
        err: function () {
          err();//回调
          setTimeout(function () {//避免过快请求
            that.setData({ ispro: false })//标记不在请求中
          }, 1000)
          
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //第一页数据
    that.setData({ ispro: true })//标记在请求中
    wx.showToast({
      mask: true,
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
    that.$_get(
      that.data.current, 
      that.data.size
      ,function(){
        console.log("第1页加载成功")
        wx.showToast({
          mask:true,
          title: '加载成功',
          icon: 'success',
          duration: 500
        })
      },
      function(){
        console.log("第1页加载失败")
        wx.showToast({
          mask: true,
          title: '加载失败',
          icon: 'none',
          duration: 500
        })
      })

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
    var that = this
    if (!that.data.ispro) {//没有在请求中，开始加载数据
      that.setData({ current:1})
        //第一页数据
      that.setData({ ispro: true })//标记在请求中
      wx.showToast({
        mask: true,
        title: '加载中...',
        icon: 'loading',
        duration: 500
      })
        that.$_get(
          that.data.current ,
          that.data.size
          , function () {
            //刷新操作，清空数据
            that.setData({ list: [] })
            console.log("第1页加载成功")
            wx.showToast({
              mask: true,
              title: '加载成功',
              icon: 'success',
              duration: 500
            })
            wx.stopPullDownRefresh()//停止当前页面下拉刷新。
          },
          function () {
            console.log("第1页加载失败")
            wx.showToast({
              mask: true,
              title: '加载失败',
              icon: 'none',
              duration: 500
            })
            wx.stopPullDownRefresh()//停止当前页面下拉刷新。
          })
  
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    if (!that.data.ispro){//没有在请求中，开始加载数据
      if (that.data.isnext){//有下一页数据
        //下一页数据
        that.setData({ ispro: true })//标记在请求中
        wx.showToast({
          mask: true,
          title: '加载中...',
          icon: 'loading',
          duration: 500
        })
        //触底操作，追加一页
        var addpage = that.data.current + 1;
        that.$_get(
          addpage,
          that.data.size
          , function () {
            console.log("第" + addpage +"页加载成功")
            wx.showToast({
              mask: true,
              title: '加载成功',
              icon: 'success',
              duration: 500
            })
          },
          function () {
            console.log("第" + addpage + "页加载失败")
            wx.showToast({
              mask: true,
              title: '加载失败',
              icon: 'none',
              duration: 500
            })
          })
      }else{
        console.log("没有数据了")
        wx.showToast({
          mask: true,
          title: '没有数据了',
          icon: 'none',
          duration: 500
        })
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})