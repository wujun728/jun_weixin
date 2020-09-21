package com.wasoft.websocket.sms;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.ChatMessageHelper;
import com.wasoft.websocket.chat.bean.Sms;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;
import cn._3tong.ema_new.services.SmsOperator.*;

public class SmsManager {
	
	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		Sms sms = new Sms();
		sms.setPhone("13651188683");
		sms.setMsg(new Date().toString());
		// Tool.log(" ==>> " + sendSms(sms));

		SmsMessage smsm = new SmsMessage();
		smsm.setDxnr("我的信息来了");
		smsm.setSjhm("13651188683");
		Tool.log(" ==>> " + Dxfs(smsm).getFszt());
	}

	//发送sms
	public static String sendSms(Sms sms) {		
		/*		 
		String phone = sms.getPhone();
		String msg = sms.getMsg();
		try {
			YwdxSmsSendImplServiceLocator locator = new YwdxSmsSendImplServiceLocator();
			YwdxSmsSendImpl smsOperator = locator.getYwdxSmsSend(new URL(
					"http://192.168.3.137:8081/wadx/sms/services/YwdxSmsSend"));// 即时发送
			SgdxMessage message = new SgdxMessage();

			message.setYwbm("9001");
			message.setSjhm(phone);
			message.setDxnr(msg);

			Tool.log("--> send sms to " + phone + ": " + msg);
			SgdxResponse response = smsOperator.dxfs(message);
			Tool.log(response.getMsg());
			return response.getMsg();

		} catch (Exception e) {
			System.err.println("发送失败: " + e.getMessage());
			return "发送失败";
		}*/
		SmsMessage smsm = new SmsMessage();
		smsm.setDxnr(sms.getMsg());
		smsm.setSjhm(sms.getPhone());
		
		return Dxfs(smsm).getFszt();
	}

	//短信发送
	private static SmsMessage Dxfs(SmsMessage smsmes){
				
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		smsmes.setSjfssj( sdf.format(new Date()));
		String s_fszt = "提交成功";
		String s_ztbgid = "0";

		String regex = "(?<=\\G[\\s\\S]{200})(?!=$)";
		String[] dxnr = smsmes.getDxnr().split(regex);
		for (int i = 0; i < dxnr.length; i++) {
			Tool.log("第" + i + "条 : " + dxnr[i].replaceAll("\\s", ""));
			try{
				SmsOperatorServiceLocator locator = new SmsOperatorServiceLocator();
				SmsOperator smsOperator = locator.getSmsOperator(new URL(Constants.sms_url));// 即时发送

				MTMessage message = new MTMessage();
				message.setContent(dxnr[i].trim().replaceAll("\\s", ""));
				message.setPhoneNumber(smsmes.getSjhm().replaceAll("\\s", ""));
				MTResponse[] response = smsOperator.sendSms(Constants.sms_user, Constants.sms_pass, message);

				for (MTResponse mtResponse : response) {
					Tool.log("isIsSuccess: " + mtResponse.isIsSuccess());
					Tool.log("SequenceId: " + mtResponse.getSequenceId());
					Tool.log("PhoneNumber: " + mtResponse.getPhoneNumber());

					if (!mtResponse.isIsSuccess()) {
						s_fszt = "提交失败";
					}
					s_ztbgid = mtResponse.getSequenceId();
				}
			} 
			catch (Exception e){
				Tool.log("error: " + e.getMessage());
				s_fszt = "提交失败";
			}
		}
		smsmes.setFszt(s_fszt);
		smsmes.setZtbgid(s_ztbgid);
		return smsmes;
	}
	
	//短信接收
	public static void Dxjs(String phone, String msg){
		long userid = DBUtil.getUserid1(phone);//通过手机号码获取用户ID
		if(userid != 0){
			Sms sms = new Sms();
			sms.setPhone(phone);
			sms.setMsg(msg + "【短信回复】");
			
			sms.setUserid(userid);
			ChatMessageHelper.sendSms2Message(sms);
		}
		else{
			Tool.log("tel: " + phone + " is not find user.");
		}
	}
}
