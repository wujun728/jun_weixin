package com.gs.controller;

import com.gs.common.WebUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
@WebServlet(name = "WechatServlet", urlPatterns = "/wechat/*")
public class WechatServlet extends HttpServlet {
    private static final long serialVersionUID = -9184062580057341568L;

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String method = WebUtil.getReqMethod(request);
        if (method.equals("validate")) {
            request.getParameter("signature");
            request.getParameter("timestamp");
            request.getParameter("nonce");
            String echoStr = request.getParameter("echostr");
            PrintWriter out = response.getWriter();
            out.println(echoStr);
        }
    }
}
