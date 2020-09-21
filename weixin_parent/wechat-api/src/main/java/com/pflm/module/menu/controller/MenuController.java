package com.pflm.module.menu.controller;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.module.BaseController;
import com.pflm.module.menu.service.MenuService;
import com.pflm.utils.R;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 微信菜单控制器
 * @author qinxuewu
 * @create 18/11/10下午1:17
 * @since 1.0.0
 */

@RestController
@RequestMapping("/api/menu")
public class MenuController extends BaseController {
    public  final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    public  MenuService menuService;

    /**
     * 自定义菜单创建
     * @param params
     * @param accessToken
     * @return
     */
    @ApiSysyLog("自定义菜单创建")
    @RequestMapping("/create")
    public R create(String accessToken,@RequestBody JSONObject params){
        if(StringUtils.isEmpty(accessToken)|| params==null){
            return R.error("accessToken,params 不能为空");
        }
        JSONObject info=menuService.create(accessToken,params);
        return  R.ok().put("data",info);
    }

    /**
     * 自定义菜单查询
     * @param accessToken
     * @return
     */
    @ApiSysyLog("自定义菜单查询")
    @RequestMapping("/get")
    public R get(String accessToken){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject info=menuService.get(accessToken);
        return  R.ok().put("data",info);
    }


    /**
     * 自定义菜单删除
     * @param accessToken
     * @return
     */
    @ApiSysyLog("自定义菜单删除")
    @RequestMapping("/delete")
    public R delete(String accessToken){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject info=menuService.delete(accessToken);
        return  R.ok().put("data",info);
    }

    /**
     * 创建个性化菜单
     * @param accessToken
     * @param params
     * @return
     */
    @ApiSysyLog("创建个性化菜单")
    @RequestMapping("/addconditional")
    public R addconditional(String accessToken,@RequestBody JSONObject params){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject info=menuService.addconditional(accessToken,params);
        return  R.ok().put("data",info);
    }


    /**
     *  删除个性化菜单
     * @param accessToken
     * @param params
     * @return
     */
    @ApiSysyLog("删除个性化菜单")
    @RequestMapping("/delconditional")
    public R delconditional(String accessToken,@RequestBody JSONObject params){
        JSONObject info=menuService.delconditional(accessToken,params);
        return  R.ok().put("data",info);
    }

    /**
     *  测试个性化菜单匹配结果
     * @param accessToken
     * @return
     */
    @ApiSysyLog("测试个性化菜单匹配结果")
    @RequestMapping("/trymatch")
    public R trymatch(String accessToken,@RequestBody JSONObject params){
        JSONObject info=menuService.trymatch(accessToken,params);
        return  R.ok().put("data",info);
    }


    /**
     *  获取自定义菜单配置
     * @param accessToken
     * @return
     */
    @ApiSysyLog("获取自定义菜单配置")
    @RequestMapping("/getCurrentSelfmenuInfo")
    public R getCurrentSelfmenuInfo(String accessToken){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject info=menuService.getCurrentSelfmenuInfo(accessToken);
        return  R.ok().put("data",info);
    }
}
