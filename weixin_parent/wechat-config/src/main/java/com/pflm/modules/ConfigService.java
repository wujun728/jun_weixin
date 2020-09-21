package com.pflm.modules;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.pflm.utils.ExceptionUtil;
import org.springframework.stereotype.Service;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 12/11/2018下午 6:03
 */
@Service
public class ConfigService {



    /**
     *  blockHandler 是位于 ExceptionUtil 类下的 handleException 静态方法，需符合对应的类型限制.
     */
    @SentinelResource(value = "test", blockHandler = "handleException", blockHandlerClass = {ExceptionUtil.class})
    public void test() {
        System.out.println("Test");
    }


    /**
     * blockHandler 是位于当前类下的 exceptionHandler 方法，需符合对应的类型限制.
     * @param s
     * @return
     */
    @SentinelResource(value = "hello", blockHandler = "exceptionHandler")
    public String hello(long s) {
        return String.format("Hello at %d", s);
    }

    public String exceptionHandler(long s, BlockException ex) {
        ex.printStackTrace();
        return "Oops, error occurred at " + s;
    }
}
