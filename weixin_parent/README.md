

# wechat-parent

[![QQ群](https://img.shields.io/badge/QQ%E7%BE%A4-924715723-yellowgreen.svg)](https://jq.qq.com/?_wv=1027&k=5PIRvFq)
[![码云](https://img.shields.io/badge/Gitee-%E7%A0%81%E4%BA%91-yellow.svg)](https://gitee.com/qinxuewu)
[![Github](https://img.shields.io/badge/Github-Github-red.svg)](https://github.com/a870439570)
[![Join the chat at https://gitter.im/interview-docs/community](https://badges.gitter.im/interview-docs/community.svg)](https://gitter.im/interview-docs/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

#### 项目介绍
基于Spring Cloud微服务化开发平台，核心技术采用Spring Boot2以及Spring Cloud 相关核心组件，前端采用Vue的微信公众号管理系统。
（未完成 持续更新中）





#### 模块说明
软件架构说明
```
wechat-renren                   #后台管理模块(采用人人开源项目基础架构)
wechat-api                     #api接口模块
wechat-api-gateway             #Zuul路由网关过滤器
wechat-common                  #公共模块
wechat-eureka                  #eureka 注册中心
wechat-feign-interface         #feign调用接口模块（调用外部接口和内部服务接口。配置有差异）
wechat-monitoring              #基于SpringBoot Admin2.0的服务监控
wechat-web                     #web前端模块 
wechat-config                  #Spring-Cloud-Alibaba 的配置中心Nacos Config 限流组件demo
wechat-cloud-config            #Spring-Cloud-Config的配置中心
wechat-turbine                 #Turbine断路器聚合监控
```

### 数据库脚本文件
![输入图片说明](https://images.gitee.com/uploads/images/2018/1119/192511_32c077af_1478371.png "屏幕截图.png")

### 启动
首先启动注测中心 ，其余模块随便启动

### 打包部署
wechat-eureka 注册中心打包部署
```
第一步  mvn package -Dmaven.test.skip=true
第二步  linux服务启动  nohup java -Xms256m -Xmx256m -jar wechat-eureka-1.0.jar  &  （后台运行）
```

wechat-monitoring 监控部署运行
```
 nohup java -Xms256m -Xmx256m -jar wechat-monitoring-1.0  & 

```

### Nacos Config Starter 完成 Spring Cloud 应用的配置管理
- [Spring Cloud Alibaba官方文档](https://github.com/spring-cloud-incubator/spring-cloud-alibaba/blob/master/README-zh.md) 
- Nacos 是阿里巴巴开源的一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- 控制台下载 https://github.com/alibaba/nacos/releases

```
Linux/Unix/Mac 操作系统，执行命令 sh startup.sh -m standalone
Windows 操作系统，执行命令 cmd startup.cmd

访问控制台：http://127.0.0.1:8848/nacos
```
![输入图片说明](https://images.gitee.com/uploads/images/2018/1112/143940_507df762_1478371.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2018/1118/121936_2914f7d2_1478371.png "屏幕截图.png")



## 关于

- email:  870439570@qq.com
- CSDN: https://blog.csdn.net/u010391342
- 简书：https://www.jianshu.com/u/65eeb288a0d9
- 掘金: https://juejin.im/user/5a289b556fb9a0450e760117
- 个人博客：https://blog.qinxuewu.club

## 开源小项目
- [boot-actuator](https://github.com/a870439570/boot-actuator):   基于Spring Boot 实现的监控远程服务器多个Java应用JVM性能图形化工具
- [blog-sharon](https://github.com/a870439570/blog-sharon):   一款简单微信小程序个人博客
- [Mongodb-WeAdmin](https://github.com/a870439570/Mongodb-WeAdmin):  SpringBoot版Mongodb工具