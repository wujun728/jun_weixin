package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 等待确认登录的tip
 *
 * @author Allen
 */
@SuppressWarnings("unused")
@Getter
@AllArgsConstructor
public enum LoginTip {
    TIP_0(0, "扫码登录"),
    TIP_1(1, "确认登录");

    private int code;
    private String desc;

    @Override
    public String toString() {
        return code + "";
    }
}
