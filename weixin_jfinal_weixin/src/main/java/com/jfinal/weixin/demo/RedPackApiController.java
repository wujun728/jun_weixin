package com.jfinal.weixin.demo;

import com.jfinal.core.Controller;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.RedPackApi;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;

import java.util.HashMap;
import java.util.Map;

/**
 * 微信红包demo
 * @author osc余书慧
 */
public class RedPackApiController extends Controller {
    // 商户相关资料
    private static String wxappid = "";
    // 微信支付分配的商户号
    private static String partner = "";
    private static String sendName = "";
    //API密钥
    private static String paternerKey = "";
    //微信证书路径
    private static String certPath = "";

    public void send() {
        // 接受红包的用户用户在wxappid下的openid
        String reOpenid = "";
        // 商户订单号
        String mchBillno = System.currentTimeMillis() + "";
        String ip = IpKit.getRealIp(getRequest());

        Map<String, String> params = new HashMap<String, String>();
        // 随机字符串
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        // 商户订单号
        params.put("mch_billno", mchBillno);
        // 商户号
        params.put("mch_id", partner);
        // 公众账号ID
        params.put("wxappid", wxappid);
        // 商户名称
        params.put("send_name", sendName);
        // 用户OPENID
        params.put("re_openid", reOpenid);
        // 付款现金(单位分)
        params.put("total_amount", "100");
        // 红包发放总人数
        params.put("total_num", "1");
        // 红包祝福语
        params.put("wishing", "恭喜您....");
        // 终端IP
        params.put("client_ip", ip);
        // 活动名称
        params.put("act_name", "床垫睡眠日活动");
        // 备注
        params.put("remark", "新年新气象");
        //创建签名
        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);

        String xmlResult = RedPackApi.sendRedPack(params, certPath, partner);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
        System.out.println(result);
        //业务结果
        String result_code = result.get("result_code");
        //此字段是通信标识，非交易标识，交易是否成功需要查看result_code来判断
        String return_code = result.get("return_code");
        //
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            System.out.println("发送成功");
        } else {
            System.out.println("发送失败");
        }
        renderJson(result);
    }

    public void query() {
        Map<String, String> params = new HashMap<String, String>();
        // 随机字符串
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        // 商户订单号
        params.put("mch_billno", "20160227083703842100294140");
        // 商户号
        params.put("mch_id", partner);
        // 公众账号ID
        params.put("appid", wxappid);
        params.put("bill_type", "MCHT");
        //创建签名
        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);

        String xmlResult = RedPackApi.getHbInfo(params, certPath, partner);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
        System.out.println(result);
        renderJson(result);
    }

}
