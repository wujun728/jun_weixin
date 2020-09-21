package com.pflm.aspect;
import com.pflm.annotation.RedisCache;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;

/**
 * redis缓存处理
 * @author qxw
 * @data 2018年11月1日上午10:32:15
 */
@Aspect
@Component
public class RedisCacheAspect {

    @SuppressWarnings("rawtypes")
    @Autowired
    private RedisTemplate redisTemplate;
    private final static Logger logger = LoggerFactory.getLogger(RedisCacheAspect.class);

    @Pointcut("@annotation(com.pflm.annotation.RedisCache)")
    public void redisPointCut() {
    }

    /**
     * 环绕通知 执行前后都处理
     *
     * @param pjp
     * @throws Throwable
     */
    @SuppressWarnings("unchecked")
    @Around("redisPointCut()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable{
        Object result = null;
        try {
            //获取注解上的值
            MethodSignature signature = (MethodSignature) pjp.getSignature();
            Method method = signature.getMethod();
            RedisCache cache=method.getAnnotation(RedisCache.class);
            if(cache!=null&& cache.read()){
                String applId="";
                Object[] args = pjp.getArgs();
                if (args != null && args.length > 0) {
                    applId = String.valueOf(args[0]);
                }
                //key生成规则
                String key=cache.key()+applId;
                long expired=cache.expired();
                result=redisTemplate.opsForValue().get(key);
                logger.info("查询redis缓存：key:{},result:{},{}",key,result,method.getName());
                if(result==null){
                    //缓存中不存在， 从数据获取
                    result=pjp.proceed();
                    //后置通知 获取方法返回值
                    if(result!=null){
                        if(expired>0){
                            redisTemplate.opsForValue().set(key, result, expired, TimeUnit.SECONDS);
                        }else{
                            redisTemplate.opsForValue().set(key, result);
                        }
                    }
                }
                return result;
            }

        } catch (Throwable e) {
            e.printStackTrace();
            logger.error("RedisCache执行异常：{}",e);
        }
        return null;
    }
}
