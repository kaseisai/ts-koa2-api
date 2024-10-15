/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80402 (8.4.2)
 Source Host           : localhost:3306
 Source Schema         : nbatyw

 Target Server Type    : MySQL
 Target Server Version : 80402 (8.4.2)
 File Encoding         : 65001

 Date: 15/10/2024 13:33:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access_ip
-- ----------------------------
DROP TABLE IF EXISTS `access_ip`;
CREATE TABLE `access_ip` (
  `id` char(19) NOT NULL,
  `ip` varchar(25) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL COMMENT 'ip类型, 1: 白名单，2:黑名单',
  `log` varchar(1024) DEFAULT NULL COMMENT '访问日志',
  `ua` varchar(1024) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` char(19)  NOT NULL,
  `title` varchar(255)  DEFAULT NULL,
  `enTitle` varchar(255)  DEFAULT NULL,
  `subTitle` varchar(1024) DEFAULT NULL COMMENT '子标题',
  `subEnTitle` varchar(1024) DEFAULT NULL COMMENT '子英文标题',
  `author` varchar(100)  DEFAULT NULL,
  `content` text ,
  `coverExt` varchar(10)  DEFAULT NULL,
  `metaTitle` varchar(100)  DEFAULT NULL,
  `metaKeywords` varchar(100)  DEFAULT NULL,
  `metaDescription` varchar(255)  DEFAULT NULL,
  `metaEnTitle` varchar(1024) DEFAULT NULL,
  `metaEnDescription` varchar(1024) DEFAULT NULL,
  `type` tinyint(1) DEFAULT 0 COMMENT '文章类型: 0-普通文章 1-热门文章 2-首页轮播文章',
  `brief` text ,
  `isEnabled` tinyint(1) DEFAULT 1,
  `categoryId` varchar(15)  DEFAULT NULL COMMENT 'application: 应用，news：动态',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `publishedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `originalUrl` varchar(255)  DEFAULT NULL,
  `thumbnailUrl` varchar(1024)  DEFAULT NULL,
  `accessCount` int DEFAULT 0,
  `readTime` int DEFAULT NULL COMMENT '阅读时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` char(19) NOT NULL,
  `name` varchar(100) NOT NULL,
  `parentId` char(19) DEFAULT NULL,
  `cnName` varchar(100) DEFAULT NULL,
  `isEnabled` tinyint DEFAULT 1,
  `order` int DEFAULT 0,
  `metaTitle` text,
  `metaKeywords` text,
  `metaDescription` text,
  `description` text,
  `createdAt` datetime DEFAULT NULL,
  `originUrl` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_parent` (`parentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for deadlinks
-- ----------------------------
DROP TABLE IF EXISTS `deadlinks`;
CREATE TABLE `deadlinks` (
  `id` char(19) NOT NULL,
  `uniqueId` varchar(25) DEFAULT NULL,
  `linkType` varchar(25) DEFAULT NULL COMMENT '链接类型: article',
  `website` varchar(25) DEFAULT NULL COMMENT '网站名',
  `isCommit2Baidu` tinyint(1) DEFAULT 0,
  `isCommit2Google` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for script_record
-- ----------------------------
DROP TABLE IF EXISTS `script_record`;
CREATE TABLE `script_record` (
  `id` char(19)  NOT NULL,
  `subject` varchar(255)  DEFAULT NULL COMMENT '脚本主题',
  `uniqueId` varchar(19)  DEFAULT NULL COMMENT '唯一标识Id',
  `isSuccess` tinyint(1) DEFAULT 0,
  `failReason` text ,
  `data` text  COMMENT '成功数据记录',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `failType` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for static_files
-- ----------------------------
DROP TABLE IF EXISTS `static_files`;
CREATE TABLE `static_files` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `isEnabled` tinyint(1) DEFAULT 1,
  `uniqueId` varchar(255) DEFAULT NULL,
  `ext` varchar(20) DEFAULT NULL COMMENT '文件后缀名',
  `hash` varchar(255) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `path` varchar(512) DEFAULT NULL,
  `type` int DEFAULT NULL COMMENT '静态资源类型: 1-主图 2-规格书 3-图片集 4-附件',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for system_config
-- ----------------------------
DROP TABLE IF EXISTS `system_config`;
CREATE TABLE `system_config` (
  `id` char(19)  NOT NULL,
  `name` varchar(255)  DEFAULT NULL,
  `value` text ,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for sysuser
-- ----------------------------
DROP TABLE IF EXISTS `sysuser`;
CREATE TABLE `sysuser` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` char(19)  NOT NULL,
  `tag` text ,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(19) NOT NULL,
  `avatarUrl` varchar(200) DEFAULT NULL,
  `nickname` varchar(200) DEFAULT NULL,
  `openid` varchar(32) DEFAULT NULL,
  `unionid` varchar(32) DEFAULT NULL,
  `sessionKey` varchar(60) DEFAULT NULL,
  `phone` char(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `memo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uix_phone` (`phone`) USING BTREE,
  KEY `ix_unionid` (`unionid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for weblinks
-- ----------------------------
DROP TABLE IF EXISTS `weblinks`;
CREATE TABLE `weblinks` (
  `id` char(19) NOT NULL,
  `uniqueId` varchar(25) DEFAULT NULL,
  `linkType` varchar(25) DEFAULT NULL COMMENT '链接类型',
  `website` varchar(25) DEFAULT NULL COMMENT '网站名',
  `isCommit2Baidu` tinyint(1) DEFAULT 0,
  `isCommit2Google` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `websiteType` varchar(25) DEFAULT NULL COMMENT '站点类型: pc/mobile',
  `url` varchar(520) DEFAULT NULL COMMENT '提交的url',
  `searchEngine` varchar(25)  DEFAULT NULL COMMENT '搜索引擎: baidu/bing/google',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
