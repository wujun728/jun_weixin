/**
 * The MIT License (MIT)
 * 生成公司公章
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// 使用 wx.createContext 获取绘图上下文 context
var context = null
// pages/makeseal/makeseal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: "",//印章单位
    name: "",//印章名称
    canvas_width:300,//画布宽度
    canvas_height: 300//画布高度
  },
  //事件处理函数
  companyInput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //清除画布
  clearSeal:function(){
    context.clearRect(0, 0, this.data.canvas_width, this.data.canvas_height)
  },
  //生成
  createSeal:function(){
      console.log(this.data.company, this.data.name)
      //清除画布
      this.clearSeal();
      /*
        代码处理
      */
      // 绘制印章边框   
      var width = this.data.canvas_width / 2;
      var height = this.data.canvas_height / 2;
      //绘制样式
      context.setLineWidth(5);//线宽
      context.setStrokeStyle('#fe0101');//颜色
      context.beginPath();
      context.arc(width, height, 110, 0, Math.PI * 2);
      context.stroke();
      context.draw(true);

      //画五角星
      this.create5star(width, height, 35, 0);

      // 绘制印章名称   
      context.setFontSize(14);
      context.setTextBaseline("middle");//设置文本的垂直对齐方式
      context.setTextAlign('center') ; //设置文本的水平对对齐方式
      context.setLineWidth(1);//线宽
      context.setFillStyle("#fe0101");  
      context.fillText(this.data.name, width, height + 65);
      context.draw(true);

      // 绘制印章单位   
      context.save();
      context.translate(width, height);// 平移到此位置,
      context.setFontSize(16);
      var count = this.data.company.length;// 字数   
      var angle = 4 * Math.PI / (3 * (count - 1));// 字间角度   
      var chars = this.data.company.split("");
      var c;
      for (var i = 0; i < count; i++) {
        c = chars[i];// 需要绘制的字符   
        if (i == 0){
          context.rotate(5 * Math.PI / 6);
        } else {
          context.rotate(angle);
        };
        context.save();
        context.setFillStyle("#fe0101");
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直   
        context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴   
        context.fillText(c, 0, 5);// 此点为字的中心点   
        context.draw(true);
        context.restore();
      };
      context.restore();
  },
  //绘制五角星  
  /** 
   * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
   * rotate:绕对称轴旋转rotate弧度 
   */
  create5star:function( sx, sy, radius, rotato){
      context.save();  
      context.setFillStyle("#fe0101") ;  
      context.translate(sx, sy);//移动坐标原点  
      context.rotate(Math.PI + rotato);//旋转  
      context.beginPath();//创建路径  
      //console.log(Math.sin(30*Math.PI/180))
      var dig = Math.PI / 5 * 4;  
      for(var i = 0;i< 5;i++){//画五角星的五条边  
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo(x * radius, y * radius);
      }
      context.closePath();
      context.fill();
      context.draw(true);
      context.restore();  
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
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('sealCanvas')
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