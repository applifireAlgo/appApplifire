DROP TABLE IF EXISTS `art_component_config`;

CREATE TABLE `art_component_config` (
  `id` varchar(64) NOT NULL,
  `component_name` varchar(256) NOT NULL,
  `initializer` varchar(256) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `project_id` varchar(256) NOT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
);

