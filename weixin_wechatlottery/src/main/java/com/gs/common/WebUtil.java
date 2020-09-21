package com.gs.common;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * Created by Wang Genshen on 2017-06-29.
 */
public class WebUtil {

    public static String getReqMethod(HttpServletRequest req) {
        String uri = req.getRequestURI();
        return req.getRequestURI().substring(uri.lastIndexOf("/") + 1);
    }

    public static String getRootPath(HttpServletRequest request) {
        return request.getServletContext().getRealPath("/");
    }

    public static String encodeUrl(String url) {
        try {
            return URLEncoder.encode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
