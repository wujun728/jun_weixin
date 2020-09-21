package com.github.sd4324530.fastweixin.api.config;

/**
 * 用户自定义获取jsApiTicket接口.
 *
 * @author Baishui2004
 */
public interface CustomJsApiTicketGetter {

    /**
     * 获取jsApiTicket.
     */
    String getJsApiTicket();

}
