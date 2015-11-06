DROP TABLE IF EXISTS `art_database_operators`;

CREATE TABLE `art_database_operators` (
  `id` varchar(64) NOT NULL ,
  `name` varchar(256) DEFAULT NULL,
  `json` text NOT NULL,
  `active_status` int(1) DEFAULT '1',
  `version_id` int(11) DEFAULT '-1',
  `updated_date` datetime DEFAULT '1900-01-01 00:00:00',
  `updated_by` int(11) DEFAULT '-1',
  `created_date` datetime DEFAULT '1900-01-01 00:00:00',
  `created_by` int(11) DEFAULT '-1',
  PRIMARY KEY (`id`)
 );

