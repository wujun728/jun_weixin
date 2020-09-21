package com.javen.weixin.user;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.javen.weixin.user.UserConfig.LangType;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.UserApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

/**
 * 
 * @author Javen
 * 2016年5月22日
 */
public class UserController extends ApiController{
	private static final Logger log =  Logger.getLogger(UserController.class);

	SimpleDateFormat sfg=new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

	String next_openid=null;
	/**
	 * 如果要支持多公众账号，只需要在此返回各个公众号对应的 ApiConfig 对象即可 可以通过在请求 url 中挂参数来动态从数据库中获取
	 * ApiConfig 属性值
	 */
	public ApiConfig getApiConfig() {
		ApiConfig ac = new ApiConfig();

		// 配置微信 API 相关常量
		ac.setToken(PropKit.get("token"));
		ac.setAppId(PropKit.get("appId"));
		ac.setAppSecret(PropKit.get("appSecret"));

		/**
		 * 是否对消息进行加密，对应于微信平台的消息加解密方式： 1：true进行加密且必须配置 encodingAesKey
		 * 2：false采用明文模式，同时也支持混合模式
		 */
		ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
		ac.setEncodingAesKey(PropKit.get("encodingAesKey",
				"setting it in config file"));
		return ac;
	}
	public void index(){
		List<UserInfo> allUserInfo = getAllUserInfo(getAllOpenId());
		
		if (!allUserInfo.isEmpty()) {
			///下载userInfos
			File file = saveToExcel(allUserInfo);
			renderFile(file);
		}else {
			render("目前暂无用户...");
		}
	}
	
	/**
	 * 根据openId列表获取用户信息
	 * @param allOpenId  
	 * @return
	 */
	private List<UserInfo> getAllUserInfo(List<String> allOpenId){
		List<UserInfo> userInfos = new ArrayList<UserInfo>();
		int total=allOpenId.size();
		UserConfig[] user_list=null;
		//开发者可通过该接口来批量获取用户基本信息。最多支持一次拉取100条。
		int temp=100;//一次获取100
		if (total>temp) {
			int page=0;//当前页面
			int count=total/100+(total%100>0?1:0);//总共获取多少次
			int index=0;
			while (page<count) {
				index=(temp*(page+1))>total?total:(temp*(page+1));
				System.out.println("/////////"+page*temp+" "+index);
				user_list=new UserConfig[index-(page*temp)];
				for (int i = page*temp; i <index; i++) {
					UserConfig config=new UserConfig();
					config.setLang(LangType.zh_CN);
					config.setOpenid(allOpenId.get(i));
					user_list[i-(page*temp)]=config;
				}
				GetUserInfo getUserInfo = new GetUserInfo();
				getUserInfo.setUser_list(user_list);
				String jsonGetUserInfo = JsonKit.toJson(getUserInfo);
				System.out.println("jsonGetUserInfo："+jsonGetUserInfo);
				
				ApiResult apiResult = UserApi.batchGetUserInfo(jsonGetUserInfo);
				
				String jsonResult = apiResult.getJson();
				//将json转化为对象
				List<UserInfo> userInfo = parseJsonToUserInfo(jsonResult);
				userInfos.addAll(userInfo);
				page++;
			}
		}else {
			user_list=new UserConfig[total];
			for (int i = 0; i < user_list.length; i++) {
				System.out.println(allOpenId.get(i));
				UserConfig config=new UserConfig();
				config.setLang(LangType.zh_CN);
				config.setOpenid(allOpenId.get(i));
				user_list[i]=config;
			}
			GetUserInfo getUserInfo = new GetUserInfo();
			getUserInfo.setUser_list(user_list);
			String jsonGetUserInfo = JsonKit.toJson(getUserInfo);
			
			
			ApiResult batchGetUserInfo = UserApi.batchGetUserInfo(jsonGetUserInfo);
			List<UserInfo> userInfo = parseJsonToUserInfo(batchGetUserInfo.getJson());
			userInfos.addAll(userInfo);
		}
		return userInfos;
	}
	
