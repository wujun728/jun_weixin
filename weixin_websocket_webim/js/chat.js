Ext.namespace("Mixky.wasoft.lib");

var isCRM = true;
var isDirect = typeof(OrganizAppDirect) != 'undefined';
DirectFunc ={};
DirectFunc.getUsers = isDirect ? OrganizAppDirect.getUsers : Ext.emptyFn;
DirectFunc.getZzjgTree = isDirect ? OrganizAppDirect.getZzjgTree : Ext.emtyFn;
DirectFunc.chkUser = isDirect ? OrganizAppDirect.chkUser :Ext.emtyFn;

MsgTip = function(){
    var msgCt;
    function createBox(t, s){
        return ['<div class="msg">',
            '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-size=12px;"><h3>', t, '</h3>', s, '</div></div></div>',
            '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            '</div>'].join('');
    }
    return {
        msg : function(title, message, autoHide, pauseTime){
            //给消息框右下角增加一个关闭按钮
            //message+='<br><span style="text-align:right;font-size:12px; width:100%;">' +
            //    '<font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></font></span>'
            this.display(false, title, message, autoHide, pauseTime);
        },
        msg_corner : function(title, message, autoHide, pauseTime){
            this.display(true, title, message, autoHide, pauseTime);
        },
        display: function(isCorner, title, message, autoHide, pauseTime){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body,
                    {
                        id:'msg-div22',
                        style:'position:absolute;top:10px;width:300px;margin:0 auto;z-index:20000;'
                    }, true);
            }
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, message)}, true);
            if(isCorner){
                msgCt.alignTo(document, 'br-br');
                m.slideIn('b');
            }
            else{
                msgCt.alignTo(document, 't-t');
                m.slideIn('t');
            }
            if(!Ext.isEmpty(autoHide) && autoHide==true){
                if(Ext.isEmpty(pauseTime)){
                    pauseTime = 3;
                }
                m.pause(pauseTime).ghost("tr", {remove:true});
            }
        },
        hide:function(v){
            var msg = Ext.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
            msg.ghost("tr", {remove:true});
        }
    };
}();
var ChatHelper = {
    VER: "在线交流V20121221",
    delay: 3000,         //保证渲染完成延时
    notifyDelay: 8000,  //提示信息延时时间
    maxLength: 512,     //最大发送信息长度
    maxImage: 512,      //最大传输图片 k
    maxPic:30,          //随机图片数量
    msgNum: 5 * 30,     //保留最新30条数据，每条信息是5个childnode
    maxLateUsers: 30,  //最多保存最近联系人数
    isFocus: true,
    ctrlEnter: true,
    picsUrl: [],        //图片资源
    audiosUrl: [],      //音频资源
    lateUsers: [],    //最近联系人
    LS_ITEM_LATEUSERS: 'LateUsers',
    autoOpens: [],    //自动弹屏
    LS_ITEM_AUTOOPENS: 'autoOpens',
    registEvent: (function(){
        window.onfocus = function (){
            ChatHelper.isFocus = true;
        };
        window.onblur = function (){
            ChatHelper.isFocus = false;
        };
        window.onbeforeunload = function(e){
            Chat.close();
            Console.log("exit");
            return "exit?";
        };
        Ext.fly(Ext.getDoc()).on("dragover",function(e) {
                e.stopPropagation();
                e.preventDefault();
            }
        ).on("drop",function(e) {
                e.stopPropagation();
                e.preventDefault();
            }
        );
    })(),
    initCtrl: function(){
        var _ce = localStorage.getItem('ctrlEnter');
        if(_ce == null){
            this.ctrlEnter = true;
            localStorage.setItem('ctrlEnter', 'true');
        }
        else{
            if(_ce == 'true'){
                this.ctrlEnter = true;
            }
            else{
                this.ctrlEnter = false;
            }
        }
    },
    initLateUsers: function(){
        var _lu = localStorage.getItem(this.LS_ITEM_LATEUSERS);
        if(_lu){
            this.lateUsers = Ext.decode(_lu);
            //this.log("read lateUsers from localStorage: " + this.lateUsers[0].sex);
        }
    },
    initResourceUrl: function(){
        var url = 'resources/images/common';
        this.picsUrl['notify'] = url + '/quote.gif';
        this.picsUrl['clear'] = 'resources/icon/app/common/gjdyhwd.gif';
        this.picsUrl['recorder'] = url + '/clock.gif';
        this.picsUrl['tip'] = url + '/favoriteon.png';
        url = 'resources/audio';
        this.audiosUrl['msg'] = url + '/msg.ogg';
        this.audiosUrl['group'] = url + '/group.ogg';
    },
    init: function(){
        this.initCtrl();
        this.initLateUsers();
        this.initResourceUrl();
    },
    setCtrlEnter: function(){
        var b = Ext.getCmp('btn_ctrl_enter');
        this.ctrlEnter = b.checked;
        this.log('ctrlEnter --> ' + this.ctrlEnter);
        localStorage.setItem('ctrlEnter', this.ctrlEnter);
    },
    fireClickEvent: function(e, o, buttonId){
        var button = Ext.getCmp(buttonId);
        if(this.ctrlEnter){
            if(e.ctrlKey && e.keyCode == Ext.EventObject.ENTER ){
                button.fireEvent('click');
            }
        }
        else if(e.keyCode == Ext.EventObject.ENTER){
            if(e.ctrlKey){
                o.setValue(o.getValue() + "\r\n");
            }
            else{
                button.fireEvent('click');
                e.preventDefault();
            }
        }
    },
    log: function(s){
        if (window.console && console.log){
            console.log(s);
        }
        else{
            //alert(s);
        }
    },
    getStrLength: function (str){
        var cArr = str.match(/[^\x00-\xff]/ig);
        return str.length + (cArr == null ? 0 : cArr.length);
    },
    isOverMax: function(s){
        return this.getStrLength(s) > this.maxLength;
    },
    dropImage: function(e, ctype, id){//ctype:对话类型
        e.stopPropagation();e.preventDefault();
        var files = e.browserEvent.dataTransfer.files;
        for (var i = 0, f; f = files[i]; i++) {
            var t = f.type ? f.type : 'n/a';
            if (t.indexOf('image') >= 0){//只支持图片格式
                var reader = new FileReader();
                reader.onload = (function (file){
                    return function (e) {
                        //Console.log(file.size + "," + e.target.result.length + "," + file.size/e.target.result.length);
                        //var img = '<img src="' + e.target.result + '" title="' + file.name + '"/>';
                        //var html = file.name +  ' - ' + file.size + ' bytes<p>' + img + '</p>';
                        if(file.size <= ChatHelper.maxImage*1024){
                            Chat.sendMessage( e.target.result, ctype, id, 'img');
                        }
                        else{
                            alert('上传文件请控制在' + ChatHelper.maxImage + 'k内');
                        }
                    };
                })(f);
                reader.readAsDataURL(f);
                return;
            }else {
                alert('只能发送图片');
            }
        }
    },
    insertHtml: function(cmpId, jsonData){
        var body = Ext.getCmp(cmpId).body;
        var cls = (jsonData.from == Chat.userid || jsonData.title.indexOf(Chat.getNickname()) == 0) ? "im-title-self" : "im-title-common";
        var html = "<p class=" + cls + ">" + jsonData.title + "</p><p class='im-content'>" + unescape(jsonData.content) + "</p>";
        body.insertHtml('beforeEnd', html);
    },
    addMsgToPanel: function(cmpId, jsonData){
        this.insertHtml(cmpId, jsonData);

        if(jsonData.from != 0){
            webSql.insertMsg(jsonData.from, jsonData.to, jsonData.title, jsonData.content);
        }
        var d = Ext.getCmp(cmpId).body.dom;
        //Console.log("Debug: length = " + d.childNodes.length);
        //删除旧信息，以msgNum为保留条数
        while (d.childNodes.length > this.msgNum) {
            d.removeChild(d.firstChild);
        }
        d.scrollTop = d.scrollHeight - d.offsetHeight;//滚屏
    },
    clearPanel: function(cmpId){
        var d = Ext.getCmp(cmpId).body.dom;
        while (d.lastChild){
            d.removeChild(d.lastChild);
        }
    },
    removeHTMLTag: function(str){
        str = str.replace(/<br>/g,'\n');//
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,' ');//去掉&nbsp;
        this.log(str);
        return str;
    },
    sendNotify: function(jsonData){
        Console.log("send to me msg: " + Ext.encode(jsonData) + ", isFocus: " + this.isFocus);
        if(!this.isFocus && this.isNotify()){
            var t = this.removeHTMLTag(jsonData.title);
            var ts = t.split(" ");
            var title = t.length >= 3 ? ts[0] + " " + ts[2] : t;
            var options = {
                url: ChatHelper.picsUrl['notify'],
                title: title,
                body : this.removeHTMLTag(unescape(jsonData.content))
            };
            var notify = new DesktopNotification(1, options, this.notifyDelay);
            notify.init();
        }
        else{
            Console.log("ignore notification");
        }
    },
    isNotify: function(){
        var message = new DesktopNotification();
        return message.checkSupport() && (message.checkPermission() == 0);
    },
    getPicurl: function(node){
        var picurl;
        if (isCRM){
            picurl = "download/photo/" + node.id + ".JPG";
        }
        else{
            if(node.pic){
                picurl = '/OA/upload/'+ node.id + '/thumbnails/' + node.pic;
            }
            else{
                picurl = '/OA/upload/nobody/' + Math.floor(Math.random()*this.maxPic + 1) + ".gif";
            }
        }
        Console.log("picurl: " + picurl);
        return picurl;
    },
    zd: function(winId){//振动，未使用
        var a=['top','left'],b=0;
        u = setInterval(function(){
            document.getElementById(winId).style[a[b%2]]=(b++)%4<2?0:4;
            if(b>15){clearInterval(u);b=0}
        },32)
    },
    getGroupIconClass: function(bFlash){
        return bFlash ? 'icon-sys-m_org_flash' : 'icon-sys-m_org';
    },
    clearGroupIconClass: function(el){
        Ext.Element.fly(el).removeClass('icon-sys-m_org_flash');
        Ext.Element.fly(el).removeClass('icon-sys-m_org');
    },
    getIconClass: function(json){
        return json.online ? this.getOnlineIconClass(json) : this.getOfflineIconClass();
    },
    getOfflineIconClass: function(){
        return 'icon-sys-m_user_off'
    },
    getOnlineIconClass: function(json){
        return json.sex == 0 ?
                    (json.status == 0 ? 'icon-sys-m_user': 'icon-sys-m_user_busy') :
                    (json.status == 0 ? 'icon-sys-m_leader': 'icon-sys-m_leader_busy');

    },
    clearIconClass: function(el){
        Ext.Element.fly(el).removeClass('icon-sys-m_user_off');
        Ext.Element.fly(el).removeClass('icon-sys-m_user');
        Ext.Element.fly(el).removeClass('icon-sys-m_user_busy');
        Ext.Element.fly(el).removeClass('icon-sys-m_leader');
        Ext.Element.fly(el).removeClass('icon-sys-m_leader_busy');
    }
};

ChatHelper.init();
var Console = {};
Console.log = ChatHelper.log;
Console.log('ctrlEnter from localStorage: ' + ChatHelper.ctrlEnter);

