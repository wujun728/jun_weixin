package com.hotlcc.wechat4j.util;

import lombok.extern.slf4j.Slf4j;

/**
 * 通用工具类
 *
 * @author Allen
 */
@Slf4j
public final class CommonUtil {
    private CommonUtil() {
    }

    /**
     * 睡眠线程
     *
     * @param millis 时间
     * @param nanos  nanos
     */
    public static void threadSleep(long millis, int nanos) {
        try {
            Thread.sleep(millis, nanos);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 睡眠线程
     *
     * @param millis 时间
     */
    public static void threadSleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
