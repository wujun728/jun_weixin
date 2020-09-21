/*
Navicat MySQL Data Transfer

Source Server         : 192.168.0.168
Source Server Version : 50527
Source Host           : 192.168.0.168:3306
Source Database       : wxguide

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2016-05-19 15:11:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `token` varchar(255) NOT NULL COMMENT '直播口令',
  `courseId` varchar(255) NOT NULL COMMENT '课程直播ID',
  `courseName` varchar(255) NOT NULL COMMENT '课程名称',
  `teacherName` varchar(20) NOT NULL COMMENT '讲师',
  `tel` varchar(50) DEFAULT NULL COMMENT '联系方式',
  `price` float(100,2) NOT NULL COMMENT '课程价额单位元',
  `introduce` varchar(200) DEFAULT NULL COMMENT '课程简介',
  `url` varchar(255) NOT NULL COMMENT '播放地址',
  `onLineTime` datetime NOT NULL COMMENT '直播时间',
  `courseLogo` varchar(255) NOT NULL COMMENT '课程logo',
  `icon1` varchar(255) DEFAULT NULL COMMENT '宣传图片1',
  `icon2` varchar(255) DEFAULT NULL COMMENT '宣传图片2',
  `icon3` varchar(255) DEFAULT NULL COMMENT '宣传图片3',
  `tm` text COMMENT '主讲教材',
  `detail` text COMMENT '接口介绍',
  `courseType` int(5) NOT NULL DEFAULT '1' COMMENT '课程分类（1大讲堂、2小班课程）',
  `couresTime` varchar(255) NOT NULL COMMENT '每课时时长',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '123456', '14058720', '1', '外教', 'xxxxxxx', '160.00', 'xxxxxx', 'xxxxxx', '2016-03-22 18:55:23', 'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1305/30/c0/21447200_1369886146048.jpg', '', '', '', null, 'xxxxxx', '3', '45分钟', '2016-03-19 18:54:43', '2016-03-19 18:54:43');
INSERT INTO `course` VALUES ('2', '123456', '14058720', '2', '外教', 'xxxxxxx', '120.00', 'xxxxxx', 'xxxxxx', '2016-03-19 18:57:17', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', '', '', '', null, 'xxxxxx', '2', '45分钟', '2016-03-19 18:59:31', '2016-03-19 18:59:31');
INSERT INTO `course` VALUES ('3', '123456', '14058720', '3', '外教', 'xxxxxxx', '80.00', 'xxxxxx', 'xxxxxx', '2016-03-20 14:45:27', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', '', '', '', null, 'xxxxxx', '2', '45分钟', '2016-03-20 14:45:27', '2016-03-20 14:45:27');
INSERT INTO `course` VALUES ('4', '123456', '14058720', '4', '外教', 'xxxxxxx', '60.00', 'xxxxxx', 'xxxxxx', '2016-04-12 21:18:01', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', '', '', '', null, 'xxxxxx', '2', '45分钟', '2016-04-12 21:18:01', '2016-04-12 21:18:01');
INSERT INTO `course` VALUES ('5', '618360', '04711100', '5', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-09 13:04:36', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', '', '', '', null, 'xxxxxx', '1', '45分钟', '2016-04-09 13:04:36', '2016-04-09 13:04:36');
INSERT INTO `course` VALUES ('6', '101797', '37182046 ', '6', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-16 21:38:24', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', null, null, null, null, 'xxxxxx', '1', '45分钟', '2016-04-16 21:38:52', '2016-04-16 21:38:56');
INSERT INTO `course` VALUES ('7', '881150', '06425854 ', '7', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-16 21:43:33', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', null, null, null, null, 'xxxxxx', '1', '45分钟', '2016-04-16 21:44:03', '2016-04-16 21:44:06');
INSERT INTO `course` VALUES ('8', '294433', '28215922', '8', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-16 21:46:57', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', null, null, null, null, 'xxxxxx', '1', '45分钟', '2016-04-16 21:43:22', '2016-04-16 21:43:22');
INSERT INTO `course` VALUES ('9', '242122', '15849219 ', '9', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-24 12:28:09', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', null, null, null, null, 'xxxxxx', '1', '45分钟', '2016-04-24 12:28:27', '2016-04-24 12:28:30');
INSERT INTO `course` VALUES ('10', '870552', '25061817', '10', '外教', 'xxxxxxx', '10.00', 'xxxxxx', 'xxxxxx', '2016-04-24 12:30:54', 'http://img2.imgtn.bdimg.com/it/u=1270641303,1899256283&fm=21&gp=0.jpg', null, null, null, 'xxxxxx', 'xxxxxx', '1', '45分钟', '2016-04-24 12:31:13', '2016-04-24 12:31:17');

-- ----------------------------
-- Table structure for idea
-- ----------------------------
DROP TABLE IF EXISTS `idea`;
CREATE TABLE `idea` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `account` varchar(255) NOT NULL COMMENT '联系号码',
  `contact` varchar(255) NOT NULL COMMENT '联系方式',
  `context` text NOT NULL COMMENT '意见反馈内容',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of idea
-- ----------------------------
INSERT INTO `idea` VALUES ('1', '572839485', 'QQ', '感谢你的意见、如果感觉不错记得在码云上点个start', '2016-05-19 14:59:18');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `appid` varchar(32) NOT NULL,
  `out_trade_no` varchar(32) NOT NULL,
  `openId` varchar(128) NOT NULL COMMENT '用户标识',
  `mch_id` varchar(32) NOT NULL,
  `cash_fee` int(100) NOT NULL,
  `total_fee` int(100) NOT NULL COMMENT '总金额',
  `fee_type` varchar(8) DEFAULT NULL COMMENT '货币种类',
  `result_code` varchar(16) NOT NULL COMMENT '业务结果',
  `err_code` varchar(32) DEFAULT NULL COMMENT '错误代码',
  `err_code_des` varchar(255) DEFAULT NULL,
  `is_subscribe` varchar(1) DEFAULT NULL,
  `trade_type` varchar(16) NOT NULL COMMENT '交易类型',
  `bank_type` varchar(20) NOT NULL COMMENT '付款银行',
  `transaction_id` varchar(40) NOT NULL COMMENT '微信支付订单号',
  `coupon_id` varchar(20) DEFAULT NULL COMMENT '代金券或立减优惠ID',
  `coupon_fee` int(100) DEFAULT NULL COMMENT '单个代金券或立减优惠支付金额',
  `coupon_count` int(1) DEFAULT NULL COMMENT '代金券或立减优惠使用数量',
  `attach` varchar(255) DEFAULT NULL COMMENT '商家数据包',
  `time_end` varchar(100) NOT NULL COMMENT '支付完成时间',
  `couresCount` int(100) NOT NULL COMMENT '购买的课时数',
  `couresId` int(100) NOT NULL COMMENT '购买的课程编号',
  `url` varchar(255) NOT NULL COMMENT '视频播放地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', 'ewewew', '中国', 'fdsfsdf', 'fsadfas', '0', '300', '12345678', 'SUCCESS', null, null, 'Y', '', '', 'dfsdfsdfsdf', null, null, null, '{\"couresCount\":24,\"orderId\":\"1460129314001\",\"courseId\":2}', '', '24', '2', '');
INSERT INTO `orders` VALUES ('2', 'wx5e9360a3f46f64cd', '1459061330', 'o_pncsidC-pRRfCP4zj98h6slREw', '1322117501', '0', '1', 'CNY', 'SUCCESS', null, null, 'Y', 'JSAPI', 'CFT', '4009682001201603274319680985', null, null, null, '{\"couresCount\":24,\"orderId\":\"1460129314001\",\"courseId\":2}', '20160327144614', '24', '2', '');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `courseId` int(100) NOT NULL COMMENT '课程ID',
  `stockCount` int(100) NOT NULL COMMENT '总数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES ('1', '5', '80');
INSERT INTO `stock` VALUES ('2', '6', '80');
INSERT INTO `stock` VALUES ('3', '7', '1');
INSERT INTO `stock` VALUES ('4', '8', '0');
INSERT INTO `stock` VALUES ('5', '9', '0');
INSERT INTO `stock` VALUES ('6', '10', '0');

-- ----------------------------
-- Table structure for Tuser
-- ----------------------------
DROP TABLE IF EXISTS `Tuser`;
CREATE TABLE `Tuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(255) NOT NULL COMMENT '昵称',
  `email` varchar(30) DEFAULT NULL COMMENT '邮箱',
  `tel` varchar(15) DEFAULT NULL COMMENT '手机号码',
  `qq` varchar(20) DEFAULT NULL COMMENT 'QQ',
  `password` varchar(255) NOT NULL COMMENT 'MD5密码',
  `password2` varchar(255) NOT NULL COMMENT '明文密码',
  `openId` varchar(255) DEFAULT NULL COMMENT '微信用户的唯一识别',
  `remember` char(1) NOT NULL DEFAULT '0' COMMENT '是否记住密码',
  `registerDate` datetime NOT NULL COMMENT '注册时间',
  `lastLoginDate` datetime DEFAULT NULL COMMENT '最后登录时间',
  `level` int(10) DEFAULT NULL COMMENT '等级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Tuser
-- ----------------------------
INSERT INTO `Tuser` VALUES ('1', 'Javen', '572839485@qq.com', null, null, '04cac0540031555d7096726f9b3c0779', 'qwqwqwqw', 'ofkJSuGtXgB8n23e-y0kqDjJLXxk', '0', '2016-05-14 11:50:28', '2016-05-19 14:52:55', '101');
INSERT INTO `Tuser` VALUES ('2', 'Javen205', '342796937@qq.com', null, null, '7a12a47984333222320df4510947fbdd', 'qwqwqw', 'ofkJSuGtXgB8n23e-y0kqDjJLXxk', '1', '2016-05-19 15:07:25', '2016-05-19 15:08:32', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL COMMENT '用户标示',
  `subscribeTime` datetime DEFAULT NULL,
  `unsubscribeTime` datetime DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `unionid` varchar(255) DEFAULT NULL COMMENT '只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段',
  `privilege` varchar(255) DEFAULT NULL COMMENT '用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）',
  `headimgurl` varchar(255) DEFAULT NULL COMMENT '图像',
  `country` varchar(10) DEFAULT NULL COMMENT '国家',
  `city` varchar(10) DEFAULT NULL COMMENT '城市',
  `province` varchar(10) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知',
  `updateTime` datetime NOT NULL COMMENT '更新时间',
  `remark` text COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('32', 'ofkJSuGtXgB8n23e-y0kqDjJLXxk', null, null, '*ೄ˚༄Javen༡', null, null, 'http://wx.qlogo.cn/mmopen/XwCV8SHaDJI7F27oniaYZURnahC0wPC1UNBX6yLeXIEdXiaAektGrdQsscZzyWqFcwp2LsPhUnOiacRKszApz136iaQcKnovG129/0', '中国', '武汉', '湖北', '1', '2016-05-19 15:08:37', null);
