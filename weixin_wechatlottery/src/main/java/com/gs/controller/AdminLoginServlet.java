package com.gs.controller;

import com.gs.common.ConfigConstants;
import com.gs.common.Constants;
import com.gs.common.WebUtil;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Wang Genshen on 2017-07-14.
 */
@WebServlet(name = "AdminLoginServlet", urlPatterns = "/admin/*")
public class AdminLoginServlet extends HttpServlet {

    private static final long serialVersionUID = -6534242940466607324L;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = WebUtil.getReqMethod(req);
        if (method.equals("login_page")) {
            loginPage(req, resp);
        } else if (method.equals("login")) {
            login(req, resp);
        }
    }

    private void login(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String pwd = req.getParameter("pwd");
        if (pwd != null && !pwd.trim().equals("")) {
            ServletContext servletContext = req.getServletContext();
            String adminPwd = (String) servletContext.getAttribute(ConfigConstants.ADMIN_PWD);
            if (pwd.equals(adminPwd)) {
                HttpSession session = req.getSession();
                session.setAttribute(Constants.LOGINED_ADMIN, "admin");
                resp.sendRedirect(req.getContextPath() + "/setting/setting");
            } else {
                req.setAttribute("msg", "登录密码错误！");
                req.getRequestDispatcher("/WEB-INF/views/admin/login.jsp").forward(req, resp);
            }
        } else {
            resp.sendRedirect(req.getContextPath() + "/admin/login_page");
        }
    }

    private void loginPage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/admin/login.jsp").forward(req, resp);
    }

}
