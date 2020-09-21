package com.pflm.entitiy;

/**
 * 普通按钮（子按钮）
 * @author qinxuewu
 * @version 1.00
 * @time 10/11/2018下午 5:19
 */
public class CommonButton extends Button {
    private String type;
    private String key;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
