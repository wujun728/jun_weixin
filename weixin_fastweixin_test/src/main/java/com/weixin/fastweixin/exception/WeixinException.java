package com.weixin.fastweixin.exception;

/**
 * 微信API处理异常
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public class WeixinException extends RuntimeException {

	private static final long serialVersionUID = -3187967845389893499L;

	public WeixinException() {
		super();
	}

	public WeixinException(String message) {
		super(message);
	}

	public WeixinException(String message, Throwable cause) {
		super(message, cause);
	}

	public WeixinException(Throwable cause) {
		super(cause);
	}
}
