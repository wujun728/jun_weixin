package com.gs.controller;

import com.alibaba.fastjson.JSON;
import com.github.wxpay.sdk.WXPayConstants;
import com.github.wxpay.sdk.WXPayUtil;
import com.gs.bean.User;
import com.gs.common.*;
import com.gs.common.bean.ControllerResult;
import com.gs.common.util.Config;
import com.gs.common.util.DecimalUtil;
import com.gs.common.util.PhoneUtil;
import com.gs.common.wechat.WechatAPI;
import com.gs.common.wechat.WechatUtil;
import com.gs.service.UserService;
import com.gs.service.impl.UserServiceImpl;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/**
 * Created by Wang Genshen on 2017-07-05.
 */
@WebServlet(name = "PayServlet", urlPatterns = "/pay/*")
public class PayServlet extends HttpServlet {
    private static final long serialVersionUID = -7542686547304843900L;

    private UserService userService;

    public PayServlet() {
        this.userService = new UserServiceImpl();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String method = WebUtil.getReqMethod(req);
        if (method.equals("pay")) {
            pay(req, resp);
        } else if (method.equals("result")) {
            result(req, resp);
        } else if (method.equals("all_payed")) {
            allPayed(req, resp);
        } else if (method.equals("all_payed_stock")) {
            allPayedStock(req, resp);
        } else if (method.equals("lottery")) {
            lottery(req, resp);
        } else if (method.equals("lottery_stock")) {
            lotteryStock(req, resp);
        } else if (method.equals("confirm")) {
            confirm(req, resp);
        } else if (method.equals("confirm_stock")) {
            confirmStock(req, resp);
        } else if (method.equals("prized_users")) {
            prizedUsers(req, resp);
        } else if (method.equals("prized_users_stock")) {
            prizedUsersStock(req, resp);
        }
    }

    private void lotteryStock(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        int prizedCount = (Integer) servletContext.getAttribute(ConfigConstants.PRIZED_COUNT_STOCK);
        List<User> payedUsers = userService.queryAll();
        Iterator<User> iterator = payedUsers.iterator();
        while (iterator.hasNext()) {
            User user = iterator.next();
            if (user.getPrizedStock() >= 1) {
                iterator.remove();
            }
        }
        List<User> prizedUser = new ArrayList<User>();
        Collections.shuffle(payedUsers);
        if (payedUsers.size() <= prizedCount) {
            prizedCount = payedUsers.size();
        }
        List<User> prized = payedUsers.subList(0, prizedCount);
        for (int i = 0, size = prized.size(); i < size; i++) {
            User user = payedUsers.get(payedUsers.indexOf(prized.get(i)));
            user.setPrizedStock(1);
        }
        prizedUser.addAll(prized);
        req.setAttribute("prized_users", prizedUser);
        servletContext.setAttribute(ConfigConstants.PRIZED_USERS_STOCK, prizedUser);
        req.setAttribute("lottery", "y");
        req.getRequestDispatcher("/WEB-INF/views/user/prized_users_stock.jsp").forward(req, resp);
    }

    private void prizedUsersStock(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<User> users = userService.queryAllPrizedStock();
        req.setAttribute("prized_users", users);
        req.getRequestDispatcher("/WEB-INF/views/user/prized_users_stock.jsp").forward(req, resp);
    }

    private void confirmStock(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext servletContext = req.getServletContext();
        List<User> users = (ArrayList<User>) servletContext.getAttribute(ConfigConstants.PRIZED_USERS_STOCK);
        userService.batchUpdateStock(users);
        users.clear();
        servletContext.setAttribute(ConfigConstants.PRIZED_USERS_STOCK, users);
        resp.sendRedirect(req.getContextPath() + "/pay/prized_users_stock");
    }