	/**
	 * 获取所有的openid
	 * @return
	 */
	public List<String> getAllOpenId(){
		List<String> openIds = getOpenIds(null);
		return openIds;
	}
	
	private List<String> getOpenIds(String next_openid){
		List<String> openIdList=new ArrayList<String>();
		ApiResult apiResult=UserApi.getFollowers(next_openid);
		String json=apiResult.getJson();
log.error("json:"+json);
		if (apiResult.isSucceed()) {
			JSONObject result = JSON.parseObject(json);
			next_openid = apiResult.getStr("next_openid");
			int count = apiResult.getInt("count");
			JSONObject openIdObject = result.getJSONObject("data");
			if (count>0) {
				JSONArray openids=openIdObject.getJSONArray("openid");
				for (int i = 0; i < openids.size(); i++) {
					openIdList.add(openids.getString(i));
				}
			}
			//下一页
			if (next_openid!=null&& !next_openid.equals("")) {
				List<String> list = getOpenIds(next_openid);
				openIdList.addAll(list);
			}
		}
		return openIdList;
	}
	
	
	public void save(){
		List<UserInfo> userInfos=new ArrayList<UserInfo>();
		for (int i = 0; i < 10; i++) {
			userInfos.add(new UserInfo("city", "country", "groupid", "headimgurl","language", "nickname", "openid", "province", "remark", "sex", "subscribe", "subscribe_time"));
		}
		
		renderFile(saveToExcel(userInfos));
	}

