/**
 * The MIT License (MIT)
 * 大转盘抽奖
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/dazhuanpan2/dazhuanpan2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Jack_pots: [ //奖项区间 ，360度/奖项个数 ，一圈度数0-360，可自定义设置
      //random_angle是多少，在那个区间里面就是中哪个奖项
      { startAngle: 1, endAngle: 51, val: "1等奖" },
      { startAngle: 52, endAngle: 102, val: "2等奖" },
      { startAngle: 103, endAngle: 153, val: "3等奖" },
      { startAngle: 154, endAngle: 203, val: "4等奖" },
      { startAngle: 204, endAngle: 251, val: "5等奖" },
      { startAngle: 252, endAngle: 307, val: "6等奖" },
      { startAngle: 307, endAngle: 360, val: "未中奖" }
    ],
    is_play: false,//是否在运动中，避免重复启动bug
    available_num: 3,//可用抽奖的次数，可自定义设置或者接口返回
    start_angle: 0,//转动开始时初始角度=0位置指向正上方，按顺时针设置，可自定义设置
    base_circle_num: 9,//基本圈数，就是在转到（最后一圈）结束圈之前必须转够几圈 ，可自定义设置
    low_circle_num: 5,//在第几圈开始进入减速圈（必须小于等于基本圈数），可自定义设置
    add_angle: 10,//追加角度，此值越大转动越快，请保证360/add_angle=一个整数，比如1/2/3/4/5/6/8/9/10/12等
    use_speed: 1,//当前速度，与正常转速值相等
    nor_speed: 1,//正常转速，在减速圈之前的转速，可自定义设置
    low_speed: 10,//减速转速，在减速圈的转速，可自定义设置
    end_speed: 20,//最后转速，在结束圈的转速，可自定义设置
    random_angle: 0,//中奖角度，也是随机数，也是结束圈停止的角度，这个值采用系统随机或者接口返回
    change_angle: 0,//变化角度计数，0开始，一圈360度，基本是6圈，那么到结束这个值=6*360+random_angle；同样change_angle/360整除表示走过一整圈
    result_val: "未中奖"//存放奖项容器，可自定义设置
  },
  //启动
  start: function () {
    var that = this;
    //是否用完可用抽奖次数
    //console.log(that.data.available_num);
    if (that.data.available_num < 1) {
      //code

      return false;
    }
    //阻止运动中重复点击
    if (!that.data.is_play) {
      //设置标识在运动中
      that.setData({ is_play: true });
      //重置参数
      that.reset();
      //生成随机奖项索引(0-that.data.Jack_pots.length)之间 || 或者后台返回这个获奖内容
      //方式1 后台
      // ajax({
      //   url,
      //   succ:function(res){
      //     // res.random来自后台的中奖索引
      //     that.setData({ random_number: res.random });
      //   }
      // })
      //方式2 随机
      that.setData({ random_angle: Math.ceil(Math.random() * 360) });
      //console.log(that.data.random_angle);
      //运动函数
      setTimeout(that.dong, that.data.use_speed);
    };

  },
  //运动函数
  dong: function () {
    var that = this;
    //继续运动
    if (that.data.change_angle >= that.data.base_circle_num * 360 + that.data.random_angle) {//已经到达结束位置
      //提示中奖，
      //console.log(that.data.random_angle)
      that.getresult();
      //code

      //运动结束设置可用抽奖的次数和激活状态设置可用
      that.endset();


    } else {//运动
      //console.log(that.data.change_angle)
      if (that.data.change_angle < that.data.low_circle_num * 360) {//正常转速
        // console.log("正常转速")
        that.data.use_speed = that.data.nor_speed
      } else if (that.data.change_angle >= that.data.low_circle_num * 360 && that.data.change_angle <= that.data.base_circle_num * 360) { //减速圈
        // console.log("减速圈")
        that.data.use_speed = that.data.low_speed
      } else if (that.data.change_angle > that.data.base_circle_num * 360) { //结束圈
        //console.log("结束圈")
        that.data.use_speed = that.data.end_speed
      }
      //累加变化计数
      that.setData({ change_angle: that.data.change_angle + that.data.add_angle >= that.data.base_circle_num * 360 + that.data.random_angle ? that.data.base_circle_num * 360 + that.data.random_angle : that.data.change_angle + that.data.add_angle });
      setTimeout(that.dong, that.data.use_speed);
    }

  },
  //计算获奖结果
  getresult: function () {
    var that = this;
    //console.log(that.data.random_angle)
    for (var j = 0; j < that.data.Jack_pots.length; j++) {
      if (that.data.random_angle >= that.data.Jack_pots[j].startAngle && that.data.random_angle <= that.data.Jack_pots[j].endAngle) {
        that.setData({ result_val: that.data.Jack_pots[j].val });
        break;
      };
    };
  },
  //运动结束设置可用抽奖的次数和激活状态设置可用
  endset: function () {
    var that = this;
    //是否在运动中，避免重复启动bug
    that.setData({ is_play: false })
    //可用抽奖的次数，可自定义设置
    that.setData({ available_num: that.data.available_num - 1 });
  },
  //重置参数
  reset: function () {
    var that = this;
    //转动开始时首次点亮的位置，可自定义设置
    that.setData({ start_angle: 0 });
    //当前速度，与正常转速值相等
    that.setData({ use_speed: that.data.nor_speed });
    //中奖索引，也是随机数，也是结束圈停止的位置，这个值采用系统随机或者接口返回
    that.setData({ random_angle: 0 });
    //变化计数，0开始，必须实例有12个奖项，基本是6圈，那么到结束这个值=6*12+random_number；同样change_num/12整除表示走过一整圈
    that.setData({ change_angle: 0 });

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