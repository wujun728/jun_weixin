package com.javen.controller;

import java.util.Date;

import com.javen.model.Idea;
import com.javen.model.TUser;
import com.javen.service.BaiduTranslate;
import com.javen.utils.RegexUtils;
import com.javen.utils.SMSUtils;
import com.javen.utils.SMSUtils.SendSMSType;
import com.javen.utils.StringUtils;
import com.javen.utils.StringUtils.RandomType;
import com.javen.utils.WebUtils;
import com.javen.utils.WebUtils.SendEmialType;
import com.javen.validate.ForgetValidate;
import com.javen.validate.IdeaValidate;
import com.javen.validate.LoginValidate;
import com.javen.validate.RegisterValidate;
import com.javen.validate.TranslateValidate;
import com.javen.vo.AjaxResult;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.kit.HashKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.ehcache.CacheKit;


/**
 * ajax控制器
 * @author Javen
 * 2016年4月2日
 */
public class AjaxController extends Controller {
	private Log log=Log.getLog(AjaxController.class);
	private AjaxResult result = new AjaxResult();
	/**
	 * 百度翻译
	 */
	@Before(TranslateValidate.class)
	public void translates(){
		String from = getPara("from");
		String to = getPara("to");
		String q = getPara("q");
		log.debug("from:"+from+"  to:"+to+"  q:"+q);
		String res = BaiduTranslate.webTranslates(from, to, q);
		if (StringUtils.isBlank(res)) {
			result.addError("翻译异常稍后尝试");
			renderJson(result);
			return ;
		}else {
			result.success(res);
			renderJson(result);
			return ;
		}
	}
	/**
	 * 注册表单提交 ajax
	 */
	@Before(RegisterValidate.class)
	public void register() {
		TUser user=null;
		String tel = null;
		String email = null;
		String password = getPara("password");
		String number = getPara("number");
		
		Integer regtype = getParaToInt("regtype");
		String nickName=getPara("nickName");
		String account="";
		if (regtype==0) {
			//邮箱注册
			email = getPara("email");
			
			// 判断邮箱是否存在
			user = TUser.dao.findByEmail(email);
			if (null != user) {
				result.addError("该邮箱已经注册过，请返回登录或者使用新邮箱地址");
				renderJson(result);
				return;
			}
			//判断邮箱验证码是否正确
			boolean emailCodeEquals = emailCodeEquals(email, number);
			if (!emailCodeEquals) {
				result.addError("邮箱验证码输入错误，请重新输入");
				renderJson(result);
				return;
			}
			account=email;
		}else {
			//手机注册
			tel  = getPara("tel");
			// 判断手机是否存在
			user = TUser.dao.findByTel(tel);
			if (null != user) {
				result.addError("该手机号已经注册过，请返回登录或者更换手机号码");
				renderJson(result);
				return;
			}
			//判断手机验证码是否正确
			boolean mobileCodeEquals = mobileCodeEquals(tel, number);
			if (!mobileCodeEquals) {
				result.addError("手机验证码输入错误，请重新输入");
				renderJson(result);
				return;
			}
			account=tel;
		}
		
		String openId = getSessionAttr("openId");
		user = new TUser();
		user.set("email", email);
		user.set("tel", tel);
		user.set("password", HashKit.md5(password));
		user.set("level", 1);
		user.set("openId", openId);
		user.set("password2", password);
		user.set("nickName", nickName);
		user.set("registerDate", new Date());
		
		boolean temp = user.save();

		if (!temp) {
			result.addError("注册失败，请稍后再试");
		}else {
			//成功发送注册通知
			SMSUtils.SMSCode(PropKit.get("notify_mobile", "13545191275"), null, nickName, null, account,null, SendSMSType.REGISTER_NOTIFY);
		}

		renderJson(result);
		
		
	}
	
	public void jifen(){
		 String openId=getPara("openId");
		 int type=getParaToInt("type");
		 if (type==1) {
			 boolean isSuccess = TUser.dao.addjifen(openId, 100);
			 if (isSuccess) {
				 result.success("该手机号已经注册过，请返回登录或者更换手机号码");
				 renderJson(result);
				 return;
			}
		}else {
			result.addError("积分添加失败");
			 renderJson(result);
			 return;
		}
		 
	}