	private List<UserInfo> parseJsonToUserInfo(String jsonResult){
		JSONObject jo=JSONObject.parseObject(jsonResult);
		JSONArray user_list=jo.getJSONArray("user_info_list");
		List<UserInfo> list = JSON.parseArray(user_list.toString(),UserInfo.class);
		return  list;

	}
	/**
	 * 将详细的用户信息保存到Excel
	 * @param userInfos
	 * @return
	 */
	private File saveToExcel(List<UserInfo> userInfos){
		File file=null;
		try {
			WritableWorkbook wwb = null;
			
			// 创建可写入的Excel工作簿
			String fileName = "用户详细信息.xls";
			file=new File(fileName);
			//以fileName为文件名来创建一个Workbook
			wwb = Workbook.createWorkbook(file);

			// 创建工作表
			WritableSheet ws = wwb.createSheet("用户详细信息", 0);
			ws.setColumnView(0,8);
			ws.setColumnView(1,15);
			ws.setColumnView(2,50);
			ws.setColumnView(3,8);
			ws.setColumnView(4,10);
			ws.setColumnView(5,10);
			ws.setColumnView(6,10);
			ws.setColumnView(7,20);
			ws.setColumnView(8,50);
			ws.setColumnView(9,10);
			ws.setColumnView(10,30);
			ws.setColumnView(11,20);
			ws.setColumnView(12,20);
			
			ws.mergeCells(0,0,12,0);//合并第一列第一行到第七列第一行的所有单元格 
			WritableFont font1= new WritableFont(WritableFont.TIMES,16,WritableFont.BOLD); 
			WritableCellFormat format1=new WritableCellFormat(font1); 
			format1.setAlignment(jxl.format.Alignment.CENTRE);
			Label top= new Label(0, 0, "所有用户详细信息",format1);
			ws.addCell(top);
			
			//要插入到的Excel表格的行号，默认从0开始
			Label labelId= new Label(0, 1, "编号");
			Label labelnickname= new Label(1, 1, "用户的昵称");
			Label labelopenid= new Label(2, 1, "用户的标识");
			Label labelsex= new Label(3, 1, "性别");
			Label labelcountry= new Label(4,1, "所在国家");
			Label labelprovince= new Label(5,1, "所在省份");
			Label labelcity= new Label(6, 1, "所在城市");
			Label labellanguage= new Label(7,1, "用户的语言");
			Label labelheadimgurl= new Label(8,1, "用户头像");
			Label labelsubscribe= new Label(9, 1, "是否订阅");
			Label labelsubscribetime= new Label(10, 1, "关注时间");
			Label labelgroupid= new Label(11, 1, "所在的分组ID");
			Label labelremark= new Label(12, 1, "备注");
			ws.addCell(labelId);
			ws.addCell(labelnickname);
			ws.addCell(labelopenid);
			ws.addCell(labelsex);
			ws.addCell(labelcountry);
			ws.addCell(labelprovince);
			ws.addCell(labelcity);
			ws.addCell(labellanguage);
			ws.addCell(labelheadimgurl);
			ws.addCell(labelsubscribe);
			ws.addCell(labelsubscribetime);
			ws.addCell(labelgroupid);
			ws.addCell(labelremark);
			for (int i = 0; i < userInfos.size(); i++) {
			    
			    Label labelId_i= new Label(0, i+2, i+1+"");
			    Label nickName= new Label(1, i+2, userInfos.get(i).getNickname());
			    Label openid= new Label(2, i+2, userInfos.get(i).getOpenid());

				String sexStr=userInfos.get(i).getSex();
				//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
				if (StrKit.notBlank(sexStr)) {
					int sexInt=Integer.parseInt(sexStr);
					if (sexInt==1) {
						sexStr="男";
					}else if (sexInt==2) {
						sexStr="女";
					}
				}else {
					sexStr="未知";
				}

			    Label sex= new Label(3, i+2, sexStr);
			    Label country= new Label(4, i+2, userInfos.get(i).getCountry());
			    Label province= new Label(5, i+2, userInfos.get(i).getProvince());
			    Label city= new Label(6, i+2, userInfos.get(i).getCity());
			    Label language= new Label(7, i+2, userInfos.get(i).getLanguage());
			    Label headimgaeurl= new Label(8, i+2, userInfos.get(i).getHeadimgurl());

			    Label subscribe= new Label(9, i+2, userInfos.get(i).getSubscribe().equals("1")?"已关注":"未关注");
				//获取关注时间
				String subscribe_time = userInfos.get(i).getSubscribe_time();

				if (StrKit.notBlank(subscribe_time)) {
					subscribe_time=sfg.format(new Date(Long.parseLong(subscribe_time) * 1000L));
				}
			    Label subscribetime= new Label(10, i+2, subscribe_time);
			    Label groupid= new Label(11, i+2, userInfos.get(i).getGroupid());
			    Label remark= new Label(12, i+2, userInfos.get(i).getRemark());
			    ws.addCell(labelId_i);
			    ws.addCell(openid);
			    ws.addCell(nickName);
			    ws.addCell(sex);
			    ws.addCell(country);
			    ws.addCell(province);
			    ws.addCell(city);
			    ws.addCell(language);
			    ws.addCell(headimgaeurl);
			    ws.addCell(subscribe);
			    ws.addCell(subscribetime);
			    ws.addCell(groupid);
			    ws.addCell(remark);
			}
     
			//写进文档
			wwb.write();
			// 关闭Excel工作簿对象
			wwb.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;
	}
	
	
	
	public static void main(String[] args) {
		String[] ss=null;
		List<String> list=new ArrayList<String>();
		for (int i = 0; i < 23; i++) {
			list.add("str"+i);
		}
		
		int j=5;//一次获取多少条
		int total =23;
		if (total>j) {
			int page=0;//当前页面
			int count=total/j+(total%j>0?1:0);//总共获取多少次
			int index=0;
			while (page<count) {
				index=(j*(page+1))>total?total:(j*(page+1));
				System.out.println("/////////"+page*j+" "+index);
				ss=new String[(index-(page*j))];
				System.out.println("ss>"+ss.length);
				for (int i = page*j; i <index; i++) {
					System.out.println(i-(page*j));
				}
				page++;
			}
		}
		
		SimpleDateFormat sfg=new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		
		System.out.println(sfg.format(new Date(1439221146*1000L)));
	}
}
