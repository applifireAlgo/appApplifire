DROP TABLE IF EXISTS `art_service_operation`;

CREATE TABLE `art_service_operation` (
  `operation_id` varchar(64) NOT NULL ,
  `service_id` varchar(64) NOT NULL ,
  `operation_name` varchar(256) NOT NULL,
  `dao_class` varchar(256) NOT NULL,
  `operation_json` longtext,
  `source_details` text,
  `project_id` varchar(256) DEFAULT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT '1',
  `dao_id` varchar(64) DEFAULT NULL,
  `dao_operation_id` varchar(64) DEFAULT NULL,
  `operation_type` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`operation_id`)
); 

