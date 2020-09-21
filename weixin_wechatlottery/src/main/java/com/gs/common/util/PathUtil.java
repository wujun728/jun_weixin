package com.gs.common.util;

/**
 * Created by WangGenshen on 5/16/16.
 */
public class PathUtil {

    public static final String WEB_INF = "/WEB-INF/";
    public static final String CLASSPATH = "classpath:/";

    public static String getClasspath() {
        return PathUtil.class.getResource("/").getPath();
    }

    public static String getWEBINFPath() {
        String classPath = getClasspath();
        return classPath.substring(0, classPath.length() - ("classes".length() + 1));
    }

    /**
     * web.xml配置文件为classpath:/autoload.properties
     * /WEB-INF/config/autoload.properties
     * @param configLocation
     * @return
     */
    public static String getResourcePath(String configLocation) {
        String resourcePath = null;
        if (configLocation.contains(CLASSPATH)) {
            resourcePath = getClasspath() + configLocation.substring(CLASSPATH.length());
        } else if (configLocation.contains(WEB_INF)) {
            resourcePath = getWEBINFPath() + configLocation.substring(WEB_INF.length());
        }
        return resourcePath;
    }

}
