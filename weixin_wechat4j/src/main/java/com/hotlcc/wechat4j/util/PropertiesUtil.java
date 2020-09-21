package com.hotlcc.wechat4j.util;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Properties工具类
 *
 * @author Allen
 */
@Slf4j
public final class PropertiesUtil {
    private PropertiesUtil() {
    }

    private static final Properties prop = new Properties();

    static {
        loadProperties(new String[]{
                "META-INF/wechat4j/app.properties",
                "META-INF/wechat4j/webwx-url.properties"
        });
    }

    private static void loadProperties(String[] paths) {
        if (paths == null) {
            return;
        }

        for (String path : paths) {
            InputStream is = null;
            try {
                is = PropertiesUtil.class.getClassLoader().getResourceAsStream(path);
                prop.load(is);
            } catch (Exception e) {
                log.error("Loading properties file \"" + path + "\" error.", e);
            } finally {
                if (is != null) {
                    try {
                        is.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public static String getProperty(String key) {
        return prop.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        return prop.getProperty(key, defaultValue);
    }

    public static Integer getInteger(String key, Integer defaultValue) {
        String p = getProperty(key);
        if (p == null) {
            return defaultValue;
        }
        p.trim();
        if ("".equals(p)) {
            return defaultValue;
        }
        return Integer.valueOf(p);
    }

    public static Integer getInteger(String key) {
        return getInteger(key, null);
    }

    public static int getIntValue(String key, int defaultValue) {
        return getInteger(key, defaultValue);
    }

    public static int getIntValue(String key) {
        return getInteger(key);
    }
}