var geo = {
    getLocation: function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.coodrs, this.handleError, {enableHighAccuracy:true, maximumAge:1000});
        }else{
            alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
        }
    },
    handleError: function (value){
        switch(value.code){
            case 1:
                alert("位置服务被拒绝"); break;
            case 2:
                alert("暂时获取不到位置信息"); break;
            case 3:
                alert("获取信息超时");  break;
            case 4:
                alert("未知错误"); break;
        }
    },
    coodrs: function(value){
       alert("longitude=" + value.coords.longitude + ",latitude=" +  value.coords.latitude);
    },
    showMap: function(value){
        var longitude = value.coords.longitude;
        var latitude = value.coords.latitude;

        var point = new BMap.Point(longitude, latitude);
        var marker = new BMap.Marker(point);
        var map = new BMap.Map("map");
        map.centerAndZoom(point, 15);
        map.addOverlay(marker);
    },
    openMap: function(){
        window.open("map.html","_blank");
    }
}
Chatroom_sql = function (db_name, config) {
    var cf = config || {},
        cfg = {
            version:cf.version || '1.0',
            desc:cf.desc || 'db_' + db_name,
            size:cf.size || 10 * 1024
        },

        log = function (msg, cat, src) {
            if (window['console'] !== undefined && console.log) {
                console[cat && console[cat] ? cat : 'log'](msg);
            }
        },

    //sql中不能包含"?",例"select user where title like 'tb?'"
        formatSql = function (sql, data) {
            var count = 0;
            return sql.replace(/(\?)/g, function (a, b) {
                return data[count++];
            });
        },

    //初始化数据库
        db = function () {
            if (window['openDatabase'] !== undefined) {
                Console.log("Info: connect websql success!");
                return openDatabase(db_name, cfg.version, cfg.desc, cfg.size);
            } else {
                Console.log("Error: connect websql failed!");
                return null;
            }
        }();

    this.db = db;

    //执行sql操作
    this.execSql = function (sql, data, success, failure) {
        if (!db) {
            Console.log("Error: init database and table first!");
            return;
        }
        if (!data) {
            data = [];
        }
        if (success === undefined) {
            success = function (tx, results) {
                Console.log("Info: success --> " + formatSql(sql, data));
            }
        }
        var errfun = toString.call(failure) === '[object Function]' ?
            function (tx, err) {
                failure.call(this, tx, err, formatSql(sql, data));
            } :
            function (tx, err) {
                Console.log("Error:failed --> msg:" + err.message + " sql:" + formatSql(sql, data));
            };
        db.transaction(function (tx) {
            try {
                tx.executeSql(sql, data, success, errfun)
            } catch (e) {
                Console.log("Error: database execute -->" + e.message);
            }
        });
    };
};

var webSql = {
    maxRecorderNum: 5000,
    support: false,
    chatTable: 't_chat_130220',
    chatSql: "",
    init: function(){
        this.chatSql = new Chatroom_sql("ChatRoom", {version:"1.0", desc:"chat", size: 5*1024*1024});
        //this.chatSql.execSql("drop table t_chat");
        this.chatSql.execSql("CREATE TABLE IF NOT EXISTS " + webSql.chatTable + "(" +
            "id integer primary key autoincrement," +
            "f_timestamp TIMESTAMP default (datetime('now', 'localtime'))," +
            "f_from integer, f_to integer, f_title, f_msg TEXT)");
        this.support = true;

        this.qureyMsgCount();
    },
    insertMsg: function(f_from, f_to, f_title, f_msg){
        if(this.support){
            var sql = "INSERT INTO " + webSql.chatTable + "(f_from, f_to, f_title, f_msg) values(?, ?, ?, ?)";
            this.chatSql.execSql(sql, [f_from, f_to, f_title, f_msg]);
        }
    },
    qureyMsgCount: function(){
        if(this.support){
            var sql = "SELECT count(*) cnt FROM " + webSql.chatTable;
            this.chatSql.execSql(sql, [],function(tx, result) {
                    var cnt = result.rows.item(0)['cnt'];
                    Console.log("count = " + cnt);
                    if (cnt > webSql.maxRecorderNum){//如果超过设定的最大记录，就删除一个月前的记录
                        var sql = "delete from " + webSql.chatTable + " where f_timestamp <= datetime('now','-30 day')";
                        webSql.chatSql.execSql(sql, []);
                        Console.log("delete data before 30 days");
                    }
                    else{
                        Console.log("space is enough not delete data");
                    }
                }
            );
        }
    },
    queryMsg: function(cmpId, isGroup, id){
        if(this.support){
            var sql = "SELECT * FROM " + webSql.chatTable + " where ";
            sql += isGroup ? "f_to=" + id : "f_from=" + id + " and f_to=" + Chat.userid;
            sql += " order by id";
            this.chatSql.execSql(sql, [],function(tx, result) {
                    for(var i = 0; i < result.rows.length; i++) {
                        var jsonData = {
                            from:result.rows.item(i)['f_from'],
                            to:  result.rows.item(i)['f_to'],
                            title: result.rows.item(i)['f_title'],//Chat.getNickname() + "&nbsp;" + result.rows.item(i)['f_timestamp'],
                            content:result.rows.item(i)['f_msg']
                        };
                        ChatHelper.insertHtml(cmpId, jsonData);
                    }
                    var d = Ext.getCmp(cmpId).body.dom;
                    d.scrollTop = d.scrollHeight - d.offsetHeight;//滚屏
                }
            );
        }
        else{
            alert("本浏览器不支持离线存储！")
        }
    }
}
webSql.init();

