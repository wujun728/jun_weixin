# app-oaserver

#### 项目介绍

智能办公OA系统[SpringCloud-快速开发平台]，适用于医院，学校，中小型企业等机构的管理。Activiti5.22+动态表单实现零java代码即可做到复杂业务的流程实施，同时包含文件在线操作、日志、考勤、CRM、项目、拖拽式生成问卷、日程、笔记、计划、行政等多种复杂业务功能。同时，可进行授权二开。</br>

> QQ群号：(群一：[696070023](http://shang.qq.com/wpa/qunwpa?idkey=e9aace2bf3e05f37ed5f0377c3827c6683d970ac0bcc61b601f70dc861053229))(群二：[836039567](https://shang.qq.com/wpa/qunwpa?idkey=7bb6f29b27f772aadca9c7c4e384f7833c64e9c3c947b5e946c7b303d1fe174a))

- 注：开源社区版只限学习，切勿使用此版本商用，内设授权码，默认十天删除所有非基础数据
- 系统新增传统风格界面，layui左菜单右内容风格。
- 该项目只作为接口服务端。
- 该微服务模块划分规则是根据权限划分的，由于个人原因，没有真正根据功能模块划分，不喜勿喷。

|项目|地址|
|-------|-------|
|主项目地址|https://gitee.com/doc_wei01/skyeye|
|APP端接口微服务地址|https://gitee.com/doc_wei01/app-oaserver|
|APP端地址|https://gitee.com/doc_wei01/oa-app|
|小程序端地址|https://gitee.com/doc_wei01/small-pro|

> APP端开始开发，前端采用VUE，后端采用SpringCloud，APP访问地址：[https://gitee.com/doc_wei01_admin/oa-app](https://gitee.com/doc_wei01_admin/oa-app "https://gitee.com/doc_wei01_admin/oa-app")

`项目持续更新，欢迎进群讨论`

#### 服务器部署注意事项

1.ActiveMQ链接地址、账号、密码的修改<br />
2.Redis集群的修改<br />
3.MySQL数据库链接地址、账号、密码的修改<br />
4.图片资源路径存储的修改<br />

#### 本地开发环境搭建

- windows搭建nginx负载均衡（[下载](https://download.csdn.net/download/doc_wei/11010749)）
- windows搭建activemq单机版（[下载](https://download.csdn.net/download/doc_wei/11010746)）
- windows搭建redis集群（[下载](https://download.csdn.net/download/doc_wei/11010741)）

#### 接口功能介绍

功能|简介|功能|简介
-------|-------|-------|-------
菜单管理|管理系统中的菜单和权限点|员工管理|管理系统中的员工
用户管理|管理所有系统的登录用户|角色管理|管理系统中的所有角色
权限管理|给角色进行赋权|资源图标|系统中允许使用的font图标库
日志管理|所有接口请求信息|APP菜单管理|手机端菜单以及权限管理
多桌面管理|多个桌面程序，用户可通过鼠标滚动进行切换|系统基础设置|系统的基础信息设置（考勤事件，邮箱信息等）
代码生成器|只能适用于该框架的代码生成器，配置模板即可生成，然后下载压缩包解压复制到项目中即可|小程序管理|微信小程序、H5手机自适应页面拖拽生成，可自定义配置小程序组件
在线性能监控|监控jvm缓存、redis集群信息等|流程图规划|规划项目的流程图
问卷调查|拖拽式生成问卷，可分页、复制、查看统计信息等|多桌面|[演示](https://www.bilibili.com/video/av43650484)
聊天功能|[演示](https://www.bilibili.com/video/av43650782)|我的日程|[演示](https://www.bilibili.com/video/av45854959)
自定义桌面菜单|用户可将自己常用的网站添加到系统中方便记录|多系统集成(应用商店)|可以将多个系统进行应用集成，无需多次登陆，无需记录多个网址
轻应用|系统中提供各种小应用，如快递查询、高德地图等，用户可添加到自己的桌面上|开发文档|系统支持二次开发，包含开发文档
工作日志|记录每个员工的日报，周报，月报等，可同时发送多人，按时间轴查看等|考勤管理|记录每个员工的考勤打卡信息，包含报表
我的笔记|员工可记录自己日常的笔记，目前支持MD，富文本，表格操作|报表管理|统计功能信息，可根据客户自定义免费定制
文件管理|公司内部、员工个人的文件管理，支持多格式文件在线查看，文档多人协作，在线解压缩等|附件管理|保留员工所有上传过的附件，方便下次使用
邮件管理|目前打通与QQ邮箱的交互，可以发邮件，收邮件，保存为草稿等|工作流管理|动态表单结合工作流生成自定义业务流程审核,可进行审批、撤回、回退、节点化表单项编辑设置、驳回、终止转办等功能
论坛|包括标签管理，关键词管理，举报审核等操作，用户可自由发表文章，系统通过过滤算法进行关键词过滤|计划管理|方便公司进行公司计划、部门计划、个人计划的规划，可根据类型（日计划、周计划、月计划、季度计划等）进行定义
动态表单|通过自定义的方式生成提交表单页，可与动态数据进行结合，目前已和工作流结合|行政管理|包含车辆管理、会议室管理、用品管理、印章管理、财产管理、证照管理。所有功能审核已和工作流结合
内部公告|系统内部公告通知，可设置邮件通知，定时通知，人员选择等|通讯录|记录个人、公司内部、公共通讯录信息
知识库|企业文化支柱；[效果地址](https://gitee.com/doc_wei01/knowlg-pro)|CRM客户管理管理|包含客户、商机、跟单、合同等多个模块化功能
ERP进销存管理|包含采购、销售、零售、客户、供应商等多个模块话功能；[效果地址](https://gitee.com/doc_wei01/erp-pro)||

#### 技术选型

##### 后端技术:

技术|名称|官网
---|---|---
SpringCloud|核心框架|https://springcloud.cc/
MyBatis|ORM框架|http://www.mybatis.org/mybatis-3/zh/index.html
Druid|数据库连接池|https://github.com/alibaba/druid
Maven|项目构建管理|http://maven.apache.org/
redis|key-value存储系统|https://redis.io/
Activiti|工作流引擎|https://www.activiti.org/
Quartz 2.2.2|定时任务|http://www.quartz-scheduler.org/
ActiveMQ|消息队列|http://activemq.apache.org/replicated-leveldb-store.html
solr|企业级搜索应用服务器|https://lucene.apache.org/solr/

#### 环境搭建

开发环境对应的文档以及安装包地址：链接：https://pan.baidu.com/s/1msVBhDcf_I_VN63YCcS-kA 提取码：w8sr；不要告诉我你没有云盘

#### 项目交流：

QQ群号：[696070023](http://shang.qq.com/wpa/qunwpa?idkey=e9aace2bf3e05f37ed5f0377c3827c6683d970ac0bcc61b601f70dc861053229)

> 需要了解的请加微信或者进群：wzq_598748873，备注：码云-公司（姓名）。

|QQ群|公众号|微信群|
|-------|-------|-------|
|![](https://images.gitee.com/uploads/images/2018/1205/145236_4fce6966_1541735.jpeg "微信图片_20181205145217.jpg")|![](https://images.gitee.com/uploads/images/2018/1207/083137_48330589_1541735.jpeg "qrcode_for_gh_e7f97ff1beda_258.jpg")|![输入图片说明](https://images.gitee.com/uploads/images/2019/1026/125556_ff89219a_1541735.jpeg "123.jpg")|
