package com.hotlcc.wechat4j.enums;

import lombok.AllArgsConstructor;

/**
 * 微信退出类型
 *
 * @author Allen
 */
@AllArgsConstructor
public enum ExitType {
    ERROR_EXIT("错误退出"),
    LOCAL_EXIT("本地退出"),
    REMOTE_EXIT("远程退出");

    private String desc;
}
