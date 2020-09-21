package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;

/**
 * Selector代码
 *
 * @author Allen
 */
@AllArgsConstructor
public enum Selector {
    SELECTOR_0(0, "正常"),
    SELECTOR_2(2, "有新消息"),
    SELECTOR_4(4, "目前发现修改了联系人备注会出现"),
    SELECTOR_6(6, "目前不知道代表什么"),
    SELECTOR_7(7, "手机操作了微信");

    private int code;
    private String desc;

    public static Selector valueOf(int code) {
        Selector[] es = values();
        for (Selector e : es) {
            if (e.code == code) {
                return e;
            }
        }
        return null;
    }
}
