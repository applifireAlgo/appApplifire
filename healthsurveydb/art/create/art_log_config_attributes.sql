DROP TABLE IF EXISTS `art_log_config_attributes`;

CREATE TABLE `art_log_config_attributes` ( `attribute_id` varchar(64) NOT NULL , `log_config_id` varchar(64) NOT NULL , `attribute_name` VARCHAR(256) DEFAULT NULL, `attribute_value` VARCHAR(256) DEFAULT NULL, `attribute_comment` VARCHAR(1000) DEFAULT NULL, `attribute_display_name` VARCHAR(256) DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`attribute_id`), KEY `LogFK` (`log_config_id`), CONSTRAINT `ArtLogFK` FOREIGN KEY (`log_config_id`) REFERENCES `art_log_config_m` (`log_config_id`) ) ;