    /**
     * 修改成只要关注了就可以参与投资
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    private void allPayedStock(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<User> payedUsers = userService.queryAll();
        req.setAttribute("payed_users", payedUsers);
        req.getRequestDispatcher("/WEB-INF/views/admin/all_payed_stock.jsp").forward(req, resp);
    }

    private void prizedUsers(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<User> users = userService.queryAllPrized();
        req.setAttribute("prized_users", users);
        req.getRequestDispatcher("/WEB-INF/views/user/prized_users.jsp").forward(req, resp);
    }

    private void confirm(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext servletContext = req.getServletContext();
        List<User> users = (ArrayList<User>) servletContext.getAttribute(Constants.PAYED_USERS);
        userService.batchUpdate(users);
        users.clear();
        servletContext.setAttribute(Constants.PAYED_USERS, users);
        servletContext.setAttribute(Constants.ACTUAL_PAY, 0);
        servletContext.setAttribute(Constants.TOTAL_MONEY, 0);
        resp.sendRedirect(req.getContextPath() + "/pay/prized_users");
    }

    private void lottery(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        int prizedCount = (Integer) servletContext.getAttribute(ConfigConstants.PRIZED_COUNT);
        String prizedUsers = (String) servletContext.getAttribute(ConfigConstants.PRIZED_USERS);
        List<User> payedUsers = (ArrayList<User>) servletContext.getAttribute(Constants.PAYED_USERS);
        List<User> prizedUser = new ArrayList<User>();
        Collections.shuffle(payedUsers);
        String[] prizedUserArray = null;
        if (prizedUsers != null && !prizedUsers.trim().equals("")) {
            prizedUserArray = prizedUsers.split(",");
            prizedCount = prizedCount - prizedUserArray.length;
            for (int i = 0, len = prizedUserArray.length; i < len; i++) {
                User u = new User();
                String[] nameAndPhone = prizedUserArray[i].split(":");
                u.setWechatNickname(nameAndPhone[0]);
                u.setPhone(nameAndPhone[1]);
                u.setHidePhone(PhoneUtil.hidePhone(nameAndPhone[1]));
                prizedUser.add(u);
            }
        }
        if (payedUsers.size() <= prizedCount) {
            prizedCount = payedUsers.size();
        }
        List<User> prized = payedUsers.subList(0, prizedCount);
        for (int i = 0, size = prized.size(); i < size; i++) {
            User user = payedUsers.get(payedUsers.indexOf(prized.get(i)));
            user.setPrized(1);
        }
        prizedUser.addAll(prized);
        req.setAttribute("prized_users", prizedUser);
        req.setAttribute("lottery", "y");
        req.getRequestDispatcher("/WEB-INF/views/user/prized_users.jsp").forward(req, resp);
    }

    private void allPayed(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = req.getServletContext();
        int totalMoney = (Integer) servletContext.getAttribute(Constants.TOTAL_MONEY);
        req.setAttribute("total_money", DecimalUtil.centToYuan(totalMoney));
        req.getRequestDispatcher("/WEB-INF/views/admin/all_payed.jsp").forward(req, resp);
    }

    private void pay(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String feeStr = req.getParameter("fee");
        int fee = 0;
        if (feeStr != null) {
            fee = Integer.valueOf(feeStr);
        }
        String count = req.getParameter("count");
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute(Constants.LOGINED_USER);
        WechatUtil wechatUtil = new WechatUtil();
        Map<String, String> prepayResult = wechatUtil.prepayResult(user.getOpenId(), req.getRemoteAddr(), "抽奖付款", count, fee);
        for (Map.Entry<String, String> entry : prepayResult.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        // 正式付款需要提交的数据
        Map<String, String> payData = wechatUtil.payData(prepayResult);
        req.setAttribute("appId", WechatAPI.APP_ID);
        req.setAttribute("timeStamp", payData.get("timeStamp"));
        req.setAttribute("nonceStr", payData.get("nonceStr"));
        req.setAttribute("packages", payData.get("package"));
        req.setAttribute("paySign", payData.get("paySign"));
        req.getRequestDispatcher("/WEB-INF/views/user/pay.jsp").forward(req, resp); // 预支付数据转发到页面，调用js支付
    }

    private void result(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("***********************notify_url*************************");
        WechatUtil wechatUtil = new WechatUtil();
        Map<String, String> resultMap = wechatUtil.payResult(req);
        try {
            String resultCode = resultMap.get("result_code");
            if (resultCode != null && resultCode.equals("SUCCESS")) {
                String totalFee = resultMap.get("total_fee"); // 支付金额

                int payedFee = Integer.valueOf(totalFee);

                ServletContext servletContext = req.getServletContext();
                // 实际支付数
                Integer actualPay = (Integer) servletContext.getAttribute(Constants.ACTUAL_PAY);
                List<User> payedUsers = (ArrayList<User>) servletContext.getAttribute(Constants.PAYED_USERS);
                int totalMoney = (Integer) servletContext.getAttribute(Constants.TOTAL_MONEY);

                servletContext.setAttribute(Constants.ACTUAL_PAY, actualPay + 1); // 支付成功，则actual_pay + 1

                String openId = resultMap.get("openid");
                User user = userService.queryByOpenId(openId);
                String tranId = resultMap.get("transaction_id");
                String outTradeNo = resultMap.get("out_trade_no");
                int count = Integer.valueOf(resultMap.get("attach"));
                user.setPayedTime(Calendar.getInstance().getTime());
                user.setPayedFee(payedFee);
                user.setTradeNo(outTradeNo);
                user.setTranId(tranId);
                user.setHidePhone(PhoneUtil.hidePhone(user.getPhone()));
                // for (int i = 0; i < count; i++) {
                    payedUsers.add(user);
                // }
                servletContext.setAttribute(Constants.TOTAL_MONEY, payedFee + totalMoney);
                servletContext.setAttribute(Constants.PAYED_USERS, payedUsers);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        wechatUtil.responsePayNotify(resp);
    }


}