	/**
	 * 登录表单提交 ajax
	 */
	@Before(LoginValidate.class)
	public void login() {
		TUser user =null;
		
		String account = getPara("account");
		String password = getPara("password");
		String remember = getPara("remember", "off");
		
		log.warn("account:"+account+" password:"+password+" remember："+remember);
		
		if (RegexUtils.find(RegexUtils.EMAIL, account)) {
			user = TUser.dao.findByEmail(account);
			if (null == user) {
				log.warn("该邮箱尚未注册");
				renderJson(result.addError("该邮箱尚未注册"));
				return;
			}
		}else {
			user = TUser.dao.findByTel(account);
			if (null == user) {
				log.warn("该手机号尚未注册");
				renderJson(result.addError("该手机号尚未注册"));
				return;
			}
		}
		
		password = HashKit.md5(password);
		// 比较密码
		String oldPwd = user.get("password");
		if (!oldPwd.equals(password)) {
			log.warn("您输入的密码不正确");
			renderJson(result.addError("您输入的密码不正确"));
			return;
		}
		if (remember.equals("off")) {
			remember="0";
		}else {
			remember="1";
		}
		
		String openId = getSessionAttr("openId");
		user.set("lastLoginDate", new Date()).set("remember", remember).set("openId", openId).update();
		setSessionAttr("tuser", user);

//		WebUtils.loginUser(this, user, "on".equals(remember));
		
		// 记住密码推后讲解
		renderJson(result);
	}
	
	/**
	 * 登录表单提交 ajax
	 */
	@Before(IdeaValidate.class)
	public void idea() {
		try {
			String account = getPara("account");
			String contact = getPara("contact");
			String ideaContext = getPara("idea");
			
			log.info("意见反馈 account:"+account+" contact:"+contact+" ideaContext:"+ideaContext);
			
			Idea idea=new Idea();
			idea.set("account", account);
			idea.set("contact", contact);
			idea.set("context", ideaContext);
			idea.set("createTime", new Date());
			
			boolean saveSuccess = idea.save();
			
		if (!saveSuccess) {
			renderJson(result.addError("意见反馈失败!!"));
			return;
		}
			
			WebUtils.sendIdeaMail(PropKit.get("notify_email"), contact, account, ideaContext);
			
			renderJson(result);
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(result.addError("意见反馈失败!!"));
			return;
		}
		
	}
	/**
	 * 找回密码表单提交 ajax
	 */
	@Before(ForgetValidate.class)
	public void forget(){
		TUser user=null;
		int forgettype=getParaToInt("forgettype");
		String account = getPara("account");
		String number = getPara("number");
		if (forgettype==0) {
			//确认账户是否存在
			
			if (RegexUtils.find(RegexUtils.EMAIL, account)) {
				user = TUser.dao.findByEmail(account);
				if (null == user) {
					renderJson(result.addError("该邮箱尚未注册"));
					return;
				}
				//判断邮箱验证码是否正确
				boolean emailCodeEquals = emailCodeEquals(account, number);
				if (!emailCodeEquals) {
					result.addError("邮箱验证码输入错误，请重新输入");
					renderJson(result);
					return;
				}
				
			}else {
				user = TUser.dao.findByTel(account);
				if (null == user) {
					renderJson(result.addError("该手机号尚未注册"));
					return;
				}
				//判断手机验证码是否正确
				boolean mobileCodeEquals = mobileCodeEquals(account, number);
				if (!mobileCodeEquals) {
					result.addError("手机验证码输入错误，请重新输入");
					renderJson(result);
					return;
				}
			}
			
			result.setData("0");
		}else {
			//确认新密码
			String pass_one = getPara("pass_one");
			String pass_two = getPara("pass_two");
			if (!pass_one.equals(pass_two)) {
				renderJson(result.addError("两次输入的密码不一致"));
				return;
			}
			//更改密码
			if (RegexUtils.find(RegexUtils.EMAIL, account)) {
				user = TUser.dao.findByEmail(account);
			}else {
				user = TUser.dao.findByTel(account);
			}
			if (null!=user) {
				
				user.set("password", HashKit.md5(pass_one));
				user.set("password2", pass_one);
				boolean temp = user.update();
				if (!temp) {
					renderJson(result.addError("密码更新失败"));
					return;
				}
			}else {
				renderJson(result.addError("密码更新失败"));
				return;
			}
			result.setData("1");
		}
		
		renderJson(result);
	}
	
