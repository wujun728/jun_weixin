package com.github.sd4324530.firePusher.pusher;

import com.github.sd4324530.firePusher.Pusher;
import com.github.sd4324530.firePusher.config.IOSPushConfig;
import com.github.sd4324530.firePusher.config.OpenFirePushConfig;
import com.github.sd4324530.firePusher.config.PushConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * 推送器工厂类
 *
 * @author peiyu
 */
public final class PusherFactory {

    private static final Logger LOG = LoggerFactory.getLogger(PusherFactory.class);

    /**
     * 用于管理所有已经生成的推送器
     */
    private final Map<String, Pusher> paramCache = new HashMap<>();

    /**
     * 不允许实例化
     */
    private PusherFactory() {
    }

    /**
     * 获取管理类单例
     *
     * @return 管理类单例
     */
    public static PusherFactory me() {
        return PusherFactoryHandler.ME;
    }

    /**
     * 获取消息推送器
     *
     * @param config 推送配置
     * @return 推送器
     */
    public Pusher getPusher(final PushConfig config) {
        Pusher pusher = null;
        String key;
        switch (config.getType()) {
            case IOS:
                IOSPushConfig iosConfig = (IOSPushConfig) config;
                key = iosConfig.getP12Path();
                pusher = this.paramCache.get(key);
                if (null == pusher) {
                    pusher = new IOSPusher(iosConfig);
                    this.paramCache.put(key, pusher);
                } else {
                    if (!pusher.isOpen()) {
                        try {
                            ((IOSPusher) pusher).init();
                        } catch (Exception e) {
                            LOG.error("连接苹果推送服务器异常", e);
                            pusher = null;
                            this.paramCache.remove(key);
                        }
                    }
                }
                break;
            case OPEN_FIRE:
                OpenFirePushConfig openFireConfig = (OpenFirePushConfig) config;
                key = openFireConfig.getServerIP() + ":" + openFireConfig.getServerPort();
                pusher = this.paramCache.get(key);
                if (null == pusher) {
                    pusher = new OpenFirePusher(openFireConfig);
                    this.paramCache.put(key, pusher);
                } else {
                    if (!pusher.isOpen()) {
                        ((OpenFirePusher) pusher).init();
                    }
                }
                break;
            default:
                LOG.warn("非法的推送配置类型:{}", config.getType());
                break;
        }
        return pusher;
    }

    /**
     * 回收释放消息推送器
     *
     * @param pusher 需要回收的推送器
     */
    synchronized void releasePusher(final Pusher pusher) {
        if (null != pusher) {
            LOG.debug("回收推送器,key:{}.....", pusher.getKey());
            this.paramCache.remove(pusher.getKey());
        }
    }

    private static class PusherFactoryHandler {
        private static PusherFactory ME = new PusherFactory();
    }
}
