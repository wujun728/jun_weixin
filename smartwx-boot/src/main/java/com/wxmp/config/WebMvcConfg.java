package com.wxmp.config;

import com.wxmp.core.interceptor.AuthInterceptor;
import com.wxmp.wxapi.interceptor.WxOAuth2Interceptor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.*;

import javax.servlet.MultipartConfigElement;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebMvcConfg implements WebMvcConfigurer {

    /**
     * 增加corsfilter防止顺序作乱
     * @return
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }

    /**
     * 增加utf-8乱码
     * @return
     */
    @Bean
    public FilterRegistrationBean<CharacterEncodingFilter> encodingFilterRegistration() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);
        FilterRegistrationBean<CharacterEncodingFilter> registration = new FilterRegistrationBean<CharacterEncodingFilter>(
                encodingFilter);
        registration.setName("encodingFilter");
        registration.addUrlPatterns("/*");
        registration.setAsyncSupported(true);
        registration.setOrder(1);
        return registration;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加登陆拦截器
        List<String> patterns = new ArrayList<>();
        patterns.add("/message/**");
        patterns.add("/front/**");
        String[] allowUrls = {"/", "/user/logout", "/user/login", "/user/register", "/wxweb/sendmsg", "/wxapi/oauthOpenid", "/views/login.html", "/common/getverifycode"};
        AuthInterceptor authInterceptor = new AuthInterceptor();
        authInterceptor.setAllowUrls(allowUrls);
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
        //添加oauth拦截器
        WxOAuth2Interceptor wxOAuth2Interceptor = new WxOAuth2Interceptor();
        wxOAuth2Interceptor.setIncludes(new String[]{"/wxweb/sendmsg.html", "/wxapi/oauthOpenid.html"});
        registry.addInterceptor(wxOAuth2Interceptor).addPathPatterns("/**/*.html");
    }

    //配置首页启动
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/views/login.html");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    /**
     * 允许跨域访问
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
                .maxAge(3600)
                .allowCredentials(true);
    }

    /** 文件上传配置 */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 文件最大
        factory.setMaxFileSize("1024Mb"); // KB,MB
        /// 设置总上传数据总大小
        factory.setMaxRequestSize("1024Mb");
        return factory.createMultipartConfig();
    }

    // 资源重定向(仅作为后台使用不提供静态资源)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/**").addResourceLocations("file:E:/data/upload/");
        registry.addResourceHandler("/**").addResourceLocations("/WEB-INF/", "classpath:/META-INF/resources/",
                "classpath:/resources/", "classpath:/static/", "classpath:/public/", "classpath:/views/");
    }
}