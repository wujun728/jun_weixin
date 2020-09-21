package com.jfinal.wxaapp.msg;

public class MsgTest {

	public static void test1(){
		String msgStr = "<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1482048670</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[this is a test]]></Content><MsgId>1234567890123456</MsgId></xml>";
		
		XmlMsgParser xmlMsgParser = new XmlMsgParser();
		System.out.println(xmlMsgParser.parser(msgStr));
	}
	
	public static void test2(){
		String msgStr = "{\"ToUserName\":\"toUser\",\"FromUserName\":\"fromUser\",\"CreateTime\":1482048670,\"MsgType\":\"text\",\"Content\":\"this is a test\",\"MsgId\":1234567890123456,\"PicUrl\":null,\"MediaId\":null,\"Event\":null,\"SessionFrom\":null}";
		JsonMsgParser jsonMsgParser = new JsonMsgParser();
		System.out.println(jsonMsgParser.parser(msgStr));
	}
	
	public static void main(String[] args) {
		test1();
		test2();
	}
}