	/**
	 * 找回密码 发送验证码ajax
	 */
	public void  sendForgetCode(){
		TUser user=null;
		String account = getPara("account");
		
		if (RegexUtils.find(RegexUtils.EMAIL, account)) {
			user = TUser.dao.findByEmail(account);
			if (null == user) {
				renderJson(result.addError("该邮箱尚未注册"));
				return;
			}
			//发送邮箱验证码
			sendEmailCode(false, account, SendEmialType.FORGET);
		}else {
			
			if (null==account ||  !RegexUtils.find(RegexUtils.PHONE, account)) {
				renderJson(result.addError("请输入正确的手机号"));
				return;
			}
			
			user = TUser.dao.findByTel(account);
			if (null == user) {
				renderJson(result.addError("该手机号尚未注册"));
				return;
			}
			//发送手机验证码
			sendSMSCode(account, 1);
		}
	}
	
	/**
	 * 发送注册邮件验证码 ajax
	 */
	public void sendRegEmail(){
		String email = getPara("email");
		sendEmailCode(true,email, SendEmialType.REGISTER);
		renderJson(result);
	}
	
	/**
	 * 发送注册手机验证码 ajax
	 */
	public void sendRegSMS(){
		String tel = getPara("tel");
		
		if (null==tel ||  !RegexUtils.find(RegexUtils.PHONE, tel)) {
			renderJson(result.addError("请输入正确的手机号"));
			return;
		}
		
		sendSMSCode(tel, 0);
		renderJson(result);
	}
	
	/**
	 * 判断邮箱验证码是否正确
	 * @param email
	 * @param code
	 */
	private boolean emailCodeEquals(String email,String code){
		String cache_code = CacheKit.get("tenMinute", email);
		System.out.println("cache_code:"+cache_code +" email_code:"+code);
		
		if (null==cache_code || !code.equals(cache_code)) {
			return false;
		}else {
			//如果相同则移除该邮箱验证码缓存
			CacheKit.remove("tenMinute", email);
			return true;
		}
	}
	
//	private void emailCodeEquals2(String email,String code){
//		String cache_code = CacheKit.get("tenMinute", email);
//		System.out.println("cache_code:"+cache_code +" email_code:"+code);
//		
//		if (null==cache_code || !code.equals(cache_code)) {
//			result.addError("邮箱验证码输入错误，请重新输入");
//			renderJson(result);
//			return;
//		}else {
//			//如果相同则移除该邮箱验证码缓存
//			CacheKit.remove("tenMinute", email);
//			renderJson(result);
//			return;
//		}
//	}
	
	/**
	 * 验证手机验证码是否正确
	 * @param tel
	 * @param code
	 */
	private boolean mobileCodeEquals(String tel,String code){
		//判断手机验证码是否正确
		String cache_code = CacheKit.get("tenMinute", tel);
		System.out.println("cache_code:"+cache_code +"tel_code:"+code);
		if (null==cache_code || !code.equals(cache_code)) {
			return false;
		}else {
			//如果相同则移除该手机验证码缓存
			CacheKit.remove("tenMinute", tel);
			return true;
		}
	}
	
	/**
	 * 发送邮箱验证码并将code添加到缓存
	 * @param email
	 * @param sendEmialType
	 */
	private void sendEmailCode(boolean isReg,String email,SendEmialType sendEmialType){
		
		if (null!=email && RegexUtils.find(RegexUtils.EMAIL, email)) {
			if (isReg) {
				// 判断邮箱是否存在
				TUser user = TUser.dao.findByEmail(email);
				if (null != user) {
					result.addError("该邮箱已经注册过，请返回登录或者使用新邮箱地址");
					renderJson(result);
					return;
				}
			}
			
			
			String code=StringUtils.random(6, RandomType.INT);
			boolean res_code = WebUtils.sendMailCode(email, code, sendEmialType);
			if (!res_code) {
				renderJson(result.addError("邮箱验证码发送失败"));
				return;
			}
			//验证码放入缓存
			CacheKit.put("tenMinute", email, code);
			 renderJson(result);
			 return;
		}else {
			renderJson(result.addError("请检查您的邮箱"));
			return;
		}
	}
	
	/**
	 * 发送手机验证码并存入缓存
	 * @param mobile
	 * @param smsType
	 */
	private void sendSMSCode(String mobile,int smsType){
		String code=StringUtils.random(6, RandomType.INT);
		int res_code = -9;
		if (smsType==0) {
			//注册
			res_code= SMSUtils.SMSCode(mobile, code, null, null, null,null,SendSMSType.REGISTER);
		}else if (smsType==1) {
			//找回密码
			res_code= SMSUtils.SMSCode(mobile, code, null, null, null,null,SendSMSType.FORGET);
		}
		if (res_code!=0) {
			renderJson(result.addError("短信验证码发送失败"));
			return;
		}
		//验证码放入缓存
		CacheKit.put("tenMinute", mobile, code);
		
		renderJson(result);
	}
}
