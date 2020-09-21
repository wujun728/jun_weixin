/**
 * The MIT License (MIT)
 * 九宫格抽奖
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/jiugongge/jiugongge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Jack_pots_select: [false, false, false, false, false, false, false, false, false, false, false, false ],
    Jack_pots_val: ["空调", "未中奖", "洗衣机", "未中奖", "娃哈哈", "电脑", "未中奖", "手机", "未中奖", "电视机", "未中奖", "键盘"],
    is_play:false,//是否在运动中，避免重复启动bug
    available_num: 3,//可用抽奖的次数，可自定义设置或者接口返回
    start_position: 0,//转动开始时首次点亮的位置，可自定义设置
    base_circle_num: 5,//基本圈数，就是在转到（最后一圈）结束圈之前必须转够几圈 ，可自定义设置
    low_circle_num: 4,//在第几圈开始进入减速圈（必须小于等于基本圈数），可自定义设置
    use_speed: 50,//当前速度，与正常转速值相等
    nor_speed: 50,//正常转速，在减速圈之前的转速，可自定义设置
    low_speed: 120,//减速转速，在减速圈的转速，可自定义设置
    end_speed: 250,//最后转速，在结束圈的转速，可自定义设置
    random_number:0,//中奖索引，也是随机数，也是结束圈停止的位置，这个值采用系统随机或者接口返回
    change_num: 0,//变化计数，0开始，比如实例有12个奖项，基本是6圈，那么到结束这个值=6*12+random_number；同样change_num/12整除表示走过一整圈
    result_val: "未中奖"//存放奖项容器，可自定义设置
  },
  //启动
  start:function(){
    var that=this;
    //是否用完可用抽奖次数
    //console.log(that.data.available_num);
    if (that.data.available_num<1){
      //code

      return false;
    }
    //阻止运动中重复点击
    if (!that.data.is_play){
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
      that.setData({ random_number: Math.floor(Math.random() * that.data.Jack_pots_val.length) });
      //console.log(that.data.random_number);
      //运动函数
      setTimeout(that.dong, that.data.use_speed);
    };
    
  },
  //运动函数
  dong:function(){
    var that = this;
    //状态
    var status = [];
    for (var j = 0; j < that.data.Jack_pots_val.length; j++) {
      status[j] = false;
    };
    //重置显示
    that.setData({ Jack_pots_select: status});
    //点亮
    status[that.data.change_num % that.data.Jack_pots_val.length]=true;
    that.setData({ Jack_pots_select: status });
    //累加变化计数
    that.setData({ change_num: that.data.change_num+1 });
    //继续运动
    if (that.data.change_num > that.data.base_circle_num * that.data.Jack_pots_val.length + that.data.random_number) {//已经到达结束位置
      //提示中奖，
     // console.log(that.data.Jack_pots_val[that.data.random_number])
      that.setData({ result_val: that.data.Jack_pots_val[that.data.random_number]})
      //code
      
      //运动结束设置可用抽奖的次数和激活状态设置可用
      that.endset();
      

    }else{//运动
      //console.log(that.data.change_num)
      if (that.data.change_num / that.data.Jack_pots_val.length + 1 < that.data.low_circle_num){//正常转速
        //console.log("正常转速")
        that.data.use_speed = that.data.nor_speed
      } else if (that.data.change_num / that.data.Jack_pots_val.length + 1 >= that.data.low_circle_num && that.data.change_num / that.data.Jack_pots_val.length + 1 <= that.data.base_circle_num+1){ //减速圈
        //console.log("减速圈")
        that.data.use_speed = that.data.low_speed
      } else if (that.data.change_num / that.data.Jack_pots_val.length + 1 > that.data.base_circle_num+1){ //结束圈
        //console.log("结束圈")
        that.data.use_speed = that.data.end_speed
      }
      setTimeout(that.dong, that.data.use_speed);
    }
      
  },
  //运动结束设置可用抽奖的次数和激活状态设置可用
  endset:function(){
    var that = this;
    //是否在运动中，避免重复启动bug
    that.setData({ is_play: false })
    //可用抽奖的次数，可自定义设置
    that.setData({ available_num: that.data.available_num - 1 });
  },
  //重置参数
  reset:function(){
      var that = this;
      //转动开始时首次点亮的位置，可自定义设置
      that.setData({ start_position: 0 }); 
      //当前速度，与正常转速值相等
      that.setData({ use_speed: that.data.nor_speed}); 
      //中奖索引，也是随机数，也是结束圈停止的位置，这个值采用系统随机或者接口返回
      that.setData({ random_number: 0 });
      //变化计数，0开始，必须实例有12个奖项，基本是6圈，那么到结束这个值=6*12+random_number；同样change_num/12整除表示走过一整圈
      that.setData({ change_num: 0 }); 

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