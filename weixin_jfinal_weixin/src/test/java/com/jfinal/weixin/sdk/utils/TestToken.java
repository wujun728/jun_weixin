package com.jfinal.weixin.sdk.utils;

import com.jfinal.weixin.sdk.utils.RetryUtils.ResultCheck;

import java.io.Serializable;

public class TestToken implements ResultCheck, Serializable {

    private static final long serialVersionUID = -7728286550916259295L;

    private String t;
    private String tt;

    @Override
    public boolean matching() {
        return t.equals(tt);
    }

    @Override
    public String toString() {
        return "TestToken [t=" + t + ", tt=" + tt + "]";
    }

    public String getT() {
        return t;
    }

    public void setT(String t) {
        this.t = t;
    }

    public String getTt() {
        return tt;
    }

    public void setTt(String tt) {
        this.tt = tt;
    }

    @Override
    public String getJson() {
        return JsonUtils.toJson(this);
    }

}
