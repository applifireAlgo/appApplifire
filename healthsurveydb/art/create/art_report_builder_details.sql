DROP TABLE IF EXISTS `art_report_builder_details`;

CREATE TABLE `art_report_builder_details` (
  `report_id` VARCHAR(64) NOT NULL,
  `report_name` VARCHAR(256) NOT NULL,
  `report_synopsis` TEXT,
  `report_help` TEXT,
  `query_criteria_json` TEXT,
  `grid_conf_json` TEXT,
  `chart_properties` TEXT,
  `drilldown_json` TEXT,
  `dataEndPoint_json` TEXT,
  `created_by` VARCHAR(64) NOT NULL,
  `created_date` DATE NOT NULL,
  `updated_by` VARCHAR(64) NOT NULL,
  `updated_date` DATE NOT NULL,
  `project_id` VARCHAR(256) NOT NULL,
  `project_version_id` INT(11) NOT NULL,
  `app_creator_id` VARCHAR(256) NOT NULL,
  `active_status` INT(1) NOT NULL,
  `version_id` INT(11) NOT NULL,
  `query_info` TEXT,
  `other_properties_json` TEXT,
  `search_json` TEXT,
  `edit_flag` INT(1) DEFAULT NULL,
  `bounded_context` VARCHAR(64) DEFAULT NULL,
  `system_flag` INT(1) DEFAULT '0',
  `data_browser` INT(1) DEFAULT '0',
  `advance_config_json` TEXT,
  PRIMARY KEY (`report_id`)
) ;

