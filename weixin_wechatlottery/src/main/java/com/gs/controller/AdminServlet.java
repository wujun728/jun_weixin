package com.gs.controller;

import com.gs.common.ConfigConstants;
import com.gs.common.WebUtil;
import com.gs.common.util.DateUtil;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;

/**
 * Created by Wang Genshen on 2017-07-14.
 */
@WebServlet(name = "AdminServlet", urlPatterns = "/setting/*")
public class AdminServlet extends HttpServlet {

    private static final long serialVersionUID = -6534242940466607324L;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = WebUtil.getReqMethod(req);
        if (method.equals("setting")) {
            show(req, resp);
        } else if (method.equals("change")) {
            change(req, resp);
        } else if (method.equals("start_game")) {
            startGame(req, resp);
        } else if (method.equals("end_game")) {
            endGame(req, resp);
        }
    }

    private void endGame(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext servletContext = req.getServletContext();
        servletContext.setAttribute(ConfigConstants.GAME_OVER, true);
        resp.sendRedirect(req.getContextPath() + "/setting/setting");
    }

    private void startGame(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext servletContext = req.getServletContext();
        servletContext.setAttribute(ConfigConstants.ACTIVITY_BEGIN_TIME, DateUtil.dateToString(Calendar.getInstance().getTime()));
        servletContext.setAttribute(ConfigConstants.GAME_OVER, false);
        resp.sendRedirect(req.getContextPath() + "/setting/setting");
    }

    private void change(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String date = req.getParameter("startTime");
        String totalUserStr = req.getParameter("totalUser");
        int totalUser = 10000;
        if (totalUserStr != null && !totalUserStr.trim().equals("")) {
            totalUser = Integer.valueOf(totalUserStr);
        }

        String prizedCountStr = req.getParameter("prizedCount");
        int prizedCount = 10;
        if (prizedCountStr != null && !prizedCountStr.trim().equals("")) {
            prizedCount = Integer.valueOf(prizedCountStr);
        }
        String prizedCountStockStr = req.getParameter("prizedCountStock");
        int prizedCountStock = 5;
        if (prizedCountStockStr != null && !prizedCountStockStr.trim().equals("")) {
            prizedCountStock = Integer.valueOf(prizedCountStockStr);
        }
        String prizedUsers = req.getParameter("prizedUsers");
        ServletContext servletContext = req.getServletContext();
        servletContext.setAttribute(ConfigConstants.ACTIVITY_BEGIN_TIME, date);
        servletContext.setAttribute(ConfigConstants.ACTIVITY_MAX_USER, totalUser);
        servletContext.setAttribute(ConfigConstants.PRIZED_COUNT, prizedCount);
        servletContext.setAttribute(ConfigConstants.PRIZED_COUNT_STOCK, prizedCountStock);
        servletContext.setAttribute(ConfigConstants.PRIZED_USERS, prizedUsers);
        resp.sendRedirect(req.getContextPath() + "/setting/setting");
    }

    private void show(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/admin/setting.jsp").forward(req, resp);
    }
}