function DesktopNotification(notificationStyle, options, displayTime) {
    /**
     *@param {Number} notificationStyle 设定创建消息框方式，可取值1（纯文本方式）, 2（HTML方式） 默认为1
     *@param {Object} options 设定消息体参数，包含三个属性（url, title, body),如果notificationStyle值为2，只需定义url属性
     *@param {Number} displayTime 设定消息显示时间，单位ms, 默认为2000
     */
    this.isSupport = undefined,
        this.permissionStatue = 1,  //PERMISSION_ALLOWED: 0,  PERMISSION_NOT_ALLOWED: 1, PERMISSION_DENIED: 2
        this.notificationStyle = notificationStyle || 1,
        this.options = options ||{url: "", title: "", body: ""},
        this.displayTime = displayTime || 2000,
        this.content = undefined
}
DesktopNotification.prototype = {
    constructor: DesktopNotification,

    checkSupport: function(){
        this.isSupport = !!window.webkitNotifications;
        return this.isSupport;
    },
    checkPermission: function(){
        if(this.checkSupport){
            return window.webkitNotifications.checkPermission();
        }
        else{
            return -1;
        }
    },
    requestPermission: function(){
        Console.log("requestPermission");
        window.webkitNotifications.requestPermission();
        this.permissionStatue = window.webkitNotifications.checkPermission();
    },
    checkPermissionStatue: function(){
        if(this.permissionStatue == 0){
            this.notificationContent();
        }
        else if (this.permissionStatue == 2){
            var win = new Ext.Window({
                layout:'fit',
                width:350,
                height:150,
                plain: true,
                html: '你曾经拒绝了对本网站的消息提醒，选择以下信息拖到浏览器地址栏：<br><br>' +
                    '<b>chrome://settings/contentExceptions#notifications</b><br><br>' +
                    '删掉对本网站中通知例外情况的行为禁止，再重新登录系统。'
            });
            win.show();
        }
        else{
            Console.log("permissionStatue: " + this.permissionStatue);
        }
    },

    notificationContent: function(){
        var self = this;
        switch(this.notificationStyle){
            case 1 :
                this.content = window.webkitNotifications.createNotification(this.options.url, this.options.title, this.options.body);
                break;
            case 2 :
                this.content = window.webkitNotifications.createHTMLNotification(this.options.url);
                break;
            default :
                alert('Sorry, you have not defined the notificationStyle.');
        };

        this.content.replaceId = this.replaceId;
        this.content.onshow = function(){
            setTimeout(function(){
                self.content.cancel();
            }, self.displayTime)
        }
        this.content.onclick = function(){
            //激活弹出该通知窗口的浏览器窗口
            window.focus();
            //打开IM窗口

            //关闭通知窗口
            //cancel();
        };
        this.content.show();
    },

    init: function(){
        this.checkSupport();
        if(this.isSupport){
            this.requestPermission();
            this.checkPermissionStatue();
        }
        else{
            Console.log("your browser is not support notification!");
        }
        //(window).bind( 'blur', this.windowBlur).bind( 'focus', this.windowFocus);
    }
}
var chatWindow;
Mixky.wasoft.lib.chatroom = function(){
    if (!chatWindow){
        if(!Mixky.wasoft.lib.chatroom.init()){
            Console.log("Error: init failed");
            return;
        }
        else{
            Console.log("Info: init success");
        }
    }
    if(Chat.isWinShowed){
        chatWindow.show();
    }
    else{
        chatWindow.show();
        Chat.sendRefreshOnlineListCmd();
        Chat.sendRefreshOnlineListCmd();
    }
}
Mixky.wasoft.lib.chatroom.init = function(){
    if(!Chat.isSupportWs()){
        Console.log("Error: not support WebSocket");
        return false;
    }
    this.msgPanel = new Ext.Panel({
        id: "msgPanel",
        autoScroll: true,
        region:"center"
    });
    this.sendPanel = new Ext.Panel({
        region:"south",
        layout:"fit",
        title:"信息输入",
        height:160,
        items:[
            {
                id:"inputAllBox",
                xtype:"textarea",
                region:"center",
                allowBlank:false,
                blankText:'输入内容不可为空',
                enableKeyEvents:true,
                listeners:{
                    'keydown': function(o, e){
                        ChatHelper.fireClickEvent(e, o, "sendAllBtn");
                    }
                }
            }
        ],
        buttons:[
            {
                text: "关 闭",
                handler: function(){
                    chatWindow.hide();
                }
            },
            {
                id: 'sendAllBtn',
                xtype: 'splitbutton',
                text: "发 送",
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            id:'btn_enter',
                            text: '按Enter键发送消息',
                            group:'ctrl',
                            checked: !ChatHelper.ctrlEnter
                        },
                        {
                            id:'btn_ctrl_enter',
                            text: '按Ctrl+Enter键发送消息',
                            group:'ctrl',
                            checked: ChatHelper.ctrlEnter,
                            checkHandler: function(){
                                ChatHelper.setCtrlEnter();
                            }
                        }
                    ]
                }),
                listeners: {
                    'click':function(){
                        var inputbox = Ext.getCmp("inputAllBox");
                        var s = inputbox.getValue();
                        if(ChatHelper.isOverMax(s)){
                            Ext.MessageBox.alert('提 示', '发送信息过长，请删除部分要发送的信息！');
                        }
                        else if(Chat.sendMessage(s)){
                            inputbox.reset();
                            inputbox.focus();
                        }
                    }
                }
            }
        ]
    });
    this.leftPanel = new Ext.Panel({
        region : 'center',
        layout : 'border',
        border : false,
        items : [this.msgPanel, this.sendPanel]
    });
    var userstore = new Ext.data.DirectStore({
        autoLoad : false,
        paramsAsHash: true,
        directFn : DirectFunc.getUsers,
        reader:new Ext.data.JsonReader({
            totalProperty:'totals',
            root		: 'results',
            fields: ['display', 'value']
        })
    });

    this.quickPanel = new Ext.Panel({
        id: "quickPanel",
        region:"north",
        layout:"fit",
        height:22,
        items:[
            {
                id:"quickSearchBox",
                xtype:"combo",
                region:"center",
                triggerAction:'all',
                width:120,
                mode:'remote',
                valueField:'value',
                displayField:'display',
                editable:true,
                store:userstore,
                listWidth:160,
                pageSize:100,
                selectOnFocus:true,
                minChars:1,
                applicationkey:"OA",
                triggerClass:'x-form-search-trigger',
                onTriggerClick:function(){
                        Mixky.editor.showOrganizationWindow(function(display, value){
                            var v=value.toString().replace("U_","");
                            Ext.getCmp('quickSearchBox').setValue(v);
                            Ext.getCmp('quickSearchBox').setRawValue(display);
                            chatWindow.openChatUser(v);
                        }, undefined, {selectMulti:false,selectType:'user',valueSeparator:'、'});
                },
                listeners:{
                    'select':function(c,r,i){
                        var value = this.getRawValue().split(' ')[1];
                        this.setRawValue(value);
                        chatWindow.openChatUser(this.getValue());
                    },
                    'change':function(c,r,i){
                        var bm = this.getRawValue();
                        if(bm.trim()!=""){
                            DirectFunc.chkUser(bm,function(result, e){
                                if (result&&result.success) {
                                    this.setValue(result.id);
                                    this.setRawValue(result.caption);
                                }
                                else{
                                    Ext.MessageBox.show({title:'提示',msg:result.msg,modal:true,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING,
                                        width:250,closable:false,fn:function(){
                                            this.setValue('');
                                            this.setRawValue('');
                                        }});
                                }
                            });
                        }
                    }
                }
            }
        ]
    });

    this.onlineTreePanel = new Ext.tree.TreePanel({
        id:'im-tree',
        title: '在线用户',
        //loader: new Ext.tree.TreeLoader(),
        rootVisible:false,
        lines:false,
        autoScroll:true,
        tools:[{
            id:'refresh',
            on:{
                click: function(){
                    var tree = Ext.getCmp('im-tree');
                    //考虑使用回调
                    tree.body.mask('Loading', 'x-mask-loading');
                    Chat.sendRefreshOnlineListCmd();
                    tree.body.unmask();
                }
            }
        }],
        root: new Ext.tree.AsyncTreeNode({
            text:'',
            children:[{
                id:'workgroup',
                text:'工作组',
                expanded:false,
                children:[]
            },{
                id:'online',
                text:'在线用户',
                expanded:true,
                children:[]
            },{//缓存离线用户，可以屏蔽向离线用户发信息时前端报错
                id:'offline',
                text:'离线用户',
                hidden:true,
                children:[]
            }]
        }),
        onlineUserMenu: new Ext.menu.Menu({
            items: [
                {
                    id: 'user-open',
                    text: '发送即时消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode
                        if(node.id != Chat.userid){
                            winMgr.openWindow(node);
                        }
                        else{
                            //geo.openMap();
                        	winMgr.openUploadWin();
                        }
                    }
                },
                {
                    id: 'view-history',
                    text: '查看历史消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode
                        if(node.id != Chat.userid){
                            winMgr.openHistoryWindow(node);
                        }
                    }
                },
                {
                    id:'user-busy',
                    text: '设置忙碌',
                    handler: function(item){
                        var node = item.parentMenu.contextNode
                        if(node.id == Chat.userid){
                            node.status = node.status == 0 ? 1 : 0;
                            Console.log("send user status: " + node.status);
                            var jsonData = {
                                userid: node.id,
                                status: node.status
                            };
                            Chat.sendUserStatusCmd(Ext.encode(jsonData))//title: json = {f_userid,status}
                            Chat.status = node.status;
                        }
                    }
                }
            ]
        }),
        workgroupMenu: new Ext.menu.Menu({
            items: [
                {
                    id: 'group-create',
                    //icon: 'images/write.gif',
                    text: '创建工作组',
                    handler: function(){
                        var w = winMgr.openCreateGroupWin();
                        w.init();
                    }
                }]
        }),
        itemMenu: new Ext.menu.Menu({
            items: [
                {
                    id: 'group-open',
                    text: '打开工作组'
                },
                {
                    id: 'group-open-history',
                    text: '查看历史消息'
                },
                {
                    id: 'group-update',
                    text: '修改工作组'
                },
                {
                    id: 'group-destroy',
                    text: '解散工作组'
                },
                {
                    id: 'group-exit',
                    text: '退出工作组'
                }
//                ,{
//                    id: 'group-auto',
//                    text: '关闭自动弹屏'
//                }
            ],
            listeners: {
                itemclick: function(item) {
                    var n = item.parentMenu.contextNode;
                    switch (item.id) {
                        case 'group-open':
                            if(n.parentNode.id == 'workgroup'){
                                Chat.sendRefreshGroupUser(n.id);
                            }
                            break;
                        case 'group-open-history':
                            if(n.parentNode.id == 'workgroup'){
                                var w = winMgr.openGroupWindow(n.id);
                                w.histroy();
                            }
                            break;
                        case 'group-destroy':
                            if(n.crtuser == Chat.userid){//必须创建者
                                Ext.MessageBox.confirm('提示', '确定要解散[' + n.text + ']工作组吗？', function(btn){
                                    if (btn == 'yes'){
                                        Chat.sendDestroyGroupCmd(n.id);
                                        if (n.parentNode) {
                                            n.remove();
                                        }
                                    }
                                    else{
                                        Console.log("Info: cancel destroy workgroup");
                                    }
                                });
                            }
                            else{
                                Ext.MessageBox.alert('警告','只有创建者才能解散工作组!');
                            }
                            break;
                        case 'group-exit':
                            if(n.crtuser == Chat.userid){
                                alert("你是该工作组的创建者不能退出！");
                            }
                            else{
                                Ext.MessageBox.confirm('提示', '退出该工作组，将收取不到来自该工作组的信息，你确定要退出吗？', function(btn){
                                    if (btn == 'yes'){
                                        var jsonData = {
                                            wgid: n.id,
                                            userid:Chat.userid
                                        };
                                        Chat.sendExitGroupCmd(Ext.encode(jsonData));
                                    }
                                    else{
                                        Console.log("Info: cancel destroy workgroup");
                                    }
                                });
                            }
                            break;
                        case 'group-update':
                            var config = {
                                id:  n.id,
                                name:n.text,
                                note:n.note
                            };
                            config.crtuser = (n.crtuser == Chat.userid);
                            var w = winMgr.openCreateGroupWin();
                            w.init(config);
                            break;
                        case 'group-auto':
                            alert("正在研发中...");
                            break;
                        default:
                            Console.log("not surpport");
                    }
                }
            }
        }),
        listeners:{
            dblclick:function(node, e){
                if (node.isLeaf()){
                    if(node.parentNode.id == 'online'){
                        if(node.id == Chat.userid){
                            //Console.log('Debug: ignore myself node');
                            winMgr.openUploadWin();
                        }
                        else{
                            winMgr.openWindow(node);//打开用户对话窗口
                        }
                    }
                    else if(node.parentNode.id == 'workgroup'){
                        Chat.sendRefreshGroupUser(node.id);
                    }
                    else{
                        Console.log('Debug: ignore this node!');
                    }
                }
            },
            contextmenu: function(node, e) {
                node.select();
                var c;
                if(node.parentNode.id == 'online'){
                    c = node.getOwnerTree().onlineUserMenu;
                    if(node.id == Chat.userid){
                        c.items.get(1).hide();
                        c.items.get(2).show();
                        var busy = c.items.get(2).getEl();
                        if(busy){
                            if(node.status == 0){//chrome debug
                                busy.dom.innerText = '设置忙碌';
                            }
                            else{
                                busy.dom.innerText = '取消忙碌';
                            }
                        }
                    }
                    else{
                        c.items.get(1).show();
                        c.items.get(2).hide();
                    }
                }
                else if(node.id == 'workgroup'){
                    c = node.getOwnerTree().workgroupMenu;//创建工作组菜单
                }
                else if( node.parentNode.id == 'workgroup'){
                    c = node.getOwnerTree().itemMenu;//工作组管理菜单
                    if(node.crtuser == Chat.userid){
                        Console.log("Debug: display all menu");
                    }
                    else{
                        Console.log("Debug: display simple menu");
                    }
                }
                else{
                    return;
                }
                c.contextNode = node;
                c.showAt(e.getXY());
            }
        }
    });
    this.lateTreePanel = new Ext.tree.TreePanel({
        id:'late-tree',
        title: '最近联系人',
        rootVisible:false,
        lines:false,
        autoScroll:true,
        tools:[{
            id:'refresh',
            on:{
                click: function(){
                    var tree = Ext.getCmp('late-tree');
                    tree.refreshList();
                }
            }
        }],
        root: new Ext.tree.AsyncTreeNode({
            text:'',
            children:[{
                id:'lateUser',
                text:'最近联系人',
                expanded:true,
                children:[]
            }]
        }),
        refreshList: function(){
            chatWindow.refreshLateUserNum();
        },
        contextMenu: new Ext.menu.Menu({
            items: [
                {
                    id: 'lateUser-open',
                    text: '发送即时消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode;
                        chatWindow.openChatUser(node.id);
                    }
                },
                {
                    text: '查看历史消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode;
                        winMgr.openHistoryWindow(node);
                    }
                }
            ]
        }),
        contextMenu_a: new Ext.menu.Menu({
            items: [
                {
                    id: 'lateUser-clear',
                    text: '清空最近联系人',
                    handler: function(item){
                        chatWindow.clearLateUsers();
                    }
                }
            ]
        }),
        listeners:{
            dblclick:function(node, e){
                if (node.isLeaf()){
                    if(node.parentNode.id == 'lateUser'){
                        chatWindow.openChatUser(node.id);
                    }
                    else{
                        Console.log('Debug: ignore root node!');
                    }
                }
            },
            contextmenu: function(node, e){
                node.select();
                var c = node.isLeaf() ? node.getOwnerTree().contextMenu : node.getOwnerTree().contextMenu_a;
                c.contextNode = node;
                c.showAt(e.getXY());
            }
        }
    });
    this.orgTreePanel = new Ext.tree.TreePanel({
        id:'orgTree',
        title:'组织结构',
        autoScroll: true,
        rootVisible: false,
        enableDrag:true,
        root: {
            text : '组织结构',
            iconCls:'icon-administrator-dept',
            type : isCRM ? 0 : 100,
            key : 0
        },
        loader: new Ext.tree.TreeLoader({
            directFn : DirectFunc.getZzjgTree,
            paramOrder : ['id','type'],
            baseParams : {'id':0,'type':0},
            preloadChildren : true,
            listeners : {
                'beforeload':function(loader, node){
                    Ext.apply(this.baseParams,{'id':parseInt(node.attributes['key'],10)});
                    Ext.apply(this.baseParams,{'type':parseInt(node.attributes['type'],10)});
                },
                'load':function(loader, node){
//                    node.expand();
//                    if(Ext.isDefined(tree.onLoadSelectKey)){
//                        var sn = tree.getNodeById(tree.onLoadSelectKey);
//                        if(sn){
//                            sn.select();
//                        }
//                        tree.onLoadSelectKey = undefined;
//                    }
                }
            }
        }),
        tools : [{
            id : 'maximize',
            qtip : '展开节点',
            handler : function(){
                Ext.getCmp('orgTree').expandAll();
            }
        },{
            id : 'minimize',
            qtip : '收合节点',
            handler : function(){
                Ext.getCmp('orgTree').collapseAll();
            }
        },{
            id : 'refresh',
            qtip : '刷新选中菜单的下级菜单',
            handler : function(){
                var tree = Ext.getCmp('orgTree');
                tree.refresh();
            }
        }],
        refresh : function(node){
            if(!node){
                node = this.getSelectionModel().getSelectedNode();
            }
            if(!node){
                node = this.getRootNode();
            }
            node.attributes.children = undefined;
            node.reload();
        },
        reload:function(){
            var tree = Ext.getCmp('orgTree');
            tree.refresh();
        },
        onlineUserMenu: new Ext.menu.Menu({
            items: [
                {
                    id: 'org-user-open',
                    text: '发送即时消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode;
                        var userid = node.attributes['key'];
                        if (isCRM){
                            var uid = node.attributes['uid'];
                            Console.log("uid = " + uid);
                            if (uid == ''){
                                Ext.MessageBox.alert("提 示", "未给此人创建操作用户");
                                return;
                            }
                            var arr = uid.split(",");
                            for(var i = 0; i < arr.length; i++){
                                userid = arr[i];
                                if(chatWindow.isOnline(userid)){
                                    break;
                                }
                            }
                        }
                        chatWindow.openChatUser(userid);
                    }
                },
                {
                    text: '查看历史消息',
                    handler: function(item){
                        var node = item.parentMenu.contextNode;
                        var userid = node.attributes['key'];
                        if (isCRM){
                            var uid = node.attributes['uid'];
                            Console.log("uid = " + uid);
                            if (uid == ''){
                                Ext.MessageBox.alert("提 示", "未给此人创建操作用户");
                                return;
                            }
                            var arr = uid.split(",");
                            for(var i = 0; i < arr.length; i++){
                                userid = arr[i];
                                if(chatWindow.isOnline(userid)){
                                    break;
                                }
                            }
                        }
                        if(userid != Chat.userid){
                            node.id = userid;
                            winMgr.openHistoryWindow(node);
                        }
                    }
                }
            ]
        }),
        listeners:{
            'dblclick': function(node, e){
                if (node.isLeaf()){
                    var userid = node.attributes['key'];
                    if (isCRM){
                        var uid = node.attributes['uid'];
                        Console.log("uid = " + uid);
                        if (uid == ''){
                            Ext.MessageBox.alert("提 示", "未给此人创建操作用户");
                            return;
                        }
                        var arr = uid.split(",");
                        for(var i = 0; i < arr.length; i++){
                            userid = arr[i];
                            if(chatWindow.isOnline(userid)){
                                break;
                            }
                        }
                    }
                    chatWindow.openChatUser(userid);
                }
                else{
                    Console.log('Debug: ignore the department node!');
                }
            },
            'contextmenu': function(node, e) {
                node.select();
                if(node.isLeaf()){
                    var c = node.getOwnerTree().onlineUserMenu;
                    c.contextNode = node;
                    c.showAt(e.getXY());
                }
            }
        }
    });
    this.userPanel = new Ext.Panel({
        xtype:"panel",
        //title:"用户列表",
        region:"center",
        split:true,
        collapsible: false,
        layout:'accordion',
        border:false,
        layoutConfig: {
            animate:false
        },
        items: [this.onlineTreePanel, this.lateTreePanel, this.orgTreePanel]
    });

    this.rightPanel = new Ext.Panel({
        xtype:"panel",
        title:"快速查找",
        region:"east",
        width:210,
        minWidth:210,
        maxWidth:300,
        split:true,
        collapsible: true,
        layout:'border',
        items: [this.quickPanel, this.userPanel]
    });
    chatWindow = new Ext.Window ({
        id: 'MainWin',
        title:ChatHelper.VER,
        layout:"border",
        width:700,
        height:500,
        collwidth: 210 + 15,
        collheight: 600,
        closable:true,
        minimizable:false,
        maximizable:false,
        constrain:true,
        plain:true,
        closeAction:"hide",
        items : [this.leftPanel, this.rightPanel],
        _width: this.width,
        _height: this.height,
        _position:[],
        _normal: true,
        padding: function(){//紧靠顶部和右边
            this._width = this.getWidth();
            this._height = this.getHeight();
            this._position = this.getPosition();
            this.setWidth(this.collwidth);
            this.setHeight(this.collheight);
            this.setHeight(document.body.clientHeight - 0);//减去菜单栏和状态栏高度
            this.setPosition( document.body.clientWidth - this.collwidth, 0);//窗口紧靠右边
        },
        alternate: function(){
            if(this._normal){
                this.padding();
                this.collapsible = true;
            }
            else{
                this.setWidth(this._width);
                this.setHeight(this._height);
                this.setPosition(this._position[0], this._position[1]);
                this.collapsible = false;
            }
            this._normal = !this._normal;
        },
        collapse:function(){
            if(chatWindow.hidden){
                this._normal = !this._normal;
                this.padding();
                chatWindow.show();
                return;
            }
            if(this._normal){
                //this.setHeight(document.body.clientHeight - 0);
                chatWindow.show();
            }
            else{
                //this.setHeight(0);
                chatWindow.hide();
            }
            this._normal = !this._normal;
        },
        listeners:{
            'show': function(){
                if(!Chat.isWinShowed){
                    this.initLateUsers(ChatHelper.lateUsers);
                    Chat.isWinShowed = true;
                }
                Console.log("Info: show chatWindow");
            },
            'destroy': function(){
                Console.log("Info: chatWindow destroy,close the websocket");
                Chat.close();
            },
            'minimize': function(){
                this.collapse();
            }
        },
        //刷新在线用户数
        refreshOnlineUserNum: function(){
            var node = Ext.getCmp("im-tree").getNodeById("online");
            var i = 0;
            node.eachChild(function(){i++});
            node.setText("在线用户(" + i + ")");
        },
        refreshWorkGroupNum: function(){
            var node = Ext.getCmp("im-tree").getNodeById("workgroup");
            var i = 0;
            node.eachChild(function(){i++});
            node.setText("工作组(" + i + ")");
        },
        refreshLateUserNum:function(){
            var rootnode = Ext.getCmp("late-tree").getNodeById("lateUser");
            var iOn = 0;
            var iTotal = 0;
            var me = this;
            Console.log("Debug: refresh all node ");
            rootnode.eachChild(function(node){
                iOn += me.setIconClass(node);
                iTotal++;
            });
            rootnode.setText("最近联系人(" + iOn + "/" + iTotal + ")");
        },
        setIconClass: function(node){
            //Console.log("sex: " + node.sex + "," +  node.status);
            var cls = ChatHelper.getOnlineIconClass(node);
            var cls_off = ChatHelper.getOfflineIconClass();
            //Console.log("  cls: " + cls);
            var imgHtmlEl = node.getUI().getIconEl();
            ChatHelper.clearIconClass(imgHtmlEl);
            //Ext.Element.fly(imgHtmlEl).replaceClass();
            if(this.isOnline(node.id)){
                Ext.Element.fly(imgHtmlEl).addClass(cls);
                return 1;
            }
            else{
                Ext.Element.fly(imgHtmlEl).addClass(cls_off);
                return 0;
            }
        },
        setGroupClass: function(wgid, bFlash){
            var node = Ext.getCmp("im-tree").getNodeById(wgid);
            node["flash"] = bFlash;
            var cls = ChatHelper.getGroupIconClass(bFlash);
            var imgHtmlEl = node.getUI().getIconEl();
            ChatHelper.clearGroupIconClass(imgHtmlEl);
            Ext.Element.fly(imgHtmlEl).addClass(cls);
        },
        refreshGroupUserList:function(){

        },
        refreshOpenedGroup: function(){
            var node = Ext.getCmp("im-tree").getNodeById("workgroup");
            node.eachChild(function(n){
                var w = winMgr.getGroupWin(n.id);
                if(!!w){
                    Console.log(n.text + " is opened");
                    if(!w.hidden){
                        Console.log("window is showed, update user info");
                    }
                    else{
                        Console.log("this window is hidden, ignore");
                    }
                }
                else{
                    //Console.log(n.text + " not is opened");
                }
            });
        },
        getWorkGroupName: function(wgid){
            var node = Ext.getCmp("im-tree").getNodeById(wgid);
            return node.text;
        },
        getWorkGroupCreater: function(wgid){
            var node = Ext.getCmp("im-tree").getNodeById(wgid);
            return node.crtuser;
        },
        getOnlineUserNode: function(userid){
            return Ext.getCmp("im-tree").getNodeById(userid);
        },
        openChatUser: function(userid){
            if(userid == Chat.userid){
                Console.log('Debug: ignore myself node');
            }
            else{
                if(this.isOnline(userid)){
                    var onlineUser = this.getOnlineUserNode(userid);
                    if(onlineUser){
                        winMgr.openWindow(onlineUser);
                    }
                }
                else{
                    Console.log("Debug: " + userid + " is offline!");
                    Chat.sendSmsGetPhoneCmd(userid);
                }
            }
        },
        isMyGroup: function(wgid){
            var node = Ext.getCmp("im-tree").getNodeById("workgroup");
            var childNodes = node.childNodes;
            for(var i = 0; i < childNodes.length; i++){
                if (childNodes[i].id == wgid){
                    return true;
                }
            }
            Console.log("Debug: " + wgid + " is not my group!");
            return false;
        },
        isOnline: function(userid){
            var node = Ext.getCmp("im-tree").getNodeById("online");
            if(node){
                var childNodes = node.childNodes;
                for(var i = 0; i < childNodes.length; i++){
                    if(childNodes[i].id == userid){
                        return true;
                    }
                }
            }
            return false;
        },
        getStatus: function(userid){
            var node = Ext.getCmp("im-tree").getNodeById(userid);
            if(node){
                return node.status;
            }
            else{
                return 0;
            }
        },
        //增加在线用户
        addOnlineUser : function(jsonData){
            if(this.isOnline(jsonData.join)){
                Console.log("user [" + jsonData.join + "] is online.");
                return;
            }
            var tree = Ext.getCmp("im-tree");
            var onlineNode = tree.getNodeById("online");
            if(onlineNode){
                try{
                    var caption = jsonData.title;
                    //获取自己的userid
                    if(jsonData.from == jsonData.join && jsonData.from == jsonData.to){
                        Chat.setUserid(jsonData.join);
                        Chat.setNickname(caption);
                        caption = "<b>" + caption + "</b>";
                        Console.log("Info: " + Chat.userid + "," + Chat.getNickname());
                    }
                    var node = new Ext.tree.TreeNode({
                        id:     jsonData.join,
                        text:   caption,
                        iconCls: ChatHelper.getOnlineIconClass(jsonData),
                        leaf:    true
                    });
                    node["pic"] = jsonData.picname;
                    node["zw"] = jsonData.zw||'未分配职务';
                    node["mobile"] = jsonData.mobile||'10086';
                    node["bm"] = jsonData.bm||'未分配部门';
                    node["sex"] = jsonData.sex;
                    node["status"] = jsonData.status;

                    onlineNode.appendChild(node);
                    if (!onlineNode.isExpanded()){
                        onlineNode.expand();
                    }
                    //更新打开窗口的个人信息
                    //更新最近联系人列表
                    this.refreshOnlineUserNum();
                    this.refreshLateUserNum();
                    this.refreshOpenedGroup();
                }catch(e){
                    Console.log("Error: add node failed!" + e);
                }
            }
            else{
                Console.log("Error: online node is not find!");
            }
        },
        setUserStatus: function(userid, status){//设置用户状态
            var node = Ext.getCmp("im-tree").getNodeById(userid);
            if(node){
                node.status = status;
                this.setIconClass(node);
            }
            //更新最近联系人状态
            node = Ext.getCmp("late-tree").getNodeById(userid);
            if(node){
                node.status = status;
                this.refreshLateUserNum();
            }
        },
        //移出在线用户
        removeOnlineUser : function(userid){
            var tree = Ext.getCmp("im-tree");
            var onlineNode = tree.getNodeById("online");
            if(userid){
                var node = tree.getNodeById(userid);
                if (node){
                    //加入下线用户列表，为离线用户定位窗口
                    //Console.log("Info: add offline user: ");
                    var offlineNode = tree.getNodeById("offline");
                    offlineNode.appendChild(node.remove(true));
                }
                else{
                    Console.log("Error: node of removed is not find!")
                }
                this.refreshLateUserNum();//刷新最近列表
            }
            else{
                if(onlineNode){
                    onlineNode.removeAll();
                }
            }
            this.refreshOnlineUserNum();
            this.refreshOpenedGroup();
        },
        addLateUser: function(userNode){
            Console.log("Debug: add user node to late: " + userNode.id + "," + userNode.sex);
            //在窗口打开时已经控制
            var oldNode = Ext.getCmp("late-tree").getNodeById(userNode.id);
            if (oldNode){
                Console.log("Debug: del the oldNode:" + oldNode.id);
                oldNode.remove(true);
            }
            var rootNode =  Ext.getCmp("late-tree").getNodeById("lateUser");
            if(rootNode){
                Console.log("icon class:" + ChatHelper.getOnlineIconClass(userNode));
                var n = new Ext.tree.TreeNode({
                    id:     userNode.id,
                    text:   userNode.text,
                    iconCls: ChatHelper.getOnlineIconClass(userNode),
                    leaf:    true
                });
                n.sex = userNode.sex;
                n.status = userNode.status;
                if(rootNode.firstChild){
                    Console.log("insert the first node");
                    rootNode.insertBefore(n, rootNode.firstChild);
                }
                else{
                    Console.log("append node");
                    rootNode.appendChild(n);
                }
                if (!rootNode.isExpanded()){
                    rootNode.expand();
                }
                this.refreshLateUserNum();

                localStorage.setItem(ChatHelper.LS_ITEM_LATEUSERS, Ext.encode(this.getLateUsers()));
            }
            else{
                Console.log("Error: lateUser node is not find!");
            }
        },
        getLateUsers: function(){
            var rootnode = Ext.getCmp("late-tree").getNodeById("lateUser");
            var users = [];
            rootnode.eachChild(function(node){
                if(users.length < ChatHelper.maxLateUsers){
                    var n = {
                        id: node.id,
                        text: node.text,
                        sex: node.sex,
                        status: node.status
                    }
                    users.push(n);
                }
            });
            //Console.log(users);
            return users;
        },
        clearLateUsers: function(){
            var rootnode = Ext.getCmp("late-tree").getNodeById("lateUser");
            rootnode.removeAll(true);
            this.refreshLateUserNum();
            localStorage.setItem(ChatHelper.LS_ITEM_LATEUSERS, "");
        },
        initLateUsers: function(users){
            if(users.length > 0){
                Console.log("Info: init lateUsrs of " + users.length);
                var rootNode =  Ext.getCmp("late-tree").getNodeById("lateUser");
                if(rootNode){
                    for(var i = 0; i < users.length; i++){
                        users[i].status = this.getStatus(users[i].id);
                        var n = new Ext.tree.TreeNode({
                            id:     users[i].id,
                            text:   users[i].text,
                            iconCls: ChatHelper.getOnlineIconClass(users[i]),
                            leaf:    true
                        });
                        n.sex = users[i].sex;
                        n.status = users[i].status;
                        rootNode.appendChild(n);
                    }
                    rootNode.expand();
                    this.refreshLateUserNum();
                }
                else{
                    Console.log("Error: init lateUser node is not find!");
                }
            }
            else{
                Console.log("Info: lateUsers is null");
            }
        },
        addGroup: function(jsonData){
            var groupNode = Ext.getCmp("im-tree").getNodeById("workgroup");
            if(groupNode){
                try{
                    //Console.log("Debug: add workgroup node: " + jsonData.f_name);
                    var node = new Ext.tree.TreeNode({
                        id:     jsonData.id,
                        text:   jsonData.f_name,
                        iconCls: ChatHelper.getGroupIconClass(false),
                        leaf:    true
                    });
                    node["crtuser"] = jsonData.f_createUser;
                    node["note"] = jsonData.f_note;
                    node["flash"] = false;
                    groupNode.appendChild(node);
                    if (!groupNode.isExpanded()){
                        groupNode.expand();
                    }
                    this.refreshWorkGroupNum();
                    //Console.log(jsonData.f_name);
                }catch(e){
                    Console.log("Error: add workgroup node failed!");
                }
            }
            else{
                Console.log("Error: workgroup node is not find!");
            }
        },
        removeGroup: function(groupid){
            var tree = Ext.getCmp("im-tree");
            var groupNode = tree.getNodeById("workgroup");
            if(groupid){
                var node = tree.getNodeById(groupid);
                if (node){
                    node.remove(true);
                }
                else{
                    Console.log("Error: workgroup's node of removed is not find!")
                }
            }
            else{
                if(groupNode){
                    groupNode.removeAll();
                }
            }
            this.refreshOnlineUserNum();
        },
        //将服务器返回的用户数组数据刷新在线列表
        refreshOnlineList: function(jsonData){
            //删除原列表
            this.removeOnlineUser();
            //循环调用addOnlineUser，将服务器在线用户加入列表
            Ext.each(jsonData, this.addOnlineUser, this);
            this.refreshOnlineUserNum();
        },
        refreshWorkGroupList: function(jsonData){
            this.removeGroup();
            Ext.each(jsonData, this.addGroup, this);
            //this.refreshWorkGroupNum();
        },
        addGroupMsg: function(jsonData){
            var node = Ext.getCmp("im-tree").getNodeById(jsonData.from);
            var w = winMgr.openGroupWindow(node);
            w.addMsg(jsonData);
        },
        //加入聊天内容
        addMsg: function(jsonData){
            ChatHelper.addMsgToPanel("msgPanel", jsonData);
        },
        addUserMsg : function(jsonData){
            var node = Ext.getCmp("im-tree").getNodeById(jsonData.from);
            if(!node){
                node = {id: jsonData.from};
            }
            var w = winMgr.openWindow(node);
            w.addMsg(jsonData);
        },
        addUserSelfMsg:  function(jsonData){
            var node = Ext.getCmp("im-tree").getNodeById(jsonData.from);
            if(!node){
                node = {id: jsonData.from};
            }
            var w = winMgr.openWindow(node);
            //jsonData.from = jsonData.to;//为了显示不一样的颜色
            w.addSelfMsg(jsonData);
        },
        //使能输入信息
        enableInput: function(b){
            if(b){
                Ext.getCmp("inputAllBox").enable();
                Ext.getCmp("sendAllBtn").enable();
            }
            else{
                Ext.getCmp("inputAllBox").disable();
                Ext.getCmp("sendAllBtn").disable();
            }
        }
    });
    return Chat.initialize();
}

