package com.pflm.utils;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.fastjson.JSONObject;

/**
 * 限流自定义处理逻辑
 * @author qinxuewu
 * @version 1.00
 * @time 12/11/2018下午 6:00
 */
public class ExceptionUtil {
    public static void handleException(BlockException ex) {
        System.out.println("Oops: " + ex.getClass().getCanonicalName());
    }




}
