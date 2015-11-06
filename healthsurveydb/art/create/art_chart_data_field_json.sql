DROP TABLE IF EXISTS `art_chart_data_field_json`;

CREATE TABLE `art_chart_data_field_json` (

  `data_field_id` varchar(64) NOT NULL ,

  `data_field_name` varchar(256) DEFAULT NULL,

  `data_field_json` text,

  `created_by` int(11) DEFAULT NULL,

  `created_date` date DEFAULT NULL,

  `updated_by` int(11) DEFAULT NULL,

  `updated_date` date DEFAULT NULL,

  `version_id` int(11) DEFAULT NULL,

  `active_status` int(1) DEFAULT NULL,

  PRIMARY KEY (`data_field_id`)

);

