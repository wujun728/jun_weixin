package com.pflm.Filter;

import com.alibaba.fastjson.JSONObject;
import org.bouncycastle.asn1.ocsp.ResponseData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

/**
 * 过滤器
 * @author qinxuewu
 * @version 1.00
 * @time 8/11/2018下午 7:21
 */
@Component
public class IPCheckFilter implements GlobalFilter, Ordered {
    private static Logger log = LoggerFactory.getLogger(IPCheckFilter.class);
    @Override
    public int getOrder() {
        return 0;
    }
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.debug("********************IPCheckFilter***********************");
        HttpHeaders headers = exchange.getRequest().getHeaders();
        // 此处写死了，演示用，实际中需要采取配置的方式
        if (!getIp(headers).equals("127.0.0.1")) {
            ServerHttpResponse response = exchange.getResponse();
            JSONObject info=new JSONObject();
            info.put("code",401);
            info.put("message","非法请求");
            byte[] datas = info.toJSONString().getBytes(StandardCharsets.UTF_8);
            DataBuffer buffer = response.bufferFactory().wrap(datas);
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
            return response.writeWith(Mono.just(buffer));
        }
        return chain.filter(exchange);
    }
    // 这边从请求头中获取用户的实际IP,根据Nginx转发的请求头获取
    private String getIp(HttpHeaders headers) {
        return "127.0.0.1";
    }
}
