package com.pflm;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import reactor.core.publisher.Mono;

@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
public class WechatCloudGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(WechatCloudGatewayApplication.class, args);
    }

//
//    /**
//     * 网关路由转发 代码配置方式
//     * @param builder
//     * @return
//     */
//    @Bean
//    public RouteLocator customRouteLocator(RouteLocatorBuilder builder){
//        return builder.routes()
//                .route(r -> r.path("/course").uri("http://cxytiandi.com"))
//                .build();
//    }

    /**
     * https://blog.csdn.net/zl1zl2zl3/article/details/83382800
     * IP限流
     * @return
     */
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> Mono.just(exchange.getRequest().getRemoteAddress().getHostName());
    }

    /**
     * 用户限流 使用这种方式限流，请求路径中必须携带userId参数
     * @return
     */
//    @Bean
//    KeyResolver userKeyResolver() {
//        return exchange -> Mono.just(exchange.getRequest().getQueryParams().getFirst("userId"));
//    }

    /**
     * 获取请求地址的uri作为限流key
     * @return
     */
//    @Bean
//    KeyResolver apiKeyResolver() {
//        return exchange -> Mono.just(exchange.getRequest().getPath().value());
//    }
}
