/**
 * The MIT License (MIT)
 * 锚点定位及跳转
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/anchor/anchor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_item_h:60,//菜单元素高度,来自css设置
    box_itemh_h: 30,//内容区菜单头高度,来自css设置
    box_itemc_h: 90,//内容区每项高度,来自css设置
    scrollTop:0,//菜单滚动条默认位置
    navlistIdx: "id1",//菜单默认标记位置
    navlist:[
      { id: "id1", name: "菜单1" },
      { id: "id2", name: "菜单2" },
      { id: "id3", name: "菜单3" },
      { id: "id4", name: "菜单4" },
      { id: "id5", name: "菜单5" },
      { id: "id6", name: "菜单6" },
      { id: "id7", name: "菜单7" },
      { id: "id8", name: "菜单8" },
      { id: "id9", name: "菜单9" },
      { id: "id10", name: "菜单10" },
      { id: "id11", name: "菜单11" },
      { id: "id12", name: "菜单12" },
      { id: "id13", name: "菜单13" },
      { id: "id14", name: "菜单14" }
    ],
    toView: "id1",//内容区默认位置
    datalist: [
      {
        id: "id1", 
        name: "菜单1", 
        list: [
          { id: "id1-subid01", name: "菜单1-1", val: "饿哦都会很好11111111" },
          { id: "id1-subid01", name: "菜单1-2", val: "饿哦都会很好11111111" },
          { id: "id1-subid02", name: "菜单1-3", val: "2222222222222" }
        ]
      },
      {
        id: "id2",
        name: "菜单2",
        list: [
          { id: "id2-subid01", name: "菜单1-1", val: "饿哦都2222会很好" },
          { id: "id2-subid02", name: "菜单1-2", val: "222ads 22" }
        ]
      },
      {
        id: "id3",
        name: "菜单3",
        list: [
          { id: "id3-subid01", name: "菜单1-1", val: "饿哦都99999会很好" },
          { id: "id3-subid01", name: "菜单1-22", val: "饿哦都99999会很好" },
          { id: "id3-subid02", name: "菜单1-2", val: "2228asdad打底衫22222" }
        ]
      },
      {
        id: "id4",
        name: "菜单4",
        list: [
          { id: "id4-subid01", name: "菜单1-1", val: "阿萨德" },
          { id: "id4-subid02", name: "菜单1-2", val: "222222阿斯顿撒啊啊啊2222222" }
        ]
      },
      {
        id: "id5",
        name: "菜单5",
        list: [
          { id: "id5-subid01", name: "菜单1-1", val: "呵呵呵呵" },
          { id: "id5-subid02", name: "菜单1-2", val: "oooooo" }
        ]
      },
      {
        id: "id6",
        name: "菜单6",
        list: [
          { id: "id6-subid01", name: "菜单1-1", val: "兰陵缭乱" },
          { id: "id6-subid02", name: "菜单1-2", val: "脦" }
        ]
      },
      {
        id: "id7",
        name: "菜单7",
        list: [
          { id: "id7-subid01", name: "菜单1-1", val: "巬" },
          { id: "id7-subid02", name: "菜单1-2", val: "倒萨" }
        ]
      },
      {
        id: "id8",
        name: "菜单8",
        list: [
          { id: "id8-subid01", name: "菜单1-1", val: "的少时诵诗书" },
          { id: "id8-subid02", name: "菜单1-2", val: "都好似好大哈迪斯" }
        ]
      },
      {
        id: "id9",
        name: "菜单9",
        list: [
          { id: "id9-subid01", name: "菜单1-1", val: "大撒旦" },
          { id: "id9-subid02", name: "菜单1-2", val: "大苏打大大大大" }
        ]
      },
      {
        id: "id10",
        name: "菜单10",
        list: [
          { id: "id10-subid01", name: "菜单1-1", val: "理论领域i" },
          { id: "id10-subid02", name: "菜单1-2", val: "实打实的" }
        ]
      },
      {
        id: "id11",
        name: "菜单11",
        list: [
          { id: "id11-subid01", name: "菜单1-1", val: "饿哦都88888888会很好" },
          { id: "id11-subid02", name: "菜单1-2", val: "888888888" }
        ]
      },
      {
        id: "id12",
        name: "菜单12",
        list: [
          { id: "id12-subid01", name: "菜单1-1", val: "9999999999饿哦都会很好" },
          { id: "id12-subid02", name: "菜单1-2", val: "9999999999" }
        ]
      },
      {
        id: "id13",
        name: "菜单13",
        list: [
          { id: "id13-subid01", name: "菜单1-1", val: "9咳咳咳" },
          { id: "id13-subid02", name: "菜单1-2", val: "101010" }
        ]
      },
      {
        id: "id14",
        name: "菜单14",
        list: [
          { id: "id14-subid01", name: "菜单1-1", val: "858" },
          { id: "id14-subid02", name: "菜单1-2", val: "阿斯达" }
        ]
      }
    ],
    itemscrolltop:[]//存放内容区每块内容所在的滚动条位置区间
  },
  //计算存放内容区每块内容所在的滚动条位置区间
  computeritemscrolltop:function(){
    var h = 0;
    for (var i = 0; i < this.data.datalist.length;i++){
          var id = this.data.datalist[i].id;
          h = h + this.data.box_itemh_h;
          for (var j = 0; j < this.data.datalist[i].list.length; j++) {
            h = h + this.data.box_itemc_h;
          };
          var arr = this.data.itemscrolltop;
          arr.push({ id: id, scrolltoph: h})
          this.setData({ itemscrolltop: arr})
    };
    console.log(this.data.itemscrolltop)
  },
  //菜单点击
  skip:function(event){
    //console.log(event.target.dataset.id)
    this.setData({ toView: event.target.dataset.id})
    this.setData({ navlistIdx: event.target.dataset.id })
  },
  //内容区滚动
  scroll: function (event){
    //console.log(event.detail.scrollTop)
    //console.log(this.data.itemscrolltop)
    for (var i = 0; i < this.data.itemscrolltop.length;i++){
      if (event.detail.scrollTop < this.data.itemscrolltop[i].scrolltoph){
        
        this.setData({ navlistIdx: this.data.itemscrolltop[i].id})
        this.setData({ scrollTop: i * this.data.nav_item_h - 2 * this.data.nav_item_h })
        break;
      };  
    };

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    //计算存放内容区每块内容所在的滚动条位置区间
    this.computeritemscrolltop();

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})