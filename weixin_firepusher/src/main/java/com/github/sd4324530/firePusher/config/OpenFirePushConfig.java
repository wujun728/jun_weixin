package com.github.sd4324530.firePusher.config;

/**
 * 基于openfire服务器作为推送服务器参数配置类
 *
 * @author peiyu
 */
public class OpenFirePushConfig implements PushConfig {

    /**
     * 服务器IP
     */
    private String serverIP;

    /**
     * 服务器端口
     */
    private int serverPort;

    private String serviceName;

    /**
     * 登录帐号
     */
    private String userName;

    /**
     * 登录密码
     */
    private String password;

    private boolean dev;

    public String getServerIP() {
        return serverIP;
    }

    public void setServerIP(String serverIP) {
        this.serverIP = serverIP;
    }

    public int getServerPort() {
        return serverPort;
    }

    public void setServerPort(int serverPort) {
        this.serverPort = serverPort;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    /**
     * 获取参数类型
     *
     * @return 参数类型
     */
    @Override
    public ConfigType getType() {
        return ConfigType.OPEN_FIRE;
    }

    @Override
    public boolean isDev() {
        return this.dev;
    }

    @Override
    public void setDev(boolean dev) {
        this.dev = dev;
    }
}
