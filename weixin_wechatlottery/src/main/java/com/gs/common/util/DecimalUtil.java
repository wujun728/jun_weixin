package com.gs.common.util;

import java.math.BigDecimal;

/**
 * Created by Wang Genshen on 2017-07-07.
 */
public class DecimalUtil {

    public static double centToYuan(int src) {
        BigDecimal decimal = new BigDecimal(src);
        return decimal.divide(new BigDecimal(100), 2, BigDecimal.ROUND_UP).doubleValue();
    }

    public static int yuanToCent(double src) {
        BigDecimal decimal = new BigDecimal(src);
        return decimal.multiply(new BigDecimal(100)).intValue();
    }
}
;