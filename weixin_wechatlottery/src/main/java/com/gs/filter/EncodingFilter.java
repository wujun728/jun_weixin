package com.gs.filter;

import com.gs.common.Constants;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * Created by Wang Genshen on 2017-06-29.
 */
@WebFilter(filterName = "EncodingFilter", urlPatterns = "/*")
public class EncodingFilter implements Filter {
    public void destroy() {
        System.out.println("encoding filter destroy...");
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        req.setCharacterEncoding(Constants.DEFAULT_ENCODING);
        resp.setCharacterEncoding(Constants.DEFAULT_ENCODING);
        resp.setContentType(Constants.DEFAULT_CONTENT_TYPE);
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {
        System.out.println("init encoding filter...");
    }

}
