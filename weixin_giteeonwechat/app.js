App({
  product: {
    name: "码云仓库",
    desc: "在微信小程序里管理你的仓库代码",
    version: "v1.0",
    logo: "/res/image/logo.png",
    copyright: "本服务由Hamm提供 非码云官方服务",
    iPhoneX: 0
  },
  config: {
    apiUrl: "https://gitee.hamm.cn/", //通用API地址
    codeForLogin: 401,
    codeForSuccess: 200
  },
  access_token: null,
  userInfo: null,
  onLaunch: function () {},
  /**
   * 校验AccessToken获取用户信息
   * @param {回调} callback(boolean)
   */
  getUserInfo: function (callback) {
    var that = this;
    var access_token = wx.getStorageSync("access_token");
    if (access_token) {
      that.access_token = access_token;
      wx.request({
        url: that.config.apiUrl + "api/v5/user",
        method: "POST",
        data: {
          access_token: access_token,
          method: 'get'
        },
        success: function (result) {
          if (result.data.hasOwnProperty('id')) {
            that.userInfo = result.data;
            callback(true);
          } else {
            callback(false);
          }
        }
      });
    } else {
      this.access_token = null;
      callback(false);
    }
  },
  /**
   * 打开WebView
   * @param {string} url 
   * @param {string} title 
   */
  openUrl: function (url, title = null) {
    wx.navigateTo({
      url: '../webview/index?title=' + (title == null ? encodeURIComponent(this.product.name) : title) + '&url=' + encodeURIComponent(url),
    });
  },
  /**
   * 提示登陆
   */
  loginFirst: function () {
    var that = this;
    wx.hideLoading();
    wx.showModal({
      title: '请先登录',
      content: '你需要登录后才能继续操作',
      showCancel: true,
      confirmText: "登录",
      cancelText: "取消",
      success(res) {
        if (res.confirm) {
          that.login();
        } else {
          wx.navigateBack();
        }
      }
    });
  },
  /**
   * 退出登陆
   */
  logout: function () {
    wx.removeStorageSync('access_token');
    this.access_token = null;
  },
  /**
   * 打开登陆页面
   */
  login: function () {
    this.logout();
    wx.navigateTo({
      url: '../user/login',
    })
  },
  /**
   * 日期格式化 2019-07-23
   */
  formatDate: function (date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday); //想要什么格式都可以随便自己拼
  },
  formatMoney: function (money) {
    return money.toFix(2);
  },
  /**
   * 将数值四舍五入(保留2位小数)后格式化成金额形式
   *
   * @param num 数值(Number或者String)
   * @return 金额格式的字符串,如'1,234,567.45'
   * @type String
   */
  formatCurrency: function (num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
      num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
      cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
  },
  /**
   * 时间戳换取时间字符串
   * @param {int} timestamp 
   */
  parseTimes: function (timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = "";
    // date += (d.getFullYear()) + "-";
    var _month = d.getMonth() + 1;
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + " ";
    date += (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":";
    date += (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes());
    // date += (d.getSeconds());
    return date;
  },
  /**
   * 时间戳换取日期字符串
   * @param {int} timestamp 
   */
  parseDate: function (timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = "";
    date += (d.getFullYear()) + "-";
    var _month = d.getMonth() + 1;
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate());
    return date;
  },
  /**
   * 时间戳换取日期时间字符串
   * @param {int} timestamp 
   */
  parseDatetime: function (timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = "";
    date += (d.getFullYear()) + "-";
    var _month = d.getMonth() + 1;
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + " ";
    date += (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":";
    date += (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()) + ":";
    date += (d.getSeconds() < 10 ? ("0" + d.getSeconds()) : d.getSeconds());
    return date;
  },
  /**
   * 时间戳换取简单日期时间字符串
   * @param {int} timestamp 
   */
  parseDatetimeSimple: function (timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = "";
    var _month = d.getMonth() + 1;
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + " ";
    date += (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":";
    date += (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes());
    return date;
  },
  /**
   * 获取当前简单日期时间字符串
   */
  nowDateTimeSimple: function () {
    var d = new Date(); //根据时间戳生成的时间对象
    var date = "";
    var _month = d.getMonth() + 1;
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + " ";
    date += (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":";
    date += (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes());
    return date;
  },
  /**
   * 获取今日日期
   */
  nowdate: function () {
    var d = new Date(); //根据时间戳生成的时间对象
    var date = "";
    var _month = d.getMonth() + 1;
    date += (d.getFullYear()) + "-";
    date += (_month < 10 ? ("0" + _month) : _month) + "-";
    date += (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate());
    return date;
  }
});

function Base64() {
  // private property  
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding  
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding  
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding  
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding  
  var _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

function encode_base64(str) {
  var base = new Base64();
  return base.encode(str);
}

function decode_base64(str) {
  var base = new Base64();
  return base.decode(str);
}

function safeEncode(str) {
  return encode_base64(str).replace(/[\+=\/]/g, function (c) {
    switch (c) {
      case '+':
        return '.';
      case '=':
        return '-';
      case '/':
        return '_';
    }
  })
}