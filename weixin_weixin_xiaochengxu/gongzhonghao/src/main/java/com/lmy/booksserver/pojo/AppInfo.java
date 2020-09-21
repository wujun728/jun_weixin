package com.lmy.booksserver.pojo;

public class AppInfo {
    private int id;
    private String appId;
    private String appKey;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    @Override
    public String toString() {
        return "AppKey{" +
                "id=" + id +
                ", appId='" + appId + '\'' +
                ", appKey='" + appKey + '\'' +
                '}';
    }
}
