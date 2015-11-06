DROP TABLE IF EXISTS `art_log_connector_attributes_m`;

CREATE TABLE `art_log_connector_attributes_m` ( `attribute_id` varchar(64) NOT NULL, `connector_id` varchar(64) NOT NULL , `attribute_name` VARCHAR(256) NOT NULL, `attribute_value` VARCHAR(256) NOT NULL, `attribute_comment` VARCHAR(1024) DEFAULT NULL, `attribute_display_name` VARCHAR(256) DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` TIMESTAMP NULL DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` TINYINT(1) DEFAULT NULL, PRIMARY KEY (`attribute_id`), KEY `ConnectorFK` (`connector_id`), CONSTRAINT `ArtConnectorFK` FOREIGN KEY (`connector_id`) REFERENCES `art_log_connector_m` (`connector_id`) );

