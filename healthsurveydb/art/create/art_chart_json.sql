DROP TABLE IF EXISTS `art_chart_json`;

CREATE TABLE `art_chart_json` (

  `chart_json_id` varchar(64) NOT NULL ,

  `chart_json` longtext NOT NULL,

  `json_data_structure` longtext NOT NULL,

  `java_class` varchar(2048) DEFAULT NULL,

  `created_by` int(11) NOT NULL,

  `created_date` date NOT NULL,

  `updated_by` int(11) NOT NULL,

  `updated_date` date NOT NULL,

  `version_id` int(11) NOT NULL,

  `active_status` int(1) NOT NULL,

  `data_field_id` VARCHAR(64) DEFAULT NULL,

  PRIMARY KEY (`chart_json_id`)

);

