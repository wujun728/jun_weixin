/* 
 * 微信公众平台开发模式 Node.js SDK 1.0.0
 * (c) 2012-2013 ____′↘夏悸 <wmails@126.cn>, MIT Licensed
 * http://www.jeasyuicn.com/wechat
 *
 * 默认的消息处理器,可以直接修改本默认处理器,如果自定义请保证结构.
 */
 

/*
 * 文字消息
 */
exports.textTypeMsg = function (outPut) {
	outPut.text("这是文字消息");
};
/*
 * 地理位置消息
 */
exports.locationTypeMsg = function (outPut) {
	outPut.text("这是地理位置消息");
};
/*
 * 链接消息
 */
exports.linkTypeMsg = function (outPut) {
	outPut.text( "这是链接消息");
};
/*
 * 图片消息
 */
exports.imageTypeMsg = function (outPut) {
	outPut.text("这是图片消息");
};
/*
 * 语音消息
 */
exports.voiceTypeMsg = function (outPut) {
	outPut.text("这是语音消息");
};
/*
 * 事件
 */
exports.eventTypeMsg = function (outPut) {
	var event = this.Event;
	//订阅
	if (event == "subscribe") {
		outPut.text("订阅成功!");
	}
};
