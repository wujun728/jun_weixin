package com.wasoft.websocket.sms;

import java.rmi.RemoteException;
import org.apache.axis.types.URI;

import com.wasoft.websocket.sms.santong.DeliveryInformation;
import com.wasoft.websocket.sms.santong.SmsMessage;
import com.wasoft.websocket.sms.santong.SmsNotification;
import com.wasoft.websocket.util.Tool;

public class SmsNotificationImplst implements SmsNotification {

	@Override
	public void notifySmsDeliveryReceipt(String correlator,
			DeliveryInformation deliveryStatus) throws RemoteException {
		// TODO Auto-generated method stub
		Tool.log("===notifySmsDeliveryReceipt===");
		Tool.log("===cor==="+correlator);
		Tool.log("===状态==="+deliveryStatus.getDeliveryStatus());
		Tool.log("===地址==="+deliveryStatus.getAddress());
		Message mes =new Message();
		String s_state=deliveryStatus.getDeliveryStatus().getValue();
		if("DeliveryImpossible".equals(s_state)){
			//超时前无法成功发送
			mes.setNr("发送失败");
		}else if("DeliveryUncertain".equals(s_state)){
			//递交状态未知
			mes.setNr("状态未知");
		}else{
			//发送成功
			mes.setNr("发送成功");
		}
		String s_sjhm=deliveryStatus.getAddress().toString();
		String [] sjhm=s_sjhm.split(":");
		Tool.log("===sjhm==="+sjhm[1]);
		Tool.log("===ztbgid==="+s_state);		
		mes.setFlag("0");
		mes.setId(correlator);		
		mes.setHm(sjhm[1]);
		//SmsDataService.instance().ztbg(mes);
		//SmsDataService.instance().ztbg(mes);
	}	

	@Override
	public void notifySmsReception(String registrationIdentifier, SmsMessage message) 
			throws RemoteException {
		
		URI url = message.getSenderAddress();
		String s_sjhm = url.toString();
		Tool.log("sjhm: " + s_sjhm);
		String [] sjhm = s_sjhm.split(":");		
		Tool.log(sjhm[1] + "," + message.getMessage());
		SmsManager.Dxjs(sjhm[1], message.getMessage());
	}
}
