package com.wasoft.websocket.schedule;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import com.wasoft.websocket.chat.ChatMessageCenter;
import com.wasoft.websocket.util.DBCache;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;

public class JobManager {

	public void refreshUserInfos(){
		DBCache.refreshUserInfos();
	}

	public void noticeBirthday(){
		Tool.log("notice birthday ...");		

		String s = "亲，祝您生日快乐！您在%d年前正式上线，已稳定运行%d天";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		List<List<String>> users = DBUtil.getBirthday();
		if(users != null & users.size() > 0){
			for(List<String> user: users){				
				try{
					long userid = Integer.parseInt(user.get(0));
					String tel = user.get(2);
					Date birth = sdf.parse(user.get(3));
					Date now = new Date();
					String msg = String.format(s, Tool.getYearDiff(birth, now), Tool.getDayDiff(birth, now));
					ChatMessageCenter.sendSystemMsg_Sms(userid, tel, msg);
				}
				catch(Exception e){
					Tool.log("notice Birthday error: " + e.getMessage());
				}
			}			
		}
	}
}
