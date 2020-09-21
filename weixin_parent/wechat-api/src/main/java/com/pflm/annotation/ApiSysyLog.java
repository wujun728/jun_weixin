package com.pflm.annotation;
import java.lang.annotation.*;

/**
 * api请求日志注解
 *
 * @author qxw
 * @data 2018年6月7日下午5:01:55
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ApiSysyLog {

    String value() default "api日志";
}
