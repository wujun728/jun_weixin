package com.zzkun.model;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Created by Administrator on 2016/6/17.
 */
public class RedBagRecord implements Serializable {

    public static final String TYPE_FIRST = "TYPE_FIRST";
    public static final String TYPE_DAILY = "TYPE_DAILY";
    public static final String TYPE_TEST = "TYPE_TEST";
    public static final String TYPE_CONSUME = "TYPE_CONSUME";

    private int id;
    private String appid;
    private LocalDateTime time;
    private double value;
    private String type;

    public RedBagRecord() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "RedBagRecord{" +
                "id=" + id +
                ", appid='" + appid + '\'' +
                ", time=" + time +
                ", value=" + value +
                ", type='" + type + '\'' +
                '}';
    }
}
