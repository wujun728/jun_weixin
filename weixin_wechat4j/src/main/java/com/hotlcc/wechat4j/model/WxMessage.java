package com.hotlcc.wechat4j.model;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * 要发送的消息
 *
 * @author Allen
 */
@Getter
@Setter
public class WxMessage implements Serializable {
    private static final long serialVersionUID = 1L;

    @JSONField(name = "ClientMsgId")
    private String clientMsgId;
    @JSONField(name = "Content")
    private String content;
    @JSONField(name = "FromUserName")
    private String fromUserName;
    @JSONField(name = "LocalID")
    private String localID;
    @JSONField(name = "ToUserName")
    private String toUserName;
    @JSONField(name = "Type")
    private Integer type;
}