crtGroupWindow = Ext.extend(Ext.Window , {
    constructor : function(){
        var me = this;
        crtGroupWindow.superclass.constructor.call(this , {
            title: '创建工作组',
            width:500,
            height:300,
            closable:true,
            closeAction:"hide",
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
            constrain:true,
            items:[
                {
                    baseCls:'x-plain',
                    labelWidth:70,
                    xtype:'form',
                    defaultType:'textfield',
                    items:[
                        {
                            id:'crt-wg-id',
                            hidden: true,
                            value: '0'
                        },
                        {
                            fieldLabel:'工作组名称',
                            id:'crt-wg-name',
                            anchor:'100%'  // anchor width by percentage
                        },
                        {
                            fieldLabel:'工作组公告',
                            xtype:'textarea',
                            id:'crt-wg-note',
                            anchor:'100% -10'  // anchor width by percentage and height by raw adjustment
                        }
                    ]
                }
            ],
            buttons:[
                {
                    id: 'crt-group-win-save',
                    text: '确 定',
                    handler: function(){
                        var json = {
                            id:   Ext.getCmp("crt-wg-id").getValue(),
                            f_name: Ext.getCmp("crt-wg-name").getValue(),
                            f_note: Ext.getCmp("crt-wg-note").getValue()
                        };
                        if(json.f_name != "" && json.f_note != ""){
                            Chat.sendCreateGroupCmd(Ext.encode(json));
                        }
                        else{
                            Ext.MessageBox.alert("提示","工作组名称和公告不能为空！");
                        }
                    }
                },
                {
                    text:'取 消',
                    handler: function(){
                        Ext.getCmp("crt-group-win-save").enable();
                        me.hide();
                    }
                }
            ],
            reset: function(){
                Ext.getCmp("crt-wg-id").setValue("0");
                Ext.getCmp("crt-wg-name").setValue("");
                Ext.getCmp("crt-wg-note").setValue("");
                Ext.getCmp("crt-group-win-save").enable();
            },
            init: function(config){
                if(config){
                    Ext.getCmp("crt-wg-id").setValue(config.id);
                    Ext.getCmp("crt-wg-name").setValue(config.name);
                    Ext.getCmp("crt-wg-note").setValue(config.note);
                    if (!config.crtuser){
                        Ext.getCmp("crt-group-win-save").disable();
                    }
                }
                else{
                    this.reset();
                }
            }
        });
    }
});

