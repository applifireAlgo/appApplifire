DROP TABLE IF EXISTS `art_table_entity_relation`;

CREATE TABLE `art_table_entity_relation` (
  `id` varchar(64) NOT NULL ,
  `relation_type` varchar(256) DEFAULT NULL,
  `direction_type` varchar(256) DEFAULT NULL,
  `cascade_type` varchar(256) DEFAULT NULL,
  `fetch_type` varchar(256) DEFAULT NULL,
  `owning_cascade` varchar(256) DEFAULT NULL,
  `owning_table_id` varchar(64) NOT NULL ,
  `owning_key_id` varchar(64) NOT NULL ,
  `reff_table_id` varchar(64) NOT NULL ,
  `reff_key_id` varchar(64) NOT NULL ,
  `project_id` varchar(256) DEFAULT NULL,
  `project_version_id` varchar(256) DEFAULT NULL,
  `app_creator_id` varchar(256) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT '1',
  `owing_entity` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_art_table_entity_relation_1_idx` (`owning_table_id`),
  CONSTRAINT `fk_art_table_entity_relation_1` FOREIGN KEY (`owning_table_id`) REFERENCES `art_table_details` (`table_id`) 
);

