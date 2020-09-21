package com.hotlcc.wechat4j.model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * RecommendInfo
 *
 * @author Allen
 */
@Getter
@Setter
public final class RecommendInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    private RecommendInfo() {
    }

    @JSONField(name = "Ticket")
    private String ticket;
    @JSONField(name = "UserName")
    private String userName;
    @JSONField(name = "Sex")
    private Integer sex;
    @JSONField(name = "AttrStatus")
    private Integer attrStatus;
    @JSONField(name = "City")
    private String city;
    @JSONField(name = "NickName")
    private String nickName;
    @JSONField(name = "Scene")
    private Integer scene;
    @JSONField(name = "Province")
    private String province;
    @JSONField(name = "Content")
    private String content;
    @JSONField(name = "Alias")
    private String alias;
    @JSONField(name = "Signature")
    private String signature;
    @JSONField(name = "OpCode")
    private Integer opCode;
    @JSONField(name = "QQNum")
    private Long qqNum;
    @JSONField(name = "VerifyFlag")
    private Integer verifyFlag;

    public static RecommendInfo valueOf(JSONObject info) {
        if (info == null) {
            return null;
        }

        return JSON.toJavaObject(info, RecommendInfo.class);
    }

    public static List<RecommendInfo> valueOf(JSONArray infos) {
        if (infos == null) {
            return null;
        }

        List<RecommendInfo> recommendInfos = new ArrayList<>();
        for (int i = 0, len = infos.size(); i < len; i++) {
            JSONObject info = infos.getJSONObject(i);
            recommendInfos.add(RecommendInfo.valueOf(info));
        }
        return recommendInfos;
    }
}
