DROP TABLE IF EXISTS `art_log_module`;

CREATE TABLE `art_log_module` ( `id` varchar(64) NOT NULL , `log_module_name` VARCHAR(100) DEFAULT NULL, `connector_order_id` VARCHAR(45) DEFAULT NULL, `severity` INT(11) DEFAULT NULL, `id_range_starts_with` INT(11) DEFAULT NULL, `system_defined` TINYINT(1) DEFAULT NULL, `version_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `created_date` DATETIME DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `updated_date` DATETIME DEFAULT NULL, `active_status` INT(1) DEFAULT NULL, PRIMARY KEY (`id`), KEY `fk_art_log_module_connector_order_idx` (`connector_order_id`) ) ;

