package com.pflm.api;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 接口调用
 */
@FeignClient(value ="${api.server.name}")
public interface WeChatApi {


    /**
     * 通过code 获取用户的openid
     * @param code
     * @return
     */
    @RequestMapping(value = "/api/sns/oauth2/getUserOpenid", method = RequestMethod.GET)
    public JSONObject getOpenid(@RequestParam("code") String code);

    /**
     * 显示授权后   获取用户的基本信息
     * @param openid
     * @param token
     * @return
     */
    @RequestMapping(value = "/api/sns/oauth2/getUserInfo", method = RequestMethod.GET)
    public JSONObject getUserInfo(@RequestParam("openid") String openid,@RequestParam("token") String token);


    /**
     * 获取基础token
     * @return
     */
    @RequestMapping(value = "/api/token/get", method = RequestMethod.GET)
    public JSONObject getToken();


    /**
     * 获取getticket
     * @return
     */
    @RequestMapping(value = "/api/token/getticket", method = RequestMethod.GET)
    public JSONObject getticket(@RequestParam("accessToken") String accessToken);

    /**
     * 获得模板ID
     * @return
     */
    @RequestMapping(value = "/api/template/apiAddTemplate", method = RequestMethod.GET)
    public JSONObject apiAddTemplate(@RequestParam("accessToken") String accessToken,@RequestParam("templateId") String templateId);

    /**
     * 获取模板列表
     * @return
     */
    @RequestMapping(value = "/api/template/getAllTemplate", method = RequestMethod.GET)
    public JSONObject getAllTemplate(@RequestParam("accessToken") String accessToken);

    /**
     * 删除模板
     * @return
     */
    @RequestMapping(value = "/api/template/delTemplate", method = RequestMethod.GET)
    public JSONObject delTemplate(@RequestParam("accessToken") String accessToken,@RequestParam("templateId") String templateId);

    /**
     * 发送模板消息
     * @return
     */
    @RequestMapping(value = "/api/template/send", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject send(@RequestParam("accessToken") String accessToken,@RequestBody JSONObject info);


    /**
     *  自定义菜单创建
     * @return
     */
    @RequestMapping(value = "/api/menu/create", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject create(@RequestParam("accessToken") String accessToken,@RequestBody JSONObject info);


    /**
     *  自定义菜单查询
     * @return
     */
    @RequestMapping(value = "/api/menu/get", method = RequestMethod.GET)
    public JSONObject create(@RequestParam("accessToken") String accessToken);

    /**
     *  自定义菜单删除
     * @return
     */
    @RequestMapping(value = "/api/menu/delete", method = RequestMethod.GET)
    public JSONObject delete(@RequestParam("accessToken") String accessToken);

    /**
     *  创建个性化菜单
     * @return
     */
    @RequestMapping(value = "/api/menu/addconditional", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject addconditional(@RequestParam("accessToken") String accessToken,@RequestBody JSONObject info);

    /**
     *  删除个性化菜单
     * @return
     */
    @RequestMapping(value = "/api/menu/delconditional", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject delconditional(@RequestParam("accesToken") String accesToken,@RequestBody JSONObject info);


    /**
     *  获取自定义菜单配置
     * @return
     */
    @RequestMapping(value = "/api/menu/getCurrentSelfmenuInfo", method = RequestMethod.GET)
    public JSONObject getCurrentSelfmenuInfo(@RequestParam("accessToken") String accessToken);


    /**
     *  创建临时二维码
     * @return
     */
    @RequestMapping(value = "/api/qrcode/createTemporaryQrcode", method = RequestMethod.GET)
    public JSONObject createTemporaryQrcode(@RequestParam("accessToken") String accessToken,@RequestParam("seconds") String seconds,@RequestParam("scenestr") String scenestr);


    /**
     *  创建临时二维码
     * @return
     */
    @RequestMapping(value = "/api/qrcode/createPermanentQrcode", method = RequestMethod.GET)
    public JSONObject createPermanentQrcode(@RequestParam("accessToken") String accessToken,@RequestParam("scenestr") String scenestr);



    /**
     *  长链接转短链接
     * @return
     */
    @RequestMapping(value = "/api/qrcode/shorturl", method = RequestMethod.GET)
    public JSONObject shorturl(@RequestParam("accessToken") String accessToken,@RequestParam("url") String url);




}
