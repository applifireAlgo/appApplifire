DROP TABLE IF EXISTS `art_health_status_config_m`;

CREATE TABLE `art_health_status_config_m` ( `statusConfigId` varchar(64) NOT NULL , `diskPath` VARCHAR(100) DEFAULT NULL, `diskThreshold` INT(11) DEFAULT NULL, `executeSql` VARCHAR(250) DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`statusConfigId`) );

