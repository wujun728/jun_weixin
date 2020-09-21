/* 
 * 微信公众平台开发模式 Node.js SDK 1.0.0
 * (c) 2012-2013 ____′↘夏悸 <wmails@126.cn>, MIT Licensed
 * http://www.jeasyuicn.com/wechat
 */

var path, method, query, body, _token;
var igon = ["attributes", "parent", "count", "at", "each", "text"];
var url = require('url');
var util = require('./util');
var querystring = require('querystring');
var xmlreader = require("xmlreader");
//默认过滤请求类型
var defaultFilter = "/wechat/";
//默认消息处理器
var msgHandler = require('./defaultMsgHandler');

//处理入口
exports.process = function (req, res, handler, filter) {
	path = url.parse(req.url).pathname;
	filter = filter || defaultFilter;
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	if (path.indexOf(filter) != 0) {
		res.end(path);
		return;
	}

	method = req.method;
	query = querystring.parse(req.url.split("?")[1]);
	msgHandler = handler || msgHandler;
	
	//处理wechat类型的请求
	_token = path.replace(filter, "");
	if (method == "GET") {
		doGet(res);
	} else {
		body = '';
		req.setEncoding('utf8');
		req.addListener('data', function (chunk) {
			body += chunk;
		});
		req.addListener('end', function () {
			doPost(res);
		});
	}
};

function doGet(res) {
	if (checkSignature()) {
		res.end(query.echostr);
	} else {
		res.end("signature error");
	}
}

function doPost(res) {
	xmlreader.read(body, function (errors, response) {
		if (null !== errors) {
			console.log(errors);
			return;
		}
		var msg = {};
		for (var k in response.xml) {
			if (igon.indexOf(k) == -1) {
				if (response.xml[k] && response.xml[k].text) {
					msg[k] = response.xml[k].text.call();
				}
			}
		}
		var callBack = msgHandler[msg.MsgType + "TypeMsg"];
		if(callBack && typeof callBack == "function"){
			callBack.call(msg, new outPut(res,msg));
		}else{
			res.end("signature error");
		}
	});
}
/*
 * 签名认证
 */
function checkSignature() {
	var params = [_token, query.timestamp, query.nonce];
	var signature = query.signature;
	params = params.sort();
	var temp = params[0] + params[1] + params[2];
	var crypto = require('crypto');
	var sha1 = crypto.createHash('sha1');
	sha1.update(temp)
	var hex = sha1.digest('hex');
	return (hex === signature);
}

/*********输出消息处理**************/
//输出模板
var textMsg = '<xml> <ToUserName><![CDATA[{{ToUserName}}]]></ToUserName> <FromUserName><![CDATA[{{FromUserName}}]]></FromUserName> <CreateTime>{{CreateTime}}</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA[{{Content}}]]></Content> </xml>';
var musicMsg = '<xml> <ToUserName><![CDATA[{{ToUserName}}]]></ToUserName> <FromUserName><![CDATA[{{FromUserName}}]]></FromUserName> <CreateTime>{{CreateTime}}</CreateTime> <MsgType><![CDATA[music]]></MsgType> <Music> <Title><![CDATA[{{Title}}]]></Title> <Description><![CDATA[{{Description}}]]></Description> <MusicUrl><![CDATA[{{MusicUrl}}]]></MusicUrl> <HQMusicUrl><![CDATA[{{HQMusicUrl}}]]></HQMusicUrl> </Music> </xml>';
var newsMsg = '<xml> <ToUserName><![CDATA[{{ToUserName}}]]></ToUserName> <FromUserName><![CDATA[{{FromUserName}}]]></FromUserName> <CreateTime>{{CreateTime}}</CreateTime> <MsgType><![CDATA[news]]></MsgType> <ArticleCount>{{ArticleCount}}</ArticleCount> <Articles>{{Articles}} </Articles> </xml>';
var articlesItem = '<item> <Title><![CDATA[{{Title}}]]></Title> <Description><![CDATA[{{Description}}]]></Description> <PicUrl><![CDATA[{{PicUrl}}]]></PicUrl> <Url><![CDATA[{{Url}}]]></Url> </item>';

function outPut(res,msg){
	res.writeHead(200, {
		'Content-Type' : 'text/xml'
	});
	var data = {
		"CreateTime":new Date().getTime(),
		"ToUserName":msg.FromUserName,
		"FromUserName":msg.ToUserName
	};
	/*
	 * 输出文本消息
	 */
	this.text = function (text) {
		data["Content"] = text;
		res.end(util.template(textMsg, data));
	},
	/*
	 * 输出音乐消息
	 */
	this.music = function (Title, Description, MusicUrl, HQMusicUrl) {
		data["Title"] = Title;
		data["Description"] = Description;
		data["MusicUrl"] = MusicUrl;
		data["HQMusicUrl"] = HQMusicUrl;
		res.end(util.template(musicMsg, data));
	},
	/*
	 *输出图文消息
	 */
	this.news = function (Articles) {
		var atsItems = [];
		if(Articles && Articles.sort){
			for(var k in Articles){
				atsItems.push(util.template(articlesItem, Articles[k]));
			}
		}
		data["ArticleCount"] = atsItems.length;
		data["Articles"] = atsItems.join("");
		res.end(util.template(newsMsg, data));
	}
}