package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Ret代码
 *
 * @author Allen
 */
@AllArgsConstructor
@Getter
public enum Retcode {
    RECODE_0(0, "正常"),
    RECODE_1100(1100, "失败/登出微信"),
    RECODE_1101(1101, "从其它设备登录微信");

    private int code;
    private String desc;

    public static Retcode valueOf(int code) {
        Retcode[] es = values();
        for (Retcode e : es) {
            if (e.code == code) {
                return e;
            }
        }
        return null;
    }
}
