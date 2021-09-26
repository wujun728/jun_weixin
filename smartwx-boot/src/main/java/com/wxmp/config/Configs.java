package com.wxmp.config;

import com.wxmp.core.util.PropertiesUtil;
import com.wxmp.core.util.StringUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.config.ConfigFileApplicationListener;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * @author hermit
 * @since 2018年11月15日 上午9:03:17
 */
public class Configs implements EnvironmentPostProcessor, Ordered {
    private Logger logger = LogManager.getLogger();

    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        MutablePropertySources propertySources = environment.getPropertySources();
        String[] profiles = environment.getActiveProfiles();
        Properties props = getConfig(profiles);
        propertySources.addLast(new PropertiesPropertySource("thirdEnv", props));
        for (PropertySource<?> propertySource : propertySources) {
            if (propertySource.getSource() instanceof Map) {
                Map map = (Map)propertySource.getSource();
                for (Object key : map.keySet()) {
                    String keyStr = key.toString();
                    Object value = map.get(key);
                    PropertiesUtil.getProperties().put(keyStr, value.toString());
                }
            }
        }
        logger.info("* smartwx-boot Read configuration file finished.");
    }

    @Override
    public int getOrder() {
        return ConfigFileApplicationListener.DEFAULT_ORDER + 1;
    }

    // 加载配置文件
    private Properties getConfig(String[] profiles) {
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        List<Resource> resouceList = new ArrayList<>();
        addResources(resolver, resouceList, "classpath*:property/*.properties");
        if (profiles != null) {
            for (String p : profiles) {
                if (StringUtil.isNotEmpty(p)) {
                    p = p + "/";
                }
                addResources(resolver, resouceList, "classpath*:property/" + p + "*.properties");
            }
        }
        try {
            PropertiesFactoryBean config = new PropertiesFactoryBean();
            config.setLocations(resouceList.toArray(new Resource[]{}));
            config.afterPropertiesSet();
            return config.getObject();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 加载配置文件
    private void addResources(PathMatchingResourcePatternResolver resolver, List<Resource> resouceList, String path) {
        try {
            Resource[] resources = resolver.getResources(path);
            for (Resource resource : resources) {
                resouceList.add(resource);
            }
        } catch (Exception e) {
            logger.error("", e);
        }
    }
}
