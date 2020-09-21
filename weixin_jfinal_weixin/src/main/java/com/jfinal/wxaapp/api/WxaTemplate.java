/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import java.io.Serializable;
import java.util.HashMap;

import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 小程序模版封装
 * @author L.cm
 *
 */
public class WxaTemplate implements Serializable {
    private static final long serialVersionUID = 2634554747304038112L;

    private String touser;
    private String template_id;
    private String page;
    private String form_id;
    private String emphasis_keyword; 
    
    private TemplateItem data;

    public WxaTemplate() {
        this.data = new TemplateItem();
    }

    public String getTouser() {
        return touser;
    }

    public WxaTemplate setTouser(String touser) {
        this.touser = touser;
        return this;
    }

    public String getTemplate_id() {
        return template_id;
    }

    public WxaTemplate setTemplate_id(String template_id) {
        this.template_id = template_id;
        return this;
    }

    public String getPage() {
        return page;
    }

    public WxaTemplate setPage(String page) {
        this.page = page;
        return this;
    }

    public String getForm_id() {
        return form_id;
    }

    public WxaTemplate setForm_id(String form_id) {
        this.form_id = form_id;
        return this;
    }

    public String getEmphasis_keyword() {
        return emphasis_keyword;
    }

    public WxaTemplate setEmphasis_keyword(String emphasis_keyword) {
        this.emphasis_keyword = emphasis_keyword;
        return this;
    }

    public TemplateItem getData() {
        return data;
    }

    public WxaTemplate add(String key, String value, String color){
        data.put(key, new Item(value, color));
        return this;
    }
    
    public WxaTemplate add(String key, String value){
        data.put(key, new Item(value));
        return this;
    }

    /**
     * 直接转化成jsonString
     * @return {String}
     */
    public String build() {
        return JsonUtils.toJson(this);
    }

    public class TemplateItem extends HashMap<String, Item> {
        private static final long serialVersionUID = -3728490424738325020L;

        public TemplateItem() {}

        public TemplateItem(String key, Item item) {
            this.put(key, item);
        }
    }

    public class Item {
        private Object value;
        private String color;

        public Object getValue() {
            return value;
        }
        public void setValue(Object value) {
            this.value = value;
        }
        public String getColor() {
            return color;
        }
        public void setColor(String color) {
            this.color = color;
        }
        
        public Item(Object value) {
            this(value, "#999");
        }
        public Item(Object value, String color) {
            this.value = value;
            this.color = color;
        }
    }
}
