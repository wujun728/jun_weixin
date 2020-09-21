package com.gs.controller;

import com.gs.common.ConfigConstants;
import com.gs.common.Constants;
import com.gs.common.wechat.WechatAPI;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
@WebServlet(name = "IndexServlet", urlPatterns = "/index")
public class IndexServlet extends HttpServlet {
    private static final long serialVersionUID = 8396947386749296795L;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        HttpSession session = req.getSession();
        Object obj = session.getAttribute(Constants.LOGINED_USER);
        if (servletContext.getAttribute(ConfigConstants.PRODUCTION_ENV).toString().equals("true") && obj == null) {
            System.out.println("重定向到微信授权页");
            resp.sendRedirect(WechatAPI.ACCESS_LOGIN_URL);
        } else {
            System.out.println("转发到个人主页");
            req.getRequestDispatcher("/user/home").forward(req, resp);
        }
    }
}