GroupWindow = Ext.extend(Ext.Window , {
    constructor : function(wgid){
        var me = this;
        GroupWindow.superclass.constructor.call(this , {
            id : "gw_" + wgid,
            title: '工作组',
            width:600,
            height:450,
            closable:true,
            closeAction:"hide",
            maximizable:true,
            layout:"border",
            plain:true,
            constrain:true,
            items :[
                {
                    xtype:"panel",
                    layout : 'border',
                    border : false,
                    region: "center",
                    items:[{
                        id: "msg_grp_" + wgid,
                        autoScroll: true,
                        region: "center"
                    },
                        {
                            xtype:  'panel',
                            region: "south",
                            height: 150,
                            layout:"fit",
                            tbar: ['->',
                                {
                                    xtype:"tbbutton",
                                    id:'grp-clear-btn-' + wgid,
                                    text:"清屏",
                                    icon: ChatHelper.picsUrl['clear'],
                                    listeners: {
                                        'click':function(){
                                            ChatHelper.clearPanel("msg_grp_" + wgid);
                                        }
                                    }
                                },
                                {
                                    xtype:"tbbutton",
                                    id:'grp-history-btn-' + wgid,
                                    text:"消息记录",
                                    icon: ChatHelper.picsUrl['recorder'],
                                    listeners: {
                                        'click':function(){
                                            var btn = Ext.getCmp('grp-clear-btn-' + wgid);
                                            btn.fireEvent('click');
                                            webSql.queryMsg("msg_grp_" + wgid, true, wgid);
                                        }
                                    }
                                }
                            ],
                            items:[
                                {
                                    id:"inputbox_grp_" + wgid,
                                    xtype:"textarea",
                                    region:"center",
                                    allowBlank:false,
                                    blankText:'输入内容不可为空',
                                    enableKeyEvents:true,
                                    listeners:{
                                        'keydown': function(o, e){
                                            ChatHelper.fireClickEvent(e, o, "sendUserBtn_grp_" + wgid);
                                        },
                                        'render': function(){
                                            Ext.fly(this.el).on("dragenter",function(e){
                                                    MsgTip.msg('小提示','把图片放在这里就能发送出去！', true);
                                                }
                                            ).on("drop",function(e){
                                                    ChatHelper.dropImage(e, Chat.TYPE.get("GROUP"), wgid);
                                                }
                                            );
                                        }
                                    }
                                }
                            ],
                            buttons:[
                                {
                                    text: "关 闭",
                                    handler: function(){
                                        me.hide();
                                    }
                                },
                                {
                                    text: "发 送",
                                    id: "sendUserBtn_grp_" + wgid,
                                    listeners: {
                                        'click': function(){
                                            var inputbox = Ext.getCmp("inputbox_grp_" + wgid);
                                            if (inputbox.getValue() == ""){
                                                return;
                                            }
                                            if(Chat.sendMessage(inputbox.getValue(), Chat.TYPE.get("GROUP"), wgid)){
                                                inputbox.reset();
                                                inputbox.focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {//工作组成员列表
                    region: "east",
                    width:180,
                    split:true,
                    layout:'accordion',
                    items: [{
                        id:'im-grouptree_' + wgid,
                        title: '工作组成员',
                        xtype: 'treepanel',
                        enableDrop:true,
                        lines:false,
                        autoScroll:true,
                        tools:[{
                            id:'refresh',
                            on:{
                                click: function(){
                                    Chat.sendRefreshGroupUser(wgid);
                                }
                            }
                        }],
                        root: new Ext.tree.AsyncTreeNode({
                            id:'wg-' + wgid,
                            text: '工作组',
                            expanded:true,
                            children:[]
                        }),
                        UserMenu: new Ext.menu.Menu({
                            items: [
                                {
                                    id: 'grp-open-user-' + wgid,
                                    text: '发送即时消息'
                                },
                                {
                                    id: 'grp-open-user-history-' + wgid,
                                    text: '查看历史消息'
                                },
                                {
                                    id: 'grp-del-user-' + wgid,
                                    //icon: 'images/write.gif',
                                    text: '删除该用户'
                                }],
                            listeners: {
                                itemclick: function(item) {
                                    var n = item.parentMenu.contextNode;
                                    switch (item.id) {
                                        case 'grp-del-user-' + wgid:
                                            if(chatWindow.getWorkGroupCreater(wgid) == Chat.userid){
                                                if(chatWindow.getWorkGroupCreater(wgid) == n.id){
                                                    alert("不能删除创建者！");
                                                }
                                                else{
                                                    var jsonData = {
                                                        wgid: wgid,
                                                        userid:n.id
                                                    };
                                                    Chat.sendDelGroupUserCmd(Ext.encode(jsonData));
                                                }
                                            }
                                            else{
                                                alert('只有本工作组的创建者能删除用户！');
                                            }
                                            break;
                                        case 'grp-open-user-' + wgid:
                                            chatWindow.openChatUser(n.id);
                                            break;
                                        case 'grp-open-user-history-' + wgid:
                                            winMgr.openHistoryWindow(n);
                                            break;
                                        default:
                                            Console.log("not surpport");
                                    }
                                }
                            }
                        }),
                        listeners:{
                            'beforenodedrop': function(dropEvent){
                                if(chatWindow.getWorkGroupCreater(wgid) != Chat.userid){
                                    alert("只有该工作组的创建者才能增加用户！");
                                    return false;
                                }
                            },
                            'nodedrop':function(dropEvent){//增加工作组成员
                                var node = dropEvent.dropNode;
                                var jsonData = {
                                    wgid: wgid,
                                    userid:node.attributes['key']
                                }
                                Chat.sendAddGroupUserCmd(Ext.encode(jsonData));
                            },
                            'contextmenu': function(node, e) {
                                node.select();
                                if(node.isLeaf()){
                                    var c = node.getOwnerTree().UserMenu;
                                    c.contextNode = node;
                                    c.showAt(e.getXY());
                                }
                                else{
                                    Console.log("Debug: is not user");
                                }
                            },
                            'dblclick':function(node){
                                if (node.isLeaf()){
                                    chatWindow.openChatUser(node.id);
                                }
                            }
                        }
                    }]
                }
            ],
            addUser : function(jsonData){
                //Console.log(jsonData);
                var tree = Ext.getCmp('im-grouptree_' + wgid);
                var rootnode = tree.getNodeById('wg-' + wgid);
                if(rootnode){
                    try{
                        var title = jsonData.nickname;
                        if (jsonData.userid == chatWindow.getWorkGroupCreater(wgid)){
                            title = "<b>" +  title + "</b>";
                        }
                        var _node = new Ext.tree.TreeNode({
                            id:     jsonData.userid,
                            text:   title,
                            iconCls: ChatHelper.getIconClass(jsonData),
                            leaf:    true
                        });
                        _node["online"] = jsonData.online;
                        _node["sex"] = jsonData.sex;
                        _node["status"] = jsonData.status;
                        rootnode.appendChild(_node);
                        if (!rootnode.isExpanded()){
                            rootnode.expand();
                        }
                        this.refreshOnlineUserNum();
                    }catch(e){
                        Console.log("Error: add node failed!" + e);
                    }
                }
                else{
                    Console.log("Error: root node is not find!");
                }
            },
            setGroupTitle: function(){
                var groupName = chatWindow.getWorkGroupName(wgid);
                var win = Ext.getCmp("gw_" + wgid);
                win.setTitle(groupName);
                var rootnode = Ext.getCmp('im-grouptree_' + wgid).getNodeById('wg-' + wgid);
                if(rootnode){
                    rootnode.setText(groupName);
                }
            },
            removeUser: function(userid){
                var tree = Ext.getCmp('im-grouptree_' + wgid);
                var rootnode = tree.getNodeById('wg-' + wgid);
                if(userid){
                    var node = tree.getNodeById(userid);
                    if (node){
                        node.remove(true);
                    }
                    else{
                        Console.log("Error: workgroup's user node of removed is not find!")
                    }
                }
                else{
                    if(rootnode){
                        rootnode.removeAll();
                    }
                }
                this.refreshOnlineUserNum();
            },
            histroy: function(){
                var btn = Ext.getCmp('grp-history-btn-' + wgid);
                btn.fireEvent('click');
            },
            refreshUserList: function(jsonData){
                this.removeUser();
                Ext.each(jsonData, this.addUser, this);
                this.refreshOnlineUserNum();
            },
            refreshOnlineUserNum: function(){
                var tree = Ext.getCmp('im-grouptree_' + wgid);
                var rootnode = tree.getNodeById('wg-' + wgid);
                var groupName = chatWindow.getWorkGroupName(wgid);
                var iOn = 0;
                var iTotal = 0;
                rootnode.eachChild(function(node){
                    if(node.online){
                        iOn++;
                    }
                    iTotal++;
                });
                rootnode.setText(groupName + "(" + iOn + "/" + iTotal + ")");
            },
            addMsg: function(jsonData){
                this.addSelfMsg(jsonData);
                ChatHelper.sendNotify(jsonData);
                Chat.play('group');
            },
            addSelfMsg: function(jsonData){
                ChatHelper.addMsgToPanel("msg_grp_" + wgid, jsonData);
            }
        });
    }
});

UserWindow = Ext.extend(Ext.Window , {
    constructor : function(node){
        var me = this;
        UserWindow.superclass.constructor.call(this , {
            id : "uw_" + node.id,
            title: node.text,
            width:600,
            height:500,
            closable:true,
            closeAction:"hide",
            maximizable:true,
            layout:"border",
            plain:true,
            constrain:true,
            items :[
                {
                    id: "msg_" + node.id,
                    autoScroll: true,
                    region: "center"
                },
                {
                    xtype:  'panel',
                    region: "south",
                    height: 150,
                    layout:"fit",
                    tbar: [/*
                     {
                     xtype:"tbbutton",
                     icon:'resources/icon/common/edit.png',
                     tooltip:'设置字体',
                     handler:function(){
                     }
                     },
                     {
                     xtype:"tbbutton",
                     icon:'resources/images/app/forum/face/_01.gif',
                     tooltip:"选择表情",
                     handler:function(){
                     }
                     },
                     ,'-',{
                     xtype:"tbbutton",
                     iconCls:'icon-app-mkoa-forum',
                     text:"回复",
                     handler:function(){
                     }
                     },
                        {
                            xtype:"tbbutton",
                            icon:'resources/icon/portal/function.gif',
                            tooltip:"发送图片",
                            listeners:{
                                'click':function(){
                                    alert('探索中...');
                                }
                            }
                        },
                        */
                        '->',
                        {
                            id:"dsknf_" + node.id,
                            xtype:"tbbutton",
                            text:"桌面消息",
                            handler:function(){
                                var options = {
                                    url: ChatHelper.picsUrl['tip'],
                                    title: "提 醒",
                                    body : "你已启用桌面消息！"
                                }
                                var message = new DesktopNotification(1,options, ChatHelper.notifyDelay);
                                message.init();
                            }
                        },
                        {
                            xtype:"tbbutton",
                            id: 'clear-btn-' + node.id,
                            text:"清屏",
                            icon: ChatHelper.picsUrl['clear'],
                            listeners: {
                                'click': function(){
                                    ChatHelper.clearPanel("msg_" + node.id);
                                }
                            }
                        },
                        {
                            xtype:"tbbutton",
                            id: 'history-btn-' + node.id,
                            text:"消息记录",
                            icon:ChatHelper.picsUrl['recorder'],
                            listeners: {
                                'click': function(){
                                    var btn = Ext.getCmp('clear-btn-' + node.id);
                                    btn.fireEvent('click');
                                    webSql.queryMsg("msg_" + node.id, false, node.id);
                                }
                            }
                        }
                    ],
                    items:[
                        {
                            id: "inputbox_" + node.id,
                            xtype:"textarea",
                            region:"center",
                            allowBlank:false,
                            blankText:'输入内容不可为空',
                            enableKeyEvents:true,
                            listeners:{
                                'keydown': function(o, e){
                                    ChatHelper.fireClickEvent(e, o, "sendUserBtn_" + node.id);
                                },
                                'render': function(){
                                    Ext.fly(this.el).on("dragenter",function(e){
                                            MsgTip.msg('小提示','把图片放在这里就能发送出去！', true);
                                        }
                                    ).on("drop",function(e){
                                            ChatHelper.dropImage(e, Chat.TYPE.get("TALK"), node.id);
                                        }
                                    );
                                }
                            }
                        }
                    ],
                    buttons:[
                        {
                            text: "关 闭",
                            handler: function(){
                                me.hide();
                            }
                        },
                        {
                            text: "发 送",
                            id: "sendUserBtn_" + node.id,
                            listeners: {
                                'click': function(){
                                    var inputbox = Ext.getCmp("inputbox_" + node.id);
                                    if (inputbox.getValue() == ""){
                                        return;
                                    }
                                    if(Chat.sendMessage(inputbox.getValue(), Chat.TYPE.get("TALK"), node.id)){
                                        inputbox.reset();
                                        inputbox.focus();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    id: "info_" + node.id,
                    xtype:  'form',
                    region: "east",
                    width:180,
                    split:true,
                    collapsible: true,
                    layout:'accordion',
                    defaultType: 'textfield',
                    layout: 'form',
                    labelWidth: 40,
                    frame:true,
                    items: [
                        {
                            xtype: 'box',
                            id:'user-pic-' + node.id,
                            width: 180,
                            height: 200,
                            autoEl: {
                                tag: 'img',
                                src: ChatHelper.getPicurl(node)
                            }
                        },
                        {
                            id:'user-bm-' + node.id,
                            fieldLabel: "部门",
                            width: 120,
                            disabled: true,
                            value:node.bm
                        },
                        {
                            id:'user-zw-' + node.id,
                            fieldLabel: "职务",
                            width: 120,
                            disabled: true,
                            value:node.zw
                        },
                        {
                            id:'user-mobile-' + node.id,
                            fieldLabel: "手机",
                            width: 120,
                            disabled: true,
                            value:node.mobile
                        }
                    ]
                }
            ],
            history: function(){
                var btn = Ext.getCmp('history-btn-' + node.id);
                btn.fireEvent('click');
            },
            addMsg: function(jsonData){
                this.addSelfMsg(jsonData);
                ChatHelper.sendNotify(jsonData);
                Chat.play('msg');
            },
            addSelfMsg: function(jsonData){
                ChatHelper.addMsgToPanel("msg_" + node.id, jsonData);
            },
            refreshInfo: function(jsonData){
                var img = ChatHelper.getPicurl(jsonData);
                Ext.getCmp('user-pic-' + node.id).el.dom.src = img;
                Ext.getCmp('user-bm-' + node.id).setValue(jsonData.bm);
                Ext.getCmp('user-zw-' + node.id).setValue(jsonData.zw);
                Ext.getCmp('user-mobile-' + node.id).setValue(jsonData.mobile);
            }
        });
        //是否显示桌面提醒按钮
        var message = new DesktopNotification();
        if(!message.checkSupport()){//不支持不显示
            var btn = Ext.getCmp("dsknf_" + node.id);
            btn.hide();
        }
        else if(message.checkPermission() == 0){//已获取权限不显示
            var btn = Ext.getCmp("dsknf_" + node.id);
            btn.hide();
        }
    }
});

SmsWindow = Ext.extend(Ext.Window , {
    constructor : function(){
        var me = this;
        SmsWindow.superclass.constructor.call(this , {
            title: '发送短信',
            width:400,
            height:220,
            closable:true,
            closeAction:"hide",
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
            constrain:true,
            items:[
                {
                    baseCls:'x-plain',
                    labelWidth:70,
                    xtype:'form',
                    defaultType:'textfield',
                    items:[
                        {
                            id:'sms-userid',
                            hidden: true,
                            value: '0'
                        },
                        {
                            id:'sms-username',
                            fieldLabel:'姓名',
                            readOnly: true,
                            anchor:'100%'
                        },
                        {
                            fieldLabel:'手机',
                            id:'sms-phone',
                            readOnly: true,
                            anchor:'100%'
                        },
                        {
                            fieldLabel:'内容',
                            xtype:'textarea',
                            id:'sms-note',
                            anchor:'100% -10'
                        }
                    ]
                }
            ],
            buttons:[
                {
                    id: 'sms-send',
                    text: '发 送',
                    handler: function(){
                        var u = Chat.getNickname();//发送者
                        var note = Ext.getCmp("sms-note").getValue();
                        var json = {
                            userid:  Ext.getCmp("sms-userid").getValue(),
                            phone: Ext.getCmp("sms-phone").getValue(),
                            msg:  u + ": " + note
                        };
                        if(json.phone != "" && note != ""){
                            if(ChatHelper.getStrLength(json.msg) > 120){
                                alert('发送信息过长，请删除部分要发送的信息！');
                                return;
                            }
                            Ext.getCmp("sms-send").disable();
                            if(Chat.sendSmsCmd(Ext.encode(json))){
                                Ext.getCmp("sms-note").setValue("");
                            }
                        }
                        else{
                            alert("电话号码和内容不能为空！");
                        }
                    }
                },
                {
                    text:'取 消',
                    handler: function(){
                        me.hide();
                    }
                }
            ],
            reset: function(){
                Ext.getCmp("sms-userid").setValue("");
                Ext.getCmp("sms-username").setValue("");
                Ext.getCmp("sms-phone").setValue("");
                Ext.getCmp("sms-note").setValue("");
                Ext.getCmp("sms-send").enable();
            },
            init: function(config){
                if(config){
                    Ext.getCmp("sms-phone").setValue(config.phone);
                    Ext.getCmp("sms-userid").setValue(config.userid);
                    Ext.getCmp("sms-username").setValue(config.name);
                    Ext.getCmp("sms-note").setValue("");
                    Ext.getCmp("sms-send").enable();
                }
                else{
                    this.reset();
                }
            },
            close: function(){
                me.hide();
            }
        });
    }
});

UploadWindow = Ext.extend(Ext.Window , {
    constructor : function(){
        var me = this;
        SmsWindow.superclass.constructor.call(this , {
            title: '上传图片',
            width:280,
            height:360,
            closable:true,
            closeAction:"hide",
            plain:true,
            bodyStyle:'padding:5px;',
            items:[
                {
                    baseCls:'x-plain',
                    xtype:'form',
                    labelWidth:1,
                    items:[
                        {
                            xtype:'displayfield',
                            value:'将图片拉到以下方框中，点击“存盘”更改头像',
                            labelSeparator:''
                        },
                        {
                            xtype: 'box',
                            id:'user-photo',
                            width: 180,
                            height: 200,
                            style:"align: center;float:left;width:180px;height:200px;margin:10px 0 0 0;border:1px solid #015EAC;color:#666;",
                            autoEl: {
                                tag: 'img'
                            },
                            listeners:{
                                'render': function(){
                                    Ext.fly(this.el).on("dragover",function(e){
                                            e.stopPropagation(); e.preventDefault();
                                        },false
                                    ).on("drop",function(e){
                                        e.stopPropagation();e.preventDefault();
                                        var files = e.browserEvent.dataTransfer.files;
                                        for (var i = 0, f; f = files[i]; i++) {
                                            var t = f.type ? f.type : 'n/a';
                                            if (t.indexOf('image') >= 0){//只支持图片格式
                                                var reader = new FileReader();
                                                reader.onload = (function (file){
                                                    if(file.size <= ChatHelper.maxImage*1024){
                                                        return function (e){
                                                            Ext.getDom('user-photo').src = e.target.result;
                                                        };
                                                    }
                                                    else{
                                                        alert('上传文件请控制在' + ChatHelper.maxImage + 'k内');
                                                    }
                                                })(f);
                                                reader.readAsDataURL(f);
                                                return;
                                            }
                                            else{
                                                alert('只能放置图片文件');
                                            }
                                        }
                                    },false
                                    );
                                }
                            }
                        }
                    ]
                }
            ],
            buttons:[
                {
                    id: 'photo-save',
                    text: '存  盘',
                    handler: function(){
                        Chat.sendMessage( Ext.getDom('user-photo').src,Chat.TYPE.get("CMD"), Chat.userid, 'img');
                    }
                },
                {
                    text:'关  闭',
                    handler: function(){
                        me.hide();
                    }
                }
            ],            
            close: function(){
                me.hide();
            }
        });
    }
});

var winMgr ={
    userWindows: new Ext.util.MixedCollection(),
    groupWindows: new Ext.util.MixedCollection(),
    createGroupWindow: null,
    smsWindow: null,
    uploadWindow: null,
    openHistoryWindow: function(node){
        var w = this.openWindow(node);
        w.history();
    },
    openUploadWin:function(){
    	if(!this.uploadWindow){
            Console.log("Debug: open the uploadWindow.");
            this.uploadWindow = new UploadWindow();
        }
        return this.uploadWindow.show();
    },
    openSmsWin: function(){
        if(!this.smsWindow){
            Console.log("Debug: open the smsWindow.");
            this.smsWindow = new SmsWindow();
        }
        return this.smsWindow.show();
    },
    openCreateGroupWin: function(){
        if(!this.createGroupWindow){
            Console.log("Debug: open the createGroupwin.");
            this.createGroupWindow = new crtGroupWindow();
        }
        return this.createGroupWindow.show();
    },
    closeCreateGroupWin: function(){
        if(this.createGroupWindow){
            this.createGroupWindow.reset();
            this.createGroupWindow.hide();
        }
    },
    openWindow: function(node){
        //alert(node.id);
        var w = this.userWindows.get(node.id);
        if(w){
            if(chatWindow.isOnline(node.id)){
                w.refreshInfo(node);
            }
        }
        else{
            w = new UserWindow(node);
            this.userWindows.add(node.id, w);
        }
        chatWindow.addLateUser(node);
        return w.show();
    },
    openGroupWindow: function(wgid){
        var w = this.getGroupWindow(wgid);
        if(w.hidden){
            w.show();
            Console.log("Debug: window is hidden, send refresh group user command.");
            Chat.sendRefreshGroupUser(wgid);
        }
        return w;
    },
    getGroupWindow: function(wgid){
        var w = this.groupWindows.get(wgid);
        if (!w){
            w = new GroupWindow(wgid);
            w.setGroupTitle();
            w.show();
            w.hide();
            this.groupWindows.add(wgid, w);
        }
        return w;
    },
    getGroupWin: function(wgid){
        var w = this.groupWindows.get(wgid);
        return w;
    }
}
var Chat = {
    TYPE: new Ext.util.MixedCollection(),
    CMD : new Ext.util.MixedCollection(),
    SCRIPT:[],
    isWinShowed: false,
    userid:0,
    nickname:'',
    status:0,//0:正常，1：忙碌
    audioMgr: {
        msg: document.createElement('audio'),
        group: document.createElement('audio'),
        init : function(){
            var msgsrc = document.createElement('source');
            msgsrc.type = "audio/ogg";
            msgsrc.src = ChatHelper.audiosUrl['msg'];
            this.msg.appendChild(msgsrc);
            var grpsrc = document.createElement('source');
            grpsrc.type = "audio/ogg";
            grpsrc.src = ChatHelper.audiosUrl['group'];
            this.group.appendChild(grpsrc);
        },
        play: function(type){
            if(type == 'msg'){
                Console.log("play msg");
                this.msg.play();
            }
            else{
                Console.log("play group");
                this.group.play();
            }
        }
    },
    init: function(){
        this.TYPE.add("TALK", 0);
        this.TYPE.add("CMD", 1);
        this.TYPE.add("GROUP", 2);
        this.CMD.add("REFRESH_USER_LIST",   "0");
        this.CMD.add("CREATE_WORKGROUP",    "1");
        this.CMD.add("DESTROY_WORKGROUP",   "2");
        this.CMD.add("ADD_WORKGROUP_USER",  "3");
        this.CMD.add("DEL_WORKGROUP_USER",  "4");
        this.CMD.add("REFRESH_GROUP_USER",  "5");
        this.CMD.add("SYSTEM_USER_LOGIN",   "6");
        this.CMD.add("SYSTEM_USER_LOGOUT",  "7");
        this.CMD.add("EXIT_WORKGROUP",       "8");
        this.CMD.add("SMS_GET_PHONE",        "9");
        this.CMD.add("SMS_SEND_MSG",         "10");
        this.CMD.add("OPEN_USER_WIN",        "11");
        this.CMD.add("SYSTEM_PUSH",          "12");
        this.CMD.add("SYSTEM_USER_STATUS",  	"13");
        Console.log("Info: init static params");
        this.audioMgr.init();
        if(!Ext.isChrome){
            Console.log("not chrome");
            var task = new Ext.util.DelayedTask(function(){
                Ext.MessageBox.show({
                    title: '提 示',
                    msg: '为了提高用户体验，本系统不再支持非chrome浏览器，请大家速度下载安装。',
                    buttons: Ext.MessageBox.OK,
                    fn: function(){
                        window.open("http://www.google.com/chrome","_blank");
                    },
                    icon: Ext.MessageBox.WARNING
                });
            });
            //task.delay(ChatHelper.delay);
        }
        else{
            var task = new Ext.util.DelayedTask(function(){
                var message = new DesktopNotification();
                if(message.checkSupport() && message.checkPermission() != 0){
                    win = new Ext.Window({
                        layout:'fit',
                        width:320,
                        height:140,
                        plain: true,
                        html: '您是否开启在线交流的桌面提醒？<br><br>桌面提醒可以在您做其他工作时，仍能获知消息到达。<br>点击开启后，再点击页面顶部的允许。',
                        buttons: [{
                            text:'开 启',
                            handler: function(){
                                message.init();
                                win.close();
                            }
                        }]
                    });
                    win.show();
                }
                else{
                    Console.log("Info: desktop notification is enabled.");
                }
            });
            task.delay(ChatHelper.delay);
        }
        window.onbeforeunload = function(){
            Console.log("Debug: refresh the window.");
            Chat.close();
        }
        window.onunload = function(){
            Console.log("Debug: close the window.");
            Chat.close()
        };
    },

    socket: null,
    connect : function(host) {
        Console.log("Info: connect server: " + host);
        if ('WebSocket' in window){
            this.socket = new WebSocket(host);
        }
        else if ('MozWebSocket' in window){
            this.socket = new MozWebSocket(host);
        }
        else {
            Console.log('Error: WebSocket is not supported by this browser.');
            return;
        }
        this.socket.onopen = function () {
            Console.log('Info: WebSocket connection opened.');
            if(chatWindow){
                chatWindow.enableInput(true);
            }
        };
        this.socket.onclose = function () {
            Console.log('Info: WebSocket closed.');
            if(chatWindow){
                //chatWindow.enableInput(false);//连接断开，禁止输入和发送按钮
                //IM.notify("系统提示&nbsp;" + new Date().format("Y-m-d H:i:s"), 'IM服务连接中断，请重新登录！');
                Console.log("连接中断，30秒后重连");
                new Ext.util.DelayedTask(function(){
                    Chat.initialize();
                }).delay(30000);
            }
        };
        this.socket.onmessage = function (message) {
            var jsonData = Ext.decode(message.data);
            //Console.log("onmessage: " + Ext.encode(jsonData));
            if(jsonData.type && jsonData.type == Chat.TYPE.get("CMD")){
                if(jsonData.cmd == Chat.CMD.get("SYSTEM_USER_LOGIN")){
                    Console.log("login seccess");
                    if(jsonData.userid){
                        Chat.setUserid(jsonData.userid);
                        Console.log("Info: set userid: " + Chat.userid);
                    }
                }
                else if(jsonData.cmd == Chat.CMD.get("SYSTEM_USER_LOGOUT")){
                    chatWindow.removeOnlineUser(jsonData.userid);
                    if(Chat.isWinShowed){//在群里加入离线信息
                        var node = chatWindow.getOnlineUserNode(jsonData.userid);
                        chatWindow.addMsg({
                            from:0,
                            to: Chat.userid,
                            title: "系统消息",
                            //content:new Date().format("Y-m-d H:i:s") + "&nbsp;" + node.text + "&nbsp;" + '离开'
                            content:jsonData.lt + "&nbsp;" + node.text + "&nbsp;" + '离开'
                        });
                    }
                }
                else if(jsonData.cmd == Chat.CMD.get("REFRESH_USER_LIST")){
                    chatWindow.refreshWorkGroupList(jsonData.groups);
                    var task = new Ext.util.DelayedTask(function(){
                        Console.log(jsonData.onlineusers);
                        chatWindow.refreshOnlineList(jsonData.onlineusers);
                    });
                    task.delay(300);
                }
                else if(jsonData.cmd == Chat.CMD.get("REFRESH_GROUP_USER")){
                    var w = winMgr.openGroupWindow(jsonData.wgid);//打开工作组对话窗口
                    w.refreshUserList(jsonData.users);
                }
                else if(jsonData.cmd == Chat.CMD.get("CREATE_WORKGROUP")){
                    if (jsonData.result == 'ok'){
                        winMgr.closeCreateGroupWin();
                        Chat.sendRefreshOnlineListCmd();
                        alert("工作组创建成功，双击打开该工作组，从组织结构里选择成员，拉到工作组里");
                    }
                    else{
                        alert(jsonData.result);
                    }
                }
                else if(jsonData.cmd == Chat.CMD.get("DESTROY_WORKGROUP")){
                    alert(jsonData.result);
                }
                else if(jsonData.cmd == Chat.CMD.get("SMS_GET_PHONE")){
                    var w = winMgr.openSmsWin();
                    w.init(jsonData.result);
                }
                else if(jsonData.cmd == Chat.CMD.get("SMS_SEND_MSG")){
                    alert(jsonData.result);
                    var w = winMgr.openSmsWin();
                    w.reset();
                    w.close();
                }
                else if(jsonData.cmd == Chat.CMD.get("OPEN_USER_WIN")){
                    chatWindow.openChatUser(jsonData.result);
                }
                else if(jsonData.cmd == Chat.CMD.get("SYSTEM_PUSH")){
                    var js = jsonData.result
                    var param = jsonData.param;
                    Console.log("DEBUG: System push command: " + js);
                    if(Chat.SCRIPT[js]){
                        Console.log("call register method: " + js);
                        Chat.SCRIPT[js](param);
                    }
                    else{
                        //FE:{HACK}  Mixky.wasoft.lib.actions.ChangePassword.execute()
                        if(js == "{HACK}"){
                            Console.log("call {" + param + "}");
                            try{
                                eval(param);
                            }
                            catch(e){
                                Console.log("!HACK ERROR!" + e.name + ":" + e.message);
                            }
                        }
                        else{
                            Console.log("方法名[" + js + "]未注册");
                        }
                    }
                }
                else if(jsonData.cmd == Chat.CMD.get("SYSTEM_USER_STATUS")){
                    chatWindow.setUserStatus(jsonData.userid, jsonData.status);
                }
                else{
                    Console.log("ERROR: cmd not surpport:" + jsonData.cmd);
                }
                return;
            }
            if(jsonData.type && jsonData.type == Chat.TYPE.get("GROUP")){
                Console.log("get group message");
                if(!Chat.isWinShowed){
                    Console.log("force open window");
                    chatWindow.show();
                    Chat.sendRefreshOnlineListCmd();
                    Chat.sendRefreshOnlineListCmd();//有个bug，无法解决，发两次就没问题了

                    var task = new Ext.util.DelayedTask(function(){
                        if(chatWindow.isMyGroup(jsonData.to)){//工作组消息
                            //chatWindow.hide();
                            var w = winMgr.openGroupWindow(jsonData.to);
                            Chat.sendRefreshGroupUser(jsonData.to);
                            w.addMsg(jsonData);
                        }
                        else{
                            Console.log("is not my group: " + jsonData.to);
                        }
                    });
                    task.delay(ChatHelper.delay);
                }
                else{
                    Console.log("mainwin have opened, open groupwin.");
                    if(chatWindow.isMyGroup(jsonData.to)){//工作组消息
                        var w;
                        if(Chat.status == 0){
                            w = winMgr.openGroupWindow(jsonData.to);
                        }
                        else{
                            w = winMgr.getGroupWindow(jsonData.to);
                            if(w.hidden){
                                chatWindow.setGroupClass(jsonData.to, true);//设置flash
                            }
                        }
                        w.addMsg(jsonData);
                    }
                    else{
                        Console.log("is not my group: " + jsonData.to);
                    }
                }
                return;
            }
            if(jsonData.join != 0){//online
                chatWindow.addOnlineUser(jsonData);
                if(Chat.isWinShowed){//在群里加入登录信息
                    chatWindow.addMsg({
                        from:0,
                        to: Chat.userid,
                        title: "系统消息",
                        content:jsonData.lt + "&nbsp;" + jsonData.title + jsonData.addr + "&nbsp;" + '登录'
                    });
                }
                return;
            }
            if(jsonData.out != 0){//offline
                //这段代码目前没有执行机会
                chatWindow.removeOnlineUser(jsonData.out);
                return;
            }
            if(jsonData.to == 0){//to all
                chatWindow.addMsg(jsonData);
                return;
            }
            if(jsonData.to == Chat.userid){//to me
                if(!Chat.isWinShowed){
                    Console.log("force open window");
                    chatWindow.show();
                    Chat.sendRefreshOnlineListCmd();
                    Chat.sendRefreshOnlineListCmd();
                    var task = new Ext.util.DelayedTask(function(){
                        //chatWindow.hide();
                        chatWindow.addUserMsg(jsonData);
                    });
                    task.delay(ChatHelper.delay);
                }
                else{
                    Console.log("mainwin have opened, open userwin.");
                    if(jsonData.title.indexOf(Chat.getNickname()) == 0){//来自服务自己发的信息
                        chatWindow.addUserSelfMsg(jsonData);
                    }
                    else{
                        chatWindow.addUserMsg(jsonData);
                    }
                }
            }
        };
        this.socket.onerror = function(){
            Console.log('Error: WebSocket error.');
        };
    },

    //初始化连接
    initialize : function() {
        var host = window.location.host;
        var server = window.location.protocol == 'http:' ? 'ws' : 'wss';
        server += '://' + host + '/portal/websocket/chat';
        try{
            this.connect(server);
            return true;
        }
        catch(e){
            alert("!ERROR!" + e.name + ": " + e.message);
            return false;
        }
    },
    //向服务器发送信息
    //type: 'TALK', 'CMD','GROUP'
    sendMessage : function(message, type, to, title) {
        Console.log('sendMsg-->  msg:' + message + ", type:" + type + ",to:" + to + ",title:" + title);
        if (!this.isConnected()){
            if(this.initialize()){
                alert("连接服务器失败，请重新登录！");
                return false;
            }
        }
        if (message != ''){
            //对于非图片的对话信息进行编码处理
            if (title != 'img' && (type == this.TYPE.get("TALK") || type == this.TYPE.get("GROUP"))){
                message = escape(message);
            }
            var msg = {
                content: message,
                type: type||this.TYPE.get("TALK"),
                to: to||0,
                title: title||''
            };
            this.socket.send(Ext.encode(msg));
            return true;
        }
    },
    close : function(){
        if(this.socket && !this.isConnected){
            this.socket.close();
        }
    },
    isConnected : function(){
        return this.socket.readyState == 1;
    },
    isSupportWs : function(){
        return ('WebSocket' in window) || ('MozWebSocket' in window);
    },
    sendRefreshOnlineListCmd: function(){
        this.sendMessage(this.CMD.get("REFRESH_USER_LIST"), this.TYPE.get("CMD"));
    },
    sendRefreshGroupUser: function(wgid){//title:groupid
        this.sendMessage(this.CMD.get("REFRESH_GROUP_USER"), this.TYPE.get("CMD"), 0, wgid);
        chatWindow.setGroupClass(wgid, false);//关闭flash
    },
    sendCreateGroupCmd: function(title){//title: json = {id,f_name,f_note}
        this.sendMessage(this.CMD.get("CREATE_WORKGROUP"), this.TYPE.get("CMD"), 0, title);
    },
    sendDestroyGroupCmd: function(title){//title:groupid
        this.sendMessage(this.CMD.get("DESTROY_WORKGROUP"), this.TYPE.get("CMD"), 0, title);
    },
    sendAddGroupUserCmd: function(title){//title: json = {wgid, userid}
        this.sendMessage(this.CMD.get("ADD_WORKGROUP_USER"), this.TYPE.get("CMD"), 0, title);
    },
    sendExitGroupCmd: function(title){//title: json = {wgid, userid}
        this.sendMessage(this.CMD.get("EXIT_WORKGROUP"), this.TYPE.get("CMD"), 0, title);
    },
    sendDelGroupUserCmd: function(title){//title: json = {wgid, userid}
        this.sendMessage(this.CMD.get("DEL_WORKGROUP_USER"), this.TYPE.get("CMD"), 0, title);
    },
    sendSmsGetPhoneCmd: function(title){//title: userid
        this.sendMessage(this.CMD.get("SMS_GET_PHONE"), this.TYPE.get("CMD"), 0, title);
    },
    sendSmsCmd: function(title){//title: json = {f_userid,f_phone,f_note}
        this.sendMessage(this.CMD.get("SMS_SEND_MSG"), this.TYPE.get("CMD"), 0, title);
    },
    sendUserStatusCmd: function(title){//title: json = {f_userid,status}
        this.sendMessage(this.CMD.get("SYSTEM_USER_STATUS"), this.TYPE.get("CMD"), 0, title);
    },
    setUserid: function (id){
        this.userid = id;
    },
    setNickname: function(name){
        this.nickname = name;
    },
    getNickname: function(){
        return this.nickname;
    },
    play: function(type){
        this.audioMgr.play(type);
    }
};
Chat.init();
//进入门户页面，初始化chatwindow，并连接到chatserver
Mixky.wasoft.lib.chatroom.init();

IM = function(){//外部接口
    return {
        openMainWin: function(){//打开chat主窗口
            if(chatWindow){
                chatWindow.collapse();
            }
            else{
                Console.log("Error: not support");
            }
        },
        openUser: function(userid){//打开指定用户的对话框
            if(chatWindow){
                chatWindow.openChatUser(userid);
            }
            else{
                Console.log("Error: not support");
            }
        },
        regMethod: function(funName, fun){//注册方法，用于服务器推送信息
            if(Chat.SCRIPT[funName]){
                alert("方法名[" + funName + "]已被注册，请更改方法名！");
            }
            else{
                try{
                    Chat.SCRIPT[funName] = eval(fun);
                    Console.log("注册方法[" + funName + "]成功" );
                }
                catch(e){
                    Console.log("注册方法[" + funName + "]失败：" + e );
                }
            }
        },
        checkMethod: function(){//检查所有注册方法
            var i = 0;
            for(var key in Chat.SCRIPT){
                Console.log( (++i) + ": " + key);
            }
        },
        notify: function(title, body){//发送消息提醒，如果支持浏览器的notify，就直接使用，否则右下角弹出消息框
            if(ChatHelper.isNotify()){
                var options = {
                    url: ChatHelper.picsUrl['notify'],
                    title: title,
                    body : body
                };
                var notify = new DesktopNotification(1, options, ChatHelper.notifyDelay);
                notify.init();
            }
            else{
                MsgTip.msg_corner(title, body, true, ChatHelper.notifyDelay/1000);
            }
            Chat.play('msg');
        }
    }
}();

var t = new Ext.util.DelayedTask(function(){
    Mixky.wasoft.lib.chatroom();
    if(chatWindow){
        chatWindow.alternate();
    }
});
t.delay(ChatHelper.delay);

//注册一个简单的测试方法
IM.regMethod("Portal.Notify",
    function(obj){
        IM.notify("提 示", obj.msg);
    }
);
//注册一个较复杂的方法，该方法可以强制用户退出门户
var ExitFun = function(){
    Ext.MessageBox.show({
        title: '退出警告',
        msg: '您的帐号在另一地点登录，您被迫下线。<br><br>如果这不是您本人的操作，那么您的密码很可能已经泄露。建议您修改密码。',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.WARNING,
        fn: function(){
            window.location = "login.do";
        }
    });
};
IM.regMethod("Portal.Exit", ExitFun);

//对外接口,不建议使用，使用IM类提供的公开方法
//chatWindow.collapse();打开chat主窗口
//chatWindow.openChatUser(userid); 打开指定用户的对话框

/*
IM.openMainWin():           打开chat主窗口,开关方法
IM.openUser(userid):        打开指定用户的对话框
IM.regMethod(funName, fun): 注册方法，用于服务器推送信息
IM.checkMethod():           检查所有注册方法
IM.notify(title, body):     发送消息提醒，如果支持浏览器的notify，就直接使用，否则右下角弹出消息框
*/

/*
param1:{HACK},
param2: function(){}()
 IM.openUser(userid)    与userid对话

 Mixky.wasoft.lib.actions.Preferences.execute() 桌面管理
 Mixky.wasoft.lib.actions.SavePreferences.execute() 保存门户设置
 Mixky.wasoft.lib.actions.SaveAsDefaultPreferences.execute()    保存为默认门户设置
 Mixky.wasoft.lib.actions.ChangePassword.execute()  修改密码对话框
 Mixky.wasoft.lib.actions.Exit.execute()    退出系统
 Mixky.wasoft.lib.actions.OpenAdministrator.execute()   应用管理
 Mixky.wasoft.lib.actions.ShowDesktop.execute()
 Mixky.wasoft.lib.actions.OpenOnlineusers.execute() 在线用户
*/