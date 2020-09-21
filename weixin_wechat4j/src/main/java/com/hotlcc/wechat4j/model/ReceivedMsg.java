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

@Getter
@Setter
public final class ReceivedMsg implements Serializable {
    private static final long serialVersionUID = 1L;

    private ReceivedMsg() {
    }

    @JSONField(name = "SubMsgType")
    private Integer subMsgType;
    @JSONField(name = "VoiceLength")
    private Long voiceLength;
    @JSONField(name = "FileName")
    private String fileName;
    @JSONField(name = "ImgHeight")
    private Long imgHeight;
    @JSONField(name = "ToUserName")
    private String toUserName;
    @JSONField(name = "HasProductId")
    private Long hasProductId;
    @JSONField(name = "ImgStatus")
    private Integer imgStatus;
    @JSONField(name = "Url")
    private String url;
    @JSONField(name = "ImgWidth")
    private Integer imgWidth;
    @JSONField(name = "ForwardFlag")
    private Integer forwardFlag;
    @JSONField(name = "Status")
    private Integer status;
    @JSONField(name = "Ticket")
    private String ticket;
    @JSONField(name = "RecommendInfo")
    private RecommendInfo recommendInfo;
    @JSONField(name = "CreateTime")
    private Long createTime;
    @JSONField(name = "NewMsgId")
    private Long newMsgId;
    @JSONField(name = "MsgType")
    private Integer msgType;
    @JSONField(name = "EncryFileName")
    private String encryFileName;
    @JSONField(name = "MsgId")
    private String msgId;
    @JSONField(name = "StatusNotifyCode")
    private Integer statusNotifyCode;
    @JSONField(name = "AppInfo")
    private AppInfo appInfo;
    @JSONField(name = "AppMsgType")
    private Integer appMsgType;
    @JSONField(name = "PlayLength")
    private Long playLength;
    @JSONField(name = "MediaId")
    private String mediaId;
    @JSONField(name = "Content")
    private String content;
    @JSONField(name = "StatusNotifyUserName")
    private String statusNotifyUserName;
    @JSONField(name = "FromUserName")
    private String fromUserName;
    @JSONField(name = "OriContent")
    private String oriContent;
    @JSONField(name = "FileSize")
    private String fileSize;

    public static ReceivedMsg valueOf(JSONObject msg) {
        if (msg == null) {
            return null;
        }

        return JSON.toJavaObject(msg, ReceivedMsg.class);
    }

    public static List<ReceivedMsg> valueOf(JSONArray msgs) {
        if (msgs == null) {
            return null;
        }

        List<ReceivedMsg> receivedMsgList = new ArrayList<>();
        for (int i = 0, len = msgs.size(); i < len; i++) {
            JSONObject info = msgs.getJSONObject(i);
            receivedMsgList.add(ReceivedMsg.valueOf(info));
        }
        return receivedMsgList;
    }
}
