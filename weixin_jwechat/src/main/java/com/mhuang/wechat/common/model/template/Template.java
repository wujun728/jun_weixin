package com.mhuang.wechat.common.model.template;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;

import lombok.Data;

/**
 * 
 * @Package: com.mhuang.wechat.common.model.template
 * @Description 模板管理
 * @author huang.miao
 * @date 2017年2月8日 上午9:39:56  
 * @since 1.0.0
 * @group skiper-opensource
 */
@Data
public class Template implements Serializable{
    
    private static final long serialVersionUID = 1L;

    private String touser;//发送的openid
    
    @JSONField(name = "template_id")
    private String templateId = "";//模板id
    
    private String url;//跳转的url
    
    private Map<String,Map<String,String>> data = new HashMap<>();

    private final static String DEFAULT_COLOR = "#173177";
    private final static String FIRST = "first";
    private final static String KEYWORD = "keyword";
    private final static String VALUE = "value";
    private final static String COLOR = "color";
    private final static String REMARK = "remark";
    
    public void addKeyword(Integer index,String value){
        addKeyword(index,value,DEFAULT_COLOR);
    }   
    
    public void addOther(String name,String value){
        addOther(name, value, DEFAULT_COLOR);
    }
    
    public void addOther(String name,String value,String color){
        addDataMap(name,value,color);
    }
    
    public void addKeyword(Integer index,String value,String color){
        addDataMap(KEYWORD + index, value, color);
    }
    
    public void addRemark(String value){
        addRemark(value,DEFAULT_COLOR);
    }   
    
    public void addRemark(String value,String color){
        addDataMap(REMARK, value, color);
    }
    
    public void addFirst(String value){
        addFirst(value,DEFAULT_COLOR);
    }
    public void addFirst(String value,String color){
        addDataMap(FIRST, value, color);
    }
    
    private void addDataMap(String type,String value,String color){
        Map<String, String> map = new HashMap<>();
        map.put(VALUE, value);
        map.put(COLOR, color);
        data.put(type, map);
    }
}
