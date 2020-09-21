package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author Allen
 * @version 1.0
 * @date 2019/4/17 9:51
 */
@Getter
@AllArgsConstructor
public enum MediaType {
    PICTURE(4, "pic"),
    VIDEO(4, "video");

    public static String REQUEST_KEY = "mediatype";
    public static String REQUEST_JSON_KEY = "MediaType";

    private Integer code;
    private String value;
}
