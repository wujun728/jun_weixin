CREATE DATABASE IF NOT EXISTS wechat_lottery DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

use wechat_lottery;

DROP TABLE IF EXISTS t_user;
CREATE TABLE t_user(
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '编号',
  access_token VARCHAR(500) COMMENT '用于微信网页端登录',
  access_token1 VARCHAR(500) COMMENT '普通access_token',
  openid VARCHAR(200) COMMENT 'openid',
  unionid VARCHAR(200) COMMENT '联合id',
  wechat_nickname VARCHAR(100) COMMENT '微信昵称',
  headimg VARCHAR(500) COMMENT '头像地址',
  wechat_no VARCHAR(100) COMMENT '微信号',
  phone VARCHAR(11) COMMENT '手机号',
  gender VARCHAR(2) COMMENT '性别',
  payed_fee int COMMENT '支付金额',
  payed_time DATETIME COMMENT '支付时间',
  trade_no VARCHAR(100) COMMENT '内部订单号',
  tran_id VARCHAR(100) COMMENT '微信支付订单号',
  prized int COMMENT '是否中奖',
  prized_stock int COMMENT '是否中原始股奖'
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS t_ticket_order;
CREATE TABLE t_ticket_order(
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单编号',
  user_id BIGINT COMMENT '用户编号',
  openid VARCHAR(200) COMMENT 'openid',
  order_time DATETIME COMMENT '下单时间',
  payed_fee int COMMENT '支付金额',
  payed_time DATETIME COMMENT '支付时间',
  payed int COMMENT '是否支付',
  invite_code VARCHAR(100) COMMENT '使用的邀请码'
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS t_invite_code;
CREATE TABLE t_invite_code(
  id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '邀请码编号',
  invite_code VARCHAR(100) COMMENT '邀请码',
  l1_user BIGINT COMMENT '一级用户编号',
  l2_user BIGINT COMMENT '二级用户编号'
) ENGINE = InnoDB DEFAULT CHARSET = utf8;