package com.pflm.utils;

/**
 * feign中日志级别
 * @author qinxuewu
 * @version 1.00
 * @time 25/10/2018下午 4:03
 */
public enum  Level {
    /**
     * No logging.不记录日志
     */
   NONE,
    /**
     * 只记录请求方法和URL，以及响应状态代码和执行时间。
     */
    BASIC,
    /**
     * 记录请求和响应头基本信息。
     */
    HEADERS,
    /**
     * 记录请求和响应的标头、正文和元数据
     */
    FULL
    ;

}
