package com.pflm.module.menu.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

/**
 * 熔断处理
 * @author qinxuewu
 * @create 18/11/10下午12:55
 * @since 1.0.0
 */

@Component
public class MenuServiceHystric implements  MenuService{

    @Override
    public JSONObject create(String access_token, JSONObject info) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject delete(String access_token) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject get(String access_token) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject addconditional(String access_token, JSONObject info) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject delconditional(String access_token, JSONObject info) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject trymatch(String access_token, JSONObject info) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    @Override
    public JSONObject getCurrentSelfmenuInfo(String access_token) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }
}
