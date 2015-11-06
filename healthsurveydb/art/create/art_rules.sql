DROP TABLE IF EXISTS `art_rules`;

CREATE TABLE `art_rules` (`rule_id` VARCHAR(64) NOT NULL,`rule_name` VARCHAR(256) NOT NULL, `rule_drl` LONGTEXT DEFAULT NULL,`updated_by` INT(11) DEFAULT NULL,`updated_date` DATETIME DEFAULT NULL,`created_by` INT(11) DEFAULT NULL,`created_date` DATETIME DEFAULT NULL,`version_id` INT(11) DEFAULT NULL,`active_status` TINYINT(1) DEFAULT '1',`project_id` VARCHAR(256) ,`project_version_id` VARCHAR(256),`app_creator_id` VARCHAR(256) DEFAULT NULL, PRIMARY KEY (`rule_id`));

