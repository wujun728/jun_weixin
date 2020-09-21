package com.hotlcc.wechat4j.model;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Getter;
import lombok.Setter;

/**
 * 媒体消息
 *
 * @author Allen
 */
@Getter
@Setter
public class MediaMessage extends WxMessage {
    @JSONField(name = "MediaId")
    private String mediaId;
}
