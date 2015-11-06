DROP TABLE IF EXISTS `art_table_details`;

CREATE TABLE `art_table_details` (
  `table_id` varchar(64) NOT NULL,
  `entity_name` varchar(256) NOT NULL,
  `table_name` varchar(256) NOT NULL,
  `display_entity_name` varchar(256) NOT NULL,
  `table_type` varchar(2) NOT NULL DEFAULT 'M',
  `domain` varchar(256) DEFAULT NULL,
  `project_id` varchar(256) NOT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`table_id`)
);

