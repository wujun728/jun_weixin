package com.pflm.annotation;

import java.lang.annotation.*;

/**
 * 系统日志注解
 *
 * 　	   1.CONSTRUCTOR:用于描述构造器
 　　　　2.FIELD:用于描述域
 　　　　3.LOCAL_VARIABLE:用于描述局部变量
 　　　　4.METHOD:用于描述方法
 　　　　5.PACKAGE:用于描述包
 　　　　6.PARAMETER:用于描述参数
 　　　　7.TYPE:用于描述类、接口(包括注解类型) 或enum声明
 *
 * @author qxw
 * @data 2018年6月7日下午5:01:55
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RedisCache {

    /**
     * 键
     * @return
     */
    String key() default "";

    /**
     * 过期时间
     * @return
     */
    long expired() default -1;

    /**
     * 是否为查询操作
     * 如果为写入数据库的操作，该值需置为 false
     * @return
     */
    boolean read() default true;

}
