package com.pflm.entitiy;

/**
 * view类型的菜单
 * @author qinxuewu
 * @version 1.00
 * @time 10/11/2018下午 5:21
 */
public class ViewButton extends Button{
    private String type;
    private String url;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}