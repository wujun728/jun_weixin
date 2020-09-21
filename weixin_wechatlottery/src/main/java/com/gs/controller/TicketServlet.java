package com.gs.controller;

import com.gs.bean.User;
import com.gs.common.ConfigConstants;
import com.gs.common.Constants;
import com.gs.common.WebUtil;
import com.gs.common.util.DecimalUtil;
import com.gs.common.wechat.WechatAPI;
import com.gs.common.wechat.WechatUtil;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

/**
 * Created by Wang Genshen on 2017-07-29.
 */
@WebServlet(name = "TicketServlet", urlPatterns = "/ticket/*")
public class TicketServlet extends HttpServlet {

    private static final long serialVersionUID = -2412728024626512566L;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = WebUtil.getReqMethod(req);
        if (method.equals("buy_page")) {
            showBuyPage(req, resp);
        } else if (method.equals("pay")) {
            pay(req, resp);
        } else if (method.equals("info")) {
            showTicketInfoPage(req, resp);
        } else if (method.equals("share")) {
            showSharePage(req, resp);
        }
    }

    private void showSharePage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/ticket/share.jsp").forward(req, resp);
    }

    private void showTicketInfoPage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/ticket/ticket_info.jsp").forward(req, resp);
    }

    private void pay(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute(Constants.LOGINED_USER);
        String quanStr = req.getParameter("quantity");
        String l1 = req.getParameter("l1");
        String l2 = req.getParameter("l2");
        if (quanStr != null && !quanStr.trim().equals("")) {
            int quantity = Integer.valueOf(quanStr);
            ServletContext servletContext = req.getServletContext();
            double price = (Double) servletContext.getAttribute(ConfigConstants.TICKET_PRICE);
            int totalFee = DecimalUtil.yuanToCent(quantity * price);
            WechatUtil wechatUtil = new WechatUtil();
            Map<String, String> prepayResult = wechatUtil.prepayResult(user.getOpenId(), req.getRemoteAddr(), "门票支付", "", totalFee);
            Map<String, String> payData = wechatUtil.payData(prepayResult);
            req.setAttribute("appId", WechatAPI.APP_ID);
            req.setAttribute("timeStamp", payData.get("timeStamp"));
            req.setAttribute("nonceStr", payData.get("nonceStr"));
            req.setAttribute("packages", payData.get("package"));
            req.setAttribute("paySign", payData.get("paySign"));
            // TODO 记录购票订单
            req.getRequestDispatcher("/WEB-INF/views/ticket/pay.jsp").forward(req, resp);
        } else {
            resp.sendRedirect("buy_page");
        }
    }

    private void showBuyPage(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        Object userObj = session.getAttribute(Constants.LOGINED_USER);
        if (userObj == null) {
           // resp.sendRedirect(WechatAPI.ACCESS_LOGIN_URL_TICKET.replace("{redirect_url}", WechatAPI.REDIRECT_URL));
        } else {
            String l1 = req.getParameter("l1");
            String l2 = req.getParameter("l2");
            if (l1 != null && !l1.trim().equals("")) {
                req.setAttribute("l1", l1);
            }
            if (l2 != null && !l2.trim().equals("")) {
                req.setAttribute("l2", l2);
            }
            req.getRequestDispatcher("/WEB-INF/views/ticket/buy_ticket.jsp").forward(req, resp);
        }
    }
}
