package com.gs.common;

import java.util.Vector;

/**
 * Created by Wang Genshen on 2017-08-17.
 */
public class PayMoney {

    private static Vector<Integer> payMoney = new Vector<Integer>();

    static {
        for (int i = 1; i <= 100 * 100; i++) {
            payMoney.add(i);
        }
    }

    public static Vector<Integer> getPayMoney() {
        return payMoney;
    }

    public static Vector<Integer> regetPayMoney() {
        payMoney.clear();
        for (int i = 1; i <= 100 * 100; i++) {
            payMoney.add(i);
        }
        return payMoney;
    }

}
