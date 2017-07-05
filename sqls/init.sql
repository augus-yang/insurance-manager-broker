/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : frank

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-05-12 10:29:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for broker
-- ----------------------------
DROP TABLE IF EXISTS `broker`;
CREATE TABLE `broker` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `applicant` varchar(50) COLLATE utf8_bin NOT NULL,
  `applicantType` enum('男','女','公司') COLLATE utf8_bin NOT NULL,
  `documentType` enum('身份证','营业执照','其他') COLLATE utf8_bin NOT NULL,
  `documentNumber` varchar(50) COLLATE utf8_bin NOT NULL,
  `address` varchar(50) COLLATE utf8_bin NOT NULL,
  `documentFrontImage` varchar(200) COLLATE utf8_bin NOT NULL,
  `documentBackImage` varchar(200) COLLATE utf8_bin NOT NULL,
  `invitation` varchar(50) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `applicant` (`applicant`),
  UNIQUE KEY `documentNumber` (`documentNumber`),
  UNIQUE KEY `invitation` (`invitation`),
  KEY `userId` (`userId`),
  CONSTRAINT `broker_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of broker
-- ----------------------------

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `describe` varchar(50) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('00', 'resourceManager', '资源管理', '2017-05-12 10:19:54', '2017-05-12 10:19:57');
INSERT INTO `resource` VALUES ('01', 'roleManager', '角色管理', '2017-05-12 10:20:15', '2017-05-12 10:20:18');
INSERT INTO `resource` VALUES ('02', 'userManager', '用户管理', '2017-05-12 10:20:33', '2017-05-12 10:20:35');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `describe` varchar(50) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('00', 'admin', '管理员', '2017-05-12 10:20:57', '2017-05-12 10:21:00');
INSERT INTO `role` VALUES ('01', 'user', '用户', '2017-05-12 10:21:12', '2017-05-12 10:21:15');
INSERT INTO `role` VALUES ('02', 'broker', '全民经纪', '2017-05-12 10:21:49', '2017-05-12 10:21:51');

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resourceId` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `roleId` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_resource_roleId_resourceId_unique` (`resourceId`,`roleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `role_resource_ibfk_1` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_resource_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of role_resource
-- ----------------------------
INSERT INTO `role_resource` VALUES ('00', '2017-05-12 10:22:01', '2017-05-12 10:22:03', '00', '00');
INSERT INTO `role_resource` VALUES ('01', '2017-05-12 10:22:16', '2017-05-12 10:22:18', '01', '00');
INSERT INTO `role_resource` VALUES ('02', '2017-05-12 10:22:29', '2017-05-12 10:22:33', '02', '00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `pwd` varchar(50) COLLATE utf8_bin NOT NULL,
  `mobile` char(11) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('00', 'frank', 'e10adc3949ba59abbe56e057f20f883e', '15962968250', '2017-05-12 10:23:05', '2017-05-12 10:23:07', '00');

-- ----------------------------
-- Table structure for weixin
-- ----------------------------
DROP TABLE IF EXISTS `weixin`;
CREATE TABLE `weixin` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `openId` varchar(50) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openId` (`openId`),
  KEY `userId` (`userId`),
  CONSTRAINT `weixin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of weixin
-- ----------------------------
