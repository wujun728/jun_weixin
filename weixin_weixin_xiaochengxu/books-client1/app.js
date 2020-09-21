const api=require('./config/config.js');
App({
  onLaunch: function () {
    let that=this;
    this.checkLoginStatus();
  },
  //检查本地storage中是否有登录状态标识
  checkLoginStatus:function(){
    let that=this;
    let loginFlag=wx.getStorageSync('loginFlag');
    if(!loginFlag){
      //无登录状态
      that.doLogin();
    }
  },
  //登录动作
  doLogin:function(callback=()=> {}){
    let that=this;
    wx.login({
      success:function(loginRes){
        console.log('loginRes:'+JSON.stringify(loginRes));
        if(loginRes.code){
          /* 
                     * @desc: 获取用户信息 期望数据如下 
                     *
                     * @param: userInfo       [Object]
                     * @param: rawData        [String]
                     * @param: signature      [String]
                     * @param: encryptedData  [String]
                     * @param: iv             [String]
                     **/
          wx.getUserInfo({
            withCredentials:true,
            success:function(infoRes){
              console.log("infoRes "+JSON.stringify(infoRes));
              wx.request({
                url:api.loginUrl,
                data:{
                  code: loginRes.code,
                  rawData:infoRes.rawData,
                  signature: infoRes.signature,
                  encryptedData:infoRes.encryptedData,
                  iv:infoRes.iv
                },
                success:function(res){
                  console.log('login success');
                  res=res.data;
                  if(res.result==0){
                    that.globalData.userInfo=res.userInfo;
                    wx.setStorageSync('userInfo',JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag',res.skey);
                    callback();
                  }else{
                    this.showInfo(res.errmsg);
                  }
                }
              });
            },
            fail:function(error){
              //获取userInfo失败，去检查是否未开启权限
              console.log('error:'+error);
            }
          });
        }
      },
      fail:function(error){
        //调用wx.login接口失败
        that.showInfo('接口调用失败');
      }
    });
  },
  showInfo: function(info ='error',icon='none'){
    wx.showToast({
      title:info,
      icon:icon,
      duration:1500,
      mask:true
    });
  },
  //app全局数据
  globalData:{
    userInfo:null
  }
})
