package com.pflm.utils;

/**
 * 常量枚举类
 *
 * @author qxw
 * @data 2018年10月10日上午10:52:50
 */
public enum ConstEnum {

    SNSAPIBASE("snsapi_base",0),
    SNSAPIUSERINFO("snsapi_userinfo",0),
    ;
    private String name;
    private int index;

    private ConstEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static String getName(int index) {
        for (ConstEnum c : ConstEnum.values()) {
            if (c.getIndex() == index) {
                return c.name;
            }
        }
        return null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

}
