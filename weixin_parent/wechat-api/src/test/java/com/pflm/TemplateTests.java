package com.pflm;
import com.alibaba.fastjson.JSONObject;
import com.pflm.module.core.dao.AccessToeknDao;
import com.pflm.module.template.service.TemplateService;
import com.pflm.utils.WeixinUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.HashMap;
import java.util.Map;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 11:48
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class TemplateTests {

    @Autowired
    TemplateService templateService;



    @Test
    public void test1() throws Exception {
        String token="15_5L2fLqmRWIPc80tk61MIGlU8fPydaCbreLKrFEIzu6abuWmBrGlL3btbJGYGZ0KIf0na-Tu3K7b8s8YFPhsH2Iaf40_3KVjV1utlppHornkSDDDi0D_Qt9a-9kl27E0JGtt6ZVd2tqWBONR1NPGdAIAFHY";
        JSONObject res=templateService.getAllTemplate(token);
        System.err.println("请求结果*********"+res.toJSONString());
    }


    @Test
    public void test2() throws Exception {
        String token="15_1JnDNx10ZVM95d20oczgDsMbpezzeFgssIqPJPWCD94dHlp5tOLxi-tKrzktfJwuYPEPhulEsyhOV6MuW1lSnEOzGCPmQyo7p5SySKBx6N5F2v-0JRIqRNSCBSA_JJcFU53RGjJfKrSxT-v-FMQeAGALSW";

        String openid="oWslW6PvScXrGuELbdriuFWSILQY";
        String template_id="13KTlTCWyWycoF-aXxb1_HcF83DwNEqtLsOH2g9KZlI";
        String detail_url="https://www.baidu.com";
        Map<String, Object> map = new HashMap<String, Object>();
        WeixinUtil.wxMsgMap(map, "first","111", "#173177");
        WeixinUtil.wxMsgMap(map, "accountType", "222", "#173177");
        WeixinUtil.wxMsgMap(map, "account", "33", "#173177");
        WeixinUtil.wxMsgMap(map, "amount", "444", "#173177");
        WeixinUtil.wxMsgMap(map, "result", "555", "#173177");
        WeixinUtil.wxMsgMap(map, "remark", "666", "#173177");
        JSONObject res=templateService.send(token,setTemplate(openid,template_id,detail_url,map));

        System.err.println("请求结果*********"+res.toJSONString());
    }

    public JSONObject  setTemplate(String openId, String template_id, String detailUrl, Map<String, Object> map){
        JSONObject jso = new JSONObject();
        jso.put("touser", openId);
        jso.put("template_id", template_id);
        if (detailUrl != null){
            jso.put("url", detailUrl);
        }
        jso.put("data", map);
        return  jso;
    }
}
