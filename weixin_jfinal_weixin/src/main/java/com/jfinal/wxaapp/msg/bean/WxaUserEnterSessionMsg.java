/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg.bean;

import com.jfinal.wxaapp.msg.MsgModel;

public class WxaUserEnterSessionMsg extends WxaMsg {
    private static final long serialVersionUID = 1909321793183745030L;

    protected String event;
    protected String sessionFrom;

    public WxaUserEnterSessionMsg(MsgModel msgModel) {
        super(msgModel);
        this.event = msgModel.getEvent();
        this.sessionFrom = msgModel.getSessionFrom();
    }

    public String getEvent() {
        return event;
    }
    public String getSessionFrom() {
        return sessionFrom;
    }
    
}
