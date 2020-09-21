CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test`;
-- MySQL dump 10.13  Distrib 5.5.35, for debian-linux-gnu (i686)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	5.5.35-0ubuntu0.12.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `levelCode` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `theValue` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `matchUrl` varchar(255) NOT NULL,
  `itemIcon` varchar(255) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_authority_parentId_authority` (`parentId`),
  CONSTRAINT `FK_authority_parentId_authority` FOREIGN KEY (`parentId`) REFERENCES `authority` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES (1,3,0,'欢迎使用','1',0,'1','/home','^/home$','icon-home',NULL),(2,2,0,'首页','1,2',0,'1','/home/index','/home/index','',1),(3,2,0,'系统设置','3',0,'2','/setting','^/setting$','icon-cogs',NULL),(4,4,0,'用户管理','3,4',0,'1','/account/list','^/account$','',3),(5,1,0,'用户列表','3,4,5',0,'1','/account/list','/account/list','',4),(6,2,0,'账户绑定','3,4,6',0,'2','/account/authorize','/account/authorize','',4),(7,1,0,'角色管理','3,7',0,'2','/role/list','^/role$','',3),(8,1,0,'角色列表','3,7,8',0,'1','/role/list','/role/list','',7),(9,1,0,'权限绑定','3,7,9',0,'2','/role/bind','/role/bind','',7),(10,1,0,'权限管理','3,10',0,'3','/authority/chain','^/authority$','',3),(11,1,0,'权限添加','3,10,11',0,'1','/authority/add','/authority/add','',10),(12,1,0,'权限编辑','3,10,12',0,'2','/authority/edit','/authority/edit','',10),(13,1,0,'权限删除','3,10,13',0,'3','/authority/delete','/authority/delete','',10),(14,1,0,'组织机构管理','3,14',0,'4','/organization/chain','^/organization$','',3),(15,1,0,'组织机构树','3,14,15',0,'1','/organization/chain','/organization/chain','',14),(16,1,0,'组织机构添加','3,14,16',0,'2','/organization/add','/organization/add','',14),(17,1,0,'组织机构编辑','3,14,17',0,'3','/organization/edit','/organization/edit','',14),(18,1,0,'组织机构删除','3,14,18',0,'4','/organization/delete','/organization/delete','',14),(19,1,0,'权限树','3,10,19',0,'4','/authority/chain','/authority/chain','',10),(21,1,0,'微信管理','21',0,'3','/weixinsend','^/weixinsend$','icon-comments',NULL),(22,1,0,'创建菜单','21,22',0,'1','/weixinsend/createmenu','/weixinsend/createmenu','',21),(23,4,0,'查询菜单','21,23',0,'2','/weixinsend/getmenu','/weixinsend/getmenu','',21);
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-28 15:36:12
