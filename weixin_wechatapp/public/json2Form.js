  
var app = getApp();
function json2Form(json) {
  
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  console.log(str.join("&"))
  return str.join("&");
  
}



var socketFun = { 
  uploadImage: function (tempFilePaths, type, params) {
    var app = getApp();
    if (!app.loginUser) {
      app.echoErr('用户未登录')
      return
    }
    let param = {
      userId: app.loginUser.id
    }
    var customIndex = app.AddClientUrl("/file_uploading.html", param, 'POST')
    wx.uploadFile({
      url: customIndex.url, //接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: customIndex.params,
      header: { 'content-type': 'multipart/form-data' },
      success: function (res) {
        console.log("===success===", res)
        //do something
        let data = res.data;
        if (typeof (data) == 'string') {
          data = JSON.parse(data)
          console.log("====string====", data)
          if (data.errcode == 0) {
            socketFun.sendMsgFun(data.relateObj.imageUrl, type, params);
          }
        }
      }, fail: function (e) {
        console.log(e)
      }, complete: function (e) {

      }
    })
  },
  sendImgFun: function (type, params) {
    var app = getApp();
    console.log("socket sendImg", type)
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("===chooseImage===", res)
        let tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length; i++) {
          socketFun.uploadImage(tempFilePaths[i], type, params)
        }
      }
    })
  },
  sendMsgFun: function (msg,type, params) {
    var app= getApp();
    console.log("socket sendMsg", type)
    let msgData = '{"viewHandler":"chat","content":"' + msg + '","toUserId":' + params.puid + ',"fromUserId":' + app.loginUser.platformUser.id + ',"msgType":' + (type || 0) + '}';
    console.log("====msgData==", msgData)
    if (app.socketTask.readyState == app.socketTask.OPEN) {
      app.socketTask.send({
        data: msgData,
        success: () => {
          console.info('客户端发送成功');
        }
      });
    } else {
      console.error('连接已经关闭');
    }
  },
  removeListener:function ( key) {
    var app = getApp();
    if (app.chatMessageListeners) {
      for (var i = 0; i < app.chatMessageListeners.length; i++) {
        if (app.chatMessageListeners[i].key == key) {
          app.chatMessageListeners.splice(i, 1)
        }
      }
    }
  },
  addListener: function (viewHandler, key, listener, prior) {
    var app = getApp();
    if (!prior) {
      prior = 0;
    }
    if (app.chatMessageListeners) {
      var replace = false;
      for (var i = 0; i < app.chatMessageListeners.length; i++) {
        if (app.chatMessageListeners[i].key == key) {
          app.chatMessageListeners[i].listener = listener;
          app.chatMessageListeners[i].prior = prior;
          app.chatMessageListeners[i].viewHandler = viewHandler;
          replace = true;
        }
      }
      if (!replace) {
        app.chatMessageListeners.push({ "key": key, "viewHandler": viewHandler, "listener": listener, "prior": prior });
      }
    } else {
      app.chatMessageListeners = [];
      app.chatMessageListeners.push({ "key": key, "viewHandler": viewHandler, "listener": listener, "prior": prior });
    }

    app.chatMessageListeners.sort(function compare(a, b) { return b.prior - a.prior; });
  },
  socketConnect: function () {
    var app = getApp();
    console.log('connect to server!');
    if (app.socketTask && app.socketTask.readyState == app.socketTask.OPEN) {
      console.log("正常连接中~")

    } else {
      let params = { puid: app.loginUser.platformUser.id }
      let customIndex = app.AddClientUrl("/connect_chat.socket", params, 'get')
      app.socketTask = wx.connectSocket({
        url: customIndex.url,
        header: {
          'content-type': app.header
        },
        success: function (res) {
          console.log("====success====", res)
        },
        fail: function (res) {
          console.log("====fail====", res)
        },
        complete: function (res) {
          console.log("====complete====", res)
        },
      })
      app.socketTask.onOpen(function () {
        console.log('socket open')
      });
      app.socketTask.onClose(function () {
        console.log('socket close')
        setTimeout(function () {
          console.log("reconnect socket!!!");
          app.socketTask = socketFun.socketConnect();
        }, 3000);

      });
      app.socketTask.onError(function () {
        console.log('socket onError')
        try {
          app.socketTask.close();
          app.socketTask = null;
        } catch (e) { }
      });
      app.socketTask.onMessage(function (msg) {
        console.log('socket on message', msg, app.chatMessageListeners)
        if (typeof (msg.data) == 'string') {
          try {
            msg.data = JSON.parse(msg.data)
          } catch (e) { }
        }
        let msgData = msg
        if (app.chatMessageListeners) {
          for (var i = 0; i < app.chatMessageListeners.length; i++) {
            if (app.chatMessageListeners[i].viewHandler == msgData.data.viewHandler) {
              var next = app.chatMessageListeners[i].listener(msgData);
              if (!next && msgData.isHandler) {
                break;
              }
            } else {

            }

          }
        }
      });
    }
    return app.socketTask;
  } 
}
export { json2Form, socketFun}