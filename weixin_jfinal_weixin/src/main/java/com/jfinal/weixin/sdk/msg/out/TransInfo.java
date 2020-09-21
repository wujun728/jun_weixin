package com.jfinal.weixin.sdk.msg.out;

import java.io.Serializable;

/**
 * 将消息转发到多客服
 * @author L.cm
 * email: 596392912@qq.com
 * site:http://www.dreamlu.net
 * date: 2016年2月21日 下午2:31:34
 */
@SuppressWarnings("serial")
public class TransInfo implements Serializable {
    // 指定会话接入的客服账号
    private String KfAccount;

    public TransInfo() {}

    public TransInfo(String kfAccount) {
        KfAccount = kfAccount;
    }

    public String getKfAccount() {
        return KfAccount;
    }

    public void setKfAccount(String kfAccount) {
        KfAccount = kfAccount;
    }
}
