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
 * AppInfo
 *
 * @author Allen
 */
@Getter
@Setter
public final class AppInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    private AppInfo() {
    }

    @JSONField(name = "Type")
    private Integer type;
    @JSONField(name = "AppID")
    private String appID;

    public static AppInfo valueOf(JSONObject info) {
        if (info == null) {
            return null;
        }
        return JSON.toJavaObject(info, AppInfo.class);
    }

    public static List<AppInfo> valueOf(JSONArray infos) {
        if (infos == null) {
            return null;
        }

        List<AppInfo> appInfos = new ArrayList<>();
        for (int i = 0, len = infos.size(); i < len; i++) {
            JSONObject info = infos.getJSONObject(i);
            appInfos.add(AppInfo.valueOf(info));
        }
        return appInfos;
    }
}
