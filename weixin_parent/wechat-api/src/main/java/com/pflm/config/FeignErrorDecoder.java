package com.pflm.config;

import feign.Response;
import feign.Util;
import feign.codec.ErrorDecoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * 自定义异常解析器
 * @author qinxuewu
 * @version 1.00
 * @time 25/10/2018下午 6:01
 */
@Configuration
public class FeignErrorDecoder implements ErrorDecoder {

    public static final Logger log = LoggerFactory.getLogger(FeignErrorDecoder.class);
    @Override
    public Exception decode(String methodKey, Response response) {
        try {
            // 这里直接拿到我们抛出的异常信息
            String message = Util.toString(response.body().asReader());
            log.debug("Feign自定义异常解析器: {} ",message);
            return new RuntimeException(message);
        } catch (IOException ignored) {
            log.debug("Feign自定义异常解析器: {} ",ignored);
        }
        return decode(methodKey, response);
    }
}
