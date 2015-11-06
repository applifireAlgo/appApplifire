DROP TABLE IF EXISTS `art_service`;

CREATE TABLE `art_service` (
  `service_id` varchar(64) NOT NULL ,
  `service_name` varchar(256) NOT NULL,
  `service_class` varchar(256) NOT NULL,
  `service_json` text,
  `source_details` text,
  `status` varchar(1) DEFAULT 'I',
  `project_id` varchar(256) DEFAULT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) NOT NULL,
  `active_status` tinyint(1) NOT NULL DEFAULT '1',
  `dao_id` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ;

