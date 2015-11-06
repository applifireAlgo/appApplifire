DROP TABLE IF EXISTS `art_health_scheduler_config_m`;

CREATE TABLE `art_health_scheduler_config_m` ( `schedulerId` varchar(64) NOT NULL , `schedulerkey` VARCHAR(45) DEFAULT NULL, `refreshTime` INT(11) DEFAULT NULL, `refreshUnit` VARCHAR(45) DEFAULT NULL, `batchSize` INT(11) DEFAULT NULL, `enabled` VARCHAR(45) DEFAULT NULL, `connectorClass` VARCHAR(100) DEFAULT NULL, `dataModel` VARCHAR(100) DEFAULT NULL, `schedulerName` VARCHAR(45) DEFAULT NULL, `threadPoolSize` INT(11) DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`schedulerId`) );

