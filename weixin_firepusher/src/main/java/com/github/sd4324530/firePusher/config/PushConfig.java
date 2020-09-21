package com.github.sd4324530.firePusher.config;

/**
 * 推送参数接口
 *
 * @author peiyu
 */
public interface PushConfig {

    /**
     * 参数类型枚举，目前包括openfire推送服务器以及苹果推送服务器
     */
    enum ConfigType {
        OPEN_FIRE, IOS
    }

    /**
     * 获取参数类型
     *
     * @return 参数类型
     */
    ConfigType getType();

    /**
     * 设置是否为开发模式
     * @param dev 是否为开发模式
     */
    void setDev(boolean dev);

    /**
     * 获取是否为开发模式
     * @return 开发模式
     */
    boolean isDev();
}
