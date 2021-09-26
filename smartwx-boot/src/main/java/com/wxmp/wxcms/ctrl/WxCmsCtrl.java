/*
 * FileName：WxCmsCtrl.java 
 * <p>
 * Copyright (c) 2017-2020, <a href="http://www.webcsn.com">hermit (794890569@qq.com)</a>.
 * <p>
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/gpl-3.0.html
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.wxmp.wxcms.ctrl;

import com.alibaba.fastjson.JSONObject;
import com.wxmp.core.common.BaseCtrl;
import com.wxmp.core.util.AjaxResult;
import com.wxmp.wxapi.process.MediaType;
import com.wxmp.wxapi.process.MpAccount;
import com.wxmp.wxapi.process.WxApiClient;
import com.wxmp.wxapi.process.WxMemoryCacheClient;
import com.wxmp.wxcms.domain.Account;
import com.wxmp.wxcms.domain.ImgResource;
import com.wxmp.wxcms.domain.SysUser;
import com.wxmp.wxcms.mapper.AccountDao;
import com.wxmp.wxcms.service.MsgNewsService;
import com.wxmp.wxcms.service.SysUserService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.*;

/**
 *
 * @author hermit
 * @version 2.0
 * @date 2018-04-17 10:54:58
 */
@Controller
@RequestMapping("/wxcms")
public class WxCmsCtrl extends BaseCtrl {

	@Resource
    AccountDao accountDao;
	
	@Autowired
	private SysUserService sysUserService;

	@Autowired
	private MsgNewsService msgNewsService;

	@RequestMapping(value = "/urltoken")
	@ResponseBody
	public AjaxResult urltoken() {
		List<Account> accounts = accountDao.listForPage(null);
		Account account = new Account();
		if (!CollectionUtils.isEmpty(accounts)) {
			for (Account acc : accounts) {
				if (acc.getAccount().equals(WxMemoryCacheClient.getAccount())) {
					account = acc;
					break;
				}
			}
		}
		List<String> msgCountList = new ArrayList<String>();
		for (int i = 1; i < 8; i++) {
			msgCountList.add(String.valueOf(i));
		}
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("account", account);
		data.put("msgCountList", msgCountList);
		return AjaxResult.success(data);
	}

	@RequestMapping(value = "/getUrl")
	@ResponseBody
	public AjaxResult getUrl(Account account){
		String url = "/wxapi/" + account.getAccount() + "/message.html";
		
		if(account.getId() == null){//新增
			account.setUrl(url);
			account.setToken(UUID.randomUUID().toString().replace("-", ""));
			account.setCreatetime(new Date());
			accountDao.add(account);
		}else{//更新
			Account tmpAccount = accountDao.getById(account.getId());
			tmpAccount.setUrl(url);
			tmpAccount.setAccount(account.getAccount());
			tmpAccount.setAppid(account.getAppid());
			tmpAccount.setAppsecret(account.getAppsecret());
			tmpAccount.setMsgcount(account.getMsgcount());
			tmpAccount.setName(account.getName());
			accountDao.update(tmpAccount);
		}
		return AjaxResult.success(account);
	}
	

	//上传永久素材，这里以图文消息为例子
	@RequestMapping(value = "/toUploadMaterial")
	public ModelAndView toUploadMaterial(String[] newIds){
		ModelAndView mv = new ModelAndView("wxcms/materialUpload");
		mv.addObject("cur_nav", "material");
		return mv;
	}
	
	//到生成二维码页面
	@RequestMapping(value = "/qrcode")
	public ModelAndView qrcode(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("wxcms/qrcode");
		mv.addObject("cur_nav", "qrcode");
		return mv;
	}
	
	//发送消息页面
	@RequestMapping(value = "/sendMsg")
	public ModelAndView sendMsg(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("wxcms/sendmsg");
		mv.addObject("cur_nav", "sendmsg");
		
		return mv;
	}
	
	//通过interceptor处理OAuth认证
	@RequestMapping(value = "/oauthInterceptor")
	public ModelAndView oauthInterceptor(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("wxcms/oauthInterceptor");
		mv.addObject("cur_nav", "oauthInterceptor");
		
		return mv;
	}
	
	//jssdk
	@RequestMapping(value = "/jssdk")
	public ModelAndView jssdk(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("wxcms/jssdk");
		mv.addObject("cur_nav", "jssdk");
		
		return mv;
	}
	
	//weui 微信网页开发样式库
	@RequestMapping(value = "/weui")
	public ModelAndView weui(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("wxcms/weui");
		mv.addObject("cur_nav", "weui");
		return mv;
	}
	
	/**
	 * 登录之后跳转到主页
	 * @param userId
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/main")
	public ModelAndView main(@RequestParam(required=false) String userId, HttpSession session){
		ModelAndView mv = new ModelAndView("wxcms/main");
		SysUser sysUser = sysUserService.getSysUserById(userId);
		session.setAttribute("sysUser", sysUser);
		return mv;
	}
	
	@RequestMapping(value="/saveFile")
	@ResponseBody
	public void saveFile(MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception{
		 String fileName = file.getOriginalFilename();  
		 String ext = FilenameUtils.getExtension(fileName);
		 fileName = System.currentTimeMillis()+new Random().nextInt(10000)+"."+ext;
		 
		 String filePath = request.getSession().getServletContext().getRealPath("/")+"upload\\"+fileName;  
		 File saveFile = new File(filePath);
		 
		 if(!saveFile.exists()){
			 saveFile.mkdirs();
		 }
		 file.transferTo(saveFile);
		 
		 
		 MpAccount mpAccount = WxMemoryCacheClient.getMpAccount();//获取缓存中的唯一账号
		 //添加永久图片
		 String materialType = MediaType.Image.toString();
	    
		 //返回mediaId
		 JSONObject imgResultObj = WxApiClient.addMaterial(filePath,materialType,mpAccount);
		 ImgResource img = new ImgResource();
		
		 //上传图片的id
		 String imgMediaId = "";
		 String imgUrl = "";
		 
		 JSONObject obj = new JSONObject();
		 if(imgResultObj != null && imgResultObj.containsKey("media_id")){
				imgMediaId = imgResultObj.getString("media_id");
				imgUrl = imgResultObj.getString("url");
				img.setName(fileName);
				img.setSize((int)file.getSize());
				img.setTrueName(fileName);
				img.setType(ext);
				img.setUrl("/upload/" + fileName);
				img.setHttpUrl(imgUrl);//http地址
				obj.put("url", fileName);
				obj.put("id", "111");
				obj.put("imgMediaId", imgMediaId);
		   }else{
				obj.put("url", fileName);
				obj.put("id", "111");
				obj.put("imgMediaId", null);
	       }

		   response.getWriter().print(obj);
	}

}
