DROP TABLE IF EXISTS `art_log_config_m`;

CREATE TABLE `art_log_config_m` ( `log_config_id` varchar(64) NOT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`log_config_id`) );

