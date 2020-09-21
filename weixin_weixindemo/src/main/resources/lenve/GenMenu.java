package lenve;

import com.google.gson.Gson;
import okhttp3.*;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by wangsong on 16-7-14.
 */
public class GenMenu {

    private static String accessToken = "RFUBMKV-nFp4Y3TrSzsTwCsyCZsMm_Bhbb-vwQDQ4TaM9U6fgpPZhM0SGiQCLAKvj6CuDHAfn_XE9JsL0_z4OXDA50idPZ_J--j2MC37r9a1KgHwB_xaOiwHzz_-ZWVbTQSaAAAYVX";

    public static void main(String[] args) {
//        accessToken = getAccessToken();
        genMenu(accessToken);
//        deleteMenu(accessToken);
    }

    private static void genMenu(String accessToken) {
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.connectTimeout(10, TimeUnit.SECONDS);
        OkHttpClient client = builder.build();
        List<MenuEntity> list = new ArrayList<>();
        String menuJson = getMenuJson(list);
        RequestBody menu = RequestBody.create(MediaType.parse("text/json;charset=UTF-8"), menuJson);
        Request request = new Request.Builder().post(menu).url("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + accessToken).build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println("createMenu:"+response.body().string().toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String getMenuJson(List<MenuEntity> list) {
    /*第一个一级菜单*/
        MenuEntity recode1 = new MenuEntity();
        List<MenuEntity> subList1 = new ArrayList<>();
        recode1.setName("随手记");
        MenuEntity subM1 = new MenuEntity();
        subM1.setName("记早餐");
        subM1.setType("click");
        subM1.setKey("breakfast");
        MenuEntity subM2 = new MenuEntity();
        subM2.setName("记午餐");
        subM2.setType("click");
        subM2.setKey("lunch");
        MenuEntity subM3 = new MenuEntity();
        subM3.setName("记晚餐");
        subM3.setType("click");
        subM3.setKey("dinner");
        MenuEntity subM4 = new MenuEntity();
        subM4.setName("自定义");
        subM4.setType("click");
        subM4.setKey("customrecode");
        subList1.add(subM1);
        subList1.add(subM2);
        subList1.add(subM3);
        subList1.add(subM4);
        recode1.setSub_button(subList1);
        list.add(recode1);
        /*第二个一级菜单*/
        MenuEntity recode2 = new MenuEntity();
        recode2.setName("备忘录");
        recode2.setType("click");
        recode2.setKey("note");
        list.add(recode2);
        /*第三个一级菜单*/
        MenuEntity recode3 = new MenuEntity();
        recode3.setName("查账单");
        recode3.setType("click");
        recode3.setKey("search_bill");
        list.add(recode3);
        Gson gson = new Gson();
        Map<String, List<MenuEntity>> map = new HashMap<>();
        map.put("button", list);
        String json = gson.toJson(map);
        System.out.println(json);
        return json;
    }

    private static void deleteMenu(String accessToken) {
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.connectTimeout(10, TimeUnit.SECONDS);
        OkHttpClient client = builder.build();
        Request request = new Request.Builder().get().url("https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=" + accessToken).build();
        try {
            client.newCall(request).execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String getAccessToken() {
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.connectTimeout(10, TimeUnit.SECONDS);
        OkHttpClient client = builder.build();
        Request request = new Request.Builder().get().url("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=SECRET").build();
        try {
            Response response = client.newCall(request).execute();
            String result = response.body().string();
            try {
                JSONObject jo = new JSONObject(result);
                String access_token = jo.getString("access_token");
                System.out.println("accessToken:"+jo.toString());
                return access_token;
            } catch (JSONException e) {
//                e.printStackTrace();
                System.out.println("AccessToken获取失败！");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
