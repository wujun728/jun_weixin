/**
 * 扇形进度倒计时
 * @author duguanxing
 */
//canvas
var CDctx =null;//画布容器
var CDsetanima=null;//定时器id容器
// components/canvasCD/canvasCD.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    CDstart: { // 属性名
      type: Number,
      observer: function (newVal, oldVal) {
        //console.log(newVal)
        //事件 开始倒计时
        this.bindstart();
      } // 属性被改变时执行的函数（可选）
    },
    CDend: { // 属性名
      type: Number,
      observer: function (newVal, oldVal) {
        //console.log(newVal)
        //事件 立即结束
        this.bindend();
      } // 属性被改变时执行的函数（可选）
    },
    CDinit: { // 属性名
      type: Number,
      observer: function (newVal, oldVal) {
        //console.log(newVal)
        //事件 初始化
        this.bindinit();
      } // 属性被改变时执行的函数（可选）
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startangle: -90,//进度效果 起始角度位置 默认是3点钟方向，设置调整 -值逆时针：：：可自定义设置
    CDw: 116,//来自设计稿的值，rpx  宽度 ：：：可自定义设置
    CDh: 116,//来自设计稿的值，rpx  高度 ：：：可自定义设置
    CDc: 10,//来自设计稿的值，rpx  边框宽度 ：：：可自定义设置
    CDrw: 0,//设计稿的值rpx 依据设备换算后的px  宽度
    CDrh: 0,//设计稿的值rpx 依据设备换算后的px  高度
    CDrc: 0,//设计稿的值rpx 依据设备换算后的px  边框宽度
    CDrealangle: 0,//进度效果 实时角度
    CDddtime: 10, //进度效果  提示倒计时数字 ：：：可自定义设置
    CDtime: 10, //进度效果 总时间 单位秒 ：：：可自定义设置
    CDaddtime: 60,//进度效果 定时器时间 单位ms ：：：可自定义设置
    CDbackbot: "#ffffff",//进度效果 底色 ：：：可自定义设置
    CDbackreal: "#e6bf6c",//进度效果 显示色 ：：：可自定义设置
    CDbackover: "#da9f20",//进度效果 遮盖色 ：：：可自定义设置
    CDfontsize: 50,//字体大小 来自设计稿的值，rpx ：：：可自定义设置
    CDfontcolor: "#ffffff",//字体颜色 ：：：可自定义设置
    CDfontalign: "center",//水平对齐方式 可选值 'left'、'center'、'right'  ：：：可自定义设置
    CDfontbaseline: "middle"//垂直对齐方式 可选值 'top'、'bottom'、'middle'、'normal'  ：：：可自定义设置
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //事件 开始倒计时
    bindstart: function () {
      clearInterval(CDsetanima);
      //cd canvas 值重置
      this.canvasCdFUNreset();
      //cd canvas 倒计时
      this.canvasCdFUN();

    },
    //事件 立即结束
    bindend: function () {
      clearInterval(CDsetanima);
      //cd canvas 值结束
      this.canvasCdFUNend();
      //执行绘制
      this.canvasCdFUNdraw();
    },
    //事件 初始化
    bindinit: function(){
      clearInterval(CDsetanima);
      //cd canvas 值重置
      this.canvasCdFUNreset();
      //执行绘制
      this.canvasCdFUNdraw();
    },
    //cd canvas 值结束
    canvasCdFUNend: function () {
      this.setData({
        CDddtime: 0,
        CDrealangle: 360,
      });
      
    },
    //cd canvas 值重置
    canvasCdFUNreset: function () {
      this.setData({//注意 值需要后动设置和参数相同
        CDddtime: 10,
        CDrealangle: 0,
      });
    },
    //cd canvas 依据设计稿的rpx换算为px
    canvasCdFUNwh: function () {
      var that = this;
      //xxxrpx*设备宽度/750
      wx.getSystemInfo({
        success: function (res) {
          //console.log(res.windowWidth)
          that.setData({
            CDrw: that.data.CDw * res.windowWidth / 750,
            CDrh: that.data.CDh * res.windowWidth / 750,
            CDrc: that.data.CDc * res.windowWidth / 750,
            CDfontsize: that.data.CDfontsize * res.windowWidth / 750
          })
        }
      })
    },
    //cd canvas 回到处理 1s 执行一次
    canvasCdFUN1s: function (n) {
      //console.log(n)
      this.setData({ CDddtime: n })
    },
    //cd canvas 倒计时
    canvasCdFUN: function () {    
      var that = this;
      var ji = new Date().getTime();//初始化时间
      var CDaddtime = that.data.CDaddtime;//每次时间间隔
      var jd = 2;//第一次变化角度

      var allc = this.data.CDtime * 1000 / CDaddtime;//执行次数
      var js = new Date().getTime();//每次变化起始时间
      var ss=0;
      CDsetanima = setInterval(function(){  
        var ch = new Date().getTime() - js;//实际耗时
        ss += ch;
        js = new Date().getTime();
        var at = that.data.CDtime * 1000 - ss;//可用时间
        allc = at / CDaddtime;//还可以执行次数 按间隔时间
        jd = (360 - that.data.CDrealangle) / allc;//变化角度
        //console.log(jd,222222222222222222);
        //倒计时执行函数 执行函数
        //进度到结束
        if (at<=0) {
          console.log("倒计时总耗时",new Date().getTime() - ji);
          //console.log("进度结束");
          //cd canvas 值结束
          that.canvasCdFUNend();
          //执行绘制
          that.canvasCdFUNdraw();
          //倒计时 结束函数 超时 传递给page响应处理
          var myEventDetail = { msg: "结束倒计时，进度走完" } // detail对象，提供给事件监听函数
          that.triggerEvent('CDNot', myEventDetail);
          //清除定时器
          clearInterval(CDsetanima);
          return false;
        }
        //console.log("进度中")
        //自动追加
        that.setData({ CDrealangle: that.data.CDrealangle + jd });
        //绘制
        that.canvasCdFUNdraw();
        //1s 间隔
        //console.log(at/1000,5555555555)
        if (that.data.CDddtime != Math.ceil(at / 1000)){
          that.setData({
            CDddtime: Math.ceil(at / 1000)
          });
        };
        
      }, CDaddtime);
    },
    //cd canvas 绘制
    canvasCdFUNdraw: function () {
      //console.log(CDctx)
      //清除
      CDctx.clearRect(0, 0, this.data.CDrw, this.data.CDrh);

      //绘制底色
      CDctx.save();
      CDctx.translate(this.data.CDrw / 2, this.data.CDrh / 2);//将画布坐标系原点移至中心
      CDctx.rotate(this.data.startangle * Math.PI / 180);//如果是缩放，这里是缩放代码
      CDctx.translate(-this.data.CDrw / 2, -this.data.CDrh / 2);//修正画布坐标系
      CDctx.beginPath();
      CDctx.moveTo(this.data.CDrw / 2, this.data.CDrh / 2);
      CDctx.arc(this.data.CDrw / 2, this.data.CDrh / 2, this.data.CDrw / 2, this.data.CDrealangle * Math.PI / 180, 2 * Math.PI);
      CDctx.setFillStyle(this.data.CDbackbot);
      CDctx.fill();
      CDctx.closePath();
      CDctx.restore();
      //绘制显色
      CDctx.save();
      CDctx.translate(this.data.CDrw / 2, this.data.CDrh / 2);//将画布坐标系原点移至中心
      CDctx.rotate(this.data.startangle * Math.PI / 180);//如果是缩放，这里是缩放代码
      CDctx.translate(-this.data.CDrw / 2, -this.data.CDrh / 2);//修正画布坐标系
      CDctx.beginPath();
      CDctx.moveTo(this.data.CDrw / 2, this.data.CDrh / 2);
      CDctx.arc(this.data.CDrw / 2, this.data.CDrh / 2, this.data.CDrw / 2, 0, this.data.CDrealangle * Math.PI / 180);
      CDctx.setFillStyle(this.data.CDbackreal);
      CDctx.fill();
      CDctx.closePath();
      CDctx.restore();
      //绘制遮盖色
      CDctx.save();
      CDctx.translate(this.data.CDrw / 2, this.data.CDrh / 2);//将画布坐标系原点移至中心
      CDctx.rotate(this.data.startangle * Math.PI / 180);//如果是缩放，这里是缩放代码
      CDctx.translate(-this.data.CDrw / 2, -this.data.CDrh / 2);//修正画布坐标系
      CDctx.beginPath();
      CDctx.moveTo(this.data.CDrw / 2, this.data.CDrh / 2);
      CDctx.arc(this.data.CDrw / 2, this.data.CDrh / 2, this.data.CDrw / 2 - this.data.CDrc, 0, 2 * Math.PI);
      CDctx.setFillStyle(this.data.CDbackover);
      CDctx.fill();
      CDctx.closePath();
      CDctx.restore();
      //绘制文字
      CDctx.save();
      CDctx.setFillStyle(this.data.CDfontcolor);
      CDctx.setFontSize(this.data.CDfontsize);
      CDctx.setTextAlign(this.data.CDfontalign);
      CDctx.setTextBaseline(this.data.CDfontbaseline);
      //默认参考线在中心
      CDctx.fillText(this.data.CDddtime, this.data.CDrw / 2, this.data.CDrh / 2);
      CDctx.restore();
      //绘制
      CDctx.draw();
      
    }
  },
  //事件
  attached:function(){
    console.log("倒计时效果实例准备事件");
    CDctx=wx.createCanvasContext("canvasCd",this);
    //cd canvas 依据设计稿的rpx换算为px
    this.canvasCdFUNwh();
    //执行绘制
    this.canvasCdFUNdraw();
  }
})
