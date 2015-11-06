DROP TABLE IF EXISTS `art_external_integration`;

CREATE TABLE `art_external_integration` (
  `integration_id` varchar(64) NOT NULL,
  `integration_name` VARCHAR(500) DEFAULT NULL,
  `integration_config_json` TEXT,
  `integration_dsl` TEXT,
  `project_id` VARCHAR(50) DEFAULT NULL,
  `project_version_id` VARCHAR(50) DEFAULT NULL,
  `created_by` VARCHAR(64) DEFAULT NULL,
  `created_date` DATETIME DEFAULT NULL,
  `app_creator_id` VARCHAR(500) DEFAULT NULL,
  `updated_by` VARCHAR(64) DEFAULT NULL,
  `updated_date` DATETIME DEFAULT NULL,
  `version_id` INT(16) DEFAULT NULL,
  `active_status` TINYINT(1) DEFAULT NULL,
 `connectorId`  varchar(50) DEFAULT NULL,
  PRIMARY KEY (`integration_id`)
);



