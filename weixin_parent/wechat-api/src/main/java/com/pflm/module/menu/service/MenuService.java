package com.pflm.module.menu.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 微信菜单管理接口
 * @author qinxuewu
 * @create 18/11/10下午12:54
 * @since 1.0.0
 */

@FeignClient(name = "menu",url = "${wx.api.url}",fallback = MenuServiceHystric.class)
public interface MenuService {


    /**
     * 自定义菜单创建
     * @param access_token 基础token
     * @param info  菜单json参数
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/create", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject create(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);



    /**
     * 自定义菜单查询
     * @param access_token 基础token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/get", method = RequestMethod.GET)
    public JSONObject get(@RequestParam("access_token") String access_token);


    /**
     * 自定义菜单删除 在个性化菜单时，调用此接口会删除默认菜单及全部个性化菜单。
     * @param access_token 基础token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/delete", method = RequestMethod.GET)
    public JSONObject delete(@RequestParam("access_token") String access_token);

    /**
     * 创建个性化菜单
     * @param access_token 基础token
     * @param info  菜单json参数
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/addconditional", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject addconditional(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);



    /**
     * 删除个性化菜单
     * @param access_token 基础token
     * @param info  菜单json参数 请求示例:{"user_id":"weixin"}
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/delconditional", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject delconditional(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);


    /**
     * 测试个性化菜单匹配结果
     * @param access_token 基础token
     * @param info  菜单json参数  请求示例:{"user_id":"weixin"}
     * @return
     */
    @RequestMapping(value = "/cgi-bin/menu/trymatch", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject trymatch(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);


    /**
     * 获取自定义菜单配置接口
     * @param access_token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/get_current_selfmenu_info", method = RequestMethod.GET)
    public JSONObject getCurrentSelfmenuInfo(@RequestParam("access_token") String access_token);
}
