package com.github.sd4324530.firePusher.exception;

/**
 * 消息推送异常
 * @author peiyu
 */
public class FirePusherException extends RuntimeException {

    public FirePusherException() {
        super();
    }

    public FirePusherException(String message) {
        super(message);
    }

    public FirePusherException(Throwable cause) {
        super(cause);
    }
}
