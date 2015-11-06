DROP TABLE IF EXISTS `art_log_severity_m`;

CREATE TABLE `art_log_severity_m` ( `severity_id` varchar(64) NOT NULL, `log_config_id` INT(11) DEFAULT NULL, `severity` INT(11) NOT NULL, `label` VARCHAR(256) NOT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`severity_id`) ) ;

