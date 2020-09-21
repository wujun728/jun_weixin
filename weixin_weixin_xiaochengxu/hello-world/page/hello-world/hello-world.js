Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "hello-world",
    flag: true,
    items: [
      {name: "商品aaaa"},
      {name: "商品2"},
      {name: "商品3"},
      {name: "商品4"}
    ],
    condition:Math.floor(Math.random()*3+1),
    item:{
      name:"张三",
      phone:"1441234123412",
      address:"中国"
    }
  },
  clickMe(e){
    console.log(e);
  },
  clickA(){
    console.log("clickA");
  },
  clickB(){
    console.log('clickB');
  },
  clickC(){
    console.log('clickC');
  },
  captureClickA() {
    console.log('captureClickA');
  },
  captureClickB() {
    console.log('captureClickB');
  },
  captureClickC(){
    console.log('captureClickC');
  },
  captureCatchClickC(){
    console.log('captureCatchClickC');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})