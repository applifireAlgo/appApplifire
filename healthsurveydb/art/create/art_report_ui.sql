DROP TABLE IF EXISTS `art_report_ui`;

CREATE TABLE `art_report_ui` (
  `report_name` VARCHAR(256) DEFAULT NULL,
  `report_id` VARCHAR(64) NOT NULL,
  `query_id` VARCHAR(64) DEFAULT NULL,
  `data_json` TEXT,
  `chart_json` LONGTEXT,
  `created_by` VARCHAR(64) NOT NULL,
  `created_date` DATE NOT NULL,
  `updated_by` VARCHAR(64) NOT NULL,
  `updated_date` DATE NOT NULL,
  `project_id` VARCHAR(256) NOT NULL,
  `project_version_id` INT(11) NOT NULL,
  `app_creator_id` VARCHAR(256) NOT NULL,
  `active_status` INT(1) NOT NULL,
  `version_id` INT(11) NOT NULL,
  `search_json` TEXT,
  `advance_config_json` TEXT,
  PRIMARY KEY (`report_id`)
) ;

