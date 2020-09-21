/**
 * The MIT License (MIT)
 * 刮刮卡抽奖
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// 使用 wx.createContext 获取绘图上下文 context
var ctx = null
//坐标容器
var ctxbox=[];
//擦拭坐标容器
var ablebox=[];
// pages/kuakuaka/kuakuaka.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    canvas_isdraw:false,//画布是否在绘制中
    canvas_width:200,//画布宽度，可自定义设置
    canvas_height: 70,//画布高度，可自定义设置
    result_arr: ["未中奖", "电视机", "洗衣机", "电冰箱"],//奖项池，可自定义设置
    canvas_clearw: 10,//橡皮咋宽，可自定义设置
    canvas_clearh: 10,//橡皮咋高，可自定义设置
    canvas_color: "#aaaaaa",//遮罩颜色，可自定义设置
    canvas_percent: 0.5,//自动提示获奖依据设置的参考比例(刮出比例占总大小多少提示)，可自定义设置(0-1)
    canvas_forPercent: false,//自动提示获奖是否已经提示，默认不提示，避免重复提示
    result_val: "未中奖"//实际奖项值
  },
  //重置坐标容器
  resetbox:function(){
    //坐标容器 重置
    ctxbox = [];
    //擦拭坐标容器 重置
    ablebox = [];
    //自动提示获奖是否已经提示，默认不提示，避免重复提示
    this.setData({ canvas_forPercent:false});
    //设置坐标容器 依据画布宽高按照1px分割，设置坐标，都设置为0，标识没有擦拭过
    for (var i = 0; i < this.data.canvas_width;i++){
      ctxbox[i]=[];
      for (var j = 0; j < this.data.canvas_height; j++) {
        ctxbox[i][j] = 0;
      };
    };
    //console.log(ctxbox);
  },
  //自动提示获奖参考比例
  computerPercent:function(){
    var that=this;
    //依据擦拭坐标把擦拭过的位置和坐标容器位置重合的设置为1，标识擦拭过
    for (var i = 0; i < ablebox.length; i++) {
      for (var j = ablebox[i].ax; j <= ablebox[i].bx;j++){
        for (var k = ablebox[i].ay; k <= ablebox[i].by; k++) {
          //坐标容器数组有范围，将溢出的设置排除
          //console.log(j,k)
          if (j >= 0 && j < this.data.canvas_width && k >= 0 && k < this.data.canvas_height ){
            ctxbox[j][k] = 1;
          }     
        };
      };
    };
    //计算擦出的坐标在总坐标中的个数
    var count=0;
    for (var i = 0; i < ctxbox.length;i++){
      for (var j = 0; j < ctxbox[i].length; j++) {
        if (ctxbox[i][j]==1){
          count += 1;
        }; 
      };
    };
    //如果擦出的坐标在总坐标中的比例大于设置比例，提示中奖
    if (count / (this.data.canvas_width * this.data.canvas_height) > this.data.canvas_percent){
      //console.log("ok")
      //code
      if (that.data.canvas_forPercent){
        return false;
      }
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '你抽取的结果为，' + that.data.result_val,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //自动提示获奖是否已经提示，默认不提示，避免重复提示
            that.setData({ canvas_forPercent: true });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    }else{
      console.log("no")
    };
  },
  //产生实际奖项值
  getVal:function(){
    //生成随机参数
    var rad = Math.floor(Math.random() * this.data.result_arr.length);
    //依据随机参数设置实际奖项值
    this.setData({ result_val: this.data.result_arr[rad] });
  },
  //初始化画布
  initCanvas:function(){
    //设置遮盖颜色
    ctx.setFillStyle(this.data.canvas_color)
    //绘制遮盖颜色
    ctx.fillRect(0, 0, this.data.canvas_width, this.data.canvas_height)
    ctx.draw();
  },
  //画布处理
  startCanvas: function (event){
    //设置画布在绘制中
    this.setData({ canvas_isdraw:true});
  },
  moveCanvas: function (event) {
    //如果画布在绘制中
    if (this.data.canvas_isdraw) {
      //获取事件坐标
      var x = event.changedTouches[0].x;
      var y = event.changedTouches[0].y;
      //console.log(x, y)
      //橡皮擦擦出
      ctx.clearRect(x - this.data.canvas_clearw / 2, y - this.data.canvas_clearh/2, this.data.canvas_clearw, this.data.canvas_clearh)
      //擦出坐标存储
      ablebox.push({
        ax: Math.round(x - this.data.canvas_clearw / 2),
        ay: Math.round(y - this.data.canvas_clearh / 2) ,
        bx: Math.round(x + this.data.canvas_clearw / 2),
        by: Math.round(y + this.data.canvas_clearh / 2)
      });
      //绘制
      ctx.draw(true) 
    };
  },
  endCanvas: function (event) {
   //如果画布在绘制中
    if (this.data.canvas_isdraw) {
       //设置画布不在绘制中
      this.setData({ canvas_isdraw: false });
      //自动提示获奖依据设置的参考比例是否达到
      this.computerPercent();
    }  
  },
  //重置抽奖
  reset:function(){
    //产生实际奖项值
    this.getVal();
    //初始化画布
    this.initCanvas();
    //重置坐标容器
    this.resetbox();
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
    // 使用 wx.createContext 获取绘图上下文 context
    ctx = wx.createCanvasContext('guaguaCanvas')
    //产生实际奖项值
    this.getVal();
    //初始化画布
    this. initCanvas();
    //重置坐标容器
    this.resetbox();
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