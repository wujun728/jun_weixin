package com.jfinal.weixin.sdk.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class UserApiTest {

    public static void main(String[] args) throws IOException {
        AccessTokenApiTest.main(args);

        ApiResult ar = UserApi.getFollows();
        System.out.println(ar.getJson());
        
        Map<String, Object> map = ar.get("data");
        
        List<String> list = (List<String>) map.get("openid");
        System.out.println(list);
        
        String nextOpenid = ar.get("next_openid");
        System.out.println(nextOpenid);
    }
}
